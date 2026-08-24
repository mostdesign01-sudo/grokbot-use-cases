export function withBase(path = "/"): string {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const relative = path.replace(/^\//, "");
  return `${base}${relative}`;
}

/** Site-root paths like `/previews/id.webp` pick up Astro `base` (GitHub Pages). */
export function assetUrl(path?: string): string | undefined {
  if (!path) return undefined;
  if (/^(https?:)?\/\//i.test(path) || path.startsWith("data:")) return path;
  return withBase(path);
}

export function isCurrentPath(pathname: string, href: string): boolean {
  const normalize = (value: string) => value.replace(/\/+$/, "") || "/";
  return normalize(pathname) === normalize(href);
}

export function isSectionPath(pathname: string, href: string): boolean {
  if (isCurrentPath(pathname, href)) return true;
  const normalize = (value: string) => `${value.replace(/\/+$/, "")}/`;
  const section = normalize(href);
  return section !== "/" && normalize(pathname).startsWith(section);
}
