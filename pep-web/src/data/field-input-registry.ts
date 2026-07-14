/**
 * Field / input library registry for `/preview/input-type` (sidebar: Field).
 *
 * §1 — `FIELD_FRAMEWORK_DIFFERENCES`: programmer notes (shadcn vs PEP).
 * §2 — rows with `tier: 'library'`: approved inputs; always pick from here in layouts.
 * §3 — rows with `tier: 'pending'`: new styles under review; only when no §2 match exists.
 *
 * When promoting pending → library: move the row to `tier: 'library'` and add any new
 * framework-diff rows to `FIELD_FRAMEWORK_DIFFERENCES` if the promotion introduces new PEP overrides.
 */

export type FieldInputTier = 'library' | 'pending'

export type FieldInputSection = 'field' | 'field-group'

export type FieldInputId =
  | 'text'
  | 'language'
  | 'textarea-language'
  | 'textarea'
  | 'date'
  | 'date-picker-range'
  | 'time'
  | 'select'
  | 'select-avatar'
  | 'multi'
  | 'multi-avatar'
  | 'avatar-group'
  | 'currency'
  | 'phone'
  | 'custom'
  | 'file'
  | 'file-large'
  | 'image-l'
  | 'image-s'
  | 'date-time'
  | 'date-range'
  | 'datetime-range'

export type FieldFrameworkDifference = {
  property: string
  shadcn: string
  pep: string
  programmerNote: string
}

/** §1 — shadcn (framework) vs PEP overrides. Describes §2 library behaviour. */
export const FIELD_FRAMEWORK_DIFFERENCES: FieldFrameworkDifference[] = [
  {
    property: 'Background',
    shadcn: 'bg-transparent',
    pep: 'bg-background',
    programmerNote: 'Inputs sit on filled surfaces; matches PEP admin chrome.',
  },
  {
    property: 'Hover',
    shadcn: 'No shadow change',
    pep: 'shadow-elevation-md',
    programmerNote: 'Apply hover:shadow-elevation-md on input shells and select triggers.',
  },
  {
    property: 'Focus',
    shadcn: 'focus-visible ring',
    pep: 'focus + focus-visible ring; shadow removed',
    programmerNote: 'Use focus: (not only focus-visible:) so mouse click shows the ring.',
  },
  {
    property: 'Select shells',
    shadcn: 'Select / Combobox primitives',
    pep: 'Button outline + inputSurfaceClassName',
    programmerNote: 'Compose in-page; see §2 Select / Multi rows. No separate Select component file.',
  },
  {
    property: 'Field wrapper',
    shadcn: 'Field, FieldLabel, FieldError',
    pep: 'Same primitives',
    programmerNote: 'Invalid state: data-invalid on Field + aria-invalid on control.',
  },
  {
    property: 'Shared chrome',
    shadcn: 'Classes inline on Input',
    pep: 'inputSurfaceClassName export',
    programmerNote: 'Import from @/lib/input-surface-classes for Input, textarea, and trigger shells.',
  },
]

export type FieldInputRow = {
  id: FieldInputId
  figmaName: string
  tier: FieldInputTier
  section: FieldInputSection
  /** Shown in §3 for inputs awaiting promotion to §2. */
  pendingNote?: string
}

/** All field value types — filter by `tier` for §2 vs §3. */
export const FIELD_INPUT_ROWS: FieldInputRow[] = [
  // §2 — Input library (approved for layouts)
  { id: 'text', figmaName: 'Text', tier: 'library', section: 'field' },
  { id: 'textarea', figmaName: 'Textarea', tier: 'library', section: 'field' },
  { id: 'date', figmaName: 'Date', tier: 'library', section: 'field' },
  { id: 'date-picker-range', figmaName: 'Date Range', tier: 'library', section: 'field' },
  { id: 'time', figmaName: 'Time', tier: 'library', section: 'field' },
  { id: 'select', figmaName: 'Select', tier: 'library', section: 'field' },
  { id: 'multi', figmaName: 'Multi', tier: 'library', section: 'field' },
  { id: 'currency', figmaName: 'Currency', tier: 'library', section: 'field' },
  { id: 'phone', figmaName: 'Phone', tier: 'library', section: 'field' },
  { id: 'file', figmaName: 'file', tier: 'library', section: 'field' },
  { id: 'language', figmaName: 'Language', tier: 'library', section: 'field' },
  { id: 'textarea-language', figmaName: 'Textarea+Language', tier: 'library', section: 'field' },
  { id: 'select-avatar', figmaName: 'Select Avatar', tier: 'library', section: 'field' },
  { id: 'multi-avatar', figmaName: 'Multi Avatar', tier: 'library', section: 'field' },
  { id: 'avatar-group', figmaName: 'Avatar Group', tier: 'library', section: 'field' },
  { id: 'file-large', figmaName: 'file Large', tier: 'library', section: 'field' },
  { id: 'image-l', figmaName: 'Image-L', tier: 'library', section: 'field' },
  { id: 'image-s', figmaName: 'Image-S', tier: 'library', section: 'field' },
  { id: 'date-time', figmaName: 'Date+time', tier: 'library', section: 'field-group' },
  { id: 'date-range', figmaName: 'DateRange (2 fields)', tier: 'library', section: 'field-group' },
  { id: 'datetime-range', figmaName: 'DatetimeRange', tier: 'library', section: 'field-group' },
  // §3 — New inputs (pending review)
  {
    id: 'custom',
    figmaName: 'Custom',
    tier: 'pending',
    section: 'field',
    pendingNote: 'Ad-hoc slot composition; define pattern before library promotion.',
  },
]

export const FIELD_LIBRARY_ROWS = FIELD_INPUT_ROWS.filter((r) => r.tier === 'library')
export const FIELD_PENDING_ROWS = FIELD_INPUT_ROWS.filter((r) => r.tier === 'pending')

export const FIELD_INPUT_SECTIONS: { title: string; section: FieldInputSection }[] = [
  { title: 'Field', section: 'field' },
  { title: 'Field Group', section: 'field-group' },
]
