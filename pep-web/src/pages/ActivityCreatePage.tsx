import * as React from "react"
import { Send } from "lucide-react"

import {
  FieldDate,
  FieldMultiImageGrid,
  FIELD_IMAGE_GRID_DEMO_ITEMS,
  FieldSelect,
  FieldTextarea,
  FieldTime,
} from "@/components/field-library-controls"
import { FieldMultiImageSelect } from "@/components/field-multi-selects"
import { computeRequiredFormProgress, FormBottom } from "@/components/form-bottom"
import { FormMenu, FormMenuItem, type FormMenuItemState } from "@/components/form-menu"
import {
  FormsFieldStack,
  FormsLayout,
  fullPagePopupDialogContentClassName,
} from "@/components/forms-layout"
import { LibraryField, LibraryFieldGroupItem, LibraryFieldSet } from "@/components/library-field"
import { PepPopupHeader } from "@/components/pep-chrome"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Richtext } from "@/components/ui/richtext"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"
import {
  AdminPanel,
  ContactPanel,
  OrganizerFormDialog,
  OrganizersPanel,
  PolicyPanel,
  SkuPanel,
  TicketFormDialog,
  TicketsPanel,
  TimeslotFormDialog,
  TimeslotsPanel,
} from "@/pages/activity-section-panels"

type ActivityStepId =
  | "general"
  | "timeslots"
  | "ticket"
  | "ticket-nested"
  | "contact"
  | "organizers"
  | "policy"
  | "admin"
  | "sku"

const FORM_STEPS: {
  id: ActivityStepId
  label: string
  required?: boolean
  state: FormMenuItemState
}[] = [
  { id: "general", label: "General", required: true, state: "complete" },
  { id: "timeslots", label: "Timeslots", required: true, state: "incomplete" },
  { id: "ticket", label: "Ticket", required: true, state: "incomplete" },
  { id: "ticket-nested", label: "Ticket Name", state: "nested" },
  { id: "ticket-nested", label: "Ticket Name", state: "nested" },
  { id: "ticket-nested", label: "Ticket Name", state: "nested" },
  { id: "sku", label: "SKU", state: "incomplete" },
  { id: "contact", label: "contact_settings", required: true, state: "complete" },
  { id: "organizers", label: "Organizers", required: true, state: "incomplete" },
  { id: "policy", label: "additional_info", required: true, state: "incomplete" },
  { id: "admin", label: "Administrator", required: true, state: "incomplete" },
]

const CATEGORY_THUMB = "/assets/figma/activity-list/category-1.png"
const CATEGORY_OPTIONS = [
  { id: "categoryName", label: "categoryName", src: CATEGORY_THUMB },
  { id: "Design", label: "Design", src: CATEGORY_THUMB },
  { id: "Engineering", label: "Engineering", src: CATEGORY_THUMB },
] as const

const MODE_OPTIONS = ["list", "registration", "timeslot", "ticket"] as const
const VISIBILITY_OPTIONS = ["internal_only", "public", "tenant_only"] as const
const TIMEZONE_OPTIONS = ["UTC+8", "UTC+0", "UTC-5"] as const

function FeatureCheckbox({
  id,
  label,
  defaultChecked,
}: {
  id: string
  label: string
  defaultChecked?: boolean
}) {
  return (
    <label
      htmlFor={id}
      className={cn(typeToken("text-sm/medium"), "flex min-h-6 items-center gap-2 text-foreground")}
    >
      <Checkbox id={id} defaultChecked={defaultChecked} />
      {label}
    </label>
  )
}

