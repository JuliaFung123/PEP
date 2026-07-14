import * as React from "react"
import {
  CalendarIcon,
  Check,
  ChevronDown,
  Clock,
  Grip,
  ImageIcon,
  Plus,
  Send,
  X,
  XCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PepPageHeader } from "@/components/pep-chrome"
import { inputSurfaceClassName } from "@/lib/input-surface-classes"
import { cn } from "@/lib/utils"

type ActivityFormStep = {
  label: string
  required?: boolean
  state: "complete" | "pending" | "plain"
}

const FORM_STEPS: ActivityFormStep[] = [
  { label: "General", required: true, state: "complete" },
  { label: "Timeslots", required: true, state: "pending" },
  { label: "Ticket", required: true, state: "pending" },
  { label: "Ticket Name", state: "plain" },
  { label: "Ticket Name", state: "plain" },
  { label: "Ticket Name", state: "plain" },
  { label: "contact_settings", required: true, state: "complete" },
  { label: "Organizers", required: true, state: "pending" },
  { label: "additional_info", required: true, state: "pending" },
  { label: "Administrator", required: true, state: "pending" },
] as const

const CATEGORY_TAGS = ["categoryName", "categoryName", "categoryName"] as const

function RequiredMark() {
  return <span className="text-destructive">*</span>
}

function StepBullet({ state }: { state: (typeof FORM_STEPS)[number]["state"] }) {
  if (state === "complete") {
    return (
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
        <Check className="size-3" aria-hidden />
      </span>
    )
  }

  if (state === "pending") {
    return <span className="size-5 shrink-0 rounded-full bg-foreground/20" aria-hidden />
  }

  return <span className="w-5 shrink-0" aria-hidden />
}

function ActivityStepper() {
  return (
    <aside className="hidden w-60 shrink-0 self-stretch lg:block">
      <nav className="rounded-lg px-2 py-3" aria-label="Activity setup steps">
        <div className="flex flex-col gap-2">
          {FORM_STEPS.map((step, index) => {
            const active = index === 0
            return (
              <button
                key={`${step.label}-${index}`}
                type="button"
                className={cn(
                  "flex w-full items-center gap-1 rounded-md px-1.5 py-1.5 text-left text-sm font-medium",
                  active
                    ? "bg-foreground text-background"
                    : "text-foreground hover:bg-muted",
                )}
              >
                <StepBullet state={step.state} />
                <span className="min-w-0 flex-1 truncate px-1">{step.label}</span>
                {step.required ? (
                  <span className={active ? "text-destructive-foreground" : "text-destructive"}>
                    *
                  </span>
                ) : null}
              </button>
            )
          })}
        </div>
      </nav>
    </aside>
  )
}

function SelectShell({
  children,
  className,
  invalid,
}: {
  children: React.ReactNode
  className?: string
  invalid?: boolean
}) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        inputSurfaceClassName,
        "h-9 justify-between gap-2 font-normal text-muted-foreground",
        invalid && "border-destructive bg-destructive text-destructive-foreground",
        className,
      )}
      aria-invalid={invalid || undefined}
    >
      <span className="min-w-0 truncate">{children}</span>
      <ChevronDown className="size-4 shrink-0 opacity-60" aria-hidden />
    </Button>
  )
}

function TextAreaField({
  id,
  label,
  required,
  placeholder = "EN  Placeholder",
}: {
  id: string
  label: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <Field className="gap-1.5">
      <FieldLabel htmlFor={id}>
        {label} {required ? <RequiredMark /> : null}
      </FieldLabel>
      <textarea
        id={id}
        placeholder={placeholder}
        className={cn(
          inputSurfaceClassName,
          "h-auto min-h-[76px] resize-y py-2 leading-5",
        )}
      />
    </Field>
  )
}

function ImageTile({ src, selected }: { src: string; selected?: boolean }) {
  return (
    <div
      className={cn(
        "relative size-[92px] overflow-hidden rounded-lg border border-border bg-muted shadow-elevation-sm",
        selected && "ring-2 ring-primary",
      )}
    >
      <img src={src} alt="" className="size-full object-cover" />
      <div className="absolute inset-x-0 top-0 flex items-center justify-center bg-background/60 py-0.5">
        <Grip className="size-3.5 text-foreground/80" aria-hidden />
      </div>
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="rounded-sm bg-destructive/90 p-0.5 text-destructive-foreground">
          <X className="size-3" aria-hidden />
        </span>
      </span>
    </div>
  )
}

function CoverUploadStrip() {
  return (
    <Field className="gap-2">
      <FieldLabel>
        封面 <RequiredMark />
      </FieldLabel>
      <FieldDescription>第一為主圖</FieldDescription>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="flex size-[92px] items-center justify-center rounded-lg border border-dashed border-border bg-background text-muted-foreground"
          aria-label="Add cover image"
        >
          <span className="flex items-center gap-2">
            <Plus className="size-4" aria-hidden />
            <span className="h-4 w-px bg-border" aria-hidden />
            <ImageIcon className="size-4" aria-hidden />
          </span>
        </button>
        <ImageTile src="/assets/figma/activity-create/cover-1.jpeg" selected />
        <ImageTile src="/assets/figma/activity-create/cover-2.jpeg" />
      </div>
    </Field>
  )
}

function DateField({ placeholder = "日期" }: { placeholder?: string }) {
  return (
    <div className="relative min-w-[128px] flex-1">
      <Input readOnly value="" placeholder={placeholder} className="pr-9" />
      <CalendarIcon
        className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/70"
        aria-hidden
      />
    </div>
  )
}

