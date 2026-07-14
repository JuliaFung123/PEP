import { PepDesignSystemPage } from "@/components/pep-chrome"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function SwitchPage() {
  return (
    <PepDesignSystemPage title="Switch" contentClassName="space-y-10">
      <section>
        <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">Library</h2>
        <p className="mb-3 text-xs text-muted-foreground">
          Reference:{" "}
          <a
            href="https://ui.shadcn.com/docs/components/switch"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            shadcn/ui Switch
          </a>
          {" — "}
          sizes <code className="rounded bg-muted px-1 py-0.5 text-[11px]">default</code> (32×18.4) and{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">sm</code> (24×14).
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Switch</CardTitle>
            <CardDescription className="!text-muted-foreground">
              Checked uses <code className="text-[11px]">primary</code>; unchecked uses{" "}
              <code className="text-[11px]">input</code>.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground">Default</div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Switch id="sw-enabled" />
                  <Label htmlFor="sw-enabled">Enabled</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="sw-disabled" disabled />
                  <Label htmlFor="sw-disabled">Disabled</Label>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground">Small</div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Switch id="sw-sm-enabled" size="sm" />
                  <Label htmlFor="sw-sm-enabled">Enabled</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="sw-sm-disabled" size="sm" disabled />
                  <Label htmlFor="sw-sm-disabled">Disabled</Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Use Light / Dark in the sidebar to verify tokens.
          </CardFooter>
        </Card>
      </section>
    </PepDesignSystemPage>
  )
}
