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
    await page.goto("http://localhost:3000/services");
    await page.evaluate(() => document.fonts.ready);
    const cards = page.locator(".directory-grid article");
    for (const card of await cards.all()) {
      await card.scrollIntoViewIfNeeded();
      await card.locator("img").evaluate((image) => image.decode());
    }
    await page.waitForFunction(() =>
      document
        .getAnimations()
        .every((animation) => animation.playState !== "running"),
    );
    checks.push(
      await cards.evaluateAll((nodes) => ({
        viewport: innerWidth,
        overflow:
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
        cards: nodes.map((card) => {
          const link = card.querySelector("a");
          const image = card.querySelector("img");
          const rect = card.getBoundingClientRect();
          const title = card.querySelector("h3").getBoundingClientRect();
          return {
            title: card.querySelector("h3").textContent,
            loaded: image.complete && image.naturalWidth > 0,
            imageWidth: image.naturalWidth,
            singleAction: card.querySelectorAll("a").length === 1,
            titleWithinCard:
              title.left >= rect.left &&
              title.right <= rect.right &&
              title.top >= rect.top &&
              title.bottom <= rect.bottom,
            destination: link.getAttribute("href"),
          };
        }),
      })),
    );
    await page.locator("#service-directory-heading").evaluate((heading) => {
      window.scrollTo({
        top: heading.getBoundingClientRect().top + window.scrollY - 120,
        behavior: "instant",
      });
    });
    await page.screenshot({
      path: "artifacts/services-visual-" + width + ".png",
    });
    if (width === 1440) {
      await page.locator(".directory-grid").screenshot({
        path: "artifacts/services-visual-grid-desktop.png",
        style: ".site-header, .mobile-dock { visibility: hidden !important; }",
      });
    }
    if (width === 1920 || width === 1024) {
      await cards.last().screenshot({
        path: "artifacts/service-wide-" + width + ".png",
        style: ".site-header, .mobile-dock { visibility: hidden !important; }",
      });
    }
    if (width === 390 || width === 320) {
      for (const index of [0, 1, 3, 5, 6]) {
        await cards.nth(index).screenshot({
          path: "artifacts/service-card-" + index + "-" + width + ".png",
          style:
            ".site-header, .mobile-dock { visibility: hidden !important; }",
        });
      }
    }
  }
  const noJs = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const staticPage = await noJs.newPage();
  await staticPage.goto("http://localhost:3000/services");
  const staticCards = await staticPage
    .locator(".directory-grid article")
    .count();
  await staticPage
    .locator(".directory-grid article")
    .first()
    .getByRole("link")
    .click();
  const staticNavigation =
    new URL(staticPage.url()).pathname === "/services/spine-care";
  await noJs.close();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("http://localhost:3000/services");
  const filter = page.getByRole("button", {
    name: "Specialist therapies",
    exact: true,
  });
  await filter.focus();
  await page.keyboard.press("Enter");
  const reducedMotion = await page.evaluate(() => ({
    runningAnimations: document
      .getAnimations()
      .filter((animation) => animation.playState === "running").length,
    filterFocused:
      document.activeElement?.textContent.trim() === "Specialist therapies",
    cards: document.querySelectorAll(".directory-grid article").length,
  }));
  console.log(
    JSON.stringify({
      errors,
      checks,
      noJavaScript: { staticCards, staticNavigation },
      reducedMotion,
    }),
  );
} finally {
  await browser.close();
}
