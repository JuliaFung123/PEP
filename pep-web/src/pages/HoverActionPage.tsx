import * as React from "react"

import { PepDesignSystemPage } from "@/components/pep-chrome"
import { Card } from "@/components/ui/card"
import { HoverAction, type HoverActionStyle } from "@/components/ui/hover-action"
import { ImageFile } from "@/components/ui/image-file"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { typeToken } from "@/data/typography-tokens"

const SAMPLE_SRC = "/assets/figma/image-file/sample.png"
const PATH = "Folder/FolderName/FolderName/FolderName/"

const ROWS: {
  style: HoverActionStyle
  label: string
  hostLabel: string
}[] = [
  { style: "list", label: "List", hostLabel: "Image / File (list)" },
  { style: "image", label: "Image", hostLabel: "Image / File (grid)" },
  { style: "card", label: "Card", hostLabel: "Card" },
]

/** Bare chrome for docs — actions always visible. */
function AlwaysOnChrome({
  styleVariant,
  showDrag,
  showActions,
}: {
  styleVariant: HoverActionStyle
  showDrag: boolean
  showActions: boolean
}) {
  const [checked, setChecked] = React.useState(false)

  return (
    <div
      className={cn(
        "relative overflow-clip bg-muted",
        styleVariant === "list" && "h-8 w-[236px] rounded-sm",
        styleVariant === "image" && "size-[100px] rounded-sm",
        styleVariant === "card" && "size-[100px] rounded-lg",
      )}
    >
      <HoverAction
        styleVariant={styleVariant}
        forceVisible
        drag={showDrag && styleVariant !== "card"}
        edit={showActions && styleVariant !== "card"}
        delete={showActions && styleVariant !== "card"}
        more={showActions && styleVariant === "card"}
        check={showActions && styleVariant === "card"}
        checked={checked}
        onCheckedChange={setChecked}
        onEdit={showActions && styleVariant !== "card" ? () => undefined : undefined}
        onDelete={showActions && styleVariant !== "card" ? () => undefined : undefined}
        onMore={showActions && styleVariant === "card" ? () => undefined : undefined}
      />
    </div>
  )
}

/** Related host with HoverAction — shown on hover. */
function PreviewHost({
  styleVariant,
  showDrag,
  showActions,
}: {
  styleVariant: HoverActionStyle
  showDrag: boolean
  showActions: boolean
}) {
  const [checked, setChecked] = React.useState(false)

  if (styleVariant === "list") {
    return (
      <ImageFile
        styleVariant="list"
        size="default"
        src={SAMPLE_SRC}
        alt="Sample"
        filename="filename.png"
        filesize="123.2KB"
        path={PATH}
        showDrag={showDrag}
        onEdit={showActions ? () => undefined : undefined}
        onDelete={showActions ? () => undefined : undefined}
      />
    )
  }

  if (styleVariant === "image") {
    return (
      <ImageFile
        styleVariant="grid"
        size="default"
        src={SAMPLE_SRC}
        alt="Sample"
        showDrag={showDrag}
        onEdit={showActions ? () => undefined : undefined}
        onDelete={showActions ? () => undefined : undefined}
      />
    )
  }

  return (
    <Card
      size="sm"
      className="group/hover-host relative size-[140px] gap-0 overflow-clip p-0 ring-foreground/10 transition-shadow hover:shadow-elevation-lg"
    >
      <img
        src={SAMPLE_SRC}
        alt="Card preview"
        className="absolute inset-0 size-full object-cover"
        draggable={false}
      />
      {showActions ? (
        <HoverAction
          styleVariant="card"
          check
          more
          checked={checked}
          onCheckedChange={setChecked}
          onMore={() => undefined}
        />
      ) : null}
    </Card>
  )
}

export function HoverActionPage() {
  const [showDrag, setShowDrag] = React.useState(true)
  const [showActions, setShowActions] = React.useState(true)

  return (
    <PepDesignSystemPage title="Hover action" contentClassName="space-y-10">
      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Notes</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-3 text-muted-foreground")}>
          No shadcn equivalent — PEP Figma{" "}
          <a
            href="https://www.figma.com/design/bRDWHAITfr5p6onqnKTf0q/--PEP-Web_Library?node-id=5298-9418"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            hover overlay
          </a>{" "}
          (actions only). Dim / elevation stay on the host’s own hover. Compose with{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">group/hover-host relative</code>
          .
        </p>
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Library</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-4 text-muted-foreground")}>
          <span className="font-medium text-foreground">Always on</span> shows the action chrome.{" "}
          <span className="font-medium text-foreground">Preview</span> attaches it to a related
          host — hover to reveal. Toggle <span className="font-medium text-foreground">Drag</span>{" "}
          and <span className="font-medium text-foreground">Actions</span> to preview each slot
          (List / Image: grip + edit/delete; Card: checkbox + more).
        </p>

        <div className="rounded-xl border border-border/60 bg-muted px-4 py-5">
          <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2">
              <Switch
                id="hover-action-drag"
                checked={showDrag}
                onCheckedChange={setShowDrag}
                aria-label="Drag"
              />
              <Label htmlFor="hover-action-drag" className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>
                Drag
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="hover-action-actions"
                checked={showActions}
                onCheckedChange={setShowActions}
                aria-label="Actions"
              />
              <Label
                htmlFor="hover-action-actions"
                className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}
              >
                Actions
              </Label>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[8.5rem]">Style</TableHead>
                <TableHead>Always on</TableHead>
                <TableHead>Preview</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map(({ style, label, hostLabel }) => (
                <TableRow key={style}>
                  <TableCell className="align-middle">
                    <div className={cn(typeToken("text-xs/medium"), "text-foreground")}>{label}</div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">{hostLabel}</div>
                  </TableCell>
                  <TableCell className="align-middle">
                    <AlwaysOnChrome
                      styleVariant={style}
                      showDrag={showDrag}
                      showActions={showActions}
                    />
                  </TableCell>
                  <TableCell className="align-middle">
                    <PreviewHost
                      styleVariant={style}
                      showDrag={showDrag}
                      showActions={showActions}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </PepDesignSystemPage>
  )
}
