import { PaperclipIcon } from "lucide-react"
import * as React from "react"

import { HoverAction } from "@/components/ui/hover-action"
import { cn } from "@/lib/utils"

export type ImageFileStyle = "grid" | "list"
export type ImageFileSize = "sm" | "default" | "lg"

type ImageFileProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** `grid` = thumbnail tile; `list` = thumbnail + metadata row. */
  styleVariant?: ImageFileStyle
  size?: ImageFileSize
  selected?: boolean
  /** Image URL. When omitted, shows a file-icon placeholder. */
  src?: string
  alt?: string
  filename?: string
  filesize?: string
  /** List path / link line. Hidden when omitted. */
  path?: string
  /** Grid placeholder text under the icon (no `src`). */
  fileLabel?: string
  showDrag?: boolean
  onEdit?: () => void
  onDelete?: () => void
  onImageError?: React.ReactEventHandler<HTMLImageElement>
}

const GRID_SIZE: Record<ImageFileSize, string> = {
  sm: "size-10 p-px rounded-[6px]",
  default: "size-[100px] p-1 rounded-md",
  lg: "size-40 p-1 rounded-md",
}

const LIST_THUMB: Record<ImageFileSize, string> = {
  sm: "size-9",
  default: "size-14",
  lg: "size-20",
}

function FilePlaceholder({
  size,
  label,
}: {
  size: ImageFileSize
  label?: string
}) {
  const iconClass =
    size === "lg" ? "size-7" : size === "default" ? "size-5" : "size-4"
  const showLabel = size !== "sm" && Boolean(label)

  return (
    <div className="flex size-full flex-col items-center justify-center gap-1 px-px">
      <PaperclipIcon className={cn("text-muted-foreground", iconClass)} aria-hidden />
      {showLabel ? (
        <span className="truncate text-sm leading-5 text-muted-foreground">{label}</span>
      ) : null}
    </div>
  )
}

function ImageFile({
  className,
  styleVariant = "grid",
  size = "default",
  selected = false,
  src,
  alt = "",
  filename = "filename.png",
  filesize = "123.2KB",
  path,
  fileLabel,
  showDrag = false,
  onEdit,
  onDelete,
  onImageError,
  ...props
}: ImageFileProps) {
  const isList = styleVariant === "list"
  const placeholderLabel =
    fileLabel ?? (size === "lg" ? "filename.pdf" : size === "default" ? "pdf" : undefined)
  const showOverlay = Boolean(onEdit || onDelete || showDrag)

  return (
    <div
      data-slot="image-file"
      data-style={styleVariant}
      data-size={size}
      data-selected={selected ? "true" : "false"}
      className={cn(
        "group/hover-host relative flex bg-background",
        selected ? "border-2 border-ring" : "border border-border",
        isList
          ? cn(
              "w-[340px] items-center gap-2 rounded-md",
              size === "sm" ? "py-1.5 pr-3 pl-1.5" : "p-1.5",
            )
          : cn("flex-col overflow-clip", GRID_SIZE[size]),
        className,
      )}
      {...props}
    >
      <div
        data-slot="image-file-thumb"
        className={cn(
          "relative overflow-clip rounded-sm bg-muted-foreground/15",
          isList
            ? cn("shrink-0", size === "sm" && selected ? "size-10" : LIST_THUMB[size])
            : "min-h-0 w-full flex-1",
        )}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 size-full object-cover"
            draggable={false}
            onError={onImageError}
          />
        ) : (
          <FilePlaceholder
            size={isList ? (size === "lg" ? "default" : "sm") : size}
            label={isList ? undefined : placeholderLabel}
          />
        )}
      </div>

      {isList ? (
        <div
          data-slot="image-file-content"
          className={cn(
            "flex min-w-0 flex-1 flex-col overflow-clip",
            size === "lg" && "gap-0.5",
          )}
        >
          {size === "sm" ? (
            <div className="flex w-full items-center gap-2">
              <p className="min-w-0 flex-1 truncate text-sm leading-5 text-foreground">
                {filename}
              </p>
              <p className="shrink-0 text-xs leading-4 text-muted-foreground">{filesize}</p>
            </div>
          ) : (
            <>
              <p className="w-full truncate text-sm leading-5 text-foreground">{filename}</p>
              <p className="w-full truncate text-xs leading-4 text-muted-foreground">{filesize}</p>
            </>
          )}
          {path ? (
            <p className="truncate text-xs leading-4 text-muted-foreground">{path}</p>
          ) : null}
        </div>
      ) : null}

      {showOverlay ? (
        <HoverAction
          styleVariant={isList ? "list" : "image"}
          drag={showDrag}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ) : null}
    </div>
  )
}

export { ImageFile }
