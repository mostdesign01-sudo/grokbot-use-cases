# AI UP LAB

可复用的 AI 精选实验室。案例 / 页面 / Agent UI 每日更新。主界面为简体中文，英文标题作为次要信息。

- 站点名：AI UP LAB
- 标语：可复用的 AI 精选实验室 · 案例 / 页面 / Agent UI
- 当前内容库：Grok Bot 案例、HTML 收集、Agent UI（ThreeUI Community 免费件）
- 仓库：https://github.com/mostdesign01-sudo/grokbot-use-cases
- 预期公开地址：https://mostdesign01-sudo.github.io/grokbot-use-cases/

本站**不是** xAI / SpaceXAI / Cursor 官方站点。所有案例来自公开文档与社区文章，原始链接写在每条记录里。

## 本地运行

需要 Node.js 20+。

```bash
npm install
npm run dev
```

开发服务器默认在 `http://localhost:4321/grokbot-use-cases/`（因为 GitHub Pages 项目站使用 `/grokbot-use-cases/` 作为 `base`）。

```bash
npm run build    # 输出到 dist/，并校验 20 条详情页都已生成
npm run preview  # 预览生产构建
```

## 每日如何更新数据

应用逻辑（页面、筛选、样式）与数据分离。日常更新**只改数据文件**，不必改组件。

1. **Grok Bot 案例**：编辑 [`data/cases.json`](data/cases.json)
   - 新增或修订 `cases[]` 条目
   - 更新 `meta.updatedAt`（UTC ISO）、`meta.version`、`meta.count`
   - 字段见 [`data/schema.md`](data/schema.md)
2. **HTML 收集**：编辑 [`data/html-items.json`](data/html-items.json)
   - 只收录真实公开 URL，勿与 cases 混写
   - 字段见 [`data/html-schema.md`](data/html-schema.md)
3. **Agent UI**：编辑 [`data/agent-ui.json`](data/agent-ui.json)
   - 只收录 ThreeUI Community 免费、免登录条目，勿写 Pro / MCP
   - 字段见 [`data/agent-ui-schema.md`](data/agent-ui-schema.md)
4. 若有文字说明，追加 [`data/changelog.json`](data/changelog.json) 的 `notes`
5. 提交并推送到 `main`

GitHub Actions 会重新构建静态站。筛选、详情页、徽章都会从 JSON 重新生成。不要在页面里手写案例正文。

构建后也可访问 `/grokbot-use-cases/data.json` 下载当前数据集。

## GitHub Pages 如何部署

工作流：[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

1. 推送到 `main`（或手动 `workflow_dispatch`）
2. Action 执行 `npm ci` → `npm run build`
3. 把 `dist/` 作为 GitHub Pages artifact 发布

首次启用（仓库设置里操作一次）：

1. 打开仓库 **Settings → Pages**
2. **Build and deployment → Source** 选 **GitHub Actions**
3. 合并本站到 `main` 后，等待 `Deploy to GitHub Pages` 工作流变绿

公开 URL 形态：

```
https://mostdesign01-sudo.github.io/grokbot-use-cases/
```

详情页：

```
https://mostdesign01-sudo.github.io/grokbot-use-cases/cases/<slug>/
```

Astro 配置了 `site` 与 `base: /grokbot-use-cases`，以匹配项目主页路径。若改仓库名，同步改 `astro.config.mjs` 的 `base`。

## 站点结构

**AI UP LAB** 是伞品牌。顶栏三个内容库：**Grok Bot**（琥珀色）、**HTML 收集**（青绿色）、**Agent UI**（靛紫色）。三套数据分开，不是行业新闻站。

| 路径 | 内容 |
| --- | --- |
| `/` | 实验室首页：三张库海报 + 跨库精选瀑布流 |
| `/cases/` `/cases/[slug]/` | Grok Bot 总览（筛选 + masonry）与详情（含上手路径） |
| `/featured/` `/latest/` `/types/` `/types/[category]/` | Grok Bot 收集页（masonry） |
| `/search/` | 三库检索：标题、摘要、标签、收录理由 |
| `/docs/` `/changelog/` | 文档枢纽与按日分组的更新日志 |
| `/html/` | HTML 收集总览（masonry 浏览墙） |
| `/html/featured/` `/html/latest/` `/html/types/` `/html/types/[type]/` | HTML 收集页 |
| `/html/[slug]/` | 单条 HTML 条目详情（打开原文、适合学什么） |
| `/agent-ui/` | Agent UI 总览（ThreeUI Community 免费件，masonry） |
| `/agent-ui/featured/` `/agent-ui/latest/` `/agent-ui/types/` `/agent-ui/types/[type]/` | Agent UI 收集页 |
| `/agent-ui/[slug]/` | 单条 Agent UI 详情（打开原文、给 Agent 的换主题提示） |

徽章：官方 / 社区 / Cursor相邻 / 需审批 / 例行 / 多Agent。详情页用 `qualityNote` 展示「收录理由」。HTML / Agent UI 条目另有类型徽章与原文链接。

## 界面

首页是三张海报（琥珀 / 青绿 / 靛紫）加 Pinterest 式精选墙。HTML 收集与 Agent UI 卡片使用 `public/previews/` 里的自托管缩略图（JSON 里写 `/previews/{id}.webp`，构建时走 Astro `base`）。缺图或加载失败时回退 CSS 库海报。Grok Bot 案例默认海报。不是 AI 新闻站。

重新截取预览（可选，需本机 Chrome + Playwright）：

```bash
npm i -D playwright sharp
node scripts/capture-previews.mjs
```
