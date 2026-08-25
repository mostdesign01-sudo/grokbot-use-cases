import type { AgentUiType } from "./agent-ui";
import type { Locale } from "./i18n";

export const agentUiTypeLabels: Record<AgentUiType, string> = {
  landing: "落地页",
  hero: "Hero",
  threejs: "Three.js",
  background: "背景场",
  button: "按钮",
  "text-animation": "文字动效",
  ui: "界面件",
  motion: "动效",
  section: "区块",
};

export const agentUiTypeLabelsEn: Record<AgentUiType, string> = {
  landing: "Landing",
  hero: "Hero",
  threejs: "Three.js",
  background: "Background",
  button: "Button",
  "text-animation": "Text animation",
  ui: "UI piece",
  motion: "Motion",
  section: "Section",
};

export const agentUiTypeIntros: Record<AgentUiType, string> = {
  landing: "整页可打开的 ThreeUI Community 落地页，适合交给 Agent 换主题后当起点。",
  hero: "首屏英雄区：粒子、地形或品牌符号，适合当产品封面。",
  threejs: "用 Three.js 跑起来的 3D 场景，可改光影与运动。",
  background: "铺满画布的场：星座、结构流、传送门一类背景。",
  button: "可点的 CTA / 着色器按钮，方便嵌进现有界面。",
  "text-animation": "标题、路径字与画廊字标，适合做章节开头。",
  ui: "徽章、表盘、品牌球一类界面零件。",
  motion: "偏运动与粒子的场面，强调节奏而不是表单。",
  section: "文章标题、画廊抬头等中段区块。",
};

export const agentUiTypeIntrosEn: Record<AgentUiType, string> = {
  landing: "Full-page ThreeUI Community landings — a starting point after an Agent rethemes them.",
  hero: "First-screen heroes: particles, terrain, or brand marks as a product cover.",
  threejs: "3D scenes that run on Three.js; lighting and motion can be retuned.",
  background: "Full-canvas fields: constellations, structure flow, portals, and similar backdrops.",
  button: "Clickable CTA / shader buttons you can drop into an existing UI.",
  "text-animation": "Titles, path type, and gallery wordmarks for chapter openings.",
  ui: "Badges, gauges, brand orbs, and other UI parts.",
  motion: "Motion- and particle-led scenes that care more about rhythm than forms.",
  section: "Mid-page blocks such as article titles and gallery headers.",
};

export function agentUiTypeLabel(value: string, locale: Locale = "zh"): string {
  const map = locale === "en" ? agentUiTypeLabelsEn : agentUiTypeLabels;
  return map[value as AgentUiType] ?? value;
}

export function agentUiTypeIntro(value: string, locale: Locale = "zh"): string {
  const map = locale === "en" ? agentUiTypeIntrosEn : agentUiTypeIntros;
  const fallback =
    locale === "en"
      ? "Free ThreeUI Community components listed under this type."
      : "该类型下收录的 ThreeUI Community 免费组件。";
  return map[value as AgentUiType] ?? fallback;
}
