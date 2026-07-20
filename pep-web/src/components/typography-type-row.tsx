import * as React from "react"

import { TYPE_DEMO_MIXED, type TypeToken } from "@/data/typography-tokens"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

export function TypographyTypeRow({ token }: { token: TypeToken }) {
  const ref = React.useRef<HTMLParagraphElement>(null)
  const [info, setInfo] = React.useState("—")

  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const cs = getComputedStyle(el)
    const ff = cs.fontFamily.split(",")[0]?.trim() ?? cs.fontFamily
    setInfo(`${ff} · ${cs.fontSize} / ${cs.lineHeight} · ${cs.fontWeight}`)
  }, [token.className, token.id])

  return (
    <div className="flex flex-col gap-1 rounded-lg border bg-card/50 px-3 py-2 sm:flex-row sm:items-baseline sm:justify-between">
      <div className="min-w-0">
        <div className="text-[11px] font-medium text-foreground">
          {token.id}{" "}
          <span className="font-normal text-muted-foreground">
            ({token.size} · {token.weight})
          </span>
        </div>
        <p ref={ref} className={`mt-1 ${token.className}`}>
          {TYPE_DEMO_MIXED}
        </p>
        <code className={cn(typeToken("text-10/normal"), "mt-1 block text-muted-foreground")}>{token.className}</code>
      </div>
      <div className={cn(typeToken("text-10/normal"), "shrink-0 text-muted-foreground sm:max-w-[40%] sm:text-right")}>
        <code>{info}</code>
      </div>
    </div>
  )
}
