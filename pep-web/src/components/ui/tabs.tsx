import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

function Tabs({ ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" {...props} />
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center text-muted-foreground",
  {
    variants: {
      variant: {
        // Track 36px; p-0.5 → 32px active pill (Figma style=default)
        default: "h-9 rounded-lg bg-muted p-0.5",
        // Figma style=line / Underline — 34px triggers, no muted track
        line: "h-[34px] gap-0 rounded-none bg-transparent p-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    data-slot="tabs-trigger"
    className={cn(
      "inline-flex items-center justify-center gap-2 px-3 text-sm font-medium whitespace-nowrap transition-all outline-none",
      "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
      "disabled:pointer-events-none disabled:opacity-50",
      // default (pill) — Figma Selected on/off style=default
      "group-data-[variant=default]/tabs-list:h-8 group-data-[variant=default]/tabs-list:rounded-md",
      "group-data-[variant=default]/tabs-list:data-[state=active]:bg-background",
      "group-data-[variant=default]/tabs-list:data-[state=active]:text-foreground",
      "group-data-[variant=default]/tabs-list:data-[state=active]:shadow-elevation-sm",
      // line (underline) — Figma style=line; inactive 1px border, active 2px primary
      // https://www.figma.com/design/bRDWHAITfr5p6onqnKTf0q/--PEP-Web_Library?node-id=2737-526
      "group-data-[variant=line]/tabs-list:h-[34px] group-data-[variant=line]/tabs-list:rounded-none",
      "group-data-[variant=line]/tabs-list:border-b group-data-[variant=line]/tabs-list:border-border",
      "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:pt-1.5 group-data-[variant=line]/tabs-list:pb-2",
      "group-data-[variant=line]/tabs-list:shadow-none",
      "group-data-[variant=line]/tabs-list:data-[state=active]:border-b-2",
      "group-data-[variant=line]/tabs-list:data-[state=active]:border-primary",
      "group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent",
      "group-data-[variant=line]/tabs-list:data-[state=active]:pb-[7px]",
      "group-data-[variant=line]/tabs-list:data-[state=active]:text-foreground",
      "group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none",
      className,
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    data-slot="tabs-content"
    className={cn(
      "mt-3 rounded-lg border border-border bg-card p-3 text-sm text-card-foreground shadow-elevation-xs outline-none",
      "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
      className,
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
