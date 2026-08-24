/** Public umbrella brand. Library names (Grok Bot / HTML 收集) stay separate. */
export const siteName = "AI UP LAB";

export const siteTagline = "可复用的 AI 精选实验室 · 案例与页面每日更新";

export const siteDescription =
  "AI UP LAB：可复用的 AI 精选实验室。当前有 Grok Bot 案例与 HTML 收集两套库，案例与页面每日更新。";

export function pageTitle(page?: string) {
  return page ? `${page} · ${siteName}` : siteName;
}
