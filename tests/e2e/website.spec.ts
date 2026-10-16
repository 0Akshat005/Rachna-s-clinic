import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/services",
  "/basic-services",
  "/about",
  "/contact",
  "/request-appointment",
  "/privacy",
  "/services/spine-care",
  "/services/osteopathy-matrix-rhythm-therapy",
  "/services/dry-needling",
  "/services/cupping-therapy",
  "/services/laser-therapy",
  "/services/tecar-therapy",
  "/services/sports-injury-rehabilitation",
  "/services/pilates-training",
];
test("all pages render one H1, healthy imagery and unique canonical paths", async ({
  page,
}) => {
  const titles = new Set<string>();
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    expect(
      await page
        .locator('a[href^="tel:"]')
        .evaluateAll((links) =>
          links.every(
            (link) => link.getAttribute("href") === "tel:+919209291738",
          ),
        ),
    ).toBe(true);
    const title = await page.title();
    expect(titles.has(title)).toBeFalsy();
    titles.add(title);
    expect(
      new URL((await page.locator("link[rel=canonical]").getAttribute("href"))!)
        .pathname,
    ).toBe(route);
    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty("complete", true);
      expect(
        await image.evaluate((node) => (node as HTMLImageElement).naturalWidth),
      ).toBeGreaterThan(0);
    }
  }
});
test("homepage fits all required screen sizes", async ({ page }) => {
  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    const dimensions = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      width: document.documentElement.clientWidth,
    }));
    expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    if (width >= 768) {
      const spacing = await page.evaluate(() => ({
        left: document
          .querySelector(".movement-hero-copy")!
          .getBoundingClientRect().left,
        imageRight: document
          .querySelector(".movement-hero-photo .photo-inner")!
          .getBoundingClientRect().right,
      }));
      expect(spacing.left).toBeGreaterThanOrEqual(width * 0.045);
      expect(spacing.left).toBeLessThanOrEqual(width * 0.055);
      expect(Math.abs(spacing.imageRight - width)).toBeLessThanOrEqual(1);
    }
    if (width === 1440)
      await page.screenshot({
        path: "artifacts/home-desktop.png",
        fullPage: true,
      });
    if (width === 390)
      await page.screenshot({
        path: "artifacts/home-mobile.png",
        fullPage: true,
      });
  }
});
test("Care Finder and service directory filters are usable", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Sports injury", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Sports injury", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByRole("link", { name: "Explore rehabilitation", exact: true }),
  ).toHaveAttribute("href", "/services/sports-injury-rehabilitation");
  await page.getByRole("button", { name: "Not sure", exact: true }).click();
  await expect(
    page.getByRole("link", { name: "Request an assessment", exact: true }),
  ).toHaveAttribute("href", "/request-appointment");
  await page.goto("/services");
  await page
    .getByRole("button", { name: "Specialist therapies", exact: true })
    .click();
  await expect(page.locator(".directory-grid article")).toHaveCount(5);
  await page
    .getByRole("button", { name: "Strength & Pilates", exact: true })
    .click();
  await expect(page.locator(".directory-grid article")).toHaveCount(1);
  const pilatesCard = page.locator(".directory-grid article");
  await expect(pilatesCard.getByRole("img")).toHaveAttribute(
    "alt",
    /controlled bent-knee/,
  );
  await expect(
    pilatesCard.getByRole("link", { name: "Pilates Training", exact: true }),
  ).toHaveAttribute("href", "/services/pilates-training");
  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(page.locator(".directory-grid article")).toHaveCount(8);
  for (const card of await page.locator(".directory-grid article").all()) {
    await expect(card.getByRole("img")).toHaveCount(1);
    await expect(card.getByRole("link")).toHaveCount(1);
  }
  const spineLink = page
    .locator(".directory-grid article")
    .first()
    .getByRole("link");
  await spineLink.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/services\/spine-care$/);
});
test("mobile navigation handles keyboard and Escape with focus return", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", { name: "Close navigation" }),
  ).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
  await expect(
    page.getByRole("navigation", { name: "Primary navigation" }),
  ).toBeHidden();
});
test("appointment enquiries validate and prepare the correct WhatsApp message on both pages", async ({
  page,
  context,
}) => {
  let serverPosts = 0;
  page.on("request", (request) => {
    if (
      request.method() === "POST" &&
      request.url().endsWith("/api/appointment-requests")
    )
      serverPosts++;
  });
  await context.route("https://wa.me/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<!doctype html><title>WhatsApp test handoff</title><p>Test only. No message is sent.</p>",
    }),
  );
  for (const route of ["/contact", "/request-appointment"]) {
    await page.goto(route);
    await page
      .getByRole("button", { name: "Continue to WhatsApp", exact: true })
      .click();
    await expect(page.getByLabel("Full name", { exact: true })).toBeFocused();
    await expect(page.locator("#name-error")).toBeVisible();
    await page
      .getByLabel("Full name", { exact: true })
      .fill("Sample Visitor & Family");
    await page.getByLabel("Phone number", { exact: true }).fill("9876543210");
    await page.getByLabel(/General area/).selectOption("Sports rehabilitation");
    const tomorrow = new Date(Date.now() + 86400000);
    const preferredDay = new Date(tomorrow.getTime() + 330 * 60000)
      .toISOString()
      .slice(0, 10);
    await page.getByLabel(/Preferred day/).fill(preferredDay);
    await page
      .getByRole("button", { name: "Continue to WhatsApp", exact: true })
      .click();
    await expect(page.locator("#consent-error")).toBeVisible();
    await page.getByRole("checkbox").check();
    const opened = context.waitForEvent("page");
    await page
      .getByRole("button", { name: "Continue to WhatsApp", exact: true })
      .click();
    const popup = await opened;
    await popup.waitForLoadState("domcontentloaded");
    const url = new URL(popup.url());
    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe("/919209291738");
    const message = url.searchParams.get("text")!;
    expect(message).toContain(
      "*Appointment enquiry | Rachana Physiotherapy Clinic*",
    );
    expect(message).toContain("*Name:* Sample Visitor & Family");
    expect(message).toContain("*Callback number:* +91 9876543210");
    expect(message).toContain(
      "*General area of interest:* Sports rehabilitation",
    );
    expect(message).toMatch(/\*Preferred day:\* \w+, \d{1,2} \w+ \d{4}/);
    expect(message).toContain("confirmed only after the clinic replies");
    await popup.close();
    await expect(page.getByRole("status")).toContainText(
      "Tap Send in WhatsApp",
    );
    await expect(
      page.getByRole("link", { name: "Open WhatsApp again" }),
    ).toHaveAttribute("href", url.href);
    await expect(page.getByLabel("Full name", { exact: true })).toHaveValue(
      "Sample Visitor & Family",
    );
  }
  expect(serverPosts).toBe(0);
});

