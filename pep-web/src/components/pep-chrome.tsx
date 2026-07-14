import { Bell, Menu, Moon, Search, Sun } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

/** Site header — global search + utilities (PEP Figma “Top Bar” / site header, e.g. node 126:5143). */
export function PepTopBar({
  searchPlaceholder = "Placeholder",
  value,
  onChange,
  languageLabel = "繁",
  showMenuButton = true,
  onMenuClick,
  theme,
  onToggleTheme,
  sticky = true,
  className,
}: {
  searchPlaceholder?: string
  value: string
  onChange: (next: string) => void
  /** Locale / script label in the utility cluster (Figma: 繁). */
  languageLabel?: string
  /** Left menu button (Figma: menu_open). Purely visual in previews. */
  showMenuButton?: boolean
  /** Optional handler for collapsing the left sidebar. */
  onMenuClick?: () => void
  /** Current theme mode (used for the theme toggle icon). */
  theme?: "light" | "dark"
  /** Toggle handler for the theme button. */
  onToggleTheme?: () => void
  /** When true, sticks to top in scrolling layouts. */
  sticky?: boolean
  className?: string
}) {
  return (
    <header
      className={cn(
        "bg-background px-5 pb-1 pt-4",
        sticky && "sticky top-0 z-50",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-background px-2 py-1.5 shadow-elevation-sm">
        <div className="flex min-h-9 w-full min-w-[200px] flex-1 items-center gap-2 px-2">
          {showMenuButton ? (
            <>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-9 shrink-0 rounded-md"
                aria-label="Menu"
                onClick={onMenuClick}
                disabled={!onMenuClick}
              >
                <Menu className="size-4 text-muted-foreground" aria-hidden />
              </Button>
              <div className="mx-0.5 h-6 w-px bg-border" aria-hidden />
            </>
          ) : null}
          <div className="relative min-h-9 w-full min-w-[200px] max-w-[340px] flex-1">
            <Search
              className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-9 border-0 bg-transparent pl-9 shadow-none focus-visible:ring-0"
              aria-label="Search"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-9 shrink-0 rounded-md text-muted-foreground"
            aria-label="Theme"
            onClick={onToggleTheme}
            disabled={!onToggleTheme}
          >
            {theme === "dark" ? (
              <Sun className="size-4" aria-hidden />
            ) : (
              <Moon className="size-4" aria-hidden />
            )}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-9 shrink-0 rounded-md text-muted-foreground"
            aria-label="Notifications"
          >
            <Bell className="size-4" aria-hidden />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-9 px-2 font-medium text-foreground"
            aria-label="Language"
          >
            {languageLabel}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-10 shrink-0 rounded-full p-0"
            aria-label="Account"
          >
            <span className="flex size-10 items-center justify-center overflow-hidden rounded-full border border-border bg-muted text-xs font-medium text-muted-foreground">
              PJ
            </span>
          </Button>
        </div>
      </div>
    </header>
  )
}

/** Shared max-width shell for design-system preview pages (title + body align). */
export const pepDesignSystemPageLayoutClass = "mx-auto w-full max-w-screen-2xl px-6"

/** Page title row with optional actions (Figma “header/Page”). */
export function PepPageHeader({
  title,
  actions,
  className,
  innerClassName,
}: {
  title: string
  actions?: React.ReactNode
  className?: string
  /** When set, replaces default `px-6` on the inner row (use with `pepDesignSystemPageLayoutClass`). */
  innerClassName?: string
}) {
  return (
    <div
      className={cn(
        "sticky top-0 z-40 relative min-h-16 bg-background",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-background/60 backdrop-blur-[4px]" aria-hidden />
      <div
        className={cn(
          "relative flex flex-wrap items-center gap-3 py-3.5",
          innerClassName ?? "px-6",
        )}
      >
        <div className="min-w-0 flex-1">
          <h1 className="font-heading text-xl font-semibold tracking-tight text-foreground">{title}</h1>
        </div>
        {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
      </div>
    </div>
  )
}

/** Design-system preview page shell — shared width for title and content. */
export function PepDesignSystemPage({
  title,
  actions,
  children,
  className,
  contentClassName,
}: {
  title: string
  actions?: React.ReactNode
  children: React.ReactNode
  className?: string
  contentClassName?: string
}) {
  return (
    <div className={cn("flex w-full min-w-0 flex-1 flex-col", className)}>
      <PepPageHeader
        title={title}
        actions={actions}
        innerClassName={pepDesignSystemPageLayoutClass}
      />
      <div className={cn(pepDesignSystemPageLayoutClass, "pb-12 pt-6", contentClassName)}>
        {children}
      </div>
    </div>
  )
}

/** Toolbar above tables — left cluster + right actions (Figma “Filter row”). */
export function PepFilterRow({
  left,
  right,
  className,
}: {
  left: React.ReactNode
  right?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "sticky top-16 z-30 flex flex-wrap items-center justify-between gap-3 bg-background px-6 py-2.5",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">{left}</div>
      {right ? <div className="flex shrink-0 items-center gap-2">{right}</div> : null}
    </div>
  )
}
