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
| `summary` | string | 中文摘要 |
| `types` | string[] | 见下方类型枚举 |
| `sourceUrl` | string | 公开原文 / 演示 URL |
| `secondaryUrls` | string[] | 可选，仓库或其他来源 |
| `previewImage` | string | 可选，预览图 URL |
| `featured` | boolean | 是否出现在精选 |
| `publishedAt` | string | 来源大致公开日期 `YYYY-MM-DD` |
| `updatedAt` | string | 本条目校对时间 |
| `qualityNote` | string | 为何收录；页面展示为「收录理由」 |
| `tags` | string[] | 检索用标签 |

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
