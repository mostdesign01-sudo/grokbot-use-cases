# `data/models.json` 字段说明

最新模型看板（Models）与三套内容库、可跑路径、三库组合分开。这里追踪最新前沿模型与值得看的社区 showcase：每张卡一个模型，链官方模型页 + 社区作品源，不复制厂商长文。不是第四套卡片墙，也不是 Grok Bot 用法。日常增改只改 JSON。

首条是 GPT-6 Astra；之后的模型按同一结构追加。已在 `data/cases.json` 以「AI 资讯」收录过的模型（如 Claude Fable 5.1）可以只写短卡，用 `relatedCaseIds` 指回库内条目，不重复正文。

## 顶层

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `meta` | object | 数据集元信息 |
| `models` | array | 模型列表 |

## `meta`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `updatedAt` | string | ISO 8601 UTC |
| `timezone` | string | 展示时区，`Asia/Shanghai` |
| `version` | string | 数据集版本 |
| `count` | number | 应与 `models.length` 一致 |

## `models[]`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 稳定主键，例如 `gpt-6-astra` |
| `slug` | string | 详情路径 `/models/[slug]/` |
| `name` | string | 模型名（原文，如 `GPT-6 Astra`） |
| `vendor` | string | 厂商（原文，如 `OpenAI` `Anthropic`） |
| `title` | string | 中文标题（主 UI） |
| `titleEn` | string | 英文标题 |
| `summary` | string | 中文摘要；官方说法与社区说法分开写 |
| `summaryEn` | string | 英文摘要；勿编造指标 |
| `announcedAt` | string | 厂商公告日期 `YYYY-MM-DD` |
| `publishedAt` | string | 写入本看板的日期 `YYYY-MM-DD` |
| `updatedAt` | string | 条目最近修改，ISO 8601 UTC |
| `sources` | object[] | 来源（见下）。至少一条 `official` |
| `highlights` | object[] | 可选，短要点：`text` `textEn`。厂商数字必须标「官方称」 |
| `qualityNote` | string | 收录理由 / 核实边界：哪些是厂商自述、哪些是社区自述、哪个 URL 没能确认 |
| `qualityNoteEn` | string | 英文收录理由 |
| `relatedCaseIds` | string[] | 必须是 `data/cases.json` 里已有的 `id`；用于指回已有 AI 资讯条目 |
| `previewImage` | string | 可选，`/previews/{id}.webp`；可复用已有预览 |
| `previewCredit` | string | 可选，预览图出处（中文），如「YouWare X 视频封面」 |
| `previewCreditEn` | string | 可选，预览图出处（英文） |
| `featured` | boolean | 是否在看板靠前 |
| `stars` | number | 可选，编辑星级 1–5 整数（★ 显示在卡片与详情）。只表示这张卡的整理质量，不是基准分，也不为厂商数字背书；厂商说法仍未核实就别打高星。不填则不显示 |

### `sources[]`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `kind` | string | `official`（厂商模型页 / 安全综述）、`community`（社区 showcase、整理帖）、`product`（第三方产品主页） |
| `label` | string | 中文链接文字 |
| `labelEn` | string | 英文链接文字 |
| `url` | string | 已核实可达的公开 URL；确认不了的深链不要写 |
| `by` | string | 可选，作者 / 账号 / 机构 |
| `date` | string | 可选，来源日期 `YYYY-MM-DD` |

官方页与社区 showcase 必须在 UI 上分开标注。厂商基准分、推出节奏、价格一律当厂商自述写；社区条数（如「720+」）一律当社区自述写。相关 id 构建时必须能解析。
