import { PepDesignSystemPage } from "@/components/pep-chrome"
import { Richtext } from "@/components/ui/richtext"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

/**
 * Component → Richtext — Figma PEP Web Library `4845:1506`.
 * @see https://www.figma.com/design/bRDWHAITfr5p6onqnKTf0q/--PEP-Web_Library?node-id=4845-1506
 */
export function RichtextPage() {
  return (
    <PepDesignSystemPage title="Richtext" contentClassName="space-y-10">
      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>
          Notes
        </h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-3 text-muted-foreground")}>
          PEP Figma{" "}
          <a
            href="https://www.figma.com/design/bRDWHAITfr5p6onqnKTf0q/--PEP-Web_Library?node-id=4845-1506"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            Richtext
          </a>
          . Composed shell: locale{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">ToggleGroup</code> (EN / 繁 /
          简) + formatting toolbar + resizable field. Two states:{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">default</code> (toolbar +
          placeholder) and{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">readonly</code> (filled
          content, no toolbar). Toolbar actions are visual-only in the library preview — wire to an
          editor when integrating.
        </p>
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>
          Library
        </h2>
        <div className="space-y-8">
          <div className="space-y-2">
            <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>
              State = default
            </div>
            <Richtext state="default" locale="zh-hant" />
          </div>

          <div className="space-y-2">
            <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>
              State = readonly
            </div>
            <Richtext state="readonly" locale="zh-hant" />
          </div>
        </div>
      </section>
    </PepDesignSystemPage>
  )
}
