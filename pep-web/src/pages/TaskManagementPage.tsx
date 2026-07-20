import { formatDistanceToNow } from "date-fns"
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Cpu,
  Download,
  Filter,
  Headphones,
  LayoutGrid,
  Plus,
  Search,
  Table2,
  User,
} from "lucide-react"
import * as React from "react"

import { FilterSelect } from "@/components/filter-select"
import {
  pepAppContentClass,
  PepFilterRow,
  PepPageHeader,
} from "@/components/pep-chrome"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import {
  type Task,
  type TaskFilters,
  type TaskPriority,
  type TaskSource,
  type TaskStatus,
  type TaskType,
  TASKS_PAGE_SIZE,
  countEscalated,
  filterTasks,
  MOCK_TASKS,
} from "@/data/tasks-mock"
import { typeToken } from "@/data/typography-tokens"

const STATUS_OPTIONS = [
  { value: "all" as const, label: "All Status" },
  { value: "open" as const, label: "Open" },
  { value: "in_progress" as const, label: "In Progress" },
  { value: "resolved" as const, label: "Resolved" },
  { value: "escalated" as const, label: "Escalated" },
]

const PRIORITY_OPTIONS = [
  { value: "all" as const, label: "All Priority" },
  { value: "urgent" as const, label: "Urgent" },
  { value: "high" as const, label: "High" },
  { value: "medium" as const, label: "Medium" },
  { value: "low" as const, label: "Low" },
]

const TYPE_OPTIONS = [
  { value: "all" as const, label: "All Types" },
  { value: "maintenance" as const, label: "Maintenance" },
  { value: "complaint" as const, label: "Complaint" },
  { value: "request" as const, label: "Request" },
  { value: "billing" as const, label: "Billing" },
]

const SOURCE_OPTIONS = [
  { value: "all" as const, label: "All Sources" },
  { value: "tenant" as const, label: "Tenant" },
  { value: "system" as const, label: "System" },
  { value: "staff" as const, label: "Staff" },
]

function typeBadgeClass(type: TaskType): string {
  switch (type) {
    case "maintenance":
      return "border-orange-500/40 bg-orange-500/15 text-orange-900 dark:text-orange-100"
    case "complaint":
      return "border-pink-500/40 bg-pink-500/15 text-pink-900 dark:text-pink-100"
    case "request":
      return "border-sky-500/40 bg-sky-500/15 text-sky-900 dark:text-sky-100"
    case "billing":
      return "border-violet-500/40 bg-violet-500/15 text-violet-900 dark:text-violet-100"
    default:
      return ""
  }
}

