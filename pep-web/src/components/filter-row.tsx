import {
  Download,
  LayoutGrid,
  List,
  ListFilter,
  Table2,
  Trash2,
} from "lucide-react"

import { PepFilterRow } from "@/components/pep-chrome"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

export type FilterRowView = "rows" | "grid"

export type FilterRowProps = {
  search?: boolean
  filter?: boolean
  exportAction?: boolean
  /**
   * Batch action visibility.
   * - `undefined` (default): show when `selectedCount > 0`
   * - `true`: always show (block library demos)
   * - `false`: never show
   */
  batchAction?: boolean
  batchDelete?: boolean
  cardView?: boolean
  filterCount?: number
  /** Selected table rows — drives batch action when `batchAction` is unset. */
  selectedCount?: number
  searchValue?: string
  onSearchChange?: (value: string) => void
  view?: FilterRowView
  onViewChange?: (view: FilterRowView) => void
  /** Sticks at the top of the scroll area in table layouts. Default on; disable in block library demos. */
  sticky?: boolean
  className?: string
}

/**
 * Table toolbar composition from Figma `Filter row` (453:32712).
 * Uses the shared Field, Button, Badge, Toggle group, and PepFilterRow primitives.
 * Batch action appears when the table has selected row(s), unless forced via `batchAction`.
 */
export function FilterRow({
  search = true,
  filter = true,
  exportAction = true,
  batchAction,
  batchDelete = false,
  cardView = true,
  filterCount = 3,
  selectedCount = 0,
  searchValue,
  onSearchChange,
  view = "rows",
  onViewChange,
  sticky = true,
  className,
}: FilterRowProps) {
  const showBatchAction = batchAction === true || (batchAction !== false && selectedCount > 0)

  return (
    <PepFilterRow
      sticky={sticky}
      className={cn("flex-nowrap px-0", className)}
      leftClassName="flex-nowrap"
      rightClassName="gap-3"
      left={
        <>
          {search ? (
            <Input
              value={searchValue}
              onChange={(event) => onSearchChange?.(event.target.value)}
              placeholder="Placeholder"
              aria-label="Search table"
              className="h-9 w-[340px] shrink-0 shadow-elevation-sm"
            />
          ) : null}

          {filter ? (
            <div className="relative shrink-0">
              <Button type="button" variant="outline" size="default">
                <ListFilter className="size-4 opacity-80" aria-hidden />
                Filter
              </Button>
              {filterCount > 0 ? (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 min-w-5 justify-center rounded-full px-1 font-semibold"
                >
                  {filterCount}
                </Badge>
              ) : null}
            </div>
          ) : null}

          {exportAction ? (
            <Button type="button" variant="Light" size="default">
              <Download className="size-4 opacity-80" aria-hidden />
              Export
            </Button>
          ) : null}

          {showBatchAction ? (
            <Button type="button" size="default">
              <Download className="size-4" aria-hidden />
              Batch Action{selectedCount > 0 ? ` (${selectedCount})` : null}
            </Button>
          ) : null}

          {batchDelete ? (
            <Button type="button" variant="destructive" size="default">
              <Trash2 className="size-4" aria-hidden />
              Batch Delete{selectedCount > 0 ? ` (${selectedCount})` : null}
            </Button>
          ) : null}
        </>
      }
      right={
        <>
          {cardView ? (
            <ToggleGroup
              value={[view]}
              onValueChange={(value) => {
                const nextView = value[0] as FilterRowView | undefined
                if (nextView) onViewChange?.(nextView)
              }}
              spacing={0}
              variant="outline"
              size="default"
            >
              <ToggleGroupItem value="rows" aria-label="Rows view">
                <List className="size-4" aria-hidden />
              </ToggleGroupItem>
              <ToggleGroupItem value="grid" aria-label="Grid view">
                <LayoutGrid className="size-4" aria-hidden />
              </ToggleGroupItem>
            </ToggleGroup>
          ) : null}

          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Table settings"
          >
            <Table2 className="size-4 opacity-80" aria-hidden />
          </Button>
        </>
      }
    />
  )
}
