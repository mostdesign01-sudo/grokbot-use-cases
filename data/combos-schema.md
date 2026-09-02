# `data/combos.json` 字段说明

三库交叉组合（Combos）与可跑路径分开。路径写 brief → 席位 → 验收闸门；这里写的是**具体拣货**：一条 HTML 壳 + 一件 Agent UI + 一个 Grok Bot 案例。给全员课 / Design 工作室用，不是第四套卡片墙。日常增改只改 JSON。

v1 只收 **3–5** 条精选。每个关联 id 构建时必须能在对应库里解析。不要发明库里没有的条目，也不要写未核实指标或 Publisher / Blotato。

## 顶层

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `meta` | object | 数据集元信息 |
| `combos` | array | 组合列表 |

## `meta`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `updatedAt` | string | ISO 8601 UTC |
| `timezone` | string | 展示时区，`Asia/Shanghai` |
| `version` | string | 数据集版本 |
| `count` | number | 应与 `combos.length` 一致 |

## `combos[]`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 稳定主键，例如 `ambient-cube-slides` |
| `slug` | string | 详情路径 `/combos/[slug]/` |
| `title` | string | 中文标题（主 UI） |
| `titleEn` | string | 英文标题 |
| `summary` | string | 中文摘要 |
| `summaryEn` | string | 英文摘要；勿编造指标 |
| `htmlId` | string | 必须是 `data/html-items.json` 里已有的 `id` |
| `agentUiId` | string | 必须是 `data/agent-ui.json` 里已有的 `id` |
| `caseId` | string | 必须是 `data/cases.json` 里已有的 `id` |
| `useFor` | string | 可选，中文场景（如「全员课场景」「Design 工作室」） |
| `useForEn` | string | 可选，英文场景 |
| `featured` | boolean | 可选，是否在总览靠前 |
| `publishedAt` | string | 可选，写入日期 `YYYY-MM-DD` |

缺一件就不要硬凑这条组合。