/** activities/Main — Info + 圖文詳情 tabs (Figma Tab/活動2) */
function GeneralForm() {
  return (
    <div className="flex min-h-0 flex-1 flex-col px-5 py-5">
      <Tabs defaultValue="info" className="flex min-h-0 flex-1 flex-col">
        <TabsList className="shrink-0">
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="details">圖文詳情</TabsTrigger>
        </TabsList>
        <TabsContent
          value="info"
          className="mt-4 min-h-0 flex-1 overflow-y-auto border-0 bg-transparent p-0 shadow-none"
        >
          <FormsFieldStack>
            <LibraryField label="活動標題" required htmlFor="activity-title">
              <Input id="activity-title" placeholder="EN  Placeholder" />
            </LibraryField>

            <LibraryField label="short_description" htmlFor="short-description">
              <FieldTextarea id="short-description" />
            </LibraryField>

            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(174px,0.48fr)_minmax(174px,0.48fr)]">
              <LibraryField label="category" required>
                <FieldMultiImageSelect
                  options={CATEGORY_OPTIONS}
                  defaultSelectedIds={["categoryName", "Design", "Engineering"]}
                />
              </LibraryField>

              <LibraryField label="mode" required>
                <FieldSelect
                  options={MODE_OPTIONS}
                  defaultValue="list"
                  placeholder="Select mode"
                  invalid
                  aria-label="mode"
                />
              </LibraryField>

              <LibraryField label="visibility" required>
                <FieldSelect
                  options={VISIBILITY_OPTIONS}
                  defaultValue="internal_only"
                  placeholder="Select visibility"
                  aria-label="visibility"
                />
              </LibraryField>
            </div>

            <LibraryField label="封面" required description="第一為主圖">
              <FieldMultiImageGrid defaultItems={FIELD_IMAGE_GRID_DEMO_ITEMS} />
            </LibraryField>

            <section className="space-y-5 pt-1">
              <h2 className={cn(typeToken("text-lg/semibold"), "tracking-tight text-foreground")}>
                Time Settings
              </h2>
              <div className="grid max-w-xl gap-4 sm:grid-cols-2">
                <LibraryField label="timezone" required>
                  <FieldSelect
                    options={TIMEZONE_OPTIONS}
                    defaultValue="UTC+8"
                    placeholder="Select timezone"
                    aria-label="timezone"
                  />
                </LibraryField>

                <LibraryFieldSet label="發佈時間" required>
                  <div className="flex flex-wrap items-start gap-1">
                    <LibraryFieldGroupItem className="min-w-[160px] flex-1">
                      <FieldDate placeholder="日期" />
                    </LibraryFieldGroupItem>
                    <LibraryFieldGroupItem className="min-w-[120px] flex-1">
                      <FieldTime />
                    </LibraryFieldGroupItem>
                  </div>
                </LibraryFieldSet>
              </div>

              <LibraryFieldSet
                className="max-w-2xl"
                label="活動時間"
                required
                description="如果你用Timeslot, 活動時間會用Timeslot的總時段"
              >
                <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_minmax(0,1fr)_minmax(0,1fr)] sm:items-start">
                  <LibraryFieldGroupItem>
                    <FieldDate placeholder="日期" />
                  </LibraryFieldGroupItem>
                  <LibraryFieldGroupItem>
                    <FieldTime />
                  </LibraryFieldGroupItem>
                  <span className="hidden h-9 items-center self-start text-center text-muted-foreground sm:flex">
                    ~
                  </span>
                  <LibraryFieldGroupItem>
                    <FieldDate placeholder="日期" />
                  </LibraryFieldGroupItem>
                  <LibraryFieldGroupItem>
                    <FieldTime />
                  </LibraryFieldGroupItem>
                </div>
              </LibraryFieldSet>
            </section>

            <section className="space-y-5 pt-1">
              <h2 className={cn(typeToken("text-lg/semibold"), "tracking-tight text-foreground")}>
                feature_settings
              </h2>
              <div className="space-y-4">
                <FeatureCheckbox id="enable_timeslot" label="enable_timeslot" defaultChecked />
                <FeatureCheckbox id="enable_ticket" label="enable_ticket" defaultChecked />
                <FeatureCheckbox id="require_approval" label="require_approval" />
              </div>
            </section>
          </FormsFieldStack>
        </TabsContent>
        <TabsContent
          value="details"
          className="mt-4 flex min-h-0 flex-1 flex-col overflow-hidden border-0 bg-transparent p-0 shadow-none"
        >
          <Richtext fillHeight className="max-w-none" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ActivityCreateBody({ onClose }: { onClose: () => void }) {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [timeslotOpen, setTimeslotOpen] = React.useState(false)
  const [ticketOpen, setTicketOpen] = React.useState(false)
  const [organizerOpen, setOrganizerOpen] = React.useState(false)

  const activeStep = FORM_STEPS[activeIndex]?.id ?? "general"

  const body = (() => {
    switch (activeStep) {
      case "timeslots":
        return <TimeslotsPanel onAdd={() => setTimeslotOpen(true)} />
      case "ticket":
      case "ticket-nested":
        return <TicketsPanel onAdd={() => setTicketOpen(true)} />
      case "sku":
        return <SkuPanel onAdd={() => setTicketOpen(true)} />
      case "contact":
        return <ContactPanel />
      case "organizers":
        return <OrganizersPanel onAdd={() => setOrganizerOpen(true)} />
      case "policy":
        return <PolicyPanel />
      case "admin":
        return <AdminPanel />
      case "general":
      default:
        return <GeneralForm />
    }
  })()

  const formProgress = computeRequiredFormProgress(FORM_STEPS)

  return (
    <>
      <FormsLayout
        className="min-h-0 flex-1"
        surface={activeStep === "timeslots" ? "plain" : "card"}
        header={
          <PepPopupHeader
            title="新增活動"
            onClose={onClose}
            actions={
              <Button type="button" size="default" className="gap-1.5">
                <Send className="size-4" aria-hidden />
                Publish
              </Button>
            }
          />
        }
        menu={
          <FormMenu aria-label="Activity setup steps">
            {FORM_STEPS.map((step, index) => (
              <FormMenuItem
                key={`${step.label}-${index}`}
                label={step.label}
                required={step.required}
                state={step.state}
                active={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </FormMenu>
        }
        body={body}
        footer={
          <FormBottom
            progress={formProgress.progress}
            progressLabel={formProgress.progressLabel}
            onCancel={onClose}
            onSave={() => undefined}
          />
        }
      />

      <TimeslotFormDialog open={timeslotOpen} onOpenChange={setTimeslotOpen} />
      <TicketFormDialog open={ticketOpen} onOpenChange={setTicketOpen} />
      <OrganizerFormDialog open={organizerOpen} onOpenChange={setOrganizerOpen} />
    </>
  )
}

/**
 * 新增活動 — full-page dialog covering Figma 活動 section pages:
 * General, Timeslots, Ticket, SKU, contact, Organizers, policy, Administrator
 * + nested Timeslot / Ticket / Organizer popups.
 *
 * @see https://www.figma.com/design/IZ6algHkFp6Z2a5dYiS1hC/PEP?node-id=2750-119081
 */
export function ActivityCreateDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const close = () => onOpenChange(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={fullPagePopupDialogContentClassName}>
        <DialogTitle className="sr-only">新增活動</DialogTitle>
        <DialogDescription className="sr-only">
          Create a new activity. Click outside the dialog or press Escape to close.
        </DialogDescription>
        <ActivityCreateBody onClose={close} />
      </DialogContent>
    </Dialog>
  )
}

/** @deprecated Prefer ActivityCreateDialog. */
export function ActivityCreatePage({
  onClose,
}: {
  onClose?: () => void
} = {}) {
  return <ActivityCreateBody onClose={onClose ?? (() => undefined)} />
}
