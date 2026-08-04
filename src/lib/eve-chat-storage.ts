import type {
  HandleMessageStreamEvent,
  SessionState,
} from "eve/client";

export const EVE_CHAT_STORAGE_KEY = "portfolio-eve-chat-v4";
const EVE_CHAT_STORAGE_VERSION = 4;
const MAX_STORED_CHAT_SIZE = 1_000_000;

// A returning visitor should land on the empty state with suggestions, not on a
// wall of text from a conversation they no longer remember having.
export const EVE_CHAT_MAX_AGE_MS = 24 * 60 * 60 * 1_000;

export interface StoredEveChat {
  events: HandleMessageStreamEvent[];
  session?: SessionState;
}

export const EMPTY_EVE_CHAT: StoredEveChat = { events: [] };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isSessionState(value: unknown): value is SessionState {
  if (!isRecord(value)) return false;

  return (
    typeof value.streamIndex === "number" &&
    Number.isInteger(value.streamIndex) &&
    value.streamIndex >= 0 &&
    (value.sessionId === undefined || typeof value.sessionId === "string") &&
    (value.continuationToken === undefined ||
      typeof value.continuationToken === "string")
  );
}

function isStreamEvent(value: unknown): value is HandleMessageStreamEvent {
  return isRecord(value) && typeof value.type === "string";
}

export function parseStoredEveChat(
  value: string | null,
  now: number = Date.now()
): StoredEveChat {
  if (!value || value.length > MAX_STORED_CHAT_SIZE) return EMPTY_EVE_CHAT;

  try {
    const parsed: unknown = JSON.parse(value);
    if (
      !isRecord(parsed) ||
      parsed.version !== EVE_CHAT_STORAGE_VERSION ||
      !Array.isArray(parsed.events)
    ) {
      return EMPTY_EVE_CHAT;
    }

    // Chats written before savedAt existed have no known age, so drop them
    // rather than keeping them forever.
    if (
      typeof parsed.savedAt !== "number" ||
      now - parsed.savedAt > EVE_CHAT_MAX_AGE_MS
    ) {
      return EMPTY_EVE_CHAT;
    }

    if (!parsed.events.every(isStreamEvent)) return EMPTY_EVE_CHAT;
    if (parsed.session !== undefined && !isSessionState(parsed.session)) {
      return EMPTY_EVE_CHAT;
    }

    return {
      events: parsed.events,
      session: parsed.session,
    };
  } catch {
    return EMPTY_EVE_CHAT;
  }
}

export function serializeEveChat(
  value: StoredEveChat,
  now: number = Date.now()
): string {
  return JSON.stringify({
    version: EVE_CHAT_STORAGE_VERSION,
    savedAt: now,
    ...value,
  });
}

export function readStoredEveChat(): StoredEveChat {
  if (typeof window === "undefined") return EMPTY_EVE_CHAT;
  return parseStoredEveChat(window.localStorage.getItem(EVE_CHAT_STORAGE_KEY));
}

export function writeStoredEveChat(value: StoredEveChat): void {
  if (typeof window === "undefined") return;

  const serialized = serializeEveChat(value);
  if (serialized.length <= MAX_STORED_CHAT_SIZE) {
    window.localStorage.setItem(EVE_CHAT_STORAGE_KEY, serialized);
  }
}

export function clearStoredEveChat(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(EVE_CHAT_STORAGE_KEY);
  }
}
