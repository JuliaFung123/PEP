import * as React from "react"

import { FONT_SIZE_TOKENS } from "@/data/typography-font-size-tokens"

type MeasuredRow = {
  token: string
  fontSize: string
  lineHeight: string
  typographyRefs?: string[]
  note?: string
}

export function TypographyFontSizeTable() {
  const ref = React.useRef<HTMLDivElement>(null)
  const [rows, setRows] = React.useState<MeasuredRow[]>([])

  React.useLayoutEffect(() => {
    const host = ref.current
    if (!host) return

    const next = FONT_SIZE_TOKENS.map((entry) => {
      const el = host.querySelector(`[data-font-token="${entry.token}"]`) as HTMLElement | null
      if (!el) {
        return {
          token: entry.token,
          fontSize: '—',
          lineHeight: '—',
          typographyRefs: entry.typographyRefs,
          note: entry.note,
        }
      }
      const cs = getComputedStyle(el)
      return {
        token: entry.token,
        fontSize: cs.fontSize,
        lineHeight: cs.lineHeight,
        typographyRefs: entry.typographyRefs,
        note: entry.note,
      }
    })

    setRows(next)
  }, [])

  return (
    <div>
      <div ref={ref} className="sr-only" aria-hidden>
        {FONT_SIZE_TOKENS.map((entry) => (
          <span key={entry.token} data-font-token={entry.token} className={entry.token}>
            Aa
          </span>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-3 py-2 text-xs font-medium">Token</th>
              <th className="px-3 py-2 text-xs font-medium">Font size</th>
              <th className="px-3 py-2 text-xs font-medium">Line height</th>
              <th className="px-3 py-2 text-xs font-medium">Typography library</th>
              <th className="px-3 py-2 text-xs font-medium">Note</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.token} className="border-b border-border/80 last:border-0">
                <td className="px-3 py-2 font-mono text-xs">{row.token}</td>
                <td className="px-3 py-2 font-mono text-xs text-foreground-emphasis-low">{row.fontSize}</td>
                <td className="px-3 py-2 font-mono text-xs text-foreground-emphasis-low">{row.lineHeight}</td>
                <td className="px-3 py-2 text-xs text-foreground-emphasis-low">
                  {row.typographyRefs?.length ? row.typographyRefs.join(', ') : '—'}
                </td>
                <td className="px-3 py-2 text-[11px] leading-snug text-foreground-emphasis-low">
                  {row.note ?? '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
