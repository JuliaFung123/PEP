import { format } from "date-fns"
import { ChevronLeft, ChevronRight, Download, Package, Plus, Table2, X } from "lucide-react"
import * as React from "react"

import { FilterSelect } from "@/components/filter-select"
import { PepFilterRow, PepPageHeader } from "@/components/pep-chrome"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  type Order,
  type OrderStatus,
  formatMoney,
  MOCK_ORDERS,
  getOrderById,
  ORDERS_PAGE_SIZE,
  orderTotal,
} from "@/data/orders-mock"
import { cn } from "@/lib/utils"

const ORDER_DATE_FORMAT = "yyyy/MM/dd HH:mm" as const

function customerInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase()
  return (parts[0]![0] + parts[parts.length - 1]![0]).toUpperCase()
}

function CustomerAvatar({ name, className }: { name: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-foreground ring-1 ring-border",
        className,
      )}
      aria-hidden
    >
      {customerInitials(name)}
    </div>
  )
}

function statusBadgeVariant(status: OrderStatus): React.ComponentProps<typeof Badge>["variant"] {
  switch (status) {
    case "paid":
      return "default"
    case "fulfilled":
      return "secondary"
    case "pending":
      return "outline"
    case "cancelled":
      return "destructive"
    default:
      return "outline"
  }
}

