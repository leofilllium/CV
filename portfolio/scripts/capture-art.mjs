import { chromium } from "@playwright/test";
const browser = await chromium.launch({
  executablePath:
    process.env.PLAYWRIGHT_CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--enable-webgl", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1.5,
    colorScheme: "dark",
  });
  await page.goto("http://127.0.0.1:3100", { waitUntil: "networkidle" });
  const activate = page.getByRole("button", { name: "Explore in 3D" });
  if (await activate.count()) await activate.click({ force: true });
  await page.locator("canvas").waitFor();
  await page.getByRole("button", { name: "Pause motion", exact: true }).click();
  await page.waitForTimeout(300);
  await page.addStyleTag({
    content:
      "html,body{background:transparent!important}.hero-copy,.scene-caption,.scene-controls,.scene-hint,.orbital-grid,.hero-baseline,.site-header,.utility-dock{visibility:hidden!important}",
  });
  await page
    .locator("canvas")
    .screenshot({ path: "public/images/orbital-poster.png", omitBackground: true });
} finally {
  await browser.close();
}
