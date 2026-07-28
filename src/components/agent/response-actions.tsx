"use client";

import type { AgentEvidenceLink } from "@/lib/agent-response-ui";
import { ArrowUpRight, CornerDownRight } from "lucide-react";

type AgentResponseActionsProps = {
  evidence: AgentEvidenceLink[];
  evidenceLabel: string;
  followUpsLabel: string;
  onSuggestion: (suggestion: string) => void;
  suggestions: string[];
};

export function AgentResponseActions({
  evidence,
  evidenceLabel,
  followUpsLabel,
  onSuggestion,
  suggestions,
}: AgentResponseActionsProps) {
  if (evidence.length === 0 && suggestions.length === 0) return null;

  return (
    <div className="w-full space-y-3">
      {evidence.length > 0 && (
        <nav
          aria-label={evidenceLabel}
          className="flex flex-wrap items-center gap-x-4 gap-y-2 border-l border-line py-0.5 pl-3"
        >
          {evidence.map((item) => (
            <a
              className="group/evidence inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              href={item.href}
              key={item.key}
              rel={item.external ? "noreferrer" : undefined}
              target={item.external ? "_blank" : undefined}
            >
              {item.label}
              <ArrowUpRight
                aria-hidden
                className="size-3 transition-transform group-hover/evidence:-translate-y-0.5 group-hover/evidence:translate-x-0.5"
              />
            </a>
          ))}
        </nav>
      )}

      {suggestions.length > 0 && (
        <div
          aria-label={followUpsLabel}
          className="border-y border-line"
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
      )}
    </div>
  );
}
