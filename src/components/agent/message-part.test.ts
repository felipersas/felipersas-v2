import type { EveMessagePart } from "eve/react";
import { describe, expect, it } from "vitest";

import { MessagePart } from "./message-part";

describe("MessagePart", () => {
  it("never exposes model reasoning in the public portfolio UI", () => {
    const rendered = MessagePart({
      activityLabel: () => "",
      doneLabel: "Done",
      part: {
        text: "Private model reasoning",
        type: "reasoning",
      } as EveMessagePart,
      workingLabel: "Working",
    });

    expect(rendered).toBeNull();
  });
});
