export type TranscriptionLanguage = "english" | "portuguese";

export type TranscriptionWorkerRequest = {
  type: "transcribe";
  audio: Float32Array;
  language: TranscriptionLanguage;
};

export type TranscriptionWorkerResponse =
  | { type: "loading"; progress?: number }
  | { type: "ready"; device: "wasm" | "webgpu" }
  | { type: "transcribing" }
  | { type: "complete"; text: string }
  | { type: "error"; message: string };
