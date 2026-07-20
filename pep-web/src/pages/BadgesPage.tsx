import * as React from "react"
import { Plus } from "lucide-react"

import { PepDesignSystemPage } from "@/components/pep-chrome"
import { Badge, BadgeAvatar, BadgeImage } from "@/components/ui/badge"
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

type BadgeSize = NonNullable<React.ComponentProps<typeof Badge>["size"]>

const BADGE_SIZES: { token: BadgeSize; heightPx: number }[] = [
  { token: "sm", heightPx: 20 },
  { token: "lg", heightPx: 24 },
  { token: "xl", heightPx: 32 },
]

const BADGE_VARIANTS = [
  { token: "default", label: "Default" },
  { token: "Light", label: "Light" },
  { token: "secondary", label: "Secondary" },
  { token: "destructive", label: "Destructive" },
  { token: "outline", label: "Outline" },
] as const

const BADGE_NOTES = [
  {
    property: "Variants",
    shadcn: "default, secondary, destructive, outline, ghost, link",
    pep: "Adds Light",
    note: "`Light` maps to Figma `*light` — violet-500 at 20% opacity + foreground text.",
  },
  {
    property: "Sizes",
    shadcn: "Single size (h-5)",
    pep: "sm 20 / lg 24 / xl 32",
    note: "Matches PEP Figma Badge Size prop; default is `sm`.",
  },
  {
    property: "Image type",
    shadcn: "—",
    pep: "BadgeImage sm / lg / xl",
    note: "Squared thumb + label. Size height 20 / 24 / 32; radius sm / md / lg.",
  },
  {
    property: "Avatar type",
    shadcn: "Compose Avatar in Badge",
    pep: "BadgeAvatar — Outline only",
    note: "Leading Avatar + label. Style = Outline only (no other variants).",
  },
] as const

const BADGE_IMAGE_DEMO = {
  src: "/assets/figma/activity-list/category-1.png",
  label: "Category",
} as const

const BADGE_IMAGE_SIZES: { token: BadgeSize; heightPx: number }[] = [
  { token: "sm", heightPx: 20 },
  { token: "lg", heightPx: 24 },
  { token: "xl", heightPx: 32 },
]

const BADGE_AVATAR = {
  src: "https://github.com/shadcn.png",
  alt: "@shadcn",
  fallback: "CN",
  name: "shadcn",
} as const

function SizeCell({ token, heightPx }: { token: string; heightPx: number }) {
  return (
    <span className={cn(typeToken("text-xs/normal"), "font-mono text-muted-foreground")}>
      {token} = {heightPx}px
    </span>
  )
}

function BadgeNotesTable() {
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
        {BADGE_NOTES.map((row) => (
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

function BadgeLibraryPreview() {
  const [showLeadingIcon, setShowLeadingIcon] = React.useState(false)
  const [showTrailingIcon, setShowTrailingIcon] = React.useState(false)

  return (
    <div className="space-y-0 divide-y rounded-xl border border-border/60 bg-muted">
      <div className="px-4 py-5">
        <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-2">
            <Switch
              id="badge-leading-icon"
              checked={showLeadingIcon}
              onCheckedChange={setShowLeadingIcon}
              aria-label="Leading icon"
            />
            <Label htmlFor="badge-leading-icon" className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>
              Leading icon
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="badge-trailing-icon"
              checked={showTrailingIcon}
              onCheckedChange={setShowTrailingIcon}
              aria-label="Trailing icon"
            />
            <Label
              htmlFor="badge-trailing-icon"
              className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}
            >
              Trailing icon
            </Label>
          </div>
        </div>

        <Table>
          <TableCaption className={cn(typeToken("text-xs/medium"), "caption-top mb-3 text-left text-muted-foreground")}>
            Text badge — sizes from PEP Figma (`sm` / `lg` / `xl`)
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[8.5rem]">Size</TableHead>
              {BADGE_VARIANTS.map(({ label }) => (
                <TableHead key={label}>{label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {BADGE_SIZES.map(({ token, heightPx }) => (
              <TableRow key={token}>
                <TableCell>
                  <SizeCell token={token} heightPx={heightPx} />
                </TableCell>
                {BADGE_VARIANTS.map(({ token: variant, label }) => (
                  <TableCell key={variant}>
                    <Badge variant={variant} size={token}>
                      {showLeadingIcon ? <Plus data-icon="inline-start" aria-hidden /> : null}
                      {label}
                      {showTrailingIcon ? <Plus data-icon="inline-end" aria-hidden /> : null}
                    </Badge>
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
            Avatar badge — Style = Outline only (`BadgeAvatar`, sizes sm / lg / xl)
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[8.5rem]">Size</TableHead>
              <TableHead>Outline</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {BADGE_SIZES.map(({ token, heightPx }) => (
              <TableRow key={token}>
                <TableCell>
                  <SizeCell token={token} heightPx={heightPx} />
                </TableCell>
                <TableCell>
                  <BadgeAvatar
                    size={token}
                    variant="outline"
                    src={BADGE_AVATAR.src}
                    alt={BADGE_AVATAR.alt}
                    fallback={BADGE_AVATAR.fallback}
                  >
                    {BADGE_AVATAR.name}
                    {showTrailingIcon ? <Plus data-icon="inline-end" aria-hidden /> : null}
                  </BadgeAvatar>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="px-4 py-5">
        <Table>
          <TableCaption className={cn(typeToken("text-xs/medium"), "caption-top mb-3 text-left text-muted-foreground")}>
            Image badge — squared thumb + label (`BadgeImage`, sizes sm / lg / xl)
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[8.5rem]">Size</TableHead>
              <TableHead>Preview</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {BADGE_IMAGE_SIZES.map(({ token, heightPx }) => (
              <TableRow key={token}>
                <TableCell>
                  <SizeCell token={token} heightPx={heightPx} />
                </TableCell>
                <TableCell>
                  <BadgeImage size={token} src={BADGE_IMAGE_DEMO.src}>
                    {BADGE_IMAGE_DEMO.label}
                  </BadgeImage>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export function BadgesPage() {
  return (
    <PepDesignSystemPage title="Badges" contentClassName="space-y-10">
      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Notes</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-3 text-muted-foreground")}>
          Reference:{" "}
          <a
            href="https://ui.shadcn.com/docs/components/badge"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            shadcn Badge
          </a>
          {" · "}
          <a
            href="https://www.figma.com/design/bRDWHAITfr5p6onqnKTf0q/--PEP-Web_Library?node-id=620-965"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            PEP Figma Badge
          </a>
          .
        </p>
        <Card>
          <CardContent className="p-4">
            <BadgeNotesTable />
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Badge library</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-4 text-muted-foreground")}>
          Approved PEP badge variants.{" "}
          <span className="font-medium text-foreground">
            Always pick a badge from this section when creating layouts.
          </span>
        </p>
        <BadgeLibraryPreview />
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Pending</h2>
        <Card>
          <CardContent className={cn(typeToken("text-xs/normal"), "p-4 text-muted-foreground")}>
            No pending badge styles. Add new badge styles here for review before moving them into the
            Badge library.
          </CardContent>
        </Card>
      </section>
    </PepDesignSystemPage>
  )
}
