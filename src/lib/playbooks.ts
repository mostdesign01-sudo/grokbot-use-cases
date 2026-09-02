import dataset from "../../data/paths.json";
import { agentUiItems, type AgentUiItem } from "./agent-ui";
import { cases, type CaseItem, type Difficulty } from "./cases";
import { htmlItems, type HtmlItem } from "./html";

export interface PathStep {
  title: string;
  titleEn: string;
  body: string;
  bodyEn: string;
}

export interface PathGate {
  title: string;
  titleEn: string;
  body?: string;
  bodyEn?: string;
}

export interface PathPageLink {
  href: string;
  title: string;
  titleEn: string;
}

export interface PlaybookPath {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  steps: PathStep[];
  relatedCaseIds: string[];
  relatedHtmlIds: string[];
  relatedAgentUiIds: string[];
  relatedPages: PathPageLink[];
  gates: PathGate[];
  difficulty: Difficulty;
  featured: boolean;
  publishedAt: string;
}

export interface PlaybooksMeta {
  updatedAt: string;
  timezone: string;
  version: string;
  count: number;
}

export const playbooksMeta = dataset.meta as PlaybooksMeta;
export const playbooks = dataset.paths as PlaybookPath[];

export function getPlaybookBySlug(slug: string): PlaybookPath | undefined {
  return playbooks.find((item) => item.slug === slug);
}

const WEEKLY_STEAL_ID = "daily-to-draft";

/** Plaza “本周可抄”: prefer daily-to-draft, else the first featured path. */
export function getWeeklySteal(list = playbooks): PlaybookPath | undefined {
  return list.find((item) => item.id === WEEKLY_STEAL_ID) ?? list.find((item) => item.featured) ?? list[0];
}

export function getStealAlso(steal: PlaybookPath | undefined, limit = 3, list = playbooks): PlaybookPath[] {
  return list.filter((item) => item.id !== steal?.id).slice(0, limit);
}

/**
 * Conservative keyword → path map for digest / changelog notes.
 * Ambiguous notes (two+ paths, or a catalog dump) return nothing.
 */
const PATH_HINTS: { id: string; needles: string[] }[] = [
  {
    id: "engineering-foreman",
    needles: ["lingxi", "工程组织", "engineering-org", "engineering org", "专科工头", "foreman"],
  },
  {
    id: "design-taste",
    needles: ["设计味", "taste skill", "refero styles", "refero", "design.md", "anti-slop"],
  },
  {
    id: "marketing-desk-draft-only",
    needles: ["营销桌", "marketing desk", "草稿停笔", "draft-only", "blotato"],
  },
  {
    id: "content-desk",
    needles: ["内容桌", "content desk", "jessica temporal", "how do i use ai", "agent-team", "六席周末"],
  },
  {
    id: "daily-to-draft",
    needles: ["日更出草稿", "daily-to-draft", "daily digest →", "一条可发草稿"],
  },
];

export function relatedPlaybookForText(text: string): PlaybookPath | undefined {
  const hay = text.toLowerCase();
  const hits = PATH_HINTS.filter((hint) => hint.needles.some((needle) => hay.includes(needle.toLowerCase())));
  if (hits.length !== 1) return undefined;
  return playbooks.find((item) => item.id === hits[0].id);
}

export function relatedPlaybookForNote(note: {
  title: string;
  titleEn?: string;
  body: string;
  bodyEn?: string;
}): PlaybookPath | undefined {
  return relatedPlaybookForText([note.title, note.titleEn ?? "", note.body, note.bodyEn ?? ""].join("\n"));
}

export function relatedPlaybooksForNotes(
  notes: { title: string; titleEn?: string; body: string; bodyEn?: string }[],
): PlaybookPath[] {
  const seen = new Set<string>();
  const out: PlaybookPath[] = [];
  for (const note of notes) {
    const path = relatedPlaybookForNote(note);
    if (!path || seen.has(path.id)) continue;
    seen.add(path.id);
    out.push(path);
  }
  return out;
}

export function getRelatedCasesForPath(path: PlaybookPath): CaseItem[] {
  return path.relatedCaseIds
    .map((id) => cases.find((item) => item.id === id))
    .filter((item): item is CaseItem => Boolean(item));
}

export function getRelatedHtmlForPath(path: PlaybookPath): HtmlItem[] {
  return path.relatedHtmlIds
    .map((id) => htmlItems.find((item) => item.id === id))
    .filter((item): item is HtmlItem => Boolean(item));
}

export function getRelatedAgentUiForPath(path: PlaybookPath): AgentUiItem[] {
  return path.relatedAgentUiIds
    .map((id) => agentUiItems.find((item) => item.id === id))
    .filter((item): item is AgentUiItem => Boolean(item));
}
