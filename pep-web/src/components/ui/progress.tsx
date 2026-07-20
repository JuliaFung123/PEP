import * as React from "react"
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"

import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

function Progress({
  className,
  children,
  value,
  ...props
}: ProgressPrimitive.Root.Props) {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      className={cn("flex flex-wrap gap-3", className)}
      {...props}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  )
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  return (
    <ProgressPrimitive.Track
      className={cn(
        "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className
      )}
      data-slot="progress-track"
      {...props}
    />
  )
}

function ProgressIndicator({
  className,
  ...props
}: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn("h-full bg-primary transition-all", className)}
      {...props}
    />
  )
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      className={cn(typeToken("text-sm/medium"), className)}
      data-slot="progress-label"
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      className={cn(
        "ml-auto text-muted-foreground tabular-nums",
        typeToken("text-sm/normal"),
        className
      )}
      data-slot="progress-value"
      {...props}
    />
  )
}

/** PEP Figma Progress circle (40px). Not in stock shadcn Progress. */
function ProgressCircle({
  value = 0,
  size = 40,
  strokeWidth = 4,
  className,
  ...props
}: Omit<React.ComponentProps<"svg">, "children"> & {
  value?: number | null
  size?: number
  strokeWidth?: number
}) {
  const normalized = Math.min(100, Math.max(0, value ?? 0))
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (normalized / 100) * circumference
  const half = size / 2

  return (
    <svg
      data-slot="progress-circle"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={normalized}
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={cn("shrink-0 -rotate-90 text-primary", className)}
      {...props}
    >
      <circle
        cx={half}
        cy={half}
        r={radius}
        fill="none"
        strokeWidth={strokeWidth}
        className="stroke-muted"
      />
      <circle
        cx={half}
        cy={half}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-[stroke-dashoffset]"
      />
    </svg>
  )
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
  ProgressCircle,
}
