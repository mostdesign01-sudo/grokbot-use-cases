import dataset from "../../data/image-prompts.json";
import { models, type ModelItem } from "./models";
import { isValidStars } from "./stars";

export const DEFAULT_IMAGE_MODEL_TAG = "gpt-image-2.5";

export interface ImagePromptLink {
  label: string;
  labelEn: string;
  url: string;
  by?: string;
  date?: string;
}

export interface ImagePromptHighlight {
  text: string;
  textEn: string;
}

export interface ImagePromptItem {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  /** Model this gallery / case is about; defaults to `gpt-image-2.5`. */
  modelTag?: string;
  sourceUrl: string;
  sourceLabel?: string;
  sourceLabelEn?: string;
  sourceBy?: string;
  secondaryUrls?: ImagePromptLink[];
  previewImage?: string;
  previewCredit?: string;
  previewCreditEn?: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  highlights?: ImagePromptHighlight[];
  qualityNote: string;
  qualityNoteEn: string;
  /** Optional pointers into data/models.json (e.g. a future GPT-Image-2.5 model card). */
  relatedModelIds?: string[];
  featured?: boolean;
  /** Curator quality stars 1–5 (editorial; not a benchmark score). Unset = no rating shown. */
  stars?: number;
}

export interface ImagePromptsMeta {
  updatedAt: string;
  timezone: string;
  version: string;
  count: number;
}

export const imagePromptsMeta = dataset.meta as ImagePromptsMeta;
export const imagePrompts = dataset.items as ImagePromptItem[];

function assertImagePromptsResolve(list: ImagePromptItem[]): void {
  if (imagePromptsMeta.count !== list.length) {
    throw new Error(`image-prompts.json meta.count ${imagePromptsMeta.count} does not match items ${list.length}`);
  }
  if (list.length < 1) {
    throw new Error("Expected at least 1 image prompt item, found 0");
  }

  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();
  for (const item of list) {
    if (seenIds.has(item.id)) throw new Error(`duplicate image prompt id: ${item.id}`);
    if (seenSlugs.has(item.slug)) throw new Error(`duplicate image prompt slug: ${item.slug}`);
    seenIds.add(item.id);
    seenSlugs.add(item.slug);

    if (!/^https?:\/\//.test(item.sourceUrl)) {
      throw new Error(`image-prompts.json ${item.id} sourceUrl must be an absolute public URL`);
    }
    if (item.stars !== undefined && !isValidStars(item.stars)) {
      throw new Error(`image-prompts.json ${item.id} stars must be an integer 1–5, got ${String(item.stars)}`);
    }
    for (const id of item.relatedModelIds ?? []) {
      if (!models.some((entry) => entry.id === id)) {
        throw new Error(`image-prompts.json relatedModelId not found: ${item.id} → ${id}`);
      }
    }
  }
}

assertImagePromptsResolve(imagePrompts);

/** Board order: featured first, then newest listing date. */
export function listImagePrompts(list = imagePrompts): ImagePromptItem[] {
  return [...list].sort((a, b) => {
    const featured = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    if (featured !== 0) return featured;
    return (
      b.publishedAt.localeCompare(a.publishedAt) ||
      b.updatedAt.localeCompare(a.updatedAt) ||
      a.title.localeCompare(b.title, "zh")
    );
  });
}

export function getImagePromptBySlug(slug: string): ImagePromptItem | undefined {
  return imagePrompts.find((item) => item.slug === slug);
}

export function imageModelTag(item: ImagePromptItem): string {
  return item.modelTag?.trim() || DEFAULT_IMAGE_MODEL_TAG;
}

export function getRelatedModelsForImagePrompt(item: ImagePromptItem): ModelItem[] {
  return (item.relatedModelIds ?? [])
    .map((id) => models.find((model) => model.id === id))
    .filter((model): model is ModelItem => Boolean(model));
}
