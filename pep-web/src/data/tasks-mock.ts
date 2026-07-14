export type TaskType = "maintenance" | "complaint" | "request" | "billing"

export type TaskStatus = "open" | "in_progress" | "resolved" | "escalated"

export type TaskPriority = "urgent" | "high" | "medium" | "low"

export type TaskSource = "tenant" | "system" | "staff"

export type Task = {
  id: string
  title: string
  customerName: string
  customerId: string
  imageSrc: string
  type: TaskType
  status: TaskStatus
  priority: TaskPriority
  source: TaskSource
  assignedName: string
  assignedTeam: string
  propertyUnit: string
  slaBreached: boolean
  slaOverHours: number | null
  openedAt: string
  updatedAt: string
  escalated: boolean
}

export const TASKS_PAGE_SIZE = 20

export const MOCK_TASK_TOTAL = 50

const IMG = {
  leak: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=160&h=160&q=80",
  ac: "https://images.unsplash.com/photo-1631540575626-2bbe855fdf74?auto=format&fit=crop&w=160&h=160&q=80",
  noise: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=160&h=160&q=80",
  elevator: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=160&h=160&q=80",
  garden: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=160&h=160&q=80",
  lobby: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=160&h=160&q=80",
  parking: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=160&h=160&q=80",
  parcel: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=160&h=160&q=80",
} as const

const TITLES = [
  "Water leakage under kitchen sink",
  "AC not cooling in master bedroom",
  "Noise complaint from upstairs unit",
  "Elevator door sensor intermittent fault",
  "Garden irrigation timer reset",
  "Lobby intercom volume too low",
  "Visitor parking gate not opening",
  "Parcel room access card failure",
  "Ceiling light flickering in corridor",
  "Window seal draft in living room",
] as const

const NAMES = [
  "Jonathan Lee",
  "Avery Chen",
  "Jordan Smith",
  "Riley Patel",
  "Morgan Lee",
  "Casey Nguyen",
  "Victoria Chen",
  "Sam Wong",
  "Alex Lau",
  "Taylor Ho",
] as const

const TEAMS = ["Building Ops", "Concierge", "Engineering", "Security", "Property Mgmt"] as const

const UNITS = [
  "Harbour View · 12A",
  "Harbour View · 08B",
  "Midtown Plaza · 23F",
  "Midtown Plaza · 05G",
  "Garden Estate · Block 2 · 15C",
  "Garden Estate · Block 1 · 03D",
  "Peak Towers · 42A",
  "Peak Towers · 09E",
] as const

const TYPES: TaskType[] = ["maintenance", "complaint", "request", "billing"]
const STATUSES: TaskStatus[] = ["open", "in_progress", "resolved", "escalated"]
const PRIORITIES: TaskPriority[] = ["urgent", "high", "medium", "low"]
const SOURCES: TaskSource[] = ["tenant", "system", "staff"]
const IMAGES = [IMG.leak, IMG.ac, IMG.noise, IMG.elevator, IMG.garden, IMG.lobby, IMG.parking, IMG.parcel]

function buildTasks(count: number): Task[] {
  const base = Date.parse("2026-04-24T10:00:00.000Z")
  const tasks: Task[] = []

  for (let i = 0; i < count; i++) {
    const num = count - i
    const id = `TKT-${String(num).padStart(4, "0")}`
    const customerName = NAMES[i % NAMES.length]!
    const customerId = `CUS-${10000 + ((i * 7) % 900)}`
    const status = STATUSES[i % STATUSES.length]!
    const escalated = status === "escalated" || (i % 14 === 0 && status !== "resolved")
    const slaBreached = status === "escalated" || (i % 9 === 0 && status !== "resolved")
    const slaOverHours = slaBreached ? 40 + (i % 480) + (i % 3) * 0.25 : null

    const openedAt = new Date(base - i * 5 * 60 * 60 * 1000 - (i % 8) * 3600 * 1000).toISOString()
    const updatedAt = new Date(base - i * 2 * 60 * 60 * 1000 - (i % 5) * 600 * 1000).toISOString()

    tasks.push({
      id,
      title: `${TITLES[i % TITLES.length]!}${i >= TITLES.length ? ` · #${1 + Math.floor(i / TITLES.length)}` : ""}`,
      customerName,
      customerId,
      imageSrc: IMAGES[i % IMAGES.length]!,
      type: TYPES[i % TYPES.length]!,
      status,
      priority: PRIORITIES[i % PRIORITIES.length]!,
      source: SOURCES[i % SOURCES.length]!,
      assignedName: NAMES[(i + 3) % NAMES.length]!,
      assignedTeam: TEAMS[i % TEAMS.length]!,
      propertyUnit: UNITS[i % UNITS.length]!,
      slaBreached,
      slaOverHours,
      openedAt,
      updatedAt,
      escalated,
    })
  }

  return tasks
}

export const MOCK_TASKS: Task[] = buildTasks(MOCK_TASK_TOTAL)

export type TaskFilters = {
  search: string
  status: TaskStatus | "all"
  priority: TaskPriority | "all"
  type: TaskType | "all"
  source: TaskSource | "all"
}

export function filterTasks(tasks: Task[], f: TaskFilters): Task[] {
  const q = f.search.trim().toLowerCase()
  return tasks.filter((t) => {
    if (f.status !== "all" && t.status !== f.status) return false
    if (f.priority !== "all" && t.priority !== f.priority) return false
    if (f.type !== "all" && t.type !== f.type) return false
    if (f.source !== "all" && t.source !== f.source) return false
    if (!q) return true
    return (
      t.title.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q) ||
      t.customerName.toLowerCase().includes(q) ||
      t.customerId.toLowerCase().includes(q) ||
      t.propertyUnit.toLowerCase().includes(q)
    )
  })
}

export function countEscalated(tasks: Task[]): number {
  return tasks.filter((t) => t.escalated || t.status === "escalated").length
}
