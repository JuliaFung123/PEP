import * as React from "react"

import { PepDesignSystemPage } from "@/components/pep-chrome"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PepPagination } from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const PAGINATION_NOTES = [
  {
    property: "Pattern",
    shadcn: "Previous + page links + Next",
    pep: "First / Prev / Next / Last + page field",
    note: "Figma Pagination — no numbered link strip.",
  },
  {
    property: "Variants",
    shadcn: "Composition only",
    pep: "long | short",
    note: "Long includes Row per page select; Short is nav + page status.",
  },
  {
    property: "Nav control size",
    shadcn: "Button size icon (32px)",
    pep: "30×30 outline",
    note: "Matches Figma Pagination Item.",
  },
] as const

function PaginationNotesTable() {
  return (
    <Table className="text-xs">
      <TableCaption className="caption-top mt-0 mb-2 text-left text-xs text-muted-foreground">
        PEP vs stock shadcn — built from Figma Pagination (5153:2867).
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="h-8 w-28 px-2 py-1.5 text-xs">Property</TableHead>
          <TableHead className="h-8 px-2 py-1.5 text-xs">shadcn</TableHead>
          <TableHead className="h-8 px-2 py-1.5 text-xs">PEP</TableHead>
          <TableHead className="h-8 px-2 py-1.5 text-xs">Note</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-muted-foreground">
        {PAGINATION_NOTES.map((row) => (
          <TableRow key={row.property}>
            <TableCell className="px-2 py-1.5 font-medium text-foreground">{row.property}</TableCell>
            <TableCell className="px-2 py-1.5">{row.shadcn}</TableCell>
            <TableCell className="px-2 py-1.5">{row.pep}</TableCell>
            <TableCell className="px-2 py-1.5 text-[11px] leading-snug">{row.note}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function PaginationLibraryDemo() {
  const [longPage, setLongPage] = React.useState(1)
  const [shortPage, setShortPage] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(10)
  const pageCount = 999

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground">Long</div>
        <div className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 px-4 py-3">
          <PepPagination
            variant="long"
            page={longPage}
            pageCount={pageCount}
            pageSize={pageSize}
            onPageChange={setLongPage}
            onPageSizeChange={(n) => {
              setPageSize(n)
              setLongPage(1)
            }}
          />
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground">Short</div>
        <div className="overflow-x-auto rounded-lg border border-border/60 bg-muted/40 px-4 py-3">
          <PepPagination
            variant="short"
            page={shortPage}
            pageCount={pageCount}
            onPageChange={setShortPage}
          />
        </div>
      </div>
    </div>
  )
}

export function PaginationPage() {
  return (
    <PepDesignSystemPage title="Pagination" contentClassName="space-y-10">
      <section>
        <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">Notes</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          References:{" "}
          <a
            href="https://www.figma.com/design/bRDWHAITfr5p6onqnKTf0q/--PEP-Web_Library?node-id=5153-2867"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            Figma Pagination
          </a>
          {" · "}
          <a
            href="https://ui.shadcn.com/docs/components/pagination"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            shadcn/ui Pagination
          </a>
        </p>
        <Card>
          <CardContent className="pt-4">
            <PaginationNotesTable />
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">Library</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">variant=&quot;long&quot;</code>{" "}
          = Row per page + nav + page field ·{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">variant=&quot;short&quot;</code>{" "}
          = nav + page field.
        </p>
        <Card>
          <CardHeader>
            <CardTitle>Pagination</CardTitle>
            <CardDescription className="!text-muted-foreground">
              Figma Long=Yes / Long=No — 30px nav buttons, page input, of N.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PaginationLibraryDemo />
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Use Light / Dark in the sidebar to verify tokens.
          </CardFooter>
        </Card>
      </section>
    </PepDesignSystemPage>
  )
}
