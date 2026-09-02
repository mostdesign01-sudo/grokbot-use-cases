import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";

const dataset = JSON.parse(await readFile(new URL("../data/cases.json", import.meta.url), "utf8"));
const htmlDataset = JSON.parse(await readFile(new URL("../data/html-items.json", import.meta.url), "utf8"));
const agentUiDataset = JSON.parse(await readFile(new URL("../data/agent-ui.json", import.meta.url), "utf8"));
const changelog = JSON.parse(await readFile(new URL("../data/changelog.json", import.meta.url), "utf8"));
const pathsDataset = JSON.parse(await readFile(new URL("../data/paths.json", import.meta.url), "utf8"));
const combosDataset = JSON.parse(await readFile(new URL("../data/combos.json", import.meta.url), "utf8"));

const requiredPages = [
  "index.html",
  "cases/index.html",
  "featured/index.html",
  "latest/index.html",
  "types/index.html",
  "docs/index.html",
  "changelog/index.html",
  "search/index.html",
  "data.json",
  "html-items.json",
  "agent-ui.json",
  "html/index.html",
  "html/featured/index.html",
  "html/latest/index.html",
  "html/types/index.html",
  "agent-ui/index.html",
  "agent-ui/featured/index.html",
  "agent-ui/latest/index.html",
  "agent-ui/types/index.html",
  "404.html",
  "paths/index.html",
  "combos/index.html",
];

const missing = [];

for (const page of requiredPages) {
  if (!existsSync(new URL(`../dist/${page}`, import.meta.url))) {
    missing.push(page);
  }
}

const categories = [...new Set(dataset.cases.flatMap((item) => item.categories))];

for (const item of dataset.cases) {
  const path = `cases/${item.slug}/index.html`;
  if (!existsSync(new URL(`../dist/${path}`, import.meta.url))) {
    missing.push(path);
  }
}

for (const category of categories) {
  const path = `types/${category}/index.html`;
  if (!existsSync(new URL(`../dist/${path}`, import.meta.url))) {
    missing.push(path);
  }
}

const htmlTypes = [...new Set(htmlDataset.items.flatMap((item) => item.types))];

for (const item of htmlDataset.items) {
  const path = `html/${item.slug}/index.html`;
  if (!existsSync(new URL(`../dist/${path}`, import.meta.url))) {
    missing.push(path);
  }
}

for (const type of htmlTypes) {
  const path = `html/types/${type}/index.html`;
  if (!existsSync(new URL(`../dist/${path}`, import.meta.url))) {
    missing.push(path);
  }
}

if (dataset.cases.length !== dataset.meta.count) {
  console.error(`cases.json meta.count ${dataset.meta.count} does not match items ${dataset.cases.length}`);
  process.exit(1);
}

if (dataset.cases.length < 20) {
  console.error(`Expected at least 20 cases, found ${dataset.cases.length}`);
  process.exit(1);
}

if (htmlDataset.items.length !== htmlDataset.meta.count) {
  console.error(`html-items.json meta.count ${htmlDataset.meta.count} does not match items ${htmlDataset.items.length}`);
  process.exit(1);
}

if (htmlDataset.items.length < 8) {
  console.error(`Expected at least 8 HTML items, found ${htmlDataset.items.length}`);
  process.exit(1);
}

const agentUiTypes = [...new Set(agentUiDataset.items.flatMap((item) => item.types))];

for (const item of agentUiDataset.items) {
  const path = `agent-ui/${item.slug}/index.html`;
  if (!existsSync(new URL(`../dist/${path}`, import.meta.url))) {
    missing.push(path);
  }
}

for (const type of agentUiTypes) {
  const path = `agent-ui/types/${type}/index.html`;
  if (!existsSync(new URL(`../dist/${path}`, import.meta.url))) {
    missing.push(path);
  }
}

if (agentUiDataset.items.length !== agentUiDataset.meta.count) {
  console.error(`agent-ui.json meta.count ${agentUiDataset.meta.count} does not match items ${agentUiDataset.items.length}`);
  process.exit(1);
}

if (agentUiDataset.items.length < 10) {
  console.error(`Expected at least 10 Agent UI items, found ${agentUiDataset.items.length}`);
  process.exit(1);
}

if (pathsDataset.paths.length !== pathsDataset.meta.count) {
  console.error(`paths.json meta.count ${pathsDataset.meta.count} does not match items ${pathsDataset.paths.length}`);
  process.exit(1);
}

if (pathsDataset.paths.length !== 5) {
  console.error(`Expected exactly 5 playbooks, found ${pathsDataset.paths.length}`);
  process.exit(1);
}

if (combosDataset.combos.length !== combosDataset.meta.count) {
  console.error(`combos.json meta.count ${combosDataset.meta.count} does not match items ${combosDataset.combos.length}`);
  process.exit(1);
}

if (combosDataset.combos.length < 3 || combosDataset.combos.length > 5) {
  console.error(`Expected 3–5 combos, found ${combosDataset.combos.length}`);
  process.exit(1);
}

const caseIds = new Set(dataset.cases.map((item) => item.id));
const htmlIds = new Set(htmlDataset.items.map((item) => item.id));
const agentUiIds = new Set(agentUiDataset.items.map((item) => item.id));

