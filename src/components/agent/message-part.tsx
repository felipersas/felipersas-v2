"use client";

import { MessageResponse } from "@/components/ai-elements/message";
import { cn } from "@/lib/utils";
import type { EveMessagePart } from "eve/react";
import {
  Check,
  FileText,
  LoaderCircle,
  LogIn,
  Wrench,
} from "lucide-react";

interface MessagePartProps {
  activityLabel: (kind: "skill" | "tool", name: string) => string;
  doneLabel: string;
  part: EveMessagePart;
  workingLabel: string;
}

function formatSkillName(name: string): string {
  return name.replaceAll(/[-_]/g, " ");
}

export function MessagePart({
  activityLabel,
  doneLabel,
  part,
  workingLabel,
}: MessagePartProps) {
  if (part.type === "text") {
    return <MessageResponse>{part.text}</MessageResponse>;
  }

  if (part.type === "reasoning") return null;

  if (part.type === "dynamic-tool") {
    const kind =
      part.toolMetadata?.eve?.kind === "load-skill" ? "skill" : "tool";
    const name = formatSkillName(
      part.toolMetadata?.eve?.name || part.toolName
    );
    const isDone = [
      "output-available",
      "output-denied",
      "output-error",
    ].includes(part.state);

    return (
      <div
        className={cn(
          "flex w-full items-center gap-2 border-l border-line py-1 pl-3 font-mono text-[11px] text-muted-foreground",
          part.state === "output-error" && "text-destructive"
        )}
      >
        {isDone ? (
          <Check className="size-3.5 shrink-0" />
        ) : (
          <LoaderCircle className="size-3.5 shrink-0 animate-spin" />
        )}
        {kind === "skill" ? (
          <FileText className="size-3.5 shrink-0" />
        ) : (
          <Wrench className="size-3.5 shrink-0" />
        )}
        <span className="min-w-0 flex-1 truncate">
          {activityLabel(kind, name)}
        </span>
        <span className="shrink-0 text-[10px] uppercase tracking-wider">
          {isDone ? doneLabel : workingLabel}
        </span>
      </div>
    );
  }

  if (part.type === "authorization") {
    return (
      <div className="flex items-start gap-2 rounded-md border border-line p-3 text-xs">
        <LogIn className="mt-0.5 size-3.5 shrink-0" />
        <div>
          <p>{part.description}</p>
          {part.state === "required" && part.authorization?.url && (
            <a
              className="link-underline mt-2 inline-block font-medium"
              href={part.authorization.url}
              rel="noreferrer"
              target="_blank"
            >
              {part.displayName}
            </a>
          )}
        </div>
      </div>
    );
  }

  if (part.type === "file") {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <FileText className="size-3.5" />
        {part.filename ?? part.mediaType}
      </div>
    );
  }

  return null;
}
