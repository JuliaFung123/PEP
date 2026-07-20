import { ChevronDown, ChevronRight, MoreHorizontal } from "lucide-react"
import * as React from "react"

import { PepDesignSystemPage } from "@/components/pep-chrome"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge, BadgeImage } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  TABLE_CELL_LIBRARY_ROWS,
  TABLE_CELL_PENDING_ROWS,
  type TableCellId,
  type TableCellRow,
} from "@/data/table-cell-registry"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"
import { TimeslotExpandedDetail } from "@/components/timeslot-expanded-detail"

const PERSON = {
  src: "https://github.com/shadcn.png",
  alt: "@shadcn",
  fallback: "CN",
  name: "Full Name",
  subtitle: "subtitle",
} as const

function CellPreview({ id }: { id: TableCellId }) {
  switch (id) {
    case "checkbox":
      return <Checkbox defaultChecked aria-label="Select row" />
    case "text":
      return (
        <span className={cn(typeToken("text-sm/medium"), "text-foreground")}>
          Primary label
        </span>
      )
    case "numeric":
      return (
        <span className={cn(typeToken("text-sm/medium"), "text-right tabular-nums text-foreground")}>
          $1,280.00
        </span>
      )
    case "badge":
      return (
        <Badge variant="Light" size="sm">
          Active
        </Badge>
      )
    case "person":
      return (
        <div className="flex min-w-0 items-center gap-2">
          <Avatar size="sm" className="shrink-0 after:hidden">
            <AvatarImage src={PERSON.src} alt={PERSON.alt} />
            <AvatarFallback className={typeToken("text-10/normal")}>{PERSON.fallback}</AvatarFallback>
          </Avatar>
          <div className="grid min-w-0 leading-tight">
            <span className={cn(typeToken("text-sm/medium"), "truncate text-foreground")}>{PERSON.name}</span>
            <span className={cn(typeToken("text-xs/normal"), "truncate text-muted-foreground")}>{PERSON.subtitle}</span>
          </div>
        </div>
      )
    case "person-simple":
      return (
        <div className="flex min-w-0 items-center gap-2">
          <Avatar size="sm" className="shrink-0 after:hidden">
            <AvatarFallback className={typeToken("text-10/normal")}>JD</AvatarFallback>
          </Avatar>
          <span className={cn(typeToken("text-sm/medium"), "truncate text-foreground")}>Jane Doe</span>
        </div>
      )
    case "row-actions":
      return (
        <Button type="button" variant="ghost" size="icon-xs" aria-label="Row actions">
          <MoreHorizontal />
        </Button>
      )
    case "thumb":
      return (
        <div className="size-16 overflow-hidden rounded-md border border-border bg-muted">
          <img
            src="/assets/figma/activity-list/cover.jpeg"
            alt=""
            className="size-full object-cover"
          />
        </div>
      )
    case "title-with-id":
      return (
        <div className="flex w-full min-w-0 flex-col gap-0.5">
          <span
            className={cn(
              typeToken("text-sm/medium"),
              "w-full truncate text-foreground",
            )}
          >
            從 11 月中旬開始，香港街頭即換上璀璨聖誕裝，商場、海濱、街道通通沉浸在節日氣氛中。
          </span>
          <Badge variant="outline" size="sm" className="w-fit">
            A-123456
          </Badge>
        </div>
      )
    case "title-with-status":
      return (
        <div className="flex min-w-0 flex-col gap-1">
          <span
            className={cn(
              typeToken("text-sm/medium"),
              "w-full truncate text-foreground",
            )}
          >
            活動名稱
          </span>
          <Badge variant="secondary" className="w-fit">
            Draft
          </Badge>
        </div>
      )
    case "date-range-stack":
      return (
        <div className="flex w-[7.5rem] flex-col items-center">
          <span className={cn(typeToken("text-sm/medium"), "text-foreground")}>2025/12/26</span>
          <div className="flex w-full items-center justify-center gap-1">
            <div className="h-px min-w-px flex-1 border-t border-dashed border-border" aria-hidden />
            <span className={cn(typeToken("text-10/normal"), "shrink-0 text-muted-foreground")}>to</span>
            <div className="h-px min-w-px flex-1 border-t border-dashed border-border" aria-hidden />
          </div>
          <span className={cn(typeToken("text-sm/medium"), "text-foreground")}>2025/12/26</span>
        </div>
      )
    case "datetime-stack":
      return (
        <div className="flex flex-col">
          <span className={cn(typeToken("text-sm/medium"), "text-foreground")}>YYYY/MM/DD</span>
          <span className="text-muted-foreground">00:00</span>
        </div>
      )
    case "category-thumb-badges":
      return (
        <div className="flex flex-wrap gap-1">
          {[
            { label: "Category", src: "/assets/figma/activity-list/category-1.png" },
            { label: "Badge", src: "/assets/figma/activity-list/category-2.png" },
          ].map((tag) => (
            <BadgeImage key={tag.label} size="lg" src={tag.src}>
              {tag.label}
            </BadgeImage>
          ))}
        </div>
      )
    case "status-with-live":
      return (
        <div className="flex items-center gap-2">
          <Badge variant="Light" size="sm">
            Draft
          </Badge>
          <Tooltip>
            <TooltipTrigger
              className="inline-flex size-4 items-center justify-center"
              aria-label="Active"
            >
              <span className="size-3 rounded-full bg-emerald-500" />
            </TooltipTrigger>
            <TooltipContent>Active</TooltipContent>
          </Tooltip>
        </div>
      )
    case "organizer-stack":
      return (
        <div className="flex flex-col gap-1">
          {[
            { name: "Name", fallback: "N", src: PERSON.src },
            { name: "Name", fallback: "N" },
          ].map((person, index) => (
            <div key={index} className="flex items-center gap-1">
              <Avatar size="sm">
                {person.src ? <AvatarImage src={person.src} alt="" /> : null}
                <AvatarFallback>{person.fallback}</AvatarFallback>
              </Avatar>
              <span className={cn(typeToken("text-sm/medium"), "text-foreground")}>{person.name}</span>
            </div>
          ))}
        </div>
      )
    case "tags-wrap":
      return (
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline">Tag</Badge>
          <Badge variant="outline">Tag</Badge>
        </div>
      )
    case "expand-toggle":
      return (
        <Button type="button" variant="ghost" size="icon-xs" aria-expanded aria-label="Expand">
          <ChevronDown className="size-4" aria-hidden />
        </Button>
      )
    case "date-weekday":
      return (
        <div className="flex items-baseline gap-2">
          <span className={cn(typeToken("text-sm/medium"), "text-foreground")}>YYYY/MM/DD</span>
          <span className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>(Wed)</span>
        </div>
      )
    case "expanded-detail-location":
      return (
        <TimeslotExpandedDetail
          variant="location"
          data={{
            locationName: "Loaction name Name name",
            spaceName: "Space name",
          }}
        />
      )
    case "expanded-detail-address":
      return (
        <TimeslotExpandedDetail
          variant="address"
          data={{
            address: "Address adress adress adress",
            geom: "123, 456",
          }}
        />
      )
    case "expanded-detail-virtual":
      return (
        <TimeslotExpandedDetail
          variant="virtual"
          data={{
            platformName: "Platform Name",
            url: "url url url url url url url",
            phone: "+852 2345 6789",
          }}
        />
      )
    default:
      return null
  }
}

