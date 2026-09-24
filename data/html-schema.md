# `data/html-items.json` 字段说明

与 `data/cases.json`（Grok Bot 案例）分开维护。本文件只收录公开可访问的 HTML / CSS 演示、模板、组件库或工具页。

## 顶层

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `meta` | object | 数据集元信息 |
| `items` | array | HTML 条目 |

## `meta`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `updatedAt` | string | ISO 8601 UTC |
| `timezone` | string | 展示时区，`Asia/Shanghai` |
| `version` | string | 数据集版本 |
| `count` | number | 应与 `items.length` 一致 |

## `items[]`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 稳定主键 |
| `slug` | string | 详情路径 `/html/[slug]/`，勿使用 `featured` `latest` `types` |
| `title` | string | 中文界面展示的标题（专有名词可保持原文） |
| `titleEn` | string | 英文标题（专有名词可与 `title` 相同） |
| `summary` | string | 中文摘要。读者向价值，不要写成核验日志 |
| `summaryEn` | string | 英文摘要（EN 模式展示；翻译已有中文，勿新增条目） |
| `hook` | string | 可选。读者向一句话：这是什么、为什么值得打开。中文 ≤ 36 个汉字。不写核验痕迹、HTTP 状态、星数或点数、日期 |
| `hookEn` | string | 可选。英文一句话，≤ 90 个字符，只复述 `hook` 已有的事实 |
| `types` | string[] | 见下方类型枚举 |
| `sourceUrl` | string | 公开原文 / 演示 URL |
| `secondaryUrls` | string[] | 可选，仓库或其他来源 |
| `previewImage` | string | 自托管预览缩略图，站点根相对路径（如 `/previews/{id}.webp`）。构建时由 Astro `base`（与仓库名相同，现为 `/ai-up-lab`）加上前缀。缺省或加载失败时卡片回退 CSS 海报。 |
| `featured` | boolean | 是否出现在精选 |
| `stars` | number | 可选，编辑星级 1–5 整数（★ 显示在卡片与详情）。编辑质量判断，不是 GitHub star 数；不填则不显示 |
| `publishedAt` | string | 来源大致公开日期 `YYYY-MM-DD` |
| `updatedAt` | string | 本条目校对时间 |
| `qualityNote` | string | 为何收录；页面展示为「收录理由」 |
| `qualityNoteEn` | string | 英文收录理由 |
| `tags` | string[] | 检索用标签 |

## 文案规范 / copy rules

- `hook` 与 `summary`（及 `hookEn` / `summaryEn`）是读者向价值：说明这条是什么、为什么值得打开。
- `summary` / `summaryEn` 不要写 HTTP 状态、`gh api`、Algolia 或截图方式；这些放进 `qualityNote`。
- 核验痕迹只写在 `qualityNote` / `qualityNoteEn`：HTTP 状态、`gh api`、Algolia、截图方式（例如 Playwright / WebP）、撰写时的 star 或点数、日期与 item 编号。
- 卡片短句优先用 `hook`。没有 `hook` 时，从 `summary` 取第一句并去掉上述核验碎片。不要把 `qualityNote` 当作卡片文案。详情页仍展示完整 `summary`。

## 类型枚举

| 值 | 中文 |
| --- | --- |
| `landing` | 落地页 |
| `motion` | 动效 |
| `component` | 组件 |
| `tool` | 工具页 |
| `portfolio` | 作品集 |
| `docs` | 文档站 |
| `interactive` | 游戏/互动 |
| `other` | 其他 |
