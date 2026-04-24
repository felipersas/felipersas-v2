import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
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
    en: "Full Stack Developer passionate about building comfortable, user-friendly web experiences. I work with TypeScript, React, NestJS, and Rust.",
    "pt-BR": "Desenvolvedor Full Stack apaixonado por construir experiências web confortáveis e fáceis de usar. Trabalho com TypeScript, React, NestJS e Rust.",
  } as LocalizedText,
  summary: {
    en: "I'm a 19-year-old Full Stack Developer from Sorocaba, Sao Paulo, Brazil. I started my journey in high school with a technical Systems Development course at SENAI, and I've been continuously evolving as a developer ever since.\n\nI enjoy exploring new technologies and staying up to date with cutting-edge tools in the development world. I'm passionate about open-source, building type-safe applications, and creating performant systems.\n\nWhen I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or simply enjoying a good cup of coffee. I enjoy my free time playing video games and watching anime.",
    "pt-BR": "Sou um Desenvolvedor Full Stack de 19 anos de Sorocaba, São Paulo, Brasil. Comecei minha jornada no ensino médio com um curso técnico de Desenvolvimento de Sistemas no SENAI, e venho evoluindo continuamente como desenvolvedor desde então.\n\nGosto de explorar novas tecnologias e me manter atualizado com ferramentas de ponta no mundo do desenvolvimento. Sou apaixonado por código aberto, construção de aplicações type-safe e criação de sistemas performáticos.\n\nQuando não estou programando, você pode me encontrar explorando novas tecnologias, contribuindo para projetos open-source, ou simplesmente aproveitando uma boa xícara de café. Aproveito meu tempo livre jogando vídeo games e assistindo anime.",
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
    { href: "/blog", icon: NotebookIcon, label: { en: "Blog", "pt-BR": "Blog" } as LocalizedText },
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
      X: {
        name: "X",
        url: "https://x.com/felipersas",
        icon: Icons.x,
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
      description: {
        en: "Developing and maintaining full-stack web applications using TypeScript, React, Next.js, and NestJS. Building RESTful APIs, managing databases with Prisma ORM and PostgreSQL, and deploying containerized applications with Docker.",
        "pt-BR": "Desenvolvendo e mantendo aplicações web full-stack usando TypeScript, React, Next.js e NestJS. Construindo APIs RESTful, gerenciando bancos de dados com Prisma ORM e PostgreSQL, e implantando aplicações conteinerizadas com Docker.",
      } as LocalizedText,
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
      description: {
        en: "Building custom web applications and APIs for clients. Specializing in modern TypeScript stack with Next.js, NestJS, and PostgreSQL. Contributing to open-source projects and developing personal tools like Fasty-ORM.",
        "pt-BR": "Construindo aplicações web e APIs personalizadas para clientes. Especializado no stack moderno de TypeScript com Next.js, NestJS e PostgreSQL. Contribuindo para projetos open-source e desenvolvendo ferramentas pessoais como Fasty-ORM.",
      } as LocalizedText,
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
