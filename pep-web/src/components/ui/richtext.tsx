import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Image,
  IndentDecrease,
  IndentIncrease,
  Italic,
  Link,
  List,
  ListOrdered,
  Maximize2,
  Play,
  Redo2,
  RemoveFormatting,
  Table,
  Undo2,
  Unlink,
} from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

export type RichtextLocale = "en" | "zh-hant" | "zh-hans"

export type RichtextState = "default" | "readonly"

const LOCALE_OPTIONS: { value: RichtextLocale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "zh-hant", label: "繁" },
  { value: "zh-hans", label: "简" },
]

const READONLY_DEMO_VALUE =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel maximus ligula. Proin tortor mauris, placerat a vulputate et, laoreet ut magna. Ut ut lectus cursus, maximus augue at, finibus nunc. Morbi facilisis augue in odio semper, ultricies tincidunt dolor rutrum. Maecenas at tempor erat. Sed orci enim, scelerisque ut scelerisque id, posuere et urna. Duis vulputate nunc ut purus condimentum cursus. Nullam faucibus enim vel quam interdum, quis consectetur nibh ullamcorper."

function RichtextToolbarDivider() {
  return <span className="h-[18px] w-px shrink-0 bg-border" aria-hidden />
}

function RichtextToolbarIconButton({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      className={cn(
        "size-[18px] min-h-[18px] min-w-[18px] shrink-0 rounded-[5px] p-0 text-foreground hover:bg-muted",
        "[&_svg]:size-[18px]",
      )}
      aria-label={label}
    >
      {children}
    </Button>
  )
}

