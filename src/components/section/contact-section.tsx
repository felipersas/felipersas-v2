import Link from "next/link";
import { DATA } from "@/data/resume";
import { getTranslationsServer } from "@/lib/i18n-server";
import { Locale } from "@/hooks/use-translation";
import { CopyEmailButton } from "@/components/section/copy-email-button";

export default async function ContactSection({ locale }: { locale: Locale }) {
  const { t } = await getTranslationsServer(locale);

  const githubHandle = DATA.contact.social.GitHub.url.replace("https://", "");
  const linkedinHandle = DATA.contact.social.LinkedIn.url.replace("https://", "");

  return (
    <div className="font-mono text-sm">
      <div className="text-muted-foreground mb-4">
        <span className="text-accent">$</span> ./contact --help
      </div>
      <div className="space-y-2">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-accent shrink-0">--email</span>
          <Link
            href={DATA.contact.social.email.url}
            className="text-foreground hover:text-accent transition-colors"
          >
            {DATA.contact.email}
          </Link>
          <CopyEmailButton email={DATA.contact.email} />
        </div>
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-accent shrink-0">--github</span>
          <Link
            href={DATA.contact.social.GitHub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-accent transition-colors"
          >
            {githubHandle}
          </Link>
        </div>
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-accent shrink-0">--linkedin</span>
          <Link
            href={DATA.contact.social.LinkedIn.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-accent transition-colors"
          >
            {linkedinHandle}
          </Link>
        </div>
      </div>
      <div className="text-muted-foreground mt-4 text-xs">
        <span className="text-accent">{"//"}</span> {t("contact.afterLinkedin")}
      </div>
    </div>
  );
}
