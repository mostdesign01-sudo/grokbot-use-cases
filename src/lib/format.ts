const TIMEZONE = "Asia/Shanghai";

export function formatShanghaiDateTime(iso: string): string {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));
}

export function formatShanghaiDate(iso: string): string {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

export function formatPublishedDate(isoDate: string): string {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(`${isoDate}T00:00:00+08:00`));
}
