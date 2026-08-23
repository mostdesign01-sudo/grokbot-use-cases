import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";

const dataset = JSON.parse(await readFile(new URL("../data/cases.json", import.meta.url), "utf8"));
const requiredPages = [
  "index.html",
  "cases/index.html",
  "featured/index.html",
  "latest/index.html",
  "types/index.html",
  "docs/index.html",
  "changelog/index.html",
  "data.json",
  "404.html",
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

if (dataset.cases.length !== 20) {
  console.error(`Expected 20 cases, found ${dataset.cases.length}`);
  process.exit(1);
}

if (missing.length) {
  console.error("Missing build outputs:\n" + missing.join("\n"));
  process.exit(1);
}

console.log(`Build verified: ${dataset.cases.length} case pages and core routes present.`);
