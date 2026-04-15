/**
 * WCAG 2.1 relative luminance for sRGB (0–1).
 * @see https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
export function relativeLuminanceFromSrgb255(r255: number, g255: number, b255: number): number {
  const linearize = (c: number) => {
    const s = Math.max(0, Math.min(255, c)) / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }
  const R = linearize(r255)
  const G = linearize(g255)
  const B = linearize(b255)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

/** HSL (h 0–360, s/l 0–100) → sRGB 0–255 */
export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const hh = h / 360
  const ss = s / 100
  const ll = l / 100
  let r: number
  let g: number
  let b: number
  if (ss === 0) {
    r = g = b = ll
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      let tt = t
      if (tt < 0) tt += 1
      if (tt > 1) tt -= 1
      if (tt < 1 / 6) return p + (q - p) * 6 * tt
      if (tt < 1 / 2) return q
      if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6
      return p
    }
    const q = ll < 0.5 ? ll * (1 + ss) : ll + ss - ll * ss
    const p = 2 * ll - q
    r = hue2rgb(p, q, hh + 1 / 3)
    g = hue2rgb(p, q, hh)
    b = hue2rgb(p, q, hh - 1 / 3)
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

/** Relative luminance from HSL surface color (same pipeline as browser `hsl()`). */
export function relativeLuminanceFromHsl(h: number, s: number, l: number): number {
  const [r, g, b] = hslToRgb(h, s, l)
  return relativeLuminanceFromSrgb255(r, g, b)
}

const DEFAULT_LUM_THRESHOLD = 0.6

/** Off-white on dark surfaces — a bit stronger than muted, still not pure #fff. */
const FG_ON_DARK = 'oklch(0.97 0.004 0)'

/** Dark text on light fills — stronger than soft gray, not as harsh as near-black. */
const FG_ON_LIGHT = 'oklch(0.30 0.008 0)'

/** On very bright / near-white surfaces — slightly stronger than the soft tier. */
const FG_ON_BRIGHT = 'oklch(0.38 0.01 0)'

const VERY_BRIGHT_LUM = 0.92

/**
 * Picks on-surface foreground from WCAG relative luminance (not HSL L).
 * Balanced contrast: readable gray on light fills (darker on near-white),
 * and bright off-white on dark fills — stronger than the soft preset, still not pure black/white.
 */
export function accessibleForegroundCssForHslBackground(
  h: number,
  s: number,
  l: number,
  options?: { luminanceThreshold?: number },
): string {
  const threshold = options?.luminanceThreshold ?? DEFAULT_LUM_THRESHOLD
  const lum = relativeLuminanceFromHsl(h, s, l)
  if (lum <= threshold) {
    return FG_ON_DARK
  }
  if (lum > VERY_BRIGHT_LUM) {
    return FG_ON_BRIGHT
  }
  return FG_ON_LIGHT
}

export function applyHslSurfaceWithAutoForeground(
  fillVar: string,
  foregroundVar: string,
  h: number,
  s: number,
  l: number,
  options?: { luminanceThreshold?: number },
) {
  const root = document.documentElement
  root.style.setProperty(fillVar, `hsl(${h} ${s}% ${l}%)`)
  root.style.setProperty(foregroundVar, accessibleForegroundCssForHslBackground(h, s, l, options))
}
