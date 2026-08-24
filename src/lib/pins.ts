import { getFeaturedAgentUi, getLatestAgentUi, type AgentUiItem } from "./agent-ui";
import { getFeaturedCases, getLatestCases, type CaseItem } from "./cases";
import { getFeaturedHtml, getLatestHtml, type HtmlItem } from "./html";

export type PinLib = "grok" | "html" | "agent-ui";

export type LandingPin =
  | { lib: "grok"; item: CaseItem }
  | { lib: "html"; item: HtmlItem }
  | { lib: "agent-ui"; item: AgentUiItem };

export function pinRatio(seed: string): number {
  let n = 0;
  for (let i = 0; i < seed.length; i += 1) {
    n = (n * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return n % 5;
}

function pinKey(pin: LandingPin): string {
  return `${pin.lib}:${pin.item.id}`;
}

export function getLandingPins(limit = 24): LandingPin[] {
  const featured: LandingPin[] = [
    ...getFeaturedCases().map((item) => ({ lib: "grok" as const, item })),
    ...getFeaturedHtml().map((item) => ({ lib: "html" as const, item })),
    ...getFeaturedAgentUi().map((item) => ({ lib: "agent-ui" as const, item })),
  ].sort((a, b) => b.item.updatedAt.localeCompare(a.item.updatedAt));

  if (featured.length >= limit) return featured.slice(0, limit);

  const seen = new Set(featured.map(pinKey));
  const extras: LandingPin[] = [
    ...getLatestCases().map((item) => ({ lib: "grok" as const, item })),
    ...getLatestHtml().map((item) => ({ lib: "html" as const, item })),
    ...getLatestAgentUi().map((item) => ({ lib: "agent-ui" as const, item })),
  ]
    .filter((pin) => !seen.has(pinKey(pin)))
    .sort((a, b) => b.item.updatedAt.localeCompare(a.item.updatedAt));

  return [...featured, ...extras].slice(0, limit);
}

export function landingPinSearchText(pin: LandingPin): string {
  if (pin.lib === "grok") {
    return [pin.item.title, pin.item.titleEn, pin.item.summary, pin.item.qualityNote, "Grok Bot"].join(" ");
  }
  return [pin.item.title, pin.item.summary, pin.item.qualityNote, pin.item.tags.join(" "), pin.lib].join(" ");
}
