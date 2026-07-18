import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { DATA, localize } from "@/data/resume"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/ui/panel"
import type { Locale } from "@/hooks/use-translation"

const ID = "about"

export function Hello({ locale }: { locale: Locale }) {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>About</a>
        </PanelTitle>
      </PanelHeader>
      <PanelContent className="typeset typeset-description py-(--typeset-flow)">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {localize(DATA.about, locale)}
        </ReactMarkdown>
      </PanelContent>
    </Panel>
  )
}
