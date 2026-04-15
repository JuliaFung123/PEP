# Audit template — Import Figma Component (PEP Web Library)

## Canonical Figma scope (default)

Use these unless the user overrides the file or nodes.

| Frame | `nodeId` | Link |
|-------|----------|------|
| **Input without label** | `4628:1212` | https://www.figma.com/design/bRDWHAITfr5p6onqnKTf0q/--PEP-Web_Library?node-id=4628-1212 |
| **Input with label** | `5218:11852` | https://www.figma.com/design/bRDWHAITfr5p6onqnKTf0q/--PEP-Web_Library?node-id=5218-11852 |

- **File / `fileKey`:** `bRDWHAITfr5p6onqnKTf0q`
- **File URL:** https://www.figma.com/design/bRDWHAITfr5p6onqnKTf0q/--PEP-Web_Library

**MCP (`get_figma_data`)**

```json
{ "fileKey": "bRDWHAITfr5p6onqnKTf0q", "nodeId": "4628:1212" }
```

```json
{ "fileKey": "bRDWHAITfr5p6onqnKTf0q", "nodeId": "5218:11852" }
```

**Figma structure to audit (from these frames)**

- **Input Group** — component set **2820:1838** (without-label vs with-label + states).
- **Value Type** cell inside the group — component set **4835:1600**; each Figma **Value Type** → one **`Input` `valueType` CVA** branch in code.

---

## Session metadata

- **Figma file**: `fileKey=bRDWHAITfr5p6onqnKTf0q` (PEP-Web_Library)
- **Scope nodes**: `4628:1212` (Input without label), `5218:11852` (Input with label) — *or list additional `nodeId`s if scope expanded*
- **Codebase root**: …
- **shadcn UI path**: … (e.g. `pep-web/src/components/ui`)
- **Global theme file**: … (e.g. `pep-web/src/index.css`)

## Summary counts

| Tier | Count |
|------|-------|
| 1 Shadcn (Standard) | |
| 2 Global Modified | |
| 3 New CSS (Utility-Override) | |
| 4 Variant (CVA) | |
| 5 New (Custom) | |

## Detailed audit

| # | Parent frame | Figma element | Value Type (if Input field) | Node id | Closest shadcn | Tier | Evidence | Implementation note |
|---|--------------|---------------|-----------------------------|---------|----------------|------|----------|---------------------|
| 1 | 4628:1212 | | | | | | | |
| 2 | 5218:11852 | | | | | | | |

## Input `valueType` inventory (PEP Web Library)

List each Figma **Value Type** appearing under **`4628:1212`** / **`5218:11852`** (or sibling frames) and the planned **`Input` API**:

| Figma Value Type | `Input` API (`valueType` or variant) | Notes (element / composition) |
|------------------|--------------------------------------|-------------------------------|
| Text | `text` | |
| Textarea | `textarea` | |
| Language | `language` | |
| Date | `date` | |
| Time | `time` | |
| Date+time | `date-time` | |
| Select | `select` | |
| Select Avatar | `select-avatar` | |
| Textarea+Language | `textarea-language` | |
| … | … | |

## Preview page checklist (`design-system-preview.tsx`)

- [ ] Sections keyed to canonical frames: **Input without label** (`4628:1212`) vs **Input with label** (`5218:11852`) where useful
- [ ] Tier 1: single default panel per primitive
- [ ] Tier 2: dual panel with scoped baseline vs global theme
- [ ] Tier 3: dual panel standard vs Figma-accurate overrides
- [ ] Tier 4: dual panel base vs CVA variant (include **each** Figma `Value Type` on `Input`)
- [ ] Tier 5: custom component + documentation block
- [ ] Both columns of every dual view render **simultaneously** without global-only toggles
