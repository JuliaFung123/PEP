import { format, isValid, parse } from "date-fns"
import type { DateRange } from "react-day-picker"

/** PEP standard display format — YYYY/MM/DD */
export const DATE_DISPLAY_FORMAT = "yyyy/MM/dd" as const

/** Placeholder hint for empty date fields */
export const DATE_DISPLAY_PLACEHOLDER = "YYYY/MM/DD" as const

export function formatDisplayDate(date: Date): string {
  return format(date, DATE_DISPLAY_FORMAT)
}

export function parseDisplayDate(raw: string, referenceDate = new Date()): Date | undefined {
  const parsed = parse(raw.trim(), DATE_DISPLAY_FORMAT, referenceDate)
  return isValid(parsed) ? parsed : undefined
}

export function formatDisplayDateRange(
  range: DateRange | undefined,
  placeholder = "Pick a date range",
): string {
  if (!range?.from) return placeholder
  if (!range.to) return formatDisplayDate(range.from)
  return `${formatDisplayDate(range.from)} – ${formatDisplayDate(range.to)}`
}
