# `data/cases.json` 字段说明

站点在构建时读取此文件。日常更新只需改 JSON，不必改页面逻辑。

## 顶层

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `meta` | object | 数据集元信息 |
| `cases` | array | 案例列表 |

## `meta`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `updatedAt` | string | ISO 8601 UTC 时间，页面按 `Asia/Shanghai` 显示 |
| `timezone` | string | 展示时区，当前为 `Asia/Shanghai` |
| `version` | string | 数据集版本号 |
| `count` | number | 案例条数（应与 `cases.length` 一致） |
| `sourcesCrawled` | string[] | 本次整理对照过的公开 URL |

近期文字说明写在 `data/changelog.json` 的 `notes` 中，避免和案例记录混在一起。

## `cases[]`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 稳定主键，例如 `sales-outbound-overnight` |
| `slug` | string | 详情页路径 `/cases/[slug]/` |
| `title` | string | 中文标题（主 UI） |
| `titleEn` | string | 英文标题（次要展示） |
| `summary` | string | 中文摘要 |
| `categories` | string[] | 分类：`sales` `automation` `content` `engineering` `daily-digest` `recruiting` `research` `marketing` `finance` `multi-agent` `coding` |
| `role` | string | Bot / 角色名 |
| `sourceUrl` | string | 主来源 URL |
| `secondaryUrls` | string[] | 可选补充来源 |
| `sourceType` | string | `official-docs` `official-launch` `community` `tutorial` `case-study` `adjacent-cursor` |
| `qualityNote` | string | 为何收录、适用边界 |
| `difficulty` | string | `starter` `intermediate` `advanced` |
| `hasRoutine` | boolean | 是否包含例行 / 定时或事件触发 |
| `hasSkill` | boolean | 是否包含可复用 skill |
| `hasMultiAgent` | boolean | 是否多 Bot / 多 Agent |
| `requiresApproval` | boolean | 是否默认需要人审 |
| `approvalBoundary` | string | 可选，未批准前不得做的事 |
| `connectors` | string[] | 涉及的系统或工具 |
| `language` | string | 条目文案语言，当前为 `zh` |
| `featured` | boolean | 是否出现在首页精选 |
| `publishedAt` | string | 来源公开日期 `YYYY-MM-DD` |
| `updatedAt` | string | 本条目最近校对时间 |

## 徽章映射

- **官方**：`sourceType` 为 `official-docs` 或 `official-launch`
- **社区**：`community` / `tutorial` / `case-study`
- **Cursor相邻**：`adjacent-cursor`
- **需审批**：`requiresApproval`
- **例行**：`hasRoutine`
- **多Agent**：`hasMultiAgent`
