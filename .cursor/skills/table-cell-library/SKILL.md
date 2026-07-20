---
name: table-cell-library
description: >-
  Builds and maintains the PEP Table Cell preview page (/preview/table-cell): Notes,
  Library (approved cell compositions), and Pending (review). Uses table-cell-registry.ts
  tiers. Use when implementing table layouts, discovering unseen cell compositions,
  adding Pending cells, or promoting Pending to Library.
---

# Table Cell — cell composition library (PEP Web Library)

## Role

The **Table Cell** page is the **cell composition library** for PEP. Layouts must pick cells from **Library**; **Pending** holds new / unseen compositions under review (same workflow as Field §2 / §3).

## Three sections (required)

1. **Notes** — primitives and rules (`Table` / `TableCell`, nested Avatar, Badge, Checkbox, Button).
2. **Library** — `tier: 'library'` rows in `table-cell-registry.ts`. **Always use these** in table layouts.
3. **Pending** — `tier: 'pending'` rows. Only when no Library match; user promotes to Library.

## When creating a layout with tables

1. Scan Library for an existing cell by behaviour (text, person, badge, numeric, checkbox, actions, …).
2. If the Figma / layout cell is **new** (e.g. cover + title + badge, datetime stack, organizer list):
   - Add `TABLE_CELL_ROWS` entry with `tier: 'pending'` + `pendingNote`.
   - Extend `CellPreview` in `TableCellBlockPage.tsx`.
   - Reuse that composition in the layout page.
3. Never leave a one-off cell only in a layout page without a Pending registry row.

## Code locations

| Area | Path |
|------|------|
| Registry (Library / Pending tiers) | `pep-web/src/data/table-cell-registry.ts` |
| Page | `pep-web/src/pages/TableCellBlockPage.tsx` |
| Layout rule | `.cursor/rules/table-cell-library.mdc` |
| Router / shell | `pep-web/src/App.tsx` (`/preview/table-cell`) |

## Promote Pending → Library

- Set `tier: 'library'`, clear `pendingNote`.
- Ask the user before promoting unless they explicitly requested it.

## Anti-patterns

- Inventing one-off cell markup in layout pages without a registry entry.
- Using Pending cells as “done” library items without promotion.
- New files like `components/table-cell-activity.tsx` — keep previews in `TableCellBlockPage.tsx` until the user escalates.

## Reference

- `.cursor/rules/table-cell-library.mdc` — layout workflow
- `.cursor/rules/field-input-library.mdc` — same Library / Pending pattern for inputs
- `.cursor/rules/figma-design-system.mdc` — tokens and classification
