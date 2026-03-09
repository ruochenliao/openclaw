import type { ModelDefinitionConfig } from "../config/types.js";

export const DASHSCOPE_BASE_URL = "https://dashscope.aliyuncs.com/compatible-mode/v1";

export const DASHSCOPE_DEFAULT_COST = {
  input: 0.0008,
  output: 0.002,
  cacheRead: 0,
  cacheWrite: 0,
};

export const DASHSCOPE_MODEL_CATALOG = [
  {
    id: "qwen-max-latest",
    name: "Qwen Max",
    reasoning: false,
    input: ["text", "image"] as const,
    contextWindow: 131072,
    maxTokens: 8192,
  },
  {
    id: "qwen-plus-latest",
    name: "Qwen Plus",
    reasoning: false,
    input: ["text", "image"] as const,
    contextWindow: 131072,
    maxTokens: 8192,
  },
  {
    id: "qwen-turbo-latest",
    name: "Qwen Turbo",
    reasoning: false,
    input: ["text"] as const,
    contextWindow: 131072,
    maxTokens: 8192,
  },
  {
    id: "qwen-vl-max-latest",
    name: "Qwen VL Max",
    reasoning: false,
    input: ["text", "image"] as const,
    contextWindow: 131072,
    maxTokens: 8192,
  },
  {
    id: "qwen3-235b-a22b",
    name: "Qwen3 235B A22B",
    reasoning: true,
    input: ["text"] as const,
    contextWindow: 131072,
    maxTokens: 16384,
  },
  {
    id: "qwen3-coder-plus-latest",
    name: "Qwen3 Coder Plus",
    reasoning: true,
    input: ["text"] as const,
    contextWindow: 131072,
    maxTokens: 16384,
  },
] as const;

export type DashScopeCatalogEntry = (typeof DASHSCOPE_MODEL_CATALOG)[number];

export function buildDashScopeModelDefinition(entry: DashScopeCatalogEntry): ModelDefinitionConfig {
  return {
    id: entry.id,
    name: entry.name,
    reasoning: entry.reasoning,
    input: [...entry.input],
    cost: { ...DASHSCOPE_DEFAULT_COST },
    contextWindow: entry.contextWindow,
    maxTokens: entry.maxTokens,
  };
}