/** Reuse approved / pending cell compositions in layout pages. */
export function TableCellComposition({ id }: { id: TableCellId }) {
  return <CellPreview id={id} />
}

export function TableCellExpandToggle({
  expanded,
  onClick,
  label = "Expand",
}: {
  expanded: boolean
  onClick: () => void
  label?: string
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      aria-expanded={expanded}
      aria-label={expanded ? "Collapse" : label}
      onClick={onClick}
    >
      {expanded ? (
        <ChevronDown className="size-4" aria-hidden />
      ) : (
        <ChevronRight className="size-4" aria-hidden />
      )}
    </Button>
  )
}

export function TableCellDateWeekday({ date, weekday }: { date: string; weekday: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className={cn(typeToken("text-sm/medium"), "text-foreground")}>{date}</span>
      <span className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>{weekday}</span>
    </div>
  )
}

export function TableCellNumeric({ children }: { children: React.ReactNode }) {
  return (
    <span className={cn(typeToken("text-sm/medium"), "text-right tabular-nums text-foreground")}>
      {children}
    </span>
  )
}

function CellCatalogTable({
  rows,
  caption,
  showPendingNotes = false,
}: {
  rows: TableCellRow[]
  caption: string
  showPendingNotes?: boolean
}) {
  if (rows.length === 0) {
    return (
      <p className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>
        No cells in this section yet.
      </p>
    )
  }

  return (
    <Table>
      <TableCaption className={cn(typeToken("text-xs/normal"), "caption-top mt-0 mb-3 text-left text-muted-foreground")}>
        {caption}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[160px]">Name</TableHead>
          <TableHead className="min-w-[200px]">Composition</TableHead>
          <TableHead>Preview</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell className={cn(typeToken("text-sm/medium"), "align-top text-foreground")}>
              {row.name}
            </TableCell>
            <TableCell className={cn(typeToken("text-xs/normal"), "align-top text-muted-foreground")}>
              <code className="rounded bg-muted px-1 py-0.5 text-[11px]">{row.composition}</code>
              {showPendingNotes && row.pendingNote ? (
                <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
                  {row.pendingNote}
                </p>
              ) : null}
            </TableCell>
            <TableCell className="align-middle">
              <CellPreview id={row.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export function TableCellBlockPage() {
  return (
    <PepDesignSystemPage title="Table Cell" contentClassName="space-y-10">
      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Notes</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-3 text-muted-foreground")}>
          Block compositions inside shadcn{" "}
          <a
            href="https://ui.shadcn.com/docs/components/table"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            Table
          </a>{" "}
          cells. Use{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">TableCell</code> /{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">TableHead</code> from{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">@/components/ui/table</code>.
          Prefer nested Avatar, Badge, Checkbox, and Button — no extra cell chrome. Use{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">TableHead</code> /{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">TableCell</code> utilities (
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">text-center</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">text-right</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">w-*</code>) for column alignment —
          not a separate cell style. Registry:{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">table-cell-registry.ts</code>.
        </p>
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Library</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-4 text-muted-foreground")}>
          <span className="font-medium text-foreground">
            Always pick from here when building table layouts.
          </span>{" "}
          Match by name / composition before inventing a new cell.
        </p>
        <CellCatalogTable
          rows={TABLE_CELL_LIBRARY_ROWS}
          caption="Approved cell compositions for admin and list tables."
        />
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Pending</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-4 text-muted-foreground")}>
          New cell styles under review. Use only when{" "}
          <span className="font-medium text-foreground">no Library match</span> exists. You decide
          whether to promote to Library.
        </p>
        <CellCatalogTable
          rows={TABLE_CELL_PENDING_ROWS}
          caption="Prototypes — promote by setting tier: library in table-cell-registry.ts."
          showPendingNotes
        />
      </section>
    </PepDesignSystemPage>
  )
}
