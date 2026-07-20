import * as React from 'react'
import { Layers, Palette, Ruler, Sparkles } from 'lucide-react'

import { PepDesignSystemPage } from '@/components/pep-chrome'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import { ThemeCustomizer } from '@/components/theme/ThemeCustomizer'
import { cn } from '@/lib/utils'
import { typeToken } from "@/data/typography-tokens"

type ThemeMode = 'light' | 'dark'

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

type SemanticColor = {
  label: string
  cssVar: `--${string}`
  tailwindClass: string
  swatch: 'fill' | 'foreground' | 'border' | 'input' | 'ring'
  /** When swatch is ring: set --tw-ring-color (default uses ring-ring → --ring) */
  ringCssVar?: `--${string}`
  /** On fill swatches: show paired “on-” color (square + label), e.g. foreground on background */
  onPair?: { cssVar: `--${string}`; label: string }
  /** Optional label to render inside the swatch, tinted by `textCssVar`. */
  swatchTextLabel?: string
  /** When `swatchTextLabel` is set, this color is applied to the text. */
  textCssVar?: `--${string}`
}

const SEMANTIC_COLORS: SemanticColor[] = [
  {
    label: 'Background',
    cssVar: '--background',
    tailwindClass: 'bg-background',
    swatch: 'fill',
    onPair: { cssVar: '--foreground', label: 'Foreground' },
  },
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
    label: 'Muted',
    cssVar: '--muted',
    tailwindClass: 'bg-muted',
    swatch: 'fill',
    onPair: { cssVar: '--muted-foreground', label: 'Muted foreground' },
  },
  {
    label: 'Popover',
    cssVar: '--popover',
    tailwindClass: 'bg-popover',
    swatch: 'fill',
    onPair: { cssVar: '--popover-foreground', label: 'Popover foreground' },
  },
  {
    label: 'Card',
    cssVar: '--card',
    tailwindClass: 'bg-card',
    swatch: 'fill',
    onPair: { cssVar: '--card-foreground', label: 'Card foreground' },
  },
  { label: 'Border', cssVar: '--border', tailwindClass: 'border-border', swatch: 'border' },
  { label: 'Input', cssVar: '--input', tailwindClass: 'border-input', swatch: 'input' },
  { label: 'Ring', cssVar: '--ring', tailwindClass: 'ring-ring', swatch: 'ring' },
]

