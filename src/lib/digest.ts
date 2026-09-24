import { agentUiItems, agentUiMeta, agentUiSearchText } from "./agent-ui";
import { cardLine, stripAuditNoise } from "./cardline";
import { cases, changelogNotes, meta as casesMeta, caseSearchText, type ChangelogNote } from "./cases";
import { shanghaiDateKey } from "./format";
import { htmlItems, htmlMeta, htmlSearchText } from "./html";
import { ui, type Copy } from "./i18n";
import { assetUrl, withBase } from "./paths";
import { relatedPlaybooksForNotes } from "./playbooks";
import { starsOf } from "./stars";

export { firstSentence, splitSentences } from "./cardline";

export type DigestLib = "grok" | "html" | "agent-ui";

export interface DigestBullet {
  href: string;
  title: string;
  titleEn: string;
  line: string;
  lineEn: string;
}

export interface PlazaItem {
  /** `${lib}:${id}` — doubles as the favorites key. */
  id: string;
  lib: DigestLib;
  href: string;
  stars?: number;
  title: string;
  titleEn: string;
  sourceHost: string;
  line: string;
  lineEn: string;
  thumb?: string;
  dateKey: string;
  updatedAt: string;
  searchText: string;
}

export interface DigestRelatedPath {
  slug: string;
  title: string;
  titleEn: string;
}

export interface DigestDay {
  dateKey: string;
  dateLabel: Copy;
  count: number;
  lead: Copy;
  bullets: DigestBullet[];
  items: PlazaItem[];
  relatedPaths: DigestRelatedPath[];
}

export interface DigestArchiveEntry {
  dateKey: string;
  dateLabel: Copy;
  count: number;
}

const MIN_DIGEST_ADDS = 2;

interface CatalogItem {
  lib: DigestLib;
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  hook?: string;
  hookEn?: string;
  sourceUrl: string;
  previewImage?: string;
  publishedAt: string;
  updatedAt: string;
  searchText: string;
  stars?: number;
}

function catalog(): CatalogItem[] {
  const grok = cases.map((item) => ({
    lib: "grok" as const,
    id: item.id,
    slug: item.slug,
    title: item.title,
    titleEn: item.titleEn,
    summary: item.summary,
    summaryEn: item.summaryEn ?? item.summary,
    hook: item.hook,
    hookEn: item.hookEn,
    sourceUrl: item.sourceUrl,
    previewImage: item.previewImage,
    publishedAt: item.publishedAt,
    updatedAt: item.updatedAt,
    searchText: caseSearchText(item),
    stars: starsOf(item),
  }));
  const html = htmlItems.map((item) => ({
    lib: "html" as const,
    id: item.id,
    slug: item.slug,
    title: item.title,
    titleEn: item.titleEn ?? item.title,
    summary: item.summary,
    summaryEn: item.summaryEn ?? item.summary,
    hook: item.hook,
    hookEn: item.hookEn,
    sourceUrl: item.sourceUrl,
    previewImage: item.previewImage,
    publishedAt: item.publishedAt,
    updatedAt: item.updatedAt,
    searchText: htmlSearchText(item),
    stars: starsOf(item),
  }));
  const agent = agentUiItems.map((item) => ({
    lib: "agent-ui" as const,
    id: item.id,
    slug: item.slug,
    title: item.title,
    titleEn: item.titleEn ?? item.title,
    summary: item.summary,
    summaryEn: item.summaryEn ?? item.summary,
    hook: item.hook,
    hookEn: item.hookEn,
    sourceUrl: item.sourceUrl,
    previewImage: item.previewImage,
    publishedAt: item.publishedAt,
    updatedAt: item.updatedAt,
    searchText: agentUiSearchText(item),
    stars: starsOf(item),
  }));
  return [...grok, ...html, ...agent];
}

export function sourceHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function libCopy(lib: DigestLib): Copy {
  if (lib === "grok") return ui.lib.grok;
  if (lib === "html") return ui.lib.html;
  return ui.lib.agentUi;
}

