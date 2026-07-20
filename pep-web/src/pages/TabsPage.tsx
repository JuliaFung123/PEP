import type { ComponentProps } from "react"

import { PepDesignSystemPage } from "@/components/pep-chrome"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

const TABS_NOTES = [
  {
    property: "Variants",
    shadcn: "default, line",
    pep: "default, line",
    note: "line = Figma Tab Item style=Underline / style=line.",
  },
  {
    property: "Track height (default)",
    shadcn: "h-9 (36px) + p-[3px]",
    pep: "h-9 (36px) + p-0.5",
    note: "Same track height as shadcn; tighter padding leaves room for a 32px pill.",
  },
  {
    property: "Active pill height",
    shadcn: "~29–30px (fills track − padding)",
    pep: "h-8 (32px)",
    note: "Matches Figma Tab Item default (style=default).",
  },
  {
    property: "Line trigger height",
    shadcn: "fills list",
    pep: "34px",
    note: "Matches Figma Tab Item style=line.",
  },
  {
    property: "Active trigger (default)",
    shadcn: "bg-background + shadow-sm",
    pep: "bg-background + shadow-elevation-sm",
    note: "Active pill uses PEP elevation token.",
  },
  {
    property: "Active trigger (line)",
    shadcn: "bottom indicator via ::after",
    pep: "border-b-2 border-primary",
    note: "Figma: inactive 1px border, active 2px primary underline.",
  },
] as const

function TabsNotesTable() {
  return (
    <Table className={typeToken("text-xs/normal")}>
      <TableCaption className={cn(typeToken("text-xs/normal"), "caption-top mt-0 mb-2 text-left text-muted-foreground")}>
        PEP overrides vs stock shadcn — Figma Tab Item has style=default and style=line.
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
        {TABS_NOTES.map((row) => (
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

function TabsDemo({
  variant,
}: {
  variant?: ComponentProps<typeof TabsList>["variant"]
}) {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList variant={variant}>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export function TabsPage() {
  return (
    <PepDesignSystemPage title="Tabs" contentClassName="space-y-10">
      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Notes</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-3 text-muted-foreground")}>
          References:{" "}
          <a
            href="https://ui.shadcn.com/docs/components/tabs"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            shadcn/ui Tabs
          </a>
          {" · "}
          <a
            href="https://www.figma.com/design/bRDWHAITfr5p6onqnKTf0q/--PEP-Web_Library?node-id=2737-526"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            Figma Tab Item
          </a>
        </p>
        <Card>
          <CardContent className="pt-4">
            <TabsNotesTable />
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Library</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-3 text-muted-foreground")}>
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">variant=&quot;default&quot;</code> pill
          track ·{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">variant=&quot;line&quot;</code> underline
          (Figma Underline).
        </p>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>Default</div>
            <TabsDemo variant="default" />
          </div>
          <div className="space-y-2">
            <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>Line</div>
            <TabsDemo variant="line" />
          </div>
        </div>
      </section>
    </PepDesignSystemPage>
  )
}
