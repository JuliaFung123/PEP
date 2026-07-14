import { GripVerticalIcon, MoreHorizontalIcon, PencilIcon, Trash2Icon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

export type HoverActionStyle = "list" | "image" | "card"

type HoverActionProps = Omit<React.ComponentProps<"div">, "children" | "style"> & {
  /** Layout of action controls: List | Image | Card */
  styleVariant?: HoverActionStyle
  drag?: boolean
  edit?: boolean
  delete?: boolean
  /** Card: more (…) action */
  more?: boolean
  /** Card: selection checkbox */
  check?: boolean
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  onEdit?: () => void
  onDelete?: () => void
  onMore?: () => void
  /**
   * Always show actions (library / docs).
   * Default: visible on parent `group/hover-host` hover or focus-within.
   * Host owns dim / elevation hover; this only shows controls (+ frost for readability).
   */
  forceVisible?: boolean
}

/** Shared frost used by Image / List strips / Card surface. */
function FrostFill({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 backdrop-blur-[2px]", className)} aria-hidden>
      <div className="absolute inset-0 bg-background/50 mix-blend-darken" />
    </div>
  )
}

function ActionButton({
  label,
  onClick,
  children,
  className,
}: {
  label: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      className={cn(
        "relative size-6 bg-background/15 text-foreground hover:bg-background/25",
        className,
      )}
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
    >
      {children}
    </Button>
  )
}

function HoverAction({
  className,
  styleVariant = "list",
  drag = false,
  edit = false,
  delete: showDelete = false,
  more = false,
  check = false,
  checked = false,
  onCheckedChange,
  onEdit,
  onDelete,
  onMore,
  forceVisible = false,
  ...props
}: HoverActionProps) {
  const showEdit = edit || Boolean(onEdit)
  const showDeleteAction = showDelete || Boolean(onDelete)
  const showMore = more || Boolean(onMore)
  const isCard = styleVariant === "card"
  const isImage = styleVariant === "image"
  const isList = styleVariant === "list"

  if (!isCard && !showEdit && !showDeleteAction && !drag) return null
  if (isCard && !showMore && !check) return null

  return (
    <div
      data-slot="hover-action"
      data-style={styleVariant}
      className={cn(
        "absolute inset-0 z-10 overflow-clip rounded-[inherit]",
        forceVisible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0 transition-opacity group-hover/hover-host:pointer-events-auto group-hover/hover-host:opacity-100 group-focus-within/hover-host:pointer-events-auto group-focus-within/hover-host:opacity-100",
        className,
      )}
      {...props}
    >
      {isCard ? (
        <>
          <FrostFill />
          {check ? (
            <div className="absolute top-2 left-2 z-10">
              <Checkbox
                checked={checked}
                onCheckedChange={(value) => {
                  onCheckedChange?.(value === true)
                }}
                onClick={(e) => e.stopPropagation()}
                className="size-5 border-input bg-background shadow-elevation-sm"
                aria-label="Select"
              />
            </div>
          ) : null}
          {showMore ? (
            <Button
              type="button"
              variant="secondary"
              size="icon-xs"
              className="absolute top-1.5 right-1.5 z-10 size-6 bg-popover text-foreground shadow-elevation-sm hover:bg-popover/90"
              aria-label="More"
              onClick={(e) => {
                e.stopPropagation()
                onMore?.()
              }}
            >
              <MoreHorizontalIcon className="size-3" />
            </Button>
          ) : null}
        </>
      ) : null}

      {!isCard ? (
        <>
          {/* List: full-row frost (same recipe as Image). Image: frost on action layer. */}
          {isList ? <FrostFill /> : null}

          {(showEdit || showDeleteAction) && (
            <div
              className={cn(
                "absolute z-10 flex items-center gap-1 px-1",
                isImage ? "inset-0 justify-center" : "inset-y-0 right-0 justify-end",
              )}
            >
              {isImage ? <FrostFill /> : null}
              {showEdit ? (
                <ActionButton label="Edit" onClick={onEdit}>
                  <PencilIcon className="size-3" />
                </ActionButton>
              ) : null}
              {showDeleteAction ? (
                <ActionButton label="Delete" onClick={onDelete}>
                  <Trash2Icon className="size-3 text-destructive" />
                </ActionButton>
              ) : null}
            </div>
          )}

          {drag && isList ? (
            <div className="absolute inset-y-0 left-0 z-10 flex items-center px-1">
              <GripVerticalIcon
                className="relative size-3 text-muted-foreground"
                aria-hidden
              />
            </div>
          ) : null}

          {drag && isImage ? (
            <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-center px-1 py-0.5">
              <FrostFill />
              <GripVerticalIcon
                className="relative size-3.5 rotate-90 text-muted-foreground"
                aria-hidden
              />
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  )
}

export { HoverAction }
