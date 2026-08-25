import dataset from "../../data/agent-ui.json";

export type AgentUiType =
  | "landing"
  | "hero"
  | "threejs"
  | "background"
  | "button"
  | "text-animation"
  | "ui"
  | "motion"
  | "section";

export interface AgentUiItem {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  summary: string;
  summaryEn?: string;
  types: AgentUiType[];
  sourceUrl: string;
  secondaryUrls?: string[];
  previewImage?: string;
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  qualityNote: string;
  qualityNoteEn?: string;
  tags: string[];
  npmPackage?: string;
  promptHint?: string;
  promptHintEn?: string;
}

export interface AgentUiMeta {
  updatedAt: string;
  timezone: string;
  version: string;
  count: number;
}

export const RESERVED_AGENT_UI_SLUGS = new Set(["featured", "latest", "types"]);

export const agentUiMeta = dataset.meta as AgentUiMeta;
export const agentUiItems = dataset.items as AgentUiItem[];

export function getFeaturedAgentUi(): AgentUiItem[] {
  return agentUiItems.filter((item) => item.featured);
}

export function getLatestAgentUi(limit?: number): AgentUiItem[] {
  const sorted = [...agentUiItems].sort((a, b) => {
    const byPublished = b.publishedAt.localeCompare(a.publishedAt);
    if (byPublished !== 0) return byPublished;
    return b.updatedAt.localeCompare(a.updatedAt);
  });
  return typeof limit === "number" ? sorted.slice(0, limit) : sorted;
}

export function getRecentlyUpdatedAgentUi(limit = 12): AgentUiItem[] {
  return [...agentUiItems]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}

export function agentUiSearchText(item: AgentUiItem): string {
  return [
    item.title,
    item.titleEn ?? "",
    item.summary,
    item.summaryEn ?? "",
    item.qualityNote,
    item.qualityNoteEn ?? "",
    item.promptHint ?? "",
    item.promptHintEn ?? "",
    item.npmPackage ?? "",
    item.tags.join(" "),
    item.types.join(" "),
    item.id,
    item.slug,
  ].join(" ");
}

export function getAgentUiBySlug(slug: string): AgentUiItem | undefined {
  return agentUiItems.find((item) => item.slug === slug);
}

export function uniqueAgentUiTypes(): AgentUiType[] {
  return [...new Set(agentUiItems.flatMap((item) => item.types))].sort();
}

export function getAgentUiByType(type: string): AgentUiItem[] {
  return agentUiItems.filter((item) => item.types.includes(type as AgentUiType));
}

export function getAgentUiTypeCollections(): { type: AgentUiType; count: number }[] {
  return uniqueAgentUiTypes()
    .map((type) => ({ type, count: getAgentUiByType(type).length }))
    .sort((a, b) => b.count - a.count || a.type.localeCompare(b.type));
}
