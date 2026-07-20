import type { VariantProps } from "class-variance-authority"

import { Badge } from "@/components/ui/badge"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

type BadgeVariant = NonNullable<VariantProps<typeof Badge>["variant"]>

export type OptionRowVariant =
  | "code-title"
  | "title-badge"
  | "title-description"
  | "thumbnail-title"

/** `list` = full menu row (may be 2 lines). `trigger` = single line for fixed-height inputs. */
export type OptionRowDensity = "list" | "trigger"

type OptionRowBaseProps = {
  className?: string
  title: string
  /** @default "list" */
  density?: OptionRowDensity
}

export type OptionRowProps = OptionRowBaseProps &
  (
    | {
        variant: "code-title"
        code: string
      }
    | {
        variant: "title-badge"
        badge: string
        badgeVariant?: BadgeVariant
      }
    | {
        variant: "title-description"
        description: string
      }
    | {
        variant: "thumbnail-title"
        thumbnailSrc: string
        thumbnailAlt?: string
      }
  )

/**
 * Shared option row layout for SelectItem, ComboboxItem, DropdownMenuCheckboxItem.
 * Use `density="list"` in the popup and `density="trigger"` in the closed control
 * so multi-line compositions do not grow input / trigger height.
 */
export function OptionRow(props: OptionRowProps) {
  const { className, title, variant, density = "list" } = props
  const compact = density === "trigger"

  switch (variant) {
    case "code-title":
      return (
        <span className={cn("flex min-w-0 items-center gap-2", className)}>
          <span
            className={cn(
              typeToken("text-xs/medium"),
              "shrink-0 font-mono text-muted-foreground",
            )}
          >
            {props.code}
          </span>
          <span className={cn(typeToken("text-sm/normal"), "min-w-0 truncate text-foreground")}>
            {title}
          </span>
        </span>
      )

    case "title-badge":
      if (compact) {
        return (
          <span className={cn("flex min-w-0 items-center gap-2", className)}>
            <Badge
              variant={props.badgeVariant ?? "Light"}
              size="sm"
              className="max-w-[40%] shrink-0 truncate"
            >
              {props.badge}
            </Badge>
            <span className={cn(typeToken("text-sm/normal"), "min-w-0 truncate text-foreground")}>
              {title}
            </span>
          </span>
        )
      }

      return (
        <span className={cn("flex min-w-0 flex-col items-start gap-0.5", className)}>
          <span className={cn(typeToken("text-sm/normal"), "w-full truncate text-foreground")}>
            {title}
          </span>
          <Badge variant={props.badgeVariant ?? "Light"} size="sm" className="max-w-full truncate">
            {props.badge}
          </Badge>
        </span>
      )

    case "title-description":
      if (compact) {
        return (
          <span className={cn(typeToken("text-sm/normal"), "block min-w-0 truncate", className)}>
            <span className="text-foreground">{title}</span>
            <span className="text-muted-foreground"> · {props.description}</span>
          </span>
        )
      }

      return (
        <span className={cn("flex min-w-0 flex-col items-start gap-0.5", className)}>
          <span className={cn(typeToken("text-sm/normal"), "w-full truncate text-foreground")}>
            {title}
          </span>
          <span
            className={cn(typeToken("text-xs/normal"), "w-full truncate text-muted-foreground")}
          >
            {props.description}
          </span>
        </span>
      )

    case "thumbnail-title":
      return (
        <span className={cn("flex min-w-0 items-center gap-2", className)}>
          <img
            src={props.thumbnailSrc}
            alt={props.thumbnailAlt ?? ""}
            className={cn(
              "shrink-0 rounded-md border border-border object-cover",
              compact ? "size-6" : "size-8",
            )}
          />
          <span className={cn(typeToken("text-sm/normal"), "min-w-0 truncate text-foreground")}>
            {title}
          </span>
        </span>
      )
  }
}
