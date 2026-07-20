/**
 * Dropdown Menu library registry for `/preview/dropdown-menu`.
 *
 * Notes — shadcn Dropdown Menu + Figma Menu Item styles.
 * Library — `tier: 'library'`: approved list-item / field compositions; pick from here.
 * Pending — `tier: 'pending'`: new styles under review.
 *
 * Figma Menu Item (`2740:597`): Text | LeadingCheck | TrailingCheck | Icon | Icon+TrailingCheck
 * (each with Select Yes/No). Add new compositions as registry rows + a StylePreview case.
 *
 * When promoting pending → library: set `tier: 'library'`, clear `pendingNote`.
 */

export type DropdownMenuTier = "library" | "pending"

/** Catalog section — keep menu rows separate from Field Multi shells. */
export type DropdownMenuSection = "menu-item" | "field-composition"

export type DropdownMenuStyleId =
  | "text"
  | "leading-check"
  | "trailing-check"
  | "icon"
  | "icon-trailing-check"
  | "radio"
  | "sub-trigger"
  | "field-multi"
  | "field-multi-image"
  | "field-multi-avatar"

export type DropdownMenuStyleRow = {
  id: DropdownMenuStyleId
  /** Display name, e.g. "1. Text" — match Figma style name when possible. */
  name: string
  /** Primitive / composition recipe for programmers. */
  composition: string
  section: DropdownMenuSection
  tier: DropdownMenuTier
  figmaStyle?: string
  pendingNote?: string
}

/** Catalog rows — filter by `tier` for Library vs Pending. */
export const DROPDOWN_MENU_STYLE_ROWS: DropdownMenuStyleRow[] = [
  {
    id: "text",
    name: "1. Text",
    composition: "DropdownMenuItem · optional Shortcut / Subtext · SubTrigger arrow",
    section: "menu-item",
    tier: "library",
    figmaStyle: "Text",
  },
  {
    id: "leading-check",
    name: "2. LeadingCheck",
    composition: "DropdownMenuItem + leading CheckIcon (selected) or size-4 spacer",
    section: "menu-item",
    tier: "library",
    figmaStyle: "LeadingCheck",
  },
  {
    id: "trailing-check",
    name: "3. TrailingCheck",
    composition: "DropdownMenuCheckboxItem (indicator end)",
    section: "menu-item",
    tier: "library",
    figmaStyle: "TrailingCheck",
  },
  {
    id: "icon",
    name: "4. Icon",
    composition: "DropdownMenuItem + leading lucide icon",
    section: "menu-item",
    tier: "library",
    figmaStyle: "Icon",
  },
  {
    id: "icon-trailing-check",
    name: "5. Icon+TrailingCheck",
    composition: "DropdownMenuCheckboxItem + leading lucide icon",
    section: "menu-item",
    tier: "library",
    figmaStyle: "Icon+TrailingCheck",
  },
  {
    id: "radio",
    name: "6. Radio",
    composition: "DropdownMenuRadioGroup + DropdownMenuRadioItem",
    section: "menu-item",
    tier: "library",
  },
  {
    id: "sub-trigger",
    name: "7. SubTrigger",
    composition: "DropdownMenuSubTrigger → DropdownMenuSubContent",
    section: "menu-item",
    tier: "library",
  },
  {
    id: "field-multi",
    name: "8. Multi (Field)",
    composition: "LibraryField + FieldMultiSelect (Field §2 Multi)",
    section: "field-composition",
    tier: "library",
  },
  {
    id: "field-multi-image",
    name: "9. Multi Image (Field)",
    composition: "LibraryField + FieldMultiImageSelect (Field §2 Multi Image)",
    section: "field-composition",
    tier: "library",
  },
  {
    id: "field-multi-avatar",
    name: "10. Multi Avatar (Field)",
    composition: "LibraryField + FieldMultiAvatarSelect (Field §2 Multi Avatar)",
    section: "field-composition",
    tier: "library",
  },
]

export const DROPDOWN_MENU_LIBRARY_ROWS = DROPDOWN_MENU_STYLE_ROWS.filter(
  (r) => r.tier === "library",
)
export const DROPDOWN_MENU_PENDING_ROWS = DROPDOWN_MENU_STYLE_ROWS.filter(
  (r) => r.tier === "pending",
)

export const DROPDOWN_MENU_LIBRARY_ITEM_ROWS = DROPDOWN_MENU_LIBRARY_ROWS.filter(
  (r) => r.section === "menu-item",
)
export const DROPDOWN_MENU_LIBRARY_FIELD_ROWS = DROPDOWN_MENU_LIBRARY_ROWS.filter(
  (r) => r.section === "field-composition",
)
