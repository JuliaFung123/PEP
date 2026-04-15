import * as React from 'react'
import type { ComponentProps } from 'react'
import { Layers, Package, Palette, Plus, Ruler, Sparkles, Type } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { ThemeCustomizer } from '@/components/theme/ThemeCustomizer'
import { cn } from '@/lib/utils'

type ThemeMode = 'light' | 'dark'

type ButtonSize = NonNullable<ComponentProps<typeof Button>['size']>

/** Text buttons: `button.tsx` CVA — px at 16px root where fixed */
const BUTTON_TEXT_SPECS: {
  token: string
  size: ButtonSize
  height: string
  font: string
  iconSvg: string
}[] = [
  {
    token: 'default',
    size: 'default',
    height: 'h-8 · 2rem · 32px',
    font: 'text-sm · 14px',
    iconSvg: 'size-4 · 16px',
  },
  {
    token: 'xs',
    size: 'xs',
    height: 'h-6 · 1.5rem · 24px',
    font: 'text-xs · 12px',
    iconSvg: 'size-3 · 12px',
  },
  {
    token: 'sm',
    size: 'sm',
    height: 'h-7 · 1.75rem · 28px',
    font: 'text-[0.8rem] · 12.8px',
    iconSvg: 'size-3.5 · 14px',
  },
  {
    token: 'lg',
    size: 'lg',
    height: 'h-9 · 2.25rem · 36px',
    font: 'text-sm · 14px',
    iconSvg: 'size-4 · 16px',
  },
]

/** Icon-only — box + inherited base `text-sm`; per-size SVG overrides where set in CVA */
const BUTTON_ICON_SPECS: {
  token: string
  size: ButtonSize
  box: string
  font: string
  iconSvg: string
}[] = [
  { token: 'icon', size: 'icon', box: 'size-8 · 32×32px', font: 'text-sm · 14px (base)', iconSvg: 'size-4 · 16px' },
  {
    token: 'icon-xs',
    size: 'icon-xs',
    box: 'size-6 · 24×24px',
    font: 'text-sm · 14px (base)',
    iconSvg: 'size-3 · 12px',
  },
  {
    token: 'icon-sm',
    size: 'icon-sm',
    box: 'size-7 · 28×28px',
    font: 'text-sm · 14px (base)',
    iconSvg: 'size-4 · 16px (base CVA)',
  },
  {
    token: 'icon-lg',
    size: 'icon-lg',
    box: 'size-9 · 36×36px',
    font: 'text-sm · 14px (base)',
    iconSvg: 'size-4 · 16px',
  },
]

const BUTTON_TEXT_SIZE_ROWS = BUTTON_TEXT_SPECS.map(({ token, size }) => ({ token, size }))
const BUTTON_ICON_SIZE_ROWS = BUTTON_ICON_SPECS.map(({ token, size }) => ({ token, size }))

const THEME_STORAGE_KEY = 'pep.theme'

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
}

function rgbCssToHslTriplet(rgb: string): string | null {
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
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
}

type SemanticColor = {
  label: string
  cssVar: `--${string}`
  tailwindClass: string
  swatch: 'fill' | 'foreground' | 'border' | 'input' | 'ring'
  /** When swatch is ring: set --tw-ring-color (default uses ring-ring → --ring) */
  ringCssVar?: `--${string}`
  /** On fill swatches: show paired “on-” color (square + label), e.g. foreground on background */
  onPair?: { cssVar: `--${string}`; label: string }
}

const SEMANTIC_COLORS: SemanticColor[] = [
  {
    label: 'Background',
    cssVar: '--background',
    tailwindClass: 'bg-background',
    swatch: 'fill',
    onPair: { cssVar: '--foreground', label: 'Foreground' },
  },
  { label: 'Foreground', cssVar: '--foreground', tailwindClass: 'text-foreground', swatch: 'foreground' },
  {
    label: 'Primary',
    cssVar: '--primary',
    tailwindClass: 'bg-primary',
    swatch: 'fill',
    onPair: { cssVar: '--primary-foreground', label: 'Primary foreground' },
  },
  {
    label: 'Secondary',
    cssVar: '--secondary',
    tailwindClass: 'bg-secondary',
    swatch: 'fill',
    onPair: { cssVar: '--secondary-foreground', label: 'Secondary foreground' },
  },
  {
    label: 'Accent',
    cssVar: '--accent',
    tailwindClass: 'bg-accent',
    swatch: 'fill',
    onPair: { cssVar: '--accent-foreground', label: 'Accent foreground' },
  },
  {
    label: 'Destructive',
    cssVar: '--destructive',
    tailwindClass: 'bg-destructive',
    swatch: 'fill',
    onPair: { cssVar: '--destructive-foreground', label: 'Destructive foreground' },
  },
  {
    label: 'Destructive foreground',
    cssVar: '--destructive-foreground',
    tailwindClass: 'text-destructive-foreground',
    swatch: 'foreground',
  },
  {
    label: 'Muted',
    cssVar: '--muted',
    tailwindClass: 'bg-muted',
    swatch: 'fill',
    onPair: { cssVar: '--muted-foreground', label: 'Muted foreground' },
  },
  {
    label: 'Muted foreground',
    cssVar: '--muted-foreground',
    tailwindClass: 'text-muted-foreground',
    swatch: 'foreground',
  },
  {
    label: 'Popover',
    cssVar: '--popover',
    tailwindClass: 'bg-popover',
    swatch: 'fill',
    onPair: { cssVar: '--popover-foreground', label: 'Popover foreground' },
  },
  {
    label: 'Popover foreground',
    cssVar: '--popover-foreground',
    tailwindClass: 'text-popover-foreground',
    swatch: 'foreground',
  },
  {
    label: 'Card',
    cssVar: '--card',
    tailwindClass: 'bg-card',
    swatch: 'fill',
    onPair: { cssVar: '--card-foreground', label: 'Card foreground' },
  },
  {
    label: 'Card foreground',
    cssVar: '--card-foreground',
    tailwindClass: 'text-card-foreground',
    swatch: 'foreground',
  },
  { label: 'Border', cssVar: '--border', tailwindClass: 'border-border', swatch: 'border' },
  { label: 'Input', cssVar: '--input', tailwindClass: 'border-input', swatch: 'input' },
  { label: 'Ring', cssVar: '--ring', tailwindClass: 'ring-ring', swatch: 'ring' },
]

