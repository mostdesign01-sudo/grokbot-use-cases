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

function collectPins(featured: LandingPin[], extras: LandingPin[], limit: number): LandingPin[] {
  const sortedFeatured = [...featured].sort((a, b) => b.item.updatedAt.localeCompare(a.item.updatedAt));
  if (sortedFeatured.length >= limit) return sortedFeatured.slice(0, limit);

  const seen = new Set(sortedFeatured.map(pinKey));
  const sortedExtras = extras
    .filter((pin) => !seen.has(pinKey(pin)))
    .sort((a, b) => b.item.updatedAt.localeCompare(a.item.updatedAt));

  return [...sortedFeatured, ...sortedExtras].slice(0, limit);
}

export function getLandingPins(limit = 24): LandingPin[] {
  return collectPins(
    [
      ...getFeaturedCases().map((item) => ({ lib: "grok" as const, item })),
      ...getFeaturedHtml().map((item) => ({ lib: "html" as const, item })),
      ...getFeaturedAgentUi().map((item) => ({ lib: "agent-ui" as const, item })),
    ],
    [
      ...getLatestCases().map((item) => ({ lib: "grok" as const, item })),
      ...getLatestHtml().map((item) => ({ lib: "html" as const, item })),
      ...getLatestAgentUi().map((item) => ({ lib: "agent-ui" as const, item })),
    ],
    limit,
  );
}

/** Homepage visual wall: HTML / Agent UI only — no Grok color-block pins. */
export function getLandingVisualPins(limit = 24): LandingPin[] {
  return collectPins(
    [
      ...getFeaturedHtml().map((item) => ({ lib: "html" as const, item })),
      ...getFeaturedAgentUi().map((item) => ({ lib: "agent-ui" as const, item })),
    ],
    [
      ...getLatestHtml().map((item) => ({ lib: "html" as const, item })),
      ...getLatestAgentUi().map((item) => ({ lib: "agent-ui" as const, item })),
    ],
    limit,
  );
}

export function getLandingGrokCases(limit = 12): CaseItem[] {
  const featured = getFeaturedCases().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  if (featured.length >= limit) return featured.slice(0, limit);

  const seen = new Set(featured.map((item) => item.id));
  const extras = getLatestCases().filter((item) => !seen.has(item.id));
  return [...featured, ...extras].slice(0, limit);
}

export function landingPinSearchText(pin: LandingPin): string {
  if (pin.lib === "grok") {
    return [
      pin.item.title,
      pin.item.titleEn,
      pin.item.summary,
      pin.item.summaryEn ?? "",
      pin.item.qualityNote,
      pin.item.qualityNoteEn ?? "",
      "Grok Bot",
    ].join(" ");
  }
  return [
    pin.item.title,
    pin.item.titleEn ?? "",
    pin.item.summary,
    pin.item.summaryEn ?? "",
    pin.item.qualityNote,
    pin.item.qualityNoteEn ?? "",
    pin.item.tags.join(" "),
    pin.lib,
  ].join(" ");
}
