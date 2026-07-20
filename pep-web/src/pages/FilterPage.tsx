import {
  CalendarIcon,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter as FilterIcon,
  GripVertical,
  Menu,
  Pencil,
  Plus,
  Trash2,
  XCircle,
} from 'lucide-react'
import { format } from 'date-fns'
import * as React from 'react'

import { EditFilterGroupDialog } from '@/components/edit-filter-group-dialog'
import { NewFilterGroupDialog } from '@/components/new-filter-group-dialog'
import { SaveFilterGroupDialog } from '@/components/save-filter-group-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { PepDesignSystemPage } from '@/components/pep-chrome'
import { inputSurfaceClassName } from '@/lib/input-surface-classes'
import { cn } from '@/lib/utils'
import { typeToken } from "@/data/typography-tokens"

const INITIAL_SAVED_FILTER_ROWS = [
  { id: '1', label: 'Activity table · Live' },
  { id: '2', label: 'Activity table · Drafts' },
  { id: '3', label: 'Activity table · This week' },
  { id: '4', label: 'Activity table · Open registration' },
  { id: '5', label: 'Activity table · Ended' },
  { id: '6', label: 'Activity table · Online' },
  { id: '7', label: 'Activity table · In person' },
  { id: '8', label: 'Activity table · Pending review' },
  { id: '9', label: 'Activity table · Completed' },
  { id: '10', label: 'Activity table · Team default' },
  { id: '11', label: 'Activity table · Starting soon' },
  { id: '12', label: 'Activity table · Full capacity' },
  { id: '13', label: 'Activity table · Cancelled' },
  { id: '14', label: 'Activity table · Featured' },
  { id: '15', label: 'Activity table · North region' },
  { id: '16', label: 'Activity table · South region' },
  { id: '17', label: 'Activity table · Workshops only' },
  { id: '18', label: 'Activity table · Webinars only' },
  { id: '19', label: 'Activity table · Export CSV' },
  { id: '20', label: 'Activity table · My starred' },
] as const

type SavedFilterRow = { id: string; label: string }

function newSavedFilterId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `new-${Date.now()}`
}

function reorderSavedFilters(rows: SavedFilterRow[], fromId: string, toId: string): SavedFilterRow[] {
  if (fromId === toId) return rows
  const fromIdx = rows.findIndex((r) => r.id === fromId)
  const toIdx = rows.findIndex((r) => r.id === toId)
  if (fromIdx < 0 || toIdx < 0) return rows
  const next = [...rows]
  const [removed] = next.splice(fromIdx, 1)
  next.splice(toIdx, 0, removed)
  return next
}

