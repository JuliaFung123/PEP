import { Info } from "lucide-react"
import * as React from "react"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { cn } from "@/lib/utils"
import { typeToken } from "@/data/typography-tokens"

/**
 * PEP Field anatomy (matches Field library / Figma):
 *
 * Field
 * ├─ Label
 * ├─ Required
 * ├─ Hints              → optional ⓘ tooltip; minor remarks about the field
 * ├─ FieldDescription for Label
 * ├─ Input Group
 * ├─ Error
 * └─ FieldDescription for value (shown only when filled)
 */

/** Join per-box messages into one FieldError (multi-input fields). */
export function formatCombinedFieldErrors(messages: React.ReactNode[]) {
  const parts = messages.filter((message) => message != null && message !== "")
  if (parts.length === 0) return undefined
  if (parts.length === 1) return parts[0]
  return parts.join(", ")
}

/**
 * Input Group — layout container inside every Field.
 * Direct children must be §2 field controls (`data-slot="field-control"`), separators, or system slots.
 * Never paint invalid ring/border here; aria-invalid belongs on each control surface.
 */
export function LibraryFieldInputGroup({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      data-slot="field-input-group"
      className={cn("flex w-full min-w-0 flex-wrap items-start gap-1", className)}
    >
      {children}
    </div>
  )
}

/**
 * Field library shell (§2 on `/preview/input-type`).
 * Always wraps controls in Input Group. Use `error` or `errors[]` for FieldError.
 */
export function LibraryField({
  label,
  /** Optional ⓘ tooltip — less important remarks / hints about the field. */
  hints,
  /** @deprecated Use `hints`. */
  info,
  /** FieldDescription — explains the label (what this field is). Shorthand: `description`. */
  descriptionTop,
  description,
  /** FieldDescription — explains the input value. Shown only when `filled` is true. */
  descriptionBottom,
  /** When true, `descriptionBottom` is visible (field has a value). */
  filled,
  error,
  errors,
  required,
  disabled,
  invalid,
  htmlFor,
  className,
  inputGroupClassName,
  children,
}: {
  label: React.ReactNode
  hints?: string
  info?: string
  descriptionTop?: React.ReactNode
  description?: React.ReactNode
  descriptionBottom?: React.ReactNode
  filled?: boolean
  error?: React.ReactNode
  /** Merged into one FieldError via `formatCombinedFieldErrors`. */
  errors?: React.ReactNode[]
  required?: boolean
  disabled?: boolean
  invalid?: boolean
  htmlFor?: string
  className?: string
  inputGroupClassName?: string
  children: React.ReactNode
}) {
  const combinedError =
    error ?? (errors?.length ? formatCombinedFieldErrors(errors) : undefined)
  const hasError = Boolean(combinedError) || invalid
  const hintTooltip = hints ?? info
  const topDescription = descriptionTop ?? description

  return (
    <Field
      className={cn("min-w-0", className)}
      data-invalid={hasError || undefined}
      data-disabled={disabled || undefined}
    >
      <div
        data-slot="field-label-row"
        className="flex w-full min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0"
      >
        <FieldLabel
          htmlFor={htmlFor}
          className={cn(
            "w-auto gap-0",
            hasError && !disabled && "text-destructive",
            disabled && "pointer-events-none text-muted-foreground",
          )}
        >
          {label}
        </FieldLabel>
        {required ? (
          <LibraryFieldRequiredMark disabled={disabled} />
        ) : null}
        {hintTooltip ? (
          <LibraryFieldHints content={hintTooltip} disabled={disabled} />
        ) : null}
      </div>

      {topDescription ? (
        <FieldDescription data-slot="field-description-top" className="-mt-1">
          {topDescription}
        </FieldDescription>
      ) : null}

      <LibraryFieldInputGroup className={inputGroupClassName}>
        {children}
      </LibraryFieldInputGroup>

      {combinedError ? <FieldError className="px-2.5">{combinedError}</FieldError> : null}

      {filled && descriptionBottom ? (
        <FieldDescription
          data-slot="field-description-bottom"
          className="mt-0"
        >
          {descriptionBottom}
        </FieldDescription>
      ) : null}
    </Field>
  )
}

/** @deprecated Alias for `LibraryField` (Input Group is always used). */
export function LibraryFieldSet(props: React.ComponentProps<typeof LibraryField>) {
  return <LibraryField {...props} />
}

function LibraryFieldRequiredMark({ disabled }: { disabled?: boolean }) {
  return (
    <span
      data-slot="field-required"
      className={disabled ? "text-muted-foreground" : "text-destructive"}
      aria-hidden
    >
      *
    </span>
  )
}

/** Hints — info icon with tooltip on hover/focus. */
function LibraryFieldHints({
  content,
  disabled,
}: {
  content: string
  disabled?: boolean
}) {
  return (
    <span data-slot="field-hints" className="group/hints relative inline-flex">
      <button
        type="button"
        disabled={disabled}
        className="inline-flex size-5 items-center justify-center rounded-full text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:text-muted-foreground"
        aria-label={content}
      >
        <Info className="size-4" aria-hidden />
      </button>
      {disabled ? null : (
        <span
          role="tooltip"
          className={cn(
            typeToken("text-xs/normal"),
            "pointer-events-none absolute top-full left-1/2 z-20 mt-2 hidden w-52 -translate-x-1/2 rounded-md bg-popover px-3 py-2 leading-snug font-normal text-popover-foreground shadow-elevation-md ring-1 ring-border group-hover/hints:block group-focus-within/hints:block",
          )}
        >
          {content}
        </span>
      )}
    </span>
  )
}
