const TIMEZONE = "Asia/Shanghai";

function toDate(input: string | Date): Date {
  if (input instanceof Date) return input;
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    return new Date(`${input}T12:00:00+08:00`);
  }
  return new Date(input);
}

function shanghaiParts(input: string | Date) {
  const parts = new Intl.DateTimeFormat("zh-CN", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(toDate(input));

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const year = get("year");
  const month = get("month").padStart(2, "0");
  const day = get("day").padStart(2, "0");

  return {
    key: `${year}-${month}-${day}`,
    year,
    month: Number(get("month")),
    day: Number(get("day")),
    weekday: get("weekday"),
    hour: get("hour").padStart(2, "0"),
    minute: get("minute").padStart(2, "0"),
  };
}

function shiftCivilDateKey(key: string, days: number): string {
  const [year, month, day] = key.split("-").map(Number);
  const shifted = new Date(Date.UTC(year, month - 1, day + days));
  return [
    shifted.getUTCFullYear(),
    String(shifted.getUTCMonth() + 1).padStart(2, "0"),
    String(shifted.getUTCDate()).padStart(2, "0"),
  ].join("-");
}

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

export function shanghaiDateKey(input: string | Date): string {
  return shanghaiParts(input).key;
}

export function formatShanghaiTime(iso: string): string {
  const parts = shanghaiParts(iso);
  return `${parts.hour}:${parts.minute}`;
}

export function formatShanghaiDayTitle(input: string | Date, count: number, now = new Date()): string {
  const parts = shanghaiParts(input);
  const todayKey = shanghaiDateKey(now);
  const yesterdayKey = shiftCivilDateKey(todayKey, -1);
  const countLabel = `${count} 条`;

  if (parts.key === todayKey) return `今日收录 · ${countLabel}`;
  if (parts.key === yesterdayKey) return `昨日 · ${parts.month}月${parts.day}日 · ${countLabel}`;
  return `${parts.month}月${parts.day}日 · ${parts.weekday} · ${countLabel}`;
}

export function hasShanghaiToday<T>(items: T[], getIso: (item: T) => string, now = new Date()): boolean {
  const todayKey = shanghaiDateKey(now);
  return items.some((item) => shanghaiDateKey(getIso(item)) === todayKey);
}

export function groupByShanghaiDay<T>(
  items: T[],
  getIso: (item: T) => string,
  now = new Date(),
): { key: string; title: string; items: T[] }[] {
  const groups = new Map<string, T[]>();

  for (const item of items) {
    const key = shanghaiDateKey(getIso(item));
    const list = groups.get(key) ?? [];
    list.push(item);
    groups.set(key, list);
  }

  return [...groups.entries()]
    .sort(([left], [right]) => right.localeCompare(left))
    .map(([key, grouped]) => ({
      key,
      title: formatShanghaiDayTitle(key, grouped.length, now),
      items: grouped,
    }));
}