function RichtextLocaleTabs({
  locale,
  onLocaleChange,
}: {
  locale: RichtextLocale
  onLocaleChange?: (locale: RichtextLocale) => void
}) {
  return (
    <ToggleGroup
      spacing={0}
      variant="outline"
      size="sm"
      value={[locale]}
      onValueChange={(next) => {
        const selected = next.at(-1)
        if (selected) onLocaleChange?.(selected as RichtextLocale)
      }}
      className="shadow-none"
    >
      {LOCALE_OPTIONS.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          aria-label={option.label}
          className={cn(typeToken("text-xs/medium"), "text-muted-foreground aria-pressed:text-foreground")}
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

function RichtextToolbar() {
  return (
    <div
      data-slot="richtext-toolbar"
      className="flex flex-wrap items-center gap-2.5 border-b border-border bg-background p-3"
    >
      <RichtextToolbarIconButton label="Undo">
        <Undo2 aria-hidden />
      </RichtextToolbarIconButton>
      <RichtextToolbarIconButton label="Redo">
        <Redo2 aria-hidden />
      </RichtextToolbarIconButton>

      <RichtextToolbarDivider />

      <Button
        type="button"
        variant="ghost"
        className={cn(
          typeToken("text-xs/semibold"),
          "h-[18px] rounded-[5px] px-2 py-0 text-foreground hover:bg-muted",
        )}
      >
        {"{{ Insert Variable}}"}
      </Button>

      <RichtextToolbarDivider />

      <RichtextToolbarIconButton label="Bold">
        <Bold aria-hidden />
      </RichtextToolbarIconButton>
      <RichtextToolbarIconButton label="Italic">
        <Italic aria-hidden />
      </RichtextToolbarIconButton>

      <RichtextToolbarDivider />

      <RichtextToolbarIconButton label="Align left">
        <AlignLeft aria-hidden />
      </RichtextToolbarIconButton>
      <RichtextToolbarIconButton label="Align center">
        <AlignCenter aria-hidden />
      </RichtextToolbarIconButton>
      <RichtextToolbarIconButton label="Align right">
        <AlignRight aria-hidden />
      </RichtextToolbarIconButton>
      <RichtextToolbarIconButton label="Justify">
        <AlignJustify aria-hidden />
      </RichtextToolbarIconButton>

      <RichtextToolbarDivider />

      <RichtextToolbarIconButton label="Bulleted list">
        <List aria-hidden />
      </RichtextToolbarIconButton>
      <RichtextToolbarIconButton label="Numbered list">
        <ListOrdered aria-hidden />
      </RichtextToolbarIconButton>

      <RichtextToolbarDivider />

      <RichtextToolbarIconButton label="Decrease indent">
        <IndentDecrease aria-hidden />
      </RichtextToolbarIconButton>
      <RichtextToolbarIconButton label="Increase indent">
        <IndentIncrease aria-hidden />
      </RichtextToolbarIconButton>

      <RichtextToolbarDivider />

      <RichtextToolbarIconButton label="Insert link">
        <Link aria-hidden />
      </RichtextToolbarIconButton>
      <RichtextToolbarIconButton label="Remove link">
        <Unlink aria-hidden />
      </RichtextToolbarIconButton>
      <RichtextToolbarIconButton label="Insert image">
        <Image aria-hidden />
      </RichtextToolbarIconButton>
      <RichtextToolbarIconButton label="Insert video">
        <Play aria-hidden />
      </RichtextToolbarIconButton>
      <div className="flex items-center">
        <RichtextToolbarIconButton label="Insert table">
          <Table aria-hidden />
        </RichtextToolbarIconButton>
        <RichtextToolbarIconButton label="Table options">
          <ChevronDown aria-hidden />
        </RichtextToolbarIconButton>
      </div>

      <RichtextToolbarDivider />

      <RichtextToolbarIconButton label="Clear formatting">
        <RemoveFormatting aria-hidden />
      </RichtextToolbarIconButton>

      <RichtextToolbarDivider />

      <RichtextToolbarIconButton label="Fullscreen">
        <Maximize2 aria-hidden />
      </RichtextToolbarIconButton>
    </div>
  )
}

export type RichtextProps = {
  /** Visual shell — editable with toolbar, or read-only content only. */
  state?: RichtextState
  locale?: RichtextLocale
  onLocaleChange?: (locale: RichtextLocale) => void
  value?: string
  defaultValue?: string
  placeholder?: string
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
  className?: string
  /** Editor shell height for default state demos. */
  editorClassName?: string
  /** Grow to fill parent height (e.g. full-page popup 圖文詳情 tab). */
  fillHeight?: boolean
}

/**
 * Richtext — locale tabs + formatting toolbar + resizable field (Figma 4845:1506).
 * @see https://www.figma.com/design/bRDWHAITfr5p6onqnKTf0q/--PEP-Web_Library?node-id=4845-1506
 */
export function Richtext({
  state = "default",
  locale: localeProp,
  onLocaleChange,
  value,
  defaultValue,
  placeholder = "Placeholder",
  onChange,
  className,
  editorClassName,
  fillHeight = false,
}: RichtextProps) {
  const [localeUncontrolled, setLocaleUncontrolled] = React.useState<RichtextLocale>("zh-hant")
  const locale = localeProp ?? localeUncontrolled
  const setLocale = onLocaleChange ?? setLocaleUncontrolled

  const isReadonly = state === "readonly"

  const textareaProps =
    value !== undefined
      ? { value, onChange }
      : {
          defaultValue: defaultValue ?? (isReadonly ? READONLY_DEMO_VALUE : undefined),
          onChange,
        }

  return (
    <div
      data-slot="richtext"
      data-state={state}
      className={cn(
        "flex w-full max-w-[884px] flex-col gap-2",
        fillHeight ? "h-full min-h-0 flex-1" : state === "default" && "min-h-[480px]",
        className,
      )}
    >
      <RichtextLocaleTabs locale={locale} onLocaleChange={setLocale} />

      <div
        className={cn(
          "flex w-full flex-col overflow-hidden",
          isReadonly
            ? "shrink-0 border-b border-border"
            : "min-h-0 flex-1 rounded-lg border border-border",
          editorClassName,
        )}
      >
        {!isReadonly ? <RichtextToolbar /> : null}

        <div className={cn("flex min-h-0 w-full flex-col", !isReadonly && "min-h-0 flex-1")}>
          <div
            className={cn(
              "relative flex min-h-[72px] w-full gap-1 bg-background px-2 py-1.5",
              isReadonly
                ? "shrink-0 rounded-lg border border-border"
                : "min-h-0 flex-1",
            )}
          >
            <textarea
              {...textareaProps}
              placeholder={isReadonly ? undefined : placeholder}
              readOnly={isReadonly}
              className={cn(
                typeToken("text-sm/normal"),
                "w-full min-w-0 flex-1 border-0 bg-transparent p-0.5 leading-5 outline-none",
                fillHeight
                  ? "min-h-0 h-full resize-none"
                  : "min-h-[60px] resize-y",
                isReadonly ? "text-foreground" : "text-muted-foreground placeholder:text-muted-foreground",
                !isReadonly && !fillHeight && "min-h-[420px]",
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
