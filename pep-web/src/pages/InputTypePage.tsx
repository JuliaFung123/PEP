import * as React from 'react'
import {
  CalendarIcon,
  ChevronDown,
  ChevronRight,
  Check,
  Clock,
  Info,
  Paperclip,
  XCircle,
} from 'lucide-react'
import { format } from 'date-fns'
import type { DateRange } from 'react-day-picker'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { inputSurfaceClassName } from '@/lib/input-surface-classes'
import {
  FIELD_FRAMEWORK_DIFFERENCES,
  FIELD_INPUT_SECTIONS,
  FIELD_LIBRARY_ROWS,
  FIELD_PENDING_ROWS,
  type FieldInputId,
  type FieldInputRow,
} from '@/data/field-input-registry'
import { PepDesignSystemPage } from '@/components/pep-chrome'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

/** Field matrix frame — Value Types + FieldSet / FieldGroup (ignore readonly in Figma). */

type ValueTypeId = FieldInputId

type InteractionKey =
  | 'empty-enabled'
  | 'filled-enabled'
  | 'empty-disabled'
  | 'error'

const INTERACTION_OPTIONS: { key: InteractionKey; label: string }[] = [
  { key: 'empty-enabled', label: 'Empty' },
  { key: 'filled-enabled', label: 'Filled' },
  { key: 'empty-disabled', label: 'Disable' },
  { key: 'error', label: 'Error' },
]

const SAMPLE_TEXT = 'Input value'
/** Filled Text column — matches PEP Web Library row reference (Figma 5358:9880). */
const TEXT_FILLED_EXAMPLE = 'Example Value'
const SAMPLE_TEXTAREA = 'Longer sample value for textarea fields.'
// Field preview — interaction rules:
// - enabled: no elevation (match shadcn)
// - hover: shadow-elevation-md, no ring
// - focus: ring only, no elevation
// - click: movement only (no overlay fill)
const INPUT_HOVER_ELEVATION_MD = 'hover:shadow-elevation-md'
const INPUT_FOCUS_NO_ELEVATION = 'focus-visible:shadow-none focus-within:shadow-none'
// Use `focus:*` (not only `focus-visible:*`) so mouse click focus also shows the ring.
const INPUT_FOCUS_RING =
  'focus:border-ring focus:ring-3 focus:ring-ring/50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50'
// Click: no visual effect (keep default pointer behavior only)
// (Override Button base: `active:not-aria-[haspopup]:translate-y-px`)
const INPUT_NO_CLICK_EFFECT =
  'active:bg-transparent active:translate-y-0 active:not-aria-[haspopup]:translate-y-0'
const INPUT_NO_HOVER_FILL = 'hover:bg-transparent'
const INPUT_NO_OPEN_FILL = 'aria-expanded:bg-transparent'

const INPUT_OPEN_RING =
  'aria-expanded:border-ring aria-expanded:ring-3 aria-expanded:ring-ring/50 aria-expanded:shadow-none'

const INPUT_INVALID_CHROME =
  'rounded-lg ring-3 ring-destructive/20 [&_[data-slot=input]]:border-destructive [&_[data-slot=input]]:shadow-none [&_[data-slot=input]]:ring-3 [&_[data-slot=input]]:ring-destructive/20 [&_[data-slot=button]]:border-destructive [&_[data-slot=button]]:shadow-none [&_[data-slot=button]]:ring-3 [&_[data-slot=button]]:ring-destructive/20 [&>textarea]:border-destructive [&>textarea]:shadow-none [&>textarea]:ring-3 [&>textarea]:ring-destructive/20'

// Back-compat aliases (keep changes localized; remove later if desired)
const HOVER_ELEVATION_MD = `${INPUT_HOVER_ELEVATION_MD} ${INPUT_FOCUS_NO_ELEVATION}`
const HOVER_BG_TRANSPARENT = `${INPUT_NO_HOVER_FILL} ${INPUT_NO_OPEN_FILL} active:bg-transparent`
const FOCUS_RING = INPUT_FOCUS_RING

/** Demo date when “filled” interaction is selected (Apr 14, 2026). */
const DEMO_DATE = new Date(2026, 3, 14)
/** DatetimeRange row — Figma 5329:9597 (start / end). */
const DEMO_DATETIME_RANGE_START_DATE = new Date(2026, 3, 1)
const DEMO_DATETIME_RANGE_END_DATE = new Date(2026, 3, 30)

function formatDateRangeLabel(range: DateRange | undefined) {
  if (!range?.from) return 'Pick a date range'
  if (!range.to) return format(range.from, 'LLL dd, y')
  return `${format(range.from, 'LLL dd, y')} - ${format(range.to, 'LLL dd, y')}`
}

const MULTI_OPTIONS = [
  'Design',
  'Engineering',
  'Product',
  'Marketing',
  'Sales',
  'Support',
  'Finance',
  'Operations',
  'HR',
  'Legal',
] as const

