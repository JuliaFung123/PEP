import * as React from "react"

import { computeRequiredFormProgress, FormBottom } from "@/components/form-bottom"
import type { FormMenuItemState } from "@/components/form-menu"
import { PepDesignSystemPage } from "@/components/pep-chrome"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

const DEMO_FORM_STEPS: { required?: boolean; state: FormMenuItemState }[] = [
  { required: true, state: "complete" },
  { required: true, state: "incomplete" },
  { required: true, state: "incomplete" },
  { state: "nested" },
  { required: true, state: "complete" },
  { required: true, state: "incomplete" },
  { required: true, state: "incomplete" },
]

/**
 * Block → Form bottom — Figma `Form_bottom`.
 */
export function FormBottomBlockPage() {
  const [showStandardProgress, setShowStandardProgress] = React.useState(true)
  const [showAllActionsProgress, setShowAllActionsProgress] = React.useState(true)
  const formProgress = computeRequiredFormProgress(DEMO_FORM_STEPS)

  return (
    <PepDesignSystemPage title="Form bottom" contentClassName="space-y-10">
      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Notes</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-3 text-muted-foreground")}>
          Footer block for forms. Use{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">FormBottom</code> for progress
          feedback and form actions instead of rebuilding the layout on each page. Progress reflects
          required form-menu sections completed (
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">computeRequiredFormProgress</code>
          ). Save stays disabled until progress reaches 100%.
        </p>
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Library</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-4 text-muted-foreground")}>
          <span className="font-medium text-foreground">
            Pick the composition that matches the form state.
          </span>
        </p>

        <div className="space-y-8">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>Cancel + Save</div>
              <div className="flex items-center gap-2">
                <Switch
                  id="form-bottom-standard-progress"
                  checked={showStandardProgress}
                  onCheckedChange={setShowStandardProgress}
                />
                <Label
                  htmlFor="form-bottom-standard-progress"
                  className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}
                >
                  Progress bar
                </Label>
              </div>
            </div>
            <FormBottom
              progress={showStandardProgress ? formProgress.progress : undefined}
              progressLabel={showStandardProgress ? formProgress.progressLabel : undefined}
              onCancel={() => undefined}
              onSave={() => undefined}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>
                Cancel + Delete + Light Save + Save
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="form-bottom-all-actions-progress"
                  checked={showAllActionsProgress}
                  onCheckedChange={setShowAllActionsProgress}
                />
                <Label
                  htmlFor="form-bottom-all-actions-progress"
                  className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}
                >
                  Progress bar
                </Label>
              </div>
            </div>
            <FormBottom
              progress={showAllActionsProgress ? formProgress.progress : undefined}
              progressLabel={showAllActionsProgress ? formProgress.progressLabel : undefined}
              showDelete
              showLightSave
              onCancel={() => undefined}
              onDelete={() => undefined}
              onLightSave={() => undefined}
              onSave={() => undefined}
            />
          </div>
        </div>
      </section>
    </PepDesignSystemPage>
  )
}
