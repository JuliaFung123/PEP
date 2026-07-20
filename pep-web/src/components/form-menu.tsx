import { Check } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"
import { typeToken } from "@/data/typography-tokens"

/** Bullet / indent state for Form Menu rows (Figma `Form_menu`). */
export type FormMenuItemState = "complete" | "incomplete" | "nested"

export type FormMenuItemProps = {
  label: string
  /** Red required asterisk. */
  required?: boolean
  /** complete = check; incomplete = empty circle; nested = no bullet (indented). */
  state?: FormMenuItemState
  /** Selected / current section — item uses dark theme tokens. */
  active?: boolean
  className?: string
  onClick?: () => void
} & Omit<React.ComponentProps<"button">, "children" | "type" | "onClick">

function FormMenuBullet({ state }: { state: FormMenuItemState }) {
  if (state === "nested") {
    return <span className="w-5 shrink-0" aria-hidden />
  }

  if (state === "complete") {
    return (
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
        <Check className="size-3" strokeWidth={2.5} aria-hidden />
      </span>
    )
  }

  return <span className="size-5 shrink-0 rounded-full bg-foreground/20" aria-hidden />
}

/**
 * Single Form Menu row — Figma `Form_menu` (PEP product forms / multi-section create).
 * @see https://www.figma.com/design/IZ6algHkFp6Z2a5dYiS1hC/PEP?node-id=477-19895
 */
export function FormMenuItem({
  label,
  required = false,
  state = "incomplete",
  active = false,
  className,
  onClick,
  ...props
}: FormMenuItemProps) {
  return (
    <button
      type="button"
      data-slot="form-menu-item"
      data-state={state}
      data-active={active || undefined}
      aria-current={active ? "step" : undefined}
      onClick={onClick}
      className={cn(
        cn(typeToken("text-sm/medium"), "flex w-full items-center gap-1 rounded-[8px] p-1.5 text-left outline-none"),
        "focus-visible:ring-2 focus-visible:ring-ring/50",
        active
          ? "dark bg-background text-foreground"
          : "text-foreground hover:bg-muted",
        className,
      )}
      {...props}
    >
      <FormMenuBullet state={state} />
      <span className="flex min-w-0 flex-1 items-center gap-1 px-1">
        <span className="truncate">{label}</span>
        {required ? <span className="shrink-0 text-destructive">*</span> : null}
      </span>
    </button>
  )
}

export type FormMenuProps = {
  className?: string
  "aria-label"?: string
  children: React.ReactNode
}

/** Vertical Form Menu list shell. */
export function FormMenu({
  className,
  "aria-label": ariaLabel = "Form sections",
  children,
}: FormMenuProps) {
  return (
    <nav
      data-slot="form-menu"
      aria-label={ariaLabel}
      className={cn("px-2 py-3", className)}
    >
      <div className="flex flex-col gap-2">{children}</div>
    </nav>
  )
}

export { FormMenuBullet }
