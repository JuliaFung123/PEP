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
  | 'multi-image'
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
    property: 'Disabled',
    shadcn: 'opacity-50 on control',
    pep: 'opacity-50 (same as Checkbox / Radio)',
    programmerNote:
      'Native disabled + inputSurfaceDisabledClassName use opacity-50 only — no bg-input fill. Field chrome (label / descriptions) also opacity-50 via data-disabled on Field.',
  },
  {
    property: 'Invalid / error ring',
    shadcn: 'aria-invalid on each control',
    pep: 'One shell owns the ring',
    programmerNote:
      'Put aria-invalid (or forced invalid class) only on the chrome owner. Nested Input/Button inside a composed surface use inputInnerControlClassName — never fan out rings to children. Field-group rows: each box is a LibraryFieldGroupItem with its own FieldError + invalid ring (no shared wrapper ring).',
  },
  {
    property: 'Field wrapper',
    shadcn: 'Field, FieldLabel, FieldError',
    pep: 'Same primitives',
    programmerNote:
      'Invalid state: data-invalid on Field + aria-invalid on the surface owner. FieldSet legend turns red when any LibraryFieldGroupItem has an error; errors live under each box, not at FieldSet level.',
  },
  {
    property: 'Shared chrome',
    shadcn: 'Classes inline on Input',
    pep: 'inputSurfaceClassName export',
    programmerNote:
      'Import from @/lib/input-surface-classes. Compositions: surface + inputInnerControlClassName; multi-box rows: one invalid paint per box.',
  },
  {
    property: 'Image-S / Image-L',
    shadcn: 'Single upload control',
    pep: 'Multi grid: leading blank tile + ImageFile tiles',
    programmerNote:
      'Figma 封面 (204:6703): leading dashed tile opens file browser (+ / or / library); filled tiles same size; drag handle reorders. Image-S 100×100; Image-L 160×160.',
  },
  {
    property: 'Multi / Multi Image / Multi Avatar',
    shadcn: 'Combobox / custom listbox',
    pep: 'Shared field-multi-selects + DropdownMenuCheckboxItem',
    programmerNote:
      'Compose from @/components/field-multi-selects. Same controls on Field page and Dropdown Menu library. Multi=Light badges; Multi Image=BadgeImage; Multi Avatar=BadgeAvatar outline.',
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
  { id: 'multi-image', figmaName: 'Multi Image', tier: 'library', section: 'field' },
  { id: 'multi-avatar', figmaName: 'Multi Avatar', tier: 'library', section: 'field' },
  { id: 'currency', figmaName: 'Currency', tier: 'library', section: 'field' },
  { id: 'phone', figmaName: 'Phone', tier: 'library', section: 'field' },
  { id: 'file', figmaName: 'file', tier: 'library', section: 'field' },
  { id: 'language', figmaName: 'Language', tier: 'library', section: 'field' },
  { id: 'textarea-language', figmaName: 'Textarea+Language', tier: 'library', section: 'field' },
  { id: 'select-avatar', figmaName: 'Select Avatar', tier: 'library', section: 'field' },
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
