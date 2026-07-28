import { defineEval } from "eve/evals";
import { includes } from "eve/evals/expect";

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
        t.check(t.reply, includes('"status":"grounded"'));
        t.check(t.reply, includes(`"${factId}"`));
      },
    })
  ),
  ...abstentionCases.map((prompt) =>
    defineEval({
      description: "Abstains when the portfolio does not document the answer.",
      async test(t) {
        await t.send(prompt);
        t.succeeded();
        t.check(t.reply, includes('"status":"insufficient"'));
      },
    })
  ),
];

export default groundingEvals;
