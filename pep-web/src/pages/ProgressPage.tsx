import * as React from "react"

import { PepDesignSystemPage } from "@/components/pep-chrome"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress, ProgressCircle } from "@/components/ui/progress"

export function ProgressPage() {
  const [value, setValue] = React.useState(33)

  return (
    <PepDesignSystemPage title="Progress" contentClassName="space-y-10">
      <section>
        <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">Library</h2>
        <p className="mb-3 text-xs text-muted-foreground">
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

        <Card>
          <CardHeader>
            <CardTitle>Progress</CardTitle>
            <CardDescription className="!text-muted-foreground">
              One value input drives both the linear bar and the circle (0–100).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex max-w-md flex-col gap-4">
              <div className="flex items-center gap-3">
                <Label htmlFor="progress-value" className="shrink-0 text-xs text-muted-foreground">
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
                <div className="text-xs font-medium text-muted-foreground">Linear</div>
                <Progress value={value} className="w-full" />
              </div>

              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground">Circle</div>
                <ProgressCircle value={value} />
              </div>
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
