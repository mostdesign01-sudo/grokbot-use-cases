/** Category → cover file stem under `/covers/case-*.webp`. */
const COVER_BY_CATEGORY: Record<string, string> = {
  sales: "sales",
  automation: "automation",
  engineering: "engineering",
  coding: "engineering",
  marketing: "marketing",
  content: "content",
  "multi-agent": "multi-agent",
  ops: "ops",
  "project-management": "ops",
  support: "ops",
  "customer-success": "ops",
  research: "research",
  "daily-digest": "research",
  finance: "finance",
  recruiting: "finance",
};

/** Site-root path. Pass through `assetUrl` before putting it in `src`. */
export function caseCover(item: { categories?: string[] }): string {
  for (const category of item.categories ?? []) {
    const stem = COVER_BY_CATEGORY[category];
    if (stem) return `/covers/case-${stem}.webp`;
  }
  return "/covers/case-default.webp";
}
