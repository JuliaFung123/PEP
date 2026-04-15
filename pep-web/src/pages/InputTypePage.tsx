import * as React from 'react'
import {
  CalendarIcon,
  ChevronDown,
  ChevronRight,
  Check,
  Clock,
  Paperclip,
} from 'lucide-react'
import { format } from 'date-fns'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { inputSurfaceClassName } from '@/lib/input-surface-classes'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

/** Viewport param from design links — keeps Figma reference URLs aligned. */
const FIGMA_REF_QUERY = 'node-id=4628-1212&t=bgTKw3QmIHrmbGs5-4'
const FIGMA_REF_QUERY_LABELED = 'node-id=5218-11852&t=bgTKw3QmIHrmbGs5-4'
const FIGMA_FILE_BASE =
  'https://www.figma.com/design/bRDWHAITfr5p6onqnKTf0q/--PEP-Web_Library'

/** Figma PEP Web Library — Value Type names (component set 4835:1600). */
const VALUE_TYPE_ROWS = [
  { figmaName: 'Text', id: 'text' as const },
  { figmaName: 'Language', id: 'language' as const },
  { figmaName: 'Textarea+Language', id: 'textarea-language' as const },
  { figmaName: 'Textarea', id: 'textarea' as const },
  { figmaName: 'Date', id: 'date' as const },
  { figmaName: 'Time', id: 'time' as const },
  { figmaName: 'Date+time', id: 'date-time' as const },
  { figmaName: 'Select', id: 'select' as const },
  { figmaName: 'Select Avatar', id: 'select-avatar' as const },
  { figmaName: 'Multi', id: 'multi' as const },
  { figmaName: 'Multi Avatar', id: 'multi-avatar' as const },
  { figmaName: 'Avatar Group', id: 'avatar-group' as const },
  { figmaName: 'Currency', id: 'currency' as const },
  { figmaName: 'Phone', id: 'phone' as const },
  { figmaName: 'Custom', id: 'custom' as const },
  { figmaName: 'file', id: 'file' as const },
  { figmaName: 'file Large', id: 'file-large' as const },
  { figmaName: 'Image-L', id: 'image-l' as const },
  { figmaName: 'Image-S', id: 'image-s' as const },
  { figmaName: 'checkbox-col', id: 'checkbox-col' as const },
  { figmaName: 'checkbox-row', id: 'checkbox-row' as const },
  { figmaName: 'radio-col', id: 'radio-col' as const },
  { figmaName: 'radio-row', id: 'radio-row' as const },
  { figmaName: 'DateRange', id: 'date-range' as const },
] as const

type ValueTypeId = (typeof VALUE_TYPE_ROWS)[number]['id']

type LabelMode = 'with-label' | 'without-label'

type InteractionKey =
  | 'empty-enabled'
  | 'filled-enabled'
  | 'empty-disabled'

const INTERACTION_OPTIONS: { key: InteractionKey; label: string }[] = [
  { key: 'empty-enabled', label: 'Empty' },
  { key: 'filled-enabled', label: 'Filled' },
  { key: 'empty-disabled', label: 'Disable' },
]

const SAMPLE_TEXT = 'Input value'
const SAMPLE_TEXTAREA = 'Longer sample value for textarea fields.'
// Input Type interaction rules:
// - enabled: shadow-elevation-sm
// - hover: shadow-elevation-md, no ring
// - focus: ring only, no elevation
// - click: movement only (no overlay fill)
const INPUT_ENABLED_ELEVATION_SM = 'shadow-elevation-sm'
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

// Back-compat aliases (keep changes localized; remove later if desired)
const HOVER_ELEVATION_MD = `${INPUT_ENABLED_ELEVATION_SM} ${INPUT_HOVER_ELEVATION_MD} ${INPUT_FOCUS_NO_ELEVATION}`
const HOVER_BG_TRANSPARENT = `${INPUT_NO_HOVER_FILL} ${INPUT_NO_OPEN_FILL} active:bg-transparent`
const FOCUS_RING = INPUT_FOCUS_RING

