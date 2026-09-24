import { cases, type CaseItem, type SourceType } from "./cases";

const STARTER_SOURCES = new Set<SourceType>(["official-docs", "official-launch", "tutorial"]);

/** Official or tutorial cases marked starter, featured first, then newest. */
export function starterCases(list: CaseItem[] = cases, limit = 4): CaseItem[] {
  return list
    .filter((item) => item.difficulty === "starter" && STARTER_SOURCES.has(item.sourceType))
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return b.publishedAt.localeCompare(a.publishedAt);
    })
    .slice(0, limit);
}
