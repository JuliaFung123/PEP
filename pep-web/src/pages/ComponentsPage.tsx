import * as React from "react"

import { PepDesignSystemPage, PepTopBar } from "@/components/pep-chrome"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ComponentsPage() {
  const [topBarSearch, setTopBarSearch] = React.useState("")

  return (
    <PepDesignSystemPage title="Components">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Top Bar</CardTitle>
            <CardDescription className="!text-muted-foreground">
              PEP admin top bar preview (search + utilities). Reference: Figma Top Bar (126:5145).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-xl border bg-background">
              <PepTopBar
                sticky={false}
                value={topBarSearch}
                onChange={setTopBarSearch}
                searchPlaceholder="Placeholder"
                languageLabel="繁"
                className="border-0"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tabs & switch</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground">Tabs</div>
                <Tabs defaultValue="account" className="w-full">
                  <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account">
                    <div className="text-sm font-medium text-foreground">Account</div>
                    <p className="mt-1 text-sm text-muted-foreground">Default Tabs component preview.</p>
                  </TabsContent>
                  <TabsContent value="password">
                    <div className="text-sm font-medium text-foreground">Password</div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Focus the triggers to validate ring tokens.
                    </p>
                  </TabsContent>
                  <TabsContent value="billing">
                    <div className="text-sm font-medium text-foreground">Billing</div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Active tab uses background + elevation token.
                    </p>
                  </TabsContent>
                </Tabs>
              </div>

              <label className="flex cursor-pointer items-center gap-3 text-sm">
                <Switch defaultChecked />
                <span className="text-muted-foreground">Switch</span>
              </label>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Use Light / Dark in the sidebar to verify tokens.
          </CardFooter>
        </Card>
    </PepDesignSystemPage>
  )
}

