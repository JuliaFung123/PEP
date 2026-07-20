import {
  ChevronDown,
  ChevronsUpDown,
  GalleryVerticalEnd,
  Home,
  LogOut,
  MoreHorizontal,
  type LucideIcon,
} from "lucide-react"
import { type MouseEvent, type ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { typeToken } from "@/data/typography-tokens"

export const sidebarMenuActionClass =
  "absolute right-1 flex size-5 items-center justify-center rounded-md p-0 text-muted-foreground opacity-0 outline-none transition-opacity focus-visible:opacity-100 focus-visible:ring-3 focus-visible:ring-ring/50 group-hover/menu-item:opacity-100 group-focus-within/menu-item:opacity-100"

export function MainMenuNavGroupLabel({
  label = "NavGroup label",
  disabled = false,
}: {
  label?: string
  disabled?: boolean
}) {
  return (
    <span
      className={cn(
        "flex h-8 w-full min-w-0 shrink-0 items-center rounded-md px-2 text-sidebar-foreground/70",
        typeToken("text-xs/medium"),
        disabled && "opacity-50",
      )}
    >
      {label}
    </span>
  )
}

export function MainMenuTeamSwitcherRow({
  title = "Team switcher",
  subtitle = "Company name",
  icon: Icon = GalleryVerticalEnd,
  ariaLabel = "Team switcher",
  active = false,
  collapsed = false,
  disabled = false,
  interactive = true,
  showChevron = true,
  onClick,
}: {
  title?: string
  subtitle?: string
  icon?: LucideIcon
  ariaLabel?: string
  active?: boolean
  collapsed?: boolean
  disabled?: boolean
  interactive?: boolean
  showChevron?: boolean
  onClick?: () => void
}) {
  const TeamSwitcher = interactive ? "button" : "span"
  const teamSwitcherProps = interactive
    ? {
        type: "button" as const,
        onClick,
        "aria-pressed": active,
      }
    : {}

  if (collapsed) {
    return (
      <TeamSwitcher
        {...teamSwitcherProps}
        aria-label={ariaLabel}
        className={cn(
          "flex size-8 items-center justify-center rounded-md outline-none",
          interactive && "cursor-pointer hover:bg-sidebar-accent focus-visible:ring-3 focus-visible:ring-ring/50",
          active && "bg-sidebar-accent",
          disabled && "pointer-events-none opacity-50",
        )}
      >
        <span className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <Icon className="size-4" aria-hidden />
        </span>
      </TeamSwitcher>
    )
  }

  return (
    <TeamSwitcher
      {...teamSwitcherProps}
      aria-label={ariaLabel}
      className={cn(
        "flex h-12 w-full min-w-0 items-center gap-2 rounded-lg p-2 text-left text-sm outline-none",
        interactive && "cursor-pointer hover:bg-sidebar-accent focus-visible:ring-3 focus-visible:ring-ring/50",
        active && "bg-sidebar-accent text-sidebar-primary",
        disabled && "pointer-events-none opacity-50",
      )}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <Icon className="size-4" aria-hidden />
      </span>
      <span className={cn(typeToken("text-sm/normal"), "grid min-w-0 flex-1 text-left leading-tight")}>
        <span className="truncate font-medium text-sidebar-foreground">{title}</span>
        <span className={cn(typeToken("text-xs/normal"), "truncate text-muted-foreground")}>{subtitle}</span>
      </span>
      {showChevron ? <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" aria-hidden /> : null}
    </TeamSwitcher>
  )
}

export function MainMenuNavItemRow({
  label,
  icon: Icon,
  active = false,
  collapsed = false,
  disabled = false,
  expandable = false,
  expanded = false,
  secondary = false,
  showBadge = false,
  interactive = true,
  onClick,
}: {
  label: string
  icon: LucideIcon
  active?: boolean
  collapsed?: boolean
  disabled?: boolean
  expandable?: boolean
  expanded?: boolean
  secondary?: boolean
  showBadge?: boolean
  interactive?: boolean
  onClick?: () => void
}) {
  const MenuItem = interactive ? "button" : "span"
  const menuItemProps = interactive
    ? {
        type: "button" as const,
        onClick,
        "aria-pressed": expandable ? undefined : active,
        "aria-expanded": expandable ? expanded : undefined,
        "aria-current": expandable && active ? ("page" as const) : undefined,
      }
    : {}

  if (collapsed) {
    return (
      <MenuItem
        {...menuItemProps}
        aria-label={label}
        className={cn(
          "flex size-8 items-center justify-center rounded-md text-sidebar-foreground outline-none",
          active && "bg-sidebar-accent text-sidebar-primary",
          interactive && "cursor-pointer hover:bg-sidebar-accent active:bg-sidebar-accent focus-visible:ring-3 focus-visible:ring-ring/50",
          disabled && "pointer-events-none opacity-50",
        )}
      >
        <Icon className="size-4" aria-hidden />
      </MenuItem>
    )
  }

  return (
    <MenuItem
      {...menuItemProps}
      className={cn(
        "peer/menu-button flex h-8 w-full min-w-0 items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm text-sidebar-foreground outline-none [&>span]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        secondary && "text-muted-foreground",
        interactive && "cursor-pointer focus-visible:ring-3 focus-visible:ring-ring/50",
        interactive && "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground",
        active && !expandable && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
        disabled && "pointer-events-none opacity-50",
      )}
    >
      <Icon className="opacity-85" aria-hidden />
      <span className={cn("min-w-0 flex-1 truncate", active && !expandable && "font-medium")}>{label}</span>
      {expandable ? (
        <>
          {showBadge ? (
            <Badge variant="secondary" className="h-5 px-1.5">
              12
            </Badge>
          ) : null}
          {expanded ? (
            <ChevronDown className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          ) : (
            <ChevronDown className="size-4 shrink-0 -rotate-90 text-muted-foreground" aria-hidden />
          )}
        </>
      ) : null}
    </MenuItem>
  )
}

export function MainMenuNavSubList({ children }: { children: ReactNode }) {
  return (
    <div className="mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5">
      {children}
    </div>
  )
}

export function MainMenuNavSubItemRow({
  label,
  active = false,
  disabled = false,
  interactive = true,
  currentPage = false,
  onClick,
}: {
  label: string
  active?: boolean
  disabled?: boolean
  interactive?: boolean
  currentPage?: boolean
  onClick?: () => void
}) {
  const SubItem = interactive ? "button" : "span"
  const subItemProps = interactive
    ? {
        type: "button" as const,
        onClick,
        "aria-pressed": currentPage ? undefined : active,
        "aria-current": currentPage && active ? ("page" as const) : undefined,
      }
    : {}

  return (
    <SubItem
      {...subItemProps}
      className={cn(
        "flex h-7 w-full min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-left text-sm text-sidebar-foreground outline-none [&>span]:truncate",
        interactive && "cursor-pointer focus-visible:ring-3 focus-visible:ring-ring/50",
        interactive && "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground",
        active && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
        disabled && "pointer-events-none opacity-50",
      )}
    >
      {label}
    </SubItem>
  )
}

export function MainMenuUserMenuRow({
  active = false,
  disabled = false,
  interactive = true,
  onClick,
}: {
  active?: boolean
  disabled?: boolean
  interactive?: boolean
  onClick?: () => void
}) {
  const UserRow = interactive ? "button" : "span"
  const userRowProps = interactive
    ? {
        type: "button" as const,
        onClick,
        "aria-pressed": active,
      }
    : {}

  return (
    <UserRow
      {...userRowProps}
      className={cn(
        "flex h-12 w-full min-w-0 items-center gap-2 rounded-lg p-2 text-left text-sm outline-none",
        interactive && "cursor-pointer focus-visible:ring-3 focus-visible:ring-ring/50",
        interactive && "hover:bg-sidebar-accent active:bg-sidebar-accent",
        active && "bg-sidebar-accent text-sidebar-primary",
        disabled && "pointer-events-none opacity-50",
      )}
    >
      <span className={cn(typeToken("text-xs/medium"), "flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground")}>
        PJ
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-medium text-foreground">User menu row</span>
        <span className={cn(typeToken("text-xs/normal"), "block truncate text-muted-foreground")}>admin@pep.local</span>
      </span>
      <LogOut className="size-4 text-muted-foreground" aria-hidden />
    </UserRow>
  )
}

export function NavProjectMenuRow({
  children,
  active = false,
  disabled = false,
  interactive = false,
  onRowClick,
}: {
  children: ReactNode
  active?: boolean
  disabled?: boolean
  interactive?: boolean
  onRowClick?: () => void
}) {
  const Row = interactive ? "button" : "span"
  const rowProps = interactive
    ? {
        type: "button" as const,
        onClick: onRowClick,
        "aria-pressed": active,
      }
    : {}

  return (
    <div
      className={cn(
        "group/menu-item relative w-full min-w-0 rounded-md",
        !disabled && "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        active && "bg-sidebar-accent text-sidebar-primary",
        disabled && "pointer-events-none opacity-50",
      )}
    >
      <Row
        {...rowProps}
        className={cn(
          "flex h-8 w-full min-w-0 items-center gap-2 bg-transparent p-2 text-left text-sm text-sidebar-foreground outline-none [&>span]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
          interactive && "cursor-pointer focus-visible:ring-3 focus-visible:ring-ring/50",
          active && "font-medium",
        )}
      >
        {children}
      </Row>
      {!disabled ? (
        <button
          type="button"
          aria-label="More"
          onClick={(event: MouseEvent<HTMLButtonElement>) => event.stopPropagation()}
          className={cn(sidebarMenuActionClass, "top-1.5", active && "text-sidebar-primary")}
        >
          <MoreHorizontal className="size-4 shrink-0" aria-hidden />
        </button>
      ) : null}
    </div>
  )
}

export type MainMenuIcon = typeof Home
