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

const SAMPLE_SRC = "/assets/figma/image-file/sample.png"
const PATH = "Folder/FolderName/FolderName/FolderName/"

const SIZES: { size: ImageFileSize; label: string }[] = [
  { size: "sm", label: "sm (40)" },
  { size: "default", label: "Default (100)" },
  { size: "lg", label: "lg (160)" },
]

function DemoThumb({
  size,
  selected,
  styleVariant,
}: {
  size: ImageFileSize
  selected: boolean
  styleVariant: "grid" | "list"
}) {
  return (
    <ImageFile
      styleVariant={styleVariant}
      size={size}
      selected={selected}
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
        <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">Notes</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          No shadcn equivalent — PEP Figma{" "}
          <a
            href="https://www.figma.com/design/bRDWHAITfr5p6onqnKTf0q/--PEP-Web_Library?node-id=5298-9397"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            Image/File
          </a>
          . Props:{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">styleVariant</code> (grid |
          list), <code className="rounded bg-muted px-1 py-0.5 text-[11px]">size</code> (sm /
          default / lg),{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">selected</code>. Hover shows
          edit / delete (list also shows drag). Omit{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">src</code> for a file placeholder.
        </p>
      </section>

      <section>
        <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">Library</h2>
        <p className="mb-4 text-xs text-muted-foreground">
          Approved Image/File compositions. Hover any cell to reveal actions.
        </p>

        <div className="space-y-0 divide-y rounded-xl border border-border/60 bg-muted">
          <div className="px-4 py-5">
            <Table>
              <TableCaption className="caption-top mb-3 text-left text-xs font-medium text-muted-foreground">
                Grid — size × selected
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[8.5rem]">Size</TableHead>
                  <TableHead>Default</TableHead>
                  <TableHead>Selected</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SIZES.map(({ size, label }) => (
                  <TableRow key={`grid-${size}`}>
                    <TableCell className="align-middle text-xs text-muted-foreground">
                      {label}
                    </TableCell>
                    <TableCell className="align-middle">
                      <DemoThumb size={size} selected={false} styleVariant="grid" />
                    </TableCell>
                    <TableCell className="align-middle">
                      <DemoThumb size={size} selected styleVariant="grid" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="px-4 py-5">
            <Table>
              <TableCaption className="caption-top mb-3 text-left text-xs font-medium text-muted-foreground">
                List — size × selected
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[8.5rem]">Size</TableHead>
                  <TableHead>Default</TableHead>
                  <TableHead>Selected</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SIZES.map(({ size, label }) => (
                  <TableRow key={`list-${size}`}>
                    <TableCell className="align-middle text-xs text-muted-foreground">
                      {label}
                    </TableCell>
                    <TableCell className="align-middle">
                      <DemoThumb size={size} selected={false} styleVariant="list" />
                    </TableCell>
                    <TableCell className="align-middle">
                      <DemoThumb size={size} selected styleVariant="list" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="px-4 py-5">
            <Table>
              <TableCaption className="caption-top mb-3 text-left text-xs font-medium text-muted-foreground">
                File placeholder (no image)
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[8.5rem]">Size</TableHead>
                  <TableHead>Grid</TableHead>
                  <TableHead>List</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SIZES.map(({ size, label }) => (
                  <TableRow key={`placeholder-${size}`}>
                    <TableCell className="align-middle text-xs text-muted-foreground">
                      {label}
                    </TableCell>
                    <TableCell className="align-middle">
                      <ImageFile
                        styleVariant="grid"
                        size={size}
                        onEdit={() => undefined}
                        onDelete={() => undefined}
                      />
                    </TableCell>
                    <TableCell className="align-middle">
                      <ImageFile
                        styleVariant="list"
                        size={size}
                        filename="filename.pdf"
                        filesize="123.2KB"
                        path={PATH}
                        showDrag
                        onEdit={() => undefined}
                        onDelete={() => undefined}
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
