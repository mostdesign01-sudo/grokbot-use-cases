/**
 * Client-side locale for this static GitHub Pages site.
 * URLs stay the same (no /en/ prefix). Preference is stored in localStorage
 * under `locale` and applied via <html data-locale> before first paint.
 */
export type Locale = "zh" | "en";

export const DEFAULT_LOCALE: Locale = "zh";
export const LOCALE_STORAGE_KEY = "locale";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "zh" || value === "en";
}

export function htmlLang(locale: Locale): string {
  return locale === "en" ? "en" : "zh-CN";
}

export function ogLocale(locale: Locale): string {
  return locale === "en" ? "en_US" : "zh_CN";
}

/** Pick `fieldEn` in English when present; otherwise the Chinese/base field. */
export function localized<T extends Record<string, unknown>>(
  item: T,
  field: string,
  locale: Locale = "zh",
): string {
  if (locale === "en") {
    const en = item[`${field}En`];
    if (typeof en === "string" && en.trim()) return en;
  }
  const base = item[field];
  return typeof base === "string" ? base : "";
}

export type Copy = { zh: string; en: string };

export const ui = {
  nav: {
    home: { zh: "首页", en: "Home" },
    search: { zh: "搜索", en: "Search" },
    docs: { zh: "文档", en: "Docs" },
    changelog: { zh: "更新日志", en: "Changelog" },
    paths: { zh: "可跑路径", en: "Playbooks" },
    overview: { zh: "总览", en: "Overview" },
    featured: { zh: "精选", en: "Featured" },
    latest: { zh: "最新", en: "Latest" },
    types: { zh: "类型", en: "Types" },
  },
  lib: {
    grok: { zh: "Grok Bot", en: "Grok Bot" },
    html: { zh: "HTML 收集", en: "HTML Collection" },
    agentUi: { zh: "Agent UI", en: "Agent UI" },
    all: { zh: "全部", en: "All" },
  },
  brand: {
    lab: { zh: "可复用的精选实验室", en: "A reusable collection lab" },
    grok: { zh: "Grok Bot · 每日更新", en: "Grok Bot · daily updates" },
    html: { zh: "HTML 收集 · 每日更新", en: "HTML Collection · daily updates" },
    agentUi: { zh: "Agent UI · 每日更新", en: "Agent UI · daily updates" },
  },
  header: {
    collections: { zh: "内容库", en: "Libraries" },
    sections: { zh: "栏目", en: "Sections" },
    theme: { zh: "切换浅色或深色主题", en: "Switch light or dark theme" },
    locale: { zh: "语言", en: "Language" },
  },
  badge: {
    official: { zh: "官方", en: "Official" },
    community: { zh: "社区", en: "Community" },
    cursor: { zh: "Cursor相邻", en: "Cursor-adjacent" },
    featured: { zh: "+ 精选", en: "+ Featured" },
    featuredPlain: { zh: "精选", en: "Featured" },
    approval: { zh: "需审批", en: "Needs approval" },
    routine: { zh: "例行", en: "Routine" },
    multi: { zh: "多Agent", en: "Multi-agent" },
    skill: { zh: "Skill", en: "Skill" },
  },
  quality: { zh: "收录理由", en: "Why we listed it" },
  search: {
    button: { zh: "搜索", en: "Search" },
    currentLib: { zh: "搜索当前库", en: "Search this library" },
    placeholder: { zh: "搜索标题、摘要、收录理由…", en: "Search titles, summaries, why we listed it…" },
    wall: { zh: "在预览墙与 Grok 时间线里筛标题、摘要、收录理由…", en: "Filter the preview wall and Grok timeline by title, summary, or note…" },
    html: { zh: "搜索 HTML 标题、摘要、标签、收录理由…", en: "Search HTML titles, summaries, tags, notes…" },
    agentUi: { zh: "搜索 Agent UI 标题、摘要、收录理由…", en: "Search Agent UI titles, summaries, notes…" },
    explorer: { zh: "标题、摘要、收录理由、角色、标签…", en: "Title, summary, note, role, tags…" },
    scope: { zh: "搜索范围", en: "Search scope" },
    empty: {
      zh: "没有符合条件的条目。试试更短的关键词，或切换到另一库。",
      en: "No matching items. Try a shorter query, or switch libraries.",
    },
    countAll: {
      zh: "显示 {n} 条（Grok Bot {grok} · HTML {html} · Agent UI {agent}）",
      en: "Showing {n} items (Grok Bot {grok} · HTML {html} · Agent UI {agent})",
    },
    countOne: { zh: "显示 {n} 条", en: "Showing {n} items" },
  },
  explorer: {
    search: { zh: "搜索", en: "Search" },
    category: { zh: "分类", en: "Category" },
    source: { zh: "来源", en: "Source" },
    difficulty: { zh: "难度", en: "Difficulty" },
    allCategories: { zh: "全部分类", en: "All categories" },
    allSources: { zh: "全部来源", en: "All sources" },
    allDifficulties: { zh: "全部难度", en: "All difficulties" },
    reset: { zh: "清除筛选", en: "Clear filters" },
    empty: { zh: "没有符合条件的案例。试试减少筛选条件。", en: "No matching cases. Try fewer filters." },
    count: { zh: "显示 {n} / {total} 条案例", en: "Showing {n} / {total} cases" },
  },
  poster: {
    libraries: { zh: "三套内容库", en: "Three libraries" },
    grokPitch: { zh: "精选 Bot 用法：例行、多 Agent、审批边界", en: "Selected Bot uses: routines, multi-agent, approval bounds" },
    htmlPitch: { zh: "公开网页里的演示、模板、组件与工具页", en: "Public pages: demos, templates, components, tools" },
    agentPitch: { zh: "ThreeUI 免费件：复制 prompt / Skill.md 换主题", en: "Free ThreeUI pieces: copy a prompt / Skill.md to retheme" },
    enter: { zh: "进入", en: "Enter" },
    items: { zh: "{n} 条", en: "{n} items" },
  },
  footer: {
    blurb: {
      zh: "。眼下三套库：",
      en: ". Three libraries for now: ",
    },
    blurbMid: {
      zh: " 来自 ",
      en: " from ",
    },
    blurbEnd: {
      zh: "。数据分开，之后还会加更多。",
      en: ". Data stays separate; more libraries later.",
    },
    disclaimer: {
      zh: "本站为非官方整理站点，与 xAI / SpaceXAI / Cursor / ThreeUI 及所列原文站点无隶属关系。",
      en: "Unofficial index. Not affiliated with xAI / SpaceXAI / Cursor / ThreeUI or the listed source sites.",
    },
    labHome: { zh: "实验室首页", en: "Lab home" },
    grokOverview: { zh: "Grok Bot 总览", en: "Grok Bot overview" },
    featuredCases: { zh: "精选案例", en: "Featured cases" },
    latestCases: { zh: "最新案例", en: "Latest cases" },
    byType: { zh: "按类型", en: "By type" },
    allSearch: { zh: "全库搜索", en: "Search all" },
    officialDocs: { zh: "官方文档", en: "Official docs" },
    htmlOverview: { zh: "HTML 总览", en: "HTML overview" },
    featuredHtml: { zh: "精选 HTML", en: "Featured HTML" },
    latestHtml: { zh: "最新 HTML", en: "Latest HTML" },
    htmlTypes: { zh: "HTML 类型", en: "HTML types" },
    searchHtml: { zh: "搜索 HTML", en: "Search HTML" },
    agentOverview: { zh: "Agent UI 总览", en: "Agent UI overview" },
    searchAgent: { zh: "搜索 Agent UI", en: "Search Agent UI" },
    paths: { zh: "可跑路径", en: "Playbooks" },
    github: { zh: "GitHub 仓库", en: "GitHub repo" },
    sources: { zh: "公开来源", en: "Public sources" },
    officialUseCases: { zh: "官方用例", en: "Official use cases" },
  },
  meta: {
    role: { zh: "角色", en: "Role" },
    sourceType: { zh: "来源类型", en: "Source type" },
    difficulty: { zh: "难度", en: "Difficulty" },
    categories: { zh: "分类", en: "Categories" },
    connectors: { zh: "连接器 / 工具", en: "Connectors / tools" },
    noneListed: { zh: "未列出", en: "None listed" },
    published: { zh: "发布", en: "Published" },
    itemUpdated: { zh: "条目更新", en: "Item updated" },
    publicSources: { zh: "公开来源", en: "Public sources" },
    types: { zh: "类型", en: "Types" },
    tags: { zh: "标签", en: "Tags" },
    publishedAbout: { zh: "公开约", en: "Published around" },
    libraryChecked: { zh: "本库校对", en: "Checked in this library" },
    proofed: { zh: "最近校对（Asia/Shanghai）", en: "Last checked (Asia/Shanghai)" },
    items: { zh: "{n} 条", en: "{n} items" },
    cases: { zh: "{n} 条案例", en: "{n} cases" },
    currentItems: { zh: "当前 {n} 条", en: "{n} items now" },
  },
  detail: {
    lab: { zh: "实验室", en: "Lab" },
    whatItDoes: { zh: "这条用法在做什么", en: "What this use does" },
    startPath: { zh: "上手路径", en: "How to start" },
    approvalBound: { zh: "审批边界", en: "Approval boundary" },
    related: { zh: "相关案例", en: "Related cases" },
    metadata: { zh: "元信息", en: "Metadata" },
    learnWhat: { zh: "适合学什么", en: "What to learn" },
    howToUse: { zh: "适合怎么用", en: "How to use it" },
    sameType: { zh: "同类型", en: "Same type" },
    openSource: { zh: "打开原文", en: "Open source" },
    forAgent: { zh: "给 Agent", en: "For the Agent" },
    previewAlt: { zh: "{title} 预览", en: "Preview of {title}" },
    safeStep: { zh: "先跑一次安全范围", en: "Run a safe first pass" },
    saveSkill: { zh: "存 Skill", en: "Save a Skill" },
    thenRoutine: { zh: "再上 Routine", en: "Then add a Routine" },
    safeDefault: {
      zh: "先在可撤回、不外发的范围内试跑一遍，确认输出可用，再考虑扩大权限。",
      en: "Try it first in a reversible, non-outbound scope. Confirm the output, then widen permissions.",
    },
    safeWithBound: {
      zh: "先在可撤回、不外发的范围内试跑。本条未批准前：{bound}。",
      en: "Try it first in a reversible, non-outbound scope. Until approved: {bound}.",
    },
    skillYes: {
      zh: "这条用法已包含可复用 Skill。跑通安全范围后，立刻把步骤固化下来。",
      en: "This use already includes a reusable Skill. After the safe pass, lock the steps in.",
    },
    skillNo: {
      zh: "把跑通的步骤存成 Skill，下次同类任务直接复用，而不是重新口述。",
      en: "Save the working steps as a Skill so the next similar job reuses them instead of being re-explained.",
    },
    routineYes: {
      zh: "输出稳定后再打开例行 / 定时。本条已有例行形态，不要一上来就无人值守外发。",
      en: "Turn on the routine / schedule only after output is stable. This item already has a routine shape — do not start unattended outbound.",
    },
    routineNo: {
      zh: "确认输出可靠后，再考虑定时或事件触发；例行默认仍应停在待审。",
      en: "After output is reliable, consider a schedule or event trigger. Routines should still stop at review by default.",
    },
  },
  home: {
    lede: { zh: "可复用的 AI 精选实验室", en: "A reusable AI collection lab" },
    dates: { zh: "日期", en: "Dates" },
    libraries: { zh: "内容库", en: "Libraries" },
    paths: { zh: "可跑路径", en: "Playbooks" },
    digest: { zh: "今日看点", en: "Today" },
    steal: { zh: "本周可抄", en: "This week's steal" },
    allPaths: { zh: "全部路径", en: "All playbooks" },
    relatedPath: { zh: "相关路径", en: "Related path" },
    pathsStrip: {
      zh: "把库里的条目编成 brief → 席位 → 验收闸门。不是又一套卡片。",
      en: "Turn library items into brief → seats → acceptance gates. Not another card wall.",
    },
    pathsOpen: { zh: "打开路径", en: "Open playbooks" },
    filter: { zh: "按库筛选", en: "Filter by library" },
    empty: { zh: "这一天没有可显示的条目。", en: "No items to show for this day." },
    dateTitle: { zh: "{date} · AI UP LAB", en: "{date} · AI UP LAB" },
    dateDesc: {
      zh: "AI UP LAB {date} 的增收与条目。",
      en: "AI UP LAB entries from {date}.",
    },
  },
  pages: {
    landingH1: { zh: "可复用的 AI 精选实验室", en: "A reusable AI collection lab" },
    landingLede: {
      zh: "案例 / 页面 / Agent UI。先看三张海报进库。HTML 与 Agent UI 在预览墙里浏览；Grok Bot 在下面的时间线里读标题与摘要。不是新闻站。",
      en: "Cases / pages / Agent UI. Enter a library from the three posters. Browse HTML and Agent UI on the preview wall; read Grok Bot titles and summaries in the timeline below. Not a news site.",
    },
    landingWall: { zh: "预览墙", en: "Preview wall" },
    landingWallLede: {
      zh: "HTML 收集与 Agent UI 的精选与近日条目。卡片按 3:2 显示完整页面截图。",
      en: "Featured and recent HTML Collection and Agent UI items. Cards use a 3:2 frame so the page screenshot stays readable.",
    },
    landingGrok: { zh: "Grok Bot 时间线", en: "Grok Bot timeline" },
    landingGrokLede: {
      zh: "按上海时间排列的标题与摘要。没有预览图就不做色块海报；有图的一条带紧凑附件。",
      en: "Titles and summaries in Asia/Shanghai time. No color-block posters when a case has no preview; the one with an image keeps a compact attachment.",
    },
    landingGrokAll: { zh: "全部 Grok 案例", en: "All Grok cases" },
    searchH1: { zh: "搜索三套收集库", en: "Search the three libraries" },
    searchLede: {
      zh: "在当前页面筛选 cases.json、html-items.json 与 agent-ui.json。不会混写成一套新闻流，只检索已收录的可复用条目。",
      en: "Filter cases.json, html-items.json, and agent-ui.json on this page. Not a mixed news feed — only listed reusable items.",
    },
    searchTitle: { zh: "搜索 · AI UP LAB", en: "Search · AI UP LAB" },
    searchDesc: {
      zh: "在 AI UP LAB 的 Grok Bot、HTML 收集与 Agent UI 三套库里检索标题、摘要、标签与收录理由。",
      en: "Search titles, summaries, tags, and listing notes across AI UP LAB’s Grok Bot, HTML Collection, and Agent UI libraries.",
    },
    docsH1: { zh: "文档枢纽", en: "Docs hub" },
    docsLede: {
      zh: "下列均为官方或产品文档链接。本站只做导航与对照，不替代原文档。",
      en: "Official or product docs only. This site is a map, not a replacement.",
    },
    docsTitle: { zh: "文档枢纽 · AI UP LAB", en: "Docs hub · AI UP LAB" },
    docsDesc: {
      zh: "Grok Bot 与 Cursor Automations 官方链接。",
      en: "Official Grok Bot and Cursor Automations links.",
    },
    changelogH1: { zh: "更新日志", en: "Changelog" },
    changelogLede: {
      zh: "AI UP LAB 的数据更新时间以 data/cases.json 的 meta.updatedAt 为准，并按 Asia/Shanghai 显示。",
      en: "AI UP LAB data freshness follows meta.updatedAt in data/cases.json, shown in Asia/Shanghai.",
    },
    changelogTitle: { zh: "更新日志 · AI UP LAB", en: "Changelog · AI UP LAB" },
    changelogDesc: {
      zh: "AI UP LAB 数据更新时间与近期说明。",
      en: "AI UP LAB data update times and recent notes.",
    },
    dataVersion: { zh: "数据版本", en: "Data version" },
    datasetVersion: { zh: "数据集版本", en: "Dataset version" },
    caseCount: { zh: "当前案例数", en: "Cases now" },
    lastUpdateDate: { zh: "最近更新日期", en: "Last update date" },
    displayTz: { zh: "展示时区", en: "Display timezone" },
    shanghaiTime: { zh: "上海时间", en: "Shanghai time" },
    iso: { zh: "ISO", en: "ISO" },
    recentNotes: { zh: "近期说明", en: "Recent notes" },
    crawledSources: { zh: "本次爬取 / 对照来源", en: "Sources crawled / checked" },
    notFoundH1: { zh: "没有这页", en: "Page not found" },
    notFoundLede: {
      zh: "链接可能已变更。回到 AI UP LAB 继续浏览。",
      en: "This link may have moved. Head back to AI UP LAB.",
    },
    notFoundTitle: { zh: "未找到 · AI UP LAB", en: "Not found · AI UP LAB" },
    browseCases: { zh: "浏览案例", en: "Browse cases" },
    backHome: { zh: "返回首页", en: "Back home" },
  },
  path: {
    kicker: { zh: "AI UP LAB · 可跑路径", en: "AI UP LAB · Playbooks" },
    indexH1: { zh: "brief → 席位 → 验收闸门", en: "Brief → seats → acceptance gates" },
    indexLede: {
      zh: "五条可跟做的路径。把 Grok Bot、HTML 收集、Agent UI 和广场日更编成窄席，而不是再堆卡片。发布、合入、口味判断都停在人这边。",
      en: "Five follow-along paths. They turn Grok Bot, HTML Collection, Agent UI, and the plaza digest into a narrow desk — not more cards. Publish, merge, and taste stay human.",
    },
    indexTitle: { zh: "可跑路径 · AI UP LAB", en: "Playbooks · AI UP LAB" },
    indexDesc: {
      zh: "AI UP LAB 的五条可跑路径：内容桌、营销草稿桌、工程工头、日更出稿、设计味。",
      en: "Five runnable paths on AI UP LAB: content desk, draft-only marketing, engineering foreman, daily-to-draft, and taste.",
    },
    list: { zh: "路径列表", en: "Playbook list" },
    steps: { zh: "步骤", en: "Steps" },
    gates: { zh: "验收闸门", en: "Acceptance gates" },
    gate: { zh: "闸门", en: "Gate" },
    related: { zh: "相关条目", en: "Related items" },
    otherPaths: { zh: "其他路径", en: "Other paths" },
    stepCount: { zh: "步骤数", en: "Steps" },
    gateCount: { zh: "闸门数", en: "Gates" },
  },
  grok: {
    featuredH1: { zh: "精选案例", en: "Featured cases" },
    featuredLede: {
      zh: "从 data/cases.json 中 featured === true 的条目整理而来，适合对照官方角色、例行与审批边界，作为第一个 Bot 或团队协作模板。当前 {n} 条。",
      en: "Items with featured === true in data/cases.json. Use them to compare official roles, routines, and approval bounds as a first Bot or team template. {n} now.",
    },
    featuredTitle: { zh: "精选案例 · AI UP LAB", en: "Featured cases · AI UP LAB" },
    featuredDesc: {
      zh: "编辑精选的 Grok Bot 用法，适合作为第一个 Bot 或团队协作模板。",
      en: "Editor-picked Grok Bot uses — a first Bot or team template.",
    },
    latestH1: { zh: "最新案例", en: "Latest cases" },
    latestLede: {
      zh: "按 publishedAt 再按 updatedAt 从新到旧排列，便于先看最近公开的用法。当前共 {n} 条。",
      en: "Sorted by publishedAt, then updatedAt, newest first. {n} now.",
    },
    latestTitle: { zh: "最新案例 · AI UP LAB", en: "Latest cases · AI UP LAB" },
    latestDesc: {
      zh: "按公开日期排序的 Grok Bot 用法，最新在前。",
      en: "Grok Bot uses by public date, newest first.",
    },
    viewLatest: { zh: "查看最新", en: "View latest" },
    viewFeatured: { zh: "查看精选", en: "View featured" },
    browseTypes: { zh: "按类型浏览", en: "Browse by type" },
    allCases: { zh: "全部案例", en: "All cases" },
    featuredList: { zh: "精选案例列表", en: "Featured case list" },
    latestList: { zh: "最新案例列表", en: "Latest case list" },
    typeList: { zh: "类型列表", en: "Type list" },
    hubH1: { zh: "可对照的 Bot 用法时间线", en: "A timeline of comparable Bot uses" },
    hubLede: {
      zh: "例行、多 Agent、审批边界。按时间线读标题与摘要，点进去再看上手路径。当前 {n} 条 · 校对 {when}。",
      en: "Routines, multi-agent, approval bounds. Read titles and summaries in the timeline, then open a row for the start path. {n} items · checked {when}.",
    },
    hubTitle: { zh: "Grok Bot · AI UP LAB", en: "Grok Bot · AI UP LAB" },
    hubDesc: {
      zh: "按分类、来源、难度与能力筛选 Grok Bot 用法。",
      en: "Filter Grok Bot uses by category, source, difficulty, and capability.",
    },
    typeEntry: { zh: "类型入口", en: "Type entry points" },
    typesH1: { zh: "按类型浏览", en: "Browse by type" },
    typesLede: {
      zh: "每个类型对应 data/cases.json 里出现过的 categories[] 值，单独生成静态 HTML 收集页。当前 {n} 个类型。",
      en: "Each type is a categories[] value that appears in data/cases.json, with its own static HTML page. {n} types now.",
    },
    typesTitle: { zh: "按类型浏览 · AI UP LAB", en: "Browse by type · AI UP LAB" },
    typesDesc: {
      zh: "按销售、工程、自动化等类型浏览 Grok Bot 用法。",
      en: "Browse Grok Bot uses by sales, engineering, automation, and more.",
    },
    featuredCases: { zh: "精选案例", en: "Featured cases" },
    latestCases: { zh: "最新案例", en: "Latest cases" },
    allTypes: { zh: "全部类型", en: "All types" },
    filterAll: { zh: "筛选全部案例", en: "Filter all cases" },
    typePageDesc: {
      zh: "{title}类型下的 Grok Bot 用法收集。",
      en: "Grok Bot uses in the {title} type.",
    },
    typeLede: {
      zh: "当前 {n} 条，均来自 categories 含「{category}」的记录。",
      en: "{n} items whose categories include “{category}”.",
    },
    typeListLabel: { zh: "{title}案例列表", en: "{title} case list" },
  },
  html: {
    hubKicker: { zh: "AI UP LAB · HTML 收集", en: "AI UP LAB · HTML Collection" },
    hubH1: { zh: "公开网页里的 HTML 范例", en: "HTML examples from public pages" },
    hubLede: {
      zh: "演示、模板、组件与工具页，和 Grok Bot、Agent UI 分开。预览按 3:2 显示完整页面截图。",
      en: "Demos, templates, components, and tool pages — separate from Grok Bot and Agent UI. Previews use a 3:2 frame so the full page screenshot stays readable.",
    },
    hubTitle: { zh: "HTML 收集", en: "HTML Collection" },
    hubDesc: {
      zh: "AI UP LAB 的 HTML 收集库：从公开网页收集的演示、模板、组件与工具页。",
      en: "AI UP LAB’s HTML Collection: demos, templates, components, and tool pages from public sites.",
    },
    wall: { zh: "浏览墙", en: "Browse wall" },
    wallLede: {
      zh: "精选靠前。点卡片进详情，原文仍在站外。",
      en: "Featured items first. Open a card for details; the original stays off-site.",
    },
    featuredH1: { zh: "精选 HTML", en: "Featured HTML" },
    featuredLede: {
      zh: "featured === true 的公开页面，当前 {n} 条。原文均在站外，本站只做索引。",
      en: "Public pages with featured === true. {n} now. Originals stay off-site; this is an index.",
    },
    featuredTitle: { zh: "精选 HTML · AI UP LAB", en: "Featured HTML · AI UP LAB" },
    featuredDesc: {
      zh: "编辑精选的公开 HTML 演示与模板。",
      en: "Editor-picked public HTML demos and templates.",
    },
    latestH1: { zh: "最新 HTML", en: "Latest HTML" },
    latestLede: {
      zh: "按 publishedAt 再按 updatedAt 从新到旧。当前 {n} 条。",
      en: "Sorted by publishedAt, then updatedAt, newest first. {n} now.",
    },
    latestTitle: { zh: "最新 HTML · AI UP LAB", en: "Latest HTML · AI UP LAB" },
    latestDesc: {
      zh: "按公开日期排序的 HTML 页面收集。",
      en: "HTML pages by public date.",
    },
    latestHtml: { zh: "最新 HTML", en: "Latest HTML" },
    featuredHtml: { zh: "精选 HTML", en: "Featured HTML" },
    typesH1: { zh: "按类型浏览", en: "Browse by type" },
    typesLede: {
      zh: "类型来自 data/html-items.json 里实际出现过的 types[]。当前 {n} 类。",
      en: "Types are types[] values that actually appear in data/html-items.json. {n} now.",
    },
    typesTitle: { zh: "HTML 类型 · AI UP LAB", en: "HTML types · AI UP LAB" },
    typesDesc: {
      zh: "按落地页、动效、组件等类型浏览 HTML 收集。",
      en: "Browse the HTML Collection by landing pages, motion, components, and more.",
    },
    typePageDesc: {
      zh: "{title}类型下的公开 HTML 页面。",
      en: "Public HTML pages in the {title} type.",
    },
    typeLede: { zh: "当前 {n} 条。", en: "{n} items now." },
    htmlOverview: { zh: "HTML 总览", en: "HTML overview" },
  },
  agent: {
    hubKicker: { zh: "AI UP LAB · Agent UI", en: "AI UP LAB · Agent UI" },
    hubH1: { zh: "可交给 Agent 换主题的界面件", en: "UI pieces an Agent can retheme" },
    hubLede: {
      zh: "只收 ThreeUI Community 免费、免登录条目。复制 prompt 或 Skill.md，不要手改 procedural JS。不含 Pro，也不提供 MCP。",
      en: "Free, no-login ThreeUI Community items only. Copy the prompt or Skill.md — do not hand-edit procedural JS. No Pro, no MCP.",
    },
    hubDesc: {
      zh: "AI UP LAB 的 Agent UI 库：ThreeUI Community 免费组件，可复制 prompt / Skill.md 换主题。",
      en: "AI UP LAB’s Agent UI library: free ThreeUI Community components you can retheme with a prompt / Skill.md.",
    },
    wall: { zh: "浏览墙", en: "Browse wall" },
    wallLede: {
      zh: "精选靠前。卡片按 3:2 显示预览；原文与换主题提示在详情页。",
      en: "Featured items first. Cards use a 3:2 preview; the source and retheme hint are on the detail page.",
    },
    featuredH1: { zh: "精选 Agent UI", en: "Featured Agent UI" },
    featuredLede: {
      zh: "featured === true 的免费组件，当前 {n} 条。原文在 ThreeUI，本站只做索引。",
      en: "Free components with featured === true. {n} now. Originals live on ThreeUI; this is an index.",
    },
    featuredTitle: { zh: "精选 Agent UI · AI UP LAB", en: "Featured Agent UI · AI UP LAB" },
    featuredDesc: {
      zh: "编辑精选的 ThreeUI Community 免费组件。",
      en: "Editor-picked free ThreeUI Community components.",
    },
    latestH1: { zh: "最新 Agent UI", en: "Latest Agent UI" },
    latestLede: {
      zh: "按 publishedAt 再按 updatedAt 从新到旧。当前 {n} 条。",
      en: "Sorted by publishedAt, then updatedAt, newest first. {n} now.",
    },
    latestTitle: { zh: "最新 Agent UI · AI UP LAB", en: "Latest Agent UI · AI UP LAB" },
    latestDesc: {
      zh: "按公开日期排序的 Agent UI 收集。",
      en: "Agent UI items by public date.",
    },
    typesH1: { zh: "按类型浏览", en: "Browse by type" },
    typesLede: {
      zh: "类型来自 data/agent-ui.json 里实际出现过的 types[]。当前 {n} 类。",
      en: "Types are types[] values that actually appear in data/agent-ui.json. {n} now.",
    },
    typesTitle: { zh: "Agent UI 类型 · AI UP LAB", en: "Agent UI types · AI UP LAB" },
    typesDesc: {
      zh: "按落地页、背景场、按钮等类型浏览 Agent UI。",
      en: "Browse Agent UI by landing pages, background fields, buttons, and more.",
    },
    typePageDesc: {
      zh: "{title}类型下的 ThreeUI Community 免费组件。",
      en: "Free ThreeUI Community components in the {title} type.",
    },
    typeLede: { zh: "当前 {n} 条。", en: "{n} items now." },
    overview: { zh: "Agent UI 总览", en: "Agent UI overview" },
  },
} as const;

export function fill(copy: Copy | { zh: string; en: string }, vars: Record<string, string | number>): Copy {
  const replace = (text: string) =>
    text.replace(/\{(\w+)\}/g, (_, key: string) => String(vars[key] ?? ""));
  return { zh: replace(copy.zh), en: replace(copy.en) };
}