const SIDEBAR_COLORS: SemanticColor[] = [
  { label: 'Sidebar', cssVar: '--sidebar', tailwindClass: 'bg-sidebar', swatch: 'fill' },
  {
    label: 'Sidebar Foreground',
    cssVar: '--sidebar-foreground',
    tailwindClass: 'text-sidebar-foreground',
    swatch: 'foreground',
  },
  {
    label: 'Sidebar Primary',
    cssVar: '--sidebar-primary',
    tailwindClass: 'bg-sidebar-primary',
    swatch: 'fill',
  },
  {
    label: 'Sidebar Primary Foreground',
    cssVar: '--sidebar-primary-foreground',
    tailwindClass: 'text-sidebar-primary-foreground',
    swatch: 'foreground',
  },
  {
    label: 'Sidebar Accent',
    cssVar: '--sidebar-accent',
    tailwindClass: 'bg-sidebar-accent',
    swatch: 'fill',
  },
  {
    label: 'Sidebar Accent Foreground',
    cssVar: '--sidebar-accent-foreground',
    tailwindClass: 'text-sidebar-accent-foreground',
    swatch: 'foreground',
  },
  {
    label: 'Sidebar Border',
    cssVar: '--sidebar-border',
    tailwindClass: 'border-sidebar',
    swatch: 'border',
  },
  {
    label: 'Sidebar Ring',
    cssVar: '--sidebar-ring',
    tailwindClass: 'ring-sidebar-ring',
    swatch: 'ring',
    ringCssVar: '--sidebar-ring',
  },
]

function ColorSwatch({ item }: { item: SemanticColor }) {
  const measureRef = React.useRef<HTMLDivElement>(null)
  const [hsl, setHsl] = React.useState<string>('—')
  const [rawVar, setRawVar] = React.useState<string>('—')

  const paint = React.useCallback(() => {
    const root = getComputedStyle(document.documentElement)
    setRawVar(root.getPropertyValue(item.cssVar).trim() || '—')
    const el = measureRef.current
    if (!el) return
    const bg = getComputedStyle(el).backgroundColor
    const triplet = rgbCssToHslTriplet(bg)
    setHsl(triplet ? `${triplet}` : bg || '—')
  }, [item.cssVar])

  React.useLayoutEffect(() => {
    paint()
  }, [paint])

  React.useEffect(() => {
    const mo = new MutationObserver(paint)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style'] })
    window.addEventListener('resize', paint)
    return () => {
      mo.disconnect()
      window.removeEventListener('resize', paint)
    }
  }, [paint])

  const swatchClass = cn(
    'w-full rounded-md',
    item.swatch === 'fill' && !item.onPair && 'h-14',
    item.swatch === 'fill' && item.onPair && 'flex min-h-[88px] items-center justify-center',
    item.swatch === 'fill' && 'border',
    item.swatch === 'foreground' && 'h-14 border',
    item.swatch === 'border' && 'h-14 border-4 bg-background',
    item.swatch === 'input' && 'h-14 border-4 bg-background',
    item.swatch === 'ring' &&
      'h-14 border border-border bg-background ring-4 ring-offset-2 ring-offset-background',
    item.swatch === 'ring' && !item.ringCssVar && 'ring-ring',
  )

  const swatchStyle: React.CSSProperties =
    item.swatch === 'fill'
      ? { backgroundColor: `var(${item.cssVar})` }
      : item.swatch === 'foreground'
        ? { backgroundColor: `var(${item.cssVar})` }
        : item.swatch === 'border'
          ? { borderColor: `var(${item.cssVar})` }
          : item.swatch === 'input'
            ? { borderColor: `var(${item.cssVar})` }
            : item.swatch === 'ring' && item.ringCssVar
              ? { ['--tw-ring-color' as string]: `var(${item.ringCssVar})` }
              : {}

  return (
    <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col gap-0.5 border-b px-3 py-1.5 leading-snug">
        <div className="truncate text-sm font-medium leading-tight">{item.label}</div>
        <code className="block break-all text-[11px] leading-snug text-foreground-emphasis-medium">{item.cssVar}</code>
        <code className="block break-all text-[10px] leading-snug text-foreground-emphasis-low">{item.tailwindClass}</code>
      </div>
      <div className="relative space-y-2 p-3">
        <div
          ref={measureRef}
          className="pointer-events-none absolute h-px w-px opacity-0"
          style={{ backgroundColor: `var(${item.cssVar})` }}
          aria-hidden
        />
        <div className={swatchClass} style={swatchStyle}>
          {item.swatch === 'fill' && item.onPair ? (
            <div className="flex items-center justify-center gap-2 px-3">
              <div
                className="size-4 shrink-0 rounded-sm border border-black/10 dark:border-white/15"
                style={{ backgroundColor: `var(${item.onPair.cssVar})` }}
                aria-hidden
              />
              <span
                className="text-sm font-semibold tracking-tight"
                style={{ color: `var(${item.onPair.cssVar})` }}
              >
                {item.onPair.label}
              </span>
            </div>
          ) : null}
        </div>
        <div className="space-y-0.5 text-[11px] text-foreground-emphasis-low">
          <div>
            <span className="font-medium text-foreground">HSL (computed)</span>{' '}
            <code>{hsl}</code>
          </div>
          <div>
            <span className="font-medium text-foreground">CSS value</span>{' '}
            <code className="break-all">{rawVar}</code>
          </div>
        </div>
      </div>
    </div>
  )
}

