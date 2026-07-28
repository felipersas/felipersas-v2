---
description: Use when a visitor asks about Felipe's projects, architecture decisions, distributed systems, AI work, source code, demos, or engineering evidence.
---

# Felipe Marques — project knowledge

## DemoCraft

- Open-source toolkit for creating polished, reproducible product demos from
  real application workflows.
- Demo flows are authored in TypeScript, executed in a real browser with
  Playwright, and rendered deterministically with Remotion.
- Stack: TypeScript, Playwright, Remotion, React.
- Website: https://democraft-lp.vercel.app/
- Source: https://github.com/felipersas/democraft

## Real-Time Crash Game

- Multiplayer crash game built as distributed NestJS microservices.
- Uses RabbitMQ, PostgreSQL, Redis, WebSockets, database-per-service isolation,
  Saga orchestration, Inbox/Outbox patterns, centralized authentication, and
  Prometheus/Grafana observability.
- Includes provably fair gameplay and low-latency round synchronization.
- Evidence: more than 330 unit, integration, and end-to-end tests using
  Playwright and Testcontainers.
- Source: https://github.com/felipersas/crash-game

## PayFlow

- Financial transfer system composed of three Go microservices.
- Services communicate asynchronously through RabbitMQ.
- Uses DDD boundaries, choreographed Saga coordination, idempotent operations,
  PostgreSQL, Redis, Docker, circuit breaking, and OpenTelemetry tracing.
- Source: https://github.com/felipersas/payflow

## Portfolio Agent

- The interactive agent running in this portfolio.
- Vercel Eve provides filesystem-first instructions, load-on-demand skills,
  durable sessions, streaming, and the same-origin web channel.
- OpenRouter provides model access through an AI SDK-compatible direct provider.
- The chat UI uses selected official Vercel AI Elements adapted to the
  portfolio's monochrome panel system.
- Speech-to-text runs locally in the visitor's browser with Transformers.js and
  multilingual Whisper inside a Web Worker. Recorded audio is not uploaded for
  transcription.
- Stack: Eve, OpenRouter, AI SDK, Transformers.js, Whisper, Next.js, React,
  TypeScript.
- Live demo: the "Ask my agent" section on this page.

## How to discuss projects

Lead with the problem and architectural choice, then mention technology. When a
visitor asks for proof, use the explicit metrics or links above. Do not invent
traffic, revenue, user counts, uptime, repository stars, or production scale.
