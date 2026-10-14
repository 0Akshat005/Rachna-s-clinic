import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
const checks = [];
try {
  for (const width of [1280, 390]) {
    await page.setViewportSize({ width, height: width > 767 ? 800 : 844 });
    await page.goto("http://localhost:3000/contact");
    const map = page.locator(".map-shell");
    await map.scrollIntoViewIfNeeded();
    const frame = page.frameLocator(".map-shell iframe");
    await frame
      .getByRole("link", {
        name: "Open in Maps (opens in new tab)",
        exact: true,
      })
      .waitFor({ state: "visible", timeout: 20000 });
    await frame
      .getByRole("link", { name: "Terms (opens in new tab)", exact: true })
      .waitFor({ state: "visible", timeout: 20000 });
    const section = map.locator("xpath=ancestor::section");
    checks.push(
      await map.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return {
          viewport: innerWidth,
          width: rect.width,
          height: rect.height,
          overflow:
            document.documentElement.scrollWidth >
            document.documentElement.clientWidth,
          embed: element.querySelector("iframe").src,
        };
      }),
    );
    await section.screenshot({
      path: "artifacts/clinic-map-" + width + ".png",
      style: ".site-header, .mobile-dock {visibility:hidden !important}",
    });
  }
  await writeFile(
    "artifacts/clinic-map-checks.json",
    JSON.stringify(checks, null, 2),
  );
  console.log(
    JSON.stringify(checks.map((check) => ({ ...check, embed: undefined }))),
  );
} finally {
  await browser.close();
}