function formatTypeLabel(type: TaskType): string {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

function StatusBadge({ status }: { status: TaskStatus }) {
  const common = "gap-1 capitalize"
  switch (status) {
    case "open":
      return (
        <Badge variant="outline" className={cn(common, "border-border")}>
          <span className="size-1.5 rounded-full bg-muted-foreground" aria-hidden />
          Open
        </Badge>
      )
    case "in_progress":
      return (
        <Badge variant="outline" className={cn(common, "border-sky-500/40 bg-sky-500/10 text-sky-900 dark:text-sky-100")}>
          <Clock className="size-3.5" aria-hidden />
          In Progress
        </Badge>
      )
    case "resolved":
      return (
        <Badge variant="outline" className={cn(common, "border-emerald-500/40 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100")}>
          <CheckCircle2 className="size-3.5" aria-hidden />
          Resolved
        </Badge>
      )
    case "escalated":
      return (
        <Badge variant="destructive" className={cn(common, "bg-destructive/15 text-destructive")}>
          <AlertTriangle className="size-3.5" aria-hidden />
          Escalated
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function PriorityCell({ priority }: { priority: TaskPriority }) {
  const dot =
    priority === "urgent"
      ? "bg-destructive"
      : priority === "high"
        ? "bg-amber-500"
        : priority === "medium"
          ? "bg-sky-500"
          : "bg-muted-foreground"
  return (
    <div className="flex items-center gap-2">
      <span className={cn("size-2 shrink-0 rounded-full", dot)} aria-hidden />
      <span className="capitalize">{priority}</span>
    </div>
  )
}

function SourceCell({ source }: { source: TaskSource }) {
  const Icon = source === "tenant" ? User : source === "system" ? Cpu : Headphones
  const label = source.charAt(0).toUpperCase() + source.slice(1)
  return (
    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
      <Icon className="size-4 shrink-0 text-foreground/70" aria-hidden />
      {label}
    </span>
  )
}

function SlaCell({ task }: { task: Task }) {
  if (!task.slaBreached || task.slaOverHours == null) {
    return <span className="text-muted-foreground">On track</span>
  }
  return (
    <span className="inline-flex items-center gap-1 text-destructive">
      <AlertTriangle className="size-3.5 shrink-0" aria-hidden />
      SLA breached · {task.slaOverHours.toFixed(1)}h over
    </span>
  )
}

function TasksPagination({
  pageIndex,
  pageCount,
  total,
  onPageChange,
}: {
  pageIndex: number
  pageCount: number
  total: number
  onPageChange: (i: number) => void
}) {
  if (pageCount <= 1) return null
  const from = pageIndex * TASKS_PAGE_SIZE + 1
  const to = Math.min((pageIndex + 1) * TASKS_PAGE_SIZE, total)
  return (
    <div className="flex flex-col gap-3 border-t border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className={cn(typeToken("text-sm/normal"), "text-muted-foreground")}>
        Showing{" "}
        <span className="tabular-nums text-foreground">{from}</span>
        {"–"}
        <span className="tabular-nums text-foreground">{to}</span> of{" "}
        <span className="tabular-nums text-foreground">{total}</span>
      </p>
      <div className="flex flex-wrap items-center gap-1">
        <Button type="button" variant="outline" size="xs" disabled={pageIndex <= 0} onClick={() => onPageChange(pageIndex - 1)}>
          Prev
        </Button>
        {Array.from({ length: pageCount }, (_, i) => (
          <Button
            key={i}
            type="button"
            variant={pageIndex === i ? "default" : "outline"}
            size="xs"
            className="min-w-8 px-2"
            onClick={() => onPageChange(i)}
            aria-current={pageIndex === i ? "page" : undefined}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          type="button"
          variant="outline"
          size="xs"
          disabled={pageIndex >= pageCount - 1}
          onClick={() => onPageChange(pageIndex + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

function kanbanLane(t: Task): "open" | "working" | "done" {
  if (t.status === "resolved") return "done"
  if (t.status === "open") return "open"
  return "working"
}

function KanbanBoard({ tasks }: { tasks: Task[] }) {
  const open = tasks.filter((t) => kanbanLane(t) === "open")
  const working = tasks.filter((t) => kanbanLane(t) === "working")
  const done = tasks.filter((t) => kanbanLane(t) === "done")

  const Lane = ({ title, items }: { title: string; items: Task[] }) => (
    <div className="flex min-h-0 min-w-[220px] flex-1 flex-col rounded-xl border border-border bg-muted/20">
      <div className={cn(typeToken("text-sm/medium"), "border-b border-border px-3 py-2")}>
        {title}
        <span className="ml-1.5 text-muted-foreground">({items.length})</span>
      </div>
      <ScrollArea className="min-h-[280px] flex-1">
        <div className="space-y-2 p-2">
          {items.map((t) => (
            <div
              key={t.id}
              className={cn(
                "rounded-lg border border-border bg-card p-3 text-sm shadow-elevation-sm",
                t.escalated && "border-destructive/40 bg-destructive/5",
              )}
            >
              <div className="flex gap-2">
                <img
                  src={t.imageSrc}
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 shrink-0 rounded-md object-cover ring-1 ring-border"
                />
                <div className="min-w-0">
                  <p className="font-medium leading-snug">{t.title}</p>
                  <p className={cn(typeToken("text-xs/normal"), "mt-0.5 text-muted-foreground")}>
                    #{t.id.toLowerCase()} · {t.customerName}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                <Badge variant="outline" className={cn("text-[0.65rem]", typeBadgeClass(t.type))}>
                  {formatTypeLabel(t.type)}
                </Badge>
                <StatusBadge status={t.status} />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )

  return (
    <div className="flex min-h-0 flex-1 gap-3 overflow-x-auto px-4 pb-4">
      <Lane title="Open" items={open} />
      <Lane title="In progress" items={working} />
      <Lane title="Resolved" items={done} />
    </div>
  )
}

export function TaskManagementPage() {
  const [view, setView] = React.useState<"table" | "kanban">("table")
  const [filters, setFilters] = React.useState<TaskFilters>({
    search: "",
    status: "all",
    priority: "all",
    type: "all",
    source: "all",
  })
  const [pageIndex, setPageIndex] = React.useState(0)

  const filtered = React.useMemo(() => filterTasks(MOCK_TASKS, filters), [filters])

  React.useEffect(() => {
    setPageIndex(0)
  }, [filters])

  const pageCount = Math.max(1, Math.ceil(filtered.length / TASKS_PAGE_SIZE))
  const safePage = Math.min(pageIndex, pageCount - 1)
  const pageSlice = React.useMemo(
    () => filtered.slice(safePage * TASKS_PAGE_SIZE, safePage * TASKS_PAGE_SIZE + TASKS_PAGE_SIZE),
    [filtered, safePage],
  )

  const escalatedN = countEscalated(filtered)

  const activeFilterCount = React.useMemo(() => {
    let n = 0
    if (filters.status !== "all") n += 1
    if (filters.priority !== "all") n += 1
    if (filters.type !== "all") n += 1
    if (filters.source !== "all") n += 1
    return n
  }, [filters.status, filters.priority, filters.type, filters.source])

  const clearFacetFilters = React.useCallback(() => {
    setFilters((f) => ({
      ...f,
      status: "all",
      priority: "all",
      type: "all",
      source: "all",
    }))
  }, [])

  return (
    <div className="flex w-full flex-col bg-background">
      <div className={pepAppContentClass}>
      <PepPageHeader
        title="Support Tasks"
        innerClassName="px-0"
        actions={
          <Button type="button" size="icon" className="shrink-0 rounded-md shadow-elevation-sm" aria-label="New task">
            <Plus className="size-4" aria-hidden />
          </Button>
        }
      />
      <PepFilterRow
        className="px-0"
        left={
          <>
            <div className="relative min-h-9 w-full min-w-[200px] max-w-[340px]">
              <Search
                className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                placeholder="Search table…"
                value={filters.search}
                onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                className="h-9 pl-9 shadow-elevation-sm"
                aria-label="Search tasks in table"
              />
            </div>
            <FilterSelect
              value={filters.status}
              onChange={(v) => setFilters((f) => ({ ...f, status: v }))}
              options={STATUS_OPTIONS}
              placeholder="All Status"
            />
            <FilterSelect
              value={filters.priority}
              onChange={(v) => setFilters((f) => ({ ...f, priority: v }))}
              options={PRIORITY_OPTIONS}
              placeholder="All Priority"
            />
            <FilterSelect
              value={filters.type}
              onChange={(v) => setFilters((f) => ({ ...f, type: v }))}
              options={TYPE_OPTIONS}
              placeholder="All Types"
            />
            <FilterSelect
              value={filters.source}
              onChange={(v) => setFilters((f) => ({ ...f, source: v }))}
              options={SOURCE_OPTIONS}
              placeholder="All Sources"
            />
            <span className="relative inline-flex">
              <Button
                type="button"
                variant="outline"
                size="xs"
                className="gap-1.5 border-primary/25 bg-primary/5 shadow-elevation-sm"
                disabled={activeFilterCount === 0}
                onClick={() => activeFilterCount > 0 && clearFacetFilters()}
                aria-label={activeFilterCount > 0 ? "Clear facet filters" : "No active facet filters"}
              >
                <Filter className="size-4 opacity-80" aria-hidden />
                Filter
              </Button>
              {activeFilterCount > 0 ? (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 flex h-5 min-w-5 justify-center px-1 py-0 text-[0.65rem] tabular-nums"
                >
                  {activeFilterCount}
                </Badge>
              ) : null}
            </span>
            <Button type="button" variant="outline" size="xs" className="gap-1.5 shadow-elevation-sm">
              <Download className="size-4" aria-hidden />
              Export
            </Button>
          </>
        }
        right={
          <div className="flex rounded-lg border border-border p-0.5 shadow-elevation-sm">
            <Button
              type="button"
              variant={view === "table" ? "secondary" : "ghost"}
              size="xs"
              className="gap-1.5 rounded-md"
              onClick={() => setView("table")}
            >
              <Table2 className="size-4" aria-hidden />
              Table
            </Button>
            <Button
              type="button"
              variant={view === "kanban" ? "secondary" : "ghost"}
              size="xs"
              className="gap-1.5 rounded-md"
              onClick={() => setView("kanban")}
            >
              <LayoutGrid className="size-4" aria-hidden />
              Kanban
            </Button>
          </div>
        }
      />

        <p className={cn(typeToken("text-sm/normal"), "text-muted-foreground")}>
          <span className="font-medium text-foreground">{filtered.length}</span> tickets
          {escalatedN > 0 ? (
            <>
              {" "}
              ·{" "}
              <span className="font-medium text-destructive">{escalatedN} escalated</span>
            </>
          ) : null}
        </p>

        {view === "table" ? (
            <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-elevation-sm">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[240px]">Ticket</TableHead>
                      <TableHead className="min-w-[110px]">Type</TableHead>
                      <TableHead className="min-w-[130px]">Status</TableHead>
                      <TableHead className="min-w-[100px]">Priority</TableHead>
                      <TableHead className="min-w-[90px]">Source</TableHead>
                      <TableHead className="min-w-[140px]">Assigned To</TableHead>
                      <TableHead className="min-w-[150px]">Property · Unit</TableHead>
                      <TableHead className="min-w-[160px]">SLA</TableHead>
                      <TableHead className="min-w-[120px]">Opened</TableHead>
                      <TableHead className="min-w-[120px]">Updated</TableHead>
                      <TableHead className="min-w-[140px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pageSlice.map((task) => (
                      <TableRow
                        key={task.id}
                        className={cn(task.escalated || task.status === "escalated" ? "bg-destructive/5" : undefined)}
                      >
                        <TableCell>
                          <div className="min-w-0">
                            <p className="font-medium leading-snug">{task.title}</p>
                            <p className={cn(typeToken("text-xs/normal"), "mt-0.5 text-muted-foreground")}>
                              #{task.id.toLowerCase()} · {task.customerName} ·{" "}
                              <span className="font-mono">{task.customerId}</span>
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn("capitalize", typeBadgeClass(task.type))}>
                            {formatTypeLabel(task.type)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={task.status} />
                        </TableCell>
                        <TableCell>
                          <PriorityCell priority={task.priority} />
                        </TableCell>
                        <TableCell>
                          <SourceCell source={task.source} />
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-0.5">
                            <span>{task.assignedName}</span>
                            <span className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>{task.assignedTeam}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{task.propertyUnit}</TableCell>
                        <TableCell className={typeToken("text-sm/normal")}>
                          <SlaCell task={task} />
                        </TableCell>
                        <TableCell className={cn(typeToken("text-sm/normal"), "whitespace-nowrap text-muted-foreground")}>
                          {formatDistanceToNow(new Date(task.openedAt), { addSuffix: true })}
                        </TableCell>
                        <TableCell className={cn(typeToken("text-sm/normal"), "whitespace-nowrap text-muted-foreground")}>
                          {formatDistanceToNow(new Date(task.updatedAt), { addSuffix: true })}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button type="button" variant="outline" size="xs">
                              View
                            </Button>
                            <Button type="button" variant="outline" size="xs" className="text-destructive hover:bg-destructive/10">
                              Escalate
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <TasksPagination
                pageIndex={safePage}
                pageCount={pageCount}
                total={filtered.length}
                onPageChange={setPageIndex}
              />
            </div>
          ) : (
            <KanbanBoard tasks={filtered} />
          )}
      </div>
    </div>
  )
}