function TimeField({ placeholder = "時間" }: { placeholder?: string }) {
  return (
    <div className="relative min-w-[112px] flex-1">
      <Input readOnly value="" placeholder={placeholder} className="pr-9" />
      <Clock
        className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/70"
        aria-hidden
      />
    </div>
  )
}

function CheckboxRow({
  label,
  checked,
}: {
  label: string
  checked?: boolean
}) {
  return (
    <label className="flex min-h-6 items-center gap-2 text-sm font-medium text-foreground">
      <span
        className={cn(
          "flex size-4 shrink-0 items-center justify-center rounded border shadow-elevation-sm",
          checked
            ? "border-primary bg-primary text-primary-foreground"
            : "border-input bg-background",
        )}
        aria-hidden
      >
        {checked ? <Check className="size-3" /> : null}
      </span>
      <input type="checkbox" defaultChecked={checked} className="sr-only" />
      {label}
    </label>
  )
}

function FormFooter() {
  return (
    <div className="sticky bottom-0 z-20 border-t border-border bg-background/95 px-5 py-4 backdrop-blur">
      <div className="flex flex-col items-center gap-5">
        <div className="flex w-full flex-col items-center gap-1">
          <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full w-[27%] bg-primary" />
          </div>
          <p className="text-xs text-muted-foreground">1,000/9,999</p>
        </div>
        <div className="flex items-center gap-6">
          <Button type="button" variant="ghost" size="lg">
            Cancel
          </Button>
          <Button type="button" size="lg">
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

function GeneralForm() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="details">圖文詳情</TabsTrigger>
        </TabsList>
        <TabsContent value="info" className="mt-4 border-0 bg-transparent p-0 shadow-none">
          <div className="space-y-6">
            <Field className="gap-1.5">
              <FieldLabel htmlFor="activity-title">
                活動標題 <RequiredMark />
              </FieldLabel>
              <Input id="activity-title" placeholder="EN  Placeholder" />
            </Field>

            <TextAreaField id="short-description" label="short_description" />

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(174px,0.48fr)_minmax(174px,0.48fr)]">
              <Field className="gap-1.5">
                <FieldLabel>
                  category <RequiredMark />
                </FieldLabel>
                <div className="flex h-9 min-w-0 items-center gap-1.5 overflow-hidden rounded-lg border border-input bg-background px-1.5">
                  <div className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden">
                    {CATEGORY_TAGS.map((tag, index) => (
                      <Badge
                        key={`${tag}-${index}`}
                        variant="outline"
                        className="h-5 shrink-0 gap-1 rounded-full bg-background px-1.5"
                      >
                        <span className="flex size-4 items-center justify-center rounded-full bg-primary/15 text-[9px]">
                          🌈
                        </span>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <XCircle className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                  <ChevronDown className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                </div>
              </Field>

              <Field className="gap-1.5">
                <FieldLabel>
                  mode <RequiredMark />
                </FieldLabel>
                <SelectShell invalid>list, registration, timeslot, ticket</SelectShell>
              </Field>

              <Field className="gap-1.5">
                <FieldLabel>
                  visibility <RequiredMark />
                </FieldLabel>
                <SelectShell>internal_only, public, tenant_only</SelectShell>
              </Field>
            </div>

            <CoverUploadStrip />

            <section className="space-y-5 pt-1">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">Time Settings</h2>
              <div className="grid max-w-xl gap-4 sm:grid-cols-2">
                <Field className="gap-1.5">
                  <FieldLabel>
                    timezone <RequiredMark />
                  </FieldLabel>
                  <SelectShell>UTC+8</SelectShell>
                </Field>
                <Field className="gap-1.5">
                  <FieldLabel>
                    發佈時間 <RequiredMark />
                  </FieldLabel>
                  <div className="flex gap-2">
                    <DateField />
                    <TimeField />
                  </div>
                </Field>
              </div>

              <Field className="max-w-2xl gap-1.5">
                <FieldLabel>
                  活動時間 <RequiredMark />
                </FieldLabel>
                <FieldDescription>如果你用Timeslot, 活動時間會用Timeslot的總時段</FieldDescription>
                <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_minmax(0,1fr)_minmax(0,1fr)] sm:items-center">
                  <DateField />
                  <TimeField />
                  <span className="hidden text-center text-muted-foreground sm:block">~</span>
                  <DateField />
                  <TimeField />
                </div>
              </Field>
            </section>

            <section className="space-y-5 pt-1">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">feature_settings</h2>
              <div className="space-y-4">
                <CheckboxRow label="enable_timeslot" checked />
                <CheckboxRow label="enable_ticket" checked />
                <CheckboxRow label="require_approval" />
              </div>
            </section>
          </div>
        </TabsContent>
        <TabsContent value="details" className="mt-4 border-0 bg-transparent p-0 shadow-none">
          <TextAreaField
            id="rich-details"
            label="圖文詳情"
            placeholder="Add activity content, images, and translated details."
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export function ActivityCreatePage() {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col bg-background">
      <PepPageHeader
        title="新增活動"
        actions={
          <>
            <Button type="button" size="lg" className="gap-1.5">
              <Send className="size-4" aria-hidden />
              Publish
            </Button>
            <Button type="button" variant="ghost" size="icon-sm" aria-label="Close activity form">
              <X className="size-4" aria-hidden />
            </Button>
          </>
        }
      />

      <div className="flex min-h-0 flex-1 gap-6 px-6 pb-6 pt-2">
        <ActivityStepper />
        <Card className="min-w-0 flex-1 overflow-hidden shadow-elevation-lg">
          <CardContent className="p-0">
            <div className="px-5 py-5">
              <GeneralForm />
            </div>
            <FormFooter />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
