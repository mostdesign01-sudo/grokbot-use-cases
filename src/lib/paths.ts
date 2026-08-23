export function withBase(path = "/"): string {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const relative = path.replace(/^\//, "");
  return `${base}${relative}`;
}

export function isCurrentPath(pathname: string, href: string): boolean {
  const normalize = (value: string) => value.replace(/\/+$/, "") || "/";
  return normalize(pathname) === normalize(href);
}
