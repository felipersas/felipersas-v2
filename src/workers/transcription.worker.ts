/// <reference lib="webworker" />

import {
  env,
  pipeline,
  type AutomaticSpeechRecognitionPipeline,
} from "@huggingface/transformers";
import type {
  TranscriptionWorkerRequest,
  TranscriptionWorkerResponse,
} from "@/types/transcription";

const workerScope = self as unknown as DedicatedWorkerGlobalScope;
const MODEL_ID = "onnx-community/whisper-tiny";

env.allowLocalModels = false;

let transcriberPromise:
  | Promise<AutomaticSpeechRecognitionPipeline>
  | undefined;
let activeDevice: "wasm" | "webgpu" = "wasm";

function post(message: TranscriptionWorkerResponse): void {
  workerScope.postMessage(message);
}

function readProgress(value: unknown): number | undefined {
  if (
    typeof value === "object" &&
    value !== null &&
    "progress" in value &&
    typeof value.progress === "number"
  ) {
    return Math.max(0, Math.min(100, value.progress));
  }

  return undefined;
}

async function getTranscriber(): Promise<AutomaticSpeechRecognitionPipeline> {
  if (!transcriberPromise) {
    activeDevice =
      "gpu" in workerScope.navigator ? ("webgpu" as const) : ("wasm" as const);

    transcriberPromise = pipeline(
      "automatic-speech-recognition",
      MODEL_ID,
      {
        device: activeDevice,
        dtype:
          activeDevice === "webgpu"
            ? { encoder_model: "fp32", decoder_model_merged: "q4" }
            : "q8",
        progress_callback: (progress) => {
          post({ type: "loading", progress: readProgress(progress) });
        },
      }
    );
  }

  const transcriber = await transcriberPromise;
  post({ type: "ready", device: activeDevice });
  return transcriber;
}

workerScope.addEventListener(
  "message",
  async (event: MessageEvent<TranscriptionWorkerRequest>) => {
    if (event.data.type !== "transcribe") return;

    try {
      const transcriber = await getTranscriber();
      post({ type: "transcribing" });

      const result = await transcriber(event.data.audio, {
        language: event.data.language,
        task: "transcribe",
      });
      const value = Array.isArray(result) ? result[0] : result;
      const text =
        typeof value === "object" &&
        value !== null &&
        "text" in value &&
        typeof value.text === "string"
          ? value.text.trim()
          : "";

      post({ type: "complete", text });
    } catch (error) {
      transcriberPromise = undefined;
      post({
        type: "error",
        message:
          error instanceof Error ? error.message : "Transcription failed.",
      });
    }
  }
);
