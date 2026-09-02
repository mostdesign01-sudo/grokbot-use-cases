/** Public umbrella brand. Library names stay separate. */
export const siteName = "AI UP LAB";

export const siteTagline = "核验精选 · 人核过的用法、路径、三库拣货";
export const siteTaglineEn = "Curated & checked · use-cases, paths, three-library picks";

export const siteDescription =
  "AI UP LAB：核验精选的可复用用法。人核过的 Cases / HTML / Agent UI，加上 Paths 与 Combos。不是 bot 安装目录。";
export const siteDescriptionEn =
  "AI UP LAB: curated, human-checked use-cases — Cases / HTML / Agent UI plus Paths and Combos. Not a bot install directory.";

export function pageTitle(page?: string) {
  return page ? `${page} · ${siteName}` : siteName;
}
