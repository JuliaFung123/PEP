import { BookOpen, CalendarIcon, Clock, Plus } from "lucide-react"
import * as React from "react"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { ImageFile, type ImageFileSize } from "@/components/ui/image-file"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  inputComposedSurfaceClassName,
  inputFocusNoElevation,
  inputFocusRing,
  inputHoverElevationMd,
  inputNoClickEffect,
  inputSelectTriggerClassName,
  inputTrailingIconButtonClassName,
  inputSurfaceClassName,
  inputSurfaceDisabledClassName,
  inputSurfaceInvalidClassName,
} from "@/lib/input-surface-classes"
import { formatDisplayDate, formatDisplayDateRange, parseDisplayDate, DATE_DISPLAY_PLACEHOLDER } from "@/lib/date-format"
import { cn } from "@/lib/utils"
import { typeToken } from "@/data/typography-tokens"

/**
 * Field §2 layout controls — shared by Field page + product layouts (e.g. 新增活動).
 * Prefer these over page-local Select / Date / Time / Textarea / Image grid copies.
 */

const DEMO_DATE = new Date(2026, 3, 14)
const DEMO_RANGE_START = new Date(2026, 3, 1)

const DEMO_IMAGE_GRID_SRCS = [
  "/assets/figma/activity-create/cover-1.jpeg",
  "/assets/figma/activity-create/cover-2.jpeg",
] as const

type ImageGridItem = { id: string; src: string }

/** Field library — Textarea. */
export function FieldTextarea({
  id,
  placeholder = "EN  Placeholder",
  rows = 3,
  disabled,
  invalid,
  className,
  ...props
}: React.ComponentProps<"textarea"> & { invalid?: boolean }) {
  return (
    <textarea
      data-slot="field-control"
      id={id}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      className={cn(
        inputSurfaceClassName,
        "h-auto min-h-20 max-w-full resize-y py-2",
        inputHoverElevationMd,
        inputFocusNoElevation,
        inputFocusRing,
        className,
      )}
      {...props}
    />
  )
}

