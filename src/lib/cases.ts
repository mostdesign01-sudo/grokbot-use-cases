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
  /**
   * Optional thick landing for cases that may be linked from X or other posts.
   * When `steps` is set, the detail page uses that try-path instead of the
   * generic Skill / Routine block.
   */
  landing?: CaseLanding;
  publishedAt: string;
  updatedAt: string;
}

export interface CaseLandingLink {
  href: string;
  label: string;
  labelEn: string;
}

export interface CaseLandingStep {
  title: string;
  titleEn: string;
  body: string;
  bodyEn: string;
  links: CaseLandingLink[];
}

export interface CaseLandingContrastRow {
  aspect: string;
  aspectEn: string;
  left: string;
  leftEn: string;
  right: string;
  rightEn: string;
}

export interface CaseLandingSection {
  heading: string;
  headingEn: string;
  paragraphs: Array<{ text: string; textEn: string }>;
  links?: CaseLandingLink[];
}

export interface CaseLanding {
  what: string;
  whatEn: string;
  /** Extra thick-landing blocks, rendered between contrast and the try-steps. */
  sections?: CaseLandingSection[];
  contrast?: {
    caption?: string;
    captionEn?: string;
    leftLabel: string;
    leftLabelEn: string;
    rightLabel: string;
    rightLabelEn: string;
    rows: CaseLandingContrastRow[];
  };
  steps?: CaseLandingStep[];
  boundaries?: Array<{ text: string; textEn: string }>;
  previewCredit?: string;
  previewCreditEn?: string;
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
    item.landing?.what ?? "",
    item.landing?.whatEn ?? "",
    item.landing?.contrast?.caption ?? "",
    item.landing?.contrast?.captionEn ?? "",
    ...(item.landing?.contrast?.rows ?? []).flatMap((row) => [
      row.aspect,
      row.aspectEn,
      row.left,
      row.leftEn,
      row.right,
      row.rightEn,
    ]),
    ...(item.landing?.sections ?? []).flatMap((section) => [
      section.heading,
      section.headingEn,
      ...section.paragraphs.flatMap((paragraph) => [paragraph.text, paragraph.textEn]),
      ...(section.links ?? []).flatMap((link) => [link.label, link.labelEn, link.href]),
    ]),
    ...(item.landing?.steps ?? []).flatMap((step) => [
      step.title,
      step.titleEn,
      step.body,
      step.bodyEn,
      ...step.links.flatMap((link) => [link.label, link.labelEn, link.href]),
    ]),
    ...(item.landing?.boundaries ?? []).flatMap((bound) => [bound.text, bound.textEn]),
  ].join(" ");
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
