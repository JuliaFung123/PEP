import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

const toggleVariants = cva(
  cn(
    "inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent transition-all outline-none select-none hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-pressed:bg-primary/15 aria-pressed:text-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    typeToken("text-sm/medium"),
  ),
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border bg-background",
        ghost: "bg-transparent",
      },
      size: {
        default: "h-9 min-w-9 gap-2 px-2",
        sm: "h-8 min-w-8 gap-2 px-1.5",
        lg: "h-10 min-w-10 gap-2 px-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props<string> & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
