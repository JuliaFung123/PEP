import * as React from "react"
import { Send } from "lucide-react"

import { computeRequiredFormProgress, FormBottom } from "@/components/form-bottom"
import { FormMenu, FormMenuItem, type FormMenuItemState } from "@/components/form-menu"
import {
  FormsFieldStack,
  FormsLayout,
  FullPagePopupDemoShell,
} from "@/components/forms-layout"
import { LibraryField } from "@/components/library-field"
import { PepDesignSystemPage, PepPopupHeader } from "@/components/pep-chrome"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Richtext } from "@/components/ui/richtext"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FieldTextarea } from "@/components/field-library-controls"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"
import { FullPagePopupTimeslotsTable } from "@/pages/FullPagePopupTableBlockPage"

const FORM_DEMO_STEPS: {
  label: string
  required?: boolean
  state: FormMenuItemState
}[] = [
  { label: "General", required: true, state: "complete" },
  { label: "Timeslots", required: true, state: "incomplete" },
  { label: "Ticket", required: true, state: "incomplete" },
  { label: "Ticket Name", state: "nested" },
  { label: "contact_settings", required: true, state: "complete" },
  { label: "Organizers", required: true, state: "incomplete" },
]

const TABLE_DEMO_STEPS: {
  label: string
  required?: boolean
  state: FormMenuItemState
}[] = [
  { label: "Main", required: true, state: "complete" },
  { label: "Timeslots", required: true, state: "incomplete" },
  { label: "Ticket", required: true, state: "incomplete" },
  { label: "Ticket Name", state: "nested" },
  { label: "Ticket Name", state: "nested" },
  { label: "Ticket Name", state: "nested" },
  { label: "contact_settings", required: true, state: "incomplete" },
  { label: "Organizers", required: true, state: "incomplete" },
  { label: "additional_info", required: true, state: "incomplete" },
  { label: "Administrator", required: true, state: "incomplete" },
]

