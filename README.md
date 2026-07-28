<div align="center">
<img alt="Portfolio" src="https://github.com/dillionverma/portfolio/assets/16860528/57ffca81-3f0a-4425-b31d-094f61725455" width="90%">
</div>

# Portfolio [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdillionverma%2Fportfolio)

Built with next.js, [shadcn/ui](https://ui.shadcn.com/), and [magic ui](https://magicui.design/), deployed on Vercel.

## Portfolio Agent

The portfolio includes a bilingual Eve agent backed by OpenRouter. It uses
structured skills for career, project, and contact information, and offers
private, in-browser speech-to-text with Transformers.js.

1. Use Node.js 24 or newer.
2. Copy `.env.example` to `.env.local`.
3. Add your server-only `OPENROUTER_API_KEY`.
4. Run `npm install` and `npm run dev`.

`OPENROUTER_MODEL` is optional and defaults to
`google/gemini-2.5-flash`. The public Eve endpoint has per-session token limits;
production deployments should also configure rate limiting in the Vercel
Firewall.

# Features

- Setup only takes a few minutes by editing the [single config file](./src/data/resume.tsx)
- Built using Next.js 14, React, Typescript, Shadcn/UI, TailwindCSS, Framer Motion, Magic UI
- Includes a blog
- Responsive for different devices
- Optimized for Next.js and Vercel

# Getting Started Locally

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/dillionverma/portfolio
   ```

2. Move to the cloned directory

   ```bash
   cd portfolio
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Start the local Server:

   ```bash
   pnpm dev
   ```

5. Open the [Config file](./src/data/resume.tsx) and make changes

# License

Licensed under the [MIT license](https://github.com/dillionverma/portfolio/blob/main/LICENSE.md).