for (const path of pathsDataset.paths) {
  const page = `paths/${path.slug}/index.html`;
  if (!existsSync(new URL(`../dist/${page}`, import.meta.url))) {
    missing.push(page);
  }
  for (const id of path.relatedCaseIds ?? []) {
    if (!caseIds.has(id)) missing.push(`paths.json relatedCaseId not found: ${path.id} → ${id}`);
  }
  for (const id of path.relatedHtmlIds ?? []) {
    if (!htmlIds.has(id)) missing.push(`paths.json relatedHtmlId not found: ${path.id} → ${id}`);
  }
  for (const id of path.relatedAgentUiIds ?? []) {
    if (!agentUiIds.has(id)) missing.push(`paths.json relatedAgentUiId not found: ${path.id} → ${id}`);
  }
}

for (const combo of combosDataset.combos) {
  const page = `combos/${combo.slug}/index.html`;
  if (!existsSync(new URL(`../dist/${page}`, import.meta.url))) {
    missing.push(page);
  }
  if (!htmlIds.has(combo.htmlId)) missing.push(`combos.json htmlId not found: ${combo.id} → ${combo.htmlId}`);
  if (!agentUiIds.has(combo.agentUiId)) missing.push(`combos.json agentUiId not found: ${combo.id} → ${combo.agentUiId}`);
  if (!caseIds.has(combo.caseId)) missing.push(`combos.json caseId not found: ${combo.id} → ${combo.caseId}`);
}

const previewItems = [
  ...dataset.cases.map((item) => ({ lib: "grok", ...item })),
  ...htmlDataset.items.map((item) => ({ lib: "html", ...item })),
  ...agentUiDataset.items.map((item) => ({ lib: "agent-ui", ...item })),
];

for (const item of previewItems) {
  if (!item.previewImage) continue;
  if (!item.previewImage.startsWith("/previews/")) {
    missing.push(`previewImage for ${item.lib}:${item.id} should be /previews/…, got ${item.previewImage}`);
    continue;
  }
  const file = item.previewImage.replace(/^\//, "");
  if (!existsSync(new URL(`../dist/${file}`, import.meta.url))) {
    missing.push(`dist/${file}`);
  }
}

const noteDates = [...new Set(changelog.notes.map((note) => note.date))];
for (const date of noteDates) {
  const path = `d/${date}/index.html`;
  if (!existsSync(new URL(`../dist/${path}`, import.meta.url))) {
    missing.push(path);
  }
}

for (const path of pathsDataset.paths) {
  if (!path.run?.desk || !path.run?.targetHint || !path.run?.briefTemplate) {
    console.error(`paths.json ${path.id} is missing run.desk / run.targetHint / run.briefTemplate.`);
    process.exit(1);
  }
}

const runSampleSlugs = ["daily-to-draft", "marketing-desk-draft-only"];
for (const slug of runSampleSlugs) {
  const page = await readFile(new URL(`../dist/paths/${slug}/index.html`, import.meta.url), "utf8");
  if (!page.includes("开跑") || !page.includes("data-path-brief") || !page.includes("data-path-copy")) {
    console.error(`paths/${slug}/ is missing the 开跑 control (开跑 / data-path-brief / data-path-copy).`);
    process.exit(1);
  }
  if (!page.includes("【开跑 brief") || !page.includes("丢给 AIUP营销Lead")) {
    console.error(`paths/${slug}/ is missing a filled marketing-desk brief.`);
    process.exit(1);
  }
}

const home = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
if (!home.includes("今日看点") || !home.includes("home-plaza") || !home.includes("home-pill")) {
  console.error("Homepage is missing the plaza digest shell (今日看点 / home-plaza / home-pill).");
  process.exit(1);
}

if (!home.includes("可跑路径") || !home.includes("plaza-paths-strip")) {
  console.error("Homepage is missing the playbooks strip (可跑路径 / plaza-paths-strip).");
  process.exit(1);
}

if (!home.includes("本周可抄") || !home.includes("paths/daily-to-draft")) {
  console.error("Homepage is missing this week’s steal (本周可抄 → /paths/daily-to-draft/).");
  process.exit(1);
}

if (!home.includes("combos/") || !home.includes("三库组合")) {
  console.error("Homepage is missing the Combos rail link (combos/ / 三库组合).");
  process.exit(1);
}

if (!home.includes("核验精选") || !home.includes("plaza-position")) {
  console.error("Homepage is missing positioning copy (核验精选 / plaza-position).");
  process.exit(1);
}

if (!home.includes("grokbots.best") || !home.includes("cases/grokbots-best")) {
  console.error("Homepage is missing the grokbots.best sibling link (library case).");
  process.exit(1);
}

if (!home.includes("核验精选的可复用用法")) {
  console.error("Homepage meta/OG is missing curated-use-case positioning.");
  process.exit(1);
}

if (missing.length) {
  console.error("Missing build outputs:\n" + missing.join("\n"));
  process.exit(1);
}

console.log(
  `Build verified: ${dataset.cases.length} case pages, ${htmlDataset.items.length} HTML item pages, ${agentUiDataset.items.length} Agent UI pages, ${pathsDataset.paths.length} playbook pages, ${combosDataset.combos.length} combo pages, and core routes present.`,
);
