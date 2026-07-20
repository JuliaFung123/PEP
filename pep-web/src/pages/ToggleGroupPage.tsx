import { Bold, Grid2X2, Italic, List, Underline } from "lucide-react"
import type { ComponentProps } from "react"

import { PepDesignSystemPage } from "@/components/pep-chrome"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
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

type ToggleGroupSize = NonNullable<ComponentProps<typeof ToggleGroup>["size"]>

const TOGGLE_GROUP_SIZE_ROWS: { token: string; size: ToggleGroupSize; heightPx: number }[] = [
  { token: "sm", size: "sm", heightPx: 32 },
  { token: "default", size: "default", heightPx: 36 },
  { token: "lg", size: "lg", heightPx: 40 },
]

const TOGGLE_GROUP_LIBRARY_COLUMNS = [
  { key: "single", label: "Single selection" },
  { key: "multiple", label: "Multiple selection" },
  { key: "connected", label: "Connected icon" },
] as const

function ToggleGroupSizeCell({ token, heightPx }: { token: string; heightPx: number }) {
  return (
    <span className={cn(typeToken("text-xs/normal"), "font-mono text-muted-foreground")}>
      {token} = {heightPx}px
    </span>
  )
}

function ToggleGroupLibraryCell({
  pattern,
  size,
}: {
  pattern: (typeof TOGGLE_GROUP_LIBRARY_COLUMNS)[number]["key"]
  size: ToggleGroupSize
}) {
  if (pattern === "single") {
    return (
      <ToggleGroup defaultValue={["list"]} variant="outline" size={size}>
        <ToggleGroupItem value="list" aria-label="List view">
          <List aria-hidden />
          List
        </ToggleGroupItem>
        <ToggleGroupItem value="grid" aria-label="Grid view">
          <Grid2X2 aria-hidden />
          Grid
        </ToggleGroupItem>
      </ToggleGroup>
    )
  }

  if (pattern === "multiple") {
    return (
      <ToggleGroup multiple defaultValue={["bold"]} variant="outline" size={size}>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold aria-hidden />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic aria-hidden />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline aria-hidden />
        </ToggleGroupItem>
      </ToggleGroup>
    )
  }

  return (
    <ToggleGroup defaultValue={["list"]} spacing={0} variant="outline" size={size}>
      <ToggleGroupItem value="list" aria-label="Rows view">
        <List aria-hidden />
      </ToggleGroupItem>
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <Grid2X2 aria-hidden />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export function ToggleGroupPage() {
  return (
    <PepDesignSystemPage title="Toggle group" contentClassName="space-y-10">
      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Notes</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-3 text-muted-foreground")}>
          Groups related toggles with shared single- or multiple-selection state. Use this instead
          of Button group when an item remains selected. Set{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">size</code> on{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">ToggleGroup</code> to size all
          items; use <code className="rounded bg-muted px-1 py-0.5 text-[11px]">spacing=&#123;0&#125;</code>{" "}
          for connected icon groups.
        </p>
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Library</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-4 text-muted-foreground")}>
          Approved toggle group patterns across{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">sm</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">default</code>, and{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">lg</code> — heights match
          Toggle / Button on the same tokens.
        </p>

        <div className="overflow-hidden rounded-xl border border-border">
          <div className="px-4 py-5">
            <Table>
              <TableCaption className={cn(typeToken("text-xs/medium"), "caption-top mb-3 text-left text-muted-foreground")}>
                Toggle group library
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[8.5rem]">Size</TableHead>
                  {TOGGLE_GROUP_LIBRARY_COLUMNS.map(({ key, label }) => (
                    <TableHead key={key}>{label}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {TOGGLE_GROUP_SIZE_ROWS.map(({ token, size, heightPx }) => (
                  <TableRow key={token}>
                    <TableCell>
                      <ToggleGroupSizeCell token={token} heightPx={heightPx} />
                    </TableCell>
                    {TOGGLE_GROUP_LIBRARY_COLUMNS.map(({ key }) => (
                      <TableCell key={key}>
                        <ToggleGroupLibraryCell pattern={key} size={size} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </PepDesignSystemPage>
  )
}
