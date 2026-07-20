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
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

type ButtonSize = NonNullable<React.ComponentProps<typeof Button>["size"]>

const BUTTON_TEXT_SIZE_ROWS: { token: string; size: ButtonSize; heightPx: number }[] = [
  { token: "xs", size: "xs", heightPx: 24 },
  { token: "sm", size: "sm", heightPx: 32 },
  { token: "default", size: "default", heightPx: 36 },
  { token: "lg", size: "lg", heightPx: 40 },
]

const BUTTON_ICON_SIZE_ROWS: { token: string; size: ButtonSize; heightPx: number }[] = [
  { token: "icon-xs", size: "icon-xs", heightPx: 24 },
  { token: "icon-sm", size: "icon-sm", heightPx: 32 },
  { token: "icon", size: "icon", heightPx: 36 },
  { token: "icon-lg", size: "icon-lg", heightPx: 40 },
]

const BUTTON_SIZE_COMPARE_ROWS = [
  { token: "xs", pepPx: 24, shadcnButtonPx: 24, togglePx: null },
  { token: "sm", pepPx: 32, shadcnButtonPx: 32, togglePx: 32 },
  { token: "default", pepPx: 36, shadcnButtonPx: 36, togglePx: 36 },
  { token: "lg", pepPx: 40, shadcnButtonPx: 40, togglePx: 40 },
] as const

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
    property: "Sizes",
    shadcn: "xs, sm, default, lg",
    pep: "xs, sm, default, lg",
    note: "Token names and heights match shadcn Button / Toggle on sm–lg.",
  },
  {
    property: "Disabled",
    shadcn: "disabled:pointer-events-none disabled:opacity-50",
    pep: "Same",
    note: "Matches Checkbox / Radio / Input — opacity-50 only; no fill override.",
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
    <Table className={typeToken("text-xs/normal")}>
      <TableCaption className={cn(typeToken("text-xs/normal"), "caption-top mt-0 mb-2 text-left text-muted-foreground")}>
        PEP overrides vs stock shadcn only — omit rows when behaviour matches shadcn default.
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
    <span className={cn(typeToken("text-xs/normal"), "font-mono text-muted-foreground")}>
      {token} = {heightPx}px
    </span>
  )
}

function ButtonLibraryPreview() {
  const [showLeadingIcon, setShowLeadingIcon] = React.useState(false)
  const [showTrailingIcon, setShowTrailingIcon] = React.useState(false)
  const [showDisabled, setShowDisabled] = React.useState(false)

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
            <Label htmlFor="button-leading-icon" className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>
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
            <Label htmlFor="button-trailing-icon" className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>
              Trailing icon
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="button-disabled"
              checked={showDisabled}
              onCheckedChange={setShowDisabled}
              aria-label="Disabled"
            />
            <Label htmlFor="button-disabled" className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>
              Disabled
            </Label>
          </div>
        </div>

        <Table>
          <TableCaption className={cn(typeToken("text-xs/medium"), "caption-top mb-3 text-left text-muted-foreground")}>
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
                    <Button size={size} variant={variant} disabled={showDisabled}>
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
          <TableCaption className={cn(typeToken("text-xs/medium"), "caption-top mb-3 text-left text-muted-foreground")}>
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
                    <Button
                      size={size}
                      variant={variant}
                      disabled={showDisabled}
                      aria-label={label}
                    >
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
          <h2 className={cn(typeToken("text-sm/semibold"), "mb-0 tracking-tight text-foreground")}>Notes</h2>
          <ButtonNotesTable />
        </section>

        <section>
          <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Size compare</h2>
          <p className={cn(typeToken("text-xs/normal"), "mb-3 text-muted-foreground")}>
            PEP Button token names and heights aligned with shadcn Button; Toggle matches on sm–lg.
          </p>
          <Table className={cn(typeToken("text-xs/normal"), "max-w-xl")}>
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>PEP Button</TableHead>
                <TableHead>shadcn Button</TableHead>
                <TableHead>Toggle</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-muted-foreground">
              {BUTTON_SIZE_COMPARE_ROWS.map((row) => (
                <TableRow key={row.token}>
                  <TableCell className="font-medium text-foreground">{row.token}</TableCell>
                  <TableCell>{row.pepPx}px</TableCell>
                  <TableCell>{row.shadcnButtonPx}px</TableCell>
                  <TableCell>{row.togglePx == null ? "—" : `${row.togglePx}px`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>

        <section>
          <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Button library</h2>
          <p className={cn(typeToken("text-xs/normal"), "mb-4 text-muted-foreground")}>
            Approved PEP button variants and sizes.{" "}
            <span className="font-medium text-foreground">
              Always pick a button from this section when creating layouts.
            </span>
          </p>
          <ButtonLibraryPreview />
        </section>

        <section>
          <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>
            Pending
          </h2>
          <Card>
            <CardContent className={cn(typeToken("text-xs/normal"), "p-4 text-muted-foreground")}>
              No pending button styles. Add new button styles here for review before moving them into
              the Button library.
            </CardContent>
          </Card>
        </section>
    </PepDesignSystemPage>
  )
}
