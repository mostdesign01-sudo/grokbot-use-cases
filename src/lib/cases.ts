import dataset from "../../data/cases.json";
import changelog from "../../data/changelog.json";

export type SourceType =
  | "official-docs"
  | "official-launch"
  | "community"
  | "tutorial"
  | "case-study"
  | "adjacent-cursor";

export type Difficulty = "starter" | "intermediate" | "advanced";

export interface CaseItem {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn?: string;
  categories: string[];
  role: string;
  sourceUrl: string;
  secondaryUrls?: string[];
  sourceType: SourceType;
  qualityNote: string;
  qualityNoteEn?: string;
  difficulty: Difficulty;
  hasRoutine: boolean;
  hasSkill: boolean;
  hasMultiAgent: boolean;
  requiresApproval: boolean;
  approvalBoundary?: string;
  approvalBoundaryEn?: string;
  connectors: string[];
  language: string;
  featured: boolean;
  /** Curator quality stars 1–5 (editorial; unrelated to GitHub stars). Unset = no rating shown. */
  stars?: number;
  previewImage?: string;
  /** Optional explicit sibling cases (must resolve to existing ids); shown first in the related block. */
  relatedCaseIds?: string[];
  publishedAt: string;
  updatedAt: string;
}

export interface CasesMeta {
  updatedAt: string;
  timezone: string;
  version: string;
  count: number;
  sourcesCrawled: string[];
}

export interface ChangelogNote {
  date: string;
  title: string;
  titleEn?: string;
  body: string;
  bodyEn?: string;
}

export const meta = dataset.meta as CasesMeta;
export const cases = dataset.cases as CaseItem[];
export const changelogNotes = changelog.notes as ChangelogNote[];

for (const item of cases) {
  for (const id of item.relatedCaseIds ?? []) {
    if (id === item.id) throw new Error(`cases.json ${item.id} relatedCaseIds points at itself`);
    if (!cases.some((entry) => entry.id === id)) {
      throw new Error(`cases.json relatedCaseId not found: ${item.id} → ${id}`);
    }
  }
}

export function getCaseBySlug(slug: string): CaseItem | undefined {
  return cases.find((item) => item.slug === slug);
}

export function getFeaturedCases(): CaseItem[] {
  return cases.filter((item) => item.featured);
}

export function getLatestCases(limit?: number): CaseItem[] {
  const sorted = [...cases].sort((a, b) => {
    const byPublished = b.publishedAt.localeCompare(a.publishedAt);
    if (byPublished !== 0) return byPublished;
    return b.updatedAt.localeCompare(a.updatedAt);
  });
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export function getRecentlyUpdatedCases(limit = 12): CaseItem[] {
  return [...cases]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}

export function caseSearchText(item: CaseItem): string {
  return [
    item.title,
    item.titleEn,
    item.summary,
    item.summaryEn ?? "",
    item.qualityNote,
    item.qualityNoteEn ?? "",
    item.role,
    item.id,
    item.slug,
    item.connectors.join(" "),
    item.categories.join(" "),
    item.approvalBoundary ?? "",
    item.approvalBoundaryEn ?? "",
  ].join(" ");
}

export function getRelatedCases(current: CaseItem, limit = 3): CaseItem[] {
  const explicit = (current.relatedCaseIds ?? [])
    .map((id) => cases.find((item) => item.id === id))
    .filter((item): item is CaseItem => Boolean(item));
  const explicitIds = new Set(explicit.map((item) => item.id));
  const byCategory = cases
    .filter((item) => item.id !== current.id && !explicitIds.has(item.id))
    .map((item) => ({
      item,
      overlap: item.categories.filter((cat) => current.categories.includes(cat)).length,
    }))
    .filter((entry) => entry.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .map((entry) => entry.item);
  return [...explicit, ...byCategory].slice(0, Math.max(limit, explicit.length));
}

export function uniqueCategories(): string[] {
  return [...new Set(cases.flatMap((item) => item.categories))].sort();
}

export function getCasesByCategory(category: string): CaseItem[] {
  return cases.filter((item) => item.categories.includes(category));
}

export function getCategoryCollections(): { category: string; count: number }[] {
  return uniqueCategories()
    .map((category) => ({
      category,
      count: getCasesByCategory(category).length,
    }))
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category));
}

export function uniqueSourceTypes(): SourceType[] {
  return [...new Set(cases.map((item) => item.sourceType))].sort();
}

export function uniqueDifficulties(): Difficulty[] {
  const order: Difficulty[] = ["starter", "intermediate", "advanced"];
  const present = new Set(cases.map((item) => item.difficulty));
  return order.filter((value) => present.has(value));
}
