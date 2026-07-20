import { Plus } from "lucide-react"

import {
  PepDesignSystemPage,
  PepPageHeader,
  pepPageHeaderShellClass,
} from "@/components/pep-chrome"
import { Button } from "@/components/ui/button"
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

const PAGE_HEADER_NOTES = [
  {
    property: "Height",
    shadcn: "—",
    pep: "36px min (`min-h-9`)",
    note: "Figma header/Page (`195:8791`) via `--pep-page-header-height` + `pepPageHeaderShellClass`.",
  },
  {
    property: "Title",
    shadcn: "—",
    pep: "text-2xl / medium / leading-8",
    note: "text-2xl / medium / leading-8 (24/32); title has `pl-1` (4px) per Figma.",
  },
  {
    property: "Sticky (layouts)",
    shadcn: "—",
    pep: "No",
    note: "Page title scrolls with content. Site Top Bar also scrolls away in product layouts.",
  },
] as const

export function PageHeaderBlockPage() {
  return (
    <PepDesignSystemPage title="Header-Table page" contentClassName="space-y-10">
      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Notes</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-3 text-muted-foreground")}>
          No shadcn root page-header component — closest are layout patterns in{" "}
          <a
            href="https://ui.shadcn.com/blocks"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            shadcn blocks
          </a>
          . PEP Figma{" "}
          <a
            href="https://www.figma.com/design/IZ6algHkFp6Z2a5dYiS1hC/PEP?node-id=195-8799"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            header/Page
          </a>
          : title left, optional trailing actions (often icon{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">Add</code>, sometimes more
          buttons). Compose with{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">PepPageHeader</code> +{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">Button</code>.
        </p>
        <Table className={typeToken("text-xs/normal")}>
          <TableHeader>
            <TableRow>
              <TableHead className={cn(typeToken("text-xs/normal"), "h-8 w-24 px-2 py-1.5")}>Property</TableHead>
              <TableHead className={cn(typeToken("text-xs/normal"), "h-8 px-2 py-1.5")}>shadcn</TableHead>
              <TableHead className={cn(typeToken("text-xs/normal"), "h-8 px-2 py-1.5")}>PEP</TableHead>
              <TableHead className={cn(typeToken("text-xs/normal"), "h-8 px-2 py-1.5")}>Note</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-muted-foreground">
            {PAGE_HEADER_NOTES.map((row) => (
              <TableRow key={row.property}>
                <TableCell className="px-2 py-1.5 font-medium text-foreground">
                  {row.property}
                </TableCell>
                <TableCell className="px-2 py-1.5">{row.shadcn}</TableCell>
                <TableCell className="px-2 py-1.5">{row.pep}</TableCell>
                <TableCell className="px-2 py-1.5 text-[11px] leading-snug">{row.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Library</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-4 text-muted-foreground")}>
          <span className="font-medium text-foreground">Use for list / admin page titles.</span>{" "}
          Shell height is min{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">36px</code> (
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">{pepPageHeaderShellClass}</code>
          ). Title uses{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">text-2xl/medium</code>. Pass{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">actions</code> only when needed.
        </p>

        <div className="space-y-8">
          <div className="space-y-2">
            <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>Title only</div>
            <PepPageHeader title="活動" sticky={false} />
          </div>

          <div className="space-y-2">
            <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>With Add</div>
            <PepPageHeader
              title="活動"
              sticky={false}
              actions={
                <Button type="button" size="icon" aria-label="Add">
                  <Plus aria-hidden />
                </Button>
              }
            />
          </div>

          <div className="space-y-2">
            <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>With more actions</div>
            <PepPageHeader
              title="活動"
              sticky={false}
              actions={
                <>
                  <Button type="button" size="sm">
                    Export
                  </Button>
                  <Button type="button" size="icon" aria-label="Add">
                    <Plus aria-hidden />
                  </Button>
                </>
              }
            />
          </div>
        </div>
      </section>
    </PepDesignSystemPage>
  )
}
