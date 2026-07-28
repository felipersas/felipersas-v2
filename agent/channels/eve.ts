import { none } from "eve/channels/auth";
import { eveChannel } from "eve/channels/eve";

// This agent is an intentionally public portfolio demo. The OpenRouter key stays
// inside the Eve service and session token limits cap each conversation. The UI
// does not support attachments, so reject them at the public channel too.
export default eveChannel({
  auth: [none()],
  uploadPolicy: "disabled",
});
