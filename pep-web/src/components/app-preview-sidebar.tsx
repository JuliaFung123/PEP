import { Boxes, ClipboardList, Component, Layers, Moon, Sun, type LucideIcon } from "lucide-react"
import * as React from "react"

import {
  MainMenuNavGroupLabel,
  MainMenuNavItemRow,
  MainMenuNavSubItemRow,
  MainMenuNavSubList,
  MainMenuTeamSwitcherRow,
} from "@/components/main-menu-rows"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export type PreviewPage =
  | "theme"
  | "typography"
  | "site-header"
  | "buttons"
  | "badges"
  | "avatars"
  | "tabs"
  | "pagination"
  | "radio-checkbox"
  | "switch"
  | "progress"
  | "image-file"
  | "hover-action"
  | "steppers"
  | "sidebar"
  | "input-type"
  | "filter"
  | "orders"
  | "tasks"
  | "activity-create"

type ThemeMode = "light" | "dark"

const SECTIONS: {
  id: string
  label: string
  icon: LucideIcon
  defaultOpen: boolean
  items: { id: PreviewPage; label: string }[]
}[] = [
  {
    id: "design",
    label: "Design system",
    icon: Layers,
    defaultOpen: true,
    items: [
      { id: "theme", label: "Theme" },
      { id: "typography", label: "Typography" },
    ],
  },
  {
    id: "component",
    label: "Component",
    icon: Component,
    defaultOpen: true,
    items: [
      { id: "avatars", label: "Avatars" },
      { id: "badges", label: "Badges" },
      { id: "buttons", label: "Buttons" },
      { id: "input-type", label: "Field" },
      { id: "hover-action", label: "Hover action" },
      { id: "image-file", label: "Image / File" },
      { id: "pagination", label: "Pagination" },
      { id: "progress", label: "Progress" },
      { id: "radio-checkbox", label: "Radio / Checkbox" },
      { id: "sidebar", label: "Sidebar" },
      { id: "steppers", label: "Steppers" },
      { id: "switch", label: "Switch" },
      { id: "tabs", label: "Tabs" },
    ],
  },
  {
    id: "block",
    label: "Block",
    icon: Boxes,
    defaultOpen: true,
    items: [{ id: "site-header", label: "Site header" }],
  },
  {
    id: "admin",
    label: "Demo pages",
    icon: ClipboardList,
    defaultOpen: true,
    items: [
      { id: "filter", label: "Filter" },
      { id: "activity-create", label: "新增活動" },
      { id: "orders", label: "Orders" },
      { id: "tasks", label: "Tasks" },
    ],
  },
]

export type AppPreviewSidebarProps = {
  page: PreviewPage
  theme: ThemeMode
  collapsed?: boolean
  onNavigate: (next: PreviewPage) => void
  onThemeChange: (next: ThemeMode) => void
  onExpandSidebar?: () => void
}

export function AppPreviewSidebar({
  page,
  theme,
  collapsed = false,
  onNavigate,
  onThemeChange,
  onExpandSidebar,
}: AppPreviewSidebarProps) {
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(SECTIONS.map((section) => [section.id, section.defaultOpen])),
  )

  return (
    <aside
      className={cn(
        "flex shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-3 text-sidebar-foreground",
        collapsed ? "w-16 items-center" : "w-64",
      )}
    >
      <MainMenuTeamSwitcherRow
        title="PEP"
        subtitle="Web library"
        icon={Layers}
        ariaLabel="PEP workspace"
        showChevron={false}
        interactive={false}
        collapsed={collapsed}
      />

      {!collapsed ? <MainMenuNavGroupLabel label="Component previews" /> : null}

      <nav
        className={cn("flex w-full flex-1 flex-col gap-1 overflow-y-auto py-1", collapsed && "items-center")}
        aria-label="Preview sections"
      >
        {collapsed
          ? SECTIONS.map((section) => (
              <MainMenuNavItemRow
                key={section.id}
                label={section.label}
                icon={section.icon}
                collapsed
                active={section.items.some((item) => item.id === page)}
                onClick={() => {
                  onExpandSidebar?.()
                  onNavigate(section.items[0]?.id ?? page)
                }}
              />
            ))
          : SECTIONS.map((section) => {
              const isOpen = openSections[section.id] ?? section.defaultOpen

              return (
                <div key={section.id} className="space-y-1">
                  <MainMenuNavItemRow
                    label={section.label}
                    icon={section.icon}
                    expandable
                    expanded={isOpen}
                    onClick={() =>
                      setOpenSections((current) => ({
                        ...current,
                        [section.id]: !isOpen,
                      }))
                    }
                  />
                  {isOpen ? (
                    <MainMenuNavSubList>
                      {section.items.map((item) => (
                        <MainMenuNavSubItemRow
                          key={item.id}
                          label={item.label}
                          active={page === item.id}
                          currentPage
                          onClick={() => onNavigate(item.id)}
                        />
                      ))}
                    </MainMenuNavSubList>
                  ) : null}
                </div>
              )
            })}
      </nav>

      <div
        className={cn(
          "mt-auto flex items-center justify-between gap-2 border-t border-sidebar-border pt-3",
          collapsed && "w-full justify-center gap-0",
        )}
      >
        <Sun className={cn("size-4 shrink-0 text-muted-foreground", collapsed && "sr-only")} aria-hidden />
        <Switch
          checked={theme === "dark"}
          onCheckedChange={(value) => onThemeChange(value ? "dark" : "light")}
          aria-label="Light/Dark mode"
        />
        <Moon className={cn("size-4 shrink-0 text-muted-foreground", collapsed && "sr-only")} aria-hidden />
      </div>
    </aside>
  )
}
