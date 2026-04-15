import { CalendarIcon, ChevronDown, X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { inputSurfaceClassName } from '@/lib/input-surface-classes'
import { cn } from '@/lib/utils'

export const filterGroupFieldShellRow = cn(
  inputSurfaceClassName,
  'flex h-9 min-h-9 cursor-default items-center gap-1.5 py-0 pr-3 pl-3 shadow-elevation-sm',
)

type FilterGroupDialogFieldsProps = {
  name: string
  onNameChange: (value: string) => void
}

export function FilterGroupDialogFields({ name, onNameChange }: FilterGroupDialogFieldsProps) {
  return (
    <>
      <div className="px-6 pt-0 pb-4">
        <div className="flex flex-col gap-2">
          <div className="text-xs font-medium text-foreground">Filter Group Name</div>
          <Input
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Input Value"
            className="h-9 min-h-9 shadow-elevation-sm"
            autoComplete="off"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 px-6 pb-6">
        <div className="flex flex-col gap-2">
          <div className="min-w-[100px] max-w-[100px] text-xs font-medium text-foreground">
            {'\u767c\u4f48\u6642\u9593'}
          </div>
          <div className={cn(filterGroupFieldShellRow, 'justify-between')}>
            <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">DateRange</span>
            <CalendarIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="min-w-[100px] max-w-[100px] text-xs font-medium text-foreground">
            {'\u8209\u884c\u6642\u9593'}
          </div>
          <div className={cn(filterGroupFieldShellRow, 'justify-between')}>
            <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">DateRange</span>
            <CalendarIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="min-w-[100px] max-w-[100px] text-xs font-medium text-foreground">Num</div>
          <div className="flex h-9 min-h-9 items-center gap-1 shadow-elevation-sm">
            <Input
              placeholder="Min"
              className="h-9 min-h-9 min-w-[140px] flex-1 shadow-elevation-sm"
              readOnly
              aria-readonly
            />
            <span className="shrink-0 px-0.5 text-sm text-muted-foreground">-</span>
            <Input
              placeholder="Max"
              className="h-9 min-h-9 min-w-[140px] flex-1 shadow-elevation-sm"
              readOnly
              aria-readonly
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="min-w-[100px] max-w-[100px] text-xs font-medium text-foreground">
            {'\u72c0\u614b'}
          </div>
          <div
            className={cn(
              filterGroupFieldShellRow,
              'min-h-9 gap-1.5 py-2 pl-2 pr-3',
              'flex flex-wrap items-center justify-between',
            )}
          >
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
              <Badge
                className={cn(
                  'h-5 rounded-[10px] border-transparent px-1 py-0.5 text-xs font-medium',
                  'bg-primary/15 text-primary hover:bg-primary/20',
                )}
              >
                {'\u767c\u4f48\u4e2d'}
              </Badge>
              <Badge
                className={cn(
                  'h-5 rounded-[10px] border-transparent px-1 py-0.5 text-xs font-medium',
                  'bg-fuchsia-500/15 text-fuchsia-700 dark:bg-fuchsia-500/20 dark:text-fuchsia-300',
                )}
              >
                {'\u622a\u6b62\u5831\u540d'}
              </Badge>
              <Badge
                className={cn(
                  'h-5 rounded-[10px] border-transparent px-1 py-0.5 text-xs font-medium',
                  'bg-primary/15 text-primary hover:bg-primary/20',
                )}
              >
                Badge
              </Badge>
            </div>
            <div className="flex shrink-0 items-center gap-0.5">
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                className="size-5 text-muted-foreground opacity-50 hover:opacity-100"
                aria-label="Clear selection"
                disabled
              >
                <X className="size-3.5" aria-hidden />
              </Button>
              <ChevronDown className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