/** Demo date when “filled” interaction is selected (Apr 14, 2026). */
const DEMO_DATE = new Date(2026, 3, 14)

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

function PreviewDatePicker({ disabled, filled }: { disabled: boolean; filled: boolean }) {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    setDate(filled ? DEMO_DATE : undefined)
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
            'max-w-full justify-between gap-2 text-left font-normal',
            !date && 'text-muted-foreground',
            INPUT_ENABLED_ELEVATION_SM,
            INPUT_HOVER_ELEVATION_MD,
            INPUT_FOCUS_NO_ELEVATION,
            INPUT_FOCUS_RING,
            INPUT_NO_HOVER_FILL,
            INPUT_NO_OPEN_FILL,
            INPUT_NO_CLICK_EFFECT,
            INPUT_OPEN_RING,
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

function PreviewTimePicker({ disabled, filled }: { disabled: boolean; filled: boolean }) {
  const [time, setTime] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    setTime(filled ? '14:30' : '')
  }, [filled])

  // Use the native time input but hide the browser indicator so our icon matches the rest.
  return (
    <div className="relative max-w-md">
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
          INPUT_ENABLED_ELEVATION_SM,
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
            'h-8 max-w-full justify-between gap-2 font-normal',
            !value && 'text-muted-foreground',
            INPUT_ENABLED_ELEVATION_SM,
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
            'h-8 max-w-full justify-between gap-2 font-normal',
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
            'h-auto min-h-8 max-w-full flex-wrap justify-between gap-1 py-1 font-normal',
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
            'h-auto min-h-8 max-w-full flex-wrap justify-between gap-1 py-1 font-normal',
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
            'flex h-8 max-w-full items-center justify-between gap-2 py-0 pr-2 pl-1',
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

/** Split control like Figma Date+time: calendar popover + time popover. */
function PreviewDateTimePickers({ disabled, filled }: { disabled: boolean; filled: boolean }) {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [time, setTime] = React.useState('')
  const [dateOpen, setDateOpen] = React.useState(false)

  React.useEffect(() => {
    setDate(filled ? DEMO_DATE : undefined)
    setTime(filled ? '14:30' : '')
  }, [filled])

  return (
    <div
      className={cn(
        'flex max-w-full overflow-hidden rounded-lg border border-input bg-background shadow-elevation-sm',
        INPUT_ENABLED_ELEVATION_SM,
        INPUT_HOVER_ELEVATION_MD,
        INPUT_FOCUS_NO_ELEVATION,
        'focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50',
        /* Same whole-field disabled chrome as Language / split shells — ghost date trigger stays visually in sync with the time input. */
        disabled &&
          'pointer-events-none bg-input/50 opacity-50 shadow-none focus-within:border-input focus-within:ring-0 dark:bg-input/80',
      )}
    >
      <Popover open={dateOpen} onOpenChange={setDateOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            disabled={disabled}
            className={cn(
              'h-8 min-h-8 min-w-0 flex-1 justify-between gap-2 rounded-none border-0 px-3 text-sm font-normal shadow-none',
              !date && 'text-muted-foreground',
              INPUT_NO_HOVER_FILL,
              INPUT_NO_OPEN_FILL,
              INPUT_NO_CLICK_EFFECT,
              INPUT_OPEN_RING,
              /* Composite shell applies disabled opacity; avoid stacking with Button’s disabled:opacity-50. */
              disabled && 'disabled:opacity-100',
            )}
          >
            <span className="min-w-0 truncate">{date ? format(date, 'MMM d, yyyy') : 'Date'}</span>
            <CalendarIcon
              className="size-4 shrink-0 text-muted-foreground opacity-60"
              aria-hidden
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              setDate(d)
              setDateOpen(false)
            }}
            defaultMonth={date ?? DEMO_DATE}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <div className="w-px shrink-0 self-stretch bg-border" aria-hidden />
      <div className="relative flex h-8 min-h-8 w-36 shrink-0 items-center px-3">
        <Input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          disabled={disabled}
          className={cn(
            'h-auto min-h-0 w-full border-0 bg-transparent px-0 py-0 text-base tabular-nums shadow-none focus-visible:ring-0 hover:shadow-none md:text-sm',
            '[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer',
            !time && 'text-muted-foreground',
            /* Let the composite shell provide disabled fill; avoids darker right half vs ghost date trigger. */
            disabled && 'disabled:bg-transparent dark:disabled:bg-transparent disabled:opacity-100',
          )}
        />
        <Clock
          className="pointer-events-none absolute right-2.5 top-1/2 size-4 shrink-0 -translate-y-1/2 text-muted-foreground opacity-60"
          aria-hidden
        />
      </div>
    </div>
  )
}

