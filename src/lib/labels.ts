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
  ops: "运营",
};

export const categoryIntros: Record<string, string> = {
  sales: "销售外呼、CRM 管道、客户跟进与账户运营相关用法。",
  automation: "定时例行、事件触发与把工作落到真实系统里的自动化。",
  content: "邮件、视频、网站与 newsletter 等内容产出用法。",
  engineering: "性能调查、预发复现、升级与工程值班相关用法。",
  "daily-digest": "晨间摘要、记分板、周报等周期性消化用法。",
  recruiting: "寻源、候选人研究与只起草外联的招聘用法。",
  research: "调查包、情报蜂群与带证据的研究用法。",
  marketing: "投放监控、预算建议与增长团队更新。",
  finance: "费用对账、发票起草与财务交接。",
  "multi-agent": "多 Bot 群聊、交接与蜂群协作。",
  coding: "建站、代码审查与工程工厂相邻用法。",
  ops: "日常运营与流程卫生相关用法。",
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

export function categoryIntro(value: string): string {
  return categoryIntros[value] ?? "该类型下收录的 Grok Bot 用法。";
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
