import {
  MoreHorizontal,
  Plus,
} from "lucide-react"
import * as React from "react"

import { ActivityCard } from "@/components/activity-card"
import { FilterRow, type FilterRowView } from "@/components/filter-row"
import { PepAdminPageLayout } from "@/components/pep-chrome"
import { Badge, BadgeImage } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { PepPagination } from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

const STATUS_TABS = [
  { id: "draft", label: "草稿" },
  { id: "upcoming", label: "待发生" },
  { id: "ongoing", label: "进行中" },
  { id: "closed", label: "Closed" },
] as const

type CategoryTag = {
  label: string
  imageSrc: string
}

type ActivityListRow = {
  id: string
  code: string
  title: string
  imageSrc: string
  publishDates: [string, string]
  eventDates: [string, string]
  categories: CategoryTag[]
  statusLabel: string
  /** Live / publish indicator label (tooltip on green bullet). */
  liveLabel: string
}

const ACTIVITY_LIST_ROW_TEMPLATE: Omit<ActivityListRow, "id" | "code" | "title"> = {
  imageSrc: "/assets/figma/activity-list/cover.jpeg",
  publishDates: ["2025/12/26", "2025/12/26"],
  eventDates: ["2025/12/26", "2025/12/26"],
  categories: [
    { label: "Category", imageSrc: "/assets/figma/activity-list/category-1.png" },
    { label: "Badge", imageSrc: "/assets/figma/activity-list/category-2.png" },
  ],
  statusLabel: "Draft",
  liveLabel: "Active",
}

const ACTIVITY_LIST_PAGE_SIZE = 10
const ACTIVITY_LIST_ROW_COUNT = ACTIVITY_LIST_PAGE_SIZE * 2

const ACTIVITY_ROWS: ActivityListRow[] = Array.from(
  { length: ACTIVITY_LIST_ROW_COUNT },
  (_, index) => ({
    ...ACTIVITY_LIST_ROW_TEMPLATE,
    id: String(index + 1),
    code: `A-${String(123456 + index).padStart(6, "0")}`,
    title:
      index % 2 === 0
        ? "從 11 月中旬開始，香港街頭即換上璀璨聖誕裝，商場、海濱、街道通通沉浸在節日氣氛中。"
        : "新年市集活動 — 本地手作與節慶小食齊聚一堂，適合親子同遊的週末體驗。",
  }),
)

function DateRangeCell({ dates }: { dates: [string, string] }) {
  return (
    <div className="flex w-full flex-col items-center">
      <span className={cn(typeToken("text-sm/medium"), "text-foreground")}>{dates[0]}</span>
      <div className="flex w-full items-center justify-center gap-1">
        <div className="h-px min-w-px flex-1 border-t border-dashed border-border" aria-hidden />
        <span className={cn(typeToken("text-10/normal"), "shrink-0 text-muted-foreground")}>to</span>
        <div className="h-px min-w-px flex-1 border-t border-dashed border-border" aria-hidden />
      </div>
      <span className={cn(typeToken("text-sm/medium"), "text-foreground")}>{dates[1]}</span>
    </div>
  )
}

function CategoryTagsCell({ tags }: { tags: CategoryTag[] }) {
  return (
    <div className="flex flex-wrap content-center gap-1">
      {tags.map((tag) => (
        <BadgeImage key={`${tag.label}-${tag.imageSrc}`} size="lg" src={tag.imageSrc}>
          {tag.label}
        </BadgeImage>
      ))}
    </div>
  )
}

function StatusLiveCell({
  statusLabel,
  liveLabel = "Active",
}: {
  statusLabel: string
  liveLabel?: string
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Badge variant="Light" size="sm">
        {statusLabel}
      </Badge>
      <Tooltip>
        <TooltipTrigger
          className="inline-flex size-4 items-center justify-center"
          aria-label={liveLabel}
        >
          <span className="size-3 rounded-full bg-emerald-500" />
        </TooltipTrigger>
        <TooltipContent>{liveLabel}</TooltipContent>
      </Tooltip>
    </div>
  )
}

/**
 * Demo → 活動 — list (Frame 1928) + grid (`Card_custom/活動`, Frame 24012).
 * Shell (App) = Main menu + Top Bar; this page = Page header + Content + Footer.
 * @see https://www.figma.com/design/IZ6algHkFp6Z2a5dYiS1hC/PEP?node-id=126-5143
 * @see https://www.figma.com/design/IZ6algHkFp6Z2a5dYiS1hC/PEP?node-id=2623-118470
 */
