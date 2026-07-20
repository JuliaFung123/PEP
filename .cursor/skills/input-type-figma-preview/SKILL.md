---
name: input-type-figma-preview
description: >-
  Builds and maintains the PEP Field preview page (/preview/input-type): §1 shadcn-vs-PEP
  programmer notes table, §2 approved input library, §3 pending new inputs, Figma Value Type
  matrix rows, interaction states, shadcn-only composition with inputSurfaceClassName, and
  field-input-registry.ts tiers. Use when implementing layouts with inputs, Field page updates,
  or promoting pending inputs to the library.
---

# Field — input library preview (PEP Web Library)

## Role

The **Field** page is the **input library** for PEP. Layouts must pick inputs from **§2**; §1 documents framework differences; §3 holds prototypes under review.

## Three sections (required)

1. **§1 Framework differences** — table (`FIELD_FRAMEWORK_DIFFERENCES`): shadcn vs PEP for programmers. Describes §2 library behaviour.
2. **§2 Input library** — `tier: 'library'` rows in `field-input-registry.ts`. **Always use these** in layouts.
3. **§3 New inputs (pending review)** — `tier: 'pending'` rows. Only when no §2 match; review before shipping. Promoting to §2 → update registry + §1 if new overrides appear.

## Canonical Figma

- **Input without label:** `4628:1212` — https://www.figma.com/design/bRDWHAITfr5p6onqnKTf0q/--PEP-Web_Library?node-id=4628-1212  
- **Input with label:** `5218:11852` — https://www.figma.com/design/bRDWHAITfr5p6onqnKTf0q/--PEP-Web_Library?node-id=5218-11852  
- **Field matrix:** `2823:2009`
- **`fileKey`:** `bRDWHAITfr5p6onqnKTf0q`

## Code locations

| Area | Path |
|------|------|
| Registry (§1 notes + §2/§3 tiers) | `pep-web/src/data/field-input-registry.ts` |
| Page | `pep-web/src/pages/InputTypePage.tsx` |
| Labeled field shell | `pep-web/src/components/library-field.tsx` (`LibraryField`, `LibraryFieldSet`) |
| Layout rule | `.cursor/rules/field-input-library.mdc` |
| Router / shell | `pep-web/src/App.tsx` (`/preview/input-type`) |
| Shared field chrome | `pep-web/src/lib/input-surface-classes.ts` (`inputSurfaceClassName`, `inputInnerControlClassName`, invalid helpers) |

## Implementation rules

- Compose **`Input`**, **`Button`**, **`Badge`**, **`Field`**, **`Calendar`**, **`Popover`** — no duplicate component files unless user escalates.
- Select-like shells: **`Button variant="outline"` + `inputSurfaceClassName`**.
- Interaction preview columns: Empty / Filled / Disable per row.
- Promote §3 → §2: change `tier`, update `FIELD_FRAMEWORK_DIFFERENCES` when needed.

## Anti-patterns

- Inventing one-off field chrome / `gap-*` overrides in layout pages instead of `LibraryField` + a §2 row.
- Using §3 pending inputs in shipped layouts without promotion.
- New files like `components/input-select.tsx` — keep compositions in `InputTypePage.tsx` until promoted.

## Reference

- `.cursor/rules/field-input-library.mdc` — layout workflow
- `.cursor/rules/figma-design-system.mdc` — tokens and classification
