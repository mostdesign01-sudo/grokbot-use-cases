# `data/image-prompts.json` 字段说明

Image 2.5 提示词看板（Image prompts）与三套内容库、可跑路径、三库组合、最新模型看板分开。这里追踪 GPT-Image-2.5 / ChatGPT Images 2.5 的提示词画廊、案例合集与值得抄的单条提示词：每张卡一个可打开的公开来源（画廊站、合集帖或单条案例），链原站 + 作者帖，不复制别人的整条提示词库。日常增改只改 JSON，Hao 每天追加。

首条是 img.dsxzai.com（@dashiAIxz 的 Image 2.5 案例 + 提示词画廊）；之后的条目按同一结构追加。

## 顶层

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `meta` | object | 数据集元信息 |
| `items` | array | 条目列表 |

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
| `id` | string | 稳定主键，例如 `dsxzai-image-25-gallery` |
| `slug` | string | 详情路径 `/image-prompts/[slug]/` |
| `title` | string | 中文标题（主 UI） |
| `titleEn` | string | 英文标题 |
| `summary` | string | 中文摘要；作者说法与本库核到的分开写 |
| `summaryEn` | string | 英文摘要；勿编造条数、点赞、浏览等数字 |
| `modelTag` | string | 可选，所属模型标签，默认 `gpt-image-2.5`；卡片与详情以徽章显示 |
| `sourceUrl` | string | 主来源：已核实可达的公开 URL（画廊站 / 合集帖 / 单条案例） |
| `sourceLabel` | string | 可选，主来源中文链接文字 |
| `sourceLabelEn` | string | 可选，主来源英文链接文字 |
| `sourceBy` | string | 可选，主来源作者 / 账号 / 站点方 |
| `secondaryUrls` | object[] | 可选，其他来源（作者 X 帖、中文转述帖、仓库等），见下 |
| `previewImage` | string | 可选，`/previews/{id}.webp`，3:2；构建时由 Astro `base` 加前缀 |
| `previewCredit` | string | 可选，预览图出处（中文） |
| `previewCreditEn` | string | 可选，预览图出处（英文） |
| `tags` | string[] | 自由标签，小写短横线，如 `gallery` `prompt-library` `single-prompt` `chinese` |
| `publishedAt` | string | 写入本看板的日期 `YYYY-MM-DD` |
| `updatedAt` | string | 条目最近修改，ISO 8601 UTC |
| `highlights` | object[] | 可选，短要点：`text` `textEn`。作者数字必须标「作者称」，站点自报数字要写清口径 |
| `qualityNote` | string | 收录理由 / 核实边界：哪些是作者自述、哪个 URL 没能确认、预览图怎么来的 |
| `qualityNoteEn` | string | 英文收录理由 |
| `relatedModelIds` | string[] | 可选，指向 `data/models.json` 里已有的 `id`（例如日后开了 GPT-Image-2.5 模型卡）；构建时必须能解析 |
| `featured` | boolean | 是否在看板靠前 |
| `stars` | number | 可选，编辑星级 1–5 整数（★ 显示在卡片与详情）。只表示这张卡的整理质量，不为原站内容背书；不填则不显示 |

### `secondaryUrls[]`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `label` | string | 中文链接文字 |
| `labelEn` | string | 英文链接文字 |
| `url` | string | 已核实可达的公开 URL；确认不了的深链不要写 |
| `by` | string | 可选，作者 / 账号 |
| `date` | string | 可选，来源日期 `YYYY-MM-DD` |

原站与作者帖在 UI 上分开标注（主来源 / 其他来源）。第三方画廊的条数一律当站点自报写，并注明是哪个口径、哪天看到的；不写点赞、转发、浏览等互动数字。本看板不为任何画廊站背书，也不搬运其整条提示词库。
