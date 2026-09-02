# `data/paths.json` 字段说明

可跑路径（Playbooks）与三套内容库分开。这里写的是 brief → 席位 → 验收闸门，不是又一套卡片。日常增改只改 JSON。

## 顶层

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `meta` | object | 数据集元信息 |
| `paths` | array | 路径列表 |

## `meta`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `updatedAt` | string | ISO 8601 UTC |
| `timezone` | string | 展示时区，`Asia/Shanghai` |
| `version` | string | 数据集版本 |
| `count` | number | 应与 `paths.length` 一致 |

## `paths[]`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 稳定主键，例如 `content-desk` |
| `slug` | string | 详情路径 `/paths/[slug]/` |
| `title` | string | 中文标题（主 UI） |
| `titleEn` | string | 英文标题 |
| `summary` | string | 中文摘要 |
| `summaryEn` | string | 英文摘要；勿编造指标 |
| `steps` | object[] | 步骤：`title` `titleEn` `body` `bodyEn` |
| `relatedCaseIds` | string[] | 必须是 `data/cases.json` 里已有的 `id` |
| `relatedHtmlIds` | string[] | 必须是 `data/html-items.json` 里已有的 `id` |
| `relatedAgentUiIds` | string[] | 必须是 `data/agent-ui.json` 里已有的 `id` |
| `relatedPages` | object[] | 可选，本站入口：`href`（给 `withBase`）`title` `titleEn` |
| `gates` | object[] | 验收闸门：`title` `titleEn`，可选 `body` `bodyEn` |
| `difficulty` | string | `starter` `intermediate` `advanced` |
| `featured` | boolean | 是否在路径总览靠前 |
| `publishedAt` | string | 写入日期 `YYYY-MM-DD` |

相关 id 构建时必须能解析。不要为路径发明库里没有的案例，也不要写 Publisher / Blotato。
