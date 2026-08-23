import type { HtmlType } from "./html";

export const htmlTypeLabels: Record<HtmlType, string> = {
  landing: "落地页",
  motion: "动效",
  component: "组件",
  tool: "工具页",
  portfolio: "作品集",
  docs: "文档站",
  interactive: "游戏/互动",
  other: "其他",
};

export const htmlTypeIntros: Record<HtmlType, string> = {
  landing: "可下载或在线预览的营销页、封面与整页模板。",
  motion: "CSS 动画库、纯 CSS 绘画与动效演示。",
  component: "可复用的 HTML/Web Component 与轻量框架。",
  tool: "在浏览器里生成 CSS/HTML 的小工具。",
  portfolio: "用 HTML/CSS 本身当作品展示的站点。",
  docs: "带可运行示例的文档站与示例索引。",
  interactive: "可直接玩或操作的教学游戏与 WebGL 演示。",
  other: "尚未归入上述类型的公开 HTML 页面。",
};

export function htmlTypeLabel(value: string): string {
  return htmlTypeLabels[value as HtmlType] ?? value;
}

export function htmlTypeIntro(value: string): string {
  return htmlTypeIntros[value as HtmlType] ?? "该类型下收录的公开 HTML 页面。";
}
