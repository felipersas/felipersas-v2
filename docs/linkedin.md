# LinkedIn

Textos prontos para colar. Padrão extraído do perfil do Augusto Galego:
frase de escala antes dos bullets, bullets no formato XYZ (resultado, número,
técnica), e um parágrafo de trade-off explicando a decisão técnica e o preço dela.

Sem travessão, sem cauda em gerúndio, sem adjetivo promocional.

---

## Headline

```
Desenvolvedor Full-Stack @ Keeper · TypeScript | NestJS | Next.js | AI Agents
```

---

## Sobre

```
Sou desenvolvedor full-stack. Atuo em backend, frontend, mobile e na infraestrutura que roda tudo isso.

Na MindGroup arquitetei e entreguei 3 sistemas em produção que rodam operações jurídicas e financeiras de empresas clientes. Reduzi uma consulta crítica de 5s para 240ms, uma melhoria de 95%, com views MySQL, índices compostos e paginação por cursor. Automatizei importação em massa, processamento bancário e emissão de notas fiscais no sistema jurídico, o que cortou mais de 40 horas de trabalho manual por mês. Também construí os frontends em Next.js, que ficaram em 250ms de carregamento médio, e mantive 2 apps React Native/Expo com Stripe e eRede/Pix.

Cofundei a FazzLeads, uma plataforma para imobiliárias e corretores autônomos. Hoje são 6 clientes pagantes, com centenas de leads por mês passando pelo sistema. O agente de IA atende e qualifica esses leads pelo WhatsApp e recomenda imóveis, numa operação onde antes o lead ficava sem resposta. A plataforma também reúne catálogo de imóveis, acompanhamento de campanhas, hospedagem de sites e construtor de automações, coisas que o cliente pagava como SaaS separados.

Hoje estou na Keeper, uma fintech de arrecadação e gestão financeira para formaturas.

Fora do trabalho construo sistemas distribuídos pra chegar nos problemas que um CRUD nunca coloca na sua frente: microsserviços orientados a eventos, Saga, Inbox/Outbox, idempotência e observabilidade. O crash game em tempo real que fiz tem mais de 330 testes entre unitários, integração e E2E.

Tecnologias que uso profissionalmente: TypeScript, NestJS, Next.js, React, React Native, Node.js, MySQL, PostgreSQL, Docker, AWS, RabbitMQ, Grafana, Prometheus.

Portfólio: https://felipersas-dev.vercel.app
GitHub: https://github.com/felipersas
Contato: felipemarques.computacao@gmail.com
```

### O que foi tirado do "Sobre" antigo, de propósito

- **"de 19 anos"**. O Augusto nunca menciona idade. Abrir com 19 faz o leitor
  reinterpretar tudo que vem depois como "bom pra idade dele" em vez de "bom".
  As métricas se defendem sozinhas.
- **"Atualmente na MindGroup"**. Desatualizado desde junho de 2026.
- **"Como freelancer"** para a FazzLeads. O currículo diz Cofundador. Freelancer
  vale bem menos.

---

## Experiência

### Keeper

`Desenvolvedor Full Stack Pleno · Tempo integral · Jun 2026 - o momento · São Paulo, SP · Híbrido`

```
Fintech de arrecadação e gestão financeira para formaturas, onde o dinheiro arrecadado por uma turma precisa fechar do primeiro pagamento até o último repasse.

Atuo full-stack na plataforma.
```

> **Pendente.** Faltam os bullets. Perguntas a responder antes de escrever:
> qual foi a primeira coisa entregue lá; se mexeu em fluxo de pagamento,
> conciliação ou split; se consertou ou otimizou algo que já existia;
> qual a stack real do dia a dia.

### Mind Group

`Desenvolvedor Full-Stack · Tempo integral`

```
Estúdio de produtos digitais. Trabalhei full-stack nas plataformas que rodam as operações jurídicas e financeiras de empresas clientes.

- Arquitetei e entreguei 3 sistemas em produção como monolitos modulares com NestJS, DDD, Next.js e Docker, cada um com seu pipeline de CI/CD.
- Reduzi uma consulta crítica de 5s para 240ms, uma melhoria de 95%, usando views MySQL, índices compostos e paginação por cursor.
- Automatizei importação em massa, processamento bancário e emissão de notas fiscais no sistema jurídico, o que cortou mais de 40 horas de trabalho manual por mês.
- Projetei APIs REST com autenticação JWT e permissões por papel granulares o bastante para o cliente gerenciar acesso por módulo sem precisar de um dev.
- Construí os frontends em Next.js com Server Components, code splitting, memoização e TanStack Query. O carregamento médio ficou em 250ms.
- Desenvolvi e mantive 2 apps React Native/Expo com integração de pagamentos Stripe e eRede/Pix.

Os três sistemas rodaram como monolitos modulares em vez de serviços separados: um único deploy para operar, mas com limites de domínio explícitos para que um módulo pudesse ser extraído depois, se algum dia compensasse o custo.

Stack: TypeScript, NestJS, Next.js, React Native, Expo, MySQL, Docker, Stripe
```

> **Confirmar** se o parágrafo de trade-off bate com o motivo real da escolha
> de monolito modular. Foi inferido a partir da arquitetura.

### FazzLeads

`Cofundador e Engenheiro de Software · Autônomo · Jun 2024 - o momento · Remoto`

> **Não existe no LinkedIn hoje.** Dois anos como cofundador e o trabalho de IA
> mais interessante do currículo, e está só no PDF. Adicionar.

```
Empresa que cofundei. Vendemos uma plataforma para imobiliárias e corretores autônomos que operavam sem processo e sem rastreabilidade. Hoje são 6 clientes pagantes, com centenas de leads por mês passando pelo sistema.

- Coloquei em produção um agente de IA que atende e qualifica leads pelo WhatsApp e recomenda imóveis. Antes dele, o lead que chegava ficava sem resposta.
- Reunimos na plataforma o que cada cliente pagava como SaaS separados: catálogo de imóveis, acompanhamento de campanhas, hospedagem de sites e construtor de automações.
- Construí o agente sobre Mastra AI e MCP, integrado ao GoHighLevel, com backend NestJS em DDD e CQRS. Os fluxos de IA ficam atrás de limites de domínio explícitos, então a lógica de prompt não vaza para as regras de negócio.
- Estruturei métricas, alertas e monitoramento de saúde com Grafana e Prometheus em todos os deploys de cliente.
- Entreguei landing pages feitas para conversão, com SEO, tuning de performance e entrega contínua.

Stack: TypeScript, NestJS, Next.js, Mastra AI, MCP, Docker, Grafana, Prometheus
```

---

## Inconsistência a resolver

As datas do Mind Group não batem entre as fontes:

| Fonte | O que diz |
| --- | --- |
| LinkedIn | Estágio jan a jun/2025, depois Desenvolvedor jun/2025 a jun/2026 |
| Currículo e portfólio | Uma posição só, "Desenvolvedor Full-Stack", fev/2025 a mai/2026 |

O LinkedIn parece o correto, porque bate com o post de promoção de estagiário
para júnior. Mas aí o portfólio infla: mostra 1a4m de "Desenvolvedor Full-Stack"
quando 6 meses disso foi estágio. Recrutador confere.

---

## Pendências

- [ ] Escrever os bullets da Keeper
- [ ] Confirmar o parágrafo de trade-off do Mind Group
- [ ] Alinhar as datas do Mind Group entre LinkedIn, currículo e portfólio
- [ ] Adicionar a FazzLeads ao LinkedIn
- [ ] Versões em inglês (existe `public/resume_en.pdf`)
