import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

type ScrollAreaProps = React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
  /** Place the vertical scrollbar on the start edge (left in LTR). Uses Radix `dir` internally; content stays LTR unless you nest your own `dir`. */
  scrollbarLeft?: boolean
}

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, scrollbarLeft, dir, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    dir={scrollbarLeft ? "rtl" : dir}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit] [&>div]:!block">
      {scrollbarLeft ? (
        <div dir="ltr" className="min-w-0">
          {children}
        </div>
      ) : (
        children
      )}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar scrollbarLeft={scrollbarLeft} />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

type ScrollBarProps = React.ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.ScrollAreaScrollbar
> & {
  scrollbarLeft?: boolean
}

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ScrollBarProps
>(({ className, orientation = "vertical", scrollbarLeft, ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        cn(
          "h-full w-2 justify-center bg-transparent p-px",
          scrollbarLeft
            ? "border-r border-r-transparent"
            : "border-l border-l-transparent",
        ),
      orientation === "horizontal" &&
        "h-2 w-full flex-col items-center border-t border-t-transparent bg-transparent p-px",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      className={cn(
        "relative flex-1 rounded-full bg-border/65 transition-[background-color]",
        "hover:bg-border/85",
        "dark:bg-border/70 dark:hover:bg-border/90",
      )}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
