import { CalendarIcon, ChevronDownIcon } from "lucide-react"
import * as React from "react"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  DATE_DISPLAY_PLACEHOLDER,
  formatDisplayDate,
  formatDisplayDateRange,
  parseDisplayDate,
} from "@/lib/date-format"
import { inputTrailingIconButtonClassName } from "@/lib/input-surface-classes"
import { cn } from "@/lib/utils"

const triggerClassName = (hasValue: boolean) =>
  cn(
    "w-full justify-start gap-2 text-left font-normal",
    !hasValue && "text-muted-foreground",
  )

/** shadcn default — single date, outline trigger + calendar popover. */
export function DatePicker({
  value: valueProp,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date",
  disabled,
  className,
}: {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}) {
  const [uncontrolled, setUncontrolled] = React.useState<Date | undefined>(defaultValue)
  const [open, setOpen] = React.useState(false)
  const date = valueProp ?? uncontrolled
  const setDate = (next: Date | undefined) => {
    if (valueProp === undefined) setUncontrolled(next)
    onValueChange?.(next)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(triggerClassName(Boolean(date)), className)}
        >
          <CalendarIcon className="size-4 shrink-0 opacity-60" aria-hidden />
          {date ? formatDisplayDate(date) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          defaultMonth={date}
          onSelect={(next) => {
            setDate(next)
            setOpen(false)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

/** shadcn range — two-month calendar, range selection. */
export function DatePickerRange({
  value: valueProp,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date range",
  disabled,
  className,
}: {
  value?: DateRange
  defaultValue?: DateRange
  onValueChange?: (range: DateRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}) {
  const [uncontrolled, setUncontrolled] = React.useState<DateRange | undefined>(defaultValue)
  const [open, setOpen] = React.useState(false)
  const range = valueProp ?? uncontrolled
  const setRange = (next: DateRange | undefined) => {
    if (valueProp === undefined) setUncontrolled(next)
    onValueChange?.(next)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(triggerClassName(Boolean(range?.from)), className)}
        >
          <CalendarIcon className="size-4 shrink-0 opacity-60" aria-hidden />
          {formatDisplayDateRange(range, placeholder)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          numberOfMonths={2}
          selected={range}
          defaultMonth={range?.from}
          onSelect={setRange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

const BIRTH_START = new Date(1920, 0, 1)
const BIRTH_END = new Date()

/** shadcn date of birth — month/year dropdowns, no future dates. */
export function DatePickerBirth({
  value: valueProp,
  defaultValue,
  onValueChange,
  placeholder = "Select date of birth",
  disabled,
  className,
}: {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}) {
  const [uncontrolled, setUncontrolled] = React.useState<Date | undefined>(defaultValue)
  const [open, setOpen] = React.useState(false)
  const date = valueProp ?? uncontrolled
  const setDate = (next: Date | undefined) => {
    if (valueProp === undefined) setUncontrolled(next)
    onValueChange?.(next)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(triggerClassName(Boolean(date)), className)}
        >
          <CalendarIcon className="size-4 shrink-0 opacity-60" aria-hidden />
          {date ? formatDisplayDate(date) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          startMonth={BIRTH_START}
          endMonth={BIRTH_END}
          defaultMonth={date ?? new Date(1990, 0, 1)}
          selected={date}
          disabled={(day) => day > BIRTH_END}
          onSelect={(next) => {
            setDate(next)
            setOpen(false)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

/** shadcn input + calendar — typed date synced with popover. */
export function DatePickerInput({
  value: valueProp,
  defaultValue,
  onValueChange,
  placeholder = DATE_DISPLAY_PLACEHOLDER,
  disabled,
  className,
}: {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}) {
  const [uncontrolled, setUncontrolled] = React.useState<Date | undefined>(defaultValue)
  const [open, setOpen] = React.useState(false)
  const [month, setMonth] = React.useState<Date | undefined>(defaultValue)
  const date = valueProp ?? uncontrolled
  const setDate = (next: Date | undefined) => {
    if (valueProp === undefined) setUncontrolled(next)
    onValueChange?.(next)
  }
  const [inputValue, setInputValue] = React.useState(() =>
    defaultValue ? formatDisplayDate(defaultValue) : "",
  )

  React.useEffect(() => {
    if (date) {
      setInputValue(formatDisplayDate(date))
      setMonth(date)
    }
  }, [date])

  const commitInput = (raw: string) => {
    setInputValue(raw)
    const parsed = parseDisplayDate(raw)
    if (parsed) {
      setDate(parsed)
      setMonth(parsed)
    } else if (!raw.trim()) {
      setDate(undefined)
    }
  }

  return (
    <div className={cn("relative max-w-xs", className)}>
      <Input
        value={inputValue}
        placeholder={placeholder}
        disabled={disabled}
        className="bg-background pr-9"
        onChange={(e) => commitInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault()
            setOpen(true)
          }
        }}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            aria-label="Open calendar"
            onMouseDown={(e) => e.preventDefault()}
            className={inputTrailingIconButtonClassName}
          >
            <CalendarIcon className="size-4 shrink-0" aria-hidden />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            month={month}
            onMonthChange={setMonth}
            selected={date}
            onSelect={(next) => {
              setDate(next)
              if (next) {
                setInputValue(formatDisplayDate(next))
                setMonth(next)
              }
              setOpen(false)
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

/** shadcn date + time — calendar trigger and native time input. */
export function DatePickerDateTime({
  date: dateProp,
  defaultDate,
  onDateChange,
  time: timeProp,
  defaultTime = "09:00",
  onTimeChange,
  disabled,
  className,
}: {
  date?: Date
  defaultDate?: Date
  onDateChange?: (date: Date | undefined) => void
  time?: string
  defaultTime?: string
  onTimeChange?: (time: string) => void
  disabled?: boolean
  className?: string
}) {
  const [uncontrolledDate, setUncontrolledDate] = React.useState<Date | undefined>(defaultDate)
  const [uncontrolledTime, setUncontrolledTime] = React.useState(defaultTime)
  const [open, setOpen] = React.useState(false)
  const date = dateProp ?? uncontrolledDate
  const time = timeProp ?? uncontrolledTime

  const setDate = (next: Date | undefined) => {
    if (dateProp === undefined) setUncontrolledDate(next)
    onDateChange?.(next)
  }
  const setTime = (next: string) => {
    if (timeProp === undefined) setUncontrolledTime(next)
    onTimeChange?.(next)
  }

  return (
    <div className={cn("flex max-w-sm flex-wrap gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className={cn("min-w-[160px] flex-1 justify-between font-normal", !date && "text-muted-foreground")}
          >
            {date ? formatDisplayDate(date) : "Select date"}
            <ChevronDownIcon className="size-4 opacity-60" aria-hidden />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            captionLayout="dropdown"
            onSelect={(next) => {
              setDate(next)
              setOpen(false)
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Input
        type="time"
        value={time}
        disabled={disabled}
        step={60}
        onChange={(e) => setTime(e.target.value)}
        className="w-[120px] appearance-none bg-background tabular-nums [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      />
    </div>
  )
}
