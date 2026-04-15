---
name: input-type-figma-preview
description: >-
  Builds and maintains the PEP "Input Type" preview page: all Figma Value Types as
  rows, global label toggle, simulated interaction states, shadcn-only composition
  with Tailwind/CSS (no duplicate component files), manifest of primitives and
  styling notes, and links from the design-system preview. Use when implementing
  or updating Input Type preview, Figma Value Type matrix, input shells with
  Button/Badge/Switch, or routing to /preview/input-type.
---

# Input Type — Figma preview (PEP Web Library)

## Role

Implement **one** preview surface (**Input Type**) that lists every **Value Type** from Figma (PEP Web Library, component set **4835:1600**) as **rows**, using **existing** `components/ui/*` primitives plus **Tailwind** and minimal **CSS-variable** tokens. **Do not** add parallel components (e.g. `InputDate.tsx`) unless the user explicitly escalates to Tier 5 / custom primitive.

## Canonical Figma

- **Input without label:** `4628:1212` — https://www.figma.com/design/bRDWHAITfr5p6onqnKTf0q/--PEP-Web_Library?node-id=4628-1212  
- **Input with label:** `5218:11852` — https://www.figma.com/design/bRDWHAITfr5p6onqnKTf0q/--PEP-Web_Library?node-id=5218-11852  
- **`fileKey`:** `bRDWHAITfr5p6onqnKTf0q`

## Page requirements

1. **Title:** `Input Type` (preview header).
2. **Rows:** Left column = **Figma Value Type** name (exact string from Figma, e.g. `Text`, `Date+time`, `checkbox-col`).
3. **Global toggle (top):** **With label** vs **Without label** for **all** rows — use shadcn **`Switch`** + text; with-label shows **Label Text** + **Help Text** above each field (same copy as Figma defaults).
4. **Global interaction (top):** One control set that drives **every** row simultaneously:
   - Enabled (empty)  
   - Hover (empty) — simulate with utilities (e.g. `shadow-elevation-md`), not a second tab  
   - Focused (empty) — simulate with `ring-3` / `border-ring`  
   - Enabled (filled) — read-only sample values  
   - Hover (filled)  
   - Focused (filled)  
   - Disabled (empty) — `disabled` + opacity where needed  
5. **Implementation rule:** Compose **`Input`**, **`Button`**, **`Badge`**, **`Switch`**, **`Card`**, native `<textarea>` only when it shares **`inputSurfaceClassName`** from `lib/input-surface-classes.ts` (no new wrapper component file). Prefer **outline `Button` + `inputSurfaceClassName`** for select-like shells.
6. **Manifest (bottom):** Table listing each **shadcn** primitive used, import path, and **what was styled** (page-only Tailwind vs `index.css` tokens vs export from `input.tsx`).
7. **Navigation:** Link **Input Type** from **`DesignSystemPage`** (`Input Type` → `/preview/input-type`); sub-nav bar shows **Input Type** next to Theme / Design system.

## Code locations (`pep-web`)

| Area | Path |
|------|------|
| Page | `pep-web/src/pages/InputTypePage.tsx` |
| Router / shell | `pep-web/src/App.tsx` (`/preview/input-type`) |
| Design system links | `pep-web/src/pages/design-system.tsx` |
| Shared field chrome | `pep-web/src/lib/input-surface-classes.ts` → `inputSurfaceClassName` |

## Anti-patterns

- New files like `components/input-select.tsx` for Figma parity — **avoid**; keep compositions in **`InputTypePage.tsx`**.
- Toggling global `:root` to compare themes on this page — use **scoped** wrappers if needed (see **import-figma-component** skill).
- Hardcoding one-off hex colors — use **semantic** Tailwind (`border-input`, `text-muted-foreground`, `shadow-elevation-*`).

## Reference

Pair with **import-figma-component** (`.cursor/skills/import-figma-component/SKILL.md`) for tiering and MCP audit workflow.
