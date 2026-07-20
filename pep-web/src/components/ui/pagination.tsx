import type { ComponentProps } from "react"
import {
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { typeToken } from "@/data/typography-tokens"

/** Figma Pagination Item — 30×30 bordered square (node 2648:238). */
function PaginationButton({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon-xs"
      data-slot="pagination-button"
      className={cn(
        "size-[30px] shrink-0 rounded-md border-border bg-background shadow-none",
        "hover:bg-muted hover:text-foreground",
        "disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

function PaginationFirst({ className, ...props }: ComponentProps<typeof PaginationButton>) {
  return (
    <PaginationButton aria-label="Go to first page" className={className} {...props}>
      <ChevronFirstIcon className="size-4" />
    </PaginationButton>
  )
}

function PaginationPrevious({ className, ...props }: ComponentProps<typeof PaginationButton>) {
  return (
    <PaginationButton aria-label="Go to previous page" className={className} {...props}>
      <ChevronLeftIcon className="size-4" />
    </PaginationButton>
  )
}

function PaginationNext({ className, ...props }: ComponentProps<typeof PaginationButton>) {
  return (
    <PaginationButton aria-label="Go to next page" className={className} {...props}>
      <ChevronRightIcon className="size-4" />
    </PaginationButton>
  )
}

function PaginationLast({ className, ...props }: ComponentProps<typeof PaginationButton>) {
  return (
    <PaginationButton aria-label="Go to last page" className={className} {...props}>
      <ChevronLastIcon className="size-4" />
    </PaginationButton>
  )
}

function PaginationPageInput({
  className,
  ...props
}: ComponentProps<typeof Input>) {
  return (
    <Input
      type="text"
      inputMode="numeric"
      aria-label="Current page"
      data-slot="pagination-page-input"
      className={cn(
        "h-9 w-10 shrink-0 rounded-md px-2 text-center tabular-nums text-muted-foreground",
        className,
      )}
      {...props}
    />
  )
}

function PaginationRowsSelect({
  className,
  ...props
}: ComponentProps<"select">) {
  return (
    <div className={cn("relative w-[77px] shrink-0", className)}>
      <select
        data-slot="pagination-rows-select"
        aria-label="Rows per page"
        className={cn(
          "h-9 w-full appearance-none rounded-md border border-input bg-background py-1.5 pr-7 pl-2",
          "text-sm text-muted-foreground outline-none",
          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}
        {...props}
      />
      <ChevronDownIcon
        className="pointer-events-none absolute top-1/2 right-2 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
    </div>
  )
}

function PaginationNavGroup({
  className,
  canGoPrevious,
  canGoNext,
  onFirst,
  onPrevious,
  onNext,
  onLast,
}: {
  className?: string
  canGoPrevious?: boolean
  canGoNext?: boolean
  onFirst?: () => void
  onPrevious?: () => void
  onNext?: () => void
  onLast?: () => void
}) {
  return (
    <div
      data-slot="pagination-nav"
      className={cn("flex items-center gap-2", className)}
    >
      <PaginationFirst disabled={!canGoPrevious} onClick={onFirst} />
      <PaginationPrevious disabled={!canGoPrevious} onClick={onPrevious} />
      <PaginationNext disabled={!canGoNext} onClick={onNext} />
      <PaginationLast disabled={!canGoNext} onClick={onLast} />
    </div>
  )
}

function PaginationPageStatus({
  page,
  pageCount,
  onPageChange,
  className,
}: {
  page: number
  pageCount: number
  onPageChange?: (page: number) => void
  className?: string
}) {
  return (
    <div
      data-slot="pagination-page-status"
      className={cn("flex items-center gap-2", className)}
    >
      <PaginationPageInput
        value={String(page)}
        onChange={(e) => {
          const next = Number.parseInt(e.target.value, 10)
          if (!Number.isFinite(next) || !onPageChange) return
          onPageChange(Math.min(Math.max(1, next), pageCount))
        }}
      />
      <span className={cn(typeToken("text-xs/medium"), "whitespace-nowrap text-foreground")}>
        of {pageCount}
      </span>
    </div>
  )
}

export type PepPaginationProps = {
  /** Figma Long=Yes includes rows-per-page; Long=No is controls + page status only. */
  variant?: "long" | "short"
  page: number
  pageCount: number
  pageSize?: number
  pageSizeOptions?: number[]
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
  className?: string
}

/**
 * PEP table pagination — Figma `Pagination` Long=Yes / Long=No
 * https://www.figma.com/design/bRDWHAITfr5p6onqnKTf0q/--PEP-Web_Library?node-id=5153-2867
 */
function PepPagination({
  variant = "long",
  page,
  pageCount,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  onPageChange,
  onPageSizeChange,
  className,
}: PepPaginationProps) {
  const canGoPrevious = page > 1
  const canGoNext = page < pageCount

  const nav = (
    <PaginationNavGroup
      className={variant === "short" ? "gap-1" : "gap-2"}
      canGoPrevious={canGoPrevious}
      canGoNext={canGoNext}
      onFirst={() => onPageChange?.(1)}
      onPrevious={() => onPageChange?.(Math.max(1, page - 1))}
      onNext={() => onPageChange?.(Math.min(pageCount, page + 1))}
      onLast={() => onPageChange?.(pageCount)}
    />
  )

  const status = (
    <PaginationPageStatus
      page={page}
      pageCount={pageCount}
      onPageChange={onPageChange}
    />
  )

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pep-pagination"
      data-variant={variant}
      className={cn(
        "flex items-center py-2",
        variant === "long" ? "justify-center gap-6" : "w-full justify-between",
        className,
      )}
    >
      {variant === "long" ? (
        <>
          <div className="flex items-center gap-2">
            <span className={cn(typeToken("text-xs/medium"), "whitespace-nowrap text-foreground")}>
              Row per page
            </span>
            <PaginationRowsSelect
              value={pageSize}
              onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
            >
              {pageSizeOptions.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </PaginationRowsSelect>
          </div>
          {nav}
          {status}
        </>
      ) : (
        <>
          {nav}
          {status}
        </>
      )}
    </nav>
  )
}

export {
  PepPagination,
  PaginationButton,
  PaginationFirst,
  PaginationPrevious,
  PaginationNext,
  PaginationLast,
  PaginationPageInput,
  PaginationRowsSelect,
  PaginationNavGroup,
  PaginationPageStatus,
}
