import * as React from 'react'
import { RotateCcw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { accessibleForegroundCssForHslBackground, hslToRgb, relativeLuminanceFromHsl } from '@/lib/accessible-foreground'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'pep.theme-semantic-hsl'
const LEGACY_STORAGE_KEY = 'pep.theme-primary-hsl'
const STYLE_ID = 'pep-theme-customizer-overrides'

type ThemeMode = 'light' | 'dark'

type Slot = 'primary' | 'secondary' | 'accent'

type Hsl = { h: number; s: number; l: number }

type StoredShape = Partial<Record<Slot, Hsl>>

type DualStored = {
  light?: StoredShape
  dark?: StoredShape
}

const SLOTS: {
  slot: Slot
  title: string
  cssVar: `--${string}`
  tailwindClass: string
  fgVar: `--${string}`
  fgLabel: string
}[] = [
  {
    slot: 'primary',
    title: 'Primary',
    cssVar: '--primary',
    tailwindClass: 'bg-primary',
    fgVar: '--primary-foreground',
    fgLabel: 'Primary foreground',
  },
  {
    slot: 'secondary',
    title: 'Secondary',
    cssVar: '--secondary',
    tailwindClass: 'bg-secondary',
    fgVar: '--secondary-foreground',
    fgLabel: 'Secondary foreground',
  },
  {
    slot: 'accent',
    title: 'Accent',
    cssVar: '--accent',
    tailwindClass: 'bg-accent',
    fgVar: '--accent-foreground',
    fgLabel: 'Accent foreground',
  },
]

function parseRgbToHsl(rgb: string): Hsl | null {
  const m = rgb.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i)
  if (!m) return null
  const r = Number(m[1]) / 255
  const g = Number(m[2]) / 255
  const b = Number(m[3]) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0
  let s = 0
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      default:
        h = ((r - g) / d + 4) / 6
        break
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    '#' +
    [r, g, b]
      .map((x) => {
        const h = Math.max(0, Math.min(255, x)).toString(16)
        return h.length === 1 ? `0${h}` : h
      })
      .join('')
  )
}

function hslToHex(h: number, s: number, l: number) {
  const [r, g, b] = hslToRgb(h, s, l)
  return rgbToHex(r, g, b)
}

function hexToHsl(hex: string): Hsl {
  const n = hex.replace('#', '')
  if (n.length !== 6) return { h: 0, s: 0, l: 0 }
  const v = Number.parseInt(n, 16)
  const r = ((v >> 16) & 255) / 255
  const g = ((v >> 8) & 255) / 255
  const b = (v & 255) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const ll = (max + min) / 2
  let h = 0
  let s = 0
  if (max !== min) {
    const d = max - min
    s = ll > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      default:
        h = ((r - g) / d + 4) / 6
        break
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(ll * 100),
  }
}

function readHslFromCssVar(cssVar: `--${string}`): Hsl {
  const el = document.createElement('div')
  el.style.cssText = `position:absolute;left:-9999px;top:0;background-color:var(${cssVar})`
  document.body.appendChild(el)
  const rgb = getComputedStyle(el).backgroundColor
  document.body.removeChild(el)
  return parseRgbToHsl(rgb) ?? { h: 0, s: 0, l: 0 }
}

/** Read resolved token as if the page were in `mode` (brief class toggle). */
function readHslForMode(cssVar: `--${string}`, mode: ThemeMode): Hsl {
  const root = document.documentElement
  const hadDark = root.classList.contains('dark')
  try {
    root.classList.toggle('dark', mode === 'dark')
    return readHslFromCssVar(cssVar)
  } finally {
    root.classList.toggle('dark', hadDark)
  }
}

function isLegacyFlatShape(o: object): o is StoredShape {
  return 'primary' in o || 'secondary' in o || 'accent' in o
}

function loadStoredDual(): DualStored {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const j = JSON.parse(raw) as unknown
      if (j && typeof j === 'object') {
        if ('light' in j || 'dark' in j) {
          const d = j as DualStored
          return {
            light: d.light && typeof d.light === 'object' ? d.light : undefined,
            dark: d.dark && typeof d.dark === 'object' ? d.dark : undefined,
          }
        }
        if (isLegacyFlatShape(j)) {
          return { light: j }
        }
      }
    }
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY)
    if (legacy) {
      const p = JSON.parse(legacy) as Hsl
      if (typeof p.h === 'number' && typeof p.s === 'number' && typeof p.l === 'number') {
        const dual: DualStored = { light: { primary: p } }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dual))
        localStorage.removeItem(LEGACY_STORAGE_KEY)
        return dual
      }
    }
  } catch {
    /* ignore */
  }
  return {}
}