function itemHref(item: CatalogItem): string {
  if (item.lib === "grok") return withBase(`cases/${item.slug}/`);
  if (item.lib === "html") return withBase(`html/${item.slug}/`);
  return withBase(`agent-ui/${item.slug}/`);
}

function itemOnDate(item: CatalogItem, dateKey: string): boolean {
  return shanghaiDateKey(item.updatedAt) === dateKey || shanghaiDateKey(item.publishedAt) === dateKey;
}

function newestItemDate(items: CatalogItem[]): string | undefined {
  const stamps = [
    ...items.map((item) => item.updatedAt),
    casesMeta.updatedAt,
    htmlMeta.updatedAt,
    agentUiMeta.updatedAt,
  ].filter(Boolean);
  if (stamps.length === 0) return undefined;
  return shanghaiDateKey(stamps.reduce((a, b) => (a > b ? a : b)));
}

function changelogDates(): string[] {
  return [...new Set(changelogNotes.map((note) => note.date))].sort((a, b) => b.localeCompare(a));
}

function addCount(dateKey: string, items: CatalogItem[]): number {
  const notes = changelogNotes.filter((note) => note.date === dateKey).length;
  const dayItems = items.filter((item) => shanghaiDateKey(item.updatedAt) === dateKey).length;
  return notes + dayItems;
}

export function formatDigestDate(dateKey: string): Copy {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day, 4, 0, 0));
  return {
    zh: `${month}月${day}日`,
    en: new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }).format(date),
  };
}

export function resolveDigestDate(items = catalog()): string {
  const noteDates = changelogDates();
  const newestNote = noteDates[0];
  const newestItem = newestItemDate(items);
  const candidate = newestNote ?? newestItem;
  if (!candidate) return shanghaiDateKey(new Date());
  if (addCount(candidate, items) >= MIN_DIGEST_ADDS) return candidate;
  for (const date of noteDates) {
    if (addCount(date, items) >= MIN_DIGEST_ADDS) return date;
  }
  return newestNote ?? newestItem ?? candidate;
}

function uniqueKeepOrder(values: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const value of values) {
    const key = value.replace(/\s+/g, " ").trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(value.trim());
  }
  return out;
}

function hanCount(text: string): number {
  return [...text].filter((ch) => /\p{Script=Han}/u.test(ch)).length;
}

function shortTitle(title: string): string {
  const head = title.split(/[：:]/)[0]?.trim() || title.trim();
  return head.replace(/[（(][^）)]*[）)]/g, "").replace(/\s+/g, " ").trim();
}

function composeLead(items: CatalogItem[]): Copy {
  const n = items.length;
  if (n === 0) return { zh: "今天没有新收条目。", en: "No new items today." };

  const zhNames = uniqueKeepOrder(items.map((item) => shortTitle(item.title)));
  let zhPicked: string[] = [];
  for (const name of zhNames) {
    const next = [...zhPicked, name];
    const sentence = `今天新收 ${n} 条：${next.join("、")}。`;
    if (hanCount(sentence) > 40) break;
    zhPicked = next;
  }
  const zh = zhPicked.length ? `今天新收 ${n} 条：${zhPicked.join("、")}。` : `今天新收 ${n} 条。`;

  const enNames = uniqueKeepOrder(items.map((item) => shortTitle(item.titleEn || item.title)));
  let enPicked: string[] = [];
  for (const name of enNames) {
    const next = [...enPicked, name];
    const sentence = `Today: ${n} new — ${next.join(", ")}.`;
    if (sentence.length > 90) break;
    enPicked = next;
  }
  const en = enPicked.length ? `Today: ${n} new — ${enPicked.join(", ")}.` : `Today: ${n} new.`;
  return { zh, en };
}

