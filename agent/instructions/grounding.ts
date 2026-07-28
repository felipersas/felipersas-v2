import { defineInstructions } from "eve/instructions";

import { getPortfolioKnowledgeMarkdown } from "../../src/lib/portfolio-grounding";

export default defineInstructions({
  markdown: getPortfolioKnowledgeMarkdown(),
});
