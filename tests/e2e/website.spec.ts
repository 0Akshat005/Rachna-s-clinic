import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/services",
  "/about",
  "/contact",
  "/request-appointment",
  "/privacy",
  "/services/spine-care",
  "/services/osteopathy-matrix-rhythm-therapy",
  "/services/dry-needling",
  "/services/cupping-therapy",
  "/services/tecar-laser-therapy",
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
  await expect(page.locator(".directory-grid article")).toHaveCount(4);
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
  await expect(page.locator(".directory-grid article")).toHaveCount(7);
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
test("appointment form validates and posts to the real preview endpoint", async ({
  page,
}) => {
  await page.goto("/request-appointment");
  await page
    .getByRole("button", { name: "Preview appointment request" })
    .click();
  await expect(page.getByLabel("Full name", { exact: true })).toBeFocused();
  await expect(page.locator("#name-error")).toBeVisible();
  await page.getByLabel("Full name", { exact: true }).fill("Preview Visitor");
  await page.getByLabel("Phone number", { exact: true }).fill("9876543210");
  await page.getByRole("checkbox").check();
  const response = page.waitForResponse("/api/appointment-requests");
  await page
    .getByRole("button", { name: "Preview appointment request" })
    .click();
  expect((await response).status()).toBe(200);
  await expect(
    page.getByRole("heading", { name: "Preview complete." }),
  ).toBeVisible();
  await expect(page.getByRole("status")).toContainText(
    "No appointment request was sent",
  );
  await expect(page.getByLabel("Full name", { exact: true })).toHaveValue("");
});
test("delivery failures keep form details and show an accessible error", async ({
  page,
}) => {
  await page.goto("/request-appointment");
  await page.route("**/api/appointment-requests", (route) =>
    route.fulfill({
      status: 502,
      contentType: "application/json",
      body: JSON.stringify({
        message:
          "Your request could not be delivered. Please retry or contact the clinic directly.",
      }),
    }),
  );
  await page.getByLabel("Full name", { exact: true }).fill("Preview Visitor");
  await page.getByLabel("Phone number", { exact: true }).fill("9876543210");
  await page.getByRole("checkbox").check();
  await page
    .getByRole("button", { name: "Preview appointment request" })
    .click();
  await expect(page.locator(".form-status[role=alert]")).toContainText(
    "could not be delivered",
  );
  await expect(page.getByLabel("Full name", { exact: true })).toHaveValue(
    "Preview Visitor",
  );
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
    "TECAR & Laser Therapy",
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
    "Pilates Training, 7 of 7",
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
    "Physiotherapy for everyday movement.",
  );
  await expect(
    page.getByRole("link", { name: "Request an assessment", exact: true }),
  ).toHaveAttribute("href", "/request-appointment");
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
