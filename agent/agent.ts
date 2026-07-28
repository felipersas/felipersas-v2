import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { defaultSettingsMiddleware, wrapLanguageModel } from "ai";
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

const groundedModel = wrapLanguageModel({
  model: openrouter(OPENROUTER_DEFAULT_MODEL, {
    reasoning: {
      effort: "minimal",
      exclude: true,
    },
    provider: {
      data_collection: "deny",
      require_parameters: true,
    },
    usage: { include: true },
  }),
  middleware: defaultSettingsMiddleware({
    settings: {
      maxOutputTokens: 600,
    },
  }),
});

export default defineAgent({
  description:
    "Felipe Marques's bilingual portfolio guide for career, project, and contact questions.",
  model: groundedModel,
  modelContextWindowTokens: 200_000,
  limits: {
    maxInputTokensPerSession: 50_000,
    maxOutputTokensPerSession: 8_000,
  },
});
