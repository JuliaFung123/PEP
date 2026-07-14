import { PepDesignSystemPage } from "@/components/pep-chrome"
import { TypographyFontSizeTable } from "@/components/typography-font-size-table"
import { TypographyTypeRow } from "@/components/typography-type-row"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { THEME_TYPOGRAPHY_SAMPLES } from "@/data/typography-samples"

const TYPOGRAPHY_NOTES = [
  {
    property: "H5 / H6",
    shadcn: "—",
    pep: "Adds H5, H6",
    note: "Heading scale extension — 18px / 28px and 16px / 24px (`text-lg` / `text-base`).",
  },
  {
    property: "Caption",
    shadcn: "—",
    pep: "Adds Caption",
    note: "Secondary lines — 12px / 16px (`text-xs` default line-height). Used in Avatar + name subtitle.",
  },
  {
    property: "ID",
    shadcn: "—",
    pep: "Adds ID",
    note: "Numeric identifiers only — 10px / 12px, tabular-nums. Used in Avatar + name (`lg`).",
  },
] as const

function TypographyNotesTable() {
  return (
    <Table className="text-xs">
      <TableCaption className="caption-top mt-0 mb-2 text-left text-xs text-muted-foreground">
        PEP additions vs stock shadcn typography — omit rows when behaviour matches shadcn default.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="h-8 w-24 px-2 py-1.5 text-xs">Property</TableHead>
          <TableHead className="h-8 px-2 py-1.5 text-xs">shadcn</TableHead>
          <TableHead className="h-8 px-2 py-1.5 text-xs">PEP</TableHead>
          <TableHead className="h-8 px-2 py-1.5 text-xs">Note</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-muted-foreground">
        {TYPOGRAPHY_NOTES.map((row) => (
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

export function TypographyPage() {
  return (
    <PepDesignSystemPage title="Typography" contentClassName="space-y-10">
      <section>
        <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">Notes</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          Reference:{" "}
          <a
            href="https://ui.shadcn.com/docs/components/typography"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            shadcn Typography
          </a>
          .{" "}
          <span className="font-medium text-foreground">
            Always pick a typography token from the library below — do not invent one-off font sizes or
            weights.
          </span>{" "}
          Reference ids via <code className="rounded bg-muted px-1 text-[11px]">typographyClassName()</code>{" "}
          in <code className="rounded bg-muted px-1 text-[11px]">typography-samples.ts</code>.
        </p>
        <TypographyNotesTable />
      </section>

      <section>
        <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">Font size tokens</h2>
        <p className="mb-4 text-xs text-muted-foreground">
          Tailwind <code className="rounded bg-muted px-1 text-[11px]">text-*</code> scale at 16px root.
          Default line-height applies unless a typography token overrides it (e.g.{" "}
          <code className="rounded bg-muted px-1 text-[11px]">leading-7</code>,{" "}
          <code className="rounded bg-muted px-1 text-[11px]">leading-none</code>). Pick sizes from this
          table — do not invent arbitrary <code className="rounded bg-muted px-1 text-[11px]">text-[Npx]</code>{" "}
          values except the approved <code className="rounded bg-muted px-1 text-[11px]">ID</code> token.
        </p>
        <TypographyFontSizeTable />
      </section>

      <section>
        <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">Typography library</h2>
        <p className="mb-4 text-xs text-muted-foreground">
          Font metrics shown are measured in your browser (family · size / line-height).
        </p>
        <div className="flex flex-col gap-2">
          {THEME_TYPOGRAPHY_SAMPLES.map((sample) => (
            <TypographyTypeRow key={sample.id} sample={sample} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">Pending</h2>
        <Card>
          <CardContent className="p-4 text-xs text-muted-foreground">
            No pending typography styles. Add new text styles here for review before moving them into the
            Typography library.
          </CardContent>
        </Card>
      </section>
    </PepDesignSystemPage>
  )
}
