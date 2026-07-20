import { PepDesignSystemPage } from "@/components/pep-chrome"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

/**
 * Component → Tooltip — stock shadcn (base-nova) Tooltip.
 * @see https://ui.shadcn.com/docs/components/base/tooltip
 */
export function TooltipsPage() {
  return (
    <PepDesignSystemPage title="Tooltip" contentClassName="space-y-10">
      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>Library</h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-3 text-muted-foreground")}>
          Reference:{" "}
          <a
            href="https://ui.shadcn.com/docs/components/base/tooltip"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            shadcn/ui Tooltip
          </a>
          {" — "}
          Base UI primitive. App is wrapped with{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">TooltipProvider</code>.
        </p>

        <div className="flex flex-col gap-8">
          <div className="space-y-3">
            <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>Default</div>
            <Tooltip>
              <TooltipTrigger
                render={<Button variant="outline" />}
                aria-label="Add to library"
              >
                Hover
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="space-y-3">
            <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>Sides</div>
            <div className="flex flex-wrap gap-2">
              {(["top", "right", "bottom", "left"] as const).map((side) => (
                <Tooltip key={side}>
                  <TooltipTrigger
                    render={<Button variant="outline" className="capitalize" />}
                    aria-label={side}
                  >
                    {side}
                  </TooltipTrigger>
                  <TooltipContent side={side}>
                    <p>Add to library</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PepDesignSystemPage>
  )
}