test("WhatsApp handoff keeps a retry link and entered details when a new window cannot open", async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.open = () => {
      throw new Error("Simulated popup unavailable");
    };
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/contact");
  await page.getByLabel("Full name", { exact: true }).fill("Sample Visitor");
  await page.getByLabel("Phone number", { exact: true }).fill("9876543210");
  await page.getByRole("checkbox").check();
  await page
    .getByRole("button", { name: "Continue to WhatsApp", exact: true })
    .click();
  const retry = page.getByRole("link", { name: "Open WhatsApp again" });
  await expect(retry).toBeVisible();
  const message = new URL((await retry.getAttribute("href"))!).searchParams.get(
    "text",
  )!;
  expect(message).toContain("*General area of interest:* Please guide me");
  expect(message).toContain("Flexible — please suggest an available day");
  await expect(page.getByLabel("Full name", { exact: true })).toHaveValue(
    "Sample Visitor",
  );
  await expect(page.getByLabel("Phone number", { exact: true })).toHaveValue(
    "9876543210",
  );
  await page.getByLabel("Full name", { exact: true }).fill("Updated Visitor");
  await expect(retry).toHaveCount(0);
});

test("all pages meet automated WCAG checks on desktop and mobile", async ({
  page,
}) => {
  test.setTimeout(60000);
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of routes) {
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .options({ iframes: false })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(results.violations, route + " at " + width).toEqual([]);
    }
  }
});
test("secondary pages fit 320px, and reduced viewport approximates 200 percent browser zoom", async ({
  page,
}) => {
  for (const width of [320, 640]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/services",
      "/about",
      "/contact",
      "/request-appointment",
      "/services/spine-care",
    ]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth <=
            document.documentElement.clientWidth,
        ),
      ).toBe(true);
    }
  }
});
test("contact uses the exact clinic map while preview indexing stays disabled", async ({
  page,
  request,
}) => {
  await page.goto("/contact");
  const map = page.locator(".map-shell iframe");
  await expect(map).toHaveCount(1);
  await expect(map).toHaveAttribute("title", /Rachana Physiotherapy Clinic/);
  await expect(map).toHaveAttribute(
    "src",
    /maps\/embed\?pb=.*0x2645c2a352999593/,
  );
  await expect(page.locator(".map-placeholder")).toHaveCount(0);
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    const bounds = await page.locator(".map-shell").boundingBox();
    expect(bounds?.height).toBe(width > 767 ? 340 : 290);
  }
  for (const link of await page
    .getByRole("link", { name: /Get directions/i })
    .all()) {
    await expect(link).toHaveAttribute("href", /0x2645c2a352999593/);
  }
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(
    0,
  );
  await expect(page.locator("meta[name=robots]")).toHaveAttribute(
    "content",
    "noindex, nofollow",
  );
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Disallow: /",
  );
  expect(await (await request.get("/sitemap.xml")).text()).toContain(
    "/services/pilates-training",
  );
});

