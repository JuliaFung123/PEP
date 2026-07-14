import * as React from "react"
import { ChevronRight, Plus } from "lucide-react"

import { PepDesignSystemPage } from "@/components/pep-chrome"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type ButtonSize = NonNullable<React.ComponentProps<typeof Button>["size"]>

const BUTTON_TEXT_SIZE_ROWS: { token: string; size: ButtonSize; heightPx: number }[] = [
  { token: "default", size: "default", heightPx: 32 },
  { token: "sm", size: "sm", heightPx: 28 },
  { token: "lg", size: "lg", heightPx: 36 },
]

const BUTTON_ICON_SIZE_ROWS: { token: string; size: ButtonSize; heightPx: number }[] = [
  { token: "icon", size: "icon", heightPx: 32 },
  { token: "icon-sm", size: "icon-sm", heightPx: 28 },
  { token: "icon-xs", size: "icon-xs", heightPx: 24 },
]

const BUTTON_VARIANTS = [
  { token: "default", label: "Primary" },
  { token: "Light", label: "Light" },
  { token: "secondary", label: "Secondary" },
  { token: "destructive", label: "Destructive" },
  { token: "outline", label: "Outline" },
  { token: "ghost", label: "Ghost" },
  { token: "link", label: "Link" },
] as const

const BUTTON_ICON_VARIANTS = BUTTON_VARIANTS.filter(({ token }) => token !== "link")

const BUTTON_NOTES = [
  {
    property: "Variants",
    shadcn: "default, secondary, destructive, outline, ghost, link",
    pep: "Adds Light",
    note: "`Light` is the PEP soft primary action.",
  },
  {
    property: "States",
    shadcn: "focus ring, disabled opacity",
    pep: "Same plus active translate",
    note: "Do not add custom hover/focus colors outside the variant tokens.",
  },
] as const

function ButtonNotesTable() {
  return (
    <Table className="text-xs">
      <TableCaption className="caption-top mt-0 mb-2 text-left text-xs text-muted-foreground">
        PEP overrides vs stock shadcn only — omit rows when behaviour matches shadcn default.
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
        {BUTTON_NOTES.map((row) => (
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

function ButtonSizeCell({ token, heightPx }: { token: string; heightPx: number }) {
  return (
    <span className="font-mono text-xs text-muted-foreground">
      {token} = {heightPx}px
    </span>
  )
}

function ButtonLibraryPreview() {
  const [showLeadingIcon, setShowLeadingIcon] = React.useState(false)
  const [showTrailingIcon, setShowTrailingIcon] = React.useState(false)

  return (
    <div className="space-y-0 divide-y rounded-xl border border-border/60 bg-muted">
      <div className="px-4 py-5">
        <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-2">
            <Switch
              id="button-leading-icon"
              checked={showLeadingIcon}
              onCheckedChange={setShowLeadingIcon}
              aria-label="Leading icon"
            />
            <Label htmlFor="button-leading-icon" className="text-xs font-normal text-muted-foreground">
              Leading icon
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="button-trailing-icon"
              checked={showTrailingIcon}
              onCheckedChange={setShowTrailingIcon}
              aria-label="Trailing icon"
            />
            <Label htmlFor="button-trailing-icon" className="text-xs font-normal text-muted-foreground">
              Trailing icon
            </Label>
          </div>
        </div>

        <Table>
          <TableCaption className="caption-top mb-3 text-left text-xs font-medium text-muted-foreground">
            Text buttons
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[8.5rem]">Size</TableHead>
              {BUTTON_VARIANTS.map(({ token, label }) => (
                <TableHead key={token}>{label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {BUTTON_TEXT_SIZE_ROWS.map(({ token, size, heightPx }) => (
              <TableRow key={token}>
                <TableCell>
                  <ButtonSizeCell token={token} heightPx={heightPx} />
                </TableCell>
                {BUTTON_VARIANTS.map(({ token: variant, label }) => (
                  <TableCell key={variant}>
                    <Button size={size} variant={variant}>
                      {showLeadingIcon ? (
                        <Plus data-icon="inline-start" aria-hidden />
                      ) : null}
                      {label}
                      {showTrailingIcon ? (
                        <ChevronRight data-icon="inline-end" aria-hidden />
                      ) : null}
                    </Button>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="px-4 py-5">
        <Table>
          <TableCaption className="caption-top mb-3 text-left text-xs font-medium text-muted-foreground">
            Icon-only buttons
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[8.5rem]">Size</TableHead>
              {BUTTON_ICON_VARIANTS.map(({ token, label }) => (
                <TableHead key={token}>{label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {BUTTON_ICON_SIZE_ROWS.map(({ token, size, heightPx }) => (
              <TableRow key={token}>
                <TableCell>
                  <ButtonSizeCell token={token} heightPx={heightPx} />
                </TableCell>
                {BUTTON_ICON_VARIANTS.map(({ token: variant, label }) => (
                  <TableCell key={variant}>
                    <Button size={size} variant={variant} aria-label={label}>
                      <Plus className="size-4" aria-hidden />
                    </Button>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export function ButtonsPage() {
  return (
    <PepDesignSystemPage title="Buttons" contentClassName="space-y-10">
        <section>
          <h2 className="mb-0 text-sm font-semibold tracking-tight text-foreground">Notes</h2>
          <ButtonNotesTable />
        </section>

        <section>
          <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">Button library</h2>
          <p className="mb-4 text-xs text-muted-foreground">
            Approved PEP button variants and sizes.{" "}
            <span className="font-medium text-foreground">
              Always pick a button from this section when creating layouts.
            </span>
          </p>
          <ButtonLibraryPreview />
        </section>

        <section>
          <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">
            Pending
          </h2>
          <Card>
            <CardContent className="p-4 text-xs text-muted-foreground">
              No pending button styles. Add new button styles here for review before moving them into
              the Button library.
            </CardContent>
          </Card>
        </section>
    </PepDesignSystemPage>
  )
}
