import dataset from "../../data/combos.json";
import { agentUiItems, type AgentUiItem } from "./agent-ui";
import { cases, type CaseItem } from "./cases";
import { htmlItems, type HtmlItem } from "./html";

export interface ComboItem {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  htmlId: string;
  agentUiId: string;
  caseId: string;
  useFor?: string;
  useForEn?: string;
  featured?: boolean;
  publishedAt?: string;
}

export interface CombosMeta {
  updatedAt: string;
  timezone: string;
  version: string;
  count: number;
}

export interface ComboPieces {
  html: HtmlItem;
  agentUi: AgentUiItem;
  caseItem: CaseItem;
}

export const combosMeta = dataset.meta as CombosMeta;
export const combos = dataset.combos as ComboItem[];

export function getHtmlForCombo(combo: ComboItem): HtmlItem {
  const item = htmlItems.find((entry) => entry.id === combo.htmlId);
  if (!item) {
    throw new Error(`combos.json htmlId not found: ${combo.id} → ${combo.htmlId}`);
  }
  return item;
}

export function getAgentUiForCombo(combo: ComboItem): AgentUiItem {
  const item = agentUiItems.find((entry) => entry.id === combo.agentUiId);
  if (!item) {
    throw new Error(`combos.json agentUiId not found: ${combo.id} → ${combo.agentUiId}`);
  }
  return item;
}

export function getCaseForCombo(combo: ComboItem): CaseItem {
  const item = cases.find((entry) => entry.id === combo.caseId);
  if (!item) {
    throw new Error(`combos.json caseId not found: ${combo.id} → ${combo.caseId}`);
  }
  return item;
}

export function resolveComboPieces(combo: ComboItem): ComboPieces {
  return {
    html: getHtmlForCombo(combo),
    agentUi: getAgentUiForCombo(combo),
    caseItem: getCaseForCombo(combo),
  };
}

function assertCombosResolve(list: ComboItem[]): void {
  if (combosMeta.count !== list.length) {
    throw new Error(`combos.json meta.count ${combosMeta.count} does not match items ${list.length}`);
  }
  if (list.length < 3 || list.length > 5) {
    throw new Error(`Expected 3–5 combos, found ${list.length}`);
  }

  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();
  for (const combo of list) {
    if (seenIds.has(combo.id)) throw new Error(`duplicate combo id: ${combo.id}`);
    if (seenSlugs.has(combo.slug)) throw new Error(`duplicate combo slug: ${combo.slug}`);
    seenIds.add(combo.id);
    seenSlugs.add(combo.slug);
    resolveComboPieces(combo);
  }
}

assertCombosResolve(combos);

export function listCombos(list = combos): ComboItem[] {
  return [...list].sort((a, b) => {
    const featured = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    if (featured !== 0) return featured;
    return (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "") || a.title.localeCompare(b.title, "zh");
  });
}

export function getComboBySlug(slug: string): ComboItem | undefined {
  return combos.find((item) => item.slug === slug);
}