test("service previews support browsing, direct links and persistent keyboard focus", async ({
  page,
}) => {
  await page.goto("/");
  const preview = page.locator("#service-preview");
  const next = page.getByRole("button", {
    name: "Preview next service",
    exact: true,
  });
  await page
    .locator(".service-index")
    .getByRole("link", { name: "Dry Needling" })
    .hover();
  await expect(preview.getByRole("heading", { level: 3 })).toHaveText(
    "Dry Needling",
  );
  await expect(
    preview.getByRole("link", { name: "Explore this care" }),
  ).toHaveAttribute("href", "/services/dry-needling");
  await next.click();
  await expect(preview.getByRole("heading", { level: 3 })).toHaveText(
    "Hijama / Cupping Therapy",
  );
  await expect(next).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(preview.getByRole("heading", { level: 3 })).toHaveText(
    "Laser Therapy",
  );
  await expect(next).toBeFocused();
  await expect(
    preview.locator(".photo-inner img:not([aria-hidden])"),
  ).toHaveAttribute("alt", /laser therapy/i);
  await page
    .locator(".service-index")
    .getByRole("link", { name: "Spine Care" })
    .focus();
  await expect(preview.getByRole("heading", { level: 3 })).toHaveText(
    "Spine Care",
  );
  await page
    .getByRole("button", { name: "Preview previous service", exact: true })
    .click();
  await expect(preview.getByRole("heading", { level: 3 })).toHaveText(
    "Pilates Training",
  );
  await expect(
    preview.getByRole("link", { name: "Explore this care" }),
  ).toHaveAttribute("href", "/services/pilates-training");
  await expect(preview.getByRole("status")).toHaveText(
    "Pilates Training, 8 of 8",
  );
});

test("touch previews and native FAQs work with reduced motion", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: "reduce",
  });
  try {
    const page = await context.newPage();
    await page.goto("/");
    const next = page.getByRole("button", {
      name: "Preview next service",
      exact: true,
    });
    await next.tap();
    await expect(page.locator("#service-preview h3")).toHaveText(
      "Osteopathy & Matrix Rhythm Therapy",
    );
    await expect(page.locator("#service-preview .photo-inner img")).toHaveCount(
      1,
    );
    const question = page.locator(".faq-list summary").first();
    await question.tap();
    await expect(page.locator(".faq-list details").first()).toHaveAttribute(
      "open",
      "",
    );
    await expect(
      page.locator(".faq-list details").first().locator("p"),
    ).toBeVisible();
    await question.tap();
    await expect(page.locator(".faq-list details").first()).not.toHaveAttribute(
      "open",
    );
    await expect
      .poll(() => page.evaluate(() => document.getAnimations().length))
      .toBe(0);
    const geometry = await page.evaluate(() => {
      window.scrollTo(0, 1200);
      return document.querySelector(".site-header")!.getBoundingClientRect()
        .height;
    });
    expect(geometry).toBeGreaterThanOrEqual(78);
    await expect
      .poll(() =>
        page
          .locator(".site-header")
          .evaluate((node) => node.getBoundingClientRect().top),
      )
      .toBe(0);
  } finally {
    await context.close();
  }
});

test("About page explains care and supports keyboard navigation through the visit guide", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/about");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "About Dr. Priyanka Taelkar (PT)",
  );
  await expect(
    page.getByRole("link", { name: "Request an assessment", exact: true }),
  ).toHaveAttribute("href", "/request-appointment");
  await page
    .getByRole("link", { name: "View qualifications", exact: true })
    .click();
  await expect(page).toHaveURL(/#doctor-qualifications$/);
  const credentials = page.locator("#doctor-qualifications");
  await expect(credentials).toBeFocused();
  await expect(credentials.getByRole("listitem")).toHaveCount(9);
  for (const label of [
    "B.P.Th. & M.P.Th. (G.M.C., Nagpur)",
    "DOMTP (Canada)",
    "FNMT (Mumbai)",
    "POMT (Pune)",
    "Diploma in Hijama & Cupping",
    "Certified Taping Specialist",
    "Pilates Trainer",
    "Health Coach",
    "M.Sc. Osteopathy",
  ]) {
    await expect(credentials.getByText(label, { exact: true })).toHaveCount(1);
  }
  await page
    .getByRole("navigation", { name: "Explore the About page" })
    .getByRole("link", { name: /Your first visit/ })
    .click();
  await expect(page).toHaveURL(/#your-first-visit$/);
  await expect(page.locator("#your-first-visit")).toBeFocused();
  const step = page.locator("#your-first-visit details").nth(1);
  await step.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(step).toHaveAttribute("open", "");
  await expect(step.locator("p")).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(step).not.toHaveAttribute("open");
  await expect(
    page.getByRole("link", {
      name: /Explore Sports Injury Rehabilitation/,
    }),
  ).toHaveAttribute("href", "/services/sports-injury-rehabilitation");
});

