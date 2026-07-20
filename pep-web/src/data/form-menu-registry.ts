/**
 * Form Menu block registry for `/preview/form-menu` (sidebar: Block → Form Menu).
 *
 * Notes — Figma Form_menu rules.
 * Preview — composed example only (not a library pick).
 * Library — `tier: 'library'`: approved item variants; always pick from here in form layouts.
 * Pending — `tier: 'pending'`: new styles under review.
 *
 * When promoting pending → library: set `tier: 'library'`, clear `pendingNote`.
 */

export type FormMenuTier = "library" | "pending"

export type FormMenuStyleId = "list-item-variants"

export type FormMenuStyleRow = {
  id: FormMenuStyleId
  name: string
  composition: string
  tier: FormMenuTier
  pendingNote?: string
}

/** Catalog rows — filter by `tier` for Library vs Pending. */
export const FORM_MENU_STYLE_ROWS: FormMenuStyleRow[] = [
  {
    id: "list-item-variants",
    name: "1. List item variants",
    composition:
      "One row per variant (Finished+Selected+Required · Required · Parent · Child · Finished+Required)",
    tier: "library",
  },
]

export const FORM_MENU_LIBRARY_ROWS = FORM_MENU_STYLE_ROWS.filter((r) => r.tier === "library")
export const FORM_MENU_PENDING_ROWS = FORM_MENU_STYLE_ROWS.filter((r) => r.tier === "pending")
