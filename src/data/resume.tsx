import { Icons } from "@/components/icons";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Golang } from "@/components/ui/svgs/golang";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Rust } from "@/components/ui/svgs/rust";
import { NestJS } from "@/components/ui/svgs/nestjs";
import { Prisma } from "@/components/ui/svgs/prisma";
import { Mysql } from "@/components/ui/svgs/mysql";
import { Aws } from "@/components/ui/svgs/aws";
import { TailwindCSS } from "@/components/ui/svgs/tailwindcss";
import { Grafana } from "@/components/ui/svgs/grafana";
import { Prometheus } from "@/components/ui/svgs/prometheus";
import { RabbitMQ } from "@/components/ui/svgs/rabbitmq";
import { Linux } from "@/components/ui/svgs/linux";
import { Java } from "@/components/ui/svgs/java";
import { Flask } from "@/components/ui/svgs/flask";
import { SQLAlchemy } from "@/components/ui/svgs/sqlalchemy";
import type { Locale } from "@/hooks/use-translation";

export type LocalizedText = { en: string; "pt-BR": string };

export function localize(text: LocalizedText | string, locale: Locale): string {
  if (typeof text === "string") return text;
  return text[locale] || text.en;
}

export const DATA = {
  name: "Felipe Marques",
  initials: "FM",
  url: "https://felipersas-dev.vercel.app",
  location: "Sorocaba, SP, Brazil",
  locationLink: "https://www.google.com/maps/place/Sorocaba",
  description: {
    en: "Software Engineer",
    "pt-BR": "Engenheiro de Software",
  } as LocalizedText,
  whoami: [
    { key: "role", value: { en: "mid-level full-stack dev", "pt-BR": "desenvolvedor full-stack pleno" } as LocalizedText },
    { key: "location", value: "sorocaba, BR" },
    { key: "stack", value: "typescript · next.js · nestjs · react · go · rust" },
    { key: "interests", value: { en: "games, anime, coffee", "pt-BR": "games, anime, café" } as LocalizedText },
  ] as { key: string; value: string | LocalizedText }[],
  avatarUrl: "/me.png",
  about: {
    en: "I'm a full-stack developer. I work across backend, frontend, mobile and the infrastructure that runs it.\n\nAt [MindGroup](https://mindconsulting.com.br/) I architected and shipped 3 production systems that run legal and financial operations for client businesses. I took a critical query from 5s to 240ms and cut 40+ hours of manual work every month. I co-founded [FazzLeads](https://fazzleads.com.br/), a platform for real estate agencies that now serves 6 paying clients and hundreds of leads a month. I'm at [Keeper](https://www.keeper.com.br/) today, a fintech for graduation fundraising.\n\nOutside of work I build distributed systems and developer tools, including [DemoCraft](https://democraft-lp.vercel.app).",
    "pt-BR": "Sou desenvolvedor full-stack. Atuo em backend, frontend, mobile e na infraestrutura que roda tudo isso.\n\nNa [MindGroup](https://mindconsulting.com.br/) arquitetei e entreguei 3 sistemas em produção que rodam operações jurídicas e financeiras de empresas clientes. Reduzi uma consulta crítica de 5s para 240ms e cortei mais de 40 horas de trabalho manual por mês. Cofundei a [FazzLeads](https://fazzleads.com.br/), uma plataforma para imobiliárias que hoje atende 6 clientes pagantes e centenas de leads por mês. Hoje estou na [Keeper](https://www.keeper.com.br/), uma fintech de arrecadação e gestão financeira para formaturas.\n\nFora do trabalho construo sistemas distribuídos e developer tools, entre eles o [DemoCraft](https://democraft-lp.vercel.app).",
  } as LocalizedText,
  skills: [
    { name: "React", icon: ReactLight, href: "https://react.dev", categories: ["Frontend"] },
    { name: "Next.js", icon: NextjsIconDark, href: "https://nextjs.org", categories: ["Frontend"] },
    { name: "TypeScript", icon: Typescript, href: "https://www.typescriptlang.org", categories: ["Language"] },
    { name: "Node.js", icon: Nodejs, href: "https://nodejs.org", categories: ["Backend"] },
    { name: "NestJS", icon: NestJS, href: "https://nestjs.com", categories: ["Backend"] },
    { name: "Flask", icon: Flask, href: "https://flask.palletsprojects.com", categories: ["Backend"] },
    { name: "Python", icon: Python, href: "https://www.python.org", categories: ["Language"] },
    { name: "Go", icon: Golang, href: "https://go.dev", categories: ["Language"] },
    { name: "Rust", icon: Rust, href: "https://www.rust-lang.org", categories: ["Language"] },
    { name: "Java", icon: Java, href: "https://www.java.com", categories: ["Language"] },
    { name: "Postgres", icon: Postgresql, href: "https://www.postgresql.org", categories: ["Database & ORM"] },
    { name: "MySQL", icon: Mysql, href: "https://www.mysql.com", categories: ["Database & ORM"] },
    { name: "Prisma", icon: Prisma, href: "https://www.prisma.io", categories: ["Database & ORM"] },
    { name: "SQLAlchemy", icon: SQLAlchemy, href: "https://www.sqlalchemy.org", categories: ["Database & ORM"] },
    { name: "Docker", icon: Docker, href: "https://www.docker.com", categories: ["DevOps"] },
    { name: "AWS", icon: Aws, href: "https://aws.amazon.com", categories: ["DevOps"] },
    { name: "TailwindCSS", icon: TailwindCSS, href: "https://tailwindcss.com", categories: ["Frontend"] },
    { name: "Grafana", icon: Grafana, href: "https://grafana.com", categories: ["DevOps"] },
    { name: "Prometheus", icon: Prometheus, href: "https://prometheus.io", categories: ["DevOps"] },
    { name: "RabbitMQ", icon: RabbitMQ, href: "https://rabbitmq.com", categories: ["DevOps"] },
    { name: "Linux", icon: Linux, href: "https://www.linux.org", categories: ["DevOps"] },
  ],
  contact: {
    email: "felipemarques.computacao@gmail.com",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/felipersas",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/felipe-marques-a748b9299",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:felipemarques.computacao@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Keeper",
      href: "https://www.keeper.com.br/",
      location: "São Paulo, SP, Brazil",
      locationType: "Hybrid",
      logoUrl: "/icons/keeper-formaturas.png",
      isCurrentEmployer: true,
      positions: [
        {
          title: { en: "Mid-Level Full-Stack Developer", "pt-BR": "Desenvolvedor Full-Stack Pleno" } as LocalizedText,
          start: "Jun 2026",
          end: undefined,
          employmentType: "Full-time",
          description: {
            en: "Fintech for graduation fundraising and financial management, where money collected from a class has to stay reconciled from the first payment to the last payout.\n\nI work across the stack on the platform.",
            "pt-BR": "Fintech de arrecadação e gestão financeira para formaturas, onde o dinheiro arrecadado por uma turma precisa fechar do primeiro pagamento até o último repasse.\n\nAtuo full-stack na plataforma.",
          } as LocalizedText,
          skills: [],
          isExpanded: true,
        },
      ],
    },
    {
      company: "MindGroup Consulting e Marketing",
      href: "https://mindconsulting.com.br/",
      location: "Sorocaba, SP, Brazil",
      locationType: "Hybrid",
      logoUrl: "/icons/LOGOTIPO-Mind-Group-2.png",
      positions: [
        {
          title: { en: "Full-Stack Developer", "pt-BR": "Desenvolvedor Full-Stack" } as LocalizedText,
          start: "Feb 2025",
          end: "May 2026",
          employmentType: "Full-time",
          description: {
            en: "Digital product studio. I worked across the stack on the platforms that run the legal and financial operations of client businesses.\n\n- Architected and shipped 3 production systems as modular monoliths with NestJS, DDD, Next.js and Docker, each with its own CI/CD pipeline.\n- Reduced a critical query from 5s to 240ms, a 95% improvement, using MySQL views, composite indexes and cursor-based pagination.\n- Automated bulk data imports, bank transaction processing and invoice issuing in the legal system, which cut 40+ hours of manual work per month.\n- Designed REST APIs with JWT authentication and role-based permissions granular enough for clients to manage module access without asking an engineer.\n- Built the Next.js frontends with Server Components, code splitting, memoization and TanStack Query. Average page load came out at 250ms.\n- Developed and maintained 2 React Native/Expo apps with Stripe and eRede/Pix payment integrations.\n\nThe three systems ran as modular monoliths instead of separate services: one deploy to operate, but domain boundaries kept explicit so a module could be pulled out later if it ever justified the cost.",
            "pt-BR": "Estúdio de produtos digitais. Atuei full-stack nas plataformas que rodam as operações jurídicas e financeiras de empresas clientes.\n\n- Arquitetei e entreguei 3 sistemas em produção como monolitos modulares com NestJS, DDD, Next.js e Docker, cada um com seu pipeline de CI/CD.\n- Reduzi uma consulta crítica de 5s para 240ms, uma melhoria de 95%, usando views MySQL, índices compostos e paginação por cursor.\n- Automatizei importação em massa, processamento bancário e emissão de notas fiscais no sistema jurídico, o que cortou mais de 40 horas de trabalho manual por mês.\n- Projetei APIs REST com autenticação JWT e permissões por papel granulares o bastante para o cliente gerenciar acesso por módulo sem precisar de um dev.\n- Construí os frontends em Next.js com Server Components, code splitting, memoização e TanStack Query. O carregamento médio ficou em 250ms.\n- Desenvolvi e mantive 2 apps React Native/Expo com integração de pagamentos Stripe e eRede/Pix.\n\nOs três sistemas rodaram como monolitos modulares em vez de serviços separados: um único deploy para operar, mas com limites de domínio explícitos para que um módulo pudesse ser extraído depois, se algum dia compensasse o custo.",
          } as LocalizedText,
          skills: [
            "NestJS",
            "Next.js",
            "TypeScript",
            "React Native",
            "Expo",
            "MySQL",
            "Docker",
            "Stripe",
            "TanStack Query",
          ],
          isExpanded: true,
        },
      ],
    },
    {
      company: "FazzLeads",
      href: "https://fazzleads.com.br/",
      location: { en: "Remote", "pt-BR": "Remoto" } as LocalizedText,
      locationType: "Remote",
      logoUrl: "/icons/logo-fazzleads.png",
      isCurrentEmployer: true,
      positions: [
        {
          title: { en: "Co-Founder & Software Engineer", "pt-BR": "Cofundador e Engenheiro de Software" } as LocalizedText,
          start: "Jun 2024",
          end: undefined,
          employmentType: "Self-employed",
          description: {
            en: "Company I co-founded. We sell a platform to real estate agencies and independent brokers who were running without process or traceability. Six paying clients today, with hundreds of leads a month going through the system.\n\n- Put an AI agent into production that answers and qualifies leads over WhatsApp and recommends listings. Before it, a lead that came in went unanswered.\n- Pulled into the platform what each client used to pay for as separate SaaS tools: property catalog, campaign tracking, site hosting and an automation builder.\n- Built the agent on Mastra AI and MCP, integrated with GoHighLevel, over a NestJS backend with DDD and CQRS. AI workflows sit behind explicit domain boundaries, so prompt logic never leaks into business rules.\n- Set up metrics, alerting and health monitoring with Grafana and Prometheus across every client deployment.\n- Shipped landing pages built for conversion, with SEO, performance tuning and continuous delivery.",
            "pt-BR": "Empresa que cofundei. Vendemos uma plataforma para imobiliárias e corretores autônomos que operavam sem processo e sem rastreabilidade. Hoje são 6 clientes pagantes, com centenas de leads por mês passando pelo sistema.\n\n- Coloquei em produção um agente de IA que atende e qualifica leads pelo WhatsApp e recomenda imóveis. Antes dele, o lead que chegava ficava sem resposta.\n- Reunimos na plataforma o que cada cliente pagava como SaaS separados: catálogo de imóveis, acompanhamento de campanhas, hospedagem de sites e construtor de automações.\n- Construí o agente sobre Mastra AI e MCP, integrado ao GoHighLevel, com backend NestJS em DDD e CQRS. Os fluxos de IA ficam atrás de limites de domínio explícitos, então a lógica de prompt não vaza para as regras de negócio.\n- Estruturei métricas, alertas e monitoramento de saúde com Grafana e Prometheus em todos os deploys de cliente.\n- Entreguei landing pages feitas para conversão, com SEO, tuning de performance e entrega contínua.",
          } as LocalizedText,
          skills: [
            "NestJS",
            "Next.js",
            "TypeScript",
            "Grafana",
            "Prometheus",
            "Docker",
            "DDD",
            "CQRS",
          ],
          isExpanded: true,
        },
      ],
    },
  ],
  education: [
    {
      school: "SENAI Sorocaba",
      href: "https://www.sp.senai.br/unidade/sorocaba",
      degree: {
        en: "Associate Degree, Systems Analysis and Development",
        "pt-BR": "Superior, Análise e Desenvolvimento de Sistemas",
      } as LocalizedText,
      logoUrl: "/icons/logo-senai1.png",
      start: "Jan 2025",
      end: { en: "Present", "pt-BR": "Presente" } as LocalizedText,
      courses: {
        en: "Data Science, Data Analysis, Java, Algorithms, Machine Learning, Software Engineering, Networks",
        "pt-BR": "Ciência de Dados, Análise de Dados, Java, Algoritmos, Machine Learning, Engenharia de Software, Redes",
      } as LocalizedText,
    },
    {
      school: "SENAI Sorocaba",
      href: "https://www.sp.senai.br/unidade/sorocaba",
      degree: {
        en: "Technical Degree, Systems Development",
        "pt-BR": "Técnico, Desenvolvimento de Sistemas",
      } as LocalizedText,
      logoUrl: "/icons/logo-senai1.png",
      start: "Jan 2023",
      end: { en: "Dec 2024", "pt-BR": "Dez 2024" } as LocalizedText,
      courses: {
        en: "MySQL Database, Networks, TypeScript, Java, OOP, Algorithms",
        "pt-BR": "Banco de Dados MySQL, Redes, TypeScript, Java, POO, Algoritmos",
      } as LocalizedText,
    },
  ],
  certifications: [
    {
      institution: "DeepLearning.AI",
      name: "Supervised Machine Learning: Regression and Classification",
      date: "Jan 2026",
      credentialId: "L2MYYHXMHCPD",
      skills: {
        en: "Linear, Multiple & Polynomial Regression, Gradient Descent, Regularization (L1/L2), Logistic Classification, Neural Networks, Practical ML Development",
        "pt-BR": "Regressão Linear, Múltipla e Polinomial, Gradient Descent, Regularização (L1/L2), Classificação Logística, Redes Neurais, Desenvolvimento Prático de ML",
      } as LocalizedText,
    },
  ],
  projects: [
    {
      title: "Real Time Crash Game",
      href: "https://github.com/felipersas/crash-game",
      dates: { en: "May 2026 - Present", "pt-BR": "Mai 2026 - Presente" } as LocalizedText,
      active: true,
      description: {
        en: "A real-time multiplayer crash game split into microservices with NestJS, RabbitMQ, PostgreSQL and Next.js. Each service owns its database, and bets stay consistent through Saga transactions with Inbox/Outbox delivery guarantees. Rounds sync over WebSockets, the gameplay is provably fair, Kong and Keycloak handle authentication, and Prometheus and Grafana cover observability. CI runs 330+ unit, integration and E2E tests with Playwright and Testcontainers.",
        "pt-BR": "Um crash game multiplayer em tempo real dividido em microsserviços com NestJS, RabbitMQ, PostgreSQL e Next.js. Cada serviço tem seu próprio banco, e as apostas ficam consistentes através de transações Saga com garantias de entrega Inbox/Outbox. As rodadas sincronizam por WebSocket, o gameplay é provably fair, Kong e Keycloak cuidam da autenticação, e Prometheus e Grafana cobrem a observabilidade. O CI roda mais de 330 testes unitários, de integração e E2E com Playwright e Testcontainers.",
      } as LocalizedText,
      technologies: [
        "TypeScript",
        "NestJS",
        "TypeORM",
        "PostgreSQL",
        "Redis",
        "Grafana",
        "Prometheus",
        "RabbitMQ",
        "Docker",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/felipersas/crash-game",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Food Delivery Microservices",
      href: "https://github.com/felipersas/food-delivery-microservices",
      dates: { en: "May 2026 - Present", "pt-BR": "Mai 2026 - Presente" } as LocalizedText,
      active: true,
      description: {
        en: "A food delivery platform built as six independent NestJS services: customer, restaurant, order, kitchen, payment and gateway. The domain is modeled with DDD (aggregates, value objects and domain events) on TypeORM, PostgreSQL and Redis, with role-based authentication and ownership checks on every resource. Docker Compose runs the whole thing locally.",
        "pt-BR": "Uma plataforma de delivery construída como seis serviços NestJS independentes: customer, restaurant, order, kitchen, payment e gateway. O domínio é modelado com DDD (agregados, value objects e domain events) sobre TypeORM, PostgreSQL e Redis, com autenticação por roles e verificação de ownership em todo recurso. O Docker Compose sobe tudo localmente.",
      } as LocalizedText,
      technologies: [
        "TypeScript",
        "NestJS",
        "TypeORM",
        "PostgreSQL",
        "Redis",
        "RabbitMQ",
        "Docker",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/felipersas/food-delivery-microservices",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "PayFlow",
      href: "https://github.com/felipersas/payflow",
      dates: { en: "Apr 2026 - Present", "pt-BR": "Abr 2026 - Presente" } as LocalizedText,
      active: true,
      description: {
        en: "A financial transfer system in Go, split into three services: user, account and transfer. They talk only through RabbitMQ, with Saga handling compensation when a transfer fails partway. Operations are idempotent, calls go through a circuit breaker, and OpenTelemetry traces the path across services.",
        "pt-BR": "Um sistema de transferências financeiras em Go, dividido em três serviços: user, account e transfer. Eles conversam só por RabbitMQ, com Saga cuidando da compensação quando uma transferência falha no meio. As operações são idempotentes, as chamadas passam por circuit breaker e o OpenTelemetry rastreia o caminho entre os serviços.",
      } as LocalizedText,
      technologies: [
        "Go",
        "PostgreSQL",
        "RabbitMQ",
        "Redis",
        "Docker",
        "OpenTelemetry",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/felipersas/payflow",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Outage Detector",
      href: "https://github.com/felipersas/outage-detector",
      dates: { en: "Mar 2026 - Present", "pt-BR": "Mar 2026 - Presente" } as LocalizedText,
      active: true,
      description: {
        en: "A serverless website monitor on AWS, built with SST v4. Lambda cron jobs check the sites, DynamoDB keeps the state, and a Telegram bot messages you when something goes down. The dashboard is Next.js with Cognito authentication.",
        "pt-BR": "Um monitor de sites serverless na AWS, construído com SST v4. Lambdas em cron checam os sites, o DynamoDB guarda o estado e um bot do Telegram te avisa quando alguma coisa cai. O dashboard é Next.js com autenticação Cognito.",
      } as LocalizedText,
      technologies: [
        "TypeScript",
        "AWS",
        "SST",
        "Next.js",
        "DynamoDB",
        "Lambda",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/felipersas/outage-detector",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Finance",
      href: "https://github.com/felipersas/finance",
      dates: { en: "Jan 2025 - Present", "pt-BR": "Jan 2025 - Presente" } as LocalizedText,
      active: true,
      description: {
        en: "A personal finance platform. You import a bank statement as CSV, it categorizes the transactions on its own, and an AI chatbot answers questions about them over SSE streaming. The monorepo holds a NestJS API built with hexagonal architecture, a Next.js 15 web app on Turborepo and tRPC, and an Expo mobile app. Docker Swarm and Traefik handle deployment.",
        "pt-BR": "Uma plataforma de finanças pessoais. Você importa o extrato bancário em CSV, ela categoriza as transações sozinha, e um chatbot com IA responde perguntas sobre elas via SSE streaming. O monorepo tem uma API NestJS em arquitetura hexagonal, um web app Next.js 15 com Turborepo e tRPC, e um app mobile em Expo. Docker Swarm e Traefik cuidam do deploy.",
      } as LocalizedText,
      technologies: [
        "TypeScript",
        "NestJS",
        "Next.js",
        "React Native",
        "PostgreSQL",
        "Prisma",
        "Docker",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/felipersas/finance",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "DevBridge",
      href: "https://github.com/felipersas/devbridge",
      dates: { en: "Apr 2026 - Present", "pt-BR": "Abr 2026 - Presente" } as LocalizedText,
      active: true,
      description: {
        en: "A Go CLI for working on a remote machine from a phone. It manages SSH sessions with tmux, runs under Termux on Android, and pushes a notification when a long command finishes. Also has shell completion for bash, zsh, fish and PowerShell, and uses Android intents to handle sessions.",
        "pt-BR": "Uma CLI em Go para trabalhar em uma máquina remota pelo celular. Gerencia sessões SSH com tmux, roda sob Termux no Android e dispara notificação quando um comando longo termina. Também tem completion de shell para bash, zsh, fish e PowerShell, e usa intents do Android para lidar com as sessões.",
      } as LocalizedText,
      technologies: [
        "Go",
        "SSH",
        "Termux",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/felipersas/devbridge",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Fasty-ORM",
      href: "https://github.com/felipersas/fasty-orm",
      dates: { en: "Dec 2024 - Present", "pt-BR": "Dez 2024 - Presente" } as LocalizedText,
      active: true,
      description: {
        en: "A type-safe ORM for Node.js with a Drizzle-inspired query builder, native caching with TTL and a migration system. Query execution runs on a Rust engine exposed to Node through N-API.",
        "pt-BR": "Um ORM type-safe para Node.js com query builder inspirado no Drizzle, cache nativo com TTL e sistema de migrações. A execução das queries roda em um engine Rust exposto ao Node via N-API.",
      } as LocalizedText,
      technologies: [
        "TypeScript",
        "Rust",
        "MySQL",
        "Node.js",
        "N-API",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/felipersas/fasty-orm",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "ML Engine Rust",
      href: "https://github.com/felipersas/ml-engine-rust",
      dates: { en: "Feb 2026 - Present", "pt-BR": "Fev 2026 - Presente" } as LocalizedText,
      active: true,
      description: {
        en: "A small machine learning engine written in Rust from scratch. I built it to understand what the libraries are actually doing, and Rust forced me to be explicit about memory along the way.",
        "pt-BR": "Um engine de machine learning pequeno escrito em Rust do zero. Construí para entender o que as bibliotecas realmente fazem por baixo, e o Rust me obrigou a ser explícito com memória no caminho.",
      } as LocalizedText,
      technologies: [
        "Rust",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/felipersas/ml-engine-rust",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],
  hackathons: [],
} as const;