function composeBullets(items: CatalogItem[]): DigestBullet[] {
  return items.slice(0, 4).map((item) => ({
    href: itemHref(item),
    title: item.title,
    titleEn: item.titleEn,
    line: cardLine(item, "zh"),
    lineEn: cardLine(item, "en"),
  }));
}

function toPlazaItem(item: CatalogItem): PlazaItem {
  const names = libCopy(item.lib);
  const host = sourceHost(item.sourceUrl);
  const dateKey = shanghaiDateKey(item.updatedAt);
  return {
    id: `${item.lib}:${item.id}`,
    lib: item.lib,
    href: itemHref(item),
    stars: item.stars,
    title: item.title,
    titleEn: item.titleEn,
    sourceHost: host,
    line: cardLine(item, "zh"),
    lineEn: cardLine(item, "en"),
    searchText: [
      item.title,
      item.titleEn,
      item.hook ?? "",
      item.hookEn ?? "",
      stripAuditNoise(item.summary),
      stripAuditNoise(item.summaryEn),
      names.zh,
      names.en,
      host,
    ].join(" "),
    thumb: assetUrl(item.previewImage),
    dateKey,
    updatedAt: item.updatedAt,
  };
}

function dayItems(items: CatalogItem[], dateKey: string): CatalogItem[] {
  return items
    .filter((item) => shanghaiDateKey(item.updatedAt) === dateKey)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || a.title.localeCompare(b.title));
}

export function getDigestArchive(items = catalog()): DigestArchiveEntry[] {
  const dates = new Set<string>([
    ...changelogNotes.map((note) => note.date),
    ...items.map((item) => shanghaiDateKey(item.updatedAt)),
  ]);
  return [...dates]
    .filter((dateKey) => addCount(dateKey, items) > 0)
    .sort((a, b) => b.localeCompare(a))
    .map((dateKey) => ({
      dateKey,
      dateLabel: formatDigestDate(dateKey),
      count: dayItems(items, dateKey).length,
    }));
}

export function getDigestDay(dateKey?: string, all = catalog()): DigestDay | undefined {
  const archive = getDigestArchive(all);
  const key = dateKey ?? resolveDigestDate(all);
  if (!archive.some((entry) => entry.dateKey === key)) return undefined;

  const notes = changelogNotes.filter((note) => note.date === key);
  const added = dayItems(all, key);
  const digestItems = all
    .filter((item) => itemOnDate(item, key))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  return {
    dateKey: key,
    dateLabel: formatDigestDate(key),
    count: added.length,
    lead: composeLead(added.length ? added : digestItems),
    bullets: composeBullets(added.length ? added : digestItems),
    items: added.map(toPlazaItem),
    relatedPaths: relatedPlaybooksForNotes(notes)
      .slice(0, 2)
      .map((path) => ({
        slug: path.slug,
        title: path.title,
        titleEn: path.titleEn,
      })),
  };
}

export function getHomeDigest(dateKey?: string): DigestDay {
  const all = catalog();
  return getDigestDay(dateKey, all) ?? getDigestDay(resolveDigestDate(all), all)!;
}

/** Three columns; digest occupies the top of column 3, then items fill shortest-first. */
export function packPlazaColumns(items: PlazaItem[]): [PlazaItem[], PlazaItem[], PlazaItem[]] {
  const cols: PlazaItem[][] = [[], [], []];
  const weights = [0, 0, 3.6];
  for (const item of items) {
    const w = item.thumb ? 2.15 : 1.1;
    let i = 0;
    if (weights[1] < weights[i]) i = 1;
    if (weights[2] < weights[i]) i = 2;
    cols[i].push(item);
    weights[i] += w;
  }
  return [cols[0], cols[1], cols[2]];
}

export function isDigestDate(dateKey: string): boolean {
  return getDigestArchive().some((entry) => entry.dateKey === dateKey);
}

export function dateHref(dateKey: string, latest = resolveDigestDate()): string {
  return dateKey === latest ? withBase("/") : withBase(`d/${dateKey}/`);
}
