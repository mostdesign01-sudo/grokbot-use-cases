import { agentUiItems, type AgentUiItem } from "./agent-ui";
import { cases, type CaseItem } from "./cases";
import { htmlItems, type HtmlItem } from "./html";

/** Cross-library mark. Cases use `categories`; HTML and Agent UI use `tags`. Not a fourth dataset. */
export const DESIGN_MARK = "design";

export function designCases(list = cases): CaseItem[] {
  return list
    .filter((item) => item.categories.includes(DESIGN_MARK))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || b.updatedAt.localeCompare(a.updatedAt));
}

export function designHtml(list = htmlItems): HtmlItem[] {
  return list
    .filter((item) => item.tags.includes(DESIGN_MARK))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || b.updatedAt.localeCompare(a.updatedAt));
}

export function designAgentUi(list = agentUiItems): AgentUiItem[] {
  return list
    .filter((item) => item.tags.includes(DESIGN_MARK))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || b.updatedAt.localeCompare(a.updatedAt));
}