function LabelStack({ dimmed }: { dimmed?: boolean }) {
  return (
    <div className={cn('mb-2 space-y-1', dimmed && 'opacity-50')}>
      <div className="text-sm font-medium text-muted-foreground">Label Text</div>
      <p className="text-xs leading-relaxed text-muted-foreground">Help Text</p>
    </div>
  )
}

function usePreviewChrome(interaction: InteractionKey) {
  const disabled = interaction === 'empty-disabled'
  const filled = interaction === 'filled-enabled'
  const simHover = false
  const simFocus = false

  const wrapClassName = cn(
    'rounded-lg transition-[box-shadow,border-color]',
    simHover && 'shadow-elevation-md',
    simFocus && 'border border-ring ring-3 ring-ring/50',
  )

  return { disabled, filled, simHover, simFocus, wrapClassName }
}

function ValueTypeSurface({
  id,
  interaction,
}: {
  id: ValueTypeId
  interaction: InteractionKey
}) {
  const { disabled, filled, wrapClassName } = usePreviewChrome(interaction)
  const ph = filled ? undefined : 'Placeholder'
  const textVal = filled ? SAMPLE_TEXT : ''
  const areaVal = filled ? SAMPLE_TEXTAREA : ''

  const shell = (node: React.ReactNode) => (
    <div className={cn('w-full max-w-md', wrapClassName)}>{node}</div>
  )

  switch (id) {
    case 'text':
      return shell(
        <Input
          placeholder={ph}
          value={textVal}
          readOnly
          disabled={disabled}
          aria-readonly={filled ? true : undefined}
          className={cn('max-w-full', HOVER_ELEVATION_MD, FOCUS_RING)}
        />,
      )
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
    case 'time':
      return shell(<PreviewTimePicker disabled={disabled} filled={filled} />)
    case 'date-time':
      return shell(<PreviewDateTimePickers disabled={disabled} filled={filled} />)
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
            'h-8 max-w-full justify-start gap-2 font-normal',
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
    case 'checkbox-col':
      return shell(
        <div className={cn(inputSurfaceClassName, 'flex h-auto max-w-full flex-col gap-2 py-2', HOVER_ELEVATION_MD, FOCUS_RING)}>
          {['Option A', 'Option B'].map((label) => (
            <label key={label} className="flex items-center gap-2 text-sm">
              <Switch disabled={disabled} checked={filled} size="sm" />
              <span className={cn(disabled && 'opacity-50')}>{label}</span>
            </label>
          ))}
        </div>,
      )
    case 'checkbox-row':
      return shell(
        <div className={cn(inputSurfaceClassName, 'flex h-auto max-w-full flex-wrap gap-4 py-2', HOVER_ELEVATION_MD, FOCUS_RING)}>
          {['A', 'B'].map((label) => (
            <label key={label} className="flex items-center gap-2 text-sm">
              <Switch disabled={disabled} checked={filled} size="sm" />
              <span className={cn(disabled && 'opacity-50')}>Option {label}</span>
            </label>
          ))}
        </div>,
      )
    case 'radio-col':
      return shell(
        <div className={cn(inputSurfaceClassName, 'flex h-auto max-w-full flex-col gap-2 py-2', HOVER_ELEVATION_MD, FOCUS_RING)}>
          {['One', 'Two'].map((label, i) => (
            <Button
              key={label}
              type="button"
              variant={filled && i === 0 ? 'secondary' : 'outline'}
              size="sm"
              disabled={disabled}
              className="h-8 w-full justify-start font-normal"
            >
              {label}
            </Button>
          ))}
        </div>,
      )
    case 'radio-row':
      return shell(
        <div className={cn(inputSurfaceClassName, 'flex h-auto max-w-full flex-wrap gap-2 py-2', HOVER_ELEVATION_MD, FOCUS_RING)}>
          {['One', 'Two'].map((label, i) => (
            <Button
              key={label}
              type="button"
              variant={filled && i === 0 ? 'secondary' : 'outline'}
              size="sm"
              disabled={disabled}
              className="h-8 font-normal"
            >
              {label}
            </Button>
          ))}
        </div>,
      )
    case 'date-range':
      return shell(
        <div className="flex max-w-full gap-2">
          <Input
            type="text"
            className="min-w-0 flex-1"
            placeholder={filled ? undefined : 'Start'}
            value={filled ? 'Apr 1, 2026' : ''}
            readOnly
            disabled={disabled}
          />
          <Input
            type="text"
            className="min-w-0 flex-1"
            placeholder={filled ? undefined : 'End'}
            value={filled ? 'Apr 30, 2026' : ''}
            readOnly
            disabled={disabled}
          />
        </div>,
      )
  }
}