export function ActivityListPage({
  onCreate,
}: {
  /** Opens Demo → 新增活動 (`/preview/admin/activity-create`). */
  onCreate?: () => void
}) {
  const [tab, setTab] = React.useState<string>("draft")
  const [search, setSearch] = React.useState("")
  const [page, setPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(10)
  const [selected, setSelected] = React.useState<Record<string, boolean>>({})
  const [view, setView] = React.useState<FilterRowView>("rows")

  const selectedCount = Object.values(selected).filter(Boolean).length
  const pageRows = ACTIVITY_ROWS.slice((page - 1) * pageSize, page * pageSize)
  const pageCount = Math.max(1, Math.ceil(ACTIVITY_ROWS.length / pageSize))
  const allSelected = pageRows.length > 0 && pageRows.every((row) => selected[row.id])

  return (
    <PepAdminPageLayout
      title="活動"
      actions={
        <Button
          type="button"
          size="icon"
          aria-label="新增活動"
          onClick={onCreate}
        >
          <Plus aria-hidden />
        </Button>
      }
    >
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          {STATUS_TABS.map((item) => (
            <TabsTrigger key={item.id} value={item.id}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <FilterRow
        searchValue={search}
        onSearchChange={setSearch}
        filterCount={3}
        selectedCount={selectedCount}
        view={view}
        onViewChange={setView}
      />

      {view === "grid" ? (
        <div className="flex flex-col gap-0">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {pageRows.map((row) => (
              <ActivityCard
                key={row.id}
                title={row.title}
                code={row.code}
                imageSrc={row.imageSrc}
                meta={`${row.eventDates[0]} – ${row.eventDates[1]}`}
                metaSecondary="Activity"
                tags={row.categories.map((tag) => ({ label: tag.label }))}
                statusLabel={row.statusLabel}
                liveLabel={row.liveLabel}
              />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border px-0 py-2">
            <p className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>
              {selectedCount} of {ACTIVITY_ROWS.length} row(s) selected.
            </p>
            <PepPagination
              variant="long"
              page={page}
              pageCount={pageCount}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={(size) => {
                setPageSize(size)
                setPage(1)
              }}
              className="py-0"
            />
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border bg-background">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={(value) => {
                      const next = value === true
                      setSelected((current) => ({
                        ...current,
                        ...Object.fromEntries(pageRows.map((row) => [row.id, next])),
                      }))
                    }}
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead className="w-[88px]">圖</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="w-[120px] text-center">Publish Date</TableHead>
                <TableHead className="w-[120px] text-center">舉行時間</TableHead>
                <TableHead className="w-[140px] text-center">Category</TableHead>
                <TableHead className="w-[120px] text-center">狀態</TableHead>
                <TableHead className="w-12 text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageRows.map((row) => (
                <TableRow key={row.id} data-state={selected[row.id] ? "selected" : undefined}>
                  <TableCell>
                    <Checkbox
                      checked={Boolean(selected[row.id])}
                      onCheckedChange={(value) =>
                        setSelected((current) => ({
                          ...current,
                          [row.id]: value === true,
                        }))
                      }
                      aria-label={`Select ${row.code}`}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="size-16 overflow-hidden rounded-md border border-border bg-muted">
                      <img src={row.imageSrc} alt="" className="size-full object-cover" />
                    </div>
                  </TableCell>
                  <TableCell className="min-w-0 w-full">
                    <div className="flex w-full min-w-0 flex-col gap-0.5">
                      <span
                        className={cn(
                          typeToken("text-sm/medium"),
                          "w-full truncate text-foreground",
                        )}
                      >
                        {row.title}
                      </span>
                      <Badge variant="outline" size="sm" className="w-fit">
                        {row.code}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <DateRangeCell dates={row.publishDates} />
                  </TableCell>
                  <TableCell className="text-center">
                    <DateRangeCell dates={row.eventDates} />
                  </TableCell>
                  <TableCell>
                    <CategoryTagsCell tags={row.categories} />
                  </TableCell>
                  <TableCell>
                    <StatusLiveCell
                      statusLabel={row.statusLabel}
                      liveLabel={row.liveLabel}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      aria-label="More"
                    >
                      <MoreHorizontal aria-hidden />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-3 py-2">
            <p className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>
              {selectedCount} of {ACTIVITY_ROWS.length} row(s) selected.
            </p>
            <PepPagination
              variant="long"
              page={page}
              pageCount={pageCount}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={(size) => {
                setPageSize(size)
                setPage(1)
              }}
              className="py-0"
            />
          </div>
        </div>
      )}
    </PepAdminPageLayout>
  )
}
