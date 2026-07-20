import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Forms page layout shell (Figma 新增活動 / popup form pattern).
 *
 * Structure:
 * 1. `header` — `PepPopupHeader` (title + primary actions + close)
 * 2. `menu` — Form Menu (section nav)
 * 3. `body` — scrollable fields or table (`LibraryField` stack / titled table)
 * 4. `footer` — `FormBottom` (progress + Cancel / Save)
 *
 * `surface`:
 * - `card` (default) — form body: rounded + outline + elevation
 * - `plain` — table body: no outline / elevation
 *
 * @see https://www.figma.com/design/IZ6algHkFp6Z2a5dYiS1hC/PEP?node-id=477-19891
 */
export function FormsLayout({
  header,
  menu,
  body,
  footer,
  surface = "card",
  className,
  contentClassName,
  formClassName,
}: {
  header: React.ReactNode
  menu?: React.ReactNode
  body: React.ReactNode
  footer?: React.ReactNode
  /** Body+footer container: card for forms, plain for tables. */
  surface?: "card" | "plain"
  className?: string
  contentClassName?: string
  formClassName?: string
}) {
  return (
    <div
      data-slot="forms-layout"
      className={cn("flex min-h-0 flex-1 flex-col bg-background", className)}
    >
      {header}
      <div
        className={cn(
          "flex min-h-0 flex-1 gap-6 overflow-hidden px-6 pt-2 pb-6",
          contentClassName,
        )}
      >
        {menu ? <div className="hidden w-60 shrink-0 self-stretch lg:block">{menu}</div> : null}
        <div
          className={cn(
            "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-background",
            surface === "card" &&
              "rounded-xl border border-border/60 bg-card shadow-elevation-lg",
            formClassName,
          )}
        >
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">{body}</div>
          {footer}
        </div>
      </div>
    </div>
  )
}

/** Vertical stack for form fields — matches Field library `LibraryField` spacing between rows. */
export function FormsFieldStack({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div data-slot="forms-field-stack" className={cn("flex flex-col gap-6", className)}>
      {children}
    </div>
  )
}

/** DialogContent classes for edge-to-edge full-page popup (no inset margin). */
export const fullPagePopupDialogContentClassName = cn(
  "fixed inset-0 z-[100] flex h-dvh max-h-none w-full max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-none border-0 bg-background p-0 shadow-none",
  "data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100",
)

/** Preview frame for Layout docs — fills width/height without simulating dialog inset. */
export function FullPagePopupDemoShell({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative h-[min(85vh,48rem)] overflow-hidden bg-background",
        className,
      )}
    >
      {children}
    </div>
  )
}
