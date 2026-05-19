import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";
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
    en: "Software Engineer building scalable systems with NestJS, Next.js, and AWS. Focused on backend architecture, DDD, and AI-driven automation.",
    "pt-BR": "Engenheiro de Software construindo sistemas escaláveis com NestJS, Next.js e AWS. Focado em arquitetura backend, DDD e automação com IA.",
  } as LocalizedText,
  summary: {
    "en": "Software Engineer from Sorocaba, Brazil. Started coding in high school through a technical program at SENAI — now I build production systems for work and maintain open-source projects for fun. Currently pursuing a degree in Systems Analysis & Development.\n\nMy core stack is TypeScript, Next.js, NestJS, React, and Go, building systems from the ground up. I also built a real-time crash game for iGaming, using a microservices architecture. Distributed microservices in Go, Fasty-ORM (a Rust ORM for Node.js), among other open-source projects.\n\nFree time: video games, filmes, anime, and coffee.",
    "pt-BR": "Engenheiro de Software de Sorocaba, SP. Comecei a programar no ensino médio pelo técnico do SENAI — hoje construo sistemas em produção no trabalho e mantenho projetos open-source por diversão. Atualmente curso Análise e Desenvolvimento de Sistemas.\n\nMinha stack principal é TypeScript, Next.js, NestJS, React e Go, construindo sistemas do zero. Também desenvolvi um crash game em tempo real para iGaming usando arquitetura de microsserviços. Microsserviços distribuídos em Go, além do Fasty-ORM (ORM em Rust para Node.js), entre outros projetos open-source.\n\nTempo livre: vídeo game, filmes, anime e café."
  } as LocalizedText,
  avatarUrl: "/me.png",
  skills: [
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "TypeScript", icon: Typescript },
    { name: "Node.js", icon: Nodejs },
    { name: "NestJS", icon: NestJS },
    { name: "Python", icon: Python },
    { name: "Go", icon: Golang },
    { name: "Rust", icon: Rust },
    { name: "Java", icon: Java },
    { name: "Postgres", icon: Postgresql },
    { name: "MySQL", icon: Mysql },
    { name: "Prisma", icon: Prisma },
    { name: "Docker", icon: Docker },
    { name: "AWS", icon: Aws },
    { name: "TailwindCSS", icon: TailwindCSS },
    { name: "Grafana", icon: Grafana },
    { name: "Prometheus", icon: Prometheus },
    { name: "RabbitMQ", icon: RabbitMQ },
    { name: "Linux", icon: Linux },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: { en: "Home", "pt-BR": "Início" } as LocalizedText },
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
      company: "MindGroup Consulting e Marketing",
      href: "https://mindgroup.com.br",
      badges: [],
      location: "Sorocaba, SP, Brazil",
      title: { en: "Full-Stack Developer", "pt-BR": "Desenvolvedor Full-Stack" } as LocalizedText,
      logoUrl: "/icons/LOGOTIPO-Mind-Group-2.png",
      start: { en: "Feb 2025", "pt-BR": "Fev 2025" } as LocalizedText,
      end: { en: "Present", "pt-BR": "Presente" } as LocalizedText,
      bullets: [
        {
          en: "Architected and shipped 3 production systems using a modular monolith approach with NestJS, DDD, Next.js, Docker, and CI/CD — consolidating business operations into unified platforms",
          "pt-BR": "Arquitetou e entregou 3 sistemas em produção com monolito modular (NestJS, DDD, Next.js, Docker) e CI/CD automatizado — consolidando operações de negócio em plataformas unificadas",
        } as LocalizedText,
        {
          en: "Designed RESTful APIs with NestJS implementing JWT authentication and granular role-based access control — enabling secure, self-service permission management across modules",
          "pt-BR": "Projetou APIs RESTful com NestJS implementando autenticação JWT e controle de acesso granular por papéis — viabilizando gestão autônoma e segura de permissões em aplicações multi-módulo",
        } as LocalizedText,
        {
          en: "Automated legal and financial workflows — bulk data imports, bank transaction processing, and invoice generation — eliminating 40+ hours of manual work per month",
          "pt-BR": "Automatizou fluxos judiciais e financeiros — importação em massa, processamento bancário e emissão de notas fiscais — eliminando 40+ horas de trabalho manual por mês",
        } as LocalizedText,
        {
          en: "Optimized database performance by 95%, reducing query execution from 5s to 240ms through MySQL views, composite indexing strategies, and cursor-based pagination",
          "pt-BR": "Otimizou performance de banco de dados em 95%, reduzindo queries de 5s para 240ms através de views MySQL, indexação composta e paginação baseada em cursor",
        } as LocalizedText,
        {
          en: "Built performant Next.js frontends leveraging Server Components, code splitting, memoization, and TanStack Query — achieving 250ms average page loads across production applications",
          "pt-BR": "Construiu frontends performáticos em Next.js com Server Components, code splitting, memoização e TanStack Query — carregamento médio de 250ms em produção",
        } as LocalizedText,
        {
          en: "Developed and maintained 2 React Native/Expo mobile applications with Stripe and eRede/Pix integrations — enabling mobile-first payment processing in production",
          "pt-BR": "Desenvolveu e manteve 2 apps mobile em React Native/Expo com integração aos gateways Stripe e eRede/Pix — viabilizando processamento de pagamentos mobile-first em produção",
        } as LocalizedText,
      ],
    },
    {
      company: "Freelance",
      href: "#",
      badges: [],
      location: { en: "Remote", "pt-BR": "Remoto" } as LocalizedText,
      title: { en: "Freelance Full-Stack Developer", "pt-BR": "Desenvolvedor Full-Stack Autônomo" } as LocalizedText,
      logoUrl: "",
      start: { en: "Jun 2024", "pt-BR": "Jun 2024" } as LocalizedText,
      end: { en: "Present", "pt-BR": "Presente" } as LocalizedText,
      bullets: [
        {
          en: "Architected modular back-end solutions using Domain-Driven Design (DDD) and CQRS with NestJS, enabling scalable AI workflows, clear domain boundaries, and maintainable business logic",
          "pt-BR": "Arquitetou soluções back-end modulares com Domain-Driven Design (DDD) e CQRS em NestJS, viabilizando fluxos de IA escaláveis, limites de domínio claros e lógica de negócio mantentível",
        } as LocalizedText,
        {
          en: "Developed an AI-powered real estate agent integrated with GoHighLevel via Mastra AI and MCP, orchestrating asynchronous lead qualification, WhatsApp messaging, and property recommendations — consolidating multiple SaaS workflows into a unified automated pipeline",
          "pt-BR": "Desenvolveu agente imobiliário com IA integrado ao GoHighLevel via Mastra AI e MCP, orquestrando qualificação assíncrona de leads, mensagens no WhatsApp e recomendação de imóveis — consolidando múltiplos fluxos SaaS em um pipeline automatizado unificado",
        } as LocalizedText,
        {
          en: "Built and deployed conversion-oriented web applications with production-grade SEO optimization, performance tuning, and continuous delivery — improving search visibility and client acquisition",
          "pt-BR": "Construiu e publicou landing pages orientadas a conversão com SEO otimizado para produção, tuning de performance e entrega contínua — melhorando indexação e aquisição de clientes",
        } as LocalizedText,
        {
          en: "Implemented observability with Grafana and Prometheus for production metrics, alerting, and health monitoring — improving operational visibility and incident response across deployments",
          "pt-BR": "Estruturou monitoramento com Grafana e Prometheus para métricas e alertas em produção — melhorando a visibilidade operacional e detecção proativa de incidentes nos sistemas dos clientes",
        } as LocalizedText,
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
        en: "Distributed real-time crash game built with a microservices architecture using NestJS, RabbitMQ, PostgreSQL, and Next.js. Implements event-driven communication, Saga-based distributed transactions, Inbox/Outbox patterns, and database-per-service isolation for reliable multiplayer betting flows. Features low-latency WebSocket synchronization, provably fair gameplay, centralized authentication with Kong + Keycloak, full observability with Prometheus and Grafana, and automated CI pipelines with 330+ unit, integration, and E2E tests using Playwright and Testcontainers.",
        "pt-BR": "Crash game multiplayer em tempo real construído com arquitetura de microsserviços utilizando NestJS, RabbitMQ, PostgreSQL e Next.js. Implementa comunicação orientada a eventos, transações distribuídas com Saga Pattern, Inbox/Outbox patterns e isolamento database-per-service para fluxos de apostas confiáveis. Possui sincronização WebSocket de baixa latência, mecanismo provably fair, autenticação centralizada com Kong + Keycloak, observabilidade completa com Prometheus e Grafana, além de pipelines de CI automatizados com mais de 330 testes entre unitários, integração e E2E utilizando Playwright e Testcontainers.",
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
          href: "https://github.com/felipersas/food-delivery-microservices",
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
        en: "A comprehensive food delivery platform built as distributed microservices with NestJS. Implements DDD architecture with TypeORM, PostgreSQL, and Redis. Features six independent services (customer, restaurant, order, kitchen, payment, gateway) with role-based authentication, resource ownership validation, and complete domain modeling including aggregates, value objects, and domain events. Orchestrated via Docker Compose with production-ready configuration.",
        "pt-BR": "Plataforma completa de delivery de comida construída como microsserviços distribuídos com NestJS. Implementa arquitetura DDD com TypeORM, PostgreSQL e Redis. Seis serviços independentes (customer, restaurant, order, kitchen, payment, gateway) com autenticação baseada em roles, validação de ownership de recursos e modelagem completa de domínio incluindo agregados, value objects e domain events. Orquestrado via Docker Compose com configuração production-ready.",
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
        en: "A microservices-based financial transfer system built with Go, featuring saga pattern orchestration via RabbitMQ, DDD architecture, and distributed tracing. Comprises three services (user, account, transfer) with idempotent operations, circuit breaker, and OpenTelemetry integration.",
        "pt-BR": "Sistema de transferências financeiras baseado em microsserviços construído com Go, com orquestração via saga pattern usando RabbitMQ, arquitetura DDD e distributed tracing. Composto por três serviços (user, account, transfer) com operações idempotentes, circuit breaker e integração com OpenTelemetry.",
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
        en: "A serverless website monitoring platform on AWS using SST v4. Features real-time outage detection via Lambda cron jobs, Telegram bot notifications, DynamoDB state management, and a Next.js dashboard with Cognito authentication.",
        "pt-BR": "Plataforma serverless de monitoramento de websites na AWS usando SST v4. Detecção de quedas em tempo real via Lambda cron jobs, notificações por bot do Telegram, gerenciamento de estado no DynamoDB e dashboard Next.js com autenticação Cognito.",
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
        en: "Full-stack personal finance management platform with AI. Features CSV bank statement import, automatic transaction categorization, financial analytics dashboard, and an AI chatbot with SSE streaming. Built as a monorepo with a NestJS API (hexagonal architecture), Next.js 15 web app (Turborepo + tRPC), and an Expo mobile app — all orchestrated with Docker Swarm and Traefik.",
        "pt-BR": "Plataforma full-stack de gestão financeira pessoal com inteligência artificial. Importação de extratos bancários via CSV, categorização automática de transações, dashboard de analytics financeiro e chatbot com IA via SSE streaming. Monorepo com API NestJS (arquitetura hexagonal), web app Next.js 15 (Turborepo + tRPC) e app mobile Expo — tudo orquestrado com Docker Swarm e Traefik.",
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
        en: "A Go CLI tool for seamless remote development bridging. Enables SSH session management with tmux integration, Termux support for mobile development, and push notifications for long-running commands. Features shell completion (bash, zsh, fish, PowerShell), notifier wait mechanisms, and intent-based session management for Android devices.",
        "pt-BR": "Ferramenta CLI em Go para ponte de desenvolvimento remoto. Permite gerenciamento de sessões SSH com integração tmux, suporte Termux para desenvolvimento mobile e notificações push para comandos de longa duração. Features incluem completion de shell (bash, zsh, fish, PowerShell), mecanismos de wait para notificadores e gerenciamento de sessões baseado em intents para Android.",
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
        en: "A type-safe ORM for Node.js featuring a Drizzle-inspired query builder, blazing-fast native caching with TTL, and a robust migration system. The Rust engine via N-API provides unmatched performance for query execution.",
        "pt-BR": "Um ORM type-safe para Node.js com um query builder inspirado no Drizzle, cache nativo ultrarrápido com TTL e um sistema robusto de migrações. O engine em Rust via N-API fornece desempenho incomparável para execução de queries.",
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
        en: "A lightweight machine learning engine implemented in Rust from scratch, focusing on performance and memory safety. Built to understand the fundamentals of ML implementation in systems programming.",
        "pt-BR": "Um engine de machine learning leve implementado em Rust do zero, com foco em desempenho e segurança de memória. Construído para entender os fundamentos da implementação de ML em programação de sistemas.",
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