function PreviewDatePicker({
  disabled,
  filled,
  className,
  /** When `filled`, use this date instead of `DEMO_DATE` (e.g. DatetimeRange start/end). */
  filledDate,
}: {
  disabled: boolean
  filled: boolean
  className?: string
  filledDate?: Date
}) {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    setDate(filled ? (filledDate ?? DEMO_DATE) : undefined)
  }, [filled, filledDate])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            inputSurfaceClassName,
            'w-full max-w-full justify-between gap-2 text-left font-normal',
            !date && 'text-muted-foreground',
            INPUT_HOVER_ELEVATION_MD,
            INPUT_FOCUS_NO_ELEVATION,
            INPUT_FOCUS_RING,
            INPUT_NO_HOVER_FILL,
            INPUT_NO_OPEN_FILL,
            INPUT_NO_CLICK_EFFECT,
            INPUT_OPEN_RING,
            className,
          )}
        >
          <span className="min-w-0 truncate">{date ? format(date, 'PPP') : 'Pick a date'}</span>
          <CalendarIcon className="size-4 shrink-0 text-muted-foreground opacity-60" aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            setDate(d)
            setOpen(false)
          }}
          defaultMonth={date ?? DEMO_DATE}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

/** shadcn-style date range — `Calendar` `mode="range"` + two months. */
function PreviewDateRangePicker({ disabled, filled }: { disabled: boolean; filled: boolean }) {
  const [range, setRange] = React.useState<DateRange | undefined>(undefined)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    setRange(
      filled
        ? { from: DEMO_DATETIME_RANGE_START_DATE, to: DEMO_DATETIME_RANGE_END_DATE }
        : undefined,
    )
  }, [filled])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            inputSurfaceClassName,
            'w-full max-w-full justify-between gap-2 text-left font-normal',
            !range?.from && 'text-muted-foreground',
            INPUT_HOVER_ELEVATION_MD,
            INPUT_FOCUS_NO_ELEVATION,
            INPUT_FOCUS_RING,
            INPUT_NO_HOVER_FILL,
            INPUT_NO_OPEN_FILL,
            INPUT_NO_CLICK_EFFECT,
            INPUT_OPEN_RING,
          )}
        >
          <span className="min-w-0 truncate">{formatDateRangeLabel(range)}</span>
          <CalendarIcon className="size-4 shrink-0 text-muted-foreground opacity-60" aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={range?.from ?? DEMO_DATETIME_RANGE_START_DATE}
          numberOfMonths={2}
          selected={range}
          onSelect={setRange}
        />
      </PopoverContent>
    </Popover>
  )
}

function PreviewTimePicker({
  disabled,
  filled,
  className,
  /** When `filled`, use this time instead of `14:30` (e.g. DatetimeRange start/end). */
  filledTime,
}: {
  disabled: boolean
  filled: boolean
  className?: string
  filledTime?: string
}) {
  const [time, setTime] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    setTime(filled ? (filledTime ?? '14:30') : '')
  }, [filled, filledTime])

  // Use the native time input but hide the browser indicator so our icon matches the rest.
  return (
    <div className={cn('relative w-full max-w-full', className)}>
      <Input
        ref={inputRef}
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        disabled={disabled}
        className={cn(
          'max-w-full tabular-nums pr-9',
          // Hide the browser picker icon so the lucide icon is the only one shown.
          '[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer',
          INPUT_HOVER_ELEVATION_MD,
          INPUT_FOCUS_NO_ELEVATION,
          INPUT_FOCUS_RING,
        )}
      />
      <button
        type="button"
        className={cn(
          'absolute right-2.5 top-1/2 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground/60',
          'hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
          'disabled:pointer-events-none',
          INPUT_NO_CLICK_EFFECT,
        )}
        aria-label="Open time picker"
        disabled={disabled}
        onClick={() => {
          const el = inputRef.current
          if (!el) return
          // Chromium-based browsers support showPicker() for native time/date inputs.
          // Fallback to focus so keyboard users can still change the value.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const anyEl = el as any
          if (typeof anyEl.showPicker === 'function') anyEl.showPicker()
          else el.focus()
        }}
      >
        <Clock className="size-4 shrink-0" aria-hidden />
      </button>
    </div>
  )
}

const FRUITS = ['Apple', 'Banana', 'Orange', 'Grape', 'Mango'] as const

const PEOPLE = [
  { id: 'ak', name: 'Alex Kim', initials: 'AK' },
  { id: 'mj', name: 'Mina Jang', initials: 'MJ' },
  { id: 'sl', name: 'Sam Lee', initials: 'SL' },
  { id: 'rt', name: 'Ravi Tan', initials: 'RT' },
] as const

