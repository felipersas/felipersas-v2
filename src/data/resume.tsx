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

export const DATA = {
  name: "Felipe Marques",
  initials: "FM",
  url: "https://felipersas.com",
  location: "Sorocaba, SP, Brazil",
  locationLink: "https://www.google.com/maps/place/Sorocaba",
  description:
    "Full Stack Developer passionate about building comfortable, user-friendly web experiences. I work with TypeScript, React, NestJS, and Rust.",
  summary:
    "I'm a 19-year-old Full Stack Developer from Sorocaba, São Paulo, Brazil. I started my journey in high school with a technical Systems Development course at SENAI, and I've been continuously evolving as a developer ever since.\n\nI enjoy exploring new technologies and staying up to date with cutting-edge tools in the development world. I'm passionate about open-source, building type-safe applications, and creating performant systems.\n\nWhen I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or simply enjoying a good cup of coffee. I enjoy my free time playing video games and watching anime.",
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
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
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
      title: "Full-Stack Developer",
      logoUrl: "",
      start: "Feb 2025",
      end: "Present",
      description:
        "Developing and maintaining full-stack web applications using TypeScript, React, Next.js, and NestJS. Building RESTful APIs, managing databases with Prisma ORM and PostgreSQL, and deploying containerized applications with Docker.",
    },
    {
      company: "Freelance",
      href: "#",
      badges: [],
      location: "Remote",
      title: "Full-Stack Developer",
      logoUrl: "",
      start: "Jun 2024",
      end: "Present",
      description:
        "Building custom web applications and APIs for clients. Specializing in modern TypeScript stack with Next.js, NestJS, and PostgreSQL. Contributing to open-source projects and developing personal tools like Fasty-ORM.",
    },
  ],
  education: [
    {
      school: "SENAI Sorocaba",
      href: "https://www.sp.senai.br/unidade/sorocaba",
      degree: "Associate Degree, Systems Analysis & Development",
      logoUrl: "",
      start: "2025",
      end: "Present",
    },
    {
      school: "SENAI Sorocaba",
      href: "https://www.sp.senai.br/unidade/sorocaba",
      degree: "Technical Degree, Systems Development",
      logoUrl: "",
      start: "2023",
      end: "2024",
    },
  ],
  projects: [
    {
      title: "Fasty-ORM",
      href: "https://github.com/felipersas/fasty-orm",
      dates: "Dec 2024 - Present",
      active: true,
      description:
        "A type-safe ORM for Node.js featuring a Drizzle-inspired query builder, blazing-fast native caching with TTL, and a robust migration system. The Rust engine via N-API provides unmatched performance for query execution.",
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
      dates: "Feb 2026 - Present",
      active: true,
      description:
        "A lightweight machine learning engine implemented in Rust from scratch, focusing on performance and memory safety. Built to understand the fundamentals of ML implementation in systems programming.",
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
