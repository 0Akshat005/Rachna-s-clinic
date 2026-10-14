import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const checks = [];
try {
  for (const width of [1440, 1920, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: width > 767 ? 1000 : 844 });
    await page.goto("http://localhost:3000/about");
    await page.evaluate(() => document.fonts.ready);
    await page
      .locator("figure img")
      .first()
      .evaluate((image) => image.decode());
    await page.waitForFunction(() =>
      document
        .getAnimations()
        .every((animation) => animation.playState !== "running"),
    );
    checks.push(
      await page.evaluate(() => ({
        viewport: window.innerWidth,
        overflow:
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
        headline: document.querySelector("h1").textContent,
      })),
    );
    await page.screenshot({
      path: "artifacts/about-redesign-" + width + ".png",
      fullPage: width === 1440 || width === 390,
    });
    if (width === 1440 || width === 390) {
      await page
        .locator('nav[aria-label="Explore the About page"]')
        .getByRole("link", { name: /Your first visit/ })
        .click();
      await page.locator("#your-first-visit summary").nth(1).click();
      await page.waitForFunction(() =>
        document
          .getAnimations()
          .every((animation) => animation.playState !== "running"),
      );
      await page
        .locator("#your-first-visit")
        .screenshot({ path: "artifacts/about-first-visit-" + width + ".png" });
    }
  }
  console.log(JSON.stringify({ errors, checks }));
} finally {
  await browser.close();
}
