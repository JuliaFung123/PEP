import * as React from "react"

import {
  OptionRow,
  type OptionRowDensity,
  type OptionRowProps,
  type OptionRowVariant,
} from "@/components/option-row"
import { PepDesignSystemPage } from "@/components/pep-chrome"
import { LibraryField } from "@/components/library-field"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { typeToken } from "@/data/typography-tokens"
import { inputSelectTriggerClassName } from "@/lib/input-surface-classes"
import { cn } from "@/lib/utils"

const DEMO_THUMB = "/assets/figma/activity-list/cover.jpeg"

type DemoOption = {
  value: string
  searchLabel: string
  rowProps: OptionRowProps
}

function renderOptionRow(rowProps: OptionRowProps, density: OptionRowDensity = "list") {
  return <OptionRow {...rowProps} density={density} />
}

const DEMO_OPTIONS: Record<OptionRowVariant, DemoOption[]> = {
  "code-title": [
    {
      value: "act-1",
      searchLabel: "A-123456 新年市集活動",
      rowProps: {
        variant: "code-title",
        code: "A-123456",
        title: "新年市集活動 — 本地手作與節慶小食",
      },
    },
    {
      value: "act-2",
      searchLabel: "A-234567 聖誕裝飾",
      rowProps: {
        variant: "code-title",
        code: "A-234567",
        title: "從 11 月中旬開始，香港街頭即換上璀璨聖誕裝",
      },
    },
    {
      value: "act-3",
      searchLabel: "A-345678 Enterprise onboarding",
      rowProps: {
        variant: "code-title",
        code: "A-345678",
        title: "Enterprise onboarding workshop",
      },
    },
  ],
  "title-badge": [
    {
      value: "act-1",
      searchLabel: "新年市集 Timeslot",
      rowProps: {
        variant: "title-badge",
        title: "新年市集活動 — 本地手作與節慶小食",
        badge: "Timeslot",
        badgeVariant: "Light",
      },
    },
    {
      value: "act-2",
      searchLabel: "聖誕裝飾 Registration",
      rowProps: {
        variant: "title-badge",
        title: "從 11 月中旬開始，香港街頭即換上璀璨聖誕裝",
        badge: "Registration",
        badgeVariant: "secondary",
      },
    },
    {
      value: "act-3",
      searchLabel: "Enterprise Ticket",
      rowProps: {
        variant: "title-badge",
        title: "Enterprise onboarding workshop",
        badge: "Ticket",
        badgeVariant: "outline",
      },
    },
  ],
  "title-description": [
    {
      value: "act-1",
      searchLabel: "新年市集",
      rowProps: {
        variant: "title-description",
        title: "新年市集活動 — 本地手作與節慶小食",
        description: "Draft · UTC+8 · Public",
      },
    },
    {
      value: "act-2",
      searchLabel: "聖誕裝飾",
      rowProps: {
        variant: "title-description",
        title: "從 11 月中旬開始，香港街頭即換上璀璨聖誕裝",
        description: "Upcoming · UTC+8 · Internal only",
      },
    },
    {
      value: "act-3",
      searchLabel: "Enterprise onboarding",
      rowProps: {
        variant: "title-description",
        title: "Enterprise onboarding workshop",
        description: "Registration · UTC+0 · Tenant only",
      },
    },
  ],
  "thumbnail-title": [
    {
      value: "act-1",
      searchLabel: "新年市集",
      rowProps: {
        variant: "thumbnail-title",
        thumbnailSrc: DEMO_THUMB,
        thumbnailAlt: "Activity cover",
        title: "新年市集活動 — 本地手作與節慶小食",
      },
    },
    {
      value: "act-2",
      searchLabel: "聖誕裝飾",
      rowProps: {
        variant: "thumbnail-title",
        thumbnailSrc: DEMO_THUMB,
        thumbnailAlt: "Activity cover",
        title: "從 11 月中旬開始，香港街頭即換上璀璨聖誕裝",
      },
    },
    {
      value: "act-3",
      searchLabel: "Christmas market",
      rowProps: {
        variant: "thumbnail-title",
        thumbnailSrc: DEMO_THUMB,
        thumbnailAlt: "Activity cover",
        title: "Christmas market pop-up at Central harbourfront",
      },
    },
  ],
}

const OPTION_ROW_ROWS: {
  id: OptionRowVariant
  composition: string
  notes: string
}[] = [
  {
    id: "code-title",
    composition: "Code + Title",
    notes: "Mono code leading; title truncates. Store `id` / `code` as value, not title.",
  },
  {
    id: "title-badge",
    composition: "Title + badge below",
    notes: "List: badge below title. Trigger: badge + title on one line.",
  },
  {
    id: "title-description",
    composition: "Title + description below",
    notes: "List: two lines. Trigger: `Title · description` on one line.",
  },
  {
    id: "thumbnail-title",
    composition: "Thumbnail + title",
    notes: "List: 32×32 thumb. Trigger: 24×24 thumb — same single row.",
  },
]

