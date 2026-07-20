import { AppleIcon, CheckIcon, ChevronDownIcon, UserIcon, XIcon, type LucideIcon } from "lucide-react"
import * as React from "react"

import { PepDesignSystemPage } from "@/components/pep-chrome"
import { LibraryField } from "@/components/library-field"
import { Label } from "@/components/ui/label"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"
import { Switch } from "@/components/ui/switch"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

const FRUITS = [
  { value: "apple", label: "Apple", icon: AppleIcon },
  { value: "banana", label: "Banana", icon: UserIcon, disabled: true },
  { value: "blueberry", label: "Blueberry", icon: AppleIcon },
] as const

const CITRUS = [
  { value: "orange", label: "Orange", icon: AppleIcon },
  { value: "lemon", label: "Lemon", icon: UserIcon },
] as const

const DEFAULT_ITEMS = FRUITS.map((fruit) => fruit.label)

const GROUPED_ITEMS = [
  { value: "Fruits", items: FRUITS.map((fruit) => fruit.label) },
  { value: "Citrus", items: CITRUS.map((fruit) => fruit.label) },
] as const


function isFruitDisabled(label: string) {
  return [...FRUITS, ...CITRUS].some(
    (fruit) => fruit.label === label && "disabled" in fruit && fruit.disabled,
  )
}

function fruitIcon(label: string): LucideIcon {
  return [...FRUITS, ...CITRUS].find((fruit) => fruit.label === label)?.icon ?? AppleIcon
}

type ComboboxOptions = {
  leadingIcon: boolean
  trailingCheckIcon: boolean
  clearButton: boolean
}

type ComboboxVariant = "default" | "group" | "default-multi" | "group-multi"

const comboboxPopupClassName =
  "w-64 rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10"

const comboboxListClassName =
  "max-h-72 scroll-py-1 overflow-y-auto overscroll-contain p-1"

const comboboxRowClassName =
  "relative flex w-full items-center gap-2 rounded-md py-1 pl-1.5 text-sm text-foreground"

function ComboboxItemPreviewRow({
  label,
  selected,
  disabled,
  leadingIcon,
  trailingCheckIcon,
}: {
  label: string
  selected?: boolean
  disabled?: boolean
  leadingIcon: boolean
  trailingCheckIcon: boolean
}) {
  const Icon = fruitIcon(label)

  return (
    <div
      role="option"
      aria-selected={selected || undefined}
      aria-disabled={disabled || undefined}
      className={cn(
        comboboxRowClassName,
        trailingCheckIcon ? "pr-8" : "pr-1.5",
        disabled && "pointer-events-none opacity-50",
      )}
    >
      {leadingIcon ? <Icon className="size-4" aria-hidden /> : null}
      <span className="min-w-0 truncate">{label}</span>
      {trailingCheckIcon && selected ? (
        <CheckIcon className="pointer-events-none absolute right-2 size-4" aria-hidden />
      ) : null}
    </div>
  )
}

function DefaultComboboxList({ options }: { options: ComboboxOptions }) {
  return (
    <div className={comboboxPopupClassName}>
      <div role="listbox" className={comboboxListClassName}>
        {DEFAULT_ITEMS.map((label, index) => (
          <ComboboxItemPreviewRow
            key={label}
            label={label}
            selected={index === 0}
            disabled={isFruitDisabled(label)}
            leadingIcon={options.leadingIcon}
            trailingCheckIcon={options.trailingCheckIcon}
          />
        ))}
      </div>
    </div>
  )
}

