import { Bold, Italic, Underline } from "lucide-react"

import { PepDesignSystemPage } from "@/components/pep-chrome"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

export function ButtonGroupPage() {
  return (
    <PepDesignSystemPage title="Button group" contentClassName="space-y-10">
      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Notes</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-3 text-muted-foreground")}>
          Groups related actions into one control. Compose{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">ButtonGroup</code> with existing{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">Button</code> variants and sizes.
          For controls with a persistent selected state, shadcn uses{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">ToggleGroup</code>.
        </p>
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Library</h2>
        <div className="space-y-8">
          <div className="space-y-2">
            <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>Text actions</div>
            <ButtonGroup>
              <Button type="button" variant="outline">Previous</Button>
              <Button type="button" variant="outline">Current</Button>
              <Button type="button" variant="outline">Next</Button>
            </ButtonGroup>
          </div>

          <div className="space-y-2">
            <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>Icon actions</div>
            <ButtonGroup>
              <Button type="button" variant="outline" size="icon-sm" aria-label="Bold">
                <Bold aria-hidden />
              </Button>
              <Button type="button" variant="outline" size="icon-sm" aria-label="Italic">
                <Italic aria-hidden />
              </Button>
              <Button type="button" variant="outline" size="icon-sm" aria-label="Underline">
                <Underline aria-hidden />
              </Button>
            </ButtonGroup>
          </div>

          <div className="space-y-2">
            <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>Vertical</div>
            <ButtonGroup orientation="vertical">
              <Button type="button" variant="outline">Top</Button>
              <Button type="button" variant="outline">Middle</Button>
              <Button type="button" variant="outline">Bottom</Button>
            </ButtonGroup>
          </div>
        </div>
      </section>
    </PepDesignSystemPage>
  )
}
