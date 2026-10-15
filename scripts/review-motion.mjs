import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
try {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("http://localhost:3000/");
  await page.evaluate(() => document.fonts.ready);
  await page
    .locator(".movement-hero-photo img")
    .evaluate((img) => img.decode());
  await page.waitForFunction(() =>
    document.getAnimations().every((a) => a.playState !== "running"),
  );
  await page.screenshot({
    path: "artifacts/motion-home-desktop.png",
    fullPage: true,
  });
  await page.locator(".editorial-services").scrollIntoViewIfNeeded();
  await page.waitForFunction(() =>
    [...document.querySelectorAll(".editorial-services [data-reveal]")].every(
      (node) => node.dataset.revealed === "true",
    ),
  );
  await page.waitForFunction(() =>
    document.getAnimations().every((a) => a.playState !== "running"),
  );
  await page
    .locator("#service-preview .photo-inner img")
    .evaluate((img) => img.decode());
  await page
    .locator(".editorial-services")
    .screenshot({ path: "artifacts/motion-services-overview.png" });
  await page.locator(".service-index a").nth(4).hover();
  await page.waitForFunction(
    () =>
      document.querySelector("#service-preview h3")?.textContent ===
      "Laser Therapy",
  );
  await page.waitForFunction(
    () =>
      document.querySelectorAll("#service-preview .photo-inner img").length ===
        1 && document.getAnimations().every((a) => a.playState !== "running"),
  );
  await page
    .locator(".editorial-services")
    .screenshot({ path: "artifacts/motion-services-laser.png" });
  await page.locator(".faq-list summary").first().click();
  await page.waitForFunction(() =>
    document.getAnimations().every((a) => a.playState !== "running"),
  );
  await page
    .locator(".faq-section")
    .screenshot({ path: "artifacts/motion-faq-open.png" });
  console.log(
    JSON.stringify({
      errors,
      detailsMotion: await page.evaluate(
        () =>
          CSS.supports("interpolate-size", "allow-keywords") &&
          CSS.supports("selector(::details-content)"),
      ),
    }),
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://localhost:3000/");
  await page.evaluate(() => document.fonts.ready);
  await page
    .locator(".movement-hero-photo img")
    .evaluate((img) => img.decode());
  await page.waitForFunction(() =>
    document.getAnimations().every((a) => a.playState !== "running"),
  );
  await page.screenshot({
    path: "artifacts/motion-home-mobile.png",
    fullPage: true,
  });
  await page.locator("#service-preview").scrollIntoViewIfNeeded();
  await page.evaluate(() =>
    window.scrollTo({
      top:
        window.scrollY +
        document.querySelector("#service-preview").getBoundingClientRect().top -
        110,
      behavior: "instant",
    }),
  );
  await page.waitForFunction(
    () =>
      document.querySelector("#service-preview").dataset.revealed === "true",
  );
  await page.waitForFunction(() =>
    document.getAnimations().every((a) => a.playState !== "running"),
  );
  await page
    .locator("#service-preview")
    .screenshot({ path: "artifacts/motion-preview-mobile.png" });
} finally {
  await browser.close();
}
