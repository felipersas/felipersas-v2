"use client";

import { CornerDownRight } from "lucide-react";

type AgentResponseActionsProps = {
  followUpsLabel: string;
  onSuggestion: (suggestion: string) => void;
  suggestions: string[];
};

export function AgentResponseActions({
  followUpsLabel,
  onSuggestion,
  suggestions,
}: AgentResponseActionsProps) {
  if (suggestions.length === 0) return null;

  return (
    <div
      aria-label={followUpsLabel}
      className="w-full border-y border-line"
      role="group"
    >
      {suggestions.map((suggestion) => (
        <button
          className="group/follow-up flex w-full items-start gap-2 border-b border-line px-1 py-2.5 text-left text-xs leading-relaxed text-muted-foreground transition-colors last:border-b-0 hover:bg-muted/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ring"
          key={suggestion}
          onClick={() => onSuggestion(suggestion)}
          type="button"
        >
          <CornerDownRight
            aria-hidden
            className="mt-0.5 size-3.5 shrink-0 transition-transform group-hover/follow-up:translate-x-0.5"
          />
          <span>{suggestion}</span>
        </button>
      ))}
    </div>
  );
}
