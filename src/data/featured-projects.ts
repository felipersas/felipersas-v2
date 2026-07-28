export type FeaturedProject = {
  slug: string
  title: string
  number: string
  description: {
    en: string
    "pt-BR": string
  }
  technicalSummary: {
    en: string
    "pt-BR": string
  }
  technologies: string[]
  evidence?: {
    en: string
    "pt-BR": string
  }
  links: Array<{
    label: {
      en: string
      "pt-BR": string
    }
    href: string
  }>
  featured?: boolean
}

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "portfolio-agent",
    title: "Portfolio Agent",
    number: "01",
    description: {
      en: "A durable, bilingual AI agent embedded in this portfolio to answer questions about my career, projects, and technical decisions.",
      "pt-BR": "Um agente de IA bilíngue e durável integrado a este portfólio para responder sobre minha carreira, projetos e decisões técnicas.",
    },
    technicalSummary: {
      en: "Built with Vercel Eve, OpenRouter, and a local multilingual Whisper pipeline running through Transformers.js in a Web Worker.",
      "pt-BR": "Construído com Vercel Eve, OpenRouter e um pipeline Whisper multilíngue local executado com Transformers.js em Web Worker.",
    },
    technologies: ["Eve", "OpenRouter", "Transformers.js", "Next.js"],
    evidence: {
      en: "Durable sessions · on-demand skills · local speech-to-text",
      "pt-BR": "Sessões duráveis · skills sob demanda · speech-to-text local",
    },
    links: [
      {
        label: { en: "Live demo", "pt-BR": "Demo ao vivo" },
        href: "/agent",
      },
    ],
    featured: true,
  },
  {
    slug: "democraft",
    title: "DemoCraft",
    number: "02",
    description: {
      en: "An open-source toolkit for creating polished and reproducible product demos from real application workflows.",
      "pt-BR": "Uma ferramenta open source para criar demos de produto polidas e reproduzíveis a partir de fluxos reais da aplicação.",
    },
    technicalSummary: {
      en: "Demo flows are defined in TypeScript, executed in a real browser with Playwright, and rendered deterministically with Remotion.",
      "pt-BR": "Os fluxos são definidos em TypeScript, executados em um navegador real com Playwright e renderizados de forma determinística com Remotion.",
    },
    technologies: ["TypeScript", "Playwright", "Remotion", "React"],
    links: [
      {
        label: { en: "Website", "pt-BR": "Website" },
        href: "https://democraft-lp.vercel.app/",
      },
      {
        label: { en: "GitHub", "pt-BR": "GitHub" },
        href: "https://github.com/felipersas/democraft",
      },
    ],
  },
  {
    slug: "real-time-crash-game",
    title: "Real-Time Crash Game",
    number: "03",
    description: {
      en: "A real-time multiplayer crash game designed to keep rounds, balances, and payments consistent across distributed services.",
      "pt-BR": "Um crash game multiplayer em tempo real, projetado para manter rodadas, saldos e pagamentos consistentes entre serviços distribuídos.",
    },
    technicalSummary: {
      en: "Built with event-driven microservices, Saga orchestration, Inbox/Outbox patterns, WebSockets, observability, and more than 330 automated tests.",
      "pt-BR": "Construído com microsserviços orientados a eventos, Saga, padrões Inbox/Outbox, WebSockets, observabilidade e mais de 330 testes automatizados.",
    },
    technologies: ["NestJS", "RabbitMQ", "PostgreSQL", "WebSockets"],
    evidence: {
      en: "330+ automated tests",
      "pt-BR": "330+ testes automatizados",
    },
    links: [
      {
        label: { en: "GitHub", "pt-BR": "GitHub" },
        href: "https://github.com/felipersas/crash-game",
      },
    ],
  },
  {
    slug: "payflow",
    title: "PayFlow",
    number: "04",
    description: {
      en: "A financial transfer system built with three Go microservices that communicate exclusively through asynchronous messaging.",
      "pt-BR": "Um sistema de transferências financeiras construído com três microsserviços em Go que se comunicam exclusivamente por mensageria assíncrona.",
    },
    technicalSummary: {
      en: "Uses choreographed Saga orchestration, DDD boundaries, idempotent operations, and OpenTelemetry tracing to ensure financial consistency across distributed services.",
      "pt-BR": "Utiliza orquestração Saga coreografada, boundaries DDD, operações idempotentes e tracing OpenTelemetry para garantir consistência financeira entre serviços distribuídos.",
    },
    technologies: ["Go", "PostgreSQL", "RabbitMQ", "Docker"],
    links: [
      {
        label: { en: "GitHub", "pt-BR": "GitHub" },
        href: "https://github.com/felipersas/payflow",
      },
    ],
  },
]
