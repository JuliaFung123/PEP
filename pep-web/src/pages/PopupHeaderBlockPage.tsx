import { PencilIcon, Send } from "lucide-react"

import { PepDesignSystemPage, PepPopupHeader } from "@/components/pep-chrome"
import { Button } from "@/components/ui/button"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

/**
 * Block → Header-Popup — Figma `header/Popup`.
 * @see https://www.figma.com/design/IZ6algHkFp6Z2a5dYiS1hC/PEP?node-id=477-19893
 */
export function PopupHeaderBlockPage() {
  return (
    <PepDesignSystemPage title="Header-Popup" contentClassName="space-y-10">
      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Notes</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-3 text-muted-foreground")}>
          Figma{" "}
          <a
            href="https://www.figma.com/design/IZ6algHkFp6Z2a5dYiS1hC/PEP?node-id=477-19893"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            header/Popup
          </a>
          . Use inside full-page popups (e.g. 新增活動). Differs from{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">header/Page</code> (
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">PepPageHeader</code>
          ): popup header is{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">text-lg</code>, includes a built-in
          close control, and sits at the top of a dialog shell. Compose with{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">PepPopupHeader</code> +{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">Button</code>.
        </p>
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Library</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-4 text-muted-foreground")}>
          <span className="font-medium text-foreground">Always pick from here for popup form titles.</span>{" "}
          Pass primary actions before close; close is always last.
        </p>

        <div className="space-y-8">
          <div className="space-y-2">
            <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>Title + close</div>
            <PepPopupHeader title="新增活動" onClose={() => undefined} />
          </div>

          <div className="space-y-2">
            <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>
              Primary action + close (Publish)
            </div>
            <PepPopupHeader
              title="新增活動"
              onClose={() => undefined}
              actions={
                <Button type="button" size="default" className="gap-1.5">
                  <Send className="size-4" aria-hidden />
                  Publish
                </Button>
              }
            />
          </div>

          <div className="space-y-2">
            <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>Icon + primary + close</div>
            <PepPopupHeader
              title="Text"
              onClose={() => undefined}
              actions={
                <>
                  <Button type="button" size="icon" aria-label="Edit">
                    <PencilIcon className="size-4" aria-hidden />
                  </Button>
                  <Button type="button" size="default" className="gap-1.5">
                    <Send className="size-4" aria-hidden />
                    Publish
                  </Button>
                </>
              }
            />
          </div>
        </div>
      </section>
    </PepDesignSystemPage>
  )
}
