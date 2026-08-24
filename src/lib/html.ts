import dataset from "../../data/html-items.json";

export type HtmlType =
  | "landing"
  | "motion"
  | "component"
  | "tool"
  | "portfolio"
  | "docs"
  | "interactive"
  | "other";

export interface HtmlItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  types: HtmlType[];
  sourceUrl: string;
  secondaryUrls?: string[];
  previewImage?: string;
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  qualityNote: string;
  tags: string[];
}

export interface HtmlMeta {
  updatedAt: string;
  timezone: string;
  version: string;
  count: number;
}

export const RESERVED_HTML_SLUGS = new Set(["featured", "latest", "types"]);

export const htmlMeta = dataset.meta as HtmlMeta;
export const htmlItems = dataset.items as HtmlItem[];

export function getFeaturedHtml(): HtmlItem[] {
  return htmlItems.filter((item) => item.featured);
}

export function getLatestHtml(limit?: number): HtmlItem[] {
  const sorted = [...htmlItems].sort((a, b) => {
    const byPublished = b.publishedAt.localeCompare(a.publishedAt);
    if (byPublished !== 0) return byPublished;
    return b.updatedAt.localeCompare(a.updatedAt);
  });
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export function getRecentlyUpdatedHtml(limit = 12): HtmlItem[] {
  return [...htmlItems]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}

export function htmlSearchText(item: HtmlItem): string {
  return [item.title, item.summary, item.qualityNote, item.tags.join(" "), item.types.join(" "), item.id, item.slug].join(
    " ",
  );
}

export function getHtmlBySlug(slug: string): HtmlItem | undefined {
  return htmlItems.find((item) => item.slug === slug);
}

export function uniqueHtmlTypes(): HtmlType[] {
  return [...new Set(htmlItems.flatMap((item) => item.types))].sort();
}

export function getHtmlByType(type: string): HtmlItem[] {
  return htmlItems.filter((item) => item.types.includes(type as HtmlType));
}

export function getHtmlTypeCollections(): { type: HtmlType; count: number }[] {
  return uniqueHtmlTypes()
    .map((type) => ({ type, count: getHtmlByType(type).length }))
    .sort((a, b) => b.count - a.count || a.type.localeCompare(b.type));
}
