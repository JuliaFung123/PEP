/** Tailwind font-size utilities — reference for `/preview/typography`. */

export type FontSizeToken = {
  /** Tailwind utility class */
  token: string
  /** Typography library rows that use this size (primary `text-*` only). */
  typographyRefs?: string[]
  note?: string
}

export const FONT_SIZE_TOKENS: FontSizeToken[] = [
  {
    token: 'text-[10px]',
    typographyRefs: ['ID'],
    note: 'PEP only — pair with leading-[12px]',
  },
  { token: 'text-xs', typographyRefs: ['Caption'] },
  { token: 'text-sm', typographyRefs: ['Small', 'Muted', 'Inline code'] },
  {
    token: 'text-base',
    typographyRefs: ['H6', 'Paragraph', 'Blockquote', 'Table', 'List'],
    note: 'Default body size when no text-* is set',
  },
  { token: 'text-lg', typographyRefs: ['H5', 'Large'] },
  { token: 'text-xl', typographyRefs: ['H4', 'Lead'] },
  { token: 'text-2xl', typographyRefs: ['H3'] },
  { token: 'text-3xl', typographyRefs: ['H2'] },
  { token: 'text-4xl', typographyRefs: ['H1'] },
  { token: 'text-5xl', note: 'Tailwind scale — not used in typography library' },
  { token: 'text-6xl', note: 'Tailwind scale — not used in typography library' },
  { token: 'text-7xl', note: 'Tailwind scale — not used in typography library' },
  { token: 'text-8xl', note: 'Tailwind scale — not used in typography library' },
  { token: 'text-9xl', note: 'Tailwind scale — not used in typography library' },
]
