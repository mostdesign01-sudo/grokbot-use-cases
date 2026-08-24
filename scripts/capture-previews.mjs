/**
 * One-off / maintenance: capture self-hosted card thumbnails.
 *
 *   npm i -D playwright sharp
 *   node scripts/capture-previews.mjs
 *
 * Uses the system Chrome channel when available. Sites that block headless
 * browsers are skipped (cards keep the CSS poster fallback).
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "previews");
const WIDTH = 1000;
const VIEWPORT = { width: 1200, height: 800 };

const LANDING_IDS = new Set([
  "sketchbook",
  "kage",
  "complete-shelf",
  "sylva-living-green",
]);

async function loadJson(rel) {
  return JSON.parse(await readFile(join(root, rel), "utf8"));
}

function targets() {
  const only = process.argv.find((arg) => arg.startsWith("--only="))?.slice(7);
  const all = [
    ...html.items.map((item) => ({ lib: "html", id: item.id, title: item.title, url: item.sourceUrl })),
    ...agent.items.map((item) => ({ lib: "agent-ui", id: item.id, title: item.title, url: item.sourceUrl })),
  ];
  return only ? all.filter((item) => item.lib === only) : all;
}

const html = await loadJson("data/html-items.json");
const agent = await loadJson("data/agent-ui.json");

async function dismissOverlays(page) {
  const clicks = [
    "#onetrust-accept-btn-handler",
    "button:has-text('Accept all')",
    "button:has-text('Accept All')",
    "button:has-text('Accept')",
    "button:has-text('I agree')",
    "button:has-text('Got it')",
    "button:has-text('OK')",
    "button:has-text('Close')",
    "[aria-label='Close']",
    "[aria-label='Dismiss']",
  ];
  for (const sel of clicks) {
    const loc = page.locator(sel).first();
    if (await loc.count()) {
      try {
        await loc.click({ timeout: 800 });
      } catch {
        /* ignore */
      }
    }
  }
}

function looksLikeNotFound(text, title) {
  const blob = `${title}\n${text}`.toLowerCase();
  if (/(page not found|404 not found|couldn't find|could not find|this page doesn’t exist|this page doesn't exist)/i.test(blob)) {
    return true;
  }
  return false;
}

async function waitForExpectedTitle(page, title) {
  if (!title) return;
  const token = title.split(/[·•]/)[0].trim().toLowerCase();
  const started = Date.now();
  while (Date.now() - started < 16000) {
    const docTitle = (await page.title()).toLowerCase();
    const h1 = await page
      .locator("h1")
      .first()
      .textContent()
      .catch(() => "");
    if (docTitle.includes(token) || (h1 || "").toLowerCase().includes(token)) return;
    await page.waitForTimeout(400);
  }
  const docTitle = await page.title();
  throw new Error(`title mismatch: "${docTitle}"`);
}

async function largestCanvasScreenshot(page) {
  const canvases = page.locator("canvas");
  const count = await canvases.count();
  let best = null;
  for (let i = 0; i < count; i += 1) {
    const canvas = canvases.nth(i);
    const box = await canvas.boundingBox();
    if (!box) continue;
    const area = box.width * box.height;
    if (box.width >= 280 && box.height >= 200 && (!best || area > best.area)) {
      best = { canvas, area };
    }
  }
  if (!best) return null;
  return best.canvas.screenshot({ type: "png" });
}

async function captureBuffer(page, id, lib, title) {
  if (lib !== "agent-ui") {
    await page.waitForTimeout(1400);
    await dismissOverlays(page);
  } else {
    await waitForExpectedTitle(page, title);
    await page.waitForTimeout(LANDING_IDS.has(id) ? 2000 : 2500);
    const clipped = await largestCanvasScreenshot(page);
    if (clipped) return clipped;
  }

  return page.screenshot({ type: "png", animations: "disabled" });
}

async function isUsefulImage(sharp, buf) {
  const stats = await sharp(buf).stats();
  const channels = stats.channels.filter((c) => c.mean !== undefined);
  const stdev = channels.reduce((sum, c) => sum + c.stdev, 0) / Math.max(channels.length, 1);
  const mean = channels.reduce((sum, c) => sum + c.mean, 0) / Math.max(channels.length, 1);
  if (stdev < 7) return false;
  if (mean < 6 || mean > 250) return false;
  return true;
}

async function main() {
  const [{ chromium }, sharpMod] = await Promise.all([import("playwright"), import("sharp")]);
  const sharp = sharpMod.default;
  await mkdir(outDir, { recursive: true });

  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
  });

  const results = [];

  for (const item of targets()) {
    const context = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    page.setDefaultTimeout(20000);
    const started = Date.now();
    try {
      const response = await page.goto(item.url, {
        waitUntil: "domcontentloaded",
        timeout: 45000,
      });
      const status = response?.status() ?? 0;
      if (status >= 400) throw new Error(`HTTP ${status}`);

      if (item.lib !== "agent-ui") {
        await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
      } else {
        await page.waitForTimeout(5500);
      }
      const title = await page.title();
      const text = await page.locator("body").innerText().catch(() => "");
      if (looksLikeNotFound(text.slice(0, 1200), title)) {
        throw new Error("page looks like 404");
      }

      const raw = await captureBuffer(page, item.id, item.lib, item.title);
      if (!(await isUsefulImage(sharp, raw))) {
        throw new Error("screenshot looks blank / blocked");
      }

      const dest = join(outDir, `${item.id}.webp`);
      await sharp(raw)
        .resize({ width: WIDTH, withoutEnlargement: true })
        .webp({ quality: 72, effort: 5 })
        .toFile(dest);

      results.push({ ...item, ok: true, ms: Date.now() - started, file: `/previews/${item.id}.webp` });
      console.log(`OK  ${item.lib}:${item.id}  ${item.url}`);
    } catch (error) {
      results.push({ ...item, ok: false, error: String(error.message || error) });
      console.warn(`SKIP ${item.lib}:${item.id}  ${item.url}  → ${error.message || error}`);
    } finally {
      await page.close();
      await context.close();
    }
  }

  await browser.close();

  const report = join(root, "scripts", "capture-report.json");
  await writeFile(report, `${JSON.stringify(results, null, 2)}\n`);

  const ok = results.filter((r) => r.ok);
  const skip = results.filter((r) => !r.ok);
  console.log(`\nCaptured ${ok.length}/${results.length}. Failed: ${skip.map((s) => s.id).join(", ") || "none"}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
