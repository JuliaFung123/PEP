import * as React from "react"

import { PepDesignSystemPage } from "@/components/pep-chrome"
import { Card } from "@/components/ui/card"
import { HoverAction, type HoverActionStyle } from "@/components/ui/hover-action"
import { ImageFile } from "@/components/ui/image-file"
import {
  Table,
  TableBody,
  TableCaption,
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
function AlwaysOnChrome({ styleVariant }: { styleVariant: HoverActionStyle }) {
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
        drag={styleVariant !== "card"}
        edit={styleVariant !== "card"}
        delete={styleVariant !== "card"}
        more={styleVariant === "card"}
        check={styleVariant === "card"}
        checked={checked}
        onCheckedChange={setChecked}
        onEdit={() => undefined}
        onDelete={() => undefined}
        onMore={() => undefined}
      />
    </div>
  )
}

/** Related host with HoverAction — shown on hover. */
function PreviewHost({ styleVariant }: { styleVariant: HoverActionStyle }) {
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
        showDrag
        onEdit={() => undefined}
        onDelete={() => undefined}
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
        showDrag
        onEdit={() => undefined}
        onDelete={() => undefined}
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
      <HoverAction
        styleVariant="card"
        check
        more
        checked={checked}
        onCheckedChange={setChecked}
        onMore={() => undefined}
      />
    </Card>
  )
}

export function HoverActionPage() {
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
          host — hover to reveal.
        </p>

        <div className="rounded-xl border border-border/60 bg-muted px-4 py-5">
          <Table>
            <TableCaption className={cn(typeToken("text-xs/medium"), "caption-top mb-3 text-left text-muted-foreground")}>
              Style × always on × preview host
            </TableCaption>
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
                    <AlwaysOnChrome styleVariant={style} />
                  </TableCell>
                  <TableCell className="align-middle">
                    <PreviewHost styleVariant={style} />
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
