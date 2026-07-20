/**
 * PEP typography tokens — Figma-aligned `text-{size}/{weight}` (size + weight only).
 * Color and layout chrome are applied at the call site.
 *
 * @example
 * cn(typeToken("text-2xl/medium"), "text-foreground")
 * cn(typeToken("text-sm/medium"), "text-muted-foreground")
 *
 * @see Figma *(PEP)Web_Library styles/text/text-* and text-2xl/medium on header/Page
 */

export const TYPE_SIZES = [
  "xs",
  "sm",
  "base",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
] as const

export const TYPE_WEIGHTS = [
  "thin",
  "extralight",
  "light",
  "normal",
  "medium",
  "semibold",
  "bold",
  "extrabold",
  "black",
] as const

export type TypeSize = (typeof TYPE_SIZES)[number]
export type TypeWeight = (typeof TYPE_WEIGHTS)[number]

/** Standard tokens: `text-sm/medium`. Special: `text-10/normal` (10px / 12px ID). */
export type TypeTokenId = `text-${TypeSize}/${TypeWeight}` | "text-10/normal"

const SIZE_CLASS: Record<TypeSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
}

const WEIGHT_CLASS: Record<TypeWeight, string> = {
  thin: "font-thin",
  extralight: "font-extralight",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black",
}

/**
 * Figma-specified line-height overrides (Tailwind default otherwise).
 * `text-2xl/medium` → leading-8 (24/32) from header/Page.
 */
const LEADING_OVERRIDE: Partial<Record<TypeTokenId, string>> = {
  "text-2xl/medium": "leading-8",
  "text-10/normal": "leading-[12px] tabular-nums",
}

export type TypeToken = {
  id: TypeTokenId
  size: TypeSize | "10"
  weight: TypeWeight
  /** Colorless utility classes — size + weight (+ optional leading). */
  className: string
  /** Figma style path when known. */
  figma?: string
}

function buildToken(size: TypeSize, weight: TypeWeight): TypeToken {
  const id = `text-${size}/${weight}` as TypeTokenId
  const leading = LEADING_OVERRIDE[id]
  return {
    id,
    size,
    weight,
    className: [SIZE_CLASS[size], WEIGHT_CLASS[weight], leading].filter(Boolean).join(" "),
    figma: `text/${id}`,
  }
}

/** Full size × weight matrix used in the typography library. */
export const TYPE_TOKENS: TypeToken[] = [
  ...TYPE_SIZES.flatMap((size) => TYPE_WEIGHTS.map((weight) => buildToken(size, weight))),
  {
    id: "text-10/normal",
    size: "10",
    weight: "normal",
    className: "text-[10px] font-normal leading-[12px] tabular-nums",
    figma: "text/text-10/normal (PEP ID)",
  },
]

const TOKEN_BY_ID = Object.fromEntries(TYPE_TOKENS.map((t) => [t.id, t])) as Record<
  TypeTokenId,
  TypeToken
>

/** Resolve a Figma-style `text-{size}/{weight}` token to Tailwind classes (no color). */
export function typeToken(id: TypeTokenId): string {
  const token = TOKEN_BY_ID[id]
  if (!token) {
    throw new Error(`Unknown type token: ${id}`)
  }
  return token.className
}

/** Tokens grouped by size for the typography library UI. */
export function typeTokensBySize(): { size: TypeSize | "10"; tokens: TypeToken[] }[] {
  const sizes: Array<TypeSize | "10"> = [...TYPE_SIZES, "10"]
  return sizes.map((size) => ({
    size,
    tokens: TYPE_TOKENS.filter((t) => t.size === size),
  }))
}

/** Mixed-script demo string for library previews. */
export const TYPE_DEMO_MIXED =
  "Hello 你好 · Activity 活动 活動 · Settings 設定 123"

/**
 * Legacy shadcn-composition ids → size/weight tokens (compat for existing call sites).
 * Prefer `typeToken("text-sm/medium")` going forward.
 */
const LEGACY_TYPE_MAP = {
  small: "text-sm/medium",
  caption: "text-xs/normal",
  id: "text-10/normal",
  muted: "text-sm/normal",
  large: "text-lg/semibold",
  lead: "text-xl/normal",
  paragraph: "text-base/normal",
  table: "text-base/normal",
  h1: "text-4xl/extrabold",
  h2: "text-3xl/semibold",
  h3: "text-2xl/semibold",
  h4: "text-xl/semibold",
  h5: "text-lg/semibold",
  h6: "text-base/semibold",
} as const satisfies Record<string, TypeTokenId>

export type LegacyTypographyId = keyof typeof LEGACY_TYPE_MAP

/** @deprecated Prefer `typeToken("text-sm/medium")`. Maps old composition ids. */
export function typographyClassName(id: LegacyTypographyId | string): string {
  const mapped = LEGACY_TYPE_MAP[id as LegacyTypographyId]
  if (mapped) return typeToken(mapped)
  if (id in TOKEN_BY_ID) return typeToken(id as TypeTokenId)
  throw new Error(`Unknown typography sample: ${id}`)
}

export const AVATAR_NAME_TYPOGRAPHY_ID = "small" as const satisfies LegacyTypographyId
export const AVATAR_NAME_SUBTITLE_TYPOGRAPHY_ID = "caption" as const satisfies LegacyTypographyId
export const AVATAR_NAME_ID_TYPOGRAPHY_ID = "id" as const satisfies LegacyTypographyId
