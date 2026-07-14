import * as React from "react"

import { TypographySamplePreview } from "@/components/typography-sample-preview"
import type { TypographySample } from "@/data/typography-samples"

export function TypographyTypeRow({ sample }: { sample: TypographySample }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [info, setInfo] = React.useState("—")

  React.useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    const el = (
      sample.measureSelector
        ? root.querySelector(sample.measureSelector)
        : root.firstElementChild
    ) as HTMLElement | null
    if (!el) return
    const cs = getComputedStyle(el)
    const ff = cs.fontFamily.split(",")[0]?.trim() ?? cs.fontFamily
    setInfo(`${ff} · ${cs.fontSize} / ${cs.lineHeight}`)
  }, [sample.className, sample.id, sample.measureSelector])

  const codeDisplay = sample.codeSnippet ?? sample.className

  return (
    <div className="flex flex-col gap-1 rounded-lg border bg-card/50 px-3 py-2 sm:flex-row sm:items-baseline sm:justify-between">
      <div className="min-w-0">
        <div className="text-[11px] font-medium text-foreground-emphasis-low">
          {sample.label}{" "}
          <span className="font-normal text-muted-foreground">({sample.m3Label})</span>
        </div>
        <div ref={ref} className="mt-1">
          <TypographySamplePreview sample={sample} />
        </div>
        <code className="mt-1 block whitespace-pre-wrap text-[10px] text-foreground-emphasis-low">
          {codeDisplay}
        </code>
      </div>
      <div className="shrink-0 text-[10px] text-foreground-emphasis-low sm:max-w-[45%] sm:text-right">
        <code>{info}</code>
      </div>
    </div>
  )
}