function GroupedComboboxList({ options }: { options: ComboboxOptions }) {
  return (
    <div className={comboboxPopupClassName}>
      <div role="listbox">
        {GROUPED_ITEMS.map((group, groupIndex) => (
          <React.Fragment key={group.value}>
            {groupIndex > 0 ? <div className="-mx-1 my-1 h-px bg-border" role="separator" /> : null}
            <div role="group" className={comboboxListClassName}>
              <div className={cn(typeToken("text-xs/normal"), "px-2 py-1.5 text-muted-foreground")}>
                {group.value}
              </div>
              {group.items.map((label, index) => (
                <ComboboxItemPreviewRow
                  key={label}
                  label={label}
                  selected={groupIndex === 0 && index === 0}
                  disabled={isFruitDisabled(label)}
                  leadingIcon={options.leadingIcon}
                  trailingCheckIcon={options.trailingCheckIcon}
                />
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

function ComboboxInputPreview({
  options,
  multi,
  value = multi ? "Apple" : "Apple",
}: {
  options: ComboboxOptions
  multi?: boolean
  value?: string
}) {
  if (multi) {
    return (
      <div
        className={cn(
          "flex min-h-8 w-full max-w-xs flex-wrap items-center gap-1 rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm",
          "dark:bg-input/30",
        )}
      >
        <span className="flex h-[calc(--spacing(5.25))] items-center gap-1 rounded-sm bg-muted px-1.5 text-xs font-medium text-foreground">
          Apple
          <XIcon className="size-3 opacity-50" aria-hidden />
        </span>
        <span className="min-w-16 flex-1 text-muted-foreground">Search…</span>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex h-8 w-full max-w-xs items-center rounded-lg border border-input bg-transparent dark:bg-input/30",
      )}
    >
      <span className="min-w-0 flex-1 truncate px-2.5 text-sm text-foreground">{value}</span>
      <div className="flex items-center pr-2">
        {options.clearButton ? (
          <XIcon className="size-4 text-muted-foreground opacity-70" aria-hidden />
        ) : null}
        <ChevronDownIcon className="size-4 text-muted-foreground" aria-hidden />
      </div>
    </div>
  )
}

function ComboboxOptionsSwitches({
  value,
  onChange,
}: {
  value: ComboboxOptions
  onChange: (next: ComboboxOptions) => void
}) {
  const rows: { id: string; key: keyof ComboboxOptions; label: string }[] = [
    { id: "combobox-leading-icon", key: "leadingIcon", label: "Leading icon" },
    { id: "combobox-trailing-check", key: "trailingCheckIcon", label: "Trailing checkIcon" },
    { id: "combobox-clear-button", key: "clearButton", label: "Clear button" },
  ]

  return (
    <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-3">
      {rows.map(({ id, key, label }) => (
        <div key={id} className="flex items-center gap-2">
          <Switch
            id={id}
            checked={value[key]}
            onCheckedChange={(checked) => onChange({ ...value, [key]: checked })}
            aria-label={label}
          />
          <Label htmlFor={id} className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>
            {label}
          </Label>
        </div>
      ))}
    </div>
  )
}

function renderComboboxItem(label: string, options: ComboboxOptions) {
  const Icon = fruitIcon(label)

  return (
    <ComboboxItem
      key={label}
      value={label}
      disabled={isFruitDisabled(label)}
      showIndicator={options.trailingCheckIcon}
    >
      {options.leadingIcon ? <Icon className="size-4" aria-hidden /> : null}
      {label}
    </ComboboxItem>
  )
}

function LiveCombobox({
  variant,
  options,
}: {
  variant: ComboboxVariant
  options: ComboboxOptions
}) {
  const anchor = useComboboxAnchor()
  const isMulti = variant === "default-multi" || variant === "group-multi"
  const isGrouped = variant === "group" || variant === "group-multi"

  const listContent = isGrouped ? (
    <ComboboxList>
      {(group, index) => (
        <ComboboxGroup key={group.value} items={group.items}>
          <ComboboxLabel>{group.value}</ComboboxLabel>
          <ComboboxCollection>
            {(item) => renderComboboxItem(item, options)}
          </ComboboxCollection>
          {index < GROUPED_ITEMS.length - 1 ? <ComboboxSeparator /> : null}
        </ComboboxGroup>
      )}
    </ComboboxList>
  ) : (
    <ComboboxList>{(item) => renderComboboxItem(item, options)}</ComboboxList>
  )

  if (isMulti) {
    return (
      <Combobox
        multiple
        items={isGrouped ? GROUPED_ITEMS : DEFAULT_ITEMS}
        defaultValue={["Apple"]}
      >
        <ComboboxChips ref={anchor} data-slot="field-control" className="w-full max-w-full">
          <ComboboxValue>
            {(values) => (
              <React.Fragment>
                {values.map((value: string) => (
                  <ComboboxChip key={value}>{value}</ComboboxChip>
                ))}
                <ComboboxChipsInput placeholder="Search…" />
              </React.Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
          <ComboboxEmpty>No results found.</ComboboxEmpty>
          {listContent}
        </ComboboxContent>
      </Combobox>
    )
  }

  return (
    <Combobox items={isGrouped ? GROUPED_ITEMS : DEFAULT_ITEMS} defaultValue="Apple">
      <ComboboxInput
        data-slot="field-control"
        placeholder="Search…"
        showClear={options.clearButton}
        className="max-w-full"
      />
      <ComboboxContent>
        <ComboboxEmpty>No results found.</ComboboxEmpty>
        {listContent}
      </ComboboxContent>
    </Combobox>
  )
}

const VARIANT_SECTIONS: {
  variant: ComboboxVariant
  title: string
  description: string
  multi: boolean
}[] = [
  {
    variant: "default",
    title: "Default",
    description: "Flat list — ComboboxInput + ComboboxItem",
    multi: false,
  },
  {
    variant: "group",
    title: "Grouped",
    description: "Grouped list — ComboboxLabel, ComboboxSeparator",
    multi: false,
  },
  {
    variant: "default-multi",
    title: "Default Multi",
    description: "Multi-select — ComboboxChips + ComboboxChip",
    multi: true,
  },
  {
    variant: "group-multi",
    title: "Grouped Multi",
    description: "Multi-select with grouped ComboboxItem rows",
    multi: true,
  },
]

function ComboboxVariantSection({
  variant,
  title,
  description,
  multi,
  options,
}: (typeof VARIANT_SECTIONS)[number] & { options: ComboboxOptions }) {
  return (
    <div className="space-y-4">
      <h3 className={cn(typeToken("text-xs/semibold"), "text-foreground")}>{title}</h3>
      <p className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>{description}</p>
      <ComboboxInputPreview options={options} multi={multi} />
      {variant === "default" || variant === "default-multi" ? (
        <DefaultComboboxList options={options} />
      ) : (
        <GroupedComboboxList options={options} />
      )}
      <LibraryField className="max-w-xs" label="Live">
        <LiveCombobox variant={variant} options={options} />
      </LibraryField>
    </div>
  )
}

export function ComboboxPage() {
  const [itemOptions, setItemOptions] = React.useState<ComboboxOptions>({
    leadingIcon: false,
    trailingCheckIcon: true,
    clearButton: false,
  })

  return (
    <PepDesignSystemPage title="Combobox" contentClassName="space-y-10">
      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>
          Notes
        </h2>
        <p className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>
          Filterable select built on Base UI{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">Combobox</code> — popup rows
          use <code className="rounded bg-muted px-1 py-0.5 text-[11px]">ComboboxItem</code>. Contrast
          with{" "}
          <a href="/preview/select" className="text-foreground underline underline-offset-2">
            Select
          </a>{" "}
          (button trigger, no filter).
        </p>
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-4 tracking-tight text-foreground")}>
          Library
        </h2>

        <ComboboxOptionsSwitches value={itemOptions} onChange={setItemOptions} />

        <div className="grid gap-8 lg:grid-cols-2">
          {VARIANT_SECTIONS.map((section) => (
            <ComboboxVariantSection key={section.variant} {...section} options={itemOptions} />
          ))}
        </div>
      </section>
    </PepDesignSystemPage>
  )
}
