import { describe, expect, it } from "vitest";
import {
  EMPTY_EVE_CHAT,
  parseStoredEveChat,
  serializeEveChat,
  type StoredEveChat,
} from "./eve-chat-storage";

describe("eve chat storage", () => {
  it("round-trips a valid event log and session cursor", () => {
    const chat = {
      events: [{ type: "session.waiting", data: {} }],
      session: {
        continuationToken: "eve:continuation",
        sessionId: "ses_123",
        streamIndex: 4,
      },
    } as unknown as StoredEveChat;

    expect(parseStoredEveChat(serializeEveChat(chat))).toEqual(chat);
    expect(JSON.parse(serializeEveChat(chat)).version).toBe(3);
  });

  it("rejects sessions saved before the grounding migration", () => {
    const legacyChat = JSON.stringify({
      version: 2,
      events: [{ type: "turn.failed", data: { turnId: "turn_1" } }],
      session: {
        sessionId: "ses_failed",
        streamIndex: 3,
      },
    });

    expect(parseStoredEveChat(legacyChat)).toEqual(EMPTY_EVE_CHAT);
  });

  it.each([
    null,
    "",
    "{broken",
    "{}",
    '{"events":"not-an-array"}',
    '{"events":[{"data":{}}]}',
    '{"events":[],"session":{"streamIndex":-1}}',
  ])("returns an empty chat for invalid input %#", (value) => {
    expect(parseStoredEveChat(value)).toEqual(EMPTY_EVE_CHAT);
  });

  it("rejects payloads larger than the browser storage budget", () => {
    const huge = JSON.stringify({
      events: [{ type: "message.appended", text: "x".repeat(1_000_000) }],
    });

    expect(parseStoredEveChat(huge)).toEqual(EMPTY_EVE_CHAT);
  });
});
