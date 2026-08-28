import { agentUiItems, agentUiMeta, agentUiSearchText } from "./agent-ui";
import { cases, changelogNotes, meta as casesMeta, caseSearchText, type ChangelogNote } from "./cases";
import { shanghaiDateKey } from "./format";
import { htmlItems, htmlMeta, htmlSearchText } from "./html";
import { ui, type Copy } from "./i18n";
import { assetUrl, withBase } from "./paths";

export type DigestLib = "grok" | "html" | "agent-ui";

export interface DigestBullet {
  zh: string;
  en: string;
}

export interface PlazaItem {
  id: string;
  lib: DigestLib;
  href: string;
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

export interface DigestDay {
  dateKey: string;
  dateLabel: Copy;
  count: number;
  lead: Copy;
  bullets: DigestBullet[];
  items: PlazaItem[];
}

export interface DigestArchiveEntry {
  dateKey: string;
  dateLabel: Copy;
  count: number;
}

const LIB_ORDER: DigestLib[] = ["grok", "html", "agent-ui"];
const MIN_DIGEST_ADDS = 2;

const COUNT_TRAIL_RE =
  /(?:HTML 收集|HTML Collection|Grok Bot|Agent UI)\s*\d+\s*→\s*\d+[。.]?/g;
const PREVIEW_TRAIL_RE = /(?:均带 3:2 自托管预览|Both have self-hosted 3:2 previews)[。.]?/gi;
const ITEM_ID_RE = /[（(]item\s+\d+(?:、item\s+\d+)*[）)]/gi;

interface CatalogItem {
  lib: DigestLib;
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  qualityNote: string;
  qualityNoteEn: string;
  sourceUrl: string;
  previewImage?: string;
  publishedAt: string;
  updatedAt: string;
  searchText: string;
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
    qualityNote: item.qualityNote,
    qualityNoteEn: item.qualityNoteEn ?? item.qualityNote,
    sourceUrl: item.sourceUrl,
    previewImage: item.previewImage,
    publishedAt: item.publishedAt,
    updatedAt: item.updatedAt,
    searchText: caseSearchText(item),
  }));
  const html = htmlItems.map((item) => ({
    lib: "html" as const,
    id: item.id,
    slug: item.slug,
    title: item.title,
    titleEn: item.titleEn ?? item.title,
    summary: item.summary,
    summaryEn: item.summaryEn ?? item.summary,
    qualityNote: item.qualityNote,
    qualityNoteEn: item.qualityNoteEn ?? item.qualityNote,
    sourceUrl: item.sourceUrl,
    previewImage: item.previewImage,
    publishedAt: item.publishedAt,
    updatedAt: item.updatedAt,
    searchText: htmlSearchText(item),
  }));
  const agent = agentUiItems.map((item) => ({
    lib: "agent-ui" as const,
    id: item.id,
    slug: item.slug,
    title: item.title,
    titleEn: item.titleEn ?? item.title,
    summary: item.summary,
    summaryEn: item.summaryEn ?? item.summary,
    qualityNote: item.qualityNote,
    qualityNoteEn: item.qualityNoteEn ?? item.qualityNote,
    sourceUrl: item.sourceUrl,
    previewImage: item.previewImage,
    publishedAt: item.publishedAt,
    updatedAt: item.updatedAt,
    searchText: agentUiSearchText(item),
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

export function splitSentences(text: string): string[] {
  const t = text.replace(/\s+/g, " ").trim();
  if (!t) return [];
  return t
    .split(/(?<=[。！？])\s*|(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function firstSentence(text: string): string {
  return splitSentences(text)[0] ?? "";
}

function editorialLine(note: string, fallback: string): string {
  return firstSentence(note) || firstSentence(fallback) || fallback.trim();
}

function stripNoteMeta(text: string): string {
  return text
    .replace(/来源\s+https?:\/\/\S+/g, "")
    .replace(/来源\s+@[^\s。]+[。]?/g, "")
    .replace(/From\s+https?:\/\/\S+[：:]?/gi, "")
    .replace(/From\s+@[^\s.]+[.]?/gi, "")
    .replace(/Source:\s+@[^\s.]+[.]?/gi, "")
    .replace(COUNT_TRAIL_RE, "")
    .replace(PREVIEW_TRAIL_RE, "")
    .replace(ITEM_ID_RE, "")
    .replace(/\s+/g, " ")
    .replace(/^[：:\s]+/, "")
    .replace(/[；;]\s*[。.]/g, "。")
    .trim()
    .replace(/[，,；;]\s*$/g, "");
}

function isWeakClause(text: string): boolean {
  const t = text.replace(/[。.!]?$/, "").trim();
  if (t.length < 8) return true;
  if (/^@/.test(t) || /^https?:/i.test(t)) return true;
  if (/^(来源|From|Source:)/i.test(t)) return true;
  return false;
}

export function noteLibrary(note: ChangelogNote): DigestLib | "lab" {
  const t = `${note.title} ${note.titleEn ?? ""}`;
  if (/Agent UI/i.test(t)) return "agent-ui";
  if (/HTML/i.test(t)) return "html";
  if (/Grok/i.test(t)) return "grok";
  return "lab";
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

function clauseAfterLead(text: string): string {
  const cleaned = stripNoteMeta(text);
  const colon = cleaned.match(/[：:]\s*(.+)/);
  if (colon?.[1] && !isWeakClause(colon[1])) {
    return firstSentence(colon[1].trim());
  }
  const stripped = firstSentence(cleaned.replace(/^(?:增收|Added)\s*/i, ""));
  return isWeakClause(stripped) ? "" : stripped;
}

function sentenceForLibrary(
  lib: DigestLib | "lab",
  notes: ChangelogNote[],
  items: CatalogItem[],
  locale: "zh" | "en",
): string {
  const libNotes = notes.filter((note) => noteLibrary(note) === lib);
  const clauses = uniqueKeepOrder(
    libNotes
      .map((note) => clauseAfterLead(locale === "en" ? (note.bodyEn ?? note.body) : note.body))
      .filter((clause) => !isWeakClause(clause))
      .map((clause) => clause.replace(/[。.!]+$/, "")),
  );

  if (clauses.length === 0) {
    const bits = items
      .filter((item) => item.lib === lib)
      .map((item) =>
        editorialLine(locale === "en" ? item.qualityNoteEn : item.qualityNote, locale === "en" ? item.summaryEn : item.summary),
      )
      .filter((bit) => !isWeakClause(bit))
      .slice(0, 2)
      .map((bit) => bit.replace(/[。.!]+$/, ""));
    if (bits.length === 0) return "";
    const name = lib === "lab" ? "" : libCopy(lib)[locale];
    const head = name ? (locale === "en" ? `${name}: ` : `${name}：`) : "";
    const joined = bits.join(locale === "en" ? "; " : "；");
    return `${head}${joined}${locale === "en" ? "." : "。"}`;
  }

  const joined = clauses.join(locale === "en" ? "; " : "；");
  return `${joined}${locale === "en" ? "." : "。"}`;
}

function composeLead(notes: ChangelogNote[], items: CatalogItem[]): Copy {
  const libs = LIB_ORDER.filter((lib) => notes.some((note) => noteLibrary(note) === lib) || items.some((item) => item.lib === lib));

  const zhParts = libs.map((lib) => sentenceForLibrary(lib, notes, items, "zh")).filter(Boolean);
  const enParts = libs.map((lib) => sentenceForLibrary(lib, notes, items, "en")).filter(Boolean);

  if (zhParts.length === 0) {
    const fallback = items[0];
    if (!fallback) return { zh: "", en: "" };
    return {
      zh: editorialLine(fallback.qualityNote, fallback.summary),
      en: editorialLine(fallback.qualityNoteEn, fallback.summaryEn),
    };
  }

  const cap = (text: string) => text ? text.charAt(0).toUpperCase() + text.slice(1) : text;

  return {
    zh: zhParts.slice(0, 3).join(""),
    en: enParts.slice(0, 3).map(cap).join(" "),
  };
}

function claimFromNote(note: ChangelogNote, locale: "zh" | "en"): string {
  const title = locale === "en" ? (note.titleEn ?? note.title) : note.title;
  const body = locale === "en" ? (note.bodyEn ?? note.body) : note.body;
  const cleaned = stripNoteMeta(body);
  const sentence = firstSentence(cleaned);
  if (sentence && sentence.length >= 10) return sentence;
  const clause = clauseAfterLead(body);
  if (clause) {
    const name = title.replace(/^(?:HTML 收集|HTML Collection|Grok Bot|Agent UI)\s*[：:]\s*/, "");
    return locale === "en" ? `${name.replace(/^add(?:ed)?\s+/i, "")}: ${clause}` : `${name}：${clause}`;
  }
  return firstSentence(title);
}

function claimFromItem(item: CatalogItem, locale: "zh" | "en"): string {
  const note = locale === "en" ? item.qualityNoteEn : item.qualityNote;
  const summary = locale === "en" ? item.summaryEn : item.summary;
  const line = editorialLine(note, summary);
  if (line.length >= 8) return line;
  return locale === "en" ? item.titleEn : item.title;
}

function composeBullets(notes: ChangelogNote[], items: CatalogItem[]): DigestBullet[] {
  const cap = (text: string) => (text ? text.charAt(0).toUpperCase() + text.slice(1) : text);
  const fromNotes = notes.map((note) => ({
    zh: claimFromNote(note, "zh"),
    en: cap(claimFromNote(note, "en")),
  }));
  const used = new Set(
    items
      .filter((item) =>
        notes.some(
          (note) =>
            `${note.title} ${note.body}`.includes(item.title) ||
            `${note.titleEn ?? ""} ${note.bodyEn ?? ""}`.includes(item.titleEn),
        ),
      )
      .map((item) => item.id),
  );
  const fromItems = items
    .filter((item) => !used.has(item.id))
    .map((item) => ({
      zh: claimFromItem(item, "zh"),
      en: claimFromItem(item, "en"),
    }));

  const merged = uniqueKeepOrder(
    (fromNotes.length >= 4 ? fromNotes : [...fromNotes, ...fromItems]).map((b) => `${b.zh}|||${b.en}`),
  )
    .map((pair) => {
      const [zh, en] = pair.split("|||");
      return { zh, en };
    })
    .filter((b) => b.zh.length >= 4);

  return merged.slice(0, 6);
}

function toPlazaItem(item: CatalogItem): PlazaItem {
  const names = libCopy(item.lib);
  const host = sourceHost(item.sourceUrl);
  const dateKey = shanghaiDateKey(item.updatedAt);
  return {
    id: `${item.lib}:${item.id}`,
    lib: item.lib,
    href: itemHref(item),
    title: item.title,
    titleEn: item.titleEn,
    sourceHost: host,
    line: editorialLine(item.qualityNote, item.summary),
    lineEn: editorialLine(item.qualityNoteEn, item.summaryEn),
    thumb: assetUrl(item.previewImage),
    dateKey,
    updatedAt: item.updatedAt,
    searchText: [item.searchText, names.zh, names.en, host].join(" "),
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
    lead: composeLead(notes, digestItems.length ? digestItems : added),
    bullets: composeBullets(notes, added),
    items: added.map(toPlazaItem),
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
