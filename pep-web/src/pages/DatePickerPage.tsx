import * as React from "react"

import {
  FieldDate,
  FieldDateBirth,
  FieldDateInput,
  FieldDateRange,
  FieldTime,
} from "@/components/field-library-controls"
import { LibraryField } from "@/components/library-field"
import { PepDesignSystemPage } from "@/components/pep-chrome"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

const DEMO_DATE = new Date(2026, 3, 14)
const DEMO_BIRTH = new Date(1990, 5, 15)
const DEMO_RANGE = {
  from: new Date(2026, 3, 1),
  to: new Date(2026, 3, 30),
}

function VariantField({
  label,
  descriptionTop,
  descriptionBottom,
  hints,
  filled = true,
  required,
  error,
  invalid,
  disabled,
  inputGroupClassName,
  children,
}: {
  label: string
  descriptionTop?: string
  descriptionBottom?: string
  hints?: string
  filled?: boolean
  required?: boolean
  error?: string
  invalid?: boolean
  disabled?: boolean
  inputGroupClassName?: string
  children: React.ReactNode
}) {
  return (
    <LibraryField
      className="max-w-sm"
      label={label}
      descriptionTop={descriptionTop}
      descriptionBottom={descriptionBottom}
      hints={hints}
      filled={filled}
      required={required}
      error={error}
      invalid={invalid}
      disabled={disabled}
      inputGroupClassName={inputGroupClassName}
    >
      {children}
    </LibraryField>
  )
}

export function DatePickerPage() {
  return (
    <PepDesignSystemPage title="Datepicker" contentClassName="space-y-10">
      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>
          Notes
        </h2>
        <p className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>
          Each variant uses{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">LibraryField</code>:{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">descriptionTop</code> describes
          the label,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">descriptionBottom</code>{" "}
          describes the value (only when filled),{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">hints</code> is an optional ⓘ
          remark. Display format is{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">YYYY/MM/DD</code>.
        </p>
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-4 tracking-tight text-foreground")}>
          Library
        </h2>
        <div className="space-y-10">
          <VariantField
            label="Default"
            descriptionTop="Pick one calendar date for this field."
            descriptionBottom="Stored and shown as YYYY/MM/DD."
          >
            <FieldDate defaultValue={DEMO_DATE} placeholder="Pick a date" />
          </VariantField>

          <VariantField
            label="Range picker"
            descriptionTop="Select a start and end date together."
            descriptionBottom="Value is a date range; both dates use YYYY/MM/DD."
          >
            <FieldDateRange defaultValue={DEMO_RANGE} placeholder="Pick a date range" />
          </VariantField>

          <VariantField
            label="Date of birth"
            descriptionTop="Birth date for the person or profile."
            descriptionBottom="Future dates are not allowed."
            hints="Year and month use dropdowns in the calendar."
            required
          >
            <FieldDateBirth defaultValue={DEMO_BIRTH} />
          </VariantField>

          <VariantField
            label="Input"
            descriptionTop="Type or pick a single date."
            descriptionBottom="Typed input must match YYYY/MM/DD."
            hints="Press Arrow Down to open the calendar."
          >
            <FieldDateInput defaultValue={DEMO_DATE} />
          </VariantField>

          <VariantField
            label="Date and time"
            descriptionTop="Publish moment — date plus time of day."
            descriptionBottom="Date is YYYY/MM/DD; time uses the native time control."
            required
            inputGroupClassName="flex flex-wrap gap-1"
          >
            <FieldDate defaultValue={DEMO_DATE} placeholder="日期" className="min-w-[160px] flex-1" />
            <FieldTime defaultValue="14:30" className="min-w-[120px] flex-1" />
          </VariantField>
        </div>
      </section>
    </PepDesignSystemPage>
  )
}
