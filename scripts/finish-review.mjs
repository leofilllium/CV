import { chromium, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const browser = await chromium.launch({
  executablePath:
    process.env.PLAYWRIGHT_CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--enable-webgl", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
await mkdir("docs/preview", { recursive: true });
const report = { widths: [], extraChecks: [], errors: [] };
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    colorScheme: "dark",
  });
  page.on("pageerror", (e) => report.errors.push(e.message));
  await page.goto("http://127.0.0.1:3100", { waitUntil: "networkidle" });
  await page.screenshot({ path: "docs/preview/desktop.png" });
  await page.screenshot({ path: "docs/preview/full-page.png", fullPage: true });
  for (const width of [1440, 1366, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
    await page.evaluate(
      () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
    );
    report.widths.push({
      width,
      overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
    });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "docs/preview/mobile.png" });
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await page.getByRole("button", { name: "Search projects", exact: true }).click();
  await page.getByRole("searchbox", { name: "Search projects" }).fill("Python");
  await expect(page.getByRole("dialog").getByRole("link", { name: /MediTrack/ })).toBeVisible();
  report.extraChecks.push("Mobile menu search works");
  await page.keyboard.press("Escape");
  await page.goto("http://127.0.0.1:3100/ru", { waitUntil: "networkidle" });
  await page.screenshot({ path: "docs/preview/mobile-ru.png" });
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await page.screenshot({ path: "docs/preview/mobile-light.png" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("http://127.0.0.1:3100/work/safar-one", { waitUntil: "networkidle" });
  await page.screenshot({ path: "docs/preview/case-study.png", fullPage: true });
  await page.goto("http://127.0.0.1:3100/work/clubhub", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("ClubHub");
  await page.screenshot({ path: "docs/preview/clubhub-desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:3100/ru/work/clubhub", { waitUntil: "networkidle" });
  await page.screenshot({ path: "docs/preview/clubhub-mobile.png", fullPage: true });
  report.extraChecks.push("ClubHub case study captured on desktop and phone in both languages");
  const noJs = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1366, height: 768 },
  });
  const staticPage = await noJs.newPage();
  await staticPage.goto("http://127.0.0.1:3100");
  await expect(staticPage.locator("h1")).toContainText("IDEAS INTO");
  await expect(staticPage.locator(".project-entry")).toHaveCount(4);
  await expect(staticPage.locator(".education-band")).toContainText("Studies ongoing");
  report.extraChecks.push("Core text, project links, and education visible without JavaScript");
  await noJs.close();
  const noGl = await browser.newContext({ viewport: { width: 1366, height: 768 } });
  await noGl.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (type === "webgl" || type === "webgl2" || type === "experimental-webgl") return null;
      return original.call(this, type, ...args);
    };
  });
  const fallback = await noGl.newPage();
  await fallback.goto("http://127.0.0.1:3100");
  await fallback.getByRole("button", { name: "Explore in 3D" }).click({ force: true });
  await expect(fallback.locator(".scene-fallback")).toBeVisible();
  await expect(fallback.getByRole("button", { name: "Preview mode" })).toBeVisible();
  await expect(fallback.locator(".scene-hint")).toContainText("3D could not start");
  await expect(fallback.locator("h1")).toBeVisible();
  report.extraChecks.push("WebGL-disabled browser gets visible fallback and readable content");
  await noGl.close();
  await writeFile("docs/preview/review.json", JSON.stringify(report, null, 2));
  expect(report.widths.every((entry) => !entry.overflow)).toBe(true);
  expect(report.errors).toEqual([]);
  console.log(JSON.stringify(report));
} finally {
  await browser.close();
}
