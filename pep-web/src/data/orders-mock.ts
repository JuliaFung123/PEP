export type OrderStatus = "pending" | "paid" | "fulfilled" | "cancelled"

/** Activity ticket row in an order. */
export type OrderLineItem = {
  id: string
  label: string
  /** Cover image for the ticket / activity. */
  imageSrc: string
  quantity: number
  unitPriceCents: number
}

export type Order = {
  id: string
  customerName: string
  customerId: string
  placedAt: string
  status: OrderStatus
  currency: string
  lineItems: OrderLineItem[]
}

export const ORDERS_PAGE_SIZE = 20

export const MOCK_ORDER_TOTAL = 50

function centsTotal(order: Order): number {
  return order.lineItems.reduce((sum, li) => sum + li.quantity * li.unitPriceCents, 0)
}

/** Formats minor units as Hong Kong dollars (HK$). */
export function formatMoney(cents: number): string {
  return new Intl.NumberFormat("zh-HK", { style: "currency", currency: "HKD" }).format(cents / 100)
}

export function orderTotal(order: Order): number {
  return centsTotal(order)
}

const ticketImg = {
  festival: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=160&h=160&q=80",
  workshop: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=160&h=160&q=80",
  expo: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=160&h=160&q=80",
  nightRun: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=160&h=160&q=80",
  parking: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=160&h=160&q=80",
  gala: "https://images.unsplash.com/photo-1519677100203-a1e518c70b35?auto=format&fit=crop&w=160&h=160&q=80",
  stream: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=160&h=160&q=80",
  charity: "https://images.unsplash.com/photo-1532629345422-a751da1a70a9?auto=format&fit=crop&w=160&h=160&q=80",
} as const

const TICKET_CATALOG: ReadonlyArray<{ label: string; imageSrc: string; unitPriceCents: number }> = [
  { label: "Harbour Lights Festival · General admission", imageSrc: ticketImg.festival, unitPriceCents: 44900 },
  { label: "Creative Mornings HK · Workshop ticket", imageSrc: ticketImg.workshop, unitPriceCents: 12900 },
  { label: "Asia Tech Expo · Trade visitor pass", imageSrc: ticketImg.expo, unitPriceCents: 220000 },
  { label: "Victoria Park Night Run · Early bird", imageSrc: ticketImg.nightRun, unitPriceCents: 8900 },
  { label: "Event day parking · Kowloon", imageSrc: ticketImg.parking, unitPriceCents: 1500 },
  { label: "Grand Hall Charity Gala · VIP seating", imageSrc: ticketImg.gala, unitPriceCents: 17500 },
  { label: "PEP Livestream · Season access", imageSrc: ticketImg.stream, unitPriceCents: 9900 },
  { label: "Youth arts programme · Sponsored ticket", imageSrc: ticketImg.charity, unitPriceCents: 2500 },
]

const FIRST_NAMES = [
  "Avery",
  "Jordan",
  "Riley",
  "Morgan",
  "Casey",
  "Quinn",
  "Skyler",
  "Dakota",
  "Reese",
  "Jamie",
  "Alex",
  "Taylor",
  "Sam",
  "Rowan",
  "Blake",
  "Cameron",
  "Devon",
  "Emery",
  "Finley",
  "Harper",
] as const

const LAST_NAMES = [
  "Chen",
  "Smith",
  "Patel",
  "Lee",
  "Nguyen",
  "Wong",
  "Lam",
  "Ho",
  "Kwok",
  "Yip",
  "Lau",
  "Cheung",
  "Tsang",
  "Au",
  "Ma",
  "Chow",
  "Fong",
  "Tang",
  "Yeung",
  "Kwan",
] as const

const STATUSES: readonly OrderStatus[] = ["paid", "fulfilled", "pending", "cancelled"]

function buildMockOrders(count: number): Order[] {
  const base = Date.parse("2026-04-24T12:00:00.000Z")
  const orders: Order[] = []

  for (let i = 0; i < count; i++) {
    const orderNum = 10050 - i
    const id = `ORD-${orderNum}`
    const fn = FIRST_NAMES[i % FIRST_NAMES.length]!
    const ln = LAST_NAMES[(i + Math.floor(i / FIRST_NAMES.length)) % LAST_NAMES.length]!
    const customerName = `${fn} ${ln}`
    const customerId = `CUS-${orderNum}`

    const t = TICKET_CATALOG[i % TICKET_CATALOG.length]!
    const t2 = TICKET_CATALOG[(i + 3) % TICKET_CATALOG.length]!
    const qty1 = 1 + (i % 3)
    const lineItems: OrderLineItem[] = [
      {
        id: `${id}-a`,
        label: t.label,
        imageSrc: t.imageSrc,
        quantity: qty1,
        unitPriceCents: t.unitPriceCents + (i % 5) * 100,
      },
    ]
    if (i % 4 !== 0) {
      lineItems.push({
        id: `${id}-b`,
        label: t2.label,
        imageSrc: t2.imageSrc,
        quantity: 1,
        unitPriceCents: t2.unitPriceCents + (i % 7) * 50,
      })
    }

    const placedAt = new Date(base - i * 3 * 60 * 60 * 1000 - (i % 11) * 60 * 1000).toISOString()

    orders.push({
      id,
      customerName,
      customerId,
      placedAt,
      status: STATUSES[i % STATUSES.length]!,
      currency: "HKD",
      lineItems,
    })
  }

  return orders
}

/** Fifty demo orders, newest first (`ORD-10050` … `ORD-10001`). */
export const MOCK_ORDERS: Order[] = buildMockOrders(MOCK_ORDER_TOTAL)

export function getOrderById(id: string): Order | undefined {
  return MOCK_ORDERS.find((o) => o.id === id)
}

export function getOrderIndex(id: string): number {
  return MOCK_ORDERS.findIndex((o) => o.id === id)
}

export function getOrdersPage(pageIndex: number): Order[] {
  const start = pageIndex * ORDERS_PAGE_SIZE
  return MOCK_ORDERS.slice(start, start + ORDERS_PAGE_SIZE)
}

export function getOrdersPageCount(): number {
  return Math.ceil(MOCK_ORDERS.length / ORDERS_PAGE_SIZE)
}