const SIDEBAR_COLORS: SemanticColor[] = [
  {
    label: 'Sidebar',
    cssVar: '--sidebar',
    tailwindClass: 'bg-sidebar',
    swatch: 'fill',
    swatchTextLabel: 'Sidebar foreground',
    textCssVar: '--sidebar-foreground',
  },
  {
    label: 'Sidebar Primary',
    cssVar: '--sidebar-primary',
    tailwindClass: 'bg-sidebar-primary',
    swatch: 'fill',
    swatchTextLabel: 'Sidebar Primary',
    textCssVar: '--sidebar-primary',
  },
  {
    label: 'Sidebar Accent',
    cssVar: '--sidebar-accent',
    tailwindClass: 'bg-sidebar-accent',
    swatch: 'fill',
    swatchTextLabel: 'Sidebar Accent',
    textCssVar: '--sidebar-accent',
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
  const [rawVar, setRawVar] = React.useState<string>('—')

  const paint = React.useCallback(() => {
    const root = getComputedStyle(document.documentElement)
    setRawVar(root.getPropertyValue(item.cssVar).trim() || '—')
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
        <div className={cn(typeToken("text-sm/medium"), "truncate leading-tight")}>{item.cssVar}</div>
        <div className="truncate text-[11px] leading-snug text-muted-foreground">{item.label}</div>
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
                className={cn(typeToken("text-sm/semibold"), "tracking-tight")}
                style={{ color: `var(${item.onPair.cssVar})` }}
              >
                {item.onPair.label}
              </span>
            </div>
          ) : item.swatch === 'fill' && item.swatchTextLabel && item.textCssVar ? (
            <div className="flex min-h-[88px] items-center justify-center px-3">
              <span
                className={cn(typeToken("text-sm/semibold"), "tracking-tight")}
                style={{ color: `var(${item.textCssVar})` }}
              >
                {item.swatchTextLabel}
              </span>
            </div>
          ) : null}
        </div>
        <div className="space-y-0.5 text-[11px] text-muted-foreground">
          <div>
            <span className="font-medium text-foreground">CSS value</span>{' '}
            <code className="break-all">{rawVar}</code>
          </div>
        </div>
      </div>
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
        <table className={cn(typeToken("text-sm/normal"), "w-full min-w-[640px] text-left")}>
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
                  <td className={cn(typeToken("text-xs/normal"), "px-3 py-2 font-mono text-foreground-emphasis-low")}>
                    {r ? `${step} → ${r.pPx}` : '…'}
                  </td>
                  <td className="px-3 py-2">
                    <code className={typeToken("text-xs/normal")}>{SPACING_STEP_TO_PADDING[step]}</code>
                  </td>
                  <td className="px-3 py-2 font-mono text-[11px] text-foreground-emphasis-low">
                    {r ? (
                      <>
                        <code className={cn(typeToken("text-xs/normal"), "text-foreground")}>{SPACING_STEP_TO_GAP[step]}</code>
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
                        <code className={cn(typeToken("text-xs/normal"), "text-foreground")}>{SPACING_STEP_TO_MARGIN[step]}</code>
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
      <table className={cn(typeToken("text-sm/normal"), "w-full min-w-[520px] text-left")}>
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
              <td className={cn(typeToken("text-xs/normal"), "px-3 py-2 font-mono")}>{r.name}</td>
              <td className="px-3 py-2 font-mono text-[11px] text-foreground-emphasis-low">{r.raw}</td>
              <td className={cn(typeToken("text-xs/normal"), "px-3 py-2 font-mono text-foreground-emphasis-low")}>{r.px}</td>
              <td className={cn(typeToken("text-xs/normal"), "px-3 py-2 text-foreground-emphasis-low")}>{r.note ?? '—'}</td>
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
      <table className={cn(typeToken("text-sm/normal"), "w-full min-w-[640px] text-left")}>
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
              <td className={cn(typeToken("text-xs/normal"), "px-3 py-2 font-mono")}>{r.name}</td>
              <td className="px-3 py-2 font-mono text-[11px] text-foreground-emphasis-low">{r.tailwindClass}</td>
              <td className={cn(typeToken("text-10/normal"), "max-w-[180px] px-3 py-2 font-mono leading-snug text-foreground-emphasis-low")}>
                <span className="line-clamp-3" title={r.raw}>
                  {r.raw}
                </span>
              </td>
              <td className={cn(typeToken("text-10/normal"), "max-w-[220px] px-3 py-2 font-mono leading-snug text-foreground-emphasis-low")}>
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
          <h2 className={cn(typeToken("text-lg/semibold"), "tracking-tight")}>{title}</h2>
          <p className={cn(typeToken("text-sm/normal"), "mt-1 max-w-2xl text-foreground-emphasis-medium")}>{description}</p>
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

  return (
    <PepDesignSystemPage title="Theme showcase">
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

        <h3 className={cn(typeToken("text-sm/semibold"), "mt-10 mb-1 tracking-tight text-foreground")}>Sidebar</h3>
        <p className={cn(typeToken("text-sm/normal"), "mb-4 text-foreground-emphasis-medium")}>
          Tokens from <code className={cn(typeToken("text-xs/normal"), "rounded bg-muted px-1")}>--sidebar*</code> /{' '}
          <code className={cn(typeToken("text-xs/normal"), "rounded bg-muted px-1")}>@theme</code> color mappings.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SIDEBAR_COLORS.map((item) => (
            <ColorSwatch key={item.cssVar} item={item} />
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
              <code className={cn(typeToken("text-xs/normal"), "rounded bg-muted px-1")}>var(--opacity-emphasis-*)</code> or the utilities below.
            </>
          }
        />
        <div className="overflow-x-auto rounded-lg border">
          <table className={cn(typeToken("text-sm/normal"), "w-full min-w-[520px] text-left")}>
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
                <td className={cn(typeToken("text-xs/normal"), "px-3 py-2 font-mono")}>--opacity-emphasis-high</td>
                <td className="px-3 py-2 text-foreground">0.87 (87%)</td>
                <td className="px-3 py-2 font-mono text-[11px] text-foreground-emphasis-low">
                  .opacity-emphasis-high · .text-foreground-emphasis-high
                </td>
              </tr>
              <tr className="border-b border-border/80">
                <td className="px-3 py-2 font-medium">Medium</td>
                <td className={cn(typeToken("text-xs/normal"), "px-3 py-2 font-mono")}>--opacity-emphasis-medium</td>
                <td className="px-3 py-2 text-foreground">0.6 (60%)</td>
                <td className="px-3 py-2 font-mono text-[11px] text-foreground-emphasis-low">
                  .opacity-emphasis-medium · .text-foreground-emphasis-medium
                </td>
              </tr>
              <tr className="border-b border-border/80 last:border-0">
                <td className="px-3 py-2 font-medium">Low</td>
                <td className={cn(typeToken("text-xs/normal"), "px-3 py-2 font-mono")}>--opacity-emphasis-low</td>
                <td className="px-3 py-2 text-foreground">0.4 (40%)</td>
                <td className="px-3 py-2 font-mono text-[11px] text-foreground-emphasis-low">
                  .opacity-emphasis-low · .text-foreground-emphasis-low
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={cn(typeToken("text-sm/normal"), "mt-3 text-foreground-emphasis-medium")}>
          Icons: use <code className={cn(typeToken("text-xs/normal"), "rounded bg-muted px-1")}>opacity-emphasis-*</code> on the SVG wrapper, or{' '}
          <code className={cn(typeToken("text-xs/normal"), "rounded bg-muted px-1")}>
            {`style={{ opacity: 'var(--opacity-emphasis-medium)' }}`}
          </code>
          . Text: prefer <code className={cn(typeToken("text-xs/normal"), "rounded bg-muted px-1")}>text-foreground-emphasis-*</code> so only the
          ink fades (not layout).
        </p>
        <div className="mt-4 rounded-lg border bg-card p-4">
          <div className={cn(typeToken("text-xs/medium"), "mb-2 text-foreground-emphasis-low")}>
            Examples (explicit classes — not global defaults)
          </div>
          <div className={cn(typeToken("text-sm/normal"), "flex flex-col gap-3")}>
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

      <section className="mb-6">
        <SectionHeader
          icon={Ruler}
          title="Padding, gap, margin & radius"
          description={
            <>
              Tailwind spacing scale: each step is <code className={cn(typeToken("text-xs/normal"), "rounded bg-muted px-1")}>0.25rem</code> per
              unit (default). Example at 16px root:{' '}
              <code className={cn(typeToken("text-xs/normal"), "rounded bg-muted px-1")}>1 → 4px</code>,{' '}
              <code className={cn(typeToken("text-xs/normal"), "rounded bg-muted px-1")}>2 → 8px</code>. Values below are{' '}
              <strong className="font-medium text-foreground">measured in your browser</strong>.
            </>
          }
        />
        <h3 className={cn(typeToken("text-sm/medium"), "mb-3 text-foreground-emphasis-low")}>Spacing scale</h3>
        <SpacingScaleTable />
        <h3 className={cn(typeToken("text-sm/medium"), "mb-3 mt-10 text-foreground-emphasis-low")}>Radius variables</h3>
        <RadiusTable theme={theme} />

        <div className="mb-3 mt-10 flex items-start gap-3">
          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Layers className="size-4 text-foreground opacity-emphasis-low" aria-hidden />
          </div>
          <div>
            <h3 className={cn(typeToken("text-sm/semibold"), "tracking-tight text-foreground")}>Elevation tokens</h3>
            <p className={cn(typeToken("text-sm/normal"), "mt-1 max-w-2xl text-foreground-emphasis-medium")}>
              Semantic <code className={cn(typeToken("text-xs/normal"), "rounded bg-muted px-1")}>--elevation-*</code> box shadows; mapped in{' '}
              <code className={cn(typeToken("text-xs/normal"), "rounded bg-muted px-1")}>@theme</code> as{' '}
              <code className={cn(typeToken("text-xs/normal"), "rounded bg-muted px-1")}>shadow-elevation-*</code>. Values differ in{' '}
              <code className={cn(typeToken("text-xs/normal"), "rounded bg-muted px-1")}>.dark</code> for visible depth on dark surfaces.
            </p>
          </div>
        </div>
        <ElevationTable theme={theme} />

        <div className="mt-6 flex flex-wrap gap-2 rounded-lg border bg-muted/20 p-4">
          <Button size="xs">Button radius</Button>
          <Card className="border-0 py-3 shadow-none ring-1 ring-border">
            <CardContent className={cn(typeToken("text-sm/normal"), "py-0")}>Card sample</CardContent>
          </Card>
        </div>
      </section>
    </PepDesignSystemPage>
  )
}
