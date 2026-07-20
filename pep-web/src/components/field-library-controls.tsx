import { format } from "date-fns"
import { BookOpen, CalendarIcon, ChevronDown, Clock, Plus } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { ImageFile } from "@/components/ui/image-file"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  inputHoverElevationMd,
  inputFocusNoElevation,
  inputFocusRing,
  inputNoClickEffect,
  inputSelectTriggerClassName,
  inputSurfaceClassName,
  inputSurfaceDisabledClassName,
  inputSurfaceInvalidClassName,
} from "@/lib/input-surface-classes"
import { cn } from "@/lib/utils"
import { typeToken } from "@/data/typography-tokens"

/**
 * Field §2 layout controls — shared by Field page + product layouts (e.g. 新增活動).
 * Prefer these over page-local Select / Date / Time / Textarea / Image grid copies.
 */

const DEMO_DATE = new Date(2026, 3, 14)

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

/** Field library — Select (`Button outline` + popover list). */
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
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue)
  const [open, setOpen] = React.useState(false)
  const value = valueProp ?? uncontrolled
  const setValue = (next: string) => {
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
          aria-invalid={invalid || undefined}
          className={cn(
            inputSelectTriggerClassName,
            "h-9 max-w-full",
            !value && "text-muted-foreground",
            className,
          )}
        >
          <span className="min-w-0 truncate">{value || placeholder}</span>
          <ChevronDown className="size-4 shrink-0 opacity-60" aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-1" align="start">
        <div className="py-1" role="listbox" aria-label={ariaLabel ?? placeholder}>
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              role="option"
              aria-selected={value === opt}
              className={cn(
                "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm",
                "hover:bg-muted focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                value === opt ? "bg-muted text-foreground" : "text-foreground",
              )}
              onClick={() => {
                setValue(opt)
                setOpen(false)
              }}
            >
              <span>{opt}</span>
              {value === opt ? (
                <span className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>Selected</span>
              ) : null}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
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
            {date ? format(date, "PPP") : placeholder}
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
    <div className={cn("relative w-full max-w-full", className)}>
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
        className={cn(
          "absolute top-1/2 right-2.5 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground/60",
          "hover:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
          "disabled:pointer-events-none",
          inputNoClickEffect,
        )}
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

function ImageUploadEmptyTile({
  disabled,
  invalid,
  className,
  onFiles,
}: {
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
      data-slot="input-surface"
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
        "flex size-[100px] shrink-0 flex-wrap content-center items-center justify-center gap-1 overflow-clip rounded-md border border-dashed border-border bg-background",
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
    <div className={cn("flex max-w-full flex-wrap items-start gap-2", className)}>
      <ImageUploadEmptyTile
        disabled={disabled}
        invalid={invalid}
        className={size === "lg" ? "size-40" : undefined}
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
