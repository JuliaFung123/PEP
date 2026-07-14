import * as React from "react"

import { PepDesignSystemPage } from "@/components/pep-chrome"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Stepper, StepperItem, StepperSeparator } from "@/components/ui/stepper"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const STEP_STATES = [
  { selected: true, label: "Selected" },
  { selected: false, label: "Unselected" },
] as const

const SEQUENCE_STEPS = ["Account", "Personal Info", "Billing", "Confirm"] as const

function SequenceDemo() {
  const [activeIndex, setActiveIndex] = React.useState(1)

  return (
    <Stepper className="w-fit max-w-full">
      {SEQUENCE_STEPS.map((label, index) => {
        const selected = index <= activeIndex
        const complete = index < activeIndex

        return (
          <React.Fragment key={label}>
            {index > 0 ? <StepperSeparator /> : null}
            <StepperItem
              selected={selected}
              icon={complete}
              step={index + 1}
              aria-current={index === activeIndex ? "step" : undefined}
              onClick={() => setActiveIndex(index)}
            >
              {label}
            </StepperItem>
          </React.Fragment>
        )
      })}
    </Stepper>
  )
}

export function SteppersPage() {
  return (
    <PepDesignSystemPage title="Steppers" contentClassName="space-y-10">
      <section>
        <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">Notes</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          No shadcn Stepper — PEP Figma component. Reference:{" "}
          <a
            href="https://www.figma.com/design/bRDWHAITfr5p6onqnKTf0q/--PEP-Web_Library?node-id=4967-1966"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            PEP Figma Stepper
          </a>
          . Props: <code className="rounded bg-muted px-1 py-0.5 text-[11px]">Selected</code> +{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">Icon</code>. Unselected steps use
          50% opacity.
        </p>
      </section>

      <section>
        <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">Library</h2>
        <p className="mb-4 text-xs text-muted-foreground">
          Approved PEP stepper compositions.{" "}
          <span className="font-medium text-foreground">
            Always pick a stepper from this section when creating layouts.
          </span>
        </p>

        <div className="space-y-0 divide-y rounded-xl border border-border/60 bg-muted">
          <div className="px-4 py-5">
            <Table>
              <TableCaption className="caption-top mb-3 text-left text-xs font-medium text-muted-foreground">
                Step item — state × number / icon
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[8.5rem]">State</TableHead>
                  <TableHead>Number</TableHead>
                  <TableHead>Icon</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {STEP_STATES.map((row) => (
                  <TableRow key={row.label}>
                    <TableCell>
                      <span className="font-mono text-xs text-muted-foreground">{row.label}</span>
                    </TableCell>
                    <TableCell>
                      <StepperItem selected={row.selected} icon={false} step={1}>
                        Text
                      </StepperItem>
                    </TableCell>
                    <TableCell>
                      <StepperItem selected={row.selected} icon>
                        Text
                      </StepperItem>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="px-4 py-5">
            <Card className="border-0 bg-transparent shadow-none ring-0">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Sequence</CardTitle>
                <CardDescription className="!text-muted-foreground">
                  Click a step to jump. Completed steps use the check icon.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0">
                <SequenceDemo />
              </CardContent>
              <CardFooter className="px-0 text-xs text-muted-foreground">
                Use Light / Dark in the sidebar to verify tokens.
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </PepDesignSystemPage>
  )
}
