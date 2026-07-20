import * as React from "react"

import { PreviewStyleSidebar } from "@/components/preview-style-sidebar"
import { PepDesignSystemPage } from "@/components/pep-chrome"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

export function SidebarBlockPage() {
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <PepDesignSystemPage title="Sidebar" contentClassName="space-y-10">
      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Notes</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-3 text-muted-foreground")}>
          Block composed like the preview app left rail. Closest shadcn pattern:{" "}
          <a
            href="https://ui.shadcn.com/blocks/sidebar"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            Sidebar blocks
          </a>
          . Atomic rows live under Component →{" "}
          <a
            href="/preview/sidebar-items"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            Sidebar items
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Library</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-4 text-muted-foreground")}>
          <span className="font-medium text-foreground">
            Use this block when adding an app sidebar.
          </span>{" "}
          Click the team row to toggle collapsed.
        </p>

        <div className="flex flex-wrap gap-6">
          <div className="space-y-2">
            <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>Default</div>
            <PreviewStyleSidebar
              collapsed={collapsed}
              onToggleCollapsed={() => setCollapsed((value) => !value)}
            />
          </div>
          <div className="space-y-2">
            <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>Collapsed</div>
            <PreviewStyleSidebar collapsed />
          </div>
        </div>
      </section>
    </PepDesignSystemPage>
  )
}
