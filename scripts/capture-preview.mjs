import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  for (const [route, width, height, name] of [
    ["/", 1440, 1000, "home-first-screen.png"],
    ["/", 1920, 1080, "home-wide-screen.png"],
    ["/", 390, 844, "home-mobile-first-screen.png"],
    ["/services", 1440, 1200, "services-desktop.png"],
    ["/request-appointment", 390, 844, "booking-mobile.png"],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto("http://localhost:3000" + route);
    await page.evaluate(() => document.fonts.ready);
    for (const photo of await page
      .locator(".movement-hero-photo img, .page-hero-photo img")
      .all()) {
      await photo.evaluate((node) => node.decode());
    }
    await page.screenshot({
      path: "artifacts/" + name,
      fullPage: route !== "/",
    });
  }
} finally {
  await browser.close();
}
