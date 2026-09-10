import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("test-results/performance", { recursive: true });
const chrome = await launch({
  chromePath:
    process.env.PLAYWRIGHT_CHROME_PATH ||
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  chromeFlags: [
    "--headless",
    "--disable-gpu",
    "--enable-webgl",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "--no-first-run",
  ],
});
try {
  for (const device of ["desktop", "mobile"]) {
    const result = await lighthouse("http://127.0.0.1:3100", {
      port: chrome.port,
      output: ["html", "json"],
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      ...(device === "desktop"
        ? {
            formFactor: "desktop",
            screenEmulation: {
              mobile: false,
              width: 1440,
              height: 1000,
              deviceScaleFactor: 1,
              disabled: false,
            },
            throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1 },
          }
        : {}),
    });
    if (!result) throw Error("No Lighthouse report");
    await writeFile(`test-results/performance/${device}.html`, result.report[0]);
    await writeFile(`test-results/performance/${device}.json`, result.report[1]);
    const { categories, audits } = result.lhr;
    console.log(
      JSON.stringify({
        device,
        scores: Object.fromEntries(
          Object.entries(categories).map(([k, v]) => [k, Math.round(v.score * 100)]),
        ),
        metrics: Object.fromEntries(
          [
            "first-contentful-paint",
            "largest-contentful-paint",
            "total-blocking-time",
            "cumulative-layout-shift",
          ].map((k) => [k, audits[k].displayValue]),
        ),
        improvements: Object.values(audits)
          .filter((x) => x.score !== null && x.score < 0.9 && x.details)
          .map((x) => ({ id: x.id, title: x.title, value: x.displayValue })),
      }),
    );
  }
} finally {
  await chrome.kill();
}
