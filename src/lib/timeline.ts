import type { AgentUiItem } from "./agent-ui";
import { agentUiTypeLabel } from "./agent-ui-labels";
import type { CaseItem } from "./cases";
import type { HtmlItem } from "./html";
import { htmlTypeLabel } from "./html-labels";
import { difficultyLabel, sourceBadgeKind, sourceBadgeLabel } from "./labels";
import { withBase } from "./paths";

export interface TimelineBadge {
  kind?: string;
  label: string;
}

export interface TimelineEntry {
  href: string;
  title: string;
  summary: string;
  qualityNote: string;
  updatedAt: string;
  featured?: boolean;
  badges: TimelineBadge[];
}

export function caseToTimeline(item: CaseItem): TimelineEntry {
  const badges: TimelineBadge[] = [
    { kind: sourceBadgeKind(item.sourceType), label: sourceBadgeLabel(item.sourceType) },
    { kind: "difficulty", label: difficultyLabel(item.difficulty) },
  ];
  if (item.requiresApproval) badges.push({ kind: "approval", label: "需审批" });
  if (item.hasRoutine) badges.push({ kind: "routine", label: "例行" });
  if (item.hasMultiAgent) badges.push({ kind: "multi", label: "多Agent" });

  return {
    href: withBase(`cases/${item.slug}/`),
    title: item.title,
    summary: item.summary,
    qualityNote: item.qualityNote,
    updatedAt: item.updatedAt,
    featured: item.featured,
    badges,
  };
}

export function htmlToTimeline(item: HtmlItem): TimelineEntry {
  return {
    href: withBase(`html/${item.slug}/`),
    title: item.title,
    summary: item.summary,
    qualityNote: item.qualityNote,
    updatedAt: item.updatedAt,
    featured: item.featured,
    badges: item.types.map((type) => ({ label: htmlTypeLabel(type) })),
  };
}

export function agentUiToTimeline(item: AgentUiItem): TimelineEntry {
  return {
    href: withBase(`agent-ui/${item.slug}/`),
    title: item.title,
    summary: item.summary,
    qualityNote: item.qualityNote,
    updatedAt: item.updatedAt,
    featured: item.featured,
    badges: [
      { kind: "community", label: "ThreeUI" },
      ...item.types.map((type) => ({ label: agentUiTypeLabel(type) })),
    ],
  };
}
