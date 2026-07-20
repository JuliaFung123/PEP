import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "lucide-react"
import type { ComponentProps, ReactNode } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 has-[[data-slot=avatar]]:pl-0 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        // PEP Figma `*light` — violet/500 @ 20% opacity + foreground label
        Light:
          "bg-violet-500/20 text-foreground [a]:hover:bg-violet-500/25 dark:bg-violet-500/30 dark:hover:bg-violet-500/35",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: cn("h-5 min-w-5 px-2 py-0.5 [&>svg]:size-3!", typeToken("text-xs/medium")),
        lg: cn("h-6 min-w-6 px-1.5 [&>svg]:size-3.5!", typeToken("text-xs/medium")),
        xl: cn("h-8 min-w-6 px-2 py-1 [&>svg]:size-4!", typeToken("text-sm/medium")),
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
)

function Badge({
  className,
  variant = "default",
  size = "sm",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant, size }), className),
        "data-size": size,
      } as ComponentProps<"span">,
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
      size,
    },
  })
}

/** Squared thumb + label chip (PEP table Category / Figma Badge with image). */
const badgeImageVariants = cva(
  "inline-flex w-fit max-w-full shrink-0 items-center overflow-hidden border border-border bg-background font-medium text-foreground",
  {
    variants: {
      size: {
        // Heights match text Badge / Avatar-in-badge: sm 20 / lg 24 / xl 32
        sm: cn("h-5 rounded-sm pr-0.5", typeToken("text-xs/medium")),
        lg: cn("h-6 rounded-md pr-1", typeToken("text-xs/medium")),
        xl: cn("h-8 rounded-lg pr-1", typeToken("text-sm/medium")),
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
)

type BadgeImageSize = NonNullable<VariantProps<typeof badgeImageVariants>["size"]>

const badgeImageThumbClass: Record<BadgeImageSize, string> = {
  sm: "size-5",
  lg: "size-6",
  xl: "size-8",
}

function BadgeImage({
  className,
  size = "lg",
  src,
  alt = "",
  children,
  onRemove,
  ...props
}: Omit<ComponentProps<"span">, "children"> &
  VariantProps<typeof badgeImageVariants> & {
    src: string
    alt?: string
    children?: ReactNode
    /** Optional dismiss control after the label. */
    onRemove?: () => void
  }) {
  const resolvedSize = size ?? "lg"

  return (
    <span
      data-slot="badge-image"
      data-size={resolvedSize}
      className={cn(badgeImageVariants({ size: resolvedSize }), onRemove && "pr-0.5", className)}
      {...props}
    >
      <span
        className={cn(
          "shrink-0 overflow-hidden border-r border-border bg-muted",
          badgeImageThumbClass[resolvedSize],
        )}
      >
        <img src={src} alt={alt} className="size-full object-cover" />
      </span>
      <span className="min-w-0 truncate px-1">{children}</span>
      {onRemove ? (
        <button
          type="button"
          aria-label="Remove"
          className="shrink-0 rounded-sm p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onRemove()
          }}
        >
          <XIcon className="size-3" aria-hidden />
        </button>
      ) : null}
    </span>
  )
}

type BadgeSize = NonNullable<VariantProps<typeof badgeVariants>["size"]>

const AVATAR_SIZE_FOR_BADGE: Record<
  BadgeSize,
  NonNullable<ComponentProps<typeof Avatar>["size"]>
> = {
  sm: "xs",
  lg: "sm",
  xl: "default",
}

/**
 * Badge + leading Avatar (Badges library — Avatar badge style).
 * Use for multi-avatar selection chips.
 */
function BadgeAvatar({
  className,
  size = "sm",
  variant = "outline",
  src,
  alt = "",
  fallback,
  children,
  onRemove,
  ...props
}: Omit<ComponentProps<"span">, "children"> &
  VariantProps<typeof badgeVariants> & {
    src?: string
    alt?: string
    fallback: string
    children?: ReactNode
    onRemove?: () => void
  }) {
  const resolvedSize = (size ?? "sm") as BadgeSize

  return (
    <Badge
      variant={variant}
      size={resolvedSize}
      className={cn(onRemove && "pr-1", className)}
      {...props}
    >
      <Avatar size={AVATAR_SIZE_FOR_BADGE[resolvedSize]} className="after:hidden">
        {src ? <AvatarImage src={src} alt={alt} /> : null}
        <AvatarFallback className="text-[8px] leading-none">{fallback}</AvatarFallback>
      </Avatar>
      {children}
      {onRemove ? (
        <button
          type="button"
          data-icon="inline-end"
          aria-label="Remove"
          className="rounded-sm p-0.5 text-muted-foreground hover:bg-background/40 hover:text-foreground"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onRemove()
          }}
        >
          <XIcon className="size-3" aria-hidden />
        </button>
      ) : null}
    </Badge>
  )
}

export { Badge, BadgeAvatar, BadgeImage, badgeVariants, badgeImageVariants }
