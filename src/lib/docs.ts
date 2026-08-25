export interface DocLink {
  href: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  group: "product" | "docs" | "cursor";
}

export const officialDocs: DocLink[] = [
  {
    href: "https://x.ai/bot",
    title: "Grok Bot 官网",
    titleEn: "Grok Bot site",
    description: "产品首页：能力介绍、角色示例与下载入口。",
    descriptionEn: "Product home: capabilities, role examples, and download.",
    group: "product",
  },
  {
    href: "https://x.ai/news/introducing-grok-bot",
    title: "发布说明：Introducing Grok Bot",
    titleEn: "Launch note: Introducing Grok Bot",
    description: "官方发布稿，介绍 Bot 作为可交付工作的同事。",
    descriptionEn: "Official launch post: Bot as a coworker that ships work.",
    group: "product",
  },
  {
    href: "https://docs.x.ai/grok-bot/overview",
    title: "概览",
    titleEn: "Overview",
    description: "Bot 是什么、自带电脑、多 Bot 协作与持久记忆。",
    descriptionEn: "What a Bot is, its computer, multi-bot work, and lasting memory.",
    group: "docs",
  },
  {
    href: "https://docs.x.ai/grok-bot/use-cases",
    title: "官方用例",
    titleEn: "Official use cases",
    description: "销售、招聘、投放、费用、工程调查等 starter prompt。",
    descriptionEn: "Starter prompts for sales, recruiting, ads, expenses, and engineering investigations.",
    group: "docs",
  },
  {
    href: "https://docs.x.ai/grok-bot/get-started",
    title: "快速开始",
    titleEn: "Get started",
    description: "桌面端 / iOS 安装，以及创建第一个 Bot。",
    descriptionEn: "Desktop / iOS install, and creating the first Bot.",
    group: "docs",
  },
  {
    href: "https://docs.x.ai/grok-bot/bots",
    title: "Bots",
    titleEn: "Bots",
    description: "命名 Bot、群组协作与项目舱模式。",
    descriptionEn: "Naming Bots, group work, and project-pod mode.",
    group: "docs",
  },
  {
    href: "https://docs.x.ai/grok-bot/skills-routines-and-automations",
    title: "Skills、例行与自动化",
    titleEn: "Skills, routines, and automations",
    description: "把一次演示固化为可调度或事件触发的例行。",
    descriptionEn: "Turn a one-off demo into a scheduled or event-triggered routine.",
    group: "docs",
  },
  {
    href: "https://docs.x.ai/grok-bot/chat-and-collaboration",
    title: "聊天与协作",
    titleEn: "Chat and collaboration",
    description: "与 Bot 对话、交接上下文、多人/多 Bot 线程。",
    descriptionEn: "Talk to a Bot, hand off context, and share multi-person / multi-bot threads.",
    group: "docs",
  },
  {
    href: "https://docs.x.ai/grok-bot/computer-and-apps",
    title: "电脑与应用",
    titleEn: "Computer and apps",
    description: "共享云电脑、浏览器、登录态与连接器。",
    descriptionEn: "Shared cloud computer, browser, login state, and connectors.",
    group: "docs",
  },
  {
    href: "https://docs.x.ai/grok-bot/approvals-security-and-privacy",
    title: "审批、安全与隐私",
    titleEn: "Approvals, security, and privacy",
    description: "未批准不外发；登录与文件对账号内所有 Bot 可见。",
    descriptionEn: "No outbound without approval; logins and files are visible to every Bot on the account.",
    group: "docs",
  },
  {
    href: "https://cursor.com/docs/cloud-agent/automations",
    title: "Cursor Automations 文档",
    titleEn: "Cursor Automations docs",
    description: "相邻能力：云端 Agent 的定时/事件自动化。",
    descriptionEn: "Adjacent capability: scheduled / event automations for cloud Agents.",
    group: "cursor",
  },
  {
    href: "https://cursor.com/blog/automations",
    title: "Cursor Automations 介绍",
    titleEn: "Cursor Automations intro",
    description: "工程工厂模式：审查、值班、覆盖率与缺陷分拣。",
    descriptionEn: "Engineering-factory patterns: review, on-call, coverage, and bug triage.",
    group: "cursor",
  },
];

export const docGroups = [
  {
    id: "product" as const,
    title: "产品与发布",
    titleEn: "Product and launch",
    blurb: "先从官网与发布稿理解 Grok Bot 的定位。",
    blurbEn: "Start with the site and launch post to understand Grok Bot’s role.",
  },
  {
    id: "docs" as const,
    title: "官方文档",
    titleEn: "Official docs",
    blurb: "xAI 文档站上的 Grok Bot 指南。",
    blurbEn: "Grok Bot guides on the xAI docs site.",
  },
  {
    id: "cursor" as const,
    title: "Cursor 相邻",
    titleEn: "Cursor-adjacent",
    blurb: "同生态的云端 Agent 自动化，便于对照工程场景。",
    blurbEn: "Same-ecosystem cloud Agent automation, useful for engineering comparisons.",
  },
];
