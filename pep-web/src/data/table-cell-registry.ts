/**
 * Table Cell library registry for `/preview/table-cell` (sidebar: Block → Table Cell).
 *
 * Notes — primitives + composition rules on the page.
 * Library — `tier: 'library'`: approved cell compositions; always pick from here in layouts.
 * Pending — `tier: 'pending'`: new styles under review; only when no Library match exists.
 *
 * When promoting pending → library: set `tier: 'library'`, clear `pendingNote`.
 */

export type TableCellTier = "library" | "pending"

export type TableCellId =
  | "checkbox"
  | "text"
  | "numeric"
  | "badge"
  | "person"
  | "person-simple"
  | "row-actions"
  | "thumb"
  | "title-with-id"
  | "title-with-status"
  | "date-range-stack"
  | "datetime-stack"
  | "category-thumb-badges"
  | "status-with-live"
  | "organizer-stack"
  | "tags-wrap"
  | "expand-toggle"
  | "date-weekday"
  | "expanded-detail-location"
  | "expanded-detail-address"
  | "expanded-detail-virtual"

export type TableCellRow = {
  id: TableCellId
  /** Display name in the Table Cell page. */
  name: string
  /** Short composition description (caption). */
  composition: string
  tier: TableCellTier
  /** Shown under Pending for cells awaiting promotion. */
  pendingNote?: string
}

/** All table cell patterns — filter by `tier` for Library vs Pending. */
export const TABLE_CELL_ROWS: TableCellRow[] = [
  // Library (approved for layouts)
  {
    id: "checkbox",
    name: "1. Checkbox",
    composition: "TableCell → Checkbox",
    tier: "library",
  },
  {
    id: "text",
    name: "2. Text",
    composition: "text-sm/medium primary text",
    tier: "library",
  },
  {
    id: "numeric",
    name: "4. Numeric",
    composition: "text-sm/medium text-right tabular-nums",
    tier: "library",
  },
  {
    id: "badge",
    name: "5. Badge",
    composition: "TableCell → Badge",
    tier: "library",
  },
  {
    id: "person",
    name: "6. Person",
    composition: "Avatar + text-sm/medium name + subtitle",
    tier: "library",
  },
  {
    id: "person-simple",
    name: "7. Person (simple)",
    composition: "Avatar + text-sm/medium name only",
    tier: "library",
  },
  {
    id: "row-actions",
    name: "8. Row actions",
    composition: "ghost icon-sm Button (MoreHorizontal)",
    tier: "library",
  },
  {
    id: "thumb",
    name: "9. Thumb",
    composition: "size-16 rounded-md image in TableCell",
    tier: "library",
  },
  {
    id: "title-with-id",
    name: "10. Title + ID",
    composition: "text-sm/medium title (1 line truncate) + outline Badge code",
    tier: "library",
  },
  {
    id: "title-with-status",
    name: "11. Title + status",
    composition: "text-sm/medium title (1 line truncate) + status Badge stack",
    tier: "library",
  },
  {
    id: "date-range-stack",
    name: "12. Date range stack",
    composition: "Two dates with dashed lines + muted `to` between",
    tier: "library",
  },
  {
    id: "datetime-stack",
    name: "13. Datetime stack",
    composition: "text-sm/medium date + muted time stack",
    tier: "library",
  },
  {
    id: "category-thumb-badges",
    name: "14. Category thumb badges",
    composition: "flex-wrap BadgeImage (lg) — Component → Badges",
    tier: "library",
  },
  {
    id: "status-with-live",
    name: "15. Status + live",
    composition: "Badge Light + emerald live dot; shadcn Tooltip “Active”",
    tier: "library",
  },
  {
    id: "organizer-stack",
    name: "16. Organizer stack",
    composition: "Vertical list of Avatar sm + text-sm/medium name",
    tier: "library",
  },
  {
    id: "tags-wrap",
    name: "17. Tags wrap",
    composition: "flex-wrap outline Badges",
    tier: "library",
  },
  {
    id: "expand-toggle",
    name: "18. Expand toggle",
    composition: "ghost icon-xs Button → ChevronDown / ChevronRight; aria-expanded",
    tier: "library",
  },
  {
    id: "date-weekday",
    name: "19. Date + weekday",
    composition: "text-sm/medium date + text-xs muted weekday inline",
    tier: "library",
  },
  {
    id: "expanded-detail-location",
    name: "20. Expanded detail-location",
    composition: "text-sm/medium location name + space name stack (px-4 py-2)",
    tier: "library",
  },
  {
    id: "expanded-detail-address",
    name: "21. Expanded detail-address",
    composition: "text-sm/medium address + text-xs/normal geom stack",
    tier: "library",
  },
  {
    id: "expanded-detail-virtual",
    name: "22. Expanded detail-virtual",
    composition: "text-sm/medium platform + underlined url + phone (text-xs/normal)",
    tier: "library",
  },
]

export const TABLE_CELL_LIBRARY_ROWS = TABLE_CELL_ROWS.filter((r) => r.tier === "library")
export const TABLE_CELL_PENDING_ROWS = TABLE_CELL_ROWS.filter((r) => r.tier === "pending")
