/** Public umbrella brand. Library names stay separate. */
export const siteName = "AI UP LAB";

export const siteTagline = "可复用的 AI 精选实验室 · 案例 / 页面 / Agent UI";

export const siteDescription =
  "AI UP LAB：可复用的 AI 精选实验室。当前有 Grok Bot 案例、HTML 收集与 Agent UI 三套库，案例与页面每日更新。";

export function pageTitle(page?: string) {
  return page ? `${page} · ${siteName}` : siteName;
}
