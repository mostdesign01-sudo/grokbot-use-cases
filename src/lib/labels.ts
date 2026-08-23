import type { Difficulty, SourceType } from "./cases";

export const categoryLabels: Record<string, string> = {
  sales: "销售",
  automation: "自动化",
  content: "内容",
  engineering: "工程",
  "daily-digest": "每日摘要",
  recruiting: "招聘",
  research: "研究",
  marketing: "营销",
  finance: "财务",
  "multi-agent": "多 Agent",
  coding: "编程",
};

export const sourceTypeLabels: Record<SourceType, string> = {
  "official-docs": "官方文档",
  "official-launch": "官方发布",
  community: "社区",
  tutorial: "教程",
  "case-study": "案例研究",
  "adjacent-cursor": "Cursor相邻",
};

export const difficultyLabels: Record<Difficulty, string> = {
  starter: "入门",
  intermediate: "进阶",
  advanced: "高阶",
};

export function categoryLabel(value: string): string {
  return categoryLabels[value] ?? value;
}

export function sourceTypeLabel(value: SourceType): string {
  return sourceTypeLabels[value];
}

export function difficultyLabel(value: Difficulty): string {
  return difficultyLabels[value];
}

export function isOfficial(sourceType: SourceType): boolean {
  return sourceType === "official-docs" || sourceType === "official-launch";
}

export function isCommunity(sourceType: SourceType): boolean {
  return sourceType === "community" || sourceType === "tutorial" || sourceType === "case-study";
}

export function isCursorAdjacent(sourceType: SourceType): boolean {
  return sourceType === "adjacent-cursor";
}

export function connectorLabel(value: string): string {
  const map: Record<string, string> = {
    crm: "CRM",
    email: "Email",
    linkedin: "LinkedIn",
    staging: "预发环境",
    "product-ui": "产品 UI",
    slack: "Slack",
    support: "支持工单",
    ats: "ATS",
    calendar: "日历",
    ads: "广告平台",
    expense: "费用系统",
    gmail: "Gmail",
    datadog: "Datadog",
    grafana: "Grafana",
    ticket: "工单",
    "product-analytics": "产品分析",
    clickup: "ClickUp",
    granola: "Granola",
    higgsfield: "Higgsfield",
    composio: "Composio",
    shopify: "Shopify",
    github: "GitHub",
    pagerduty: "PagerDuty",
    linear: "Linear",
  };
  return map[value] ?? value;
}
