export interface CardLineSource {
  hook?: string;
  hookEn?: string;
  summary: string;
  summaryEn?: string;
}

const PAREN_RE = /（[^）]*）|\([^)]*\)/g;
const NOISE_TEST =
  /HTTP\s*\d{3}|gh\s*api|Algolia|\d+\s*pts|≈?\d[\d,]*\s*★|撰写时|at time of writing|item\s+\d+|\d{4}-\d{2}-\d{2}|Playwright/i;

const INLINE_NOISE: RegExp[] = [
  /HTTP\s*\d{3}/gi,
  /gh\s*api[^。.!?，,\n]{0,48}/gi,
  /Algolia[^。.!?，,\n]{0,48}/gi,
  /≈?\d[\d,]*\s*★/g,
  /\d+\s*pts\b/gi,
  /（撰写时）|\(at time of writing\)/gi,
  /item\s+\d+/gi,
  /\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2})?(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})?)?/g,
  /Playwright[^。.!?]{0,80}?WebP/gi,
];

export function splitSentences(text: string): string[] {
  const t = text.replace(/\s+/g, " ").trim();
  if (!t) return [];
  return t
    .split(/(?<=[。！？])\s*|(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function firstSentence(text: string): string {
  return splitSentences(text)[0] ?? "";
}

function tidy(text: string): string {
  return text
    .replace(/[（(]\s*[）)]/g, "")
    .replace(/(\S)(https?:\/\/)/g, "$1 $2")
    .replace(/\s+/g, " ")
    .replace(/\s+([，。！？,.!?；;])/g, "$1")
    .replace(/[，,、；;：:]{2,}/g, "，")
    .replace(/[，,、；;]\s*([。！？.!?])/g, "$1")
    .replace(/^[，,、；;：:\-—\s]+/, "")
    .replace(/[，,、；;：:\s]+$/, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function stripAuditNoise(text: string): string {
  const withoutParens = text.replace(PAREN_RE, (group) => (NOISE_TEST.test(group) ? "" : group));
  const stripped = INLINE_NOISE.reduce((acc, pattern) => acc.replace(pattern, ""), withoutParens);
  return tidy(stripped);
}

export function cardLine(item: CardLineSource, locale: "zh" | "en" = "zh"): string {
  const hook = (locale === "en" ? item.hookEn : item.hook)?.trim();
  if (hook) return hook;
  const summary = (locale === "en" ? item.summaryEn || item.summary : item.summary) || "";
  const cleaned = stripAuditNoise(summary);
  return firstSentence(cleaned) || cleaned;
}
