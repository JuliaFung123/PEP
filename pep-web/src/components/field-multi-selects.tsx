import { ChevronDown, XIcon } from "lucide-react"
import * as React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge, BadgeAvatar, BadgeImage } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { inputSurfaceClassName } from "@/lib/input-surface-classes"
import { cn } from "@/lib/utils"

/** Field library Multi options — shared by Field page + Dropdown Menu library. */
export const FIELD_MULTI_OPTIONS = [
  "Design",
  "Engineering",
  "Product",
  "Marketing",
  "Sales",
  "Support",
  "Finance",
  "Operations",
  "HR",
  "Legal",
] as const

export type FieldMultiOption = (typeof FIELD_MULTI_OPTIONS)[number]

const CATEGORY_THUMBS = [
  "/assets/figma/activity-list/category-1.png",
  "/assets/figma/activity-list/category-2.png",
] as const

export const FIELD_MULTI_IMAGE_OPTIONS = FIELD_MULTI_OPTIONS.map((label, index) => ({
  id: label,
  label,
  src: CATEGORY_THUMBS[index % CATEGORY_THUMBS.length],
}))

export const FIELD_MULTI_AVATAR_OPTIONS = [
  {
    id: "ak",
    name: "Alex Kim",
    initials: "AK",
    src: "https://github.com/shadcn.png",
  },
  {
    id: "mj",
    name: "Mina Jang",
    initials: "MJ",
    src: "https://github.com/evilrabbit.png",
  },
  {
    id: "sl",
    name: "Sam Lee",
    initials: "SL",
    src: "https://github.com/maxleiter.png",
  },
  {
    id: "rt",
    name: "Ravi Tan",
    initials: "RT",
    src: "https://github.com/leerob.png",
  },
] as const

const triggerClassName = cn(
  inputSurfaceClassName,
  // Button defaults to whitespace-nowrap; allow badges to wrap without height jumping.
  "h-auto min-h-9 w-full max-w-full justify-between gap-1 whitespace-normal py-1 font-normal",
  "hover:shadow-elevation-md hover:bg-transparent",
  "focus:border-ring focus:shadow-none focus:ring-3 focus:ring-ring/50",
  "focus-visible:border-ring focus-visible:shadow-none focus-visible:ring-3 focus-visible:ring-ring/50",
  "active:translate-y-0 active:bg-transparent",
  // Keep box model stable when open (ring is box-shadow; bg/shadow must not fight outline variant).
  "aria-expanded:border-ring aria-expanded:bg-transparent aria-expanded:shadow-none aria-expanded:ring-3 aria-expanded:ring-ring/50",
)

type FieldMultiControlProps = {
  disabled?: boolean
  /** When true, seed with Design + Engineering (Field matrix Filled). */
  filled?: boolean
  invalid?: boolean
  className?: string
}

export type FieldMultiImageOption = {
  id: string
  label: string
  src: string
}

type FieldMultiImageSelectProps = FieldMultiControlProps & {
  /** Override Field library default options (e.g. activity categories). */
  options?: readonly FieldMultiImageOption[]
  /** Initial selected ids when `filled` is true (defaults to first two option ids). */
  defaultSelectedIds?: readonly string[]
}

