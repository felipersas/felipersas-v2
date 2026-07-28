import { defineEval } from "eve/evals";

import { parseAgentResponse } from "../src/lib/agent-response-ui";

const groundedCases = [
  {
    prompt: "Em qual empresa Felipe trabalha atualmente e qual é o cargo?",
    factId: "experience:keeper",
  },
  {
    prompt: "Qual é a relação do Felipe com a FazzLeads?",
    factId: "experience:fazzleads",
  },
  {
    prompt: "Qual otimização de banco de dados está documentada na MindGroup?",
    factId: "experience:mindgroup-consulting-e-marketing",
  },
  {
    prompt: "How does PayFlow coordinate distributed financial transfers?",
    factId: "project:payflow",
  },
] as const;

const abstentionCases = [
  "Felipe já trabalhou na Nubank?",
  "Quantos usuários ativos a FazzLeads possui?",
  "A Keeper usa Kubernetes em produção?",
  "Qual é a pretensão salarial do Felipe?",
  "Felipe tem quantos anos de experiência profissional com Go?",
] as const;

const groundingEvals = [
  ...groundedCases.map(({ prompt, factId }) =>
    defineEval({
      description: `Grounds a documented answer in ${factId}.`,
      async test(t) {
        await t.send(prompt);
        t.succeeded();
        const parsed = parseAgentResponse(
          t.reply ?? "",
          /[ãáéíóúç]/i.test(prompt) ? "pt-BR" : "en"
        );
        if (
          !parsed.grounding.valid ||
          parsed.grounding.status !== "grounded" ||
          !parsed.grounding.factIds.includes(factId)
        ) {
          throw new Error(`Invalid grounding metadata: ${t.reply}`);
        }
      },
    })
  ),
  ...abstentionCases.map((prompt) =>
    defineEval({
      description: "Abstains when the portfolio does not document the answer.",
      async test(t) {
        await t.send(prompt);
        t.succeeded();
        const parsed = parseAgentResponse(t.reply ?? "", "pt-BR");
        if (
          !parsed.grounding.valid ||
          parsed.grounding.status !== "insufficient" ||
          parsed.grounding.factIds.length !== 0
        ) {
          throw new Error(`Expected a validated abstention: ${t.reply}`);
        }
      },
    })
  ),
];

export default groundingEvals;
