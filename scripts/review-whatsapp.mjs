import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({ reducedMotion: "reduce" });
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const checks = [];
try {
  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: width > 767 ? 1200 : 844 });
    await page.goto("http://localhost:3000/contact");
    await page.evaluate(() => document.fonts.ready);
    const section = page.locator("#contact-enquiry");
    await section.scrollIntoViewIfNeeded();
    checks.push(
      await page.evaluate(() => ({
        width: innerWidth,
        overflow:
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
        forms: document.querySelectorAll("form.booking-form").length,
        phones: [
          ...new Set(
            Array.from(document.querySelectorAll('a[href^="tel:"]'), (a) =>
              a.getAttribute("href"),
            ),
          ),
        ],
      })),
    );
    await section.screenshot({
      path: "artifacts/whatsapp-contact-" + width + ".png",
      style: ".site-header, .mobile-dock {visibility:hidden !important}",
    });
    if (width === 1440 || width === 390) {
      await page.locator("footer").screenshot({
        path: "artifacts/whatsapp-footer-" + width + ".png",
        style: ".site-header, .mobile-dock {visibility:hidden !important}",
      });
    }
  }
  await context.route("https://wa.me/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<title>WhatsApp test preview</title>",
    }),
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://localhost:3000/contact");
  await page.getByLabel("Full name", { exact: true }).fill("Sample Visitor");
  await page.getByLabel("Phone number", { exact: true }).fill("9876543210");
  await page.getByLabel(/General area/).selectOption("General assessment");
  await page.getByRole("checkbox").check();
  const opened = context.waitForEvent("page");
  await page
    .getByRole("button", { name: "Continue to WhatsApp", exact: true })
    .click();
  const popup = await opened;
  await popup.waitForLoadState("domcontentloaded");
  const url = new URL(popup.url());
  const preparedMessage = url.searchParams.get("text");
  await popup.close();
  await page.locator(".booking-form").screenshot({
    path: "artifacts/whatsapp-message-ready-390.png",
    style: ".site-header, .mobile-dock {visibility:hidden !important}",
  });
  await writeFile(
    "artifacts/whatsapp-review.json",
    JSON.stringify(
      { checks, errors, recipient: url.pathname, preparedMessage },
      null,
      2,
    ),
  );
  console.log(
    JSON.stringify({
      checks,
      errors,
      recipient: url.pathname,
      preparedMessage,
    }),
  );
} finally {
  await browser.close();
}
