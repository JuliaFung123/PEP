import { AppleIcon, CheckIcon, UserIcon, type LucideIcon } from "lucide-react"
import * as React from "react"

import { PepDesignSystemPage } from "@/components/pep-chrome"
import { LibraryField } from "@/components/library-field"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { typeToken } from "@/data/typography-tokens"
import { inputSelectTriggerClassName } from "@/lib/input-surface-classes"
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

type FruitOption = (typeof FRUITS)[number] | (typeof CITRUS)[number]

function isFruitDisabled(fruit: FruitOption) {
  return "disabled" in fruit && fruit.disabled === true
}

type SelectItemOptions = {
  leadingIcon: boolean
  trailingCheckIcon: boolean
}

const selectPopupClassName =
  "w-64 rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10"

const selectGroupClassName = "scroll-my-1 p-1"

const selectRowClassName =
  "relative flex w-full items-center gap-1.5 rounded-md py-1 pl-1.5 text-sm text-foreground"

function SelectItemPreviewRow({
  label,
  icon: Icon,
  selected,
  disabled,
  leadingIcon,
  trailingCheckIcon,
}: {
  label: string
  icon: LucideIcon
  selected?: boolean
  disabled?: boolean
  leadingIcon: boolean
  trailingCheckIcon: boolean
}) {
  return (
    <div
      role="option"
      aria-selected={selected || undefined}
      aria-disabled={disabled || undefined}
      className={cn(
        selectRowClassName,
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

function DefaultSelectList({ options }: { options: SelectItemOptions }) {
  return (
    <div className={selectPopupClassName}>
      <div role="group" className={selectGroupClassName}>
        <div role="listbox">
          {FRUITS.map((fruit, index) => (
            <SelectItemPreviewRow
              key={fruit.value}
              label={fruit.label}
              icon={fruit.icon}
              selected={index === 0}
              disabled={isFruitDisabled(fruit)}
              leadingIcon={options.leadingIcon}
              trailingCheckIcon={options.trailingCheckIcon}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function GroupSelectList({ options }: { options: SelectItemOptions }) {
  return (
    <div className={selectPopupClassName}>
      <div role="listbox">
        <div role="group" className={selectGroupClassName}>
          <div className={cn(typeToken("text-xs/normal"), "px-1.5 py-1 text-muted-foreground")}>
            Fruits
          </div>
          {FRUITS.map((fruit, index) => (
            <SelectItemPreviewRow
              key={fruit.value}
              label={fruit.label}
              icon={fruit.icon}
              selected={index === 0}
              disabled={isFruitDisabled(fruit)}
              leadingIcon={options.leadingIcon}
              trailingCheckIcon={options.trailingCheckIcon}
            />
          ))}
        </div>
        <div className="-mx-1 my-1 h-px bg-border" role="separator" />
        <div role="group" className={selectGroupClassName}>
          <div className={cn(typeToken("text-xs/normal"), "px-1.5 py-1 text-muted-foreground")}>
            Citrus
          </div>
          {CITRUS.map((fruit) => (
            <SelectItemPreviewRow
              key={fruit.value}
              label={fruit.label}
              icon={fruit.icon}
              disabled={isFruitDisabled(fruit)}
              leadingIcon={options.leadingIcon}
              trailingCheckIcon={options.trailingCheckIcon}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function SelectItemOptionsSwitches({
  value,
  onChange,
}: {
  value: SelectItemOptions
  onChange: (next: SelectItemOptions) => void
}) {
  const rows: { id: string; key: keyof SelectItemOptions; label: string }[] = [
    { id: "select-leading-icon", key: "leadingIcon", label: "Leading icon" },
    { id: "select-trailing-check", key: "trailingCheckIcon", label: "Trailing checkIcon" },
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

function LiveSelect({
  variant,
  options,
}: {
  variant: "default" | "group"
  options: SelectItemOptions
}) {
  const renderItem = (fruit: FruitOption) => (
    <SelectItem
      key={fruit.value}
      value={fruit.value}
      disabled={isFruitDisabled(fruit)}
      showIndicator={options.trailingCheckIcon}
    >
      {options.leadingIcon ? <fruit.icon className="size-4" aria-hidden /> : null}
      {fruit.label}
    </SelectItem>
  )

  return (
    <Select defaultValue="apple">
      <SelectTrigger
        data-slot="field-control"
        className={cn(inputSelectTriggerClassName, "max-w-full")}
      >
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        {variant === "default" ? (
          <SelectGroup>{FRUITS.map(renderItem)}</SelectGroup>
        ) : (
          <>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              {FRUITS.map(renderItem)}
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Citrus</SelectLabel>
              {CITRUS.map(renderItem)}
            </SelectGroup>
          </>
        )}
      </SelectContent>
    </Select>
  )
}

export function SelectPage() {
  const [itemOptions, setItemOptions] = React.useState<SelectItemOptions>({
    leadingIcon: false,
    trailingCheckIcon: true,
  })

  return (
    <PepDesignSystemPage title="Select" contentClassName="space-y-10">
      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-1 tracking-tight text-foreground")}>
          Notes
        </h2>
        <p className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>
          Stock shadcn / Base UI{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">Select</code> — popup rows use{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">SelectItem</code> inside{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">SelectGroup</code>. For form
          fields, use{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">FieldSelect</code> on the{" "}
          <a href="/preview/input-type" className="text-foreground underline underline-offset-2">
            Field
          </a>{" "}
          page.
        </p>
      </section>

      <section>
        <h2 className={cn(typeToken("text-sm/semibold"), "mb-4 tracking-tight text-foreground")}>
          Library
        </h2>

        <SelectItemOptionsSwitches value={itemOptions} onChange={setItemOptions} />

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <h3 className={cn(typeToken("text-xs/semibold"), "text-foreground")}>Default</h3>
            <p className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>
              Flat list — <code className="rounded bg-muted px-1 py-0.5 text-[11px]">SelectGroup</code>{" "}
              + <code className="rounded bg-muted px-1 py-0.5 text-[11px]">SelectItem</code>
            </p>
            <DefaultSelectList options={itemOptions} />
            <LibraryField className="max-w-xs" label="Live">
              <LiveSelect variant="default" options={itemOptions} />
            </LibraryField>
          </div>

          <div className="space-y-4">
            <h3 className={cn(typeToken("text-xs/semibold"), "text-foreground")}>Group</h3>
            <p className={cn(typeToken("text-xs/normal"), "text-muted-foreground")}>
              Grouped list — <code className="rounded bg-muted px-1 py-0.5 text-[11px]">SelectLabel</code>
              , <code className="rounded bg-muted px-1 py-0.5 text-[11px]">SelectSeparator</code>
            </p>
            <GroupSelectList options={itemOptions} />
            <LibraryField className="max-w-xs" label="Live">
              <LiveSelect variant="group" options={itemOptions} />
            </LibraryField>
          </div>
        </div>
      </section>
    </PepDesignSystemPage>
  )
}
