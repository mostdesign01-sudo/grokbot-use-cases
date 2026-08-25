import type { AgentUiItem } from "./agent-ui";
import { agentUiTypeLabel } from "./agent-ui-labels";
import type { CaseItem } from "./cases";
import type { HtmlItem } from "./html";
import { htmlTypeLabel } from "./html-labels";
import { ui } from "./i18n";
import { difficultyLabel, sourceBadgeKind, sourceBadgeLabel } from "./labels";
import { assetUrl, withBase } from "./paths";

export interface TimelineBadge {
  kind?: string;
  label: string;
  labelEn?: string;
}

export interface TimelineEntry {
  href: string;
  title: string;
  titleEn?: string;
  summary: string;
  summaryEn?: string;
  qualityNote: string;
  qualityNoteEn?: string;
  updatedAt: string;
  featured?: boolean;
  image?: string;
  badges: TimelineBadge[];
}

export function caseToTimeline(item: CaseItem): TimelineEntry {
  const badges: TimelineBadge[] = [
    {
      kind: sourceBadgeKind(item.sourceType),
      label: sourceBadgeLabel(item.sourceType),
      labelEn: sourceBadgeLabel(item.sourceType, "en"),
    },
    {
      kind: "difficulty",
      label: difficultyLabel(item.difficulty),
      labelEn: difficultyLabel(item.difficulty, "en"),
    },
  ];
  if (item.requiresApproval) {
    badges.push({ kind: "approval", label: ui.badge.approval.zh, labelEn: ui.badge.approval.en });
  }
  if (item.hasRoutine) {
    badges.push({ kind: "routine", label: ui.badge.routine.zh, labelEn: ui.badge.routine.en });
  }
  if (item.hasMultiAgent) {
    badges.push({ kind: "multi", label: ui.badge.multi.zh, labelEn: ui.badge.multi.en });
  }

  return {
    href: withBase(`cases/${item.slug}/`),
    title: item.title,
    titleEn: item.titleEn,
    summary: item.summary,
    summaryEn: item.summaryEn,
    qualityNote: item.qualityNote,
    qualityNoteEn: item.qualityNoteEn,
    updatedAt: item.updatedAt,
    featured: item.featured,
    image: assetUrl(item.previewImage),
    badges,
  };
}

export function htmlToTimeline(item: HtmlItem): TimelineEntry {
  return {
    href: withBase(`html/${item.slug}/`),
    title: item.title,
    titleEn: item.titleEn,
    summary: item.summary,
    summaryEn: item.summaryEn,
    qualityNote: item.qualityNote,
    qualityNoteEn: item.qualityNoteEn,
    updatedAt: item.updatedAt,
    featured: item.featured,
    image: assetUrl(item.previewImage),
    badges: item.types.map((type) => ({
      label: htmlTypeLabel(type),
      labelEn: htmlTypeLabel(type, "en"),
    })),
  };
}

export function agentUiToTimeline(item: AgentUiItem): TimelineEntry {
  return {
    href: withBase(`agent-ui/${item.slug}/`),
    title: item.title,
    titleEn: item.titleEn,
    summary: item.summary,
    summaryEn: item.summaryEn,
    qualityNote: item.qualityNote,
    qualityNoteEn: item.qualityNoteEn,
    updatedAt: item.updatedAt,
    featured: item.featured,
    image: assetUrl(item.previewImage),
    badges: [
      { kind: "community", label: "ThreeUI" },
      ...item.types.map((type) => ({
        label: agentUiTypeLabel(type),
        labelEn: agentUiTypeLabel(type, "en"),
      })),
    ],
  };
}
