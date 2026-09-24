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

近期文字说明写在 `data/changelog.json` 的 `notes` 中，避免和案例记录混在一起。每条 `notes[]` 除 `date` / `title` / `body` 外，应同时写 `titleEn` / `bodyEn`（翻译已有中文，勿丢掉中文）。

## `cases[]`

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 稳定主键，例如 `sales-outbound-overnight` |
| `slug` | string | 详情页路径 `/cases/[slug]/` |
| `title` | string | 中文标题（主 UI，默认语言） |
| `titleEn` | string | 英文标题（EN 模式主标题；ZH 模式作为次要行） |
| `summary` | string | 中文摘要。读者向价值，不要写成核验日志 |
| `summaryEn` | string | 英文摘要（EN 模式展示；勿编造新主张） |
| `hook` | string | 可选。读者向一句话：这是什么、为什么值得打开。中文 ≤ 36 个汉字。不写核验痕迹、HTTP 状态、星数或点数、日期 |
| `hookEn` | string | 可选。英文一句话，≤ 90 个字符，只复述 `hook` 已有的事实 |
| `categories` | string[] | 分类：`sales` `automation` `content` `engineering` `daily-digest` `recruiting` `research` `marketing` `finance` `multi-agent` `coding` |
| `role` | string | Bot / 角色名 |
| `sourceUrl` | string | 主来源 URL |
| `secondaryUrls` | string[] | 可选补充来源 |
| `sourceType` | string | `official-docs` `official-launch` `community` `tutorial` `case-study` `adjacent-cursor` |
| `qualityNote` | string | 为何收录、适用边界；页面展示为「收录理由」 |
| `qualityNoteEn` | string | 英文收录理由 |
| `difficulty` | string | `starter` `intermediate` `advanced` |
| `hasRoutine` | boolean | 是否包含例行 / 定时或事件触发 |
| `hasSkill` | boolean | 是否包含可复用 skill |
| `hasMultiAgent` | boolean | 是否多 Bot / 多 Agent |
| `requiresApproval` | boolean | 是否默认需要人审 |
| `approvalBoundary` | string | 可选，未批准前不得做的事 |
| `approvalBoundaryEn` | string | 可选，英文审批边界 |
| `connectors` | string[] | 涉及的系统或工具 |
| `language` | string | 条目文案语言，当前为 `zh` |
| `featured` | boolean | 是否出现在首页精选 |
| `stars` | number | 可选，编辑星级 1–5 整数（★ 显示在卡片与详情）。是编辑对质量的判断，**不是** GitHub star 数；GitHub 数字若要提，写在 `qualityNote` 里。不填则不显示星行 |
| `previewImage` | string | 可选，站点根路径如 `/previews/id.webp`，界面类优先 3:2 |
| `landing` | object | 可选。可能从 X 或其它对外帖链到详情页时使用，见下。有 `steps` 时详情页改走「怎么试」，不再渲染通用 Skill / Routine 上手路径 |
| `publishedAt` | string | 来源公开日期 `YYYY-MM-DD` |
| `updatedAt` | string | 本条目最近校对时间 |

## `landing`（X / 对外帖落地）

目录卡可以先薄。一旦这条可能被链到详情页，先填 `landing`，再放外链。最低线见 README「可从 X 链出的案例」。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `what` / `whatEn` | string | 「它是什么」。不要把 `summary` 再贴一遍 |
| `contrast` | object | 可选。`leftLabel` / `rightLabel`（及 `En`）加 `rows[]`：`aspect` `left` `right` 及对应 `En`。可选 `caption` / `captionEn`。右列只写对照理由，不编本库没核过的对方细节 |
| `steps` | object[] | 可选。「怎么试」。每步 `title` `body`（及 `En`）和 `links[]`（`href` `label` `labelEn`），`href` 必须是真实外链 |
| `boundaries` | object[] | 可选。「边界」。每条 `text` / `textEn`：依赖、密钥、对外动作、不要误当成官方替代 |
| `previewCredit` / `previewCreditEn` | string | 可选。预览图出处。有界面的产品配真实 `previewImage`，不要画假 UI |

## 文案规范 / copy rules

- `hook` 与 `summary`（及 `hookEn` / `summaryEn`）是读者向价值：说明这条是什么、为什么值得打开。
- `summary` / `summaryEn` 不要写 HTTP 状态、`gh api`、Algolia 或截图方式；这些放进 `qualityNote`。
- 核验痕迹只写在 `qualityNote` / `qualityNoteEn`：HTTP 状态、`gh api`、Algolia、截图方式（例如 Playwright / WebP）、撰写时的 star 或点数、日期与 item 编号。
- 卡片短句优先用 `hook`。没有 `hook` 时，从 `summary` 取第一句并去掉上述核验碎片。不要把 `qualityNote` 当作卡片文案。详情页仍展示完整 `summary`。

## 徽章映射

- **官方**：`sourceType` 为 `official-docs` 或 `official-launch`
- **社区**：`community` / `tutorial` / `case-study`
- **Cursor相邻**：`adjacent-cursor`
- **需审批**：`requiresApproval`
- **例行**：`hasRoutine`
- **多Agent**：`hasMultiAgent`
- **★ 星级**：`stars`（可选 1–5）

## 访客收藏（不在 JSON 里）

卡片与详情页的 ☆ 是访客收藏，只写浏览器 `localStorage`（键 `aiuplab:favorites`，值为 `"grok:<id>"` / `"html:<id>"` / `"agent-ui:<id>"` / `"models:<id>"` 数组）。`/favorites/` 页只读本机，不上传。改 `id` 会让访客已存的收藏失效，所以 `id` 要稳定。
