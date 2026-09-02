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
