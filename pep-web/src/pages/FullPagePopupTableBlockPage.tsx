import { FilePlus2, Plus } from "lucide-react"
import * as React from "react"

import {
  TimeslotExpandedDetail,
  type TimeslotExpandedDetailProps,
} from "@/components/timeslot-expanded-detail"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"
import {
  TableCellComposition,
  TableCellDateWeekday,
  TableCellExpandToggle,
} from "@/pages/TableCellBlockPage"

type TimeslotRow = {
  id: string
  date: string
  weekday: string
  timeRange: string
  seats: string
  detail?: TimeslotExpandedDetailProps
}

const TIMESLOT_ROWS: TimeslotRow[] = [
  {
    id: "1",
    date: "YYYY/MM/DD",
    weekday: "(Wed)",
    timeRange: "12:30 - 16:00",
    seats: "9,999",
  },
  {
    id: "2",
    date: "YYYY/MM/DD",
    weekday: "(Wed)",
    timeRange: "12:30 - 16:00",
    seats: "9,999",
    detail: {
      variant: "location",
      data: {
        locationName: "Loaction name Name name",
        spaceName: "Space name",
      },
    },
  },
  {
    id: "3",
    date: "YYYY/MM/DD",
    weekday: "(Wed)",
    timeRange: "12:30 - 16:00",
    seats: "9,999",
  },
  {
    id: "4",
    date: "YYYY/MM/DD",
    weekday: "(Wed)",
    timeRange: "12:30 - 16:00",
    seats: "9,999",
    detail: {
      variant: "address",
      data: {
        address: "Address adress adress adress",
        geom: "123, 456",
      },
    },
  },
  {
    id: "5",
    date: "YYYY/MM/DD",
    weekday: "(Wed)",
    timeRange: "12:30 - 16:00",
    seats: "9,999",
  },
  {
    id: "6",
    date: "YYYY/MM/DD",
    weekday: "(Wed)",
    timeRange: "12:30 - 16:00",
    seats: "9,999",
    detail: {
      variant: "virtual",
      data: {
        platformName: "Platform Name",
        url: "url url url url url url url",
        phone: "+852 2345 6789",
      },
    },
  },
  {
    id: "7",
    date: "YYYY/MM/DD",
    weekday: "(Wed)",
    timeRange: "12:30 - 16:00",
    seats: "9,999",
  },
]

function ExpandedDetail({ detail }: { detail: TimeslotExpandedDetailProps }) {
  return <TimeslotExpandedDetail {...detail} />
}

/**
 * Table body for full-page popup Timeslots section (Figma 813:35945).
 */
export function FullPagePopupTimeslotsTable() {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({
    "2": true,
    "4": true,
    "6": true,
  })

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex min-h-14 flex-wrap items-center gap-4 px-3 py-3">
        <h2 className={cn(typeToken("text-lg/semibold"), "text-foreground")}>Timeslots</h2>
        <Button type="button" size="icon-sm" variant="Light" aria-label="Add timeslot">
          <Plus className="size-4" aria-hidden />
        </Button>
        <Button type="button" size="sm" variant="Light" className="gap-1">
          <FilePlus2 className="size-4" aria-hidden />
          Batch Import
        </Button>
      </div>

      <div className="min-h-0 flex-1 overflow-auto px-2 pb-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox aria-label="Select all" />
              </TableHead>
              <TableHead className="w-10" />
              <TableHead>Date</TableHead>
              <TableHead className="text-center">TimeRange</TableHead>
              <TableHead className="text-center">seats</TableHead>
              <TableHead className="w-12 text-right">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TIMESLOT_ROWS.map((row) => {
              const isOpen = Boolean(expanded[row.id])
              const canExpand = Boolean(row.detail)
              return (
                <React.Fragment key={row.id}>
                  <TableRow>
                    <TableCell>
                      <Checkbox aria-label={`Select ${row.date}`} />
                    </TableCell>
                    <TableCell>
                      {canExpand ? (
                        <TableCellExpandToggle
                          expanded={isOpen}
                          onClick={() =>
                            setExpanded((current) => ({
                              ...current,
                              [row.id]: !current[row.id],
                            }))
                          }
                        />
                      ) : null}
                    </TableCell>
                    <TableCell>
                      <TableCellDateWeekday date={row.date} weekday={row.weekday} />
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={cn(typeToken("text-sm/medium"), "text-foreground")}>
                        {row.timeRange}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={cn(typeToken("text-sm/medium"), "tabular-nums text-foreground")}>
                        {row.seats}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <TableCellComposition id="row-actions" />
                    </TableCell>
                  </TableRow>
                  {canExpand && isOpen && row.detail ? (
                    <TableRow className="hover:bg-transparent">
                      <TableCell colSpan={6} className="bg-muted/30 p-0">
                        <ExpandedDetail detail={row.detail} />
                      </TableCell>
                    </TableRow>
                  ) : null}
                </React.Fragment>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
