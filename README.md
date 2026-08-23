# Grok Bot 案例库

精选 Grok Bot 优质用法的静态展示站，主界面为简体中文，英文标题作为次要信息。

- 站点名：Grok Bot 案例库
- 标语：精选 Grok Bot 优质用法，每日更新
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
3. 若有文字说明，追加 [`data/changelog.json`](data/changelog.json) 的 `notes`
4. 提交并推送到 `main`

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

| 路径 | 内容 |
| --- | --- |
顶栏两个内容库：**Grok Bot** 与 **HTML 收集**。

| 路径 | 内容 |
| --- | --- |
| `/` | Grok Bot 首页：双库入口 + 精选/最新/类型预览 |
| `/featured/` `/latest/` `/types/` `/types/[category]/` | Grok Bot 收集页 |
| `/cases/` `/cases/[slug]/` | 可筛选案例与详情 |
| `/docs/` `/changelog/` | 文档枢纽与更新日志 |
| `/html/` | HTML 收集总览（精选、最新、类型） |
| `/html/featured/` `/html/latest/` `/html/types/` `/html/types/[type]/` | HTML 收集页 |
| `/html/[slug]/` | 单条 HTML 条目详情 |

徽章：官方 / 社区 / Cursor相邻 / 需审批 / 例行 / 多Agent。HTML 条目另有类型徽章与原文链接。