type TypeSample = { tag: string; className: string; label: string; children: React.ReactNode }

function TypeRow({ sample }: { sample: TypeSample }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [info, setInfo] = React.useState('—')

  React.useLayoutEffect(() => {
    const el = ref.current?.firstElementChild as HTMLElement | null
    if (!el) return
    const cs = getComputedStyle(el)
    const ff = cs.fontFamily.split(',')[0]?.trim() ?? cs.fontFamily
    setInfo(`${ff} · ${cs.fontSize} / ${cs.lineHeight}`)
  }, [sample.className, sample.tag])

  const Tag = sample.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'small'

  return (
    <div className="flex flex-col gap-1 rounded-lg border bg-card/50 px-3 py-2 sm:flex-row sm:items-baseline sm:justify-between">
      <div className="min-w-0">
        <div className="text-[11px] font-medium text-foreground-emphasis-low">{sample.label}</div>
        <div ref={ref} className="mt-1">
          <Tag className={sample.className}>{sample.children}</Tag>
        </div>
      </div>
      <code className="shrink-0 text-[10px] text-foreground-emphasis-low sm:max-w-[45%] sm:text-right">{info}</code>
    </div>
  )
}

/** Static class map so Tailwind keeps utilities in the build. */
const SPACING_STEP_TO_PADDING: Record<string, string> = {
  '0': 'p-0',
  '0.5': 'p-0.5',
  '1': 'p-1',
  '1.5': 'p-1.5',
  '2': 'p-2',
  '2.5': 'p-2.5',
  '3': 'p-3',
  '3.5': 'p-3.5',
  '4': 'p-4',
  '5': 'p-5',
  '6': 'p-6',
  '7': 'p-7',
  '8': 'p-8',
  '9': 'p-9',
  '10': 'p-10',
  '11': 'p-11',
  '12': 'p-12',
  '14': 'p-14',
  '16': 'p-16',
  '20': 'p-20',
  '24': 'p-24',
}

const SPACING_STEP_TO_GAP: Record<string, string> = {
  '0': 'gap-0',
  '0.5': 'gap-0.5',
  '1': 'gap-1',
  '1.5': 'gap-1.5',
  '2': 'gap-2',
  '2.5': 'gap-2.5',
  '3': 'gap-3',
  '3.5': 'gap-3.5',
  '4': 'gap-4',
  '5': 'gap-5',
  '6': 'gap-6',
  '7': 'gap-7',
  '8': 'gap-8',
  '9': 'gap-9',
  '10': 'gap-10',
  '11': 'gap-11',
  '12': 'gap-12',
  '14': 'gap-14',
  '16': 'gap-16',
  '20': 'gap-20',
  '24': 'gap-24',
}

const SPACING_STEP_TO_MARGIN: Record<string, string> = {
  '0': 'm-0',
  '0.5': 'm-0.5',
  '1': 'm-1',
  '1.5': 'm-1.5',
  '2': 'm-2',
  '2.5': 'm-2.5',
  '3': 'm-3',
  '3.5': 'm-3.5',
  '4': 'm-4',
  '5': 'm-5',
  '6': 'm-6',
  '7': 'm-7',
  '8': 'm-8',
  '9': 'm-9',
  '10': 'm-10',
  '11': 'm-11',
  '12': 'm-12',
  '14': 'm-14',
  '16': 'm-16',
  '20': 'm-20',
  '24': 'm-24',
}