/** Field library — Select (shadcn Select + PEP field trigger). */
export function FieldSelect({
  options,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  placeholder = "Select…",
  disabled,
  invalid,
  className,
  "aria-label": ariaLabel,
}: {
  options: readonly string[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  className?: string
  "aria-label"?: string
}) {
  const isControlled = valueProp !== undefined

  const handleValueChange = (next: string | null) => {
    onValueChange?.(next ?? "")
  }

  const selectValue = isControlled ? (valueProp === "" ? null : valueProp) : undefined
  const selectDefaultValue = !isControlled
    ? defaultValue === ""
      ? undefined
      : defaultValue
    : undefined

  return (
    <Select
      value={selectValue}
      defaultValue={selectDefaultValue}
      onValueChange={handleValueChange}
      disabled={disabled}
    >
      <SelectTrigger
        data-slot="field-control"
        aria-invalid={invalid || undefined}
        aria-label={ariaLabel}
        className={cn(inputSelectTriggerClassName, "h-9 w-full max-w-full", className)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent align="start">
        <SelectGroup>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

/** Field library — Combobox (shadcn Combobox + PEP field input group shell). */
export function FieldCombobox({
  options,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  placeholder = "Search…",
  disabled,
  invalid,
  className,
  "aria-label": ariaLabel,
}: {
  options: readonly string[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  className?: string
  "aria-label"?: string
}) {
  const isControlled = valueProp !== undefined

  const handleValueChange = (next: string | null) => {
    onValueChange?.(next ?? "")
  }

  const comboboxValue = isControlled ? (valueProp === "" ? null : valueProp) : undefined
  const comboboxDefaultValue = !isControlled
    ? defaultValue === ""
      ? undefined
      : defaultValue
    : undefined

  return (
    <Combobox
      items={options}
      value={comboboxValue}
      defaultValue={comboboxDefaultValue}
      onValueChange={handleValueChange}
      disabled={disabled}
    >
      <ComboboxInput
        data-slot="field-control"
        disabled={disabled}
        aria-invalid={invalid || undefined}
        aria-label={ariaLabel}
        placeholder={placeholder}
        className={cn(
          inputComposedSurfaceClassName({ invalid, disabled }),
          "h-9 w-full max-w-full bg-background dark:bg-background",
          inputHoverElevationMd,
          inputFocusNoElevation,
          inputFocusRing,
          className,
        )}
      />
      <ComboboxContent align="start">
        <ComboboxEmpty>No results found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item} showIndicator={false}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

/** Field library — Date. */
export function FieldDate({
  value: valueProp,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date",
  disabled,
  invalid,
  className,
}: {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
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
          data-slot="field-control"
          type="button"
          variant="outline"
          disabled={disabled}
          aria-invalid={invalid || undefined}
          className={cn(
            inputSelectTriggerClassName,
            "w-full max-w-full",
            !date && "text-muted-foreground",
            className,
          )}
        >
          <span className="min-w-0 truncate">
            {date ? formatDisplayDate(date) : placeholder}
          </span>
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

const BIRTH_START = new Date(1920, 0, 1)
const BIRTH_END = new Date()

/** Field library — Date of birth (year/month dropdowns, no future dates). */
export function FieldDateBirth({
  value: valueProp,
  defaultValue,
  onValueChange,
  placeholder = "Select date of birth",
  disabled,
  invalid,
  className,
}: {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
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
          data-slot="field-control"
          type="button"
          variant="outline"
          disabled={disabled}
          aria-invalid={invalid || undefined}
          className={cn(
            inputSelectTriggerClassName,
            "w-full max-w-full",
            !date && "text-muted-foreground",
            className,
          )}
        >
          <span className="min-w-0 truncate">
            {date ? formatDisplayDate(date) : placeholder}
          </span>
          <CalendarIcon className="size-4 shrink-0 text-muted-foreground opacity-60" aria-hidden />
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
          onSelect={(d) => {
            setDate(d)
            setOpen(false)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

/** Field library — typed date input synced with calendar popover. */
export function FieldDateInput({
  value: valueProp,
  defaultValue,
  onValueChange,
  placeholder = DATE_DISPLAY_PLACEHOLDER,
  disabled,
  invalid,
  className,
}: {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
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
    <div data-slot="field-control" className={cn("relative w-full max-w-full", className)}>
      <Input
        value={inputValue}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className={cn(
          "max-w-full pr-9",
          inputSurfaceClassName,
          inputHoverElevationMd,
          inputFocusNoElevation,
          inputFocusRing,
          invalid && !disabled && inputSurfaceInvalidClassName,
        )}
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

/** Field library — Date range as two date pickers with "~" in the input group. */
export function FieldDateRangeInputs({
  value: valueProp,
  defaultValue,
  onValueChange,
  startPlaceholder = "Start",
  endPlaceholder = "End",
  disabled,
  invalid,
  className,
}: {
  value?: DateRange
  defaultValue?: DateRange
  onValueChange?: (range: DateRange | undefined) => void
  startPlaceholder?: string
  endPlaceholder?: string
  disabled?: boolean
  invalid?: boolean
  className?: string
}) {
  const [uncontrolled, setUncontrolled] = React.useState<DateRange | undefined>(defaultValue)
  const range = valueProp ?? uncontrolled
  const setRange = (next: DateRange | undefined) => {
    if (valueProp === undefined) setUncontrolled(next)
    onValueChange?.(next)
  }

  return (
    <>
      <FieldDate
        value={range?.from}
        onValueChange={(from) => setRange({ from, to: range?.to })}
        placeholder={startPlaceholder}
        disabled={disabled}
        invalid={invalid}
        className={cn("min-w-0 flex-1", className)}
      />
      <span
        className={cn(
          typeToken("text-sm/normal"),
          "flex h-9 shrink-0 items-center self-start px-0.5 leading-none text-muted-foreground",
        )}
        aria-hidden
      >
        ~
      </span>
      <FieldDate
        value={range?.to}
        onValueChange={(to) => setRange({ from: range?.from, to })}
        placeholder={endPlaceholder}
        disabled={disabled}
        invalid={invalid}
        className={cn("min-w-0 flex-1", className)}
      />
    </>
  )
}

/** Field library — Date range (`Calendar` mode="range", two months). */
export function FieldDateRange({
  value: valueProp,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date range",
  disabled,
  invalid,
  className,
}: {
  value?: DateRange
  defaultValue?: DateRange
  onValueChange?: (range: DateRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
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
          data-slot="field-control"
          type="button"
          variant="outline"
          disabled={disabled}
          aria-invalid={invalid || undefined}
          className={cn(
            inputSelectTriggerClassName,
            "w-full max-w-full",
            !range?.from && "text-muted-foreground",
            className,
          )}
        >
          <span className="min-w-0 truncate">
            {formatDisplayDateRange(range, placeholder)}
          </span>
          <CalendarIcon className="size-4 shrink-0 text-muted-foreground opacity-60" aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={range?.from ?? DEMO_RANGE_START}
          numberOfMonths={2}
          selected={range}
          onSelect={setRange}
        />
      </PopoverContent>
    </Popover>
  )
}

/** Field library — Time. */
export function FieldTime({
  value: valueProp,
  defaultValue = "",
  onValueChange,
  disabled,
  invalid,
  className,
}: {
  value?: string
  defaultValue?: string
  onValueChange?: (time: string) => void
  disabled?: boolean
  invalid?: boolean
  className?: string
}) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const time = valueProp ?? uncontrolled
  const setTime = (next: string) => {
    if (valueProp === undefined) setUncontrolled(next)
    onValueChange?.(next)
  }

  return (
    <div data-slot="field-control" className={cn("relative w-full max-w-full", className)}>
      <Input
        ref={inputRef}
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className={cn(
          "max-w-full pr-9 tabular-nums",
          "[&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0",
          inputHoverElevationMd,
          inputFocusNoElevation,
          inputFocusRing,
        )}
      />
      <button
        type="button"
        className={inputTrailingIconButtonClassName}
        aria-label="Open time picker"
        disabled={disabled}
        onClick={() => {
          const el = inputRef.current
          if (!el) return
          const anyEl = el as HTMLInputElement & { showPicker?: () => void }
          if (typeof anyEl.showPicker === "function") anyEl.showPicker()
          else el.focus()
        }}
      >
        <Clock className="size-4 shrink-0" aria-hidden />
      </button>
    </div>
  )
}

function FileBrowserTriggerButtons({
  disabled,
  onBrowse,
}: {
  disabled?: boolean
  onBrowse: () => void
}) {
  return (
    <div className="flex items-center justify-center gap-1">
      <Button
        type="button"
        size="icon-xs"
        variant="ghost"
        disabled={disabled}
        aria-label="Upload file"
        className={cn(
          "size-7 shrink-0 bg-primary/15 text-foreground hover:bg-primary/25",
          inputNoClickEffect,
        )}
        onClick={onBrowse}
      >
        <Plus className="size-3.5" aria-hidden />
      </Button>
      <span className={cn(typeToken("text-xs/normal"), "select-none text-muted-foreground")}>or</span>
      <Button
        type="button"
        size="icon-xs"
        variant="ghost"
        disabled={disabled}
        aria-label="Browse library"
        className={cn(
          "size-7 shrink-0 bg-primary/15 text-foreground hover:bg-primary/25",
          inputNoClickEffect,
        )}
        onClick={onBrowse}
      >
        <BookOpen className="size-3.5" aria-hidden />
      </Button>
    </div>
  )
}

/** Field library — file List empty row (Figma 4627:1838). */
export function FieldFileListEmpty({
  placeholder = "Placeholder",
  disabled,
  invalid,
  className,
  onFiles,
}: {
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  className?: string
  onFiles?: (files: FileList) => void
}) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const openBrowser = () => {
    if (disabled) return
    inputRef.current?.click()
  }

  return (
    <div
      data-slot="field-control"
      aria-invalid={invalid && !disabled ? true : undefined}
      className={cn(
        inputSurfaceClassName,
        "flex h-auto min-h-9 w-[340px] max-w-full items-center gap-2 p-1.5 shadow-elevation-sm",
        inputHoverElevationMd,
        inputFocusNoElevation,
        inputFocusRing,
        invalid && !disabled && inputSurfaceInvalidClassName,
        disabled && inputSurfaceDisabledClassName,
        className,
      )}
    >
      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        tabIndex={-1}
        disabled={disabled}
        aria-hidden
        onChange={(e) => {
          const files = e.target.files
          if (files?.length) onFiles?.(files)
          e.target.value = ""
        }}
      />
      <FileBrowserTriggerButtons disabled={disabled} onBrowse={openBrowser} />
      <span
        className={cn(
          typeToken("text-sm/normal"),
          "min-w-0 flex-1 truncate px-0.5 leading-5 text-muted-foreground",
        )}
      >
        {placeholder}
      </span>
    </div>
  )
}

const IMAGE_EMPTY_TILE_SIZE: Record<"default" | "lg", string> = {
  default: "size-[100px] min-h-[100px] min-w-[100px]",
  lg: "size-40 min-h-40 min-w-40",
}

/** Field library — Image-S / Image-L empty upload tile (Figma 4936:1746). */
export function FieldImageEmpty({
  size = "default",
  disabled,
  invalid,
  className,
  onFiles,
}: {
  /** Image-S (100×100) or Image-L (160×160). */
  size?: "default" | "lg"
  disabled?: boolean
  invalid?: boolean
  className?: string
  onFiles?: (files: FileList) => void
}) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const openBrowser = () => {
    if (disabled) return
    inputRef.current?.click()
  }

  return (
    <div
      data-slot="field-control"
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label="Add images"
      aria-invalid={invalid && !disabled ? true : undefined}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          openBrowser()
        }
      }}
      className={cn(
        "flex shrink-0 flex-wrap content-center items-center justify-center gap-1 overflow-clip rounded-md border border-dashed border-border bg-background",
        IMAGE_EMPTY_TILE_SIZE[size],
        inputHoverElevationMd,
        inputFocusNoElevation,
        inputFocusRing,
        invalid && !disabled && inputSurfaceInvalidClassName,
        disabled && inputSurfaceDisabledClassName,
        className,
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        tabIndex={-1}
        disabled={disabled}
        aria-hidden
        onChange={(e) => {
          const files = e.target.files
          if (files?.length) onFiles?.(files)
          e.target.value = ""
        }}
      />
      <FileBrowserTriggerButtons disabled={disabled} onBrowse={openBrowser} />
    </div>
  )
}

/**
 * Field library — Image-S / Image-L multi grid
 * (leading blank upload tile + drag-reorderable ImageFile tiles).
 */
export function FieldMultiImageGrid({
  size = "default",
  disabled = false,
  invalid,
  defaultItems,
  className,
}: {
  size?: "default" | "lg"
  disabled?: boolean
  invalid?: boolean
  /** Seed tiles (e.g. cover demos). */
  defaultItems?: { id: string; src: string }[]
  className?: string
}) {
  const [items, setItems] = React.useState<ImageGridItem[]>(
    () => defaultItems ?? [],
  )
  const dragFrom = React.useRef<number | null>(null)

  const appendFiles = (files: FileList) => {
    if (disabled) return
    const next: ImageGridItem[] = []
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue
      next.push({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        src: URL.createObjectURL(file),
      })
    }
    if (next.length) setItems((prev) => [...prev, ...next])
  }

  const moveItem = (from: number, to: number) => {
    if (from === to || from < 0 || to < 0) return
    setItems((prev) => {
      if (from >= prev.length || to >= prev.length) return prev
      const copy = [...prev]
      const [picked] = copy.splice(from, 1)
      copy.splice(to, 0, picked)
      return copy
    })
  }

  return (
    <div
      data-slot="field-control"
      className={cn("flex max-w-full flex-wrap items-start gap-2", className)}
    >
      <FieldImageEmpty
        size={size}
        disabled={disabled}
        invalid={invalid}
        onFiles={appendFiles}
      />
      {items.map((item, index) => (
        <ImageFile
          key={item.id}
          styleVariant="grid"
          size={size}
          src={item.src}
          alt={`Uploaded image ${index + 1}`}
          selected={index === 0}
          className={cn(
            "cursor-grab active:cursor-grabbing",
            disabled && inputSurfaceDisabledClassName,
            invalid && !disabled && inputSurfaceInvalidClassName,
          )}
          showDrag={!disabled}
          onEdit={disabled ? undefined : () => undefined}
          onDelete={
            disabled
              ? undefined
              : () => setItems((prev) => prev.filter((row) => row.id !== item.id))
          }
          draggable={!disabled}
          onDragStart={() => {
            dragFrom.current = index
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            const from = dragFrom.current
            dragFrom.current = null
            if (from == null) return
            moveItem(from, index)
          }}
          onDragEnd={() => {
            dragFrom.current = null
          }}
        />
      ))}
    </div>
  )
}

/** Demo covers used by Field Image-S/L filled matrix + 新增活動. */
export const FIELD_IMAGE_GRID_DEMO_ITEMS = DEMO_IMAGE_GRID_SRCS.map((src, i) => ({
  id: `demo-${i}-${src}`,
  src,
}))

type FileListItem = {
  id: string
  src?: string
  filename?: string
  filesize?: string
  path?: string
}

const DEMO_FILE_LIST_PATH = "Folder/FolderName/FolderName/FolderName/"

/** Demo rows for Image/File List filled-multi + previews. */
export const FIELD_FILE_LIST_DEMO_ITEMS: FileListItem[] = [
  {
    id: "demo-list-1",
    src: "/assets/figma/image-file/sample.png",
    filename: "filename.png",
    filesize: "123.2KB",
    path: DEMO_FILE_LIST_PATH,
  },
  {
    id: "demo-list-2",
    filename: "document.pdf",
    filesize: "89.1KB",
    path: DEMO_FILE_LIST_PATH,
  },
]

/**
 * Field library — file List multi stack
 * (leading empty upload row + drag-reorderable ImageFile list rows).
 */
export function FieldMultiFileList({
  size = "default",
  disabled = false,
  invalid,
  placeholder = "Placeholder",
  defaultItems,
  className,
}: {
  size?: ImageFileSize
  disabled?: boolean
  invalid?: boolean
  placeholder?: string
  defaultItems?: FileListItem[]
  className?: string
}) {
  const [items, setItems] = React.useState<FileListItem[]>(() => defaultItems ?? [])
  const dragFrom = React.useRef<number | null>(null)

  const appendFiles = (files: FileList) => {
    if (disabled) return
    const next: FileListItem[] = []
    for (const file of Array.from(files)) {
      next.push({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        src: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
        filename: file.name,
        filesize: `${(file.size / 1024).toFixed(1)}KB`,
        path: DEMO_FILE_LIST_PATH,
      })
    }
    if (next.length) setItems((prev) => [...prev, ...next])
  }

  const moveItem = (from: number, to: number) => {
    if (from === to || from < 0 || to < 0) return
    setItems((prev) => {
      if (from >= prev.length || to >= prev.length) return prev
      const copy = [...prev]
      const [picked] = copy.splice(from, 1)
      copy.splice(to, 0, picked)
      return copy
    })
  }

  return (
    <div
      data-slot="field-control"
      className={cn("flex max-w-full flex-col gap-2", className)}
    >
      <FieldFileListEmpty
        placeholder={placeholder}
        disabled={disabled}
        invalid={invalid}
        onFiles={appendFiles}
      />
      {items.map((item, index) => (
        <ImageFile
          key={item.id}
          styleVariant="list"
          size={size}
          src={item.src}
          alt={item.filename ?? "Uploaded file"}
          filename={item.filename ?? "filename"}
          filesize={item.filesize ?? "0KB"}
          path={item.path}
          selected={index === 0}
          className={cn(
            "cursor-grab active:cursor-grabbing",
            disabled && inputSurfaceDisabledClassName,
            invalid && !disabled && inputSurfaceInvalidClassName,
          )}
          showDrag={!disabled}
          onEdit={disabled ? undefined : () => undefined}
          onDelete={
            disabled
              ? undefined
              : () => setItems((prev) => prev.filter((row) => row.id !== item.id))
          }
          draggable={!disabled}
          onDragStart={() => {
            dragFrom.current = index
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            const from = dragFrom.current
            dragFrom.current = null
            if (from == null) return
            moveItem(from, index)
          }}
          onDragEnd={() => {
            dragFrom.current = null
          }}
        />
      ))}
    </div>
  )
}
