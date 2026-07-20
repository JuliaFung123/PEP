import * as React from "react"

import { PepDesignSystemPage } from "@/components/pep-chrome"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress, ProgressCircle } from "@/components/ui/progress"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

export function ProgressPage() {
  const [value, setValue] = React.useState(33)

  return (
    <PepDesignSystemPage title="Progress" contentClassName="space-y-10">
      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Library</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-3 text-muted-foreground")}>
          Linear:{" "}
          <a
            href="https://ui.shadcn.com/docs/components/progress"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            shadcn/ui Progress
          </a>
          . Circle: PEP Figma{" "}
          <a
            href="https://www.figma.com/design/bRDWHAITfr5p6onqnKTf0q/--PEP-Web_Library?node-id=5313-9325"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            Progress circle
          </a>{" "}
          (40px) — not in stock shadcn.
        </p>

        <div className="flex max-w-md flex-col gap-4">
          <div className="flex items-center gap-3">
            <Label htmlFor="progress-value" className={cn(typeToken("text-xs/normal"), "shrink-0 text-muted-foreground")}>
              Value
            </Label>
            <Input
              id="progress-value"
              type="number"
              min={0}
              max={100}
              step={1}
              value={value}
              onChange={(e) => {
                const next = Number(e.target.value)
                if (Number.isNaN(next)) return
                setValue(Math.min(100, Math.max(0, next)))
              }}
              className="w-24"
              aria-label="Progress value"
            />
          </div>

          <div className="space-y-2">
            <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>Linear</div>
            <Progress value={value} className="w-full" />
          </div>

          <div className="space-y-2">
            <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>Circle</div>
            <ProgressCircle value={value} />
          </div>
        </div>
      </section>
    </PepDesignSystemPage>
  )
}
