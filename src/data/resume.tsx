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
import { Linux } from "@/components/ui/svgs/linux";
import type { Locale } from "@/hooks/use-translation";

export type LocalizedText = { en: string; "pt-BR": string };

export function localize(text: LocalizedText | string, locale: Locale): string {
  if (typeof text === "string") return text;
  return text[locale] || text.en;
}

export const DATA = {
  name: "Felipe Marques",
  initials: "FM",
  url: "https://felipersas.com",
  location: "Sorocaba, SP, Brazil",
  locationLink: "https://www.google.com/maps/place/Sorocaba",
  description: {
    en: "Full Stack Developer from Sorocaba, Brazil. I build web applications with TypeScript, Next.js, NestJS, and Go.",
    "pt-BR": "Desenvolvedor Full Stack de Sorocaba, SP. Construo aplicações web com TypeScript, Next.js, NestJS e Go.",
  } as LocalizedText,
  summary: {
    en: "I'm from Sorocaba, Brazil. Started coding in high school through a technical program at SENAI, and it stuck — now I do it for work and for fun. Currently pursuing a degree in Systems Analysis & Development.\n\nMy daily stack is TypeScript, Next.js, NestJS, React, and Go, building systems from scratch to production. I like branching out too — I built a Rust ORM for Node.js (Fasty-ORM), an ML engine from scratch, and a Go microservices system, among other open-source projects.\n\nFree time: video games, anime, and way too much coffee.",
    "pt-BR": "Sou de Sorocaba, SP. Comecei a programar no ensino médio fazendo o técnico no SENAI, e desde então é o que faço — tanto no trabalho quanto nos meus projetos pessoais. Atualmente curso Análise e Desenvolvimento de Sistemas.\n\nNo dia a dia trabalho com TypeScript, Next.js, NestJS, React e Go, construindo sistemas do zero até produção. Mas gosto de explorar outras paradas também — montei um ORM em Rust pro Node.js (Fasty-ORM), um engine de ML do zero e um sistema de microsserviços em Go, entre outros projetos open-source.\n\nNo tempo livre: vídeo game, anime e café demais.",
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
    { name: "Postgres", icon: Postgresql },
    { name: "MySQL", icon: Mysql },
    { name: "Prisma", icon: Prisma },
    { name: "Docker", icon: Docker },
    { name: "AWS", icon: Aws },
    { name: "TailwindCSS", icon: TailwindCSS },
    { name: "Grafana", icon: Grafana },
    { name: "Prometheus", icon: Prometheus },
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
      company: "MindGroup Consulting",
      href: "https://mindgroup.com.br",
      badges: [],
      location: "Sorocaba, SP, Brazil",
      title: { en: "Full-Stack Developer", "pt-BR": "Desenvolvedor Full-Stack" } as LocalizedText,
      logoUrl: "/icons/LOGOTIPO-Mind-Group-2.png",
      start: { en: "Feb 2025", "pt-BR": "Fev 2025" } as LocalizedText,
      end: { en: "Present", "pt-BR": "Presente" } as LocalizedText,
      bullets: [
        {
          en: "Built 3 full-stack systems from scratch to production using TypeScript, Next.js, NestJS, MySQL, Docker, and Prisma ORM",
          "pt-BR": "Desenvolvimento de 3 sistemas completos do zero ao deploy em produção com TypeScript, Next.js, NestJS, MySQL, Docker e Prisma ORM",
        } as LocalizedText,
        {
          en: "Automated 40+ monthly hours of manual work in a legal system with bulk import, bank processing, and invoice generation",
          "pt-BR": "Automação de 40+ horas mensais de trabalho manual em sistema jurídico com importação em massa, processamento bancário e emissão de notas fiscais",
        } as LocalizedText,
        {
          en: "Optimized aggregation query from 5s to 2s (60% improvement) using views and MySQL indexing",
          "pt-BR": "Otimização de query de agregação de 5s para 2s (60% de melhoria) usando views e indexação MySQL",
        } as LocalizedText,
        {
          en: "Reduced dashboard load time from 3s to 1.4s (53%) using memoization, lazy loading, and dynamic imports",
          "pt-BR": "Redução do tempo de carregamento de dashboard de 3s para 1.4s (53%) com memoização, lazy loading e imports dinâmicos",
        } as LocalizedText,
        {
          en: "Implemented modular monolith architecture with NestJS, DDD, JWT authentication, granular permissions, and CI/CD with Docker",
          "pt-BR": "Arquitetura de monolito modular com NestJS, DDD, autenticação JWT, permissões granulares e CI/CD com Docker",
        } as LocalizedText,
        {
          en: "Developed 2 mobile apps with React Native and Expo, including full payment flow implementation",
          "pt-BR": "Desenvolvimento de 2 apps mobile com React Native e Expo, incluindo fluxo completo de pagamentos",
        } as LocalizedText,
        {
          en: "Integrated payment gateways — Stripe (credit card) and eRede (credit card and Pix) — in web and mobile applications",
          "pt-BR": "Integração de gateways de pagamento — Stripe (cartão) e eRede (cartão e Pix) — em aplicações web e mobile",
        } as LocalizedText,
      ],
    },
    {
      company: "Freelance",
      href: "#",
      badges: [],
      location: { en: "Remote", "pt-BR": "Remoto" } as LocalizedText,
      title: { en: "Full-Stack Developer", "pt-BR": "Desenvolvedor Full-Stack" } as LocalizedText,
      logoUrl: "",
      start: { en: "Jun 2024", "pt-BR": "Jun 2024" } as LocalizedText,
      end: { en: "Present", "pt-BR": "Presente" } as LocalizedText,
      bullets: [
        {
          en: "Developed responsive landing pages with SEO and production deployment",
          "pt-BR": "Desenvolvimento de landing pages responsivas com SEO e deploy em produção",
        } as LocalizedText,
        {
          en: "Built GoHighLevel integration system using Mastra AI and MCP server for a specialized agent — answers questions, processes forms, sends WhatsApp messages, and displays property catalogs",
          "pt-BR": "Sistema de integração com GoHighLevel usando Mastra AI e MCP server para agente especializado — responde perguntas, processa formulários, envia WhatsApp e exibe catálogos de imóveis",
        } as LocalizedText,
        {
          en: "Integrated qualification AI with property catalogs for intelligent property recommendations, unifying the ecosystem within GHL",
          "pt-BR": "Integração entre IA de qualificação e catálogos de imóveis para recomendação inteligente de propriedades, unificando o ecossistema dentro do GHL",
        } as LocalizedText,
      ],
    },
  ],
  education: [
    {
      school: "SENAI Sorocaba",
      href: "https://www.sp.senai.br/unidade/sorocaba",
      degree: {
        en: "Associate Degree, Systems Analysis & Development",
        "pt-BR": "Tecnólogo, Análise e Desenvolvimento de Sistemas",
      } as LocalizedText,
      logoUrl: "/icons/logo-senai1.png",
      start: "2025",
      end: { en: "Present", "pt-BR": "Presente" } as LocalizedText,
    },
    {
      school: "SENAI Sorocaba",
      href: "https://www.sp.senai.br/unidade/sorocaba",
      degree: {
        en: "Technical Degree, Systems Development",
        "pt-BR": "Técnico, Desenvolvimento de Sistemas",
      } as LocalizedText,
      logoUrl: "/icons/logo-senai1.png",
      start: "2023",
      end: "2024",
    },
  ],
  projects: [
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
