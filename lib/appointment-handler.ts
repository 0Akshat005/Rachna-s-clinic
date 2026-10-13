import { createHmac } from "node:crypto";
import { appointmentSchema } from "./validation";
export type BookingConfig = {
  mode: "preview" | "live";
  origin: string;
  approved: boolean;
  apiKey?: string;
  from?: string;
  to?: string;
  redisUrl?: string;
  redisToken?: string;
  hashSecret?: string;
  trustedVercelProxy?: boolean;
};
type Dependencies = {
  fetcher?: typeof fetch;
  limit?: (key: string) => Promise<boolean>;
  audit?: (event: string, ticket?: string) => void;
  pause?: (ms: number) => Promise<void>;
};
const previewBuckets = new Map<string, { count: number; expires: number }>();
function json(
  body: unknown,
  status = 200,
  headers: Record<string, string> = {},
) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}
function hash(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("hex");
}
async function readBoundedBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("empty");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const next = await reader.read();
      if (next.done) break;
      size += next.value.byteLength;
      if (size > 4096) {
        await reader.cancel();
        throw new Error("large");
      }
      chunks.push(next.value);
    }
  } finally {
    reader.releaseLock();
  }
  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.length;
  }
  return JSON.parse(new TextDecoder().decode(body));
}
export function createAppointmentHandler(
  config: BookingConfig,
  deps: Dependencies = {},
) {
  const fetcher = deps.fetcher || fetch;
  const audit = deps.audit || (() => {});
  const pause =
    deps.pause || ((ms) => new Promise((resolve) => setTimeout(resolve, ms)));
  return async function handle(request: Request): Promise<Response> {
    if (request.method !== "POST")
      return json({ message: "Method not allowed." }, 405, { Allow: "POST" });
    let origin: string;
    try {
      origin = new URL(config.origin).origin;
    } catch {
      return json(
        {
          message:
            "Appointment delivery is not configured. Please call the clinic.",
        },
        503,
      );
    }
    if (
      request.headers.get("origin") !== origin ||
      request.headers.get("sec-fetch-site") === "cross-site"
    )
      return json(
        { message: "Please submit the form from the clinic website." },
        403,
      );
    if (
      request.headers.get("content-type")?.split(";")[0] !== "application/json"
    )
      return json({ message: "Use the website appointment form." }, 415);
    const idempotency = request.headers.get("idempotency-key") || "";
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        idempotency,
      )
    )
      return json({ message: "Please refresh the form and try again." }, 400);
    if (
      config.mode === "live" &&
      (!config.approved ||
        !config.apiKey ||
        !config.from ||
        !config.to ||
        !config.redisUrl?.startsWith("https://") ||
        !config.redisToken ||
        !config.hashSecret ||
        config.hashSecret.length < 32 ||
        !origin.startsWith("https://"))
    )
      return json(
        {
          message:
            "Online requests are not available yet. Please call or WhatsApp the clinic.",
        },
        503,
      );
    const secret = config.hashSecret || "local-preview-only";
    // Trust the hosting platform's IP header only on Vercel. Other hosts use a shared limit.
    const client = config.trustedVercelProxy
      ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
        "shared"
      : "shared";
    const limitKey = "rachana:rate:" + hash(client, secret);
    try {
      let allowed: boolean;
      if (deps.limit) allowed = await deps.limit(limitKey);
      else if (config.mode === "live") {
        const lua =
          "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],900) end; return n";
        const result = await fetcher(config.redisUrl!, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + config.redisToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(["EVAL", lua, 1, limitKey]),
          signal: AbortSignal.timeout(5000),
        });
        if (!result.ok) throw new Error("rate-unavailable");
        const value = await result.json();
        if (value.error || typeof value.result !== "number")
          throw new Error("rate-unavailable");
        allowed = value.result <= 5;
      } else {
        const now = Date.now();
        for (const [key, value] of previewBuckets) {
          if (value.expires <= now) previewBuckets.delete(key);
        }
        const bucket = previewBuckets.get(limitKey) || {
          count: 0,
          expires: now + 900000,
        };
        bucket.count++;
        previewBuckets.set(limitKey, bucket);
        allowed = bucket.count <= 20;
      }
      if (!allowed)
        return json(
          {
            message:
              "Too many requests. Please try again in 15 minutes or call the clinic.",
          },
          429,
          { "Retry-After": "900" },
        );
    } catch {
      audit("rate_limit_unavailable");
      return json(
        {
          message:
            "We cannot receive requests right now. Please call the clinic.",
        },
        503,
      );
    }
    let raw: unknown;
    try {
      raw = await readBoundedBody(request);
    } catch (error) {
      return json(
        {
          message:
            error instanceof Error && error.message === "large"
              ? "Request is too large."
              : "Please check your form and try again.",
        },
        error instanceof Error && error.message === "large" ? 413 : 400,
      );
    }
    const parsed = appointmentSchema.safeParse(raw);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues)
        errors[String(issue.path[0])] ??= issue.message;
      return json(
        { message: "Please check the highlighted fields.", errors },
        422,
      );
    }
    const input = parsed.data;
    if (input.website)
      return json(
        {
          preview: config.mode === "preview",
          ticket: "RCH-REQUEST",
          message:
            "Request received. The clinic will contact you to confirm availability.",
        },
        202,
      );
    if (config.mode === "preview")
      return json({
        preview: true,
        message:
          "Your form passed validation. No appointment request was sent and no contact details were stored.",
      });
    const fingerprint = hash(
      JSON.stringify({
        name: input.name,
        phone: input.phone,
        interest: input.interest,
        preferredDay: input.preferredDay,
        consent: input.consent,
      }),
      secret,
    );
    const notificationKey = hash(idempotency + ":" + fingerprint, secret);
    const ticket = "RCH-" + notificationKey.slice(0, 10).toUpperCase();
    const email = {
      from: config.from,
      to: [config.to],
      subject: "Appointment request " + ticket + " — pending confirmation",
      text: [
        "Appointment request: " + ticket,
        "Status: pending — appointment is NOT confirmed.",
        "Name: " + input.name,
        "Phone: " + input.phone,
        "General area: " + (input.interest || "Not specified"),
        "Preferred day: " + (input.preferredDay || "Not specified"),
        "Consent: the requester agreed to be contacted about this request.",
        "Source: website appointment form",
        "Please contact the requester to discuss availability.",
        "Handle personal data under the clinic privacy and retention policy.",
      ].join("\n"),
    };
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await fetcher("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + config.apiKey,
            "Content-Type": "application/json",
            "Idempotency-Key": notificationKey,
          },
          body: JSON.stringify(email),
          signal: AbortSignal.timeout(5000),
        });
        if (response.ok) {
          const result = await response.json();
          if (typeof result.id !== "string")
            throw new Error("invalid-provider-response");
          audit("notification_accepted", ticket);
          return json(
            {
              preview: false,
              ticket,
              message:
                "Your request has been received for clinic follow-up. Your appointment is pending confirmation.",
            },
            202,
          );
        }
        if (response.status !== 429 && response.status < 500) break;
      } catch {
        /* No provider bodies or contact details are logged. */
      }
      if (attempt < 2) await pause(250 * (attempt + 1));
    }
    audit("notification_failed", ticket);
    return json(
      {
        message:
          "Your request could not be delivered. Please retry or contact the clinic directly.",
      },
      502,
    );
  };
}
