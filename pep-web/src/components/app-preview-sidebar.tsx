import {
  Boxes,
  ClipboardList,
  Component,
  LayoutTemplate,
  Layers,
  type LucideIcon,
} from "lucide-react"
import * as React from "react"

import {
  MainMenuNavGroupLabel,
  MainMenuNavItemRow,
  MainMenuNavSubItemRow,
  MainMenuNavSubList,
  MainMenuTeamSwitcherRow,
} from "@/components/main-menu-rows"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export type PreviewPage =
  | "theme"
  | "typography"
  | "site-header"
  | "buttons"
  | "button-group"
  | "badges"
  | "tooltips"
  | "avatars"
  | "tabs"
  | "pagination"
  | "radio-checkbox"
  | "switch"
  | "toggle"
  | "toggle-group"
  | "progress"
  | "richtext"
  | "image-file"
  | "hover-action"
  | "dropdown-menu"
  | "steppers"
  | "sidebar-items"
  | "sidebar"
  | "table-cell"
  | "filter-row"
  | "form-menu"
  | "form-bottom"
  | "footer"
  | "page-header"
  | "popup-header"
  | "table"
  | "full-page-popup"
  | "input-type"
  | "filter"
  | "orders"
  | "tasks"
  | "activity-create"
  | "activity-list"

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
      { id: "button-group", label: "Button group" },
      { id: "buttons", label: "Buttons" },
      { id: "dropdown-menu", label: "Dropdown menu" },
      { id: "input-type", label: "Field" },
      { id: "hover-action", label: "Hover action" },
      { id: "image-file", label: "Image / File" },
      { id: "pagination", label: "Pagination" },
      { id: "progress", label: "Progress" },
      { id: "radio-checkbox", label: "Radio / Checkbox" },
      { id: "richtext", label: "Richtext" },
      { id: "sidebar-items", label: "Sidebar items" },
      { id: "steppers", label: "Steppers" },
      { id: "switch", label: "Switch" },
      { id: "tabs", label: "Tabs" },
      { id: "toggle", label: "Toggle" },
      { id: "toggle-group", label: "Toggle group" },
      { id: "tooltips", label: "Tooltip" },
    ],
  },
  {
    id: "block",
    label: "Block",
    icon: Boxes,
    defaultOpen: true,
    items: [
      { id: "filter-row", label: "Filter row" },
      { id: "footer", label: "Footer" },
      { id: "form-bottom", label: "Form bottom" },
      { id: "form-menu", label: "Form Menu" },
      { id: "page-header", label: "Header-Table page" },
      { id: "popup-header", label: "Header-Popup" },
      { id: "sidebar", label: "Sidebar" },
      { id: "site-header", label: "Site header" },
      { id: "table-cell", label: "Table Cell" },
    ],
  },
  {
    id: "layout",
    label: "Layout",
    icon: LayoutTemplate,
    defaultOpen: true,
    items: [
      { id: "full-page-popup", label: "full page popup" },
      { id: "table", label: "Table" },
    ],
  },
  {
    id: "admin",
    label: "Demo pages",
    icon: ClipboardList,
    defaultOpen: true,
    items: [
      { id: "filter", label: "Filter" },
      { id: "activity-list", label: "活動" },
      { id: "orders", label: "Orders" },
      { id: "tasks", label: "Tasks" },
    ],
  },
]

export type AppPreviewSidebarProps = {
  page: PreviewPage
  collapsed?: boolean
  onNavigate: (next: PreviewPage) => void
  onExpandSidebar?: () => void
}

export function AppPreviewSidebar({
  page,
  collapsed = false,
  onNavigate,
  onExpandSidebar,
}: AppPreviewSidebarProps) {
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(SECTIONS.map((section) => [section.id, section.defaultOpen])),
  )

  // Keep the section that owns the active page open (e.g. Block → Header-Table page).
  React.useEffect(() => {
    const owner = SECTIONS.find((section) => section.items.some((item) => item.id === page))
    if (!owner) return
    setOpenSections((current) =>
      current[owner.id] ? current : { ...current, [owner.id]: true },
    )
  }, [page])

  return (
    <aside
      className={cn(
        "flex h-full min-h-0 shrink-0 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar py-3 pr-3 text-sidebar-foreground",
        collapsed ? "w-16 min-w-16 items-center pl-3" : "w-64 min-w-64 pl-0",
      )}
    >
      <div className={cn(!collapsed && "pl-3")}>
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
      </div>

      <ScrollArea
        scrollbarLeft={!collapsed}
        className={cn("min-h-0 w-full flex-1", collapsed && "flex flex-col items-center")}
      >
        <nav
          className={cn(
            "flex w-full flex-col gap-1 py-1",
            !collapsed && "pl-3",
            collapsed && "items-center",
          )}
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
      </ScrollArea>
    </aside>
  )
}
