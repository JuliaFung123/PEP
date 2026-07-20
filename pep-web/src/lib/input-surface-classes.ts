import { cn } from "@/lib/utils"

/**
 * Control chrome for a single surface owner (`Input`, trigger `Button`, or composed shell).
 * Border / focus / disabled / invalid apply only when those attrs live on THIS node.
 * Disabled matches Checkbox / Radio: `opacity-50` only (no fill override).
 */
export const inputSurfaceClassName =
  "h-9 w-full min-w-0 rounded-lg border border-input bg-background px-2.5 py-1 text-base transition-[color,background-color,border-color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-background dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"

/** Field §2 interaction tokens — use on select/date triggers (same as Field page). */
export const inputHoverElevationMd = "hover:shadow-elevation-md"
export const inputFocusNoElevation = "focus-visible:shadow-none focus-within:shadow-none"
export const inputFocusRing =
  "focus:border-ring focus:ring-3 focus:ring-ring/50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
export const inputNoClickEffect =
  "active:bg-transparent active:translate-y-0 active:not-aria-[haspopup]:translate-y-0"
/** Preserve `-translate-y-1/2` centering on press (do not pair with `inputNoClickEffect`). */
export const inputTrailingIconClickEffect =
  "active:bg-transparent active:-translate-y-1/2"
/** Calendar / clock icon inside a relative input shell. */
export const inputTrailingIconButtonClassName = cn(
  "absolute top-1/2 right-2.5 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground/60",
  "hover:bg-transparent hover:text-muted-foreground",
  "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
  "disabled:pointer-events-none disabled:opacity-50",
  "aria-expanded:bg-transparent aria-expanded:shadow-none",
  inputTrailingIconClickEffect,
)
export const inputNoHoverFill = "hover:bg-transparent"
export const inputNoOpenFill = "aria-expanded:bg-transparent"
export const inputOpenRing =
  "aria-expanded:border-ring aria-expanded:ring-3 aria-expanded:ring-ring/50 aria-expanded:shadow-none"

/** Outline trigger shell: surface + Field library hover/focus/open behaviour. */
export const inputSelectTriggerClassName = cn(
  inputSurfaceClassName,
  "justify-between gap-2 text-left font-normal",
  inputHoverElevationMd,
  inputFocusNoElevation,
  inputFocusRing,
  inputNoHoverFill,
  inputNoOpenFill,
  inputNoClickEffect,
  inputOpenRing,
)

/**
 * Forced disabled wash for non-`<input>`/`disabled` owners (composed shells, upload tiles, ImageFile).
 * Same as Checkbox / Radio: `opacity-50` (+ pointer lock).
 */
export const inputSurfaceDisabledClassName =
  "pointer-events-none cursor-not-allowed opacity-50"

/**
 * Nested control inside a composed surface — never paints its own border/ring.
 * May still carry `aria-invalid` for accessibility; the parent surface owns the look.
 */
export const inputInnerControlClassName =
  "h-auto min-h-0 min-w-0 flex-1 border-0 bg-transparent p-0 shadow-none outline-none ring-0 hover:shadow-none focus-visible:border-transparent focus-visible:ring-0 disabled:bg-transparent disabled:opacity-100 aria-invalid:border-transparent aria-invalid:shadow-none aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent dark:aria-invalid:border-transparent"

/**
 * Composed surface: paint invalid when a descendant has `aria-invalid`.
 * Pair with `inputInnerControlClassName` on the focusable inner.
 */
export const inputSurfaceOwnsInvalidFromChildClassName =
  "has-[[aria-invalid=true]]:border-destructive has-[[aria-invalid=true]]:shadow-none has-[[aria-invalid=true]]:ring-3 has-[[aria-invalid=true]]:ring-destructive/20 has-[[aria-invalid=true]]:focus-within:border-destructive has-[[aria-invalid=true]]:focus-within:ring-destructive/20 dark:has-[[aria-invalid=true]]:border-destructive/50 dark:has-[[aria-invalid=true]]:ring-destructive/40"

/**
 * Force invalid paint on the surface when there is no aria-invalid owner
 * (e.g. drop zones) or when multiple independent boxes share one field error.
 */
export const inputSurfaceInvalidClassName =
  "border-destructive shadow-none ring-3 ring-destructive/20 hover:border-destructive dark:border-destructive/50 dark:ring-destructive/40"

/** Composed surface chrome: shared classes + optional invalid / disabled. */
export function inputComposedSurfaceClassName({
  invalid,
  disabled,
  className,
}: {
  invalid?: boolean
  disabled?: boolean
  className?: string
} = {}) {
  return cn(
    inputSurfaceClassName,
    inputSurfaceOwnsInvalidFromChildClassName,
    invalid && !disabled && inputSurfaceInvalidClassName,
    disabled && inputSurfaceDisabledClassName,
    className,
  )
}
