import {
  CalendarDays,
  Frame,
  Home,
  LifeBuoy,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react"
import { useState } from "react"

import {
  MainMenuNavGroupLabel,
  MainMenuNavItemRow,
  MainMenuNavSubItemRow,
  MainMenuNavSubList,
  MainMenuTeamSwitcherRow,
  MainMenuUserMenuRow,
  NavProjectMenuRow,
} from "@/components/main-menu-rows"
import { PepDesignSystemPage } from "@/components/pep-chrome"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const MAIN_MENU_LIST_TYPES = [
  "Team switcher",
  "NavGroup label",
  "NavItem",
  "NavItem expandable",
  "NavSubItem",
  "NavSecondary item",
  "NavProject item with action",
  "User menu row",
] as const

const MAIN_MENU_LIST_STATUSES = [
  "Interactive",
  "Disabled",
  "Collapsed",
] as const

const MAIN_MENU_LIBRARY_PREVIEW_WIDTH = "w-full min-w-0"

function MainMenuListStylePreview({
  type,
  status,
}: {
  type: (typeof MAIN_MENU_LIST_TYPES)[number]
  status: (typeof MAIN_MENU_LIST_STATUSES)[number]
}) {
  const [toggled, setToggled] = useState(false)
  const isInteractive = status === "Interactive"
  const isActive = isInteractive && type !== "NavItem expandable" ? toggled : false
  const isDisabled = status === "Disabled"
  const isCollapsed = status === "Collapsed"
  const isExpanded = isInteractive && type === "NavItem expandable" && toggled

  if (type === "Team switcher") {
    return (
      <MainMenuTeamSwitcherRow
        active={isActive}
        collapsed={isCollapsed}
        disabled={isDisabled}
        interactive={isInteractive}
        onClick={isInteractive ? () => setToggled((value) => !value) : undefined}
      />
    )
  }

  if (isCollapsed && type !== "NavItem" && type !== "NavItem expandable") {
    return <span className="text-xs text-muted-foreground/60">â€”</span>
  }

  if (type === "NavGroup label") {
    return <MainMenuNavGroupLabel disabled={isDisabled} />
  }

  if (type === "NavSubItem") {
    return (
      <MainMenuNavSubList>
        <MainMenuNavSubItemRow
          label={type}
          active={isActive}
          disabled={isDisabled}
          interactive={isInteractive}
          onClick={isInteractive ? () => setToggled((value) => !value) : undefined}
        />
      </MainMenuNavSubList>
    )
  }

  if (type === "NavProject item with action") {
    return (
      <NavProjectMenuRow
        active={isActive}
        disabled={isDisabled}
        interactive={isInteractive}
        onRowClick={isInteractive ? () => setToggled((value) => !value) : undefined}
      >
        <Frame className="opacity-85" aria-hidden />
        <span className="min-w-0 flex-1 truncate">NavProject item with action</span>
      </NavProjectMenuRow>
    )
  }

  if (type === "User menu row") {
    return (
      <MainMenuUserMenuRow
        active={isActive}
        disabled={isDisabled}
        interactive={isInteractive}
        onClick={isInteractive ? () => setToggled((value) => !value) : undefined}
      />
    )
  }

  const isSecondary = type === "NavSecondary item"
  const isExpandable = type === "NavItem expandable"
  const Icon = isSecondary ? LifeBuoy : isExpandable ? CalendarDays : Home

  return (
    <MainMenuNavItemRow
      label={type}
      icon={Icon}
      active={isActive}
      collapsed={isCollapsed}
      disabled={isDisabled}
      expandable={isExpandable}
      expanded={isExpanded}
      secondary={isSecondary}
      showBadge={isExpandable}
      interactive={isInteractive}
      onClick={isInteractive ? () => setToggled((value) => !value) : undefined}
    />
  )
}

function MainMenuListStyleList() {
  return (
    <div className="divide-y divide-border text-xs">
      <div className="grid grid-cols-3 gap-4 px-4 py-3 text-muted-foreground">
        {MAIN_MENU_LIST_STATUSES.map((status) => (
          <div key={status} className={cn("font-medium", MAIN_MENU_LIBRARY_PREVIEW_WIDTH)}>
            {status}
          </div>
        ))}
      </div>
      {MAIN_MENU_LIST_TYPES.map((type) => (
        <div key={type} className="px-4 py-4">
          <div className="grid grid-cols-3 gap-4">
            {MAIN_MENU_LIST_STATUSES.map((status) => (
              <div key={status} className={MAIN_MENU_LIBRARY_PREVIEW_WIDTH}>
                <div className="w-full min-w-0">
                  <MainMenuListStylePreview type={type} status={status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function DemoMainMenu() {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false)
  const [isNavItemExpanded, setIsNavItemExpanded] = useState(false)
  const [selectedDemoItem, setSelectedDemoItem] = useState<string | null>(null)
  const toggleSelectedDemoItem = (key: string) => {
    setSelectedDemoItem((current) => (current === key ? null : key))
  }
  const toggleMenuCollapsed = () => {
    setIsMenuCollapsed((value) => {
      if (!value) {
        setIsNavItemExpanded(false)
        setSelectedDemoItem((current) =>
          current === "nav-sub-item" ||
          current === "nav-secondary-item" ||
          current === "nav-project-item" ||
          current === "user-menu-row"
            ? null
            : current,
        )
      }
      return !value
    })
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" size="sm" onClick={toggleMenuCollapsed}>
          {isMenuCollapsed ? (
            <>
              <PanelLeftOpen className="size-4" aria-hidden />
              Expand menu
            </>
          ) : (
            <>
              <PanelLeftClose className="size-4" aria-hidden />
              Collapse menu
            </>
          )}
        </Button>
      </div>

      <div
        className={cn(
          "rounded-xl border border-sidebar-border bg-sidebar p-3 text-sidebar-foreground transition-[width] duration-200",
          isMenuCollapsed ? "w-fit" : "w-full max-w-sm",
        )}
      >
        <MainMenuTeamSwitcherRow
          collapsed={isMenuCollapsed}
          active={selectedDemoItem === "team-switcher"}
          onClick={() => toggleSelectedDemoItem("team-switcher")}
        />
        {!isMenuCollapsed ? <div className="my-3 h-px bg-sidebar-border" /> : null}
        {!isMenuCollapsed ? <MainMenuNavGroupLabel /> : null}
        <div className={cn("space-y-1", isMenuCollapsed && "mt-2")}>
          <MainMenuNavItemRow
            label="NavItem expandable"
            icon={CalendarDays}
            collapsed={isMenuCollapsed}
            expandable
            expanded={isNavItemExpanded}
            showBadge
            onClick={() => setIsNavItemExpanded((value) => !value)}
          />
          {!isMenuCollapsed && isNavItemExpanded ? (
            <MainMenuNavSubList>
              <MainMenuNavSubItemRow
                label="NavSubItem"
                active={selectedDemoItem === "nav-sub-item"}
                onClick={() => toggleSelectedDemoItem("nav-sub-item")}
              />
              <MainMenuNavSubItemRow label="NavSubItem (disabled)" disabled />
            </MainMenuNavSubList>
          ) : null}
          <MainMenuNavItemRow
            label="NavItem expandable (disabled)"
            icon={CalendarDays}
            collapsed={isMenuCollapsed}
            expandable
            showBadge
            disabled
          />
          <MainMenuNavItemRow
            label="NavItem (disabled)"
            icon={Home}
            collapsed={isMenuCollapsed}
            disabled
          />
          <MainMenuNavItemRow
            label="NavItem"
            icon={Home}
            collapsed={isMenuCollapsed}
            active={selectedDemoItem === "nav-item"}
            onClick={() => toggleSelectedDemoItem("nav-item")}
          />
        </div>

        {!isMenuCollapsed ? (
          <>
            <div className="my-3 h-px bg-sidebar-border" />

            <MainMenuNavGroupLabel />
            <div className="space-y-1">
              <MainMenuNavItemRow
                label="NavSecondary item"
                icon={LifeBuoy}
                secondary
                active={selectedDemoItem === "nav-secondary-item"}
                onClick={() => toggleSelectedDemoItem("nav-secondary-item")}
              />
              <MainMenuNavItemRow label="NavSecondary item (disabled)" icon={LifeBuoy} secondary disabled />
              <NavProjectMenuRow
                active={selectedDemoItem === "nav-project-item"}
                interactive
                onRowClick={() => toggleSelectedDemoItem("nav-project-item")}
              >
                <Frame className="opacity-85" aria-hidden />
                <span className="min-w-0 flex-1 truncate">NavProject item with action</span>
              </NavProjectMenuRow>
              <NavProjectMenuRow disabled interactive={false}>
                <Frame className="opacity-85" aria-hidden />
                <span className="min-w-0 flex-1 truncate">NavProject item with action (disabled)</span>
              </NavProjectMenuRow>
            </div>

            <div className="my-3 h-px bg-sidebar-border" />

            <MainMenuUserMenuRow
              active={selectedDemoItem === "user-menu-row"}
              onClick={() => toggleSelectedDemoItem("user-menu-row")}
            />
          </>
        ) : null}
      </div>
    </div>
  )
}

export function MainMenuPage() {
  return (
    <PepDesignSystemPage title="Sidebar" contentClassName="flex flex-col gap-10">
        <section>
          <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">Notes</h2>
          <p className="text-xs text-muted-foreground">
            Reference:{" "}
            <a
              href="https://ui.shadcn.com/blocks/sidebar#sidebar-07"
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline underline-offset-2 hover:text-foreground/80"
            >
              shadcn sidebar-07
            </a>
            . Item library matches this block — copy from the ref.
          </p>
        </section>

        <section>
          <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">Sidebar Item Library</h2>
          <p className="mb-4 text-xs text-muted-foreground">
            All main menu item variants shown here are finalized as the approved library. When drawing
            pages with a left menu, pick from this table before creating a new menu item style.
          </p>
          <div className="rounded-xl border border-border">
            <MainMenuListStyleList />
          </div>
        </section>

        <section>
          <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">Demo menu</h2>
          <p className="mb-4 text-xs text-muted-foreground">
            Example using the approved item variants in one menu structure.
          </p>
          <DemoMainMenu />
        </section>

        <section>
          <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">Pending</h2>
          <Card>
            <CardContent className="p-4 text-xs text-muted-foreground">
              No pending main menu variants. Add alternate menu item styles here before promoting them
              into the item variants library.
            </CardContent>
          </Card>
        </section>
    </PepDesignSystemPage>
  )
}
