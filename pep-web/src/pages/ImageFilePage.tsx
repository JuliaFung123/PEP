import {
  FIELD_FILE_LIST_DEMO_ITEMS,
  FIELD_IMAGE_GRID_DEMO_ITEMS,
  FieldFileListEmpty,
  FieldImageEmpty,
  FieldMultiFileList,
  FieldMultiImageGrid,
} from "@/components/field-library-controls"
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

const SIZES: {
  size: ImageFileSize
  label: string
  emptySize?: "default" | "lg"
  multiGridSize?: "default" | "lg"
}[] = [
  { size: "sm", label: "sm (40)" },
  { size: "default", label: "Default (100)", emptySize: "default", multiGridSize: "default" },
  { size: "lg", label: "lg (160)", emptySize: "lg", multiGridSize: "lg" },
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
          . Empty upload tile (Figma{" "}
          <a
            href="https://www.figma.com/design/bRDWHAITfr5p6onqnKTf0q/--PEP-Web_Library?node-id=4936-1746"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            4936:1746
          </a>
          ) uses <code className="rounded bg-muted px-1 py-0.5 text-[11px]">FieldImageEmpty</code>; List
          empty (Figma{" "}
          <a
            href="https://www.figma.com/design/bRDWHAITfr5p6onqnKTf0q/--PEP-Web_Library?node-id=4627-1838"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            4627:1838
          </a>
          ) uses <code className="rounded bg-muted px-1 py-0.5 text-[11px]">FieldFileListEmpty</code> —{" "}
          <strong>+</strong> upload or library with placeholder. Also on the{" "}
          <a
            href="/preview/input-type"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            Field
          </a>{" "}
          page (Image-S / Image-L / file). Multi grid uses{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">FieldMultiImageGrid</code>; multi
          list uses{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">FieldMultiFileList</code> —
          empty upload row only, or row plus filled{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">ImageFile</code> list tiles
          (drag to reorder). Hover shows edit / delete on filled tiles (list also drag).
        </p>
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Library</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-4 text-muted-foreground")}>
          Image (grid) and List — size × empty / filled / multi. Hover to reveal actions on filled
          tiles.
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
                  <TableHead>Empty</TableHead>
                  <TableHead>Filled</TableHead>
                  <TableHead>Empty-multi</TableHead>
                  <TableHead>Filled-multi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SIZES.map(({ size, label, emptySize, multiGridSize }) => (
                  <TableRow key={`image-${size}`}>
                    <TableCell className={cn(typeToken("text-xs/normal"), "align-middle text-muted-foreground")}>
                      {label}
                    </TableCell>
                    <TableCell className="align-middle">
                      {emptySize ? (
                        <FieldImageEmpty size={emptySize} />
                      ) : (
                        <span className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>—</span>
                      )}
                    </TableCell>
                    <TableCell className="align-middle">
                      <FilledImageFile size={size} styleVariant="grid" />
                    </TableCell>
                    <TableCell className="align-middle">
                      {multiGridSize ? (
                        <FieldMultiImageGrid size={multiGridSize} />
                      ) : (
                        <span className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>—</span>
                      )}
                    </TableCell>
                    <TableCell className="align-middle">
                      {multiGridSize ? (
                        <FieldMultiImageGrid
                          size={multiGridSize}
                          defaultItems={FIELD_IMAGE_GRID_DEMO_ITEMS}
                        />
                      ) : (
                        <span className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>—</span>
                      )}
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
                  <TableHead>Empty</TableHead>
                  <TableHead>Filled</TableHead>
                  <TableHead>Empty-multi</TableHead>
                  <TableHead>Filled-multi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SIZES.map(({ size, label }) => (
                  <TableRow key={`list-${size}`}>
                    <TableCell className={cn(typeToken("text-xs/normal"), "align-middle text-muted-foreground")}>
                      {label}
                    </TableCell>
                    <TableCell className="align-middle">
                      <FieldFileListEmpty />
                    </TableCell>
                    <TableCell className="align-middle">
                      <FilledImageFile size={size} styleVariant="list" />
                    </TableCell>
                    <TableCell className="align-middle">
                      <FieldMultiFileList size={size} />
                    </TableCell>
                    <TableCell className="align-middle">
                      <FieldMultiFileList
                        size={size}
                        defaultItems={FIELD_FILE_LIST_DEMO_ITEMS}
                      />
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
