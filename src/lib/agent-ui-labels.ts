import type { AgentUiType } from "./agent-ui";

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

export function agentUiTypeLabel(value: string): string {
  return agentUiTypeLabels[value as AgentUiType] ?? value;
}

export function agentUiTypeIntro(value: string): string {
  return agentUiTypeIntros[value as AgentUiType] ?? "该类型下收录的 ThreeUI Community 免费组件。";
}
