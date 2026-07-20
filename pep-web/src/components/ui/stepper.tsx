import { CheckIcon } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"
import { typeToken } from "@/data/typography-tokens"

function Stepper({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="stepper"
      aria-label="Progress"
      className={cn("flex w-full flex-wrap items-center gap-0", className)}
      {...props}
    />
  )
}

function StepperSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stepper-separator"
      aria-hidden
      className={cn("mx-1 h-px w-9 shrink-0 bg-border", className)}
      {...props}
    />
  )
}

function StepperItem({
  className,
  selected = false,
  icon = false,
  step = 1,
  children,
  description,
  onClick,
  ...props
}: React.ComponentProps<"button"> & {
  selected?: boolean
  /** When true, show a check; otherwise show the step number. */
  icon?: boolean
  step?: number
  description?: string
}) {
  const interactive = typeof onClick === "function"

  return (
    <button
      type="button"
      data-slot="stepper-item"
      data-selected={selected ? "true" : "false"}
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-2 rounded-md p-1.5 text-left outline-none",
        !selected && "opacity-50",
        interactive
          ? "cursor-pointer transition-opacity hover:opacity-100 focus-visible:ring-3 focus-visible:ring-ring/50"
          : "cursor-default",
        className,
      )}
      {...props}
    >
      <span
        data-slot="stepper-bullet"
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full",
          typeToken("text-xs/medium"),
          selected
            ? "bg-foreground text-background"
            : "border border-foreground text-foreground",
        )}
      >
        {icon ? (
          <CheckIcon className="size-3" strokeWidth={2.5} aria-hidden />
        ) : (
          <span className="leading-none">{step}</span>
        )}
      </span>
      <span data-slot="stepper-content" className="flex min-w-0 flex-col items-start justify-center">
        <span className={cn(typeToken("text-sm/medium"), "leading-5 text-foreground")}>{children}</span>
        {description ? (
          <span className={cn(typeToken("text-xs/normal"), "leading-4 text-foreground")}>{description}</span>
        ) : null}
      </span>
    </button>
  )
}

export { Stepper, StepperItem, StepperSeparator }
