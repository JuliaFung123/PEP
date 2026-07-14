import { PepDesignSystemPage } from "@/components/pep-chrome"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const ITEM_SPACING = [
  {
    name: "Compact",
    gapClass: "gap-1",
    px: "4px",
    note: "Tight stacks / dense settings",
  },
  {
    name: "Default",
    gapClass: "gap-2",
    px: "8px",
    note: "RadioGroup built-in default",
  },
  {
    name: "Comfortable",
    gapClass: "gap-3",
    px: "12px",
    note: "Airier lists / preference UIs",
  },
] as const

function SpacingDemo({
  name,
  gapClass,
  px,
}: {
  name: string
  gapClass: string
  px: string
}) {
  const id = name.toLowerCase()
  return (
    <div className="min-w-0 flex-1 space-y-2">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span className="text-xs font-medium text-foreground">{name}</span>
        <code className="rounded bg-muted px-1 py-0.5 text-[11px] text-muted-foreground">
          {gapClass}
        </code>
        <span className="text-[11px] text-muted-foreground">{px}</span>
      </div>
      <RadioGroup defaultValue={`${id}-a`} className={gapClass}>
        <div className="flex items-center gap-2">
          <RadioGroupItem value={`${id}-a`} id={`${id}-a`} />
          <Label htmlFor={`${id}-a`}>Option A</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value={`${id}-b`} id={`${id}-b`} />
          <Label htmlFor={`${id}-b`}>Option B</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value={`${id}-c`} id={`${id}-c`} />
          <Label htmlFor={`${id}-c`}>Option C</Label>
        </div>
      </RadioGroup>
    </div>
  )
}

export function RadioCheckboxPage() {
  return (
    <PepDesignSystemPage title="Radio / Checkbox" contentClassName="space-y-10">
      <section>
        <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">Library</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          References:{" "}
          <a
            href="https://ui.shadcn.com/docs/components/checkbox"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            Checkbox
          </a>
          {" · "}
          <a
            href="https://ui.shadcn.com/docs/components/radio-group"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            Radio Group
          </a>
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Radio / Checkbox</CardTitle>
            <CardDescription className="!text-muted-foreground">
              Default shadcn compositions — both use size-4 controls with primary checked state.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground">Checkbox</div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Checkbox id="terms" defaultChecked />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="marketing" />
                  <Label htmlFor="marketing">Send me product updates</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="disabled" disabled />
                  <Label htmlFor="disabled">Disabled</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="disabled-checked" defaultChecked disabled />
                  <Label htmlFor="disabled-checked">Selected + disabled</Label>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground">Radio</div>
              <RadioGroup defaultValue="disabled-checked">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="a" id="r-a" />
                  <Label htmlFor="r-a">Option A</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="b" id="r-b" />
                  <Label htmlFor="r-b">Option B</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="c" id="r-c" />
                  <Label htmlFor="r-c">Option C</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="disabled" id="r-disabled" disabled />
                  <Label htmlFor="r-disabled">Disabled</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    value="disabled-checked"
                    id="r-disabled-checked"
                    disabled
                  />
                  <Label htmlFor="r-disabled-checked">Selected + disabled</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Use Light / Dark in the sidebar to verify tokens.
          </CardFooter>
        </Card>
      </section>

      <section>
        <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">
          Item spacing
        </h2>
        <p className="mb-3 text-xs text-muted-foreground">
          Vertical gap between radio/checkbox rows. Override{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">RadioGroup</code>{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">className</code> (default{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">gap-2</code>).
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Density</CardTitle>
            <CardDescription className="!text-muted-foreground">
              Compact / Default / Comfortable side by side — gap values listed below.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="overflow-x-auto rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Density</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Gap</TableHead>
                    <TableHead>Use</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ITEM_SPACING.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell>
                        <code className="text-[11px]">{row.gapClass}</code>
                      </TableCell>
                      <TableCell>{row.px}</TableCell>
                      <TableCell className="text-muted-foreground">{row.note}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
              {ITEM_SPACING.map((row) => (
                <SpacingDemo
                  key={row.name}
                  name={row.name}
                  gapClass={row.gapClass}
                  px={row.px}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </PepDesignSystemPage>
  )
}
