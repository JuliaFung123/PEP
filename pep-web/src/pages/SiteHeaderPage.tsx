import * as React from "react"

import { PepDesignSystemPage, PepTopBar } from "@/components/pep-chrome"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

export function SiteHeaderPage() {
  const [search, setSearch] = React.useState("")

  return (
    <PepDesignSystemPage title="Site header" contentClassName="space-y-10">
      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Library</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-3 text-muted-foreground")}>
          No shadcn root component — closest pattern is{" "}
          <a
            href="https://ui.shadcn.com/blocks/sidebar"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            shadcn Site Header blocks
          </a>
          {" · "}
          <a
            href="https://www.figma.com/design/bRDWHAITfr5p6onqnKTf0q/--PEP-Web_Library?node-id=126-5145"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            PEP Figma Top Bar
          </a>
          . Composed from <code className="rounded bg-muted px-1 py-0.5 text-[11px]">Button</code> +{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">Input</code>.
        </p>

        <div className="space-y-3">
          <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>Default</div>
          <PepTopBar
            sticky={false}
            value={search}
            onChange={setSearch}
            searchPlaceholder="Placeholder"
            languageLabel="繁"
            className="p-0"
          />
        </div>
      </section>
    </PepDesignSystemPage>
  )
}
