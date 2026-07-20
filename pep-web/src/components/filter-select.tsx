import { ChevronDown } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export function FilterSelect<T extends string>({
  value,
  onChange,
  options,
  placeholder,
  className,
}: {
  value: T
  onChange: (v: T) => void
  options: readonly { value: T; label: string }[]
  placeholder: string
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const label = options.find((o) => o.value === value)?.label ?? placeholder
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="xs"
          className={cn("min-w-[8.5rem] justify-between gap-2 font-normal shadow-elevation-sm", className)}
        >
          <span className="truncate">{label}</span>
          <ChevronDown className="size-4 shrink-0 opacity-60" aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[8.5rem] p-1" align="start">
        <div className="flex max-h-64 flex-col gap-0.5 overflow-y-auto" role="listbox">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              role="option"
              aria-selected={value === o.value}
              className={cn(
                "rounded-md px-2 py-1.5 text-left text-sm outline-none transition-colors",
                value === o.value ? "bg-muted font-medium" : "hover:bg-muted/60",
              )}
              onClick={() => {
                onChange(o.value)
                setOpen(false)
              }}
            >
              {o.label}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
