import { test } from "node:test";
import assert from "node:assert/strict";
import {
  createAppointmentHandler,
  type BookingConfig,
} from "../lib/appointment-handler";
import { appointmentSchema, indiaToday } from "../lib/validation";
const payload = {
  name: "Preview Visitor",
  phone: "9876543210",
  interest: "General assessment",
  preferredDay: "",
  consent: true,
  website: "",
};
const key = "550e8400-e29b-41d4-a716-446655440000";
const preview: BookingConfig = {
  mode: "preview",
  origin: "http://localhost:3000",
  approved: false,
};
function request(
  body: unknown = payload,
  headers: Record<string, string> = {},
) {
  return new Request("http://localhost:3000/api/appointment-requests", {
    method: "POST",
    headers: {
      origin: "http://localhost:3000",
      "content-type": "application/json",
      "idempotency-key": key,
      ...headers,
    },
    body: JSON.stringify(body),
  });
}
const allow = { limit: async () => true };
test("preview validates without delivering or persisting contact details", async () => {
  let delivered = false;
  const handle = createAppointmentHandler(preview, {
    ...allow,
    fetcher: async () => {
      delivered = true;
      throw Error();
    },
  });
  const response = await handle(request());
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.preview, true);
  assert.match(data.message, /No appointment request was sent/);
  assert.equal(delivered, false);
  assert.ok(!JSON.stringify(data).includes(payload.phone));
});
test("server rejects invalid contact details and absent consent", async () => {
  const response = await createAppointmentHandler(
    preview,
    allow,
  )(request({ ...payload, name: "X", phone: "123", consent: false }));
  assert.equal(response.status, 422);
  const data = await response.json();
  assert.ok(data.errors.name && data.errors.phone && data.errors.consent);
});
test("origin and JSON content checks block cross-site submissions", async () => {
  const handle = createAppointmentHandler(preview, allow);
  assert.equal(
    (await handle(request(payload, { origin: "https://malicious.example" })))
      .status,
    403,
  );
  assert.equal(
    (await handle(request(payload, { "content-type": "text/plain" }))).status,
    415,
  );
});
test("body limit applies even without a content-length header", async () => {
  assert.equal(
    (
      await createAppointmentHandler(
        preview,
        allow,
      )(request({ ...payload, name: "a".repeat(5000) }))
    ).status,
    413,
  );
});
test("malformed JSON is handled without an exception", async () => {
  const req = new Request("http://localhost:3000/api/appointment-requests", {
    method: "POST",
    headers: {
      origin: preview.origin,
      "content-type": "application/json",
      "idempotency-key": key,
    },
    body: "{",
  });
  assert.equal(
    (await createAppointmentHandler(preview, allow)(req)).status,
    400,
  );
});
test("rate limiting and limiter failure stop delivery", async () => {
  assert.equal(
    (
      await createAppointmentHandler(preview, { limit: async () => false })(
        request(),
      )
    ).status,
    429,
  );
  assert.equal(
    (
      await createAppointmentHandler(preview, {
        limit: async () => {
          throw Error();
        },
      })(request())
    ).status,
    503,
  );
});
test("honeypot requests do not send email", async () => {
  let sent = false;
  const response = await createAppointmentHandler(preview, {
    ...allow,
    fetcher: async () => {
      sent = true;
      throw Error();
    },
  })(request({ ...payload, website: "spam" }));
  assert.equal(response.status, 202);
  assert.equal(sent, false);
});
test("live mode fails closed when approvals or credentials are missing", async () => {
  assert.equal(
    (
      await createAppointmentHandler(
        { ...preview, mode: "live" },
        allow,
      )(request())
    ).status,
    503,
  );
});
const live: BookingConfig = {
  mode: "live",
  origin: "https://clinic.example",
  approved: true,
  apiKey: "test-key",
  from: "Rachana <requests@clinic.example>",
  to: "staff@clinic.example",
  redisUrl: "https://redis.example",
  redisToken: "test-token",
  hashSecret: "a".repeat(32),
};
function liveRequest() {
  return request(payload, { origin: live.origin });
}
test("live delivery retries transient failures and emits only opaque audit data", async () => {
  let calls = 0;
  const audit: unknown[] = [];
  const handle = createAppointmentHandler(live, {
    ...allow,
    pause: async () => {},
    audit: (event, ticket) => audit.push({ event, ticket }),
    fetcher: async () => {
      calls++;
      return calls === 1
        ? Response.json({}, { status: 503 })
        : Response.json({ id: "test-email-id" });
    },
  });
  const response = await handle(liveRequest());
  const data = await response.json();
  assert.equal(response.status, 202);
  assert.equal(calls, 2);
  assert.equal(data.preview, false);
  assert.match(data.ticket, /^RCH-/);
  assert.ok(!JSON.stringify(audit).includes(payload.phone));
  assert.ok(!JSON.stringify(audit).includes(payload.name));
});
test("identical retries produce the same notification key, body and request ticket", async () => {
  const notifications: { key: string; body: string }[] = [];
  const handle = createAppointmentHandler(live, {
    ...allow,
    fetcher: async (_url, init) => {
      notifications.push({
        key: (init?.headers as Record<string, string>)["Idempotency-Key"],
        body: String(init?.body),
      });
      return Response.json({ id: "test-email-id" });
    },
  });
  const first = await (await handle(liveRequest())).json();
  const second = await (await handle(liveRequest())).json();
  assert.equal(first.ticket, second.ticket);
  assert.deepEqual(notifications[0], notifications[1]);
});
test("persistent delivery failure never reports success", async () => {
  const handle = createAppointmentHandler(live, {
    ...allow,
    pause: async () => {},
    fetcher: async () => Response.json({}, { status: 503 }),
  });
  assert.equal((await handle(liveRequest())).status, 502);
});
test("dates and phone formats are validated in India time", () => {
  assert.equal(indiaToday(new Date("2026-10-08T20:00:00Z")), "2026-10-09");
  assert.ok(
    appointmentSchema.safeParse({ ...payload, phone: "+919876543210" }).success,
  );
  assert.ok(
    !appointmentSchema.safeParse({ ...payload, phone: "1234567890" }).success,
  );
  assert.ok(
    !appointmentSchema.safeParse({ ...payload, preferredDay: "2026-02-30" })
      .success,
  );
  assert.ok(
    !appointmentSchema.safeParse({ ...payload, preferredDay: "2099-01-01" })
      .success,
  );
});
