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
import { typeTokensBySize } from "@/data/typography-tokens"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

const TYPOGRAPHY_NOTES = [
  {
    property: "Token shape",
    shadcn: "H1 / Muted / Lead…",
    pep: "`text-{size}/{weight}`",
    note: "Matches Figma (e.g. text-2xl/medium). Size + weight only — no color.",
  },
  {
    property: "Color",
    shadcn: "Often baked in",
    pep: "At call site",
    note: "cn(typeToken(\"text-sm/medium\"), \"text-muted-foreground\")",
  },
  {
    property: "Font stack",
    shadcn: "system / Inter",
    pep: "Noto Sans SC → system CJK → system-ui",
    note: "SC + Latin share Noto Sans SC. Traditional via lang → Noto Sans TC.",
  },
] as const

function TypographyNotesTable() {
  return (
    <Table className={typeToken("text-xs/normal")}>
      <TableCaption className={cn(typeToken("text-xs/normal"), "caption-top mt-0 mb-2 text-left text-muted-foreground")}>
        Product API is size+weight tokens (Figma). shadcn compositions are docs-only.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className={cn(typeToken("text-xs/normal"), "h-8 w-24 px-2 py-1.5")}>Property</TableHead>
          <TableHead className={cn(typeToken("text-xs/normal"), "h-8 px-2 py-1.5")}>shadcn</TableHead>
          <TableHead className={cn(typeToken("text-xs/normal"), "h-8 px-2 py-1.5")}>PEP</TableHead>
          <TableHead className={cn(typeToken("text-xs/normal"), "h-8 px-2 py-1.5")}>Note</TableHead>
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
  const groups = typeTokensBySize()

  return (
    <PepDesignSystemPage title="Typography" contentClassName="space-y-10">
      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Notes</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-3 text-muted-foreground")}>
          Use{" "}
          <code className="rounded bg-muted px-1 text-[11px]">typeToken(&quot;text-sm/medium&quot;)</code>{" "}
          from <code className="rounded bg-muted px-1 text-[11px]">typography-tokens.ts</code>. Apply
          color separately. Demo lines are mixed{" "}
          <span className="font-medium text-foreground">EN · 简 · 繁</span> in one paragraph.
        </p>
        <TypographyNotesTable />
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Font size scale</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-4 text-muted-foreground")}>
          Tailwind <code className="rounded bg-muted px-1 text-[11px]">text-*</code> sizes at 16px root
          (default line-height unless a token overrides, e.g.{" "}
          <code className="rounded bg-muted px-1 text-[11px]">text-2xl/medium</code> →{" "}
          <code className="rounded bg-muted px-1 text-[11px]">leading-8</code>).
        </p>
        <TypographyFontSizeTable />
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>
          Type tokens (size + weight)
        </h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-4 text-muted-foreground")}>
          Figma-style ids. Metrics measured in your browser (family · size / line-height · weight).
        </p>
        <div className="flex flex-col gap-8">
          {groups.map(({ size, tokens }) => (
            <div key={size}>
              <h3 className={cn(typeToken("text-xs/semibold"), "mb-2 tracking-tight text-foreground")}>
                text-{size}
              </h3>
              <div className="flex flex-col gap-2">
                {tokens.map((token) => (
                  <TypographyTypeRow key={token.id} token={token} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Pending</h2>
        <Card>
          <CardContent className={cn(typeToken("text-xs/normal"), "p-4 text-muted-foreground")}>
            Add new size/weight pairs here when Figma introduces them — keep tokens colorless.
          </CardContent>
        </Card>
      </section>
    </PepDesignSystemPage>
  )
}
