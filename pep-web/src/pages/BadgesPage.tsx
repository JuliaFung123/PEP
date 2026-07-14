import * as React from "react"
import { Plus } from "lucide-react"

import { PepDesignSystemPage } from "@/components/pep-chrome"
import { Badge } from "@/components/ui/badge"
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

const BADGE_VARIANTS = [
  { token: "default", label: "Default" },
  { token: "secondary", label: "Secondary" },
  { token: "destructive", label: "Destructive" },
  { token: "outline", label: "Outline" },
] as const

function BadgeLibraryPreview() {
  const [showLeadingIcon, setShowLeadingIcon] = React.useState(false)
  const [showTrailingIcon, setShowTrailingIcon] = React.useState(false)

  return (
    <div className="rounded-xl border border-border/60 bg-muted px-4 py-5">
      <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex items-center gap-2">
          <Switch
            id="badge-leading-icon"
            checked={showLeadingIcon}
            onCheckedChange={setShowLeadingIcon}
            aria-label="Leading icon"
          />
          <Label htmlFor="badge-leading-icon" className="text-xs font-normal text-muted-foreground">
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
          <Label htmlFor="badge-trailing-icon" className="text-xs font-normal text-muted-foreground">
            Trailing icon
          </Label>
        </div>
      </div>

      <Table>
        <TableCaption className="caption-top mb-3 text-left text-xs font-medium text-muted-foreground">
          Badge variants — default = 20px
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
          <TableRow>
            <TableCell>
              <span className="font-mono text-xs text-muted-foreground">default = 20px</span>
            </TableCell>
            {BADGE_VARIANTS.map(({ token, label }) => (
              <TableCell key={token}>
                <Badge variant={token}>
                  {showLeadingIcon ? <Plus data-icon="inline-start" aria-hidden /> : null}
                  {label}
                  {showTrailingIcon ? <Plus data-icon="inline-end" aria-hidden /> : null}
                </Badge>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export function BadgesPage() {
  return (
    <PepDesignSystemPage title="Badges" contentClassName="space-y-10">
      <section>
        <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">Notes</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          Reference:{" "}
          <a
            href="https://ui.shadcn.com/docs/components/badge"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            shadcn Badge
          </a>
          . Matches shadcn — no PEP overrides. Pick variants from the library below.
        </p>
      </section>

      <section>
        <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">Badge library</h2>
        <p className="mb-4 text-xs text-muted-foreground">
          Approved PEP badge variants.{" "}
          <span className="font-medium text-foreground">
            Always pick a badge from this section when creating layouts.
          </span>
        </p>
        <BadgeLibraryPreview />
      </section>

      <section>
        <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">Pending</h2>
        <Card>
          <CardContent className="p-4 text-xs text-muted-foreground">
            No pending badge styles. Add new badge styles here for review before moving them into the
            Badge library.
          </CardContent>
        </Card>
      </section>
    </PepDesignSystemPage>
  )
}