const SELECT_SHELL_CLASSNAME =
  "w-full max-w-md rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 p-1"

const TRIGGER_SHELL_CLASSNAME = cn(inputSelectTriggerClassName, "h-9 max-w-md")

function OptionRowInSelectShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={SELECT_SHELL_CLASSNAME}>
      <div
        role="option"
        aria-selected
        className="relative flex w-full cursor-default items-center rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden"
      >
        <span className="min-w-0 flex-1">{children}</span>
      </div>
    </div>
  )
}

function OptionRowFieldSelect({
  variant,
  label = "Activity",
}: {
  variant: OptionRowVariant
  label?: string
}) {
  const options = DEMO_OPTIONS[variant]

  return (
    <LibraryField className="max-w-md" label={label}>
      <Select defaultValue={options[0]?.value}>
        <SelectTrigger data-slot="field-control" className={TRIGGER_SHELL_CLASSNAME}>
          <SelectValue placeholder="Select activity">
            {(value: string | null) => {
              const option = options.find((item) => item.value === value)
              return option ? renderOptionRow(option.rowProps, "trigger") : null
            }}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {renderOptionRow(option.rowProps, "list")}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </LibraryField>
  )
}

function OptionRowFieldCombobox({
  variant,
  label = "Activity",
}: {
  variant: OptionRowVariant
  label?: string
}) {
  const options = DEMO_OPTIONS[variant]

  return (
    <LibraryField className="max-w-md" label={label}>
      <Combobox
        items={options}
        defaultValue={options[0]}
        itemToStringLabel={(option) => option.searchLabel}
        itemToStringValue={(option) => option.value}
      >
        <ComboboxInput
          data-slot="field-control"
          placeholder="Search activities…"
          className="max-w-full"
        />
        <ComboboxContent>
          <ComboboxEmpty>No activities found.</ComboboxEmpty>
          <ComboboxList>
            {(option) => (
              <ComboboxItem key={option.value} value={option}>
                {renderOptionRow(option.rowProps, "list")}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </LibraryField>
  )
}

export function OptionRowPage() {
  return (
    <PepDesignSystemPage title="Option row" contentClassName="space-y-10">
      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>
          Notes
        </h2>
        <p className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>
          Shared list-row layouts for selection menus — mount inside{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">SelectItem</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">ComboboxItem</code>, or{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">DropdownMenuCheckboxItem</code>
          . Use <code className="rounded bg-muted px-1 py-0.5 text-[11px]">density="list"</code> in
          the popup and{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">density="trigger"</code> in the
          closed control so multi-line compositions stay{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">h-9</code>. Combobox input
          keeps a single-line label via{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">itemToStringLabel</code>.
        </p>
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-4 tracking-tight text-foreground")}>
          Library
        </h2>
        <div className="rounded-xl border border-border/60 bg-muted px-4 py-5">
          <Table>
            <TableCaption
              className={cn(
                typeToken("text-xs/medium"),
                "caption-top mb-3 text-left text-muted-foreground",
              )}
            >
              OptionRow compositions
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[10rem]">Composition</TableHead>
                <TableHead className="w-[14rem]">Notes</TableHead>
                <TableHead className="w-[min(14rem,26%)]">List</TableHead>
                <TableHead className="w-[min(14rem,26%)]">Field select</TableHead>
                <TableHead className="w-[min(14rem,26%)]">Combobox</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {OPTION_ROW_ROWS.map((row) => {
                const sample = DEMO_OPTIONS[row.id][0]
                return (
                  <TableRow key={row.id}>
                    <TableCell
                      className={cn(typeToken("text-xs/medium"), "align-top text-foreground")}
                    >
                      <code className="rounded bg-background px-1 py-0.5 text-[11px]">
                        {row.id}
                      </code>
                      <div className="mt-1">{row.composition}</div>
                    </TableCell>
                    <TableCell
                      className={cn(typeToken("text-xs/normal"), "align-top text-muted-foreground")}
                    >
                      {row.notes}
                    </TableCell>
                    <TableCell className="align-top">
                      <OptionRowInSelectShell>
                        {renderOptionRow(sample.rowProps, "list")}
                      </OptionRowInSelectShell>
                    </TableCell>
                    <TableCell className="align-top">
                      <OptionRowFieldSelect variant={row.id} label={row.composition} />
                    </TableCell>
                    <TableCell className="align-top">
                      <OptionRowFieldCombobox variant={row.id} label={row.composition} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </section>
    </PepDesignSystemPage>
  )
}
