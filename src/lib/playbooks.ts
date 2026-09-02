import dataset from "../../data/paths.json";
import { agentUiItems, type AgentUiItem } from "./agent-ui";
import { cases, type CaseItem, type Difficulty } from "./cases";
import { shanghaiDateKey } from "./format";
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

/** Optional paste-ready desk brief. Static site only — never a live send. */
export interface PathRun {
  desk: string;
  deskEn: string;
  targetHint: string;
  targetHintEn: string;
  briefTemplate: string;
  briefTemplateEn?: string;
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
  run?: PathRun;
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

const BRIEF_PLACEHOLDER = /\{\{(\w+)\}\}/g;

const DEFAULT_BRIEF_TEMPLATE_ZH = `【开跑 brief · {{today}}】
路径：{{title}}
丢到：{{desk}}
粘贴处：{{targetHint}}

任务：
{{summary}}

步骤：
{{steps}}

硬闸门：
{{gates}}

本 brief 只交草稿。站点不代发、不代合入。`;

const DEFAULT_BRIEF_TEMPLATE_EN = `【Run brief · {{today}}】
Path: {{title}}
Desk: {{desk}}
Paste to: {{targetHint}}

Task:
{{summary}}

Steps:
{{steps}}

Hard gates:
{{gates}}

This brief hands off a draft. The site does not send or merge.`;

export function pathBriefVars(
  path: PlaybookPath,
  locale: "zh" | "en" = "zh",
  today = shanghaiDateKey(new Date()),
): Record<string, string> {
  const en = locale === "en";
  const run = path.run;
  const steps = path.steps
    .map((step, index) => {
      const title = en ? step.titleEn : step.title;
      const body = en ? step.bodyEn : step.body;
      return `${index + 1}. ${title} — ${body}`;
    })
    .join("\n");
  const gates = path.gates
    .map((gate) => {
      const title = en ? gate.titleEn : gate.title;
      const body = en ? (gate.bodyEn ?? gate.body) : (gate.body ?? gate.bodyEn);
      return body ? `- ${title}：${body}` : `- ${title}`;
    })
    .join("\n");

  return {
    today,
    title: en ? path.titleEn : path.title,
    summary: en ? path.summaryEn : path.summary,
    desk: en ? (run?.deskEn ?? run?.desk ?? "") : (run?.desk ?? ""),
    targetHint: en ? (run?.targetHintEn ?? run?.targetHint ?? "") : (run?.targetHint ?? ""),
    steps,
    gates,
  };
}

export function fillBriefTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(BRIEF_PLACEHOLDER, (_, key: string) => vars[key] ?? `{{${key}}}`);
}

/** Fill a path’s desk brief at build time ({{today}} = Asia/Shanghai civil date). */
export function filledPathBrief(path: PlaybookPath, locale: "zh" | "en" = "zh"): string {
  const run = path.run;
  if (!run) return "";
  const vars = pathBriefVars(path, locale);
  const template =
    locale === "en"
      ? (run.briefTemplateEn?.trim() || DEFAULT_BRIEF_TEMPLATE_EN)
      : (run.briefTemplate?.trim() || DEFAULT_BRIEF_TEMPLATE_ZH);
  return fillBriefTemplate(template, vars).trim();
}
