import { Bell, Menu, Moon, Search, Sun, X } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { typeToken } from "@/data/typography-tokens"
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
  sticky = false,
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
  /** When true, sticks to top in scrolling layouts. Product shell scrolls the Top Bar away by default. */
  sticky?: boolean
  className?: string
}) {
  return (
    <header
      className={cn(
        "relative isolate px-5 pb-1 pt-4",
        sticky && "sticky top-0 z-50",
        className,
      )}
    >
      {sticky ? (
        <div
          className="pointer-events-none absolute inset-0 bg-background/80 backdrop-blur-[4px]"
          aria-hidden
        />
      ) : null}
      <div className="relative flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-background px-2 py-1.5 shadow-elevation-sm">
        <div className="flex min-h-9 w-full min-w-[200px] flex-1 items-center gap-2 px-2">
          {showMenuButton ? (
            <>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="shrink-0 rounded-md"
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
            className="shrink-0 rounded-md text-muted-foreground"
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
            className="shrink-0 rounded-md text-muted-foreground"
            aria-label="Notifications"
          >
            <Bell className="size-4" aria-hidden />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="default"
            className="px-2 font-medium text-foreground"
            aria-label="Language"
          >
            {languageLabel}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-lg"
            className="shrink-0 rounded-full p-0"
            aria-label="Account"
          >
            <span className={cn(typeToken("text-xs/medium"), "flex size-10 items-center justify-center overflow-hidden rounded-full border border-border bg-muted text-muted-foreground")}>
              PJ
            </span>
          </Button>
        </div>
      </div>
    </header>
  )
}

/**
 * Product / Layout page insets — Figma `Content` (`126:5146` inside Frame 1928).
 * Horizontal 24px (`spacing/6`); section stack gap 16px; 16px after Top Bar before header.
 */
export const pepAppContentInsetClass = "px-6"
export const pepAppContentTopClass = "pt-4"
export const pepAppContentBottomClass = "pb-6"
export const pepAppContentStackClass = "flex flex-col gap-4"
/** Full Figma Content column: inset + top/bottom + 16px stack (no max-width). */
export const pepAppContentClass = `${pepAppContentInsetClass} ${pepAppContentTopClass} ${pepAppContentBottomClass} ${pepAppContentStackClass}`
/** @deprecated Prefer `pepAppContentClass` (includes stack gap). */
export const pepAppContentAreaClass = `${pepAppContentInsetClass} ${pepAppContentTopClass} ${pepAppContentBottomClass}`

/** Sticky offset for content below the floating site header (Top Bar). */
export const pepSiteHeaderStickyOffsetClass = "top-[var(--app-header-height)]"

/** Min shell height for Figma header/Page (36px). */
export const pepPageHeaderShellClass =
  "min-h-[var(--pep-page-header-height)] shrink-0"

/** Sticky offset for filter row at the top of the scroll area (site Top Bar scrolls away). */
export const pepFilterRowStickyOffsetClass = "top-0"

/** @deprecated Use `pepFilterRowStickyOffsetClass` — page title is no longer sticky. */
export const pepPageToolbarStickyOffsetClass = pepFilterRowStickyOffsetClass

/** Shared max-width shell for design-system preview pages (title + body align). Uses same inset as product pages. */
export const pepDesignSystemPageLayoutClass = `mx-auto w-full max-w-screen-2xl ${pepAppContentInsetClass}`

/** Page title row with optional actions (Figma `header/Page` `195:8791`). */
export function PepPageHeader({
  title,
  actions,
  className,
  innerClassName,
  sticky = false,
}: {
  title: string
  actions?: React.ReactNode
  className?: string
  /** When set, replaces default `px-6` on the row (use with `pepDesignSystemPageLayoutClass`). */
  innerClassName?: string
  /**
   * Sticky shell title with frosted backdrop. Opt in for special cases —
   * product layouts keep the page title in normal document flow.
   */
  sticky?: boolean
}) {
  return (
    <div
      className={cn(
        "relative flex w-full items-center gap-3 bg-background",
        pepPageHeaderShellClass,
        sticky && ["sticky z-40 isolate self-start", pepSiteHeaderStickyOffsetClass],
        innerClassName ?? pepAppContentInsetClass,
        className,
      )}
    >
      {sticky ? (
        <div
          className="pointer-events-none absolute inset-0 bg-background/60 backdrop-blur-[4px]"
          aria-hidden
        />
      ) : null}
      <div className="relative min-w-0 flex-1 pl-1">
        <h1
          className={cn(
            "font-heading tracking-normal text-foreground",
            typeToken("text-2xl/medium"),
          )}
        >
          {title}
        </h1>
      </div>
      {actions ? (
        <div className="relative flex shrink-0 items-center justify-end gap-3">{actions}</div>
      ) : null}
    </div>
  )
}

/**
 * Popup / dialog title row (Figma `header/Popup`, e.g. 新增活動).
 * Title left; primary actions + close on the right. Prefer over `PepPageHeader` inside Dialogs.
 */
export function PepPopupHeader({
  title,
  actions,
  onClose,
  closeLabel = "Close",
  className,
}: {
  title: React.ReactNode
  /** Primary / secondary actions before the close control (e.g. Publish). */
  actions?: React.ReactNode
  onClose?: () => void
  closeLabel?: string
  className?: string
}) {
  return (
    <header
      data-slot="popup-header"
      className={cn(
        "flex min-h-16 shrink-0 items-center gap-2.5 rounded-t-xl bg-background py-3.5 pr-4 pl-6",
        className,
      )}
    >
      <h1 className={cn(typeToken("text-lg/semibold"), "min-w-0 flex-1 tracking-tight text-foreground")}>
        {title}
      </h1>
      <div className="flex shrink-0 items-center gap-2.5">
        {actions}
        {onClose ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label={closeLabel}
            onClick={onClose}
          >
            <X className="size-4" aria-hidden />
          </Button>
        ) : null}
      </div>
    </header>
  )
}

/** Site footer — copyright + legal links (PEP Figma footer, e.g. node 1718:50647). */
export function PepSiteFooter({
  copyright = "© 2026 MRC International Group Limited. All rights reserved.",
  privacyHref = "#",
  termsHref = "#",
  privacyLabel = "Privacy Policy",
  termsLabel = "Term of Use",
  className,
}: {
  copyright?: string
  privacyHref?: string
  termsHref?: string
  privacyLabel?: string
  termsLabel?: string
  className?: string
}) {
  return (
    <footer
      data-slot="site-footer"
      className={cn(
        "flex flex-wrap items-center justify-center gap-1 bg-sidebar-accent px-6 py-4 leading-4 text-sidebar-accent-foreground",
        typeToken("text-xs/light"),
        className,
      )}
    >
      <p className="opacity-65">{copyright}</p>
      <p className="flex flex-wrap items-center gap-0.5">
        <a
          href={privacyHref}
          className={cn(
            typeToken("text-xs/normal"),
            "text-primary underline-offset-2 opacity-80 hover:underline",
          )}
        >
          {privacyLabel}
        </a>
        <span className="opacity-65">and</span>
        <a
          href={termsHref}
          className={cn(
            typeToken("text-xs/normal"),
            "text-primary underline-offset-2 opacity-80 hover:underline",
          )}
        >
          {termsLabel}
        </a>
        <span className="opacity-65">.</span>
      </p>
    </footer>
  )
}

/** Design-system preview page shell — same content inset as product layouts. */
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
      <div
        className={cn(
          pepDesignSystemPageLayoutClass,
          pepAppContentTopClass,
          "pb-12",
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  )
}

/**
 * Product list / admin page body (Figma right column under Top Bar).
 * Preview shell already supplies Main menu + Top Bar; this is Page header → Content → Footer.
 * @see https://www.figma.com/design/IZ6algHkFp6Z2a5dYiS1hC/PEP?node-id=126-5143
 */
export function PepAdminPageLayout({
  title,
  actions,
  children,
  footer = true,
  className,
  contentClassName,
}: {
  title: string
  actions?: React.ReactNode
  children: React.ReactNode
  /** `true` = default site footer; `false` = omit; node = custom. */
  footer?: boolean | React.ReactNode
  className?: string
  contentClassName?: string
}) {
  return (
    <div className={cn("flex w-full min-w-0 flex-col bg-background", className)}>
      {/* Figma Content: one padded column; header + body share gap-4 */}
      <div className={cn(pepAppContentClass, contentClassName)}>
        <PepPageHeader title={title} actions={actions} innerClassName="px-0" />
        {children}
      </div>
      {footer === false ? null : footer === true ? <PepSiteFooter className="shrink-0" /> : footer}
    </div>
  )
}

/** Nearest scrollport for sticky / IntersectionObserver (main preview column). */
function getScrollParent(el: HTMLElement | null): Element | null {
  let node = el?.parentElement ?? null
  while (node && node !== document.body) {
    const { overflowY } = getComputedStyle(node)
    if (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") {
      return node
    }
    node = node.parentElement
  }
  return null
}

/** Toolbar above tables — left cluster + right actions (Figma “Filter row”). */
export function PepFilterRow({
  left,
  right,
  className,
  leftClassName,
  rightClassName,
  sticky = true,
}: {
  left: React.ReactNode
  right?: React.ReactNode
  className?: string
  leftClassName?: string
  rightClassName?: string
  /**
   * Sticky filter toolbar. Uses `py-0` in document flow and `py-4` (16px) once stuck
   * at the top of the scroll area (site Top Bar scrolls away).
   */
  sticky?: boolean
}) {
  const sentinelRef = React.useRef<HTMLDivElement>(null)
  const [stuck, setStuck] = React.useState(false)

  React.useEffect(() => {
    if (!sticky) {
      setStuck(false)
      return
    }
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const root = getScrollParent(sentinel)
    const observer = new IntersectionObserver(
      ([entry]) => {
        setStuck(!entry.isIntersecting)
      },
      // threshold 0: zero-height sentinel still reports enter/leave cleanly
      { root, threshold: 0 },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [sticky])

  return (
    <>
      {sticky ? (
        <div
          ref={sentinelRef}
          // h-0 so it adds no height; -mb-4 cancels parent `gap-4` so it isn't an extra section.
          className="pointer-events-none -mb-4 h-0 w-full shrink-0 overflow-hidden"
          aria-hidden
        />
      ) : null}
      <div
        data-stuck={sticky && stuck ? "true" : undefined}
        className={cn(
          "z-30 flex w-full flex-wrap items-center justify-between gap-3 py-0 transition-[padding] duration-150",
          sticky && [
            "sticky top-0 self-start bg-background/80 backdrop-blur-[4px]",
            // Keep explicit top utility for consumers reading the offset token.
            pepFilterRowStickyOffsetClass,
            stuck && "py-4",
          ],
          pepAppContentInsetClass,
          className,
        )}
      >
        <div className={cn("flex min-w-0 flex-1 flex-wrap items-center gap-3", leftClassName)}>
          {left}
        </div>
        {right ? (
          <div className={cn("flex shrink-0 items-center gap-2", rightClassName)}>{right}</div>
        ) : null}
      </div>
    </>
  )
}
