import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

export type ActivityCardTag = {
  label: string
}

export type ActivityCardProps = {
  title: string
  code: string
  imageSrc?: string
  /** Muted meta before tags (e.g. date range). */
  meta?: string
  /** Secondary muted meta after first divider (e.g. type). */
  metaSecondary?: string
  tags?: ActivityCardTag[]
  statusLabel: string
  liveLabel?: string
  className?: string
}

/**
 * Figma `Card_custom/活動` (2623:118486) — cover + title/code + meta/tags/status.
 * @see https://www.figma.com/design/IZ6algHkFp6Z2a5dYiS1hC/PEP?node-id=2623-118486
 */
export function ActivityCard({
  title,
  code,
  imageSrc,
  meta,
  metaSecondary,
  tags = [],
  statusLabel,
  liveLabel = "Active",
  className,
}: ActivityCardProps) {
  return (
    <article
      data-slot="activity-card"
      className={cn(
        "flex min-w-0 flex-col overflow-hidden rounded-[10px] border border-border bg-card",
        className,
      )}
    >
      <div className="relative h-[200px] w-full shrink-0 overflow-hidden rounded-t-[10px] bg-muted">
        {imageSrc ? (
          <img src={imageSrc} alt="" className="absolute inset-0 size-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted-foreground/15" />
        )}
      </div>

      <div className="flex h-[144px] w-full shrink-0 flex-col gap-2 px-4 py-3">
        <div className="flex min-h-0 max-h-[68px] flex-1 flex-col items-start">
          <p
            className={cn(
              typeToken("text-base/medium"),
              "line-clamp-2 max-h-12 w-full text-card-foreground",
            )}
          >
            {title}
          </p>
          <Badge variant="outline" size="sm" className="mt-0.5 w-fit shrink-0">
            {code}
          </Badge>
        </div>

        <div className="flex flex-wrap content-center items-center gap-x-2 gap-y-1">
          {meta ? (
            <span className={cn(typeToken("text-sm/normal"), "truncate text-muted-foreground")}>
              {meta}
            </span>
          ) : null}
          {meta && metaSecondary ? <MetaDivider /> : null}
          {metaSecondary ? (
            <span className={cn(typeToken("text-sm/normal"), "truncate text-muted-foreground")}>
              {metaSecondary}
            </span>
          ) : null}
          {(meta || metaSecondary) && tags.length > 0 ? <MetaDivider /> : null}
          {tags.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1">
              {tags.map((tag) => (
                <Badge key={tag.label} variant="outline" size="sm">
                  {tag.label}
                </Badge>
              ))}
            </div>
          ) : null}
          {(meta || metaSecondary || tags.length > 0) ? <MetaDivider /> : null}
          <div className="flex items-center gap-2">
            <Badge variant="Light" size="sm">
              {statusLabel}
            </Badge>
            <Tooltip>
              <TooltipTrigger
                className="inline-flex size-4 items-center justify-center"
                aria-label={liveLabel}
              >
                <span className="size-3 rounded-full bg-emerald-500" />
              </TooltipTrigger>
              <TooltipContent>{liveLabel}</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </article>
  )
}

function MetaDivider() {
  return <span className="h-2 w-px shrink-0 bg-border" aria-hidden />
}
