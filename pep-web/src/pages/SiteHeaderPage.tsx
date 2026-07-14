import * as React from "react"

import { PepDesignSystemPage, PepTopBar } from "@/components/pep-chrome"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SiteHeaderPage() {
  const [search, setSearch] = React.useState("")

  return (
    <PepDesignSystemPage title="Site header" contentClassName="space-y-10">
      <section>
        <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">Library</h2>
        <p className="mb-3 text-xs text-muted-foreground">
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

        <Card>
          <CardHeader>
            <CardTitle>Site header</CardTitle>
            <CardDescription className="!text-muted-foreground">
              Menu trigger, global search, and utility actions (language / theme / notifications).
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground">Default</div>
              <PepTopBar
                sticky={false}
                value={search}
                onChange={setSearch}
                searchPlaceholder="Placeholder"
                languageLabel="繁"
                className="p-0"
              />
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Use Light / Dark in the sidebar to verify tokens.
          </CardFooter>
        </Card>
      </section>
    </PepDesignSystemPage>
  )
}
