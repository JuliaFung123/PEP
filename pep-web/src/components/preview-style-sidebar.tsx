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

const DEMO_SECTIONS: {
  id: string
  label: string
  icon: LucideIcon
  defaultOpen: boolean
  items: { id: string; label: string }[]
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
      { id: "button-group", label: "Button group" },
      { id: "buttons", label: "Buttons" },
      { id: "field", label: "Field" },
      { id: "sidebar-items", label: "Sidebar items" },
      { id: "toggle", label: "Toggle" },
      { id: "toggle-group", label: "Toggle group" },
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
      { id: "page-header", label: "Header-Table page" },
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
    items: [{ id: "table", label: "Table" }],
  },
  {
    id: "admin",
    label: "Demo pages",
    icon: ClipboardList,
    defaultOpen: false,
    items: [
      { id: "filter", label: "Filter" },
      { id: "activity-list", label: "活動" },
      { id: "orders", label: "Orders" },
      { id: "tasks", label: "Tasks" },
    ],
  },
]

/** Composed app sidebar — same structure as the preview shell (`AppPreviewSidebar`). */
export function PreviewStyleSidebar({
  collapsed = false,
  onToggleCollapsed,
  defaultActiveId = "sidebar",
  className,
}: {
  collapsed?: boolean
  onToggleCollapsed?: () => void
  defaultActiveId?: string
  className?: string
}) {
  const [activeId, setActiveId] = React.useState(defaultActiveId)
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(DEMO_SECTIONS.map((section) => [section.id, section.defaultOpen])),
  )

  return (
    <aside
      className={cn(
        "flex min-h-0 shrink-0 flex-col overflow-hidden border border-sidebar-border bg-sidebar py-3 pr-3 text-sidebar-foreground",
        collapsed
          ? "h-[32rem] w-16 items-center rounded-xl pl-3"
          : "h-[32rem] w-64 rounded-xl pl-0",
        className,
      )}
    >
      <div className={cn(!collapsed && "pl-3")}>
        <MainMenuTeamSwitcherRow
          title="PEP"
          subtitle="Web library"
          icon={Layers}
          ariaLabel="PEP workspace"
          showChevron={false}
          interactive={Boolean(onToggleCollapsed)}
          collapsed={collapsed}
          onClick={onToggleCollapsed}
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
          aria-label="Demo sections"
        >
          {collapsed
            ? DEMO_SECTIONS.map((section) => (
                <MainMenuNavItemRow
                  key={section.id}
                  label={section.label}
                  icon={section.icon}
                  collapsed
                  active={section.items.some((item) => item.id === activeId)}
                  onClick={() => {
                    onToggleCollapsed?.()
                    setActiveId(section.items[0]?.id ?? activeId)
                  }}
                />
              ))
            : DEMO_SECTIONS.map((section) => {
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
                            active={activeId === item.id}
                            currentPage
                            onClick={() => setActiveId(item.id)}
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