function FullPagePopupFormDemo() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const formProgress = computeRequiredFormProgress(FORM_DEMO_STEPS)

  return (
    <FullPagePopupDemoShell>
      <FormsLayout
        className="h-full min-h-0 flex-1"
        header={
          <PepPopupHeader
            title="新增活動"
            onClose={() => undefined}
            actions={
              <Button type="button" size="default" className="gap-1.5">
                <Send className="size-4" aria-hidden />
                Publish
              </Button>
            }
          />
        }
        menu={
          <FormMenu aria-label="Form sections">
            {FORM_DEMO_STEPS.map((step, index) => (
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
        body={
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
                  <LibraryField label="活動標題" required htmlFor="forms-layout-title">
                    <Input id="forms-layout-title" placeholder="EN  Placeholder" />
                  </LibraryField>
                  <LibraryField label="short_description" htmlFor="forms-layout-desc">
                    <FieldTextarea id="forms-layout-desc" />
                  </LibraryField>
                  <p className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>
                    Field rows use{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-[11px]">LibraryField</code>{" "}
                    (gap-2 inside) and{" "}
                    <code className="rounded bg-muted px-1 py-0.5 text-[11px]">FormsFieldStack</code>{" "}
                    (gap-6 between fields).
                  </p>
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
        }
        footer={
          <FormBottom
            progress={formProgress.progress}
            progressLabel={formProgress.progressLabel}
            onCancel={() => undefined}
            onSave={() => undefined}
          />
        }
      />
    </FullPagePopupDemoShell>
  )
}

function FullPagePopupTableDemo() {
  const [activeIndex, setActiveIndex] = React.useState(1)
  const formProgress = computeRequiredFormProgress(TABLE_DEMO_STEPS)

  return (
    <FullPagePopupDemoShell>
      <FormsLayout
        surface="plain"
        className="h-full min-h-0"
        header={
          <PepPopupHeader
            title="新增活動"
            onClose={() => undefined}
            actions={
              <Button type="button" size="default" className="gap-1.5">
                <Send className="size-4" aria-hidden />
                Publish
              </Button>
            }
          />
        }
        menu={
          <FormMenu aria-label="Form sections">
            {TABLE_DEMO_STEPS.map((step, index) => (
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
        body={<FullPagePopupTimeslotsTable />}
        footer={
          <FormBottom
            progress={formProgress.progress}
            progressLabel={formProgress.progressLabel}
            onCancel={() => undefined}
            onSave={() => undefined}
          />
        }
      />
    </FullPagePopupDemoShell>
  )
}

/**
 * Layout → full page popup — multi-section dialog shell (Figma 新增活動).
 * @see https://www.figma.com/design/IZ6algHkFp6Z2a5dYiS1hC/PEP?node-id=477-19891
 */
export function FullPagePopupPage() {
  return (
    <PepDesignSystemPage title="full page popup" contentClassName="space-y-10">
      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>
          Notes
        </h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-3 text-muted-foreground")}>
          Edge-to-edge full-page popup from Figma{" "}
          <a
            href="https://www.figma.com/design/IZ6algHkFp6Z2a5dYiS1hC/PEP?node-id=477-19891"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            新增活動
          </a>
          . Same shell for form and table sections — swap the body and{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">surface</code> prop. Compose
          blocks — do not invent a parallel shell in demo pages.
        </p>
        <ol className={cn(typeToken("text-xs/normal"), "list-decimal space-y-1.5 pl-4 text-muted-foreground")}>
          <li>
            <span className="font-medium text-foreground">Dialog shell</span> —{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-[11px]">Dialog</code> +{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-[11px]">
              fullPagePopupDialogContentClassName
            </code>{" "}
            (<span className="font-medium text-foreground">inset-0</span>, no rounded border margin)
          </li>
          <li>
            <span className="font-medium text-foreground">header/Popup</span> —{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-[11px]">PepPopupHeader</code>
          </li>
          <li>
            <span className="font-medium text-foreground">Form Menu</span> —{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-[11px]">FormMenu</code>
          </li>
          <li>
            <span className="font-medium text-foreground">Body</span> — form fields (
            <code className="rounded bg-muted px-1 py-0.5 text-[11px]">surface=&quot;card&quot;</code>
            ) or table (
            <code className="rounded bg-muted px-1 py-0.5 text-[11px]">surface=&quot;plain&quot;</code>
            , no outline / elevation)
          </li>
          <li>
            <span className="font-medium text-foreground">Form_bottom</span> —{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-[11px]">FormBottom</code>
          </li>
        </ol>
        <p className={cn(typeToken("text-xs/normal"), "mt-3 text-muted-foreground")}>
          Shell:{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">FormsLayout</code>. Product
          example: Demo → 活動 → 新增活動.
        </p>
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>
          Library
        </h2>
        <p className={cn(typeToken("text-xs/normal"), "mb-4 text-muted-foreground")}>
          <span className="font-medium text-foreground">
            Use this composition for multi-section full-page popups.
          </span>
        </p>

        <div className="space-y-8">
          <div className="space-y-2">
            <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>
              Form body (<code className="text-[11px]">surface=&quot;card&quot;</code>)
            </div>
            <FullPagePopupFormDemo />
          </div>
          <div className="space-y-2">
            <div className={cn(typeToken("text-xs/medium"), "text-muted-foreground")}>
              Table body (<code className="text-[11px]">surface=&quot;plain&quot;</code>) — Figma{" "}
              <a
                href="https://www.figma.com/design/IZ6algHkFp6Z2a5dYiS1hC/PEP?node-id=813-35945"
                target="_blank"
                rel="noreferrer"
                className="text-foreground underline underline-offset-2 hover:text-foreground/80"
              >
                Timeslots table
              </a>
            </div>
            <FullPagePopupTableDemo />
          </div>
        </div>
      </section>
    </PepDesignSystemPage>
  )
}

/** @deprecated Use FullPagePopupPage. */
export function FormsLayoutPage() {
  return <FullPagePopupPage />
}