/** Field library — Multi (Light badges + DropdownMenuCheckboxItem). */
export function FieldMultiSelect({
  disabled = false,
  filled = true,
  invalid,
  className,
}: FieldMultiControlProps) {
  const [selected, setSelected] = React.useState(() => new Set<FieldMultiOption>())

  React.useEffect(() => {
    setSelected(filled ? new Set(["Design", "Engineering"]) : new Set())
  }, [filled])

  return (
    // Wrapper keeps Base UI focus-guard spans out of parent Field flex children.
    <div className="w-full min-w-0">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          disabled={disabled}
          render={
            <Button
              type="button"
              variant="outline"
              aria-invalid={invalid || undefined}
              className={cn(triggerClassName, className)}
            />
          }
        >
          <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
            {selected.size ? (
              Array.from(selected).map((s) => (
                <Badge key={s} variant="Light" className="gap-0.5 pr-1">
                  {s}
                  <button
                    type="button"
                    aria-label={`Remove ${s}`}
                    className="rounded-sm p-0.5 text-muted-foreground hover:bg-background/40 hover:text-foreground"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setSelected((prev) => {
                        const next = new Set(prev)
                        next.delete(s)
                        return next
                      })
                    }}
                  >
                    <XIcon className="size-3" aria-hidden />
                  </button>
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">Choose…</span>
            )}
          </span>
          <ChevronDown className="size-4 shrink-0 self-center opacity-60" aria-hidden />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64" align="start">
          {FIELD_MULTI_OPTIONS.map((opt) => (
            <DropdownMenuCheckboxItem
              key={opt}
              checked={selected.has(opt)}
              onCheckedChange={(checked) => {
                setSelected((prev) => {
                  const next = new Set(prev)
                  if (checked) next.add(opt)
                  else next.delete(opt)
                  return next
                })
              }}
            >
              {opt}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

/** Field library — Multi Image (BadgeImage + leading thumbs in menu). */
export function FieldMultiImageSelect({
  disabled = false,
  filled = true,
  invalid,
  className,
  options = FIELD_MULTI_IMAGE_OPTIONS,
  defaultSelectedIds,
}: FieldMultiImageSelectProps) {
  const seedIds = React.useMemo(() => {
    if (defaultSelectedIds?.length) return [...defaultSelectedIds]
    return options.slice(0, 2).map((o) => o.id)
  }, [defaultSelectedIds, options])

  const [selected, setSelected] = React.useState(() => new Set<string>())

  React.useEffect(() => {
    setSelected(filled ? new Set(seedIds) : new Set())
  }, [filled, seedIds])

  const selectedOptions = options.filter((o) => selected.has(o.id))

  return (
    <div className="w-full min-w-0">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          disabled={disabled}
          render={
            <Button
              type="button"
              variant="outline"
              aria-invalid={invalid || undefined}
              className={cn(triggerClassName, className)}
            />
          }
        >
          <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
            {selectedOptions.length ? (
              selectedOptions.map((o) => (
                <BadgeImage
                  key={o.id}
                  size="sm"
                  src={o.src}
                  alt=""
                  onRemove={() => {
                    setSelected((prev) => {
                      const next = new Set(prev)
                      next.delete(o.id)
                      return next
                    })
                  }}
                >
                  {o.label}
                </BadgeImage>
              ))
            ) : (
              <span className="text-muted-foreground">Choose…</span>
            )}
          </span>
          <ChevronDown className="size-4 shrink-0 self-center opacity-60" aria-hidden />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72" align="start">
          {options.map((opt) => (
            <DropdownMenuCheckboxItem
              key={opt.id}
              checked={selected.has(opt.id)}
              onCheckedChange={(checked) => {
                setSelected((prev) => {
                  const next = new Set(prev)
                  if (checked) next.add(opt.id)
                  else next.delete(opt.id)
                  return next
                })
              }}
            >
              <span className="flex min-w-0 items-center gap-2">
                <span className="size-5 shrink-0 overflow-hidden rounded-sm border border-border bg-muted">
                  <img src={opt.src} alt="" className="size-full object-cover" />
                </span>
                <span className="min-w-0 truncate">{opt.label}</span>
              </span>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

/** Field library — Multi Avatar (BadgeAvatar Outline + Outlined Avatar in menu). */
export function FieldMultiAvatarSelect({
  disabled = false,
  filled = true,
  invalid,
  className,
}: FieldMultiControlProps) {
  const [selected, setSelected] = React.useState(() => new Set<string>())

  React.useEffect(() => {
    setSelected(filled ? new Set(["ak", "mj"]) : new Set())
  }, [filled])

  const selectedPeople = FIELD_MULTI_AVATAR_OPTIONS.filter((p) => selected.has(p.id))

  return (
    <div className="w-full min-w-0">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          disabled={disabled}
          render={
            <Button
              type="button"
              variant="outline"
              aria-invalid={invalid || undefined}
              className={cn(triggerClassName, className)}
            />
          }
        >
          <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
            {selectedPeople.length ? (
              selectedPeople.map((p) => (
                <BadgeAvatar
                  key={p.id}
                  size="sm"
                  variant="outline"
                  src={p.src}
                  fallback={p.initials}
                  onRemove={() => {
                    setSelected((prev) => {
                      const next = new Set(prev)
                      next.delete(p.id)
                      return next
                    })
                  }}
                >
                  {p.name}
                </BadgeAvatar>
              ))
            ) : (
              <span className="text-muted-foreground">Choose…</span>
            )}
          </span>
          <ChevronDown className="size-4 shrink-0 self-center opacity-60" aria-hidden />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72" align="start">
          {FIELD_MULTI_AVATAR_OPTIONS.map((opt) => (
            <DropdownMenuCheckboxItem
              key={opt.id}
              checked={selected.has(opt.id)}
              onCheckedChange={(checked) => {
                setSelected((prev) => {
                  const next = new Set(prev)
                  if (checked) next.add(opt.id)
                  else next.delete(opt.id)
                  return next
                })
              }}
            >
              <span className="flex min-w-0 items-center gap-2">
                <Avatar size="xs">
                  <AvatarImage src={opt.src} alt="" />
                  <AvatarFallback className="text-[8px] leading-none">{opt.initials}</AvatarFallback>
                </Avatar>
                <span className="min-w-0 truncate">{opt.name}</span>
              </span>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
