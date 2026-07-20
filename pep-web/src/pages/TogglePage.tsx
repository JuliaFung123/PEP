import { Bold, Bookmark, Italic } from "lucide-react"

import { PepDesignSystemPage } from "@/components/pep-chrome"
import { Toggle } from "@/components/ui/toggle"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

export function TogglePage() {
  return (
    <PepDesignSystemPage title="Toggle" contentClassName="space-y-10">
      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Notes</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-3 text-muted-foreground")}>
          A two-state button for one independently selectable option. Its selected state is exposed
          with <code className="rounded bg-muted px-1 py-0.5 text-[11px]">aria-pressed</code>.
        </p>
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Library</h2>
        <div className="space-y-8">
          <div className="space-y-2">
            <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>Default</div>
            <Toggle aria-label="Toggle bold">
              <Bold aria-hidden />
              Bold
            </Toggle>
          </div>

          <div className="space-y-2">
            <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>Outline</div>
            <Toggle variant="outline" aria-label="Toggle italic">
              <Italic aria-hidden />
              Italic
            </Toggle>
          </div>

          <div className="space-y-2">
            <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>Sizes</div>
            <div className="flex flex-wrap items-center gap-2">
              <Toggle variant="outline" size="sm" aria-label="Toggle small">
                Small
              </Toggle>
              <Toggle variant="outline" size="default" aria-label="Toggle default">
                Default
              </Toggle>
              <Toggle variant="outline" size="lg" aria-label="Toggle large">
                Large
              </Toggle>
            </div>
          </div>

          <div className="space-y-2">
            <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>Selected</div>
            <Toggle defaultPressed aria-label="Toggle bookmark">
              <Bookmark aria-hidden />
              Bookmarked
            </Toggle>
          </div>

          <div className="space-y-2">
            <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>Disabled</div>
            <Toggle disabled aria-label="Disabled toggle">
              <Bold aria-hidden />
              Bold
            </Toggle>
          </div>
        </div>
      </section>
    </PepDesignSystemPage>
  )
}