export function InputTypePage() {
  const [labelMode, setLabelMode] = React.useState<LabelMode>('without-label')
  const [interaction, setInteraction] = React.useState<InteractionKey>('empty-enabled')

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      <header className="mb-10 border-b pb-8">
        <p className="text-sm text-muted-foreground">Preview</p>
        <h1 className="font-heading text-3xl font-bold tracking-tight">Input Type</h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          PEP Web Library —{' '}
          <a
            className="text-foreground underline-offset-4 hover:underline"
            href={`${FIGMA_FILE_BASE}?${FIGMA_REF_QUERY}`}
            target="_blank"
            rel="noreferrer"
          >
            Input without label (4628:1212)
          </a>
          ,{' '}
          <a
            className="text-foreground underline-offset-4 hover:underline"
            href={`${FIGMA_FILE_BASE}?${FIGMA_REF_QUERY_LABELED}`}
            target="_blank"
            rel="noreferrer"
          >
            Input with label (5218:11852)
          </a>
          . All rows use existing shadcn-style primitives plus Tailwind; no duplicate component files.
        </p>
      </header>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <Tabs value={interaction} onValueChange={(v) => setInteraction(v as InteractionKey)}>
          <TabsList>
            {INTERACTION_OPTIONS.map((opt) => (
              <TabsTrigger key={opt.key} value={opt.key}>
                {opt.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">With Label</span>
          <Switch
            checked={labelMode === 'with-label'}
            onCheckedChange={(v) => setLabelMode(v ? 'with-label' : 'without-label')}
            aria-label="With label"
          />
        </div>
      </div>

      <div className="space-y-0 divide-y rounded-xl border border-border/60 bg-muted">
        {VALUE_TYPE_ROWS.map((row, idx) => (
          <div
            key={row.id}
            className="grid gap-4 px-4 py-5 sm:grid-cols-[minmax(11rem,14rem)_1fr] sm:items-start"
          >
            <div className="text-sm font-semibold text-foreground">
              <span className="mr-2 font-mono text-xs font-semibold tabular-nums text-muted-foreground">
                {idx + 1}.
              </span>
              {row.figmaName}
            </div>
            <div className="min-w-0">
              {labelMode === 'with-label' ? (
                <LabelStack dimmed={interaction === 'empty-disabled'} />
              ) : null}
              <ValueTypeSurface id={row.id} interaction={interaction} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
