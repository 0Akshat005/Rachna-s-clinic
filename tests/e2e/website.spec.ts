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
    .getByRole("button", { name: "Specialist modalities", exact: true })
    .click();
  await expect(page.locator(".directory-grid article")).toHaveCount(4);
  await page
    .getByRole("button", { name: "Strength & Pilates", exact: true })
    .click();
  await expect(page.locator(".directory-grid article")).toHaveCount(1);
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
test("preview has no third-party embeds or indexable business claims", async ({
  page,
  request,
}) => {
  await page.goto("/contact");
  await expect(page.locator("iframe")).toHaveCount(0);
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
