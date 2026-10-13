import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("http://localhost:3000/");
    await page.evaluate(() => document.fonts.ready);
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();
    console.log(
      JSON.stringify({
        width,
        dimensions: await page.evaluate(() => ({
          viewport: document.documentElement.clientWidth,
          content: document.documentElement.scrollWidth,
        })),
        credit: await footer
          .getByText("Designed & Developed by", { exact: false })
          .textContent(),
        links: await footer
          .locator("a")
          .evaluateAll((links) =>
            links.map((a) => ({
              text: a.textContent,
              href: a.getAttribute("href"),
            })),
          ),
      }),
    );
    if ([390, 1024, 1440].includes(width)) {
      await page.addStyleTag({
        content: ".mobile-dock { visibility: hidden; }",
      });
      await footer.screenshot({ path: "artifacts/footer-" + width + ".png" });
    }
  }
} finally {
  await browser.close();
}
