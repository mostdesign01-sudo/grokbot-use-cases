/** Public umbrella brand. Library names stay separate. */
export const siteName = "AI UP LAB";

export const siteTagline = "每天更新的 AI 教程与工具";
export const siteTaglineEn = "Daily AI tutorials and tools";

export const siteDescription =
  "给想提升 AI 能力的人：跟着教程学会用 Agent，或直接拿走 Skill、组件和网页范例。每条都附原文链接。";
export const siteDescriptionEn =
  "For people building their AI skills: learn Agents from a tutorial, or take a Skill, a component, or a web example and use it. Every entry links to the original.";

/** Public source repo for this site. The GitHub-star CTA points here; it is unrelated to curator ★ or visitor ☆. */
export const repoSlug: string = import.meta.env.PUBLIC_REPO_SLUG;
export const repoUrl = `https://github.com/${repoSlug}`;
/** Unauthenticated public endpoint used only to paint the live stargazer count client-side. */
export const repoApiUrl = `https://api.github.com/repos/${repoSlug}`;

export function pageTitle(page?: string) {
  return page ? `${page} · ${siteName}` : siteName;
}
