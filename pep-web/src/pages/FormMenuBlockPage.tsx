import * as React from "react"

import { FormMenu, FormMenuItem, type FormMenuItemState } from "@/components/form-menu"
import { PepDesignSystemPage } from "@/components/pep-chrome"
import {
  FORM_MENU_LIBRARY_ROWS,
  FORM_MENU_PENDING_ROWS,
  type FormMenuStyleId,
  type FormMenuStyleRow,
} from "@/data/form-menu-registry"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

type DemoItem = {
  label: string
  required?: boolean
  state: FormMenuItemState
  active?: boolean
}

/** Composed form-nav example — Preview section only (not Library). */
const DEMO_PREVIEW: DemoItem[] = [
  { label: "Finished+Selected+Required", required: true, state: "complete", active: true },
  { label: "Required", required: true, state: "incomplete" },
  { label: "Parent", required: true, state: "incomplete" },
  { label: "Child", state: "nested" },
  { label: "Child", state: "nested" },
  { label: "Child", state: "nested" },
  { label: "Finished+Required", required: true, state: "complete" },
]

/** Unique list-item variants (Library). */
const DEMO_VARIANTS: DemoItem[] = [
  { label: "Finished+Selected+Required", required: true, state: "complete", active: true },
  { label: "Required", required: true, state: "incomplete" },
  { label: "Parent", required: true, state: "incomplete" },
  { label: "Child", state: "nested" },
  { label: "Finished+Required", required: true, state: "complete" },
]

function MenuPreview({
  initialItems,
  ariaLabel,
}: {
  initialItems: DemoItem[]
  ariaLabel: string
}) {
  const [items, setItems] = React.useState(initialItems)

  return (
    <FormMenu className="w-56" aria-label={ariaLabel}>
      {items.map((item, index) => (
        <FormMenuItem
          key={`${item.label}-${index}`}
          label={item.label}
          required={item.required}
          state={item.state}
          active={item.active}
          aria-pressed={item.active ?? false}
          onClick={() => {
            setItems((prev) =>
              prev.map((row, i) =>
                i === index ? { ...row, active: !row.active } : row,
              ),
            )
          }}
        />
      ))}
    </FormMenu>
  )
}

function StylePreview({ id }: { id: FormMenuStyleId }) {
  if (id !== "list-item-variants") return null
  return <MenuPreview initialItems={DEMO_VARIANTS} ariaLabel="Form menu list item variants" />
}

function StyleBlock({
  row,
  showPendingNote = false,
}: {
  row: FormMenuStyleRow
  showPendingNote?: boolean
}) {
  return (
    <div className="space-y-2">
      <div>
        <div className={cn(typeToken("text-sm/medium"), "text-foreground")}>{row.name}</div>
        <p className={cn(typeToken("text-xs/normal"), "mt-0.5 text-muted-foreground")}>
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">{row.composition}</code>
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
 * Block → Form Menu — multi-section form nav (Figma Form_menu).
 * @see https://www.figma.com/design/IZ6algHkFp6Z2a5dYiS1hC/PEP?node-id=477-19895
 */
export function FormMenuBlockPage() {
  return (
    <PepDesignSystemPage title="Form Menu" contentClassName="space-y-10">
      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Notes</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-3 text-muted-foreground")}>
          Vertical section nav for multi-step / multi-panel forms (Figma{" "}
          <a
            href="https://www.figma.com/design/IZ6algHkFp6Z2a5dYiS1hC/PEP?node-id=477-19895"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            Form_menu
          </a>
          ). Not a shadcn Dropdown Menu — use{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">FormMenu</code> +{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">FormMenuItem</code> from{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">@/components/form-menu</code>.
          States: <span className="font-medium text-foreground">complete</span> /{" "}
          <span className="font-medium text-foreground">incomplete</span> /{" "}
          <span className="font-medium text-foreground">nested</span>;{" "}
          <span className="font-medium text-foreground">active</span> inverts the row. Required uses
          destructive <code className="rounded bg-muted px-1 py-0.5 text-[11px]">*</code>. Click a
          row in Library / Preview to toggle selected.
        </p>
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Library</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-4 text-muted-foreground")}>
          <span className="font-medium text-foreground">
            Always pick from here when building form section sidebars.
          </span>
        </p>
        <div className="space-y-8">
          {FORM_MENU_LIBRARY_ROWS.map((row) => (
            <StyleBlock key={row.id} row={row} />
          ))}
        </div>
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Preview</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-4 text-muted-foreground")}>
          Composed example only — not a Library pick. Shows variants stacked as a product form nav.
        </p>
        <MenuPreview initialItems={DEMO_PREVIEW} ariaLabel="Form menu preview" />
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Pending</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-4 text-muted-foreground")}>
          New styles under review. Use only when{" "}
          <span className="font-medium text-foreground">no Library match</span> exists.
        </p>
        {FORM_MENU_PENDING_ROWS.length === 0 ? (
          <p className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>No styles in this section yet.</p>
        ) : (
          <div className="space-y-8">
            {FORM_MENU_PENDING_ROWS.map((row) => (
              <StyleBlock key={row.id} row={row} showPendingNote />
            ))}
          </div>
        )}
      </section>
    </PepDesignSystemPage>
  )
}
