import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import type { VariantProps } from "class-variance-authority"
import * as React from "react"

import { Toggle, toggleVariants } from "@/components/ui/toggle"
import { cn } from "@/lib/utils"

type ToggleGroupContextValue = VariantProps<typeof toggleVariants> & {
  spacing?: number
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({})

function ToggleGroup({
  className,
  variant = "default",
  size = "default",
  spacing = 2,
  ...props
}: ToggleGroupPrimitive.Props<string> & ToggleGroupContextValue) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-spacing={spacing}
      className={cn(
        "group/toggle-group flex w-fit items-center rounded-lg",
        spacing === 0 ? "gap-0" : "gap-2",
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing }}>
        {props.children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  )
}

function ToggleGroupItem({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof Toggle>) {
  const context = React.useContext(ToggleGroupContext)
  const resolvedVariant = variant ?? context.variant
  const resolvedSpacing = context.spacing ?? 2
  const resolvedSize = size ?? context.size ?? "default"

  const connectedSquareClass = {
    sm: "size-8 px-0",
    default: "size-9 px-0",
    lg: "size-10 px-0",
  }[resolvedSize]

  return (
    <Toggle
      data-slot="toggle-group-item"
      data-variant={resolvedVariant}
      data-spacing={resolvedSpacing}
      variant={resolvedVariant}
      size={resolvedSize}
      className={cn(
        "shrink-0 focus:z-10 focus-visible:z-10",
        resolvedSpacing === 0 &&
          "rounded-none shadow-none focus-visible:border-transparent",
        resolvedSpacing === 0 && "first:rounded-l-lg last:rounded-r-lg",
        resolvedSpacing === 0 &&
          resolvedVariant === "outline" &&
          "border-l-0 first:border-l",
        resolvedSpacing === 0 && connectedSquareClass,
        className,
      )}
      {...props}
    />
  )
}

export { ToggleGroup, ToggleGroupItem }
