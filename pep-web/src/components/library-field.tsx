import { Info } from "lucide-react"
import * as React from "react"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { cn } from "@/lib/utils"
import { typeToken } from "@/data/typography-tokens"

/**
 * Field library shell (§2 on `/preview/input-type`).
 * Use this for labeled controls — do not invent page-local `gap-*` / description sizes.
 */
export function LibraryField({
  label,
  description,
  descriptionTop,
  descriptionBottom,
  error,
  required,
  info,
  disabled,
  invalid,
  htmlFor,
  className,
  children,
}: {
  label: React.ReactNode
  /** Single helper under the label (layouts). */
  description?: React.ReactNode
  /** Field matrix: helper above the control. */
  descriptionTop?: React.ReactNode
  /** Field matrix: helper under the control / error. */
  descriptionBottom?: React.ReactNode
  error?: React.ReactNode
  required?: boolean
  info?: string
  disabled?: boolean
  invalid?: boolean
  htmlFor?: string
  className?: string
  children: React.ReactNode
}) {
  const hasError = Boolean(error) || invalid
  const top = descriptionTop ?? description

  return (
    <Field
      className={cn("min-w-0", className)}
      data-invalid={hasError || undefined}
      data-disabled={disabled || undefined}
    >
      <FieldLabel
        htmlFor={htmlFor}
        className={cn(
          "items-center gap-1.5",
          disabled && "pointer-events-none text-muted-foreground",
        )}
      >
        {label}
        {required ? <LibraryFieldRequiredMark disabled={disabled} /> : null}
        {info ? <LibraryFieldInfoHint content={info} disabled={disabled} /> : null}
      </FieldLabel>
      {top ? <FieldDescription>{top}</FieldDescription> : null}
      {children}
      {error ? <FieldError className="px-2.5">{error}</FieldError> : null}
      {descriptionBottom ? (
        <FieldDescription>{descriptionBottom}</FieldDescription>
      ) : null}
    </Field>
  )
}

/**
 * One control inside a field-group row (FieldSet → FieldGroup → Field).
 * Each box owns its invalid ring + FieldError — never a shared group-level error.
 */
export function LibraryFieldGroupItem({
  error,
  invalid,
  className,
  children,
}: {
  error?: React.ReactNode
  invalid?: boolean
  className?: string
  children: React.ReactNode
}) {
  const hasError = Boolean(error) || invalid

  return (
    <Field
      className={cn("min-w-0 gap-2", className)}
      data-invalid={hasError || undefined}
    >
      {children}
      {error ? <FieldError className="px-2.5">{error}</FieldError> : null}
    </Field>
  )
}

/** FieldSet shell matching Field library field-group rows. */
export function LibraryFieldSet({
  label,
  description,
  descriptionTop,
  descriptionBottom,
  error,
  required,
  info,
  disabled,
  invalid,
  className,
  children,
}: {
  label: React.ReactNode
  description?: React.ReactNode
  descriptionTop?: React.ReactNode
  descriptionBottom?: React.ReactNode
  error?: React.ReactNode
  required?: boolean
  info?: string
  disabled?: boolean
  invalid?: boolean
  className?: string
  children: React.ReactNode
}) {
  const hasError = Boolean(error) || invalid
  const top = descriptionTop ?? description

  return (
    <FieldSet
      className={cn("min-w-0 gap-2", className)}
      data-invalid={hasError || undefined}
      data-disabled={disabled || undefined}
      disabled={disabled || undefined}
    >
      <FieldLegend
        variant="label"
        className={cn(
          "mb-0 flex items-center gap-1.5",
          hasError && !disabled && "text-destructive",
          disabled && "pointer-events-none text-muted-foreground",
        )}
      >
        {label}
        {required ? <LibraryFieldRequiredMark disabled={disabled} /> : null}
        {info ? <LibraryFieldInfoHint content={info} disabled={disabled} /> : null}
      </FieldLegend>
      {top ? <FieldDescription>{top}</FieldDescription> : null}
      {children}
      {error ? (
        <FieldError className="px-2.5">{error}</FieldError>
      ) : null}
      {descriptionBottom ? (
        <FieldDescription>{descriptionBottom}</FieldDescription>
      ) : null}
    </FieldSet>
  )
}

function LibraryFieldRequiredMark({ disabled }: { disabled?: boolean }) {
  return (
    <span className={disabled ? "text-muted-foreground" : "text-destructive"} aria-hidden>
      *
    </span>
  )
}

function LibraryFieldInfoHint({
  content,
  disabled,
}: {
  content: string
  disabled?: boolean
}) {
  return (
    <span className={cn("group/info relative inline-flex")}>
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
          className={cn(typeToken("text-xs/normal"), "pointer-events-none absolute top-full left-1/2 z-20 mt-2 hidden w-52 -translate-x-1/2 rounded-md bg-popover px-3 py-2 leading-snug font-normal text-popover-foreground shadow-elevation-md ring-1 ring-border group-hover/info:block group-focus-within/info:block")}
        >
          {content}
        </span>
      )}
    </span>
  )
}
