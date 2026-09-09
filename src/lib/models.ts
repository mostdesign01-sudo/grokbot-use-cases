import dataset from "../../data/models.json";
import { cases, type CaseItem } from "./cases";
import { isValidStars } from "./stars";

export type ModelSourceKind = "official" | "community" | "product";

export interface ModelSource {
  kind: ModelSourceKind;
  label: string;
  labelEn: string;
  url: string;
  by?: string;
  date?: string;
}

export interface ModelHighlight {
  text: string;
  textEn: string;
}

export interface ModelItem {
  id: string;
  slug: string;
  name: string;
  vendor: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  announcedAt: string;
  publishedAt: string;
  updatedAt: string;
  sources: ModelSource[];
  highlights?: ModelHighlight[];
  qualityNote: string;
  qualityNoteEn: string;
  relatedCaseIds: string[];
  /** Other cards on this board (e.g. a community demo → the model it ran on). Must resolve to existing model ids. */
  relatedModelIds?: string[];
  previewImage?: string;
  previewCredit?: string;
  previewCreditEn?: string;
  featured?: boolean;
  /** Curator quality stars 1–5 (editorial; not a benchmark score). Unset = no rating shown. */
  stars?: number;
}

export interface ModelsMeta {
  updatedAt: string;
  timezone: string;
  version: string;
  count: number;
}

export const modelsMeta = dataset.meta as ModelsMeta;
export const models = dataset.models as ModelItem[];

function assertModelsResolve(list: ModelItem[]): void {
  if (modelsMeta.count !== list.length) {
    throw new Error(`models.json meta.count ${modelsMeta.count} does not match items ${list.length}`);
  }
  if (list.length < 1) {
    throw new Error("Expected at least 1 model, found 0");
  }

  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();
  for (const model of list) {
    if (seenIds.has(model.id)) throw new Error(`duplicate model id: ${model.id}`);
    if (seenSlugs.has(model.slug)) throw new Error(`duplicate model slug: ${model.slug}`);
    seenIds.add(model.id);
    seenSlugs.add(model.slug);

    if (!model.sources.some((source) => source.kind === "official")) {
      throw new Error(`models.json ${model.id} needs at least one official source`);
    }
    if (model.stars !== undefined && !isValidStars(model.stars)) {
      throw new Error(`models.json ${model.id} stars must be an integer 1–5, got ${String(model.stars)}`);
    }
    for (const id of model.relatedCaseIds ?? []) {
      if (!cases.some((entry) => entry.id === id)) {
        throw new Error(`models.json relatedCaseId not found: ${model.id} → ${id}`);
      }
    }
    for (const id of model.relatedModelIds ?? []) {
      if (id === model.id) throw new Error(`models.json ${model.id} relatedModelIds points at itself`);
      if (!list.some((entry) => entry.id === id)) {
        throw new Error(`models.json relatedModelId not found: ${model.id} → ${id}`);
      }
    }
  }
}

assertModelsResolve(models);

/** Board order: featured first, then newest vendor announcement. */
export function listModels(list = models): ModelItem[] {
  return [...list].sort((a, b) => {
    const featured = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    if (featured !== 0) return featured;
    return b.announcedAt.localeCompare(a.announcedAt) || a.title.localeCompare(b.title, "zh");
  });
}

export function getModelBySlug(slug: string): ModelItem | undefined {
  return models.find((item) => item.slug === slug);
}

export function getOfficialSources(model: ModelItem): ModelSource[] {
  return model.sources.filter((source) => source.kind === "official");
}

export function getShowcaseSources(model: ModelItem): ModelSource[] {
  return model.sources.filter((source) => source.kind !== "official");
}

export function getRelatedModels(model: ModelItem, list = models): ModelItem[] {
  return (model.relatedModelIds ?? [])
    .map((id) => list.find((item) => item.id === id))
    .filter((item): item is ModelItem => Boolean(item));
}

export function getRelatedCasesForModel(model: ModelItem): CaseItem[] {
  return (model.relatedCaseIds ?? [])
    .map((id) => cases.find((item) => item.id === id))
    .filter((item): item is CaseItem => Boolean(item));
}