function saveStoredDual(dual: DualStored) {
  const lightKeys = dual.light ? Object.keys(dual.light).length : 0
  const darkKeys = dual.dark ? Object.keys(dual.dark).length : 0
  if (lightKeys === 0 && darkKeys === 0) {
    localStorage.removeItem(STORAGE_KEY)
    return
  }
  const trimmed: DualStored = {}
  if (lightKeys) trimmed.light = dual.light
  if (darkKeys) trimmed.dark = dual.dark
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
}

function hasAnyStored(dual: DualStored): boolean {
  const l = dual.light ? Object.keys(dual.light).length : 0
  const d = dual.dark ? Object.keys(dual.dark).length : 0
  return l + d > 0
}

function buildDeclarations(shape: StoredShape): string {
  let out = ''
  for (const def of SLOTS) {
    const v = shape[def.slot]
    if (!v) continue
    const fg = accessibleForegroundCssForHslBackground(v.h, v.s, v.l)
    out += `  ${def.cssVar}: hsl(${v.h} ${v.s}% ${v.l}%);\n`
    out += `  ${def.fgVar}: ${fg};\n`
  }
  return out
}

function flushStyleTag(dual: DualStored) {
  const lightDecl = dual.light && Object.keys(dual.light).length ? buildDeclarations(dual.light) : ''
  const darkDecl = dual.dark && Object.keys(dual.dark).length ? buildDeclarations(dual.dark) : ''
  let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null
  if (!lightDecl && !darkDecl) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('style')
    el.id = STYLE_ID
    document.head.appendChild(el)
  }
  let css = ''
  if (lightDecl) css += `:root:not(.dark) {\n${lightDecl}}\n`
  if (darkDecl) css += `.dark {\n${darkDecl}}\n`
  el.textContent = css
}

function rowsFromMode(mode: ThemeMode, dual: DualStored): Record<Slot, RowState> {
  const shape = dual[mode] ?? {}
  const next = {} as Record<Slot, RowState>
  for (const def of SLOTS) {
    const v = shape[def.slot]
    if (v) {
      next[def.slot] = { ...v, hex: hslToHex(v.h, v.s, v.l) }
    } else {
      const hsl = readHslForMode(def.cssVar, mode)
      next[def.slot] = { ...hsl, hex: hslToHex(hsl.h, hsl.s, hsl.l) }
    }
  }
  return next
}

type RowState = { h: number; s: number; l: number; hex: string }

