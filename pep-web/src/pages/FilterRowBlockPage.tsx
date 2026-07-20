import * as React from "react"

import { FilterRow, type FilterRowView } from "@/components/filter-row"
import { PepDesignSystemPage } from "@/components/pep-chrome"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

type ToggleKey =
  | "search"
  | "filter"
  | "exportAction"
  | "batchAction"
  | "batchDelete"
  | "cardView"

const TOGGLES: { key: ToggleKey; label: string }[] = [
  { key: "search", label: "Search" },
  { key: "filter", label: "Filter" },
  { key: "exportAction", label: "Export" },
  { key: "batchAction", label: "Batch action" },
  { key: "batchDelete", label: "Batch delete" },
  { key: "cardView", label: "Card view" },
]

/**
 * Block → Filter row.
 * @see https://www.figma.com/design/IZ6algHkFp6Z2a5dYiS1hC/PEP?node-id=453-32712
 */
export function FilterRowBlockPage() {
  const [searchValue, setSearchValue] = React.useState("")
  const [view, setView] = React.useState<FilterRowView>("rows")
  const [visible, setVisible] = React.useState<Record<ToggleKey, boolean>>({
    search: true,
    filter: true,
    exportAction: true,
    batchAction: false,
    batchDelete: false,
    cardView: true,
  })

  return (
    <PepDesignSystemPage title="Filter row" contentClassName="space-y-10">
      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Notes</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-3 text-muted-foreground")}>
          Table toolbar from Figma{" "}
          <a
            href="https://www.figma.com/design/IZ6algHkFp6Z2a5dYiS1hC/PEP?node-id=453-32712"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            Filter row
          </a>
          . Compose with{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">FilterRow</code>; its controls
          reuse the approved Field, Button, Badge, and Toggle group components. Card view uses a
          connected icon{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">ToggleGroup</code> (
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">spacing=&#123;0&#125;</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">variant=&quot;outline&quot;</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">size=&quot;default&quot;</code>
          ). Shell padding is{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">py-0</code> in flow,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">py-4</code> (16px) when stuck.
          Pass <code className="rounded bg-muted px-1 py-0.5 text-[11px]">selectedCount</code> from
          the table — <span className="font-medium text-foreground">Batch Action</span> appears when
          one or more rows are selected. In Layout → Table, the filter row is{" "}
          <span className="font-medium text-foreground">sticky at the top of the scroll area</span>{" "}
          after the site Top Bar, page title, and tabs scroll away.
        </p>
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Library</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-4 text-muted-foreground")}>
          Toggle the Figma properties to preview supported compositions.
        </p>

        <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          {TOGGLES.map((toggle) => {
            const id = `filter-row-${toggle.key}`
            return (
              <div key={toggle.key} className="flex items-center gap-2">
                <Switch
                  id={id}
                  checked={visible[toggle.key]}
                  onCheckedChange={(checked) =>
                    setVisible((current) => ({ ...current, [toggle.key]: checked }))
                  }
                />
                <Label htmlFor={id} className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>
                  {toggle.label}
                </Label>
              </div>
            )
          })}
        </div>

        <div className="overflow-x-auto py-1">
          <div className="min-w-[900px]">
            <FilterRow
              sticky={false}
              {...visible}
              selectedCount={visible.batchAction || visible.batchDelete ? 999 : 0}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              view={view}
              onViewChange={setView}
            />
          </div>
        </div>
      </section>
    </PepDesignSystemPage>
  )
}