export function FilterPage() {
  const [filterSheetOpen, setFilterSheetOpen] = React.useState(false)
  const [eventDate, setEventDate] = React.useState<Date | undefined>(undefined)
  const [savedFiltersOpen, setSavedFiltersOpen] = React.useState(false)
  const [savedFilterRows, setSavedFilterRows] = React.useState<SavedFilterRow[]>(() => [
    ...INITIAL_SAVED_FILTER_ROWS,
  ])
  const [selectedFilterId, setSelectedFilterId] = React.useState<string>('1')
  const [draggingId, setDraggingId] = React.useState<string | null>(null)
  const [dragOverId, setDragOverId] = React.useState<string | null>(null)
  const [editFilterOpen, setEditFilterOpen] = React.useState(false)
  const [editingFilterId, setEditingFilterId] = React.useState<string | null>(null)
  const [newFilterOpen, setNewFilterOpen] = React.useState(false)
  const [saveFilterOpen, setSaveFilterOpen] = React.useState(false)

  /** Nested filter dialogs portal outside the sheet; Radix can treat that as “outside” and close the sheet. */
  const childFilterDialogOpenRef = React.useRef(false)
  /** Ignore the next spurious sheet dismiss while opening a child dialog from inside the sheet. */
  const suppressNextSheetDismissRef = React.useRef(false)
  React.useEffect(() => {
    const open = editFilterOpen || newFilterOpen || saveFilterOpen
    childFilterDialogOpenRef.current = open
    if (open) suppressNextSheetDismissRef.current = false
  }, [editFilterOpen, newFilterOpen, saveFilterOpen])

  const handleSheetOpenChange = React.useCallback((open: boolean) => {
    if (!open) {
      if (suppressNextSheetDismissRef.current) {
        suppressNextSheetDismissRef.current = false
        return
      }
      if (childFilterDialogOpenRef.current) return
    }
    setFilterSheetOpen(open)
  }, [])

  const editingFilterLabel =
    editingFilterId === null
      ? ''
      : (savedFilterRows.find((r) => r.id === editingFilterId)?.label ?? '')

  return (
    <PepDesignSystemPage
      title="Filter"
      className="min-h-0 flex-1"
      contentClassName="flex min-h-0 flex-1 flex-col pt-4 pb-4"
    >
      <div className="flex min-h-0 flex-1 flex-col items-stretch">
      <Sheet open={filterSheetOpen} onOpenChange={handleSheetOpenChange} modal={false}>
        <SheetTrigger asChild>
          <Button type="button" variant="outline" className="gap-2">
            <FilterIcon className="size-4 text-muted-foreground" aria-hidden />
            Filter
            <Badge className="ml-1">3</Badge>
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className={cn(
            'bg-sidebar p-0',
            savedFiltersOpen
              ? 'w-[min(100vw,700px)] max-w-[min(100vw,700px)] sm:max-w-[700px]'
              : undefined,
          )}
          onInteractOutside={(e) => {
            if (childFilterDialogOpenRef.current) e.preventDefault()
          }}
        >
          <div className="flex h-full flex-col">
            <SheetHeader className="gap-0 p-0">
              <div className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-2">
                <Button
                  type="button"
                  variant="ghost"
                  aria-expanded={savedFiltersOpen}
                  aria-controls={savedFiltersOpen ? 'filter-saved-list-panel' : undefined}
                  aria-label={savedFiltersOpen ? 'Hide saved filters' : 'Show saved filters'}
                  onClick={() => setSavedFiltersOpen((o) => !o)}
                  className="size-7 shrink-0 rounded-md p-0"
                >
                  <span className="relative inline-flex size-4 items-center justify-center">
                    <Menu className="size-3.5 text-muted-foreground" aria-hidden />
                    {savedFiltersOpen ? (
                      <ChevronLeft
                        className="absolute -right-1.5 -bottom-0.5 size-2.5 text-muted-foreground"
                        aria-hidden
                      />
                    ) : (
                      <ChevronRight
                        className="absolute -right-1.5 -bottom-0.5 size-2.5 text-muted-foreground"
                        aria-hidden
                      />
                    )}
                  </span>
                </Button>
                <SheetTitle className={cn(typeToken("text-xl/medium"), "min-w-0 flex-1 truncate leading-7 text-foreground")}>
                  Filter
                </SheetTitle>
                <Button
                  type="button"
                  variant="Light"
                  aria-label="Add new filter group"
                  className="size-7 shrink-0 rounded-md p-0"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation()
                    suppressNextSheetDismissRef.current = true
                    setEditFilterOpen(false)
                    setEditingFilterId(null)
                    setNewFilterOpen(true)
                  }}
                >
                  <Plus className="size-4" aria-hidden />
                </Button>
              </div>
              <SheetDescription className="sr-only">
                Filter activities, manage saved filter presets, and apply criteria.
              </SheetDescription>
            </SheetHeader>

            <div className="flex min-h-0 min-w-0 flex-1">
              {savedFiltersOpen ? (
                <aside
                  id="filter-saved-list-panel"
                  className="flex min-h-0 min-w-0 max-w-[var(--filter-saved-menu-max-width)] flex-1 basis-0 flex-col border-r border-border bg-muted"
                >
                  <ScrollArea scrollbarLeft className="min-h-0 min-w-0 flex-1">
                    <div className="space-y-1 p-4">
                    <p className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>First preset is the default</p>
                    {savedFilterRows.map((row) => {
                      const selected = row.id === selectedFilterId
                      return (
                        <div
                          key={row.id}
                          role="button"
                          tabIndex={0}
                          draggable
                          aria-grabbed={draggingId === row.id}
                          onClick={() => setSelectedFilterId(row.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              setSelectedFilterId(row.id)
                            }
                          }}
                          onDragStart={(e) => {
                            e.dataTransfer.setData('text/plain', row.id)
                            e.dataTransfer.effectAllowed = 'move'
                            setDraggingId(row.id)
                          }}
                          onDragEnd={() => {
                            setDraggingId(null)
                            setDragOverId(null)
                          }}
                          onDragOver={(e) => {
                            e.preventDefault()
                            e.dataTransfer.dropEffect = 'move'
                            setDragOverId(row.id)
                          }}
                          onDragLeave={(e) => {
                            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                              setDragOverId(null)
                            }
                          }}
                          onDrop={(e) => {
                            e.preventDefault()
                            const fromId = e.dataTransfer.getData('text/plain')
                            if (fromId) {
                              setSavedFilterRows((prev) => reorderSavedFilters(prev, fromId, row.id))
                            }
                            setDragOverId(null)
                            setDraggingId(null)
                          }}
                          className={cn(
                            /* Figma Menu Item 1566:39235 — 36px row, radius/lg 10px, pl-3 pr-2 py-2, hover shadow/md */
                            'group relative flex h-9 w-full min-w-0 cursor-grab items-center rounded-[10px] border border-border bg-background py-2 pl-3 pr-2 text-left text-sm outline-none transition-shadow select-none active:cursor-grabbing',
                            'hover:shadow-elevation-md',
                            'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
                            draggingId === row.id && 'opacity-50',
                            dragOverId === row.id && draggingId !== row.id && 'border-primary ring-2 ring-primary/25',
                          )}
                        >
                          <span
                            className={cn(
                              'relative z-0 min-w-0 flex-1 truncate pr-2',
                              selected
                                ? 'pr-7 font-medium text-primary group-hover:pr-2'
                                : 'text-foreground',
                            )}
                          >
                            {row.label}
                          </span>
                          {selected ? (
                            <Check
                              className="pointer-events-none absolute right-2 top-1/2 z-[1] size-4 -translate-y-1/2 text-primary opacity-100 transition-opacity group-hover:opacity-0"
                              aria-hidden
                            />
                          ) : null}
                          {/* Hover overlay: left drag strip + right actions (Figma inset overlay, blurred scrims) */}
                          <div
                            className={cn(
                              'pointer-events-none absolute inset-0 z-10 flex items-stretch justify-between opacity-0 transition-opacity',
                              'group-hover:opacity-100',
                            )}
                          >
                            <div
                              className="pointer-events-auto relative flex w-6 shrink-0 items-center justify-center"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div
                                className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-background blur-[5px]"
                                aria-hidden
                              />
                              <GripVertical
                                className="relative z-[1] size-3 text-muted-foreground"
                                aria-hidden
                              />
                            </div>
                            <div className="pointer-events-none min-h-0 min-w-0 flex-1" aria-hidden />
                            <div
                              className="pointer-events-auto relative flex shrink-0 items-center gap-1 py-1 pr-1 pl-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div
                                className="pointer-events-none absolute inset-y-0 right-0 w-[60px] bg-background blur-[5px]"
                                aria-hidden
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-xs"
                                className="relative z-[1] size-6 rounded-md"
                                draggable={false}
                                aria-label={`Edit ${row.label}`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  suppressNextSheetDismissRef.current = true
                                  setEditingFilterId(row.id)
                                  setEditFilterOpen(true)
                                }}
                              >
                                <Pencil className="size-3" aria-hidden />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon-xs"
                                className="relative z-[1] size-6 rounded-md text-destructive hover:text-destructive"
                                draggable={false}
                                aria-label={`Delete ${row.label}`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Trash2 className="size-3" aria-hidden />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    </div>
                  </ScrollArea>
                </aside>
              ) : null}

              <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                <div className="flex-1 space-y-4 overflow-hidden p-5">
                  <div className="space-y-2">
                    <div className={cn(typeToken("text-sm/semibold"), "text-foreground")}>
                      {'\u767c\u4f48\u6642\u9593'}
                    </div>
                    <div
                      className={cn(inputSurfaceClassName, 'relative flex items-center shadow-elevation-sm')}
                    >
                      <Input
                        type="time"
                        defaultValue="09:30"
                        className={cn(
                          'h-auto min-h-0 w-full border-0 bg-transparent px-0 py-0 text-base tabular-nums shadow-none focus-visible:ring-0 hover:shadow-none md:text-sm',
                          '[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer',
                        )}
                      />
                      <Clock
                        className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground opacity-60"
                        aria-hidden
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className={cn(typeToken("text-sm/semibold"), "text-foreground")}>
                      {'\u8209\u884c\u6642\u9593'}
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          className={cn(
                            inputSurfaceClassName,
                            'justify-between text-left font-normal shadow-elevation-sm',
                            !eventDate && 'text-muted-foreground',
                            'hover:bg-transparent active:bg-transparent',
                          )}
                        >
                          <span className="truncate">
                            {eventDate ? format(eventDate, 'MMM dd, yyyy') : 'Date'}
                          </span>
                          <CalendarIcon className="size-4 text-muted-foreground/60" aria-hidden />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-auto p-2" sideOffset={8}>
                        <Calendar
                          mode="single"
                          selected={eventDate}
                          onSelect={setEventDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <div className={cn(typeToken("text-sm/semibold"), "text-foreground")}>Num</div>
                    <div className="flex items-center gap-2">
                      <Input placeholder="Min" className="shadow-elevation-sm" />
                      <span className={cn(typeToken("text-sm/normal"), "text-muted-foreground")}>-</span>
                      <Input placeholder="Max" className="shadow-elevation-sm" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className={cn(typeToken("text-sm/semibold"), "text-foreground")}>
                      {'\u72c0\u614b'}
                    </div>
                    <div
                      className={cn(
                        inputSurfaceClassName,
                        'flex flex-wrap items-center gap-1.5 py-1.5 shadow-elevation-sm',
                      )}
                    >
                      <Badge className="bg-primary/15 text-primary hover:bg-primary/20">
                        {'\u767c\u4f48\u4e2d'}
                      </Badge>
                      <Badge className="bg-fuchsia-500/15 text-fuchsia-600 hover:bg-fuchsia-500/20 dark:text-fuchsia-400">
                        {'\u622a\u6b62\u5831\u540d'}
                      </Badge>
                      <Badge className="bg-sky-500/15 text-sky-700 hover:bg-sky-500/20 dark:text-sky-300">
                        Badge
                      </Badge>
                      <div className="ml-auto inline-flex items-center gap-2 pl-2">
                        <XCircle className="size-5 text-muted-foreground/70" aria-hidden />
                        <ChevronDown className="size-5 text-muted-foreground/70" aria-hidden />
                      </div>
                    </div>
                  </div>
                </div>

                <SheetFooter className="bg-sidebar">
                  <div className="flex w-full items-center justify-center gap-6">
                    <Button type="button" variant="ghost" className="px-0 text-foreground">
                      Clear all
                    </Button>
                    <Button
                      type="button"
                      variant="Light"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation()
                        suppressNextSheetDismissRef.current = true
                        setSaveFilterOpen(true)
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      type="button"
                      variant="default"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation()
                        setFilterSheetOpen(false)
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                </SheetFooter>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      </div>

      <EditFilterGroupDialog
        open={editFilterOpen}
        onOpenChange={(open) => {
          setEditFilterOpen(open)
          if (!open) setEditingFilterId(null)
        }}
        initialName={editingFilterLabel}
        onSave={(name) => {
          if (editingFilterId === null) return
          setSavedFilterRows((rows) =>
            rows.map((r) => (r.id === editingFilterId ? { ...r, label: name } : r)),
          )
        }}
        onSaveAndApply={(name) => {
          if (editingFilterId === null) return
          setSavedFilterRows((rows) =>
            rows.map((r) => (r.id === editingFilterId ? { ...r, label: name } : r)),
          )
          setFilterSheetOpen(false)
        }}
      />

      <NewFilterGroupDialog
        open={newFilterOpen}
        onOpenChange={setNewFilterOpen}
        onSave={(label) => {
          const id = newSavedFilterId()
          setSavedFilterRows((rows) => [...rows, { id, label }])
          setSelectedFilterId(id)
        }}
        onSaveAndApply={(label) => {
          const id = newSavedFilterId()
          setSavedFilterRows((rows) => [...rows, { id, label }])
          setSelectedFilterId(id)
          setFilterSheetOpen(false)
        }}
      />

      <SaveFilterGroupDialog
        open={saveFilterOpen}
        onOpenChange={setSaveFilterOpen}
        onSave={(mode, name) => {
          if (mode !== 'new') return
          const label = name.trim().length > 0 ? `Activity table · ${name.trim()}` : 'Activity table · New preset'
          const id = newSavedFilterId()
          setSavedFilterRows((rows) => [...rows, { id, label }])
          setSelectedFilterId(id)
        }}
        onSaveAndApply={(mode, name) => {
          if (mode === 'new') {
            const label = name.trim().length > 0 ? `Activity table · ${name.trim()}` : 'Activity table · New preset'
            const id = newSavedFilterId()
            setSavedFilterRows((rows) => [...rows, { id, label }])
            setSelectedFilterId(id)
          }
          setFilterSheetOpen(false)
        }}
      />
    </PepDesignSystemPage>
  )
}
