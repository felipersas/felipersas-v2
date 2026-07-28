import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { defineAgent } from "eve";

import {
  OPENROUTER_APP_NAME,
  OPENROUTER_APP_URL,
  OPENROUTER_DEFAULT_MODEL,
} from "./openrouter-config";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
  appName: OPENROUTER_APP_NAME,
  appUrl: OPENROUTER_APP_URL,
  compatibility: "strict",
});

const modelId =
  process.env.OPENROUTER_MODEL?.trim() || OPENROUTER_DEFAULT_MODEL;

export default defineAgent({
  description:
    "Felipe Marques's bilingual portfolio guide for career, project, and contact questions.",
  model: openrouter(modelId, {
    provider: {
      data_collection: "deny",
      require_parameters: true,
    },
    usage: { include: true },
  }),
  // Sessions stay below the context windows used by the Auto Router's
  // tool-capable model pool.
  modelContextWindowTokens: 1_000_000,
  limits: {
    maxInputTokensPerSession: 50_000,
    maxOutputTokensPerSession: 8_000,
  },
});
