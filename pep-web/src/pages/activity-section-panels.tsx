import { MoreHorizontal, Plus } from "lucide-react"
import * as React from "react"

import {
  FieldDate,
  FieldSelect,
  FieldTextarea,
  FieldTime,
} from "@/components/field-library-controls"
import { FormBottom } from "@/components/form-bottom"
import { LibraryField } from "@/components/library-field"
import { PepPopupHeader } from "@/components/pep-chrome"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  TimeslotLocationSection,
  type TimeslotLocationMode,
} from "@/components/timeslot-location-section"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className={cn(typeToken("text-lg/semibold"), "tracking-tight text-foreground")}>
      {children}
    </h2>
  )
}

function MetaStack({ lines }: { lines: string[] }) {
  return (
    <div className="flex flex-col gap-0.5">
      {lines.map((line) => (
        <span key={line} className={cn(typeToken("text-sm/medium"), "text-foreground")}>
          {line}
        </span>
      ))}
    </div>
  )
}

function RowActions() {
  return (
    <Button type="button" variant="ghost" size="icon-xs" aria-label="More">
      <MoreHorizontal aria-hidden />
    </Button>
  )
}

/** Timeslots table — Figma Frame 813:35945 / TableList/活动時間 */
export function TimeslotsPanel({ onAdd }: { onAdd?: () => void }) {
  const rows = [
    {
      id: "1",
      n: "1",
      timeslot: ["2025/12/26", "14:00 – 16:00"],
      location: ["Hall A", "Room 201"],
      capacity: ["80 seats", "Waitlist on"],
    },
    {
      id: "2",
      n: "2",
      timeslot: ["2025/12/27", "10:00 – 12:00"],
      location: ["Online", "Zoom"],
      capacity: ["200 seats"],
    },
    {
      id: "3",
      n: "3",
      timeslot: ["2025/12/28", "19:00 – 21:00"],
      location: ["Hall B"],
      capacity: ["120 seats", "Overbooking +10"],
    },
  ]

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between gap-3 px-3 py-3">
        <p className={cn(typeToken("text-sm/medium"), "text-foreground")}>Timeslots</p>
        <Button type="button" size="sm" className="gap-1.5" onClick={onAdd}>
          <Plus className="size-4" aria-hidden />
          Add
        </Button>
      </div>
      <div className="min-h-0 flex-1 overflow-auto px-2 pb-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox aria-label="Select all timeslots" />
              </TableHead>
              <TableHead className="w-10">#</TableHead>
              <TableHead>Timeslot</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead className="w-12 text-right">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Checkbox aria-label={`Select timeslot ${row.n}`} />
                </TableCell>
                <TableCell className={cn(typeToken("text-sm/medium"), "tabular-nums")}>{row.n}</TableCell>
                <TableCell>
                  <MetaStack lines={row.timeslot} />
                </TableCell>
                <TableCell>
                  <MetaStack lines={row.location} />
                </TableCell>
                <TableCell>
                  <MetaStack lines={row.capacity} />
                </TableCell>
                <TableCell className="text-right">
                  <RowActions />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

/** Ticket list — Figma Frame 477:19789 */
export function TicketsPanel({ onAdd }: { onAdd?: () => void }) {
  const [tab, setTab] = React.useState("all")
  const rows = [
    { id: "1", name: "General Admission", price: "HKD 180", stock: "500" },
    { id: "2", name: "VIP", price: "HKD 480", stock: "80" },
    { id: "3", name: "Student", price: "HKD 120", stock: "200" },
  ]

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-3">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="onsale">On sale</TabsTrigger>
            <TabsTrigger value="hidden">Hidden</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button type="button" size="sm" className="gap-1.5" onClick={onAdd}>
          <Plus className="size-4" aria-hidden />
          Add
        </Button>
      </div>
      <div className="min-h-0 flex-1 overflow-auto px-2 pb-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox aria-label="Select all tickets" />
              </TableHead>
              <TableHead>Ticket</TableHead>
              <TableHead className="w-[140px]">Price</TableHead>
              <TableHead className="w-[100px]">Stock</TableHead>
              <TableHead className="w-12 text-right">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Checkbox aria-label={`Select ${row.name}`} />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className={cn(typeToken("text-sm/medium"), "text-foreground")}>
                      {row.name}
                    </span>
                    <Badge variant="outline" size="sm" className="w-fit">
                      T-{row.id.padStart(4, "0")}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className={cn(typeToken("text-sm/medium"), "text-right tabular-nums")}>
                  {row.price}
                </TableCell>
                <TableCell className={cn(typeToken("text-sm/medium"), "text-right tabular-nums")}>
                  {row.stock}
                </TableCell>
                <TableCell className="text-right">
                  <RowActions />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

/** contact_settings — Figma activities/contact */
export function ContactPanel() {
  return (
    <div className="space-y-6 p-6">
      <LibraryField label="contact_email" htmlFor="contact-email">
        <Input id="contact-email" placeholder="Placeholder" />
      </LibraryField>
      <LibraryField label="contact_phone" htmlFor="contact-phone">
        <Input id="contact-phone" placeholder="Placeholder" />
      </LibraryField>
      <LibraryField label="contact_name" htmlFor="contact-name">
        <Input id="contact-name" placeholder="Placeholder" />
      </LibraryField>
    </div>
  )
}

/** Organizers table — Figma Frame 649:25631 */
export function OrganizersPanel({ onAdd }: { onAdd?: () => void }) {
  const rows = [
    { id: "1", type: "Host", name: "PEP Studio" },
    { id: "2", type: "Partner", name: "Harbour Arts" },
    { id: "3", type: "Sponsor", name: "City Bank" },
  ]

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between gap-3 px-3 py-3">
        <p className={cn(typeToken("text-sm/medium"), "text-foreground")}>Organizers</p>
        <Button type="button" size="sm" className="gap-1.5" onClick={onAdd}>
          <Plus className="size-4" aria-hidden />
          Add
        </Button>
      </div>
      <div className="min-h-0 flex-1 overflow-auto px-2 pb-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[160px]">Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-12 text-right">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className={typeToken("text-sm/medium")}>{row.type}</TableCell>
                <TableCell className={cn(typeToken("text-sm/medium"), "text-foreground")}>
                  {row.name}
                </TableCell>
                <TableCell className="text-right">
                  <RowActions />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

/** additional_info / policy — Figma activities/policy */
export function PolicyPanel() {
  return (
    <div className="space-y-6 p-6">
      <SectionTitle>Cancellation policy</SectionTitle>
      <LibraryField label="policy_title" htmlFor="policy-title" required>
        <Input id="policy-title" placeholder="Placeholder" />
      </LibraryField>
      <LibraryField label="policy_detail" htmlFor="policy-detail">
        <FieldTextarea id="policy-detail" placeholder="Describe refund / transfer rules…" />
      </LibraryField>
      <LibraryField label="notice" htmlFor="policy-notice">
        <FieldTextarea id="policy-notice" placeholder="Optional notice shown to attendees" />
      </LibraryField>
    </div>
  )
}

/** Administrator */
export function AdminPanel() {
  return (
    <div className="space-y-6 p-6">
      <SectionTitle>Administrator</SectionTitle>
      <LibraryField label="owner" htmlFor="admin-owner" required>
        <Input id="admin-owner" placeholder="Owner email" />
      </LibraryField>
      <LibraryField label="editors" htmlFor="admin-editors">
        <Input id="admin-editors" placeholder="Comma-separated emails" />
      </LibraryField>
      <LibraryField label="notes" htmlFor="admin-notes">
        <FieldTextarea id="admin-notes" placeholder="Internal notes" />
      </LibraryField>
    </div>
  )
}

/** SKU / category table — Figma Frame 477:19782 */
export function SkuPanel({ onAdd }: { onAdd?: () => void }) {
  const rows = [
    { id: "1", name: "Standard package", stock: "300" },
    { id: "2", name: "Bundle A", stock: "50" },
  ]
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between gap-3 px-3 py-3">
        <p className={cn(typeToken("text-sm/medium"), "text-foreground")}>SKU</p>
        <Button type="button" size="sm" className="gap-1.5" onClick={onAdd}>
          <Plus className="size-4" aria-hidden />
          Add
        </Button>
      </div>
      <div className="min-h-0 flex-1 overflow-auto px-2 pb-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="w-[120px]">Stock</TableHead>
              <TableHead className="w-12 text-right">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className={cn(typeToken("text-sm/medium"), "text-foreground")}>
                  {row.name}
                </TableCell>
                <TableCell className={cn(typeToken("text-sm/medium"), "text-right tabular-nums")}>
                  {row.stock}
                </TableCell>
                <TableCell className="text-right">
                  <RowActions />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function NestedFormShell({
  open,
  onOpenChange,
  title,
  children,
  wide,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  children: React.ReactNode
  wide?: boolean
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "fixed top-1/2 left-1/2 z-[110] flex max-h-[90vh] w-[min(100%-2rem,36rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-0 overflow-hidden rounded-xl border border-border bg-background p-0 shadow-elevation-lg",
          wide && "w-[min(100%-2rem,56rem)]",
        )}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{title}</DialogDescription>
        <PepPopupHeader title={title} onClose={() => onOpenChange(false)} />
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        <FormBottom
          progress={40}
          progressLabel="Draft"
          saveDisabled={false}
          onCancel={() => onOpenChange(false)}
          onSave={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

/** Figma activities/timeslot+cap+location */
export function TimeslotFormDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [locationMode, setLocationMode] = React.useState<TimeslotLocationMode>("select")

  return (
    <NestedFormShell open={open} onOpenChange={onOpenChange} title="Timeslot" wide>
      <div className="space-y-8 p-6">
        <section className="space-y-4">
          <SectionTitle>Timeslot</SectionTitle>
          <LibraryField label="Date" required>
            <FieldDate placeholder="日期Range" />
          </LibraryField>
          <LibraryField label="time" required>
            <div className="grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
              <FieldTime />
              <span className="text-center text-muted-foreground">~</span>
              <FieldTime />
            </div>
          </LibraryField>
        </section>

        <TimeslotLocationSection mode={locationMode} onModeChange={setLocationMode} />

        <section className="space-y-4">
          <SectionTitle>Capacity</SectionTitle>
          <LibraryField label="seats" required htmlFor="seats">
            <Input id="seats" placeholder="Placeholder" />
          </LibraryField>
          <label className={cn(typeToken("text-sm/medium"), "flex items-center gap-2")}>
            <Checkbox defaultChecked id="overbooking" />
            is_allow_overbooking
          </label>
          <label className={cn(typeToken("text-sm/medium"), "flex items-center gap-2")}>
            <Checkbox id="waitlist" />
            is_waitlist_enabled
          </label>
        </section>
      </div>
    </NestedFormShell>
  )
}

/** Figma activities/Organizer */
export function OrganizerFormDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <NestedFormShell open={open} onOpenChange={onOpenChange} title="Organizer">
      <div className="space-y-6 p-6">
        <LibraryField label="Type" required>
          <FieldSelect
            options={["Host", "Partner", "Sponsor"]}
            defaultValue="Host"
            placeholder="Type"
            aria-label="Type"
          />
        </LibraryField>
        <LibraryField label="name" required htmlFor="org-name">
          <Input id="org-name" placeholder="Placeholder" />
        </LibraryField>
        <LibraryField label="url" htmlFor="org-url">
          <Input id="org-url" placeholder="https://" />
        </LibraryField>
        <LibraryField label="logo">
          <Input type="file" aria-label="logo" />
        </LibraryField>
      </div>
    </NestedFormShell>
  )
}

/** Simplified ticket editor popup */
export function TicketFormDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <NestedFormShell open={open} onOpenChange={onOpenChange} title="Ticket" wide>
      <div className="space-y-6 p-6">
        <Tabs defaultValue="info">
          <TabsList>
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="price">Price</TabsTrigger>
          </TabsList>
        </Tabs>
        <LibraryField label="ticket_name" required htmlFor="ticket-name">
          <Input id="ticket-name" placeholder="Placeholder" />
        </LibraryField>
        <LibraryField label="description" htmlFor="ticket-desc">
          <FieldTextarea id="ticket-desc" />
        </LibraryField>
        <div className="grid gap-4 sm:grid-cols-2">
          <LibraryField label="price" required htmlFor="ticket-price">
            <Input id="ticket-price" placeholder="0" />
          </LibraryField>
          <LibraryField label="stock" required htmlFor="ticket-stock">
            <Input id="ticket-stock" placeholder="0" />
          </LibraryField>
        </div>
        <label className={cn(typeToken("text-sm/medium"), "flex items-center gap-2")}>
          <Checkbox defaultChecked id="show-app" />
          APP中, 是否顯示此Ticket
        </label>
      </div>
    </NestedFormShell>
  )
}
