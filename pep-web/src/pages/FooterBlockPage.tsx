import { PepDesignSystemPage, PepSiteFooter } from "@/components/pep-chrome"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

export function FooterBlockPage() {
  return (
    <PepDesignSystemPage title="Footer" contentClassName="space-y-10">
      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Notes</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-3 text-muted-foreground")}>
          No shadcn root <code className="rounded bg-muted px-1 py-0.5 text-[11px]">Footer</code>{" "}
          component — only community / marketing footer{" "}
          <a
            href="https://ui.shadcn.com/blocks"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            blocks
          </a>{" "}
          (multi-column, mega, etc.). PEP footer is a thin app chrome bar: copyright + legal links.
          Figma:{" "}
          <a
            href="https://www.figma.com/design/IZ6algHkFp6Z2a5dYiS1hC/PEP?node-id=1718-50647"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            Footer
          </a>
          . Semantic <code className="rounded bg-muted px-1 py-0.5 text-[11px]">&lt;footer&gt;</code>{" "}
          + tokens (<code className="rounded bg-muted px-1 py-0.5 text-[11px]">bg-sidebar-accent</code>
          , <code className="rounded bg-muted px-1 py-0.5 text-[11px]">text-primary</code> links).
        </p>
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Library</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-4 text-muted-foreground")}>
          <span className="font-medium text-foreground">Use this block for app page footers.</span>{" "}
          Keep copy / links configurable via props.
        </p>

        <div className="overflow-hidden rounded-lg border border-border p-0">
          <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground px-4 pt-3 pb-2")}>Default</div>
          <PepSiteFooter />
        </div>
      </section>
    </PepDesignSystemPage>
  )
}
