import * as React from "react"

import { PepDesignSystemPage } from "@/components/pep-chrome"
import { Card, CardContent } from "@/components/ui/card"
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
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

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
    <Table className={typeToken("text-xs/normal")}>
      <TableCaption className={cn(typeToken("text-xs/normal"), "caption-top mt-0 mb-2 text-left text-muted-foreground")}>
        PEP vs stock shadcn — built from Figma Pagination (5153:2867).
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className={cn(typeToken("text-xs/normal"), "h-8 w-28 px-2 py-1.5")}>Property</TableHead>
          <TableHead className={cn(typeToken("text-xs/normal"), "h-8 px-2 py-1.5")}>shadcn</TableHead>
          <TableHead className={cn(typeToken("text-xs/normal"), "h-8 px-2 py-1.5")}>PEP</TableHead>
          <TableHead className={cn(typeToken("text-xs/normal"), "h-8 px-2 py-1.5")}>Note</TableHead>
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
        <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>Long</div>
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
        <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>Short</div>
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
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Notes</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-3 text-muted-foreground")}>
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
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Library</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-3 text-muted-foreground")}>
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">variant=&quot;long&quot;</code>{" "}
          = Row per page + nav + page field ·{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">variant=&quot;short&quot;</code>{" "}
          = nav + page field.
        </p>
        <PaginationLibraryDemo />
      </section>
    </PepDesignSystemPage>
  )
}
