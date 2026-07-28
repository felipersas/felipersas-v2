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
  caseStudy: {
    challenge: {
      en: string
      "pt-BR": string
    }
    approach: {
      en: string
      "pt-BR": string
    }
    outcome: {
      en: string
      "pt-BR": string
    }
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
      en: "Canonical facts · transparent knowledge gaps · local speech-to-text",
      "pt-BR": "Fatos canônicos · lacunas transparentes · speech-to-text local",
    },
    caseStudy: {
      challenge: {
        en: "Make a portfolio agent useful enough for recruiters and engineers without letting it invent career facts or turn into an unrestricted general-purpose assistant.",
        "pt-BR": "Tornar um agente de portfólio realmente útil para recrutadores e engenheiros sem permitir que ele invente fatos profissionais ou vire um assistente genérico sem limites.",
      },
      approach: {
        en: "Generate always-on canonical context from the same typed portfolio data used by the site, instruct the model to verify every claim against it, keep procedural skills separate, and run multilingual speech-to-text entirely in a Web Worker.",
        "pt-BR": "Gerar contexto canônico permanente a partir dos mesmos dados tipados usados pelo portfólio, instruir o modelo a verificar cada afirmação nesse contexto, manter skills procedurais separadas e executar speech-to-text multilíngue em um Web Worker.",
      },
      outcome: {
        en: "A bilingual conversation surface grounded in the public portfolio, transparent when information is unavailable, and backed by local speech transcription.",
        "pt-BR": "Uma experiência bilíngue fundamentada no portfólio público, transparente quando uma informação não está disponível e com transcrição de voz local.",
      },
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
    caseStudy: {
      challenge: {
        en: "Product demos are often fragile screen recordings that are difficult to reproduce after the application changes.",
        "pt-BR": "Demos de produto geralmente são gravações frágeis e difíceis de reproduzir quando a aplicação muda.",
      },
      approach: {
        en: "Describe a real browser workflow in TypeScript, execute it with Playwright, and render the captured sequence deterministically with Remotion.",
        "pt-BR": "Descrever um fluxo real do navegador em TypeScript, executá-lo com Playwright e renderizar a sequência capturada de forma determinística com Remotion.",
      },
      outcome: {
        en: "An open-source workflow that makes polished product demos repeatable, reviewable, and version-controlled.",
        "pt-BR": "Um fluxo open source que torna demos de produto polidas reproduzíveis, revisáveis e versionáveis.",
      },
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
    caseStudy: {
      challenge: {
        en: "Keep rounds, bets, balances, and payments consistent while multiple low-latency services update the same multiplayer game.",
        "pt-BR": "Manter rodadas, apostas, saldos e pagamentos consistentes enquanto múltiplos serviços de baixa latência atualizam o mesmo jogo multiplayer.",
      },
      approach: {
        en: "Use event-driven services with database-per-service isolation, Saga coordination, Inbox/Outbox delivery guarantees, WebSockets, and end-to-end observability.",
        "pt-BR": "Usar serviços orientados a eventos com isolamento database-per-service, coordenação Saga, garantias de entrega com Inbox/Outbox, WebSockets e observabilidade ponta a ponta.",
      },
      outcome: {
        en: "A distributed gameplay architecture backed by more than 330 unit, integration, and end-to-end tests.",
        "pt-BR": "Uma arquitetura distribuída de gameplay sustentada por mais de 330 testes unitários, de integração e ponta a ponta.",
      },
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
    caseStudy: {
      challenge: {
        en: "Coordinate a financial transfer across independently deployed services without relying on a shared database or synchronous coupling.",
        "pt-BR": "Coordenar uma transferência financeira entre serviços independentes sem depender de banco compartilhado ou acoplamento síncrono.",
      },
      approach: {
        en: "Model user, account, and transfer boundaries as Go services connected through RabbitMQ, with idempotency, choreographed Saga compensation, circuit breaking, and distributed tracing.",
        "pt-BR": "Modelar os limites de usuário, conta e transferência como serviços Go conectados por RabbitMQ, com idempotência, compensação Saga coreografada, circuit breaker e tracing distribuído.",
      },
      outcome: {
        en: "A fault-aware transfer flow whose consistency decisions can be inspected through OpenTelemetry traces.",
        "pt-BR": "Um fluxo de transferência tolerante a falhas cujas decisões de consistência podem ser inspecionadas por traces do OpenTelemetry.",
      },
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
