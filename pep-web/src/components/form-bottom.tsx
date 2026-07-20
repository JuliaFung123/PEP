import * as React from "react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { typeToken } from "@/data/typography-tokens"
import type { FormMenuItemState } from "@/components/form-menu"

export type FormProgressStep = {
  required?: boolean
  state: FormMenuItemState
}

/** Required form-menu sections completed ÷ total required sections. */
export function computeRequiredFormProgress(steps: FormProgressStep[]) {
  const requiredSteps = steps.filter((step) => step.required)
  const finishedCount = requiredSteps.filter((step) => step.state === "complete").length
  const totalCount = requiredSteps.length
  const progress = totalCount === 0 ? 100 : Math.round((finishedCount / totalCount) * 100)

  return {
    progress,
    progressLabel: `${finishedCount}/${totalCount}`,
    canSave: totalCount === 0 || finishedCount === totalCount,
  }
}

/**
 * Form sheet footer (Figma `Form_bottom`).
 * Progress bar + caption, then Cancel / optional Delete / Save actions.
 */
export function FormBottom({
  progress,
  progressLabel,
  onCancel,
  onSave,
  onDelete,
  cancelLabel = "Cancel",
  saveLabel = "Save",
  deleteLabel = "Delete",
  showCancel = true,
  showSave = true,
  showDelete = false,
  /** Soft primary “Save” (Light) — when both Save variants are shown in the Figma All state. */
  showLightSave = false,
  lightSaveLabel = "Save",
  onLightSave,
  saveDisabled,
  className,
  actions,
}: {
  /** 0–100. Omit to hide the progress block. */
  progress?: number
  progressLabel?: React.ReactNode
  onCancel?: () => void
  onSave?: () => void
  onDelete?: () => void
  onLightSave?: () => void
  cancelLabel?: string
  saveLabel?: string
  deleteLabel?: string
  lightSaveLabel?: string
  showCancel?: boolean
  showSave?: boolean
  showDelete?: boolean
  showLightSave?: boolean
  /** When omitted and `progress` is set, Save stays disabled until progress reaches 100. */
  saveDisabled?: boolean
  className?: string
  /** Replace default button row entirely. */
  actions?: React.ReactNode
}) {
  const showProgress = progress != null
  const isSaveDisabled = saveDisabled ?? (progress != null && progress < 100)

  return (
    <div
      data-slot="form-bottom"
      className={cn(
        "flex shrink-0 flex-col items-center justify-center gap-6 bg-background px-5 py-4",
        className,
      )}
    >
      {showProgress ? (
        <div className="flex w-full flex-col items-center gap-1">
          <Progress value={progress} className="w-full gap-0" />
          {progressLabel != null ? (
            <p className={cn(typeToken("text-xs/normal"), "leading-4 text-muted-foreground tabular-nums")}>{progressLabel}</p>
          ) : null}
        </div>
      ) : null}

      {actions ?? (
        <div className="flex items-center gap-6">
          {showCancel ? (
            <Button type="button" variant="ghost" size="default" onClick={onCancel}>
              {cancelLabel}
            </Button>
          ) : null}
          {showDelete ? (
            <Button type="button" variant="destructive" size="default" onClick={onDelete}>
              {deleteLabel}
            </Button>
          ) : null}
          {showLightSave ? (
            <Button type="button" variant="Light" size="default" onClick={onLightSave}>
              {lightSaveLabel}
            </Button>
          ) : null}
          {showSave ? (
            <Button type="button" size="default" disabled={isSaveDisabled} onClick={onSave}>
              {saveLabel}
            </Button>
          ) : null}
        </div>
      )}
    </div>
  )
}
