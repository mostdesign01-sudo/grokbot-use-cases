/**
 * Curator stars (editorial quality, 1–5) and visitor favorites (client-only).
 *
 * `stars` is an optional integer on cases / html-items / agent-ui / models.
 * It is an editorial rating, unrelated to GitHub stargazers or any live count.
 *
 * Favorites never touch a server: the site is static GitHub Pages. They live in
 * `localStorage` under FAVORITES_STORAGE_KEY as a JSON array of `${lib}:${id}`.
 */
export type FavLib = "grok" | "html" | "agent-ui" | "models";

export const FAVORITES_STORAGE_KEY = "aiuplab:favorites";
export const STARS_MAX = 5;

export function isValidStars(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= STARS_MAX;
}

/** Normalise an optional `stars` field; anything out of range is treated as unset. */
export function starsOf(item: { stars?: unknown }): number | undefined {
  return isValidStars(item.stars) ? item.stars : undefined;
}

export function favKey(lib: FavLib, id: string): string {
  return `${lib}:${id}`;
}
