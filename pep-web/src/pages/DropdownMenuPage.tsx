import {
  CheckIcon,
  ChevronRightIcon,
  PencilIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react"
import * as React from "react"

import {
  FieldMultiAvatarSelect,
  FieldMultiImageSelect,
  FieldMultiSelect,
} from "@/components/field-multi-selects"
import { LibraryField } from "@/components/library-field"
import { PepDesignSystemPage } from "@/components/pep-chrome"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  DROPDOWN_MENU_LIBRARY_FIELD_ROWS,
  DROPDOWN_MENU_LIBRARY_ITEM_ROWS,
  DROPDOWN_MENU_PENDING_ROWS,
  type DropdownMenuStyleId,
  type DropdownMenuStyleRow,
} from "@/data/dropdown-menu-registry"
import { cn } from "@/lib/utils"
import { typeToken } from "@/data/typography-tokens"

/**
 * Always-open menu surface for Library scanning.
 * Portals into a local host so rows stay in the document flow.
 */
function CatalogMenu({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const [host, setHost] = React.useState<HTMLDivElement | null>(null)

  return (
    <div ref={setHost} className={cn("relative w-64", className)}>
      <DropdownMenu open onOpenChange={() => {}} modal={false}>
        <DropdownMenuTrigger
          render={<button type="button" className="sr-only" tabIndex={-1} />}
        >
          Menu preview
        </DropdownMenuTrigger>
        {host ? (
          <DropdownMenuContent
            container={host}
            positionerClassName="!static !inset-auto !transform-none w-full"
            className="w-64 animate-none shadow-md"
            sideOffset={0}
            align="start"
          >
            {children}
          </DropdownMenuContent>
        ) : null}
      </DropdownMenu>
    </div>
  )
}

function StyleText() {
  return (
    <CatalogMenu>
      <DropdownMenuItem>
        Label
        <DropdownMenuShortcut>Subtext</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        Label
        <ChevronRightIcon className="ml-auto size-4 opacity-60" aria-hidden />
      </DropdownMenuItem>
      <DropdownMenuItem variant="destructive">Destructive</DropdownMenuItem>
      <DropdownMenuItem disabled>Disabled</DropdownMenuItem>
    </CatalogMenu>
  )
}

function StyleLeadingCheck() {
  const [value, setValue] = React.useState("a")
  return (
    <CatalogMenu>
      <DropdownMenuItem
        closeOnClick={false}
        onClick={() => setValue("a")}
      >
        {value === "a" ? (
          <CheckIcon className="size-4" />
        ) : (
          <span className="size-4 shrink-0" aria-hidden />
        )}
        Label
        <DropdownMenuShortcut>Subtext</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem
        closeOnClick={false}
        onClick={() => setValue("b")}
      >
        {value === "b" ? (
          <CheckIcon className="size-4" />
        ) : (
          <span className="size-4 shrink-0" aria-hidden />
        )}
        Label
      </DropdownMenuItem>
    </CatalogMenu>
  )
}

function StyleTrailingCheck() {
  const [a, setA] = React.useState(true)
  const [b, setB] = React.useState(false)
  return (
    <CatalogMenu>
      <DropdownMenuCheckboxItem checked={a} onCheckedChange={setA}>
        Label
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem checked={b} onCheckedChange={setB}>
        Label
      </DropdownMenuCheckboxItem>
    </CatalogMenu>
  )
}

function StyleIcon() {
  return (
    <CatalogMenu>
      <DropdownMenuItem>
        <PencilIcon />
        Label
        <DropdownMenuShortcut>Subtext</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <UserIcon />
        Label
        <ChevronRightIcon className="ml-auto size-4 opacity-60" aria-hidden />
      </DropdownMenuItem>
      <DropdownMenuItem variant="destructive">
        <Trash2Icon />
        Destructive
      </DropdownMenuItem>
    </CatalogMenu>
  )
}

function StyleIconTrailingCheck() {
  const [a, setA] = React.useState(true)
  const [b, setB] = React.useState(false)
  return (
    <CatalogMenu>
      <DropdownMenuCheckboxItem checked={a} onCheckedChange={setA}>
        <span className="flex min-w-0 items-center gap-2">
          <PencilIcon className="size-4 shrink-0" aria-hidden />
          <span className="min-w-0 truncate">Label</span>
        </span>
      </DropdownMenuCheckboxItem>
      <DropdownMenuCheckboxItem checked={b} onCheckedChange={setB}>
        <span className="flex min-w-0 items-center gap-2">
          <UserIcon className="size-4 shrink-0" aria-hidden />
          <span className="min-w-0 truncate">Label</span>
        </span>
      </DropdownMenuCheckboxItem>
    </CatalogMenu>
  )
}

function StyleRadio() {
  const [value, setValue] = React.useState("a")
  return (
    <CatalogMenu>
      <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
        <DropdownMenuRadioItem value="a">Label</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="b">Label</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </CatalogMenu>
  )
}

function StyleSubTrigger() {
  return (
    <CatalogMenu>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>More actions</DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="w-56">
          <DropdownMenuItem>Label</DropdownMenuItem>
          <DropdownMenuItem>Label</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Label</DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    </CatalogMenu>
  )
}

function StylePreview({ id }: { id: DropdownMenuStyleId }) {
  switch (id) {
    case "text":
      return <StyleText />
    case "leading-check":
      return <StyleLeadingCheck />
    case "trailing-check":
      return <StyleTrailingCheck />
    case "icon":
      return <StyleIcon />
    case "icon-trailing-check":
      return <StyleIconTrailingCheck />
    case "radio":
      return <StyleRadio />
    case "sub-trigger":
      return <StyleSubTrigger />
    case "field-multi":
      return (
        <LibraryField
          label="Multi"
          filled
          descriptionTop="Select multiple tags from a checkbox menu."
          descriptionBottom="Value is a list of selected tag labels."
          hints="Uses DropdownMenuCheckboxItem with Light badges."
        >
          <FieldMultiSelect />
        </LibraryField>
      )
    case "field-multi-image":
      return (
        <LibraryField
          label="Multi Image"
          filled
          descriptionTop="Select multiple items shown with image badges."
          descriptionBottom="Value includes image thumbnails in each badge."
          hints="BadgeImage shows a leading thumb per selection."
        >
          <FieldMultiImageSelect />
        </LibraryField>
      )
    case "field-multi-avatar":
      return (
        <LibraryField
          label="Multi Avatar"
          filled
          descriptionTop="Select multiple people from an avatar list."
          descriptionBottom="Value is a list of selected user names."
          hints="BadgeAvatar Outline with avatar rows in the menu."
        >
          <FieldMultiAvatarSelect />
        </LibraryField>
      )
    default:
      return null
  }
}

function StyleBlock({
  row,
  showPendingNote = false,
}: {
  row: DropdownMenuStyleRow
  showPendingNote?: boolean
}) {
  return (
    <div className="space-y-2">
      <div>
        <div className={cn(typeToken("text-sm/medium"), "text-foreground")}>{row.name}</div>
        <p className={cn(typeToken("text-xs/normal"), "mt-0.5 text-muted-foreground")}>
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">{row.composition}</code>
          {row.figmaStyle ? (
            <>
              {" "}
              · Figma style=
              <code className="rounded bg-muted px-1 py-0.5 text-[11px]">{row.figmaStyle}</code>
            </>
          ) : null}
        </p>
        {showPendingNote && row.pendingNote ? (
          <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">{row.pendingNote}</p>
        ) : null}
      </div>
      <StylePreview id={row.id} />
    </div>
  )
}

/**
 * Dropdown Menu library — Figma Menu Item styles + Field Multi compositions.
 * @see https://www.figma.com/design/bRDWHAITfr5p6onqnKTf0q/--PEP-Web_Library?node-id=2740-597
 */
export function DropdownMenuPage() {
  return (
    <PepDesignSystemPage title="Dropdown menu" contentClassName="space-y-10">
      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Notes</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-3 text-muted-foreground")}>
          Standard shadcn{" "}
          <a
            href="https://ui.shadcn.com/docs/components/dropdown-menu"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            Dropdown Menu
          </a>
          . List-item styles match Figma{" "}
          <a
            href="https://www.figma.com/design/bRDWHAITfr5p6onqnKTf0q/--PEP-Web_Library?node-id=2740-597"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            Menu Item
          </a>
          : Text, LeadingCheck, TrailingCheck, Icon, Icon+TrailingCheck (Select Yes/No). Catalog lives
          in{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">
            @/data/dropdown-menu-registry
          </code>
          . New styles → add a Pending row + preview, then promote to Library.
        </p>
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Library</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-4 text-muted-foreground")}>
          <span className="font-medium text-foreground">
            One row per composition — always pick from here.
          </span>{" "}
          Menu item lists stay open in-flow so styles scan side-by-side; Field Multi shells reuse Field
          §2.
        </p>

        <div className="space-y-8">
          <div>
            <div className={cn(typeToken("text-xs/medium"), "mb-3 text-muted-foreground")}>Menu items</div>
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {DROPDOWN_MENU_LIBRARY_ITEM_ROWS.map((row) => (
                <StyleBlock key={row.id} row={row} />
              ))}
            </div>
          </div>

          <div>
            <div className={cn(typeToken("text-xs/medium"), "mb-3 text-muted-foreground")}>
              Field compositions (synced with Field library)
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {DROPDOWN_MENU_LIBRARY_FIELD_ROWS.map((row) => (
                <StyleBlock key={row.id} row={row} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Pending</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-4 text-muted-foreground")}>
          New list-item styles under review. Use only when{" "}
          <span className="font-medium text-foreground">no Library match</span> exists.
        </p>
        {DROPDOWN_MENU_PENDING_ROWS.length === 0 ? (
          <p className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>No styles in this section yet.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {DROPDOWN_MENU_PENDING_ROWS.map((row) => (
              <StyleBlock key={row.id} row={row} showPendingNote />
            ))}
          </div>
        )}
      </section>
    </PepDesignSystemPage>
  )
}
