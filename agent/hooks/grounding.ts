import { defineHook } from "eve/hooks";

import { parseAgentResponse } from "../../src/lib/agent-response-ui";

export default defineHook({
  events: {
    "message.completed"(event, ctx) {
      if (!event.data.message) return;

      const parsed = parseAgentResponse(event.data.message, "en");
      console.info("[portfolio-grounding]", {
        factCount: parsed.grounding.factIds.length,
        finishReason: event.data.finishReason,
        reason: parsed.grounding.reason,
        sessionId: ctx.session.id,
        status: parsed.grounding.status,
        valid: parsed.grounding.valid,
      });
    },
  },
});
