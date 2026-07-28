import { DATA } from "@/data/resume";
import type { Locale } from "@/hooks/use-translation";
import { Bot, FileDown, Mail, MoveUpRight } from "lucide-react";

export function ContactFooter({ locale }: { locale: Locale }) {
  const isPtBR = locale === "pt-BR";
  const resumeHref = isPtBR ? "/curriculo.pdf" : "/resume_en.pdf";

  return (
    <footer className="border-x border-t border-line px-4 py-10 sm:px-6 sm:py-14">
      <p className="max-w-lg text-balance text-2xl font-medium tracking-tight sm:text-3xl">
        {isPtBR
          ? "Vamos construir algo que precise funcionar de verdade?"
          : "Let’s build something that needs to work for real."}
      </p>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
        {isPtBR
          ? "Estou aberto a boas conversas sobre engenharia full-stack, sistemas distribuídos e developer tools."
          : "I’m open to good conversations about full-stack engineering, distributed systems, and developer tools."}
      </p>

      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium">
        <a className="link-underline inline-flex items-center gap-1.5" href={`mailto:${DATA.contact.email}`}>
          <Mail className="size-4" aria-hidden />
          {isPtBR ? "Falar comigo" : "Email me"}
        </a>
        <a
          className="link-underline inline-flex items-center gap-1.5"
          href={DATA.contact.social.LinkedIn.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          LinkedIn
          <MoveUpRight className="size-3.5" aria-hidden />
        </a>
        <a className="link-underline inline-flex items-center gap-1.5" href={resumeHref} download>
          <FileDown className="size-4" aria-hidden />
          {isPtBR ? "Baixar currículo" : "Download résumé"}
        </a>
        <a className="link-underline inline-flex items-center gap-1.5" href={`/${locale}/agent`}>
          <Bot className="size-4" aria-hidden />
          {isPtBR ? "Perguntar ao agente" : "Ask the agent"}
        </a>
      </div>
    </footer>
  );
}
