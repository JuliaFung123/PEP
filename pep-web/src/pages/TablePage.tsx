import {
  MoreHorizontal,
  Plus,
} from "lucide-react"
import * as React from "react"

import { FilterRow, type FilterRowView } from "@/components/filter-row"
import { PepAdminPageLayout } from "@/components/pep-chrome"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

const STATUS_TABS = [
  { id: "draft", label: "Draft" },
  { id: "pending", label: "Pending" },
  { id: "registering", label: "Registering" },
  { id: "ended", label: "Ended" },
] as const

type ActivityRow = {
  id: string
  title: string
  status: string
  statusVariant: React.ComponentProps<typeof Badge>["variant"]
  imageSrc: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  organizers: { name: string; src?: string; fallback: string }[]
  tags: string[]
}

const ACTIVITY_ROW_TEMPLATES: Omit<ActivityRow, "id" | "title">[] = [
  {
    status: "Draft",
    statusVariant: "secondary",
    imageSrc: "/assets/figma/activity-create/cover-1.jpeg",
    startDate: "YYYY/MM/DD",
    startTime: "00:00",
    endDate: "YYYY/MM/DD",
    endTime: "00:00",
    organizers: [
      { name: "Name", fallback: "N", src: "https://github.com/shadcn.png" },
      { name: "Name", fallback: "N" },
    ],
    tags: ["Tag", "Tag"],
  },
  {
    status: "Pending",
    statusVariant: "outline",
    imageSrc: "/assets/figma/activity-create/cover-2.jpeg",
    startDate: "YYYY/MM/DD",
    startTime: "00:00",
    endDate: "YYYY/MM/DD",
    endTime: "00:00",
    organizers: [
      { name: "Name", fallback: "N", src: "https://github.com/shadcn.png" },
      { name: "Name", fallback: "N" },
    ],
    tags: ["Tag", "Tag"],
  },
]

const TABLE_PAGE_SIZE = 10
const TABLE_ROW_COUNT = TABLE_PAGE_SIZE * 2

const ACTIVITY_ROWS: ActivityRow[] = Array.from({ length: TABLE_ROW_COUNT }, (_, index) => {
  const template = ACTIVITY_ROW_TEMPLATES[index % ACTIVITY_ROW_TEMPLATES.length]
  return {
    ...template,
    id: String(index + 1),
    title: `活動名稱 ${index + 1}`,
  }
})

/**
 * Layout → Table — product composition from Figma Frame 1928.
 * Shell (App) = Main menu + Top Bar; this page = Page header + Content + Footer.
 * @see https://www.figma.com/design/IZ6algHkFp6Z2a5dYiS1hC/PEP?node-id=126-5143
 */
export function TablePage() {
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
        <Button type="button" size="icon" aria-label="Add">
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
        filterCount={2}
        selectedCount={selectedCount}
        view={view}
        onViewChange={setView}
      />

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
              <TableHead className="w-[88px]">
                <span className="sr-only">Cover</span>
              </TableHead>
              <TableHead>Activity</TableHead>
              <TableHead className="w-[120px]">From</TableHead>
              <TableHead className="w-[120px]">To</TableHead>
              <TableHead className="w-[140px]">Organizer</TableHead>
              <TableHead className="w-[120px]">Tags</TableHead>
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
                    aria-label={`Select ${row.title}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="size-16 overflow-hidden rounded-md border border-border bg-muted">
                    <img
                      src={row.imageSrc}
                      alt=""
                      className="size-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="min-w-0">
                  <div className="flex min-w-0 flex-col gap-1">
                    <span
                      className={cn(
                        typeToken("text-sm/medium"),
                        "w-full truncate text-foreground",
                      )}
                    >
                      {row.title}
                    </span>
                    <Badge variant={row.statusVariant} className="w-fit">
                      {row.status}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className={cn(typeToken("text-sm/medium"), "text-foreground")}>{row.startDate}</span>
                    <span className="text-muted-foreground">{row.startTime}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className={cn(typeToken("text-sm/medium"), "text-foreground")}>{row.endDate}</span>
                    <span className="text-muted-foreground">{row.endTime}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    {row.organizers.map((person, index) => (
                      <div key={`${row.id}-${index}`} className="flex items-center gap-1">
                        <Avatar size="sm">
                          {person.src ? <AvatarImage src={person.src} alt="" /> : null}
                          <AvatarFallback>{person.fallback}</AvatarFallback>
                        </Avatar>
                        <span className={cn(typeToken("text-sm/medium"), "text-foreground")}>{person.name}</span>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {row.tags.map((tag, index) => (
                      <Badge key={`${row.id}-tag-${index}`} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button type="button" variant="ghost" size="icon-sm" aria-label="More">
                    <MoreHorizontal className="size-4" aria-hidden />
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
    </PepAdminPageLayout>
  )
}