const SPACING_STEPS = [
  '0',
  '0.5',
  '1',
  '1.5',
  '2',
  '2.5',
  '3',
  '3.5',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '14',
  '16',
  '20',
  '24',
] as const

function readSpacingRows(host: HTMLDivElement | null) {
  if (!host) return []
  const blocks = host.querySelectorAll('[data-step-block]')
  const next: { step: string; pPx: string; gPx: string; mPx: string }[] = []
  blocks.forEach((block) => {
    const step = block.getAttribute('data-step') ?? ''
    const pEl = block.querySelector('[data-m="p"]') as HTMLElement | null
    const gEl = block.querySelector('[data-m="g"]') as HTMLElement | null
    const mEl = block.querySelector('[data-m="m"]') as HTMLElement | null
    next.push({
      step,
      pPx: pEl ? getComputedStyle(pEl).paddingTop : '—',
      gPx: gEl ? getComputedStyle(gEl).gap : '—',
      mPx: mEl ? getComputedStyle(mEl).marginTop : '—',
    })
  })
  return next
}

function SpacingScaleTable() {
  const hostsRef = React.useRef<HTMLDivElement>(null)
  const [rows, setRows] = React.useState<
    { step: string; pPx: string; gPx: string; mPx: string }[]
  >([])

  const syncRows = React.useCallback(() => {
    setRows(readSpacingRows(hostsRef.current))
  }, [])

  React.useLayoutEffect(() => {
    syncRows()
  }, [syncRows])

  React.useEffect(() => {
    const ro = new ResizeObserver(syncRows)
    ro.observe(document.documentElement)
    return () => ro.disconnect()
  }, [syncRows])

  return (
    <>
      <div ref={hostsRef} className="pointer-events-none fixed top-0 left-0 -z-10 opacity-0" aria-hidden>
        {SPACING_STEPS.map((step) => (
          <div key={step} data-step-block data-step={step} className="flex flex-col gap-1">
            <div data-m="p" className={cn('box-border inline-block min-h-0 min-w-0', SPACING_STEP_TO_PADDING[step])} />
            <div data-m="g" className={cn('inline-flex', SPACING_STEP_TO_GAP[step])}>
              <span className="size-1 shrink-0 bg-transparent" />
              <span className="size-1 shrink-0 bg-transparent" />
            </div>
            <div data-m="m" className={cn('box-border inline-block min-h-0 min-w-0', SPACING_STEP_TO_MARGIN[step])} />
          </div>
        ))}
      </div>
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-3 py-2 font-medium">Step</th>
              <th className="px-3 py-2 font-medium">Padding (step → px)</th>
              <th className="px-3 py-2 font-medium">Class</th>
              <th className="px-3 py-2 font-medium">Gap (class → px)</th>
              <th className="px-3 py-2 font-medium">Margin (class → px)</th>
            </tr>
          </thead>
          <tbody>
            {SPACING_STEPS.map((step, i) => {
              const r = rows[i]
              return (
                <tr key={step} className="border-b border-border/80 last:border-0">
                  <td className="px-3 py-2 font-mono font-medium">{step}</td>
                  <td className="px-3 py-2 font-mono text-xs text-foreground-emphasis-low">
                    {r ? `${step} → ${r.pPx}` : '…'}
                  </td>
                  <td className="px-3 py-2">
                    <code className="text-xs">{SPACING_STEP_TO_PADDING[step]}</code>
                  </td>
                  <td className="px-3 py-2 font-mono text-[11px] text-foreground-emphasis-low">
                    {r ? (
                      <>
                        <code className="text-xs text-foreground">{SPACING_STEP_TO_GAP[step]}</code>
                        {' → '}
                        {r.gPx}
                      </>
                    ) : (
                      '…'
                    )}
                  </td>
                  <td className="px-3 py-2 font-mono text-[11px] text-foreground-emphasis-low">
                    {r ? (
                      <>
                        <code className="text-xs text-foreground">{SPACING_STEP_TO_MARGIN[step]}</code>
                        {' → '}
                        {r.mPx}
                      </>
                    ) : (
                      '…'
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

const RADIUS_VARS: { name: string; tailwindToken?: string }[] = [
  { name: '--radius', tailwindToken: '--radius-lg → rounded-lg' },
  { name: '--radius-sm' },
  { name: '--radius-md' },
  { name: '--radius-lg' },
  { name: '--radius-xl' },
  { name: '--radius-2xl' },
  { name: '--radius-3xl' },
  { name: '--radius-4xl' },
]

function RadiusTable({ theme }: { theme: ThemeMode }) {
  const [rows, setRows] = React.useState<{ name: string; px: string; raw: string; note?: string }[]>([])

  React.useLayoutEffect(() => {
    const root = document.documentElement
    const next = RADIUS_VARS.map(({ name, tailwindToken }) => {
      const probe = document.createElement('div')
      probe.style.cssText = `position:absolute;visibility:hidden;border-radius:var(${name});width:0;height:0;`
      root.appendChild(probe)
      const cs = getComputedStyle(probe)
      const br = cs.borderTopLeftRadius
      const raw = getComputedStyle(root).getPropertyValue(name).trim()
      root.removeChild(probe)
      return { name, px: br || '—', raw: raw || '—', note: tailwindToken }
    })
    setRows(next)
  }, [theme])

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-3 py-2 font-medium">CSS variable</th>
            <th className="px-3 py-2 font-medium">Raw (root)</th>
            <th className="px-3 py-2 font-medium">Computed radius</th>
            <th className="px-3 py-2 font-medium">Note</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-b border-border/80 last:border-0">
              <td className="px-3 py-2 font-mono text-xs">{r.name}</td>
              <td className="px-3 py-2 font-mono text-[11px] text-foreground-emphasis-low">{r.raw}</td>
              <td className="px-3 py-2 font-mono text-xs text-foreground-emphasis-low">{r.px}</td>
              <td className="px-3 py-2 text-xs text-foreground-emphasis-low">{r.note ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const ELEVATION_VARS: { name: `--elevation-${string}`; label: string; tailwindClass: string }[] = [
  { name: '--elevation-none', label: 'None', tailwindClass: 'shadow-elevation-none' },
  { name: '--elevation-xs', label: 'XS', tailwindClass: 'shadow-elevation-xs' },
  { name: '--elevation-sm', label: 'SM', tailwindClass: 'shadow-elevation-sm' },
  { name: '--elevation-md', label: 'MD', tailwindClass: 'shadow-elevation-md' },
  { name: '--elevation-lg', label: 'LG', tailwindClass: 'shadow-elevation-lg' },
  { name: '--elevation-xl', label: 'XL', tailwindClass: 'shadow-elevation-xl' },
]

function ElevationTable({ theme }: { theme: ThemeMode }) {
  const [rows, setRows] = React.useState<
    { name: string; label: string; tailwindClass: string; raw: string; computed: string }[]
  >([])

  React.useLayoutEffect(() => {
    const root = document.documentElement
    const next = ELEVATION_VARS.map(({ name, label, tailwindClass }) => {
      const raw = getComputedStyle(root).getPropertyValue(name).trim()
      const probe = document.createElement('div')
      probe.style.cssText = `position:absolute;left:-9999px;box-shadow:var(${name});width:1px;height:1px;`
      root.appendChild(probe)
      const computed = getComputedStyle(probe).boxShadow.trim() || 'none'
      root.removeChild(probe)
      return {
        name,
        label,
        tailwindClass,
        raw: raw || '—',
        computed: computed === 'none' && name === '--elevation-none' ? 'none' : computed,
      }
    })
    setRows(next)
  }, [theme])

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-3 py-2 font-medium">Level</th>
            <th className="px-3 py-2 font-medium">CSS variable</th>
            <th className="px-3 py-2 font-medium">Tailwind</th>
            <th className="px-3 py-2 font-medium">Raw (root)</th>
            <th className="px-3 py-2 font-medium">Computed</th>
            <th className="px-3 py-2 font-medium">Preview</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-b border-border/80 last:border-0">
              <td className="px-3 py-2 font-medium">{r.label}</td>
              <td className="px-3 py-2 font-mono text-xs">{r.name}</td>
              <td className="px-3 py-2 font-mono text-[11px] text-foreground-emphasis-low">{r.tailwindClass}</td>
              <td className="max-w-[180px] px-3 py-2 font-mono text-[10px] leading-snug text-foreground-emphasis-low">
                <span className="line-clamp-3" title={r.raw}>
                  {r.raw}
                </span>
              </td>
              <td className="max-w-[220px] px-3 py-2 font-mono text-[10px] leading-snug text-foreground-emphasis-low">
                <span className="line-clamp-3" title={r.computed}>
                  {r.computed}
                </span>
              </td>
              <td className="px-3 py-3">
                <div
                  className="mx-auto size-14 rounded-lg bg-card ring-1 ring-border"
                  style={{ boxShadow: `var(${r.name})` }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: React.ReactNode
}) {
  return (
    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Icon className="size-4 text-foreground opacity-emphasis-low" />
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          <p className="mt-1 max-w-2xl text-sm text-foreground-emphasis-medium">{description}</p>
        </div>
      </div>
    </div>
  )
}

export function ThemeShowcase() {
  const [theme] = React.useState<ThemeMode>(() => getInitialTheme())

  React.useEffect(() => {
    applyTheme(theme)
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const typeSamples: TypeSample[] = [
    { tag: 'h1', label: 'H1', className: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', children: 'Heading 1' },
    { tag: 'h2', label: 'H2', className: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0', children: 'Heading 2' },
    { tag: 'h3', label: 'H3', className: 'scroll-m-20 text-2xl font-semibold tracking-tight', children: 'Heading 3' },
    { tag: 'h4', label: 'H4', className: 'scroll-m-20 text-xl font-semibold tracking-tight', children: 'Heading 4' },
    { tag: 'h5', label: 'H5', className: 'scroll-m-20 text-lg font-semibold tracking-tight', children: 'Heading 5' },
    { tag: 'h6', label: 'H6', className: 'scroll-m-20 text-base font-semibold tracking-tight', children: 'Heading 6' },
    { tag: 'p', label: 'Paragraph', className: 'leading-7 [&:not(:first-child)]:mt-6', children: 'Body text uses the theme foreground and sans stack from index.css / @theme.' },
    { tag: 'small', label: 'Small', className: 'text-sm font-medium leading-none', children: 'Small caption' },
    { tag: 'p', label: 'Muted', className: 'text-sm text-muted-foreground', children: 'Muted supporting text for descriptions and hints.' },
  ]

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      <header className="mb-10 flex flex-col gap-4 border-b pb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">Theme showcase</h1>
          <p className="mt-2 max-w-xl text-sm text-foreground-emphasis-medium">
            Light / dark, colors, typography, elevation, components, and spacing scales from{' '}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">src/index.css</code>.
          </p>
        </div>
      </header>

      <ThemeCustomizer theme={theme} />

      <section className="mb-14">
        <SectionHeader
          icon={Palette}
          title="Color palette"
          description="Semantic tokens (var(--*)) with Tailwind classes; HSL from the browser’s resolved color."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SEMANTIC_COLORS.map((item) => (
            <ColorSwatch key={item.cssVar} item={item} />
          ))}
        </div>

        <h3 className="mt-10 mb-1 text-sm font-semibold tracking-tight text-foreground">Sidebar</h3>
        <p className="mb-4 text-sm text-foreground-emphasis-medium">
          Tokens from <code className="rounded bg-muted px-1 text-xs">--sidebar*</code> /{' '}
          <code className="rounded bg-muted px-1 text-xs">@theme</code> color mappings.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SIDEBAR_COLORS.map((item) => (
            <ColorSwatch key={item.cssVar} item={item} />
          ))}
        </div>
      </section>

      <section className="mb-14">
        <SectionHeader
          icon={Type}
          title="Typography"
          description="H1–H6, body, small, muted — font metrics from getComputedStyle."
        />
        <div className="flex flex-col gap-2">
          {typeSamples.map((s) => (
            <TypeRow key={`${s.label}-${s.className}`} sample={s} />
          ))}
        </div>
      </section>

      <section className="mb-14">
        <SectionHeader
          icon={Sparkles}
          title="Emphasis opacity"
          description={
            <>
              Optional tokens for softer hierarchy on text and icons. Nothing uses them unless you add{' '}
              <code className="rounded bg-muted px-1 text-xs">var(--opacity-emphasis-*)</code> or the utilities below.
            </>
          }
        />
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-3 py-2 font-medium">Level</th>
                <th className="px-3 py-2 font-medium">Variable</th>
                <th className="px-3 py-2 font-medium">Value</th>
                <th className="px-3 py-2 font-medium">Utilities (opt-in)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/80">
                <td className="px-3 py-2 font-medium">High</td>
                <td className="px-3 py-2 font-mono text-xs">--opacity-emphasis-high</td>
                <td className="px-3 py-2 text-foreground">0.87 (87%)</td>
                <td className="px-3 py-2 font-mono text-[11px] text-foreground-emphasis-low">
                  .opacity-emphasis-high · .text-foreground-emphasis-high
                </td>
              </tr>
              <tr className="border-b border-border/80">
                <td className="px-3 py-2 font-medium">Medium</td>
                <td className="px-3 py-2 font-mono text-xs">--opacity-emphasis-medium</td>
                <td className="px-3 py-2 text-foreground">0.6 (60%)</td>
                <td className="px-3 py-2 font-mono text-[11px] text-foreground-emphasis-low">
                  .opacity-emphasis-medium · .text-foreground-emphasis-medium
                </td>
              </tr>
              <tr className="border-b border-border/80 last:border-0">
                <td className="px-3 py-2 font-medium">Low</td>
                <td className="px-3 py-2 font-mono text-xs">--opacity-emphasis-low</td>
                <td className="px-3 py-2 text-foreground">0.4 (40%)</td>
                <td className="px-3 py-2 font-mono text-[11px] text-foreground-emphasis-low">
                  .opacity-emphasis-low · .text-foreground-emphasis-low
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-foreground-emphasis-medium">
          Icons: use <code className="rounded bg-muted px-1 text-xs">opacity-emphasis-*</code> on the SVG wrapper, or{' '}
          <code className="rounded bg-muted px-1 text-xs">
            {`style={{ opacity: 'var(--opacity-emphasis-medium)' }}`}
          </code>
          . Text: prefer <code className="rounded bg-muted px-1 text-xs">text-foreground-emphasis-*</code> so only the
          ink fades (not layout).
        </p>
        <div className="mt-4 rounded-lg border bg-card p-4">
          <div className="mb-2 text-xs font-medium text-foreground-emphasis-low">
            Examples (explicit classes — not global defaults)
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-foreground-emphasis-high font-medium">High emphasis copy</span>
              <Sparkles className="size-5 text-foreground opacity-emphasis-high" aria-hidden />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-foreground-emphasis-medium font-medium">Medium emphasis copy</span>
              <Sparkles className="size-5 text-foreground opacity-emphasis-medium" aria-hidden />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-foreground-emphasis-low font-medium">Low emphasis copy</span>
              <Sparkles className="size-5 text-foreground opacity-emphasis-low" aria-hidden />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-14">
        <SectionHeader
          icon={Package}
          title="Components"
          description="Buttons, badges, input, switch — they follow semantic colors and radius from the theme."
        />
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription className="!text-foreground-emphasis-low">
              Tables list height, font, and default SVG sizes from <code className="text-xs">button.tsx</code> (px at
              16px root). Then live previews, badge, input, and switch.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div>
              <div className="mb-2 text-xs font-medium text-foreground-emphasis-low">Button — text sizes (spec)</div>
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-3 py-2 font-medium">size</th>
                      <th className="px-3 py-2 font-medium">Height</th>
                      <th className="px-3 py-2 font-medium">Font</th>
                      <th className="px-3 py-2 font-medium">Default icon (SVG)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BUTTON_TEXT_SPECS.map((row) => (
                      <tr key={row.token} className="border-b border-border/80 last:border-0">
                        <td className="px-3 py-2 font-mono text-xs text-foreground-emphasis-medium">
                          &quot;{row.token}&quot;
                        </td>
                        <td className="px-3 py-2 font-mono text-[11px] text-foreground">{row.height}</td>
                        <td className="px-3 py-2 font-mono text-[11px] text-foreground">{row.font}</td>
                        <td className="px-3 py-2 font-mono text-[11px] text-foreground">{row.iconSvg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div className="mb-2 text-xs font-medium text-foreground-emphasis-low">Button — icon only (spec)</div>
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-3 py-2 font-medium">size</th>
                      <th className="px-3 py-2 font-medium">Width × height</th>
                      <th className="px-3 py-2 font-medium">Font (inherited)</th>
                      <th className="px-3 py-2 font-medium">Default icon (SVG)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BUTTON_ICON_SPECS.map((row) => (
                      <tr key={row.token} className="border-b border-border/80 last:border-0">
                        <td className="px-3 py-2 font-mono text-xs text-foreground-emphasis-medium">
                          &quot;{row.token}&quot;
                        </td>
                        <td className="px-3 py-2 font-mono text-[11px] text-foreground">{row.box}</td>
                        <td className="px-3 py-2 font-mono text-[11px] text-foreground">{row.font}</td>
                        <td className="px-3 py-2 font-mono text-[11px] text-foreground">{row.iconSvg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-xs font-medium text-foreground-emphasis-low">Button — text sizes</div>
              {BUTTON_TEXT_SIZE_ROWS.map(({ token, size }) => (
                <div key={token} className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <code className="w-[7.5rem] shrink-0 font-mono text-xs text-foreground-emphasis-medium">
                    size=&quot;{token}&quot;
                  </code>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button size={size} variant="default">
                      Primary
                    </Button>
                    <Button size={size} variant="Light">
                      Light
                    </Button>
                    <Button size={size} variant="secondary">
                      Secondary
                    </Button>
                    <Button size={size} variant="destructive">
                      Destructive
                    </Button>
                    <Button size={size} variant="outline">
                      Outline
                    </Button>
                    <Button size={size} variant="ghost">
                      Ghost
                    </Button>
                    <Button size={size} variant="link">
                      Link
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="text-xs font-medium text-foreground-emphasis-low">Button — icon only</div>
              {BUTTON_ICON_SIZE_ROWS.map(({ token, size }) => (
                <div key={token} className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <code className="w-[7.5rem] shrink-0 font-mono text-xs text-foreground-emphasis-medium">
                    size=&quot;{token}&quot;
                  </code>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button size={size} variant="default" aria-label="Primary">
                      <Plus />
                    </Button>
                    <Button size={size} variant="Light" aria-label="Light">
                      <Plus />
                    </Button>
                    <Button size={size} variant="secondary" aria-label="Secondary">
                      <Plus />
                    </Button>
                    <Button size={size} variant="destructive" aria-label="Destructive">
                      <Plus />
                    </Button>
                    <Button size={size} variant="outline" aria-label="Outline">
                      <Plus />
                    </Button>
                    <Button size={size} variant="ghost" aria-label="Ghost">
                      <Plus />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-xs font-medium text-foreground-emphasis-low">Input</div>
              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg border bg-card/40 p-3">
                  <div className="mb-2 text-[11px] font-medium text-foreground-emphasis-medium">Without label</div>
                  <div className="grid gap-2">
                    <div className="grid gap-1">
                      <div className="text-[10px] text-foreground-emphasis-low">Enabled</div>
                      <Input placeholder="Input" />
                    </div>
                    <div className="grid gap-1">
                      <div className="text-[10px] text-foreground-emphasis-low">Disabled</div>
                      <Input placeholder="Input" disabled />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-card/40 p-3">
                  <div className="mb-2 text-[11px] font-medium text-foreground-emphasis-medium">With label</div>
                  <div className="grid gap-2">
                    <div className="grid gap-1.5">
                      <label htmlFor="preview-input-label-enabled" className="text-sm font-medium text-foreground">
                        Label
                      </label>
                      <Input id="preview-input-label-enabled" placeholder="Input" />
                    </div>
                    <div className="grid gap-1.5">
                      <label
                        htmlFor="preview-input-label-disabled"
                        className="text-sm font-medium text-foreground opacity-50"
                      >
                        Label
                      </label>
                      <Input id="preview-input-label-disabled" placeholder="Input" disabled />
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-card/40 p-3">
                  <div className="mb-2 text-[11px] font-medium text-foreground-emphasis-medium">
                    With label + helper
                  </div>
                  <div className="grid gap-2">
                    <div className="grid gap-1.5">
                      <label htmlFor="preview-input-helper-enabled" className="text-sm font-medium text-foreground">
                        Label
                      </label>
                      <Input id="preview-input-helper-enabled" placeholder="Input" />
                      <p className="text-xs text-foreground-emphasis-low">Helper text</p>
                    </div>
                    <div className="grid gap-1.5">
                      <label
                        htmlFor="preview-input-helper-disabled"
                        className="text-sm font-medium text-foreground opacity-50"
                      >
                        Label
                      </label>
                      <Input id="preview-input-helper-disabled" placeholder="Input" disabled />
                      <p className="text-xs text-foreground-emphasis-low">Helper text</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-medium text-foreground-emphasis-low">Tabs</div>
                <Tabs defaultValue="account" className="w-full">
                  <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account">
                    <div className="text-sm font-medium text-foreground">Account</div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Default Tabs component preview.
                    </p>
                  </TabsContent>
                  <TabsContent value="password">
                    <div className="text-sm font-medium text-foreground">Password</div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Focus the triggers to validate ring tokens.
                    </p>
                  </TabsContent>
                  <TabsContent value="billing">
                    <div className="text-sm font-medium text-foreground">Billing</div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Active tab uses background + elevation token.
                    </p>
                  </TabsContent>
                </Tabs>
              </div>
              <label className="flex cursor-pointer items-center gap-3 text-sm">
                <Switch defaultChecked />
                <span className="text-foreground-emphasis-low">Switch</span>
              </label>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-foreground-emphasis-low">
            Use Light / Dark in the header to verify tokens.
          </CardFooter>
        </Card>
      </section>

      <section className="mb-6">
        <SectionHeader
          icon={Ruler}
          title="Padding, gap, margin & radius"
          description={
            <>
              Tailwind spacing scale: each step is <code className="rounded bg-muted px-1 text-xs">0.25rem</code> per
              unit (default). Example at 16px root:{' '}
              <code className="rounded bg-muted px-1 text-xs">1 → 4px</code>,{' '}
              <code className="rounded bg-muted px-1 text-xs">2 → 8px</code>. Values below are{' '}
              <strong className="font-medium text-foreground">measured in your browser</strong>.
            </>
          }
        />
        <h3 className="mb-3 text-sm font-medium text-foreground-emphasis-low">Spacing scale</h3>
        <SpacingScaleTable />
        <h3 className="mb-3 mt-10 text-sm font-medium text-foreground-emphasis-low">Radius variables</h3>
        <RadiusTable theme={theme} />

        <div className="mb-3 mt-10 flex items-start gap-3">
          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Layers className="size-4 text-foreground opacity-emphasis-low" aria-hidden />
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-tight text-foreground">Elevation tokens</h3>
            <p className="mt-1 max-w-2xl text-sm text-foreground-emphasis-medium">
              Semantic <code className="rounded bg-muted px-1 text-xs">--elevation-*</code> box shadows; mapped in{' '}
              <code className="rounded bg-muted px-1 text-xs">@theme</code> as{' '}
              <code className="rounded bg-muted px-1 text-xs">shadow-elevation-*</code>. Values differ in{' '}
              <code className="rounded bg-muted px-1 text-xs">.dark</code> for visible depth on dark surfaces.
            </p>
          </div>
        </div>
        <ElevationTable theme={theme} />

        <div className="mt-6 flex flex-wrap gap-2 rounded-lg border bg-muted/20 p-4">
          <Button size="sm">Button radius</Button>
          <Card className="border-0 py-3 shadow-none ring-1 ring-border">
            <CardContent className="py-0 text-sm">Card sample</CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
