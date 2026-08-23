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
  categories: string[];
  role: string;
  sourceUrl: string;
  secondaryUrls?: string[];
  sourceType: SourceType;
  qualityNote: string;
  difficulty: Difficulty;
  hasRoutine: boolean;
  hasSkill: boolean;
  hasMultiAgent: boolean;
  requiresApproval: boolean;
  approvalBoundary?: string;
  connectors: string[];
  language: string;
  featured: boolean;
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
  body: string;
}

export const meta = dataset.meta as CasesMeta;
export const cases = dataset.cases as CaseItem[];
export const changelogNotes = changelog.notes as ChangelogNote[];

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

export function getRelatedCases(current: CaseItem, limit = 3): CaseItem[] {
  return cases
    .filter((item) => item.id !== current.id)
    .map((item) => ({
      item,
      overlap: item.categories.filter((cat) => current.categories.includes(cat)).length,
    }))
    .filter((entry) => entry.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, limit)
    .map((entry) => entry.item);
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
