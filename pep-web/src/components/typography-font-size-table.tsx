import * as React from "react"

import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

type MeasuredRow = {
  token: string
  fontSize: string
  lineHeight: string
}

/** Explicit class strings so Tailwind JIT keeps them. */
const SIZE_ROWS = [
  { token: "text-xs", className: "text-xs" },
  { token: "text-sm", className: "text-sm" },
  { token: "text-base", className: "text-base" },
  { token: "text-lg", className: "text-lg" },
  { token: "text-xl", className: "text-xl" },
  { token: "text-2xl", className: "text-2xl" },
  { token: "text-3xl", className: "text-3xl" },
  { token: "text-4xl", className: "text-4xl" },
  {
    token: "text-[10px]",
    className: "text-[10px] leading-[12px]",
    note: "PEP ID — use token text-10/normal",
  },
] as const

export function TypographyFontSizeTable() {
  const ref = React.useRef<HTMLDivElement>(null)
  const [rows, setRows] = React.useState<MeasuredRow[]>([])

  React.useLayoutEffect(() => {
    const host = ref.current
    if (!host) return

    setRows(
      SIZE_ROWS.map((entry) => {
        const el = host.querySelector(`[data-font-token="${entry.token}"]`) as HTMLElement | null
        if (!el) {
          return { token: entry.token, fontSize: "—", lineHeight: "—" }
        }
        const cs = getComputedStyle(el)
        return {
          token: entry.token,
          fontSize: cs.fontSize,
          lineHeight: cs.lineHeight,
        }
      }),
    )
  }, [])

  return (
    <div>
      <div ref={ref} className="sr-only" aria-hidden>
        {SIZE_ROWS.map((entry) => (
          <span key={entry.token} data-font-token={entry.token} className={entry.className}>
            Aa
          </span>
        ))}
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className={cn("w-full min-w-[480px] text-left", typeToken("text-sm/normal"))}>
          <thead>
            <tr className="border-b bg-muted/50">
              <th className={cn(typeToken("text-xs/medium"), "px-3 py-2")}>Size token</th>
              <th className={cn(typeToken("text-xs/medium"), "px-3 py-2")}>Font size</th>
              <th className={cn(typeToken("text-xs/medium"), "px-3 py-2")}>Default line-height</th>
              <th className={cn(typeToken("text-xs/medium"), "px-3 py-2")}>Note</th>
            </tr>
          </thead>
          <tbody>
            {SIZE_ROWS.map((entry, index) => {
              const measured = rows[index]
              return (
                <tr key={entry.token} className="border-b border-border/80 last:border-0">
                  <td className={cn("px-3 py-2 font-mono", typeToken("text-xs/normal"))}>{entry.token}</td>
                  <td className={cn("px-3 py-2 font-mono text-muted-foreground", typeToken("text-xs/normal"))}>
                    {measured?.fontSize ?? "—"}
                  </td>
                  <td className={cn("px-3 py-2 font-mono text-muted-foreground", typeToken("text-xs/normal"))}>
                    {measured?.lineHeight ?? "—"}
                  </td>
                  <td className="px-3 py-2 text-[11px] leading-snug text-muted-foreground">
                    {"note" in entry ? entry.note : "—"}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
