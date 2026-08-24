# `data/agent-ui.json` 字段说明

与 `data/cases.json`（Grok Bot）和 `data/html-items.json`（HTML 收集）分开维护。本文件只收录 **ThreeUI Community** 里可公开访问、免登录、非 Pro 的组件页。

不要写入 Pro 组件，也不要声称提供 MCP（Pro 专属）。

## 顶层

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `meta` | object | 数据集元信息 |
| `items` | array | Agent UI 条目 |

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
| `slug` | string | 详情路径 `/agent-ui/[slug]/`，勿使用 `featured` `latest` `types` |
| `title` | string | 展示标题（专有名词可保持原文） |
| `summary` | string | 中文摘要 |
| `types` | string[] | 见下方类型枚举 |
| `sourceUrl` | string | ThreeUI Community 免费组件页，形态为 `https://threeui.com/{category}/{slug}`（可带 `/variant`） |
| `secondaryUrls` | string[] | 可选，GitHub / browse |
| `previewImage` | string | 自托管预览缩略图，站点根相对路径（如 `/previews/{id}.webp`）。构建时由 Astro `base` 加上 `/grokbot-use-cases` 前缀。缺省或加载失败时卡片回退 CSS 海报。 |
| `featured` | boolean | 是否出现在精选 |
| `publishedAt` | string | 来源大致公开日期 `YYYY-MM-DD` |
| `updatedAt` | string | 本条目校对时间 |
| `qualityNote` | string | 为何收录；页面展示为「收录理由」 |
| `tags` | string[] | 检索用标签 |
| `npmPackage` | string | 可选，如 `@designcodeio/threeui` |
| `promptHint` | string | 可选，给 Agent 的换主题 / Skill 提示 |

## 类型枚举

| 值 | 中文 |
| --- | --- |
| `landing` | 落地页 |
| `hero` | Hero |
| `threejs` | Three.js |
| `background` | 背景场 |
| `button` | 按钮 |
| `text-animation` | 文字动效 |
| `ui` | 界面件 |
| `motion` | 动效 |
| `section` | 区块 |
