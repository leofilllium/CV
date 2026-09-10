import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const slugs = ["safar-one", "lawyer-ai", "study-ninja", "sado-ai", "nikoh-uz", "game-studio", "marketcard", "meditrack"];

test("content, filters, case-study navigation, and public CV", async ({ page, request }) => {
  const errors: string[] = [];
  page.on("pageerror", e => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("IDEAS INTO");
  await expect(page.locator(".hero-eyebrow")).toContainText("MIDDLE");
  await expect(page.locator("body")).not.toContainText(/99[.,]8|6 commercial|six commercial|Senior Flutter/);
  await expect(page.locator(".education-band")).toContainText("Studies ongoing");
  await expect(page.locator(".project-entry")).toHaveCount(4);
  await page.getByRole("button", { name: "Games & tools", exact: true }).click();
  await expect(page.locator(".project-entry")).toHaveCount(1);
  await expect(page.locator(".project-entry")).toContainText("Game Studio");
  await page.getByRole("button", { name: "All worlds", exact: true }).click();
  await page.getByRole("button", { name: "Explore all 8 projects" }).click();
  await expect(page.locator(".project-entry")).toHaveCount(8);
  await page.locator('.project-link[href="/work/lawyer-ai"]').click();
  await expect(page).toHaveURL(/\/work\/lawyer-ai$/);
  await expect(page.locator("h1")).toHaveText("Lawyer AI");
  await expect(page.getByRole("link", { name: "Explore the code" })).toHaveAttribute("href", "https://github.com/leofilllium/AI-UZ-Lawyer-Mobile");
  await page.getByRole("link", { name: "RU: Переключить на русский" }).click();
  await expect(page).toHaveURL(/\/ru\/work\/lawyer-ai$/);
  await expect(page.getByRole("heading", { name: "Мой подход" })).toBeVisible();
  const pdf = await request.get("/Sherzod-Akhmedov-CV-RU.pdf");
  expect(pdf.status()).toBe(200);
  expect((await pdf.body()).subarray(0, 4).toString()).toBe("%PDF");
  expect(errors).toEqual([]);
});

test("search, empty results, recruiter facts, and keyboard dismissal", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press(process.platform === "darwin" ? "Meta+k" : "Control+k");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.getByRole("searchbox", { name: "Search projects" }).fill("ChromaDB");
  await expect(dialog.getByRole("link", { name: /Lawyer AI/ })).toBeVisible();
  await expect(dialog.getByRole("link")).toHaveCount(1);
  await page.getByRole("searchbox", { name: "Search projects" }).fill("xyz-not-a-project");
  await expect(dialog).toContainText("No matches yet");
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await page.getByRole("button", { name: "Recruiter view" }).click();
  await expect(dialog).toContainText("Middle Flutter");
  await expect(dialog).toContainText("studies ongoing");
  await expect(dialog).not.toContainText(/Senior|99[.,]8|6 commercial/);
  await expect(dialog.getByRole("link", { name: "Download CV (RU)" })).toHaveAttribute("download", "");
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Recruiter view" })).toBeFocused();
});

test("interactive system architecture and reachable game completion", async ({ page }) => {
  await page.goto("/#playground");
  await page.getByRole("button", { name: "Voice agent", exact: true }).click();
  await page.getByRole("button", { name: /04 Text to speech/ }).click();
  await expect(page.locator(".node-explanation")).toContainText("Speech synthesis");
  await page.getByRole("tab", { name: "Orbit mission" }).click();
  await page.getByRole("button", { name: "Launch mission" }).click();
  await expect(page.locator(".game-grid")).toBeFocused();
  for (const key of ["ArrowRight", "ArrowRight", "ArrowRight", "ArrowRight", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowLeft", "ArrowRight", "ArrowRight", "ArrowDown", "ArrowDown"]) {
    await page.keyboard.press(key);
  }
  await expect(page.locator(".game-stats")).toContainText("3/3");
  await expect(page.locator(".game-message")).toContainText("Mission complete in 12 moves");
  await page.getByRole("button", { name: "Try again" }).click();
  await expect(page.locator(".game-stats")).toContainText("0/3");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("ArrowDown");
  await expect(page.locator(".game-message")).toContainText("Asteroid ahead");
  await expect(page.locator(".game-stats b").nth(1)).toHaveText("1");
});

test("3D controls, pause, and persistent theme switch", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Explore in 3D" }).click({ force: true });
  await expect(page.locator("canvas")).toBeVisible();
  await page.getByRole("group", { name: "Choose 3D object" }).getByRole("button", { name: "Mobile", exact: true }).click();
  await expect(page.getByRole("group", { name: "Choose 3D object" }).getByRole("button", { name: "Mobile", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Disassemble object" }).click();
  await expect(page.getByRole("button", { name: "Assemble object" })).toBeVisible();
  await page.getByRole("button", { name: "Pause motion" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "calm");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "calm");
});

test("all published routes, metadata, and missing-route behavior", async ({ request }) => {
  for (const prefix of ["", "/ru"]) {
    for (const slug of slugs) {
      const response = await request.get(`${prefix}/work/${slug}`);
      expect(response.status(), `${prefix}/work/${slug}`).toBe(200);
      expect(await response.text()).toContain("application/ld+json");
    }
  }
  expect((await request.get("/work/missing-project")).status()).toBe(404);
  const og = await request.get("/opengraph-image");
  expect(og.status()).toBe(200);
  expect(og.headers()["content-type"]).toContain("image/png");
  const sitemap = await request.get("/sitemap.xml");
  expect((await sitemap.text()).match(/<loc>/g)?.length).toBe(18);
});

test("phone layout, Russian localization, touch game and reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/ru");
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "calm");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("button", { name: "Открыть меню" }).click();
  await page.getByRole("dialog").getByRole("link", { name: "Лаборатория" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("tab", { name: "Орбитальная миссия" }).click();
  await page.getByRole("button", { name: "Запустить миссию" }).click();
  await page.getByRole("button", { name: "Двигаться right", exact: true }).click();
  await expect(page.locator(".game-stats b").nth(1)).toHaveText("1");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "test-results/mobile-playground.png" });
});

test("accessible initial page and recruiter dialog in both themes", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Pause motion" }).click();
  for (const theme of ["dark", "light"]) {
    if (theme === "light") await page.getByRole("button", { name: "Switch to light theme" }).click();
    const baseline = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(baseline.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) }))).toEqual([]);
    await page.getByRole("button", { name: "Recruiter view" }).click();
    const modal = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(modal.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) }))).toEqual([]);
    await page.keyboard.press("Escape");
  }
});

test("WebGL failure retains preview and reports a completed fallback state", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(type: string, ...args: unknown[]) {
      if (["webgl", "webgl2", "experimental-webgl"].includes(type)) return null;
      return original.apply(this, [type, ...args] as Parameters<typeof original>);
    } as typeof original;
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Explore in 3D" }).click({ force: true });
  await expect(page.getByRole("button", { name: "Preview mode" })).toBeVisible();
  await expect(page.locator(".scene-hint")).toContainText("3D could not start");
  await expect(page.getByRole("button", { name: "Disassemble object" })).toBeDisabled();
  await expect(page.getByRole("heading", { name: "IDEAS INTO NEW WORLDS." })).toBeVisible();
});
