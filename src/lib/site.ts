/** Public umbrella brand. Library names stay separate. */
export const siteName = "AI UP LAB";

export const siteTagline = "核验精选 · 人核过的用法、路径、三库拣货";
export const siteTaglineEn = "Curated & checked · use-cases, paths, three-library picks";

export const siteDescription =
  "AI UP LAB：核验精选的可复用用法。人核过的 Cases / HTML / Agent UI，加上 Paths 与 Combos。不是 bot 安装目录。";
export const siteDescriptionEn =
  "AI UP LAB: curated, human-checked use-cases — Cases / HTML / Agent UI plus Paths and Combos. Not a bot install directory.";

/** Public source repo for this site. The GitHub-star CTA points here; it is unrelated to curator ★ or visitor ☆. */
export const repoSlug = "mostdesign01-sudo/grokbot-use-cases";
export const repoUrl = `https://github.com/${repoSlug}`;
/** Unauthenticated public endpoint used only to paint the live stargazer count client-side. */
export const repoApiUrl = `https://api.github.com/repos/${repoSlug}`;

export function pageTitle(page?: string) {
  return page ? `${page} · ${siteName}` : siteName;
}
