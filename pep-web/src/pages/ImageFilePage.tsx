import { PepDesignSystemPage } from "@/components/pep-chrome"
import { ImageFile, type ImageFileSize } from "@/components/ui/image-file"
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

const SAMPLE_SRC = "/assets/figma/image-file/sample.png"
const PATH = "Folder/FolderName/FolderName/FolderName/"

const SIZES: { size: ImageFileSize; label: string }[] = [
  { size: "sm", label: "sm (40)" },
  { size: "default", label: "Default (100)" },
  { size: "lg", label: "lg (160)" },
]

function FilledImageFile({
  size,
  styleVariant,
}: {
  size: ImageFileSize
  styleVariant: "grid" | "list"
}) {
  return (
    <ImageFile
      styleVariant={styleVariant}
      size={size}
      src={SAMPLE_SRC}
      alt="Sample attachment"
      filename="filename.png"
      filesize="123.2KB"
      path={styleVariant === "list" ? PATH : undefined}
      showDrag={styleVariant === "list"}
      onEdit={() => undefined}
      onDelete={() => undefined}
    />
  )
}

export function ImageFilePage() {
  return (
    <PepDesignSystemPage title="Image / File" contentClassName="space-y-10">
      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Notes</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-3 text-muted-foreground")}>
          No shadcn equivalent — PEP Figma{" "}
          <a
            href="https://www.figma.com/design/bRDWHAITfr5p6onqnKTf0q/--PEP-Web_Library?node-id=5298-9397"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            Image/File
          </a>
          . Filled media only — empty upload triggers live on the{" "}
          <a
            href="/preview/input-type"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            Field
          </a>{" "}
          page (Image-S / file). Hover shows edit / delete (list also drag).
        </p>
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Library</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-4 text-muted-foreground")}>
          Image (grid) and List — size × filled. Hover to reveal actions.
        </p>

        <div className="space-y-0 divide-y rounded-xl border border-border/60 bg-muted">
          <div className="px-4 py-5">
            <Table>
              <TableCaption className={cn(typeToken("text-xs/medium"), "caption-top mb-3 text-left text-muted-foreground")}>
                Image (grid)
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[8.5rem]">Size</TableHead>
                  <TableHead>Filled</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SIZES.map(({ size, label }) => (
                  <TableRow key={`image-${size}`}>
                    <TableCell className={cn(typeToken("text-xs/normal"), "align-middle text-muted-foreground")}>
                      {label}
                    </TableCell>
                    <TableCell className="align-middle">
                      <FilledImageFile size={size} styleVariant="grid" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="px-4 py-5">
            <Table>
              <TableCaption className={cn(typeToken("text-xs/medium"), "caption-top mb-3 text-left text-muted-foreground")}>
                List
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[8.5rem]">Size</TableHead>
                  <TableHead>Filled</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SIZES.map(({ size, label }) => (
                  <TableRow key={`list-${size}`}>
                    <TableCell className={cn(typeToken("text-xs/normal"), "align-middle text-muted-foreground")}>
                      {label}
                    </TableCell>
                    <TableCell className="align-middle">
                      <FilledImageFile size={size} styleVariant="list" />
                    </TableCell>
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
