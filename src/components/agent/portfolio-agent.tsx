"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { AgentArtwork } from "@/components/agent/agent-artwork";
import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
} from "@/components/ai-elements/message";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { MessagePart } from "@/components/agent/message-part";
import { AgentResponseActions } from "@/components/agent/response-actions";
import { SpeechInput } from "@/components/agent/speech-input";
import { Button } from "@/components/ui/button";
import { useTranslation, type Locale } from "@/hooks/use-translation";
import { parseAgentResponse } from "@/lib/agent-response-ui";
import {
  clearStoredEveChat,
  readStoredEveChat,
  writeStoredEveChat,
} from "@/lib/eve-chat-storage";
import { Client } from "eve/client";
import { useEveAgent } from "eve/react";
import {
  Check,
  Copy,
  CornerDownLeft,
  RotateCcw,
  Square,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type KeyboardEvent,
} from "react";

const ID = "agent";
const MAX_MESSAGE_LENGTH = 1_200;

function replaceName(template: string, name: string): string {
  return template.replace("{name}", name);
}

function PortfolioAgentSession({
  initialPrompt,
  locale,
}: {
  initialPrompt?: string;
  locale: Locale;
}) {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | undefined>(undefined);
  const [isCancelling, setIsCancelling] = useState(false);
  const [activeTurnId, setActiveTurnId] = useState<string | undefined>(
    undefined
  );
  const [saved] = useState(readStoredEveChat);
  const [session] = useState(() =>
    new Client({ host: "", preserveCompletedSessions: true }).session(
      saved.session
    )
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const initialPromptSentRef = useRef(false);

  const agent = useEveAgent({
    session,
    initialEvents: saved.events,
    onEvent(event) {
      if (event.type === "turn.started") {
        setActiveTurnId(event.data.turnId);
      }
      if (
        event.type === "turn.cancelled" ||
        event.type === "turn.completed" ||
        event.type === "turn.failed"
      ) {
        setActiveTurnId(undefined);
        setIsCancelling(false);
      }
    },
    onFinish(snapshot) {
      writeStoredEveChat({
        events: [...snapshot.events],
        session: snapshot.session,
      });
    },
  });

  const isBusy =
    agent.status === "submitted" || agent.status === "streaming";
  const suggestions = [
    t("agent.suggestions.career"),
    t("agent.suggestions.projects"),
    t("agent.suggestions.fit"),
  ];
  let lastCompletedAssistantId: string | undefined;
  for (const message of agent.data.messages) {
    if (
      message.role === "assistant" &&
      message.metadata?.status === "complete"
    ) {
      lastCompletedAssistantId = message.id;
    }
  }

  useEffect(() => {
    if (!initialPrompt || initialPromptSentRef.current) return;

    initialPromptSentRef.current = true;
    void agent
      .send({
        message: initialPrompt,
        clientContext: {
          locale,
          page: "Felipe Marques portfolio",
        },
      })
      .catch(() => {
        setInput(initialPrompt);
        initialPromptSentRef.current = false;
      });
  }, [agent, initialPrompt, locale]);

  async function sendMessage(messageOverride?: string): Promise<void> {
    const message = (messageOverride ?? input).trim();
    if (!message || isBusy) return;

    setInput("");
    try {
      await agent.send({
        message,
        clientContext: {
          locale,
          page: "Felipe Marques portfolio",
        },
      });
    } catch {
      setInput(message);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    void sendMessage();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>): void {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  }

  function handleSuggestion(suggestion: string): void {
    void sendMessage(suggestion);
  }

  function handleTranscript(text: string): void {
    setInput((current) => `${current}${current ? " " : ""}${text}`.slice(0, MAX_MESSAGE_LENGTH));
    textareaRef.current?.focus();
  }

  function handleReset(): void {
    agent.reset();
    clearStoredEveChat();
    setActiveTurnId(undefined);
    setIsCancelling(false);
    setCopiedId(undefined);
  }

  async function handleCancel(): Promise<void> {
    if (!activeTurnId || isCancelling) return;
    setIsCancelling(true);
    try {
      await session.cancel({ turnId: activeTurnId });
    } catch {
      setIsCancelling(false);
    }
  }

  async function copyResponse(id: string, text: string): Promise<void> {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(undefined), 1_500);
  }

  function activityLabel(kind: "skill" | "tool", name: string): string {
    return replaceName(
      t(kind === "skill" ? "agent.activity.skill" : "agent.activity.tool"),
      name
    );
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <header className="screen-line-bottom flex shrink-0 items-start justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5">
        <div className="min-w-0">
          <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">
            {t("agent.title")}
          </h1>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {t("agent.description")}
          </p>
        </div>
        <Button
          aria-label={t("agent.newChat")}
          className="size-8 shrink-0 rounded-none p-0 text-muted-foreground shadow-none"
          onClick={handleReset}
          title={t("agent.newChat")}
          type="button"
          variant="ghost"
        >
          <RotateCcw className="size-3.5" />
        </Button>
      </header>

      <div
        aria-hidden
        className="diagonal-stripes h-3 shrink-0 border-b border-line [--pattern-foreground:var(--line)]"
      />

      <Conversation className="min-h-0 flex-1">
        <ConversationContent
          aria-live="polite"
          className="mx-auto min-h-full w-full max-w-2xl gap-6 px-4 py-6 sm:px-6 sm:py-8"
        >
          {agent.data.messages.length === 0 ? (
            <div className="mx-auto my-auto w-full max-w-md py-8">
              <h2 className="text-center text-lg font-medium tracking-tight">
                {t("agent.emptyTitle")}
              </h2>
              <div className="mt-6 border-y border-line">
                {suggestions.map((suggestion, index) => (
                  <button
                    className="group relative flex w-full items-center justify-center border-b border-line px-8 py-3 text-center text-sm transition-colors last:border-b-0 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ring"
                    disabled={isBusy}
                    key={suggestion}
                    onClick={() => handleSuggestion(suggestion)}
                    type="button"
                  >
                    <span className="absolute left-1 top-1/2 -translate-y-1/2 font-mono text-[10px] tabular-nums text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground">
                      {suggestion}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            agent.data.messages.map((message) => {
              const text = message.parts
                .filter((part) => part.type === "text")
                .map((part) => part.text)
                .join("");
              const parsedResponse = parseAgentResponse(text, locale);
              const isCompletedAssistant =
                message.role === "assistant" &&
                message.metadata?.status === "complete";
              const firstTextPartIndex = message.parts.findIndex(
                (part) => part.type === "text"
              );

              return (
                <Message from={message.role} key={message.id}>
                  <MessageContent>
                    {message.parts.map((part, index) => (
                      <MessagePart
                        activityLabel={activityLabel}
                        doneLabel={t("agent.activity.done")}
                        key={`${message.id}-${part.type}-${index}`}
                        part={
                          isCompletedAssistant && part.type === "text"
                            ? {
                                ...part,
                                text:
                                  index === firstTextPartIndex
                                    ? parsedResponse.visibleText
                                    : "",
                              }
                            : part
                        }
                        workingLabel={t("agent.activity.working")}
                      />
                    ))}
                  </MessageContent>
                  {isCompletedAssistant && (
                    <AgentResponseActions
                      evidence={parsedResponse.evidence}
                      evidenceLabel={t("agent.evidence")}
                      followUpsLabel={t("agent.followUps")}
                      onSuggestion={handleSuggestion}
                      suggestions={
                        message.id === lastCompletedAssistantId && !isBusy
                          ? parsedResponse.suggestions
                          : []
                      }
                    />
                  )}
                  {isCompletedAssistant && parsedResponse.visibleText && (
                      <MessageActions>
                        <MessageAction
                          onClick={() =>
                            void copyResponse(
                              message.id,
                              parsedResponse.visibleText
                            )
                          }
                          tooltip={
                            copiedId === message.id
                              ? t("agent.copied")
                              : t("agent.copy")
                          }
                        >
                          {copiedId === message.id ? (
                            <Check className="size-3.5" />
                          ) : (
                            <Copy className="size-3.5" />
                          )}
                        </MessageAction>
                      </MessageActions>
                    )}
                </Message>
              );
            })
          )}

          {isBusy && (
            <div className="text-xs text-muted-foreground">
              <Shimmer>{t("agent.thinking")}</Shimmer>
            </div>
          )}
          {agent.error && (
            <div
              className="border-l border-destructive px-3 py-1 text-xs text-destructive"
              role="alert"
            >
              <p>{t("agent.error")}</p>
              <button
                className="mt-1 font-medium underline decoration-current/40 underline-offset-3 hover:decoration-current"
                onClick={handleReset}
                type="button"
              >
                {t("agent.newChat")}
              </button>
            </div>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <form
        className="shrink-0 border-t border-line bg-background/95 px-3 pb-2 pt-3 backdrop-blur-sm sm:px-6 sm:pb-3"
        onSubmit={handleSubmit}
      >
        <div className="mx-auto w-full max-w-2xl">
          <div className="border border-input bg-background transition-colors focus-within:border-foreground/40">
            <textarea
              aria-label={t("agent.placeholder")}
              className="max-h-32 min-h-14 w-full resize-none bg-transparent px-3 py-3 text-sm outline-none placeholder:text-muted-foreground"
              disabled={isBusy}
              maxLength={MAX_MESSAGE_LENGTH}
              onChange={(event) => setInput(event.currentTarget.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("agent.placeholder")}
              ref={textareaRef}
              rows={1}
              value={input}
            />
            <div className="flex min-h-10 items-center justify-between gap-2 border-t border-line px-2 py-1">
              <SpeechInput
                disabled={isBusy}
                labels={{
                  denied: t("agent.speech.denied"),
                  loading: t("agent.speech.loading"),
                  microphone: t("agent.speech.microphone"),
                  recording: t("agent.speech.recording"),
                  transcribing: t("agent.speech.transcribing"),
                  unsupported: t("agent.speech.unsupported"),
                }}
                locale={locale}
                onTranscript={handleTranscript}
              />
              {isBusy ? (
                <Button
                  aria-label={t("agent.cancel")}
                  className="size-8 rounded-none"
                  disabled={!activeTurnId || isCancelling}
                  onClick={() => void handleCancel()}
                  size="icon"
                  title={t("agent.cancel")}
                  type="button"
                >
                  <Square className="size-3 fill-current" />
                </Button>
              ) : (
                <Button
                  aria-label={t("agent.send")}
                  className="size-8 rounded-none"
                  disabled={!input.trim()}
                  size="icon"
                  title={t("agent.send")}
                  type="submit"
                >
                  <CornerDownLeft className="size-4" />
                </Button>
              )}
            </div>
          </div>

          {isCancelling && (
            <span className="sr-only" aria-live="polite">
              {t("agent.cancelling")}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

export function PortfolioAgent({
  initialPrompt,
  locale,
}: {
  initialPrompt?: string;
  locale: Locale;
}) {
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false
  );

  return (
    <div className="relative flex h-full w-full flex-col">
      <AgentArtwork />
      <section
        className="relative z-1 mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col border-x border-line bg-background sm:pt-4"
        id={ID}
      >
        {mounted ? (
          <PortfolioAgentSession
            initialPrompt={initialPrompt}
            locale={locale}
          />
        ) : (
          <div
            className="min-h-0 flex-1 animate-pulse bg-muted/10"
            aria-hidden
          />
        )}
      </section>
    </div>
  );
}