function PreviewSelectMenu({
  disabled,
  filled,
  placeholder = 'Select a fruit',
}: {
  disabled: boolean
  filled: boolean
  placeholder?: string
}) {
  const [value, setValue] = React.useState<string>('')
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    setValue(filled ? 'Apple' : '')
  }, [filled])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            inputSurfaceClassName,
            'h-9 max-w-full justify-between gap-2 font-normal',
            !value && 'text-muted-foreground',
            INPUT_HOVER_ELEVATION_MD,
            INPUT_FOCUS_NO_ELEVATION,
            INPUT_FOCUS_RING,
            INPUT_NO_HOVER_FILL,
            INPUT_NO_OPEN_FILL,
            INPUT_NO_CLICK_EFFECT,
            // Keep ring visible while popover is open (Radix sets aria-expanded=true on trigger).
            'aria-expanded:border-ring aria-expanded:ring-3 aria-expanded:ring-ring/50 aria-expanded:shadow-none',
          )}
        >
          <span className="min-w-0 truncate">{value || placeholder}</span>
          <ChevronDown className="size-4 shrink-0 opacity-60" aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-1" align="start">
        <div className="py-1" role="listbox" aria-label="Select a fruit">
          {FRUITS.map((fruit) => (
            <button
              key={fruit}
              type="button"
              role="option"
              aria-selected={value === fruit}
              className={cn(
                'flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm',
                'hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                value === fruit ? 'bg-muted text-foreground' : 'text-foreground',
              )}
              onClick={() => {
                setValue(fruit)
                setOpen(false)
              }}
            >
              <span>{fruit}</span>
              {value === fruit ? (
                <span className="text-xs font-medium text-muted-foreground">Selected</span>
              ) : null}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

function AvatarOptionRow({
  label,
  initials,
  selected,
}: {
  label: string
  initials: string
  selected: boolean
}) {
  return (
    <span className="flex min-w-0 items-center gap-2">
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground">
        {initials}
      </span>
      <span className="min-w-0 truncate">{label}</span>
      {selected ? (
        <span className="ml-auto text-xs font-medium text-muted-foreground">Selected</span>
      ) : null}
    </span>
  )
}

function PreviewSelectAvatar({
  disabled,
  filled,
}: {
  disabled: boolean
  filled: boolean
}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<(typeof PEOPLE)[number] | null>(null)

  React.useEffect(() => {
    setValue(filled ? PEOPLE[0] : null)
  }, [filled])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            inputSurfaceClassName,
            'h-9 max-w-full justify-between gap-2 font-normal',
            !value && 'text-muted-foreground',
            HOVER_ELEVATION_MD,
            HOVER_BG_TRANSPARENT,
            FOCUS_RING,
            INPUT_NO_CLICK_EFFECT,
            INPUT_OPEN_RING,
          )}
        >
          <span className="flex min-w-0 items-center gap-2">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground">
              {value ? value.initials : '—'}
            </span>
            <span className="min-w-0 truncate">
              {value ? value.name : 'Select user…'}
            </span>
          </span>
          <ChevronDown className="size-4 shrink-0 opacity-60" aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-1" align="start">
        <div className="py-1" role="listbox" aria-label="Select a user">
          {PEOPLE.map((p) => (
            <button
              key={p.id}
              type="button"
              role="option"
              aria-selected={value?.id === p.id}
              className={cn(
                'flex w-full items-center rounded-md px-2 py-1.5 text-sm',
                'hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                value?.id === p.id ? 'bg-muted' : undefined,
              )}
              onClick={() => {
                setValue(p)
                setOpen(false)
              }}
            >
              <AvatarOptionRow
                label={p.name}
                initials={p.initials}
                selected={value?.id === p.id}
              />
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

function PreviewMultiSelect({ disabled, filled }: { disabled: boolean; filled: boolean }) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<Set<(typeof MULTI_OPTIONS)[number]>>(() => new Set())

  React.useEffect(() => {
    if (filled) {
      setSelected(new Set(['Design', 'Engineering']))
    } else {
      setSelected(new Set())
    }
  }, [filled])

  const toggle = (opt: (typeof MULTI_OPTIONS)[number]) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(opt)) next.delete(opt)
      else next.add(opt)
      return next
    })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={cn(
            inputSurfaceClassName,
            'h-auto min-h-9 max-w-full flex-wrap justify-between gap-1 py-1 font-normal',
            'aria-expanded:bg-transparent',
            HOVER_ELEVATION_MD,
            HOVER_BG_TRANSPARENT,
            FOCUS_RING,
            INPUT_NO_CLICK_EFFECT,
            INPUT_OPEN_RING,
          )}
        >
          <span className="flex flex-wrap items-center gap-1">
            {selected.size ? (
              Array.from(selected).map((s) => (
                <Badge key={s} variant="secondary">
                  {s}
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">Choose…</span>
            )}
          </span>
          <ChevronDown className="size-4 shrink-0 self-center opacity-60" aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 p-1" sideOffset={6}>
        <div role="listbox" aria-label="Multi select options" className="flex flex-col">
          {MULTI_OPTIONS.map((opt) => {
            const checked = selected.has(opt)
            return (
              <button
                key={opt}
                type="button"
                role="option"
                aria-selected={checked}
                onClick={() => toggle(opt)}
                className={cn(
                  'flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-sm',
                  'hover:bg-muted',
                  'outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
                )}
              >
                <span className="truncate">{opt}</span>
                <span className="inline-flex size-5 items-center justify-center rounded-sm border border-border bg-background">
                  {checked ? <Check className="size-4 text-foreground" aria-hidden /> : null}
                </span>
              </button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}

function PreviewMultiAvatar({
  disabled,
  filled,
}: {
  disabled: boolean
  filled: boolean
}) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<string[]>([])

  React.useEffect(() => {
    setSelected(filled ? [PEOPLE[0].id, PEOPLE[1].id] : [])
  }, [filled])

  const selectedPeople = PEOPLE.filter((p) => selected.includes(p.id))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            inputSurfaceClassName,
            'h-auto min-h-9 max-w-full flex-wrap justify-between gap-1 py-1 font-normal',
            HOVER_ELEVATION_MD,
            HOVER_BG_TRANSPARENT,
            FOCUS_RING,
            INPUT_NO_CLICK_EFFECT,
            INPUT_OPEN_RING,
          )}
        >
          <span className="flex flex-wrap items-center gap-1">
            {selectedPeople.length ? (
              selectedPeople.map((p) => (
                <Badge key={p.id} variant="outline" className="gap-1 pr-1.5 pl-1">
                  <span className="flex size-4 items-center justify-center rounded-full bg-muted text-[9px] font-semibold text-muted-foreground">
                    {p.initials}
                  </span>
                  {p.initials}
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">Add people…</span>
            )}
          </span>
          <ChevronDown className="size-4 shrink-0 self-center opacity-60" aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-1" align="start">
        <div className="py-1" role="listbox" aria-label="Select people">
          {PEOPLE.map((p) => {
            const isSelected = selected.includes(p.id)
            return (
              <button
                key={p.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={cn(
                  'flex w-full items-center rounded-md px-2 py-1.5 text-sm',
                  'hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                  isSelected ? 'bg-muted' : undefined,
                )}
                onClick={() => {
                  setSelected((prev) =>
                    prev.includes(p.id) ? prev.filter((id) => id !== p.id) : [...prev, p.id],
                  )
                }}
              >
                <AvatarOptionRow label={p.name} initials={p.initials} selected={isSelected} />
              </button>
            )
          })}
        </div>
        <div className="border-t px-2 py-2">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="w-full text-foreground"
            onClick={() => setOpen(false)}
          >
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function PreviewAvatarGroup({
  disabled,
  filled,
}: {
  disabled: boolean
  filled: boolean
}) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<string[]>([])

  React.useEffect(() => {
    setSelected(filled ? [PEOPLE[0].id, PEOPLE[1].id, PEOPLE[2].id] : [])
  }, [filled])

  const selectedPeople = PEOPLE.filter((p) => selected.includes(p.id))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            inputSurfaceClassName,
            'flex h-9 max-w-full items-center justify-between gap-2 py-0 pr-2 pl-1',
            'text-base font-normal md:text-sm',
            HOVER_ELEVATION_MD,
            HOVER_BG_TRANSPARENT,
            FOCUS_RING,
            INPUT_NO_CLICK_EFFECT,
            INPUT_OPEN_RING,
          )}
        >
          {selectedPeople.length ? (
            <div className="flex -space-x-2">
              {selectedPeople.slice(0, 3).map((p) => (
                <span
                  key={p.id}
                  className="flex size-7 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-medium text-muted-foreground"
                >
                  {p.initials}
                </span>
              ))}
            </div>
          ) : (
            <span className="pl-2 text-muted-foreground">Add people…</span>
          )}
          <ChevronDown className="size-4 shrink-0 opacity-60" aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-1" align="start">
        <div className="py-1" role="listbox" aria-label="Select people for group">
          {PEOPLE.map((p) => {
            const isSelected = selected.includes(p.id)
            return (
              <button
                key={p.id}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={cn(
                  'flex w-full items-center rounded-md px-2 py-1.5 text-sm',
                  'hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                  isSelected ? 'bg-muted' : undefined,
                )}
                onClick={() => {
                  setSelected((prev) =>
                    prev.includes(p.id) ? prev.filter((id) => id !== p.id) : [...prev, p.id],
                  )
                }}
              >
                <AvatarOptionRow label={p.name} initials={p.initials} selected={isSelected} />
              </button>
            )
          })}
        </div>
        <div className="border-t px-2 py-2">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="w-full text-foreground"
            onClick={() => setOpen(false)}
          >
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function usePreviewChrome(interaction: InteractionKey) {
  const disabled = interaction === 'empty-disabled'
  const filled = interaction === 'filled-enabled' || interaction === 'error'
  const simHover = false
  const simFocus = false

  const wrapClassName = cn(
    'rounded-lg transition-[box-shadow,border-color]',
    simHover && 'shadow-elevation-md',
    simFocus && 'border border-ring ring-3 ring-ring/50',
  )

  return { disabled, filled, simHover, simFocus, wrapClassName }
}

/** Text value type — Figma 5358:9880: placeholder / filled + clear / disabled empty. */
function PreviewTextField({
  interaction,
  invalid,
}: {
  interaction: InteractionKey
  invalid?: boolean
}) {
  const { disabled, filled } = usePreviewChrome(interaction)
  const [cleared, setCleared] = React.useState(false)
  React.useEffect(() => {
    setCleared(false)
  }, [filled, disabled])

  const showFilled = filled && !cleared
  const ph = showFilled ? undefined : 'Placeholder'
  const value = showFilled ? TEXT_FILLED_EXAMPLE : ''

  if (showFilled && !disabled) {
    return (
      <div className="relative flex w-full items-center">
        <Input
          placeholder={ph}
          value={value}
          readOnly
          aria-readonly
          aria-invalid={invalid ? true : undefined}
          className={cn(
            'max-w-full pr-10',
            HOVER_ELEVATION_MD,
            FOCUS_RING,
            invalid &&
              'border-destructive shadow-none hover:border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30',
          )}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn(
            'absolute right-0.5 top-1/2 size-8 shrink-0 -translate-y-1/2 rounded-md text-muted-foreground',
            INPUT_NO_CLICK_EFFECT,
          )}
          aria-label="Clear value"
          onClick={() => setCleared(true)}
        >
          <XCircle className="size-4 opacity-70" aria-hidden />
        </Button>
      </div>
    )
  }

  return (
    <Input
      placeholder={ph}
      value={value}
      readOnly
      disabled={disabled}
      aria-readonly={showFilled ? true : undefined}
      aria-invalid={invalid ? true : undefined}
      className={cn(
        'max-w-full',
        HOVER_ELEVATION_MD,
        FOCUS_RING,
        invalid &&
          !disabled &&
          'border-destructive shadow-none hover:border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30',
      )}
    />
  )
}

function ValueTypeSurface({
  id,
  interaction,
  invalid,
}: {
  id: ValueTypeId
  interaction: InteractionKey
  /** When set, marks the control invalid (e.g. paired with FieldError). */
  invalid?: boolean
}) {
  const { disabled, filled, wrapClassName } = usePreviewChrome(interaction)
  const ph = filled ? undefined : 'Placeholder'
  const textVal = filled ? SAMPLE_TEXT : ''
  const areaVal = filled ? SAMPLE_TEXTAREA : ''

  const shell = (node: React.ReactNode) => (
    <div className={cn('w-full max-w-full', wrapClassName, invalid && INPUT_INVALID_CHROME)}>
      {node}
    </div>
  )

  switch (id) {
    case 'text':
      return shell(<PreviewTextField interaction={interaction} invalid={invalid} />)
    case 'language':
      /* Reference: `text` surface + EN prefix. */
      return shell(
        <div
          className={cn(
            inputSurfaceClassName,
            'flex items-center gap-2',
            'focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
            HOVER_ELEVATION_MD,
            FOCUS_RING,
            disabled && 'pointer-events-none bg-input/50 opacity-50 shadow-none dark:bg-input/80',
          )}
        >
          <span className="shrink-0 select-none text-sm font-bold tabular-nums text-muted-foreground">
            EN
          </span>
          <Input
            placeholder={ph}
            value={textVal}
            readOnly
            disabled={disabled}
            aria-readonly={filled ? true : undefined}
            className="h-auto min-h-0 min-w-0 flex-1 border-0 bg-transparent px-0 py-0 shadow-none hover:shadow-none focus-visible:ring-0"
          />
        </div>,
      )
    case 'textarea-language':
      /* Reference: `textarea` surface + EN prefix. */
      return shell(
        <div
          className={cn(
            inputSurfaceClassName,
            'flex h-auto items-start gap-2 py-2',
            'focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
            HOVER_ELEVATION_MD,
            FOCUS_RING,
            disabled && 'pointer-events-none bg-input/50 opacity-50 shadow-none dark:bg-input/80',
          )}
        >
          <span className="shrink-0 select-none text-sm font-bold tabular-nums text-muted-foreground">
            EN
          </span>
          <textarea
            placeholder={ph}
            value={areaVal}
            readOnly
            disabled={disabled}
            rows={3}
            className="min-h-20 w-0 min-w-0 flex-1 resize-y border-0 bg-transparent p-0 text-sm leading-normal shadow-none outline-none placeholder:text-muted-foreground focus-visible:ring-0"
          />
        </div>,
      )
    case 'textarea':
      return shell(
        <textarea
          placeholder={ph}
          value={areaVal}
          readOnly
          disabled={disabled}
          rows={3}
          className={cn(
            inputSurfaceClassName,
            'min-h-20 max-w-full resize-y py-2',
            HOVER_ELEVATION_MD,
            FOCUS_RING,
          )}
        />,
      )
    case 'date':
      return shell(<PreviewDatePicker disabled={disabled} filled={filled} />)
    case 'date-picker-range':
      return shell(<PreviewDateRangePicker disabled={disabled} filled={filled} />)
    case 'time':
      return shell(<PreviewTimePicker disabled={disabled} filled={filled} />)
    case 'date-time':
      return shell(
        <div className="flex w-full max-w-full flex-wrap items-start gap-1">
          <div className="min-w-[160px] max-w-[160px]">
            <PreviewDatePicker disabled={disabled} filled={filled} />
          </div>
          <div className="min-w-[120px] max-w-[120px]">
            <PreviewTimePicker disabled={disabled} filled={filled} />
          </div>
        </div>,
      )
    case 'select':
      return shell(<PreviewSelectMenu disabled={disabled} filled={filled} />)
    case 'select-avatar':
      return shell(<PreviewSelectAvatar disabled={disabled} filled={filled} />)
    case 'multi':
      return shell(<PreviewMultiSelect disabled={disabled} filled={filled} />)
    case 'multi-avatar':
      return shell(<PreviewMultiAvatar disabled={disabled} filled={filled} />)
    case 'avatar-group':
      return shell(<PreviewAvatarGroup disabled={disabled} filled={filled} />)
    case 'currency':
      return shell(
        <div className="relative max-w-full">
          <span className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-sm text-muted-foreground">
            $
          </span>
          <Input
            type="text"
            inputMode="decimal"
            placeholder={ph}
            value={filled ? '1,240.00' : textVal}
            readOnly
            disabled={disabled}
            className={cn('max-w-full pl-7', HOVER_ELEVATION_MD, FOCUS_RING)}
          />
        </div>,
      )
    case 'phone':
      return shell(
        <Input
          type="tel"
          placeholder={ph}
          value={filled ? '+1 (555) 000-0000' : textVal}
          readOnly
          disabled={disabled}
          className={cn('max-w-full', HOVER_ELEVATION_MD, FOCUS_RING)}
        />,
      )
    case 'custom':
      return shell(
        <div className="flex max-w-full gap-2">
          <Input
            placeholder={ph}
            value={textVal}
            readOnly
            disabled={disabled}
            className={cn('min-w-0 flex-1', HOVER_ELEVATION_MD, FOCUS_RING)}
          />
          <Button type="button" size="icon" variant="outline" disabled={disabled} aria-label="Extra action">
            <ChevronRight className="size-4 text-muted-foreground opacity-60" aria-hidden />
          </Button>
        </div>,
      )
    case 'file':
      return shell(
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            inputSurfaceClassName,
            'h-9 max-w-full justify-start gap-2 font-normal',
            'aria-expanded:bg-transparent',
            HOVER_ELEVATION_MD,
            HOVER_BG_TRANSPARENT,
            FOCUS_RING,
            INPUT_NO_CLICK_EFFECT,
          )}
        >
          <Paperclip className="size-4 text-muted-foreground" aria-hidden />
          <span className="truncate text-muted-foreground">
            {filled ? 'document.pdf' : 'Attach file…'}
          </span>
        </Button>,
      )
    case 'file-large':
      return shell(
        <div
          className={cn(
            inputSurfaceClassName,
            'flex h-24 max-w-full flex-col items-center justify-center gap-1 text-center text-sm',
            HOVER_ELEVATION_MD,
            FOCUS_RING,
          )}
        >
          <Paperclip className="size-5 text-muted-foreground" aria-hidden />
          <span className="text-muted-foreground">
            {filled ? 'presentation.pptx' : 'Drop or browse files…'}
          </span>
        </div>,
      )
    case 'image-l':
      return shell(
        <div
          className={cn(
            inputSurfaceClassName,
            'flex h-32 max-w-full items-center justify-center text-xs text-muted-foreground',
            HOVER_ELEVATION_MD,
            FOCUS_RING,
          )}
        >
          {filled ? 'Image preview' : 'Large image slot'}
        </div>,
      )
    case 'image-s':
      return shell(
        <div
          className={cn(
            inputSurfaceClassName,
            'flex size-20 max-w-full items-center justify-center text-[10px] text-muted-foreground',
            HOVER_ELEVATION_MD,
            FOCUS_RING,
          )}
        >
          {filled ? 'Thumb' : 'Small'}
        </div>,
      )
    case 'date-range':
      return shell(
        <div className="flex max-w-full flex-wrap items-center gap-1">
          <Input
            type="text"
            className="min-h-9 min-w-0 flex-1"
            placeholder={filled ? undefined : 'Start'}
            value={filled ? 'Apr 1, 2026' : ''}
            readOnly
            disabled={disabled}
          />
          <span
            className="flex h-9 shrink-0 items-center px-0.5 text-sm leading-none text-muted-foreground"
            aria-hidden
          >
            ~
          </span>
          <Input
            type="text"
            className="min-h-9 min-w-0 flex-1"
            placeholder={filled ? undefined : 'End'}
            value={filled ? 'Apr 30, 2026' : ''}
            readOnly
            disabled={disabled}
          />
        </div>,
      )
    case 'datetime-range':
      /* Figma 5329:9597 — one row: date, time, ~, date, time; container 600×36, gap 4px, fields fill. */
      return shell(
        <div className="flex w-full max-w-[600px] flex-wrap items-center gap-1">
          <div className="min-h-9 min-w-[160px] max-w-[160px]">
            <PreviewDatePicker
              disabled={disabled}
              filled={filled}
              filledDate={DEMO_DATETIME_RANGE_START_DATE}
            />
          </div>
          <div className="min-h-9 min-w-[120px] max-w-[120px]">
            <PreviewTimePicker disabled={disabled} filled={filled} filledTime="09:00" />
          </div>
          <span
            className="flex h-9 shrink-0 items-center px-0.5 text-sm leading-none text-muted-foreground"
            aria-hidden
          >
            ~
          </span>
          <div className="min-h-9 min-w-[160px] max-w-[160px]">
            <PreviewDatePicker
              disabled={disabled}
              filled={filled}
              filledDate={DEMO_DATETIME_RANGE_END_DATE}
            />
          </div>
          <div className="min-h-9 min-w-[120px] max-w-[120px]">
            <PreviewTimePicker disabled={disabled} filled={filled} filledTime="17:00" />
          </div>
        </div>,
      )
  }
}

function FieldFrameworkNotesTable() {
  return (
    <Table className="text-xs">
      <TableCaption className="caption-top mt-0 mb-2 text-left text-xs text-muted-foreground">
        Designer overrides vs stock shadcn. These rules describe the approved
        inputs in the library below.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="h-8 w-20 px-2 py-1.5 text-xs">Property</TableHead>
          <TableHead className="h-8 px-2 py-1.5 text-xs">shadcn</TableHead>
          <TableHead className="h-8 px-2 py-1.5 text-xs">PEP</TableHead>
          <TableHead className="h-8 px-2 py-1.5 text-xs">Note</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-muted-foreground">
        {FIELD_FRAMEWORK_DIFFERENCES.map((row) => (
          <TableRow key={row.property}>
            <TableCell className="px-2 py-1.5 font-medium text-foreground">{row.property}</TableCell>
            <TableCell className="px-2 py-1.5">{row.shadcn}</TableCell>
            <TableCell className="px-2 py-1.5">{row.pep}</TableCell>
            <TableCell className="px-2 py-1.5 text-[11px] leading-snug">{row.programmerNote}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function RequiredMark() {
  return <span className="text-destructive">*</span>
}

function InfoHint({ content }: { content: string }) {
  return (
    <span className="group/info relative inline-flex">
      <button
        type="button"
        className="inline-flex size-5 items-center justify-center rounded-full text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        aria-label={content}
      >
        <Info className="size-4" aria-hidden />
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 hidden w-52 -translate-x-1/2 rounded-md bg-popover px-3 py-2 text-xs font-normal leading-snug text-popover-foreground shadow-elevation-md ring-1 ring-border group-hover/info:block group-focus-within/info:block"
      >
        {content}
      </span>
    </span>
  )
}

function PepFieldCopy({
  label,
  descriptionTop,
  descriptionBottom,
  errorText,
  hasError,
  children,
}: {
  label: string
  descriptionTop: string
  descriptionBottom: string
  errorText: string
  hasError: boolean
  children: React.ReactNode
}) {
  return (
    <Field className="min-w-0 gap-2" data-invalid={hasError || undefined}>
      <FieldLabel className="items-center gap-1.5">
        {label}
        <RequiredMark />
        <InfoHint content={`Info: API-provided help text for ${label}.`} />
      </FieldLabel>
      <FieldDescription className="text-xs leading-4">
        {descriptionTop}
      </FieldDescription>
      {children}
      {hasError ? <FieldError className="px-2.5 text-xs">{errorText}</FieldError> : null}
      <FieldDescription className="text-xs leading-4">
        {descriptionBottom}
      </FieldDescription>
    </Field>
  )
}

function PepFieldGroupCopy({
  label,
  descriptionTop,
  descriptionBottom,
  errorText,
  hasError,
  children,
}: {
  label: string
  descriptionTop: string
  descriptionBottom: string
  errorText: string
  hasError: boolean
  children: React.ReactNode
}) {
  return (
    <FieldSet className="min-w-0 gap-2" data-invalid={hasError || undefined}>
      <FieldLegend
        variant="label"
        className={cn("mb-0 flex items-center gap-1.5", hasError && "text-destructive")}
      >
        {label}
        <RequiredMark />
        <InfoHint content={`Info: API-provided help text for ${label}.`} />
      </FieldLegend>
      <FieldDescription className="text-xs leading-4">
        {descriptionTop}
      </FieldDescription>
      {children}
      {hasError ? <FieldError className="px-2.5 text-xs">{errorText}</FieldError> : null}
      <FieldDescription className="text-xs leading-4">
        {descriptionBottom}
      </FieldDescription>
    </FieldSet>
  )
}

function PepInputAnatomyPreview({
  row,
  interaction,
}: {
  row: FieldInputRow
  interaction: InteractionKey
}) {
  const isFieldGroup = row.section === 'field-group'
  const hasError = interaction === 'error'
  const errorText = `Error text for ${row.figmaName}`
  const descriptionTop = `Description shown above ${row.figmaName}.`
  const descriptionBottom = `Description bottom for ${row.figmaName}.`
  const body = (
    <ValueTypeSurface
      id={row.id}
      interaction={interaction}
      invalid={hasError}
    />
  )

  if (isFieldGroup) {
    return (
      <PepFieldGroupCopy
        label={row.figmaName}
        descriptionTop={descriptionTop}
        descriptionBottom={descriptionBottom}
        errorText={errorText}
        hasError={hasError}
      >
        {body}
      </PepFieldGroupCopy>
    )
  }

  return (
    <PepFieldCopy
      label={row.figmaName}
      descriptionTop={descriptionTop}
      descriptionBottom={descriptionBottom}
      errorText={errorText}
      hasError={hasError}
    >
      {body}
    </PepFieldCopy>
  )
}

function InputPreviewMatrix({
  rows,
  showPendingNotes = false,
}: {
  rows: FieldInputRow[]
  showPendingNotes?: boolean
}) {
  return (
    <>
      <p className="mb-2 hidden px-4 text-sm font-medium text-foreground sm:block">Value type</p>
      <div className="mb-3 hidden px-4 sm:grid sm:grid-cols-[minmax(9rem,12rem)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] sm:items-start sm:gap-x-6">
        <div className="min-w-0 text-xs font-medium text-muted-foreground">Input</div>
        {INTERACTION_OPTIONS.map((opt) => (
          <div key={opt.key} className="min-w-0 text-xs font-medium text-muted-foreground">
            {opt.label}
          </div>
        ))}
      </div>

      <div className="space-y-0 divide-y rounded-xl border border-border/60 bg-muted">
        {FIELD_INPUT_SECTIONS.map(({ title, section }) => {
          const sectionRows = rows.filter((r) => r.section === section)
          if (sectionRows.length === 0) return null
          return (
            <React.Fragment key={section}>
              <div className="bg-muted px-4 py-3">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-sm font-semibold tracking-tight text-foreground">{title}</h3>
                  <pre className="whitespace-pre font-mono text-[11px] leading-4 text-muted-foreground">
                    {section === 'field'
                      ? `Field
├─ Label
├─ Required
├─ Hints
├─ Input
├─ Error
└─ Bottom description`
                      : `FieldSet
├─ Label
├─ Required
├─ Hints
├─ FieldGroup
│  ├─ Field
│  └─ Field
├─ Error
└─ Bottom description`}
                  </pre>
                </div>
              </div>
              {sectionRows.map((row, sectionIndex) => (
                  <div
                    key={row.id}
                    className="flex flex-col gap-4 border-0 px-4 py-5 sm:grid sm:grid-cols-[minmax(9rem,12rem)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] sm:items-start sm:gap-x-6"
                  >
                    <div className="min-w-0 space-y-1 text-sm sm:pt-0.5">
                      <div className="flex min-w-0 items-baseline gap-2">
                        <span className="shrink-0 font-medium tabular-nums text-muted-foreground">
                          {sectionIndex + 1}.
                        </span>
                        <span className="min-w-0 truncate font-medium text-foreground">
                          {row.figmaName}
                        </span>
                      </div>
                      {showPendingNotes && row.pendingNote ? (
                        <p className="pl-6 text-[11px] leading-snug text-muted-foreground">
                          {row.pendingNote}
                        </p>
                      ) : null}
                    </div>
                    {INTERACTION_OPTIONS.map((opt) => (
                      <div key={opt.key} className="flex min-w-0 flex-col gap-2">
                        <p className="text-xs font-medium text-muted-foreground sm:hidden">
                          {opt.label}
                        </p>
                        <PepInputAnatomyPreview row={row} interaction={opt.key} />
                      </div>
                    ))}
                  </div>
              ))}
            </React.Fragment>
          )
        })}
      </div>
    </>
  )
}

export function InputTypePage() {
  return (
    <PepDesignSystemPage title="Field" contentClassName="space-y-10 pt-4">
        {/* Notes */}
        <section className="max-w-4xl">
          <h2 className="mb-0 text-sm font-semibold tracking-tight text-foreground">
            Notes
          </h2>
          <FieldFrameworkNotesTable />
        </section>

        {/* Input library */}
        <section>
          <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">
            Input library
          </h2>
          <p className="mb-4 text-xs text-muted-foreground">
            Approved field inputs ({FIELD_LIBRARY_ROWS.length} value types).{' '}
            <span className="font-medium text-foreground">
              Always pick an input from this section when creating layouts.
            </span>{' '}
            Compose using primitives listed in Notes — do not invent one-off field chrome.
          </p>
          <InputPreviewMatrix rows={FIELD_LIBRARY_ROWS} />
        </section>

        {/* New inputs (pending review) */}
        <section>
          <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">
            New inputs (pending review)
          </h2>
          <p className="mb-4 text-xs text-muted-foreground">
            Prototype value types ({FIELD_PENDING_ROWS.length}) not yet in the input library. Create a
            new style only when no similar input exists in the library. Refer here for review before use in
            shipped layouts. When promoting a row, move it in{' '}
            <code className="text-foreground">field-input-registry.ts</code> and update Framework
            differences if the promotion adds new PEP overrides.
          </p>
          <InputPreviewMatrix rows={FIELD_PENDING_ROWS} showPendingNotes />
        </section>
    </PepDesignSystemPage>
  )
}
