/** Typography library rows — single source for `/preview/typography` and layouts. */

export type TypographySampleTag =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'small'
  | 'code'
  | 'div'

export type TypographySample = {
  id: string
  tag: TypographySampleTag
  label: string
  className: string
  /** Optional multiline snippet for composite shadcn patterns (table, list, …). */
  codeSnippet?: string
  /** CSS selector for font metrics inside the preview (defaults to first child). */
  measureSelector?: string
  /** Closest Material Design 3 type-scale role (approximate mapping). */
  m3Label: string
  children: string
}

const TABLE_SNIPPET = `div.my-6.w-full.overflow-y-auto
table.w-full
tr.m-0.border-t.p-0.even:bg-muted
th.border.px-4.py-2.text-left.font-bold
td.border.px-4.py-2.text-left`

export const THEME_TYPOGRAPHY_SAMPLES: TypographySample[] = [
  {
    id: 'h1',
    tag: 'h1',
    label: 'H1',
    m3Label: 'Display Small',
    className: 'scroll-m-20 text-4xl font-extrabold tracking-tight text-balance',
    children: 'Taxing Laughter: The Joke Tax Chronicles',
  },
  {
    id: 'h2',
    tag: 'h2',
    label: 'H2',
    m3Label: 'Headline Large',
    className: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
    children: 'The People of the Kingdom',
  },
  {
    id: 'h3',
    tag: 'h3',
    label: 'H3',
    m3Label: 'Headline Small',
    className: 'scroll-m-20 text-2xl font-semibold tracking-tight',
    children: 'The Joke Tax',
  },
  {
    id: 'h4',
    tag: 'h4',
    label: 'H4',
    m3Label: 'Title Large',
    className: 'scroll-m-20 text-xl font-semibold tracking-tight',
    children: 'People stopped telling jokes',
  },
  {
    id: 'h5',
    tag: 'h5',
    label: 'H5',
    m3Label: 'Title Large',
    className: 'scroll-m-20 text-lg font-semibold tracking-tight',
    children: 'Heading 5',
  },
  {
    id: 'h6',
    tag: 'h6',
    label: 'H6',
    m3Label: 'Title Medium',
    className: 'scroll-m-20 text-base font-semibold tracking-tight',
    children: 'Heading 6',
  },
  {
    id: 'paragraph',
    tag: 'p',
    label: 'Paragraph',
    m3Label: 'Body Large',
    className: 'leading-7 [&:not(:first-child)]:mt-6',
    children:
      'The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.',
  },
  {
    id: 'blockquote',
    tag: 'p',
    label: 'Blockquote',
    m3Label: 'Body Large',
    className: 'mt-6 border-l-2 pl-6 italic',
    measureSelector: 'blockquote',
    children: '',
  },
  {
    id: 'table',
    tag: 'div',
    label: 'Table',
    m3Label: 'Body Large',
    className: 'w-full',
    codeSnippet: TABLE_SNIPPET,
    measureSelector: 'td',
    children: '',
  },
  {
    id: 'list',
    tag: 'div',
    label: 'List',
    m3Label: 'Body Large',
    className: 'my-6 ml-6 list-disc [&>li]:mt-2',
    measureSelector: 'li',
    children: '',
  },
  {
    id: 'inline-code',
    tag: 'code',
    label: 'Inline code',
    m3Label: 'Label Large',
    className:
      'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
    children: '@radix-ui/react-alert-dialog',
  },
  {
    id: 'lead',
    tag: 'p',
    label: 'Lead',
    m3Label: 'Title Large',
    className: 'text-xl text-muted-foreground',
    children: '',
  },
  {
    id: 'large',
    tag: 'div',
    label: 'Large',
    m3Label: 'Title Large',
    className: 'text-lg font-semibold',
    children: 'Are you absolutely sure?',
  },
  {
    id: 'small',
    tag: 'small',
    label: 'Small',
    m3Label: 'Label Large',
    className: 'text-sm leading-none font-medium',
    children: 'Email address',
  },
  {
    id: 'muted',
    tag: 'p',
    label: 'Muted',
    m3Label: 'Body Medium',
    className: 'text-sm text-muted-foreground',
    children: 'Enter your email address.',
  },
  {
    id: 'caption',
    tag: 'p',
    label: 'Caption',
    m3Label: 'Label Medium',
    className: 'text-xs text-muted-foreground',
    children: 'Caption supporting text for secondary lines.',
  },
  {
    id: 'id',
    tag: 'p',
    label: 'ID',
    m3Label: 'Label Small',
    className: 'text-[10px] leading-[12px] text-muted-foreground tabular-nums',
    children: '12345678',
  },
]

export function typographyClassName(id: TypographySample['id']): string {
  const sample = THEME_TYPOGRAPHY_SAMPLES.find((row) => row.id === id)
  if (!sample) {
    throw new Error(`Unknown typography sample: ${id}`)
  }
  return sample.className
}

/** Avatar + name label — Typography → Small */
export const AVATAR_NAME_TYPOGRAPHY_ID = 'small' as const satisfies TypographySample['id']

/** Avatar + name subtitle — Typography → Caption */
export const AVATAR_NAME_SUBTITLE_TYPOGRAPHY_ID = 'caption' as const satisfies TypographySample['id']

/** Avatar + name ID (lg only) — Typography → ID */
export const AVATAR_NAME_ID_TYPOGRAPHY_ID = 'id' as const satisfies TypographySample['id']
