import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--enable-webgl', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const errors = [];
await mkdir('test-results/visual', { recursive: true });
try {
 const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, colorScheme: 'dark' });
 page.on('pageerror', e => errors.push(e.message));
 await page.goto('http://127.0.0.1:3100', { waitUntil: 'networkidle' });
 await page.waitForTimeout(1500);
 await page.screenshot({ path: 'test-results/visual/desktop-hero.png' });
 await page.screenshot({ path: 'test-results/visual/desktop-full.png', fullPage: true });
 console.log(JSON.stringify({ title: await page.title(), canvas: await page.locator('canvas').count(), errors, overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth) }));
 await page.setViewportSize({ width: 390, height: 844 });
 await page.goto('http://127.0.0.1:3100', { waitUntil: 'networkidle' });
 await page.screenshot({ path: 'test-results/visual/mobile-hero.png' });
 await page.screenshot({ path: 'test-results/visual/mobile-full.png', fullPage: true });
 console.log(JSON.stringify({ mobileOverflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), errors }));
 await page.goto('http://127.0.0.1:3100/ru', { waitUntil: 'networkidle' });
 await page.screenshot({ path: 'test-results/visual/mobile-ru.png' });
 await page.getByRole('button', { name: 'Switch to light theme' }).click();
 await page.setViewportSize({ width: 1440, height: 1000 });
 await page.screenshot({ path: 'test-results/visual/light-ru.png' });
 await writeFile('test-results/visual/errors.json', JSON.stringify(errors, null, 2));
} finally { await browser.close(); }