function OrdersPagination({
  pageIndex,
  pageCount,
  total,
  onPageChange,
}: {
  pageIndex: number
  pageCount: number
  total: number
  onPageChange: (nextPageIndex: number) => void
}) {
  const from = pageIndex * ORDERS_PAGE_SIZE + 1
  const to = Math.min((pageIndex + 1) * ORDERS_PAGE_SIZE, total)

  return (
    <div className="flex flex-col gap-3 border-t border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="tabular-nums text-foreground">{from}</span>
        {"–"}
        <span className="tabular-nums text-foreground">{to}</span> of{" "}
        <span className="tabular-nums text-foreground">{total}</span>
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-0.5 pr-2 pl-1.5"
          disabled={pageIndex <= 0}
          onClick={() => onPageChange(pageIndex - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" aria-hidden />
          Prev
        </Button>
        <div className="flex items-center gap-1">
          {Array.from({ length: pageCount }, (_, i) => (
            <Button
              key={i}
              type="button"
              variant={pageIndex === i ? "default" : "outline"}
              size="sm"
              className="min-w-8 px-2"
              onClick={() => onPageChange(i)}
              aria-label={`Page ${i + 1}`}
              aria-current={pageIndex === i ? "page" : undefined}
            >
              {i + 1}
            </Button>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-0.5 pl-2 pr-1.5"
          disabled={pageIndex >= pageCount - 1}
          onClick={() => onPageChange(pageIndex + 1)}
          aria-label="Next page"
        >
          Next
          <ChevronRight className="size-4" aria-hidden />
        </Button>
      </div>
    </div>
  )
}

function OrdersTable({ orders, onSelect }: { orders: Order[]; onSelect: (id: string) => void }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Placed</TableHead>
          <TableHead>Total</TableHead>
          <TableHead className="text-right">Status</TableHead>
          <TableHead className="w-14 text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow
            key={order.id}
            role="button"
            tabIndex={0}
            aria-label={`Open order ${order.id}`}
            className="cursor-pointer"
            onClick={() => onSelect(order.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onSelect(order.id)
              }
            }}
          >
            <TableCell className="font-medium">{order.id}</TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <CustomerAvatar name={order.customerName} />
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate">{order.customerName}</span>
                  <span className="truncate font-mono text-xs text-muted-foreground">{order.customerId}</span>
                </div>
              </div>
            </TableCell>
            <TableCell className="whitespace-nowrap text-muted-foreground">
              {format(new Date(order.placedAt), ORDER_DATE_FORMAT)}
            </TableCell>
            <TableCell className="whitespace-nowrap">{formatMoney(orderTotal(order))}</TableCell>
            <TableCell className="text-right">
              <Badge variant={statusBadgeVariant(order.status)} className="capitalize">
                {order.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="text-muted-foreground hover:text-foreground"
                aria-label={`Open order ${order.id}`}
                onClick={(e) => {
                  e.stopPropagation()
                  onSelect(order.id)
                }}
              >
                <ChevronRight className="size-4" aria-hidden />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function OrderDetailPanelBody({ order }: { order: Order }) {
  const total = orderTotal(order)

  return (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="text-sm font-medium text-foreground">Customer</h3>
        <div className="mt-2 flex items-center gap-3">
          <CustomerAvatar name={order.customerName} className="size-10 text-sm" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">{order.customerName}</p>
            <p className="truncate font-mono text-sm text-muted-foreground">{order.customerId}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-foreground">Activity tickets</h3>
        <Table className="mt-3">
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Ticket</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.lineItems.map((li) => {
              const sub = li.quantity * li.unitPriceCents
              return (
                <TableRow key={li.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={li.imageSrc}
                        alt=""
                        width={48}
                        height={48}
                        loading="lazy"
                        decoding="async"
                        className="size-12 shrink-0 rounded-lg object-cover ring-1 ring-border"
                      />
                      <span className="min-w-0 leading-snug">{li.label}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{li.quantity}</TableCell>
                  <TableCell className="text-right tabular-nums text-muted-foreground">
                    {formatMoney(li.unitPriceCents)}
                  </TableCell>
                  <TableCell className="text-right tabular-nums font-medium">
                    {formatMoney(sub)}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <div className="mt-3 flex justify-end border-t border-border pt-3">
          <p className="text-sm">
            <span className="text-muted-foreground">Total </span>
            <span className="font-semibold tabular-nums">{formatMoney(total)}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

const ORDER_STATUS_FILTER_OPTIONS = [
  { value: "all" as const, label: "All Status" },
  { value: "pending" as const, label: "Pending" },
  { value: "paid" as const, label: "Paid" },
  { value: "fulfilled" as const, label: "Fulfilled" },
  { value: "cancelled" as const, label: "Cancelled" },
]

function parseOrderIdFromPath(pathname: string): string | null {
  const segments = pathname.replace(/^\/+|\/+$/g, "").split("/")
  if (segments.length < 3 || segments[0] !== "preview" || segments[1] !== "orders") return null
  const raw = segments[2]
  if (!raw) return null
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}

export type OrdersAdminPageProps = {
  pathname: string
  onNavigate: (path: string) => void
}

export function OrdersAdminPage({ pathname, onNavigate }: OrdersAdminPageProps) {
  const orderId = parseOrderIdFromPath(pathname)
  const sheetOpen = orderId !== null
  const order = orderId ? getOrderById(orderId) : undefined

  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<"all" | OrderStatus>("all")
  const [pageIndex, setPageIndex] = React.useState(0)

  const q = searchQuery.trim().toLowerCase()

  const filteredOrders = React.useMemo(() => {
    return MOCK_ORDERS.filter((o) => {
      if (statusFilter !== "all" && o.status !== statusFilter) return false
      if (!q) return true
      return (
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerId.toLowerCase().includes(q)
      )
    })
  }, [q, statusFilter])

  const pageCount = Math.max(1, Math.ceil(filteredOrders.length / ORDERS_PAGE_SIZE))
  const safePage = Math.min(pageIndex, pageCount - 1)
  const pageOrders = React.useMemo(
    () => filteredOrders.slice(safePage * ORDERS_PAGE_SIZE, safePage * ORDERS_PAGE_SIZE + ORDERS_PAGE_SIZE),
    [filteredOrders, safePage],
  )

  React.useEffect(() => {
    setPageIndex(0)
  }, [q, statusFilter])

  const pageForOrderId = React.useMemo(() => {
    if (!orderId) return null
    const idx = filteredOrders.findIndex((o) => o.id === orderId)
    if (idx < 0) return null
    return Math.floor(idx / ORDERS_PAGE_SIZE)
  }, [orderId, filteredOrders])

  React.useEffect(() => {
    if (pageForOrderId !== null) setPageIndex(pageForOrderId)
  }, [pageForOrderId])

  const goList = React.useCallback(() => {
    onNavigate("/preview/orders")
  }, [onNavigate])

  const handleSheetOpenChange = React.useCallback(
    (open: boolean) => {
      if (!open) goList()
    },
    [goList],
  )

  return (
    <>
      <div className="flex min-h-0 w-full flex-1 flex-col bg-background">
        <PepPageHeader
          title="Orders"
          actions={
            <Button type="button" size="icon" className="size-9 shrink-0 rounded-md shadow-elevation-sm" aria-label="Add order">
              <Plus className="size-4" aria-hidden />
            </Button>
          }
        />
        <PepFilterRow
          left={
            <>
              <div className="relative min-h-9 w-full min-w-[200px] max-w-[340px]">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search table…"
                  className="h-9 shadow-elevation-sm"
                  aria-label="Filter orders in table"
                />
              </div>
              <FilterSelect
                value={statusFilter}
                onChange={(v) => setStatusFilter(v)}
                options={ORDER_STATUS_FILTER_OPTIONS}
                placeholder="All Status"
              />
              <Button type="button" variant="outline" size="sm" className="gap-1.5 shadow-elevation-sm">
                <Download className="size-4" aria-hidden />
                Export
              </Button>
            </>
          }
          right={
            <Button type="button" variant="outline" size="icon" className="size-9 shadow-elevation-sm" aria-label="Table view">
              <Table2 className="size-4" aria-hidden />
            </Button>
          }
        />

        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-6 py-4">
          <Card>
            <CardContent className="px-0 pt-0">
              <OrdersTable
                orders={pageOrders}
                onSelect={(id) => onNavigate(`/preview/orders/${encodeURIComponent(id)}`)}
              />
              <OrdersPagination
                pageIndex={safePage}
                pageCount={pageCount}
                total={filteredOrders.length}
                onPageChange={setPageIndex}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <Sheet open={sheetOpen} onOpenChange={handleSheetOpenChange}>
        <SheetContent side="right" className="flex w-full max-w-full flex-col gap-0 border-l p-0 sm:max-w-lg">
          {orderId && !order ? (
            <>
              <SheetHeader className="flex-row items-start justify-between gap-3 space-y-0 border-b px-4 py-3.5 pr-3">
                <div className="min-w-0 space-y-1.5">
                  <SheetTitle>Order not found</SheetTitle>
                  <SheetDescription id="order-sheet-not-found-desc">
                    No order matches <span className="font-mono text-foreground">{orderId}</span>.
                  </SheetDescription>
                </div>
                <SheetClose asChild>
                  <Button type="button" variant="ghost" size="icon-sm" aria-label="Close panel">
                    <X className="size-4" />
                  </Button>
                </SheetClose>
              </SheetHeader>
              <div className="p-4">
                <Button type="button" variant="outline" onClick={goList}>
                  Back to orders
                </Button>
              </div>
            </>
          ) : order ? (
            <>
              <SheetHeader className="flex-row items-start justify-between gap-3 space-y-0 border-b px-4 py-3.5 pr-3">
                <div className="min-w-0 space-y-1.5">
                  <SheetTitle className="flex items-center gap-2 pr-2 text-left text-base leading-snug">
                    <Package className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                    <span className="truncate">{order.id}</span>
                  </SheetTitle>
                  <SheetDescription>
                    Placed {format(new Date(order.placedAt), ORDER_DATE_FORMAT)}
                  </SheetDescription>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge variant={statusBadgeVariant(order.status)} className="capitalize">
                    {order.status}
                  </Badge>
                  <SheetClose asChild>
                    <Button type="button" variant="ghost" size="icon-sm" aria-label="Close panel">
                      <X className="size-4" />
                    </Button>
                  </SheetClose>
                </div>
              </SheetHeader>
              <ScrollArea className="min-h-0 flex-1">
                <OrderDetailPanelBody order={order} />
              </ScrollArea>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  )
}