test("landing page features 8 advanced services and 3 basic services with hover-to-preview", async ({
  page,
}) => {
  await page.goto("/");

  // 1. Existing 8 advanced services unchanged
  const advancedPreview = page.locator("#service-preview");
  await expect(advancedPreview).toBeVisible();
  const advancedIndex = page
    .locator(".editorial-services")
    .first()
    .locator(".service-index");
  await expect(advancedIndex.locator("li")).toHaveCount(8);

  // 2. Basic services section immediately below
  const basicSection = page.locator(".basic-services-section");
  await expect(basicSection).toBeVisible();
  const basicPreview = page.locator("#basic-services-preview");
  const basicIndex = basicSection.locator(".service-index");
  await expect(basicIndex.locator("li")).toHaveCount(3);
  await expect(
    basicIndex.getByRole("link", { name: "Taping" }),
  ).toBeVisible();
  await expect(
    basicIndex.getByRole("link", { name: "Neuro Rehabilitation" }),
  ).toBeVisible();
  await expect(
    basicIndex.getByRole("link", { name: "PEMF Therapy" }),
  ).toBeVisible();

  // Hover to preview on basic services
  const neuroLink = basicIndex.getByRole("link", {
    name: "Neuro Rehabilitation",
  });
  await neuroLink.hover();
  await expect(neuroLink).toHaveAttribute("data-preview-active", "true");
  await expect(
    basicPreview.getByRole("img", {
      name: /practicing balanced walking between parallel rehabilitation bars/,
    }),
  ).toBeVisible();
  await expect(
    basicPreview.getByText(
      "Guided gait and balance retraining in a clinical rehabilitation setting",
    ),
  ).toBeVisible();

  // Hover on PEMF Therapy to preview PEMF image
  const pemfLink = basicIndex.getByRole("link", { name: "PEMF Therapy" });
  await pemfLink.hover();
  await expect(pemfLink).toHaveAttribute("data-preview-active", "true");
  await expect(
    basicPreview.getByRole("img", {
      name: /pulsed electromagnetic/i,
    }),
  ).toBeVisible();

  // Explore All Basic Services CTA
  const exploreAllCta = basicSection.getByRole("link", {
    name: "Explore All Basic Services",
  });
  await expect(exploreAllCta).toHaveAttribute("href", "/basic-services");
  await exploreAllCta.click();
  await expect(page).toHaveURL(/\/basic-services$/);
});

test("dedicated basic services page renders 12 services with working catalogue filters", async ({
  page,
}) => {
  await page.goto("/basic-services");
  await expect(page.locator("h1")).toHaveText(
    "Essential care for everyday recovery.",
  );

  const cards = page.locator("#basic-service-directory-results article");
  await expect(cards).toHaveCount(12);

  // Filter: Physical modalities
  await page
    .getByRole("button", { name: "Physical modalities", exact: true })
    .click();
  await expect(cards).toHaveCount(6);

  // Filter: Manual & Soft tissue
  await page
    .getByRole("button", { name: "Manual & Soft tissue", exact: true })
    .click();
  await expect(cards).toHaveCount(4);

  // Filter: Rehabilitation & Movement
  await page
    .getByRole("button", { name: "Rehabilitation & Movement", exact: true })
    .click();
  await expect(cards).toHaveCount(2);

  // Reset to All
  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(cards).toHaveCount(12);

  // Navigate to an individual basic service detail page
  const tapingLink = page
    .locator("#taping")
    .getByRole("link", { name: "Explore service details" });
  await tapingLink.click();
  await expect(page).toHaveURL(/\/basic-services\/taping$/);
  await expect(page.locator("h1")).toHaveText(
    "Targeted joint and soft-tissue support during active recovery.",
  );
  await expect(
    page.getByRole("link", { name: "Basic Services" }),
  ).toBeVisible();
});