function CustomizerRow({
  def,
  state,
  idPrefix,
  onColorPicker,
  onHslField,
}: {
  def: (typeof SLOTS)[number]
  state: RowState
  idPrefix: string
  onColorPicker: (slot: Slot, hex: string) => void
  onHslField: (slot: Slot, key: keyof Hsl, raw: string) => void
}) {
  const { slot, title, cssVar, tailwindClass, fgVar, fgLabel } = def
  const { h, s, l, hex } = state
  const luminance = relativeLuminanceFromHsl(h, s, l)
  const lumPct = (luminance * 100).toFixed(1)
  const pid = `${idPrefix}-${slot}`

  return (
    <div className="flex min-w-0 flex-col gap-4 border-l border-border pl-3 lg:pl-5 first:border-l-0 first:pl-0">
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
          <h3 className="text-base font-semibold tracking-tight text-foreground">{title}</h3>
          <code className="text-[10px] text-foreground-emphasis-low">{tailwindClass}</code>
        </div>
        <code className="block text-[11px] text-foreground-emphasis-low">{cssVar}</code>
      </div>

      <div
        className="flex min-h-[88px] w-full items-center justify-center gap-2 rounded-md border px-3"
        style={{ backgroundColor: `var(${cssVar})` }}
      >
        <div
          className="size-4 shrink-0 rounded-sm border border-black/10 dark:border-white/15"
          style={{ backgroundColor: `var(${fgVar})` }}
          aria-hidden
        />
        <span className="text-sm font-semibold tracking-tight" style={{ color: `var(${fgVar})` }}>
          {fgLabel}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <span className="shrink-0 text-xs font-medium text-foreground-emphasis-low">Color picker</span>
          <div className="flex min-w-0 items-center gap-2">
            <code className="truncate text-[11px] text-foreground-emphasis-low">{hex}</code>
            <label className="relative flex size-12 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 border-border shadow-sm ring-offset-background transition-[box-shadow] hover:ring-2 hover:ring-ring/30">
              <input
                type="color"
                value={hex}
                onChange={(e) => onColorPicker(slot, e.target.value)}
                className={cn(
                  'absolute inset-0 h-[200%] w-[200%] -translate-x-1/4 -translate-y-1/4 cursor-pointer border-0 p-0',
                  '[&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-0',
                )}
                aria-label={`${title} color (${idPrefix})`}
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-foreground-emphasis-low" htmlFor={`${pid}-h`}>
              H
            </label>
            <Input
              id={`${pid}-h`}
              type="number"
              min={0}
              max={360}
              value={h}
              onChange={(e) => onHslField(slot, 'h', e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-foreground-emphasis-low" htmlFor={`${pid}-s`}>
              S
            </label>
            <Input
              id={`${pid}-s`}
              type="number"
              min={0}
              max={100}
              value={s}
              onChange={(e) => onHslField(slot, 's', e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-foreground-emphasis-low" htmlFor={`${pid}-l`}>
              L
            </label>
            <Input
              id={`${pid}-l`}
              type="number"
              min={0}
              max={100}
              value={l}
              onChange={(e) => onHslField(slot, 'l', e.target.value)}
            />
          </div>
        </div>

        <div className="min-w-0">
          <span className="text-xs font-medium text-foreground-emphasis-low">CSS</span>
          <code className="mt-1 block break-all rounded-md border bg-muted/50 px-2 py-2 text-[11px]">
            {cssVar}: hsl({h} {s}% {l}%)
          </code>
          <p className="mt-1.5 text-[10px] leading-snug text-foreground-emphasis-low">
            Relative luminance {lumPct}% (WCAG) — {luminance > 0.6 ? 'dark' : 'light'} on-text via{' '}
            <code className="text-[9px]">{fgVar}</code>
          </p>
        </div>
      </div>
    </div>
  )
}

export function ThemeCustomizer({ theme }: { theme: ThemeMode }) {
  const [rows, setRows] = React.useState<Record<Slot, RowState>>(() => ({
    primary: { h: 0, s: 0, l: 0, hex: '#000000' },
    secondary: { h: 0, s: 0, l: 0, hex: '#000000' },
    accent: { h: 0, s: 0, l: 0, hex: '#000000' },
  }))
  const [hasStored, setHasStored] = React.useState(false)

  const syncRow = React.useCallback((slot: Slot, hsl: Hsl, persist: boolean) => {
    const hex = hslToHex(hsl.h, hsl.s, hsl.l)
    setRows((prev) => ({ ...prev, [slot]: { ...hsl, hex } }))
    if (!persist) return
    const dual = loadStoredDual()
    const modeShape: StoredShape = { ...(dual[theme] ?? {}), [slot]: hsl }
    const next: DualStored = { ...dual, [theme]: modeShape }
    saveStoredDual(next)
    flushStyleTag(next)
    setHasStored(hasAnyStored(next))
  }, [theme])

  React.useLayoutEffect(() => {
    const dual = loadStoredDual()
    flushStyleTag(dual)
    setHasStored(hasAnyStored(dual))
    setRows(rowsFromMode(theme, dual))
  }, [theme])

  const onColorPicker = (slot: Slot, hexVal: string) => {
    const hsl = hexToHsl(hexVal)
    syncRow(slot, hsl, true)
  }

  const onHslField = (slot: Slot, key: keyof Hsl, raw: string) => {
    const n = Number.parseInt(raw, 10)
    if (Number.isNaN(n)) return
    const cur = rows[slot]
    let hsl: Hsl = { h: cur.h, s: cur.s, l: cur.l }
    if (key === 'h') hsl.h = Math.max(0, Math.min(360, n))
    if (key === 's') hsl.s = Math.max(0, Math.min(100, n))
    if (key === 'l') hsl.l = Math.max(0, Math.min(100, n))
    syncRow(slot, hsl, true)
  }

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(LEGACY_STORAGE_KEY)
    setHasStored(false)
    document.getElementById(STYLE_ID)?.remove()
    for (const def of SLOTS) {
      document.documentElement.style.removeProperty(def.cssVar)
      document.documentElement.style.removeProperty(def.fgVar)
    }
    const dual: DualStored = {}
    setRows(rowsFromMode(theme, dual))
  }

  return (
    <Card className="mb-10">
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle>Theme customizer</CardTitle>
          <CardDescription className="!text-foreground-emphasis-medium">
            Light/Dark 各 3 顏色客戶可提供，其 foreground Color 會自動計算。
          </CardDescription>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={reset} className="shrink-0 gap-1.5">
          <RotateCcw className="size-3.5" />
          還原預設
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4 lg:gap-6">
          {SLOTS.map((def) => (
            <CustomizerRow
              key={`${theme}-${def.slot}`}
              def={def}
              idPrefix={theme}
              state={rows[def.slot]}
              onColorPicker={onColorPicker}
              onHslField={onHslField}
            />
          ))}
        </div>
        <p className="text-[11px] text-foreground-emphasis-low md:border-t md:border-border md:pt-4">
          {hasStored
            ? '已儲存於 localStorage（pep.theme-semantic-hsl：light / dark 分開）。'
            : '尚未自訂：使用 index.css 的 Light/Dark 預設。'}
        </p>
      </CardContent>
    </Card>
  )
}
