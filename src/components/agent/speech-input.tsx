"use client";

import { Button } from "@/components/ui/button";
import { decodeAudioForWhisper } from "@/lib/audio";
import type { Locale } from "@/hooks/use-translation";
import type {
  TranscriptionWorkerRequest,
  TranscriptionWorkerResponse,
} from "@/types/transcription";
import { LoaderCircle, Mic, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type SpeechState =
  | "error"
  | "idle"
  | "loading"
  | "recording"
  | "transcribing";

interface SpeechInputProps {
  disabled?: boolean;
  labels: {
    denied: string;
    loading: string;
    microphone: string;
    recording: string;
    transcribing: string;
    unsupported: string;
  };
  locale: Locale;
  onTranscript: (text: string) => void;
}

function chooseMimeType(): string | undefined {
  return [
    "audio/webm;codecs=opus",
    "audio/mp4",
    "audio/webm",
    "audio/ogg;codecs=opus",
  ].find((type) => MediaRecorder.isTypeSupported(type));
}

export function SpeechInput({
  disabled,
  labels,
  locale,
  onTranscript,
}: SpeechInputProps) {
  const [state, setState] = useState<SpeechState>("idle");
  const [progress, setProgress] = useState<number>();
  const [error, setError] = useState<string>();
  const [seconds, setSeconds] = useState(0);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    if (state !== "recording") return;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [state]);

  useEffect(
    () => () => {
      if (recorderRef.current?.state !== "inactive") {
        recorderRef.current?.stop();
      }
      streamRef.current?.getTracks().forEach((track) => track.stop());
      workerRef.current?.terminate();
    },
    []
  );

  function getWorker(): Worker {
    if (!workerRef.current) {
      workerRef.current = new Worker(
        new URL("../../workers/transcription.worker.ts", import.meta.url),
        { type: "module" }
      );
      workerRef.current.addEventListener(
        "message",
        (event: MessageEvent<TranscriptionWorkerResponse>) => {
          const message = event.data;
          if (message.type === "loading") {
            setState("loading");
            setProgress(message.progress);
          } else if (message.type === "transcribing") {
            setState("transcribing");
          } else if (message.type === "complete") {
            setState("idle");
            setProgress(undefined);
            if (message.text) onTranscript(message.text);
          } else if (message.type === "error") {
            setState("error");
            setError(message.message);
          }
        }
      );
    }

    return workerRef.current;
  }

  async function transcribe(blob: Blob): Promise<void> {
    try {
      setState("loading");
      const audio = await decodeAudioForWhisper(blob);
      if (audio.length === 0) throw new Error("No audio was captured.");

      const request: TranscriptionWorkerRequest = {
        type: "transcribe",
        audio,
        language: locale === "pt-BR" ? "portuguese" : "english",
      };
      getWorker().postMessage(request, [audio.buffer]);
    } catch (transcriptionError) {
      setState("error");
      setError(
        transcriptionError instanceof Error
          ? transcriptionError.message
          : labels.unsupported
      );
    }
  }

  async function startRecording(): Promise<void> {
    setError(undefined);
    setSeconds(0);
    setProgress(undefined);

    if (
      !navigator.mediaDevices?.getUserMedia ||
      typeof MediaRecorder === "undefined"
    ) {
      setState("error");
      setError(labels.unsupported);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = chooseMimeType();
      const recorder = new MediaRecorder(
        stream,
        mimeType ? { mimeType } : undefined
      );

      chunksRef.current = [];
      streamRef.current = stream;
      recorderRef.current = recorder;
      recorder.addEventListener("dataavailable", (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      });
      recorder.addEventListener(
        "stop",
        () => {
          const blob = new Blob(chunksRef.current, {
            type: recorder.mimeType,
          });
          stream.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
          void transcribe(blob);
        },
        { once: true }
      );
      recorder.start();
      setState("recording");
    } catch (recordingError) {
      setState("error");
      setError(
        recordingError instanceof DOMException &&
          recordingError.name === "NotAllowedError"
          ? labels.denied
          : labels.unsupported
      );
    }
  }

  function handleClick(): void {
    if (state === "recording") {
      recorderRef.current?.stop();
      return;
    }

    if (state === "idle" || state === "error") {
      void startRecording();
    }
  }

  const isProcessing = state === "loading" || state === "transcribing";
  const label =
    state === "recording"
      ? `${labels.recording} ${seconds}s`
      : state === "loading"
        ? `${labels.loading}${progress === undefined ? "" : ` ${Math.round(progress)}%`}`
        : state === "transcribing"
          ? labels.transcribing
          : labels.microphone;

  return (
    <div className="flex min-w-0 items-center gap-2">
      <Button
        aria-label={label}
        className="size-8 shrink-0 rounded-md"
        disabled={disabled || isProcessing}
        onClick={handleClick}
        size="icon"
        title={label}
        type="button"
        variant={state === "recording" ? "secondary" : "ghost"}
      >
        {state === "recording" ? (
          <Square className="size-3 fill-current" />
        ) : isProcessing ? (
          <LoaderCircle className="size-4 animate-spin" />
        ) : (
          <Mic className="size-4" />
        )}
      </Button>
      {(state !== "idle" || error) && (
        <span
          aria-live="polite"
          className="truncate text-[11px] text-muted-foreground"
          title={error ?? label}
        >
          {error ?? label}
        </span>
      )}
    </div>
  );
}
