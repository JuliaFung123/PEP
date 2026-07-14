import { Plus } from "lucide-react"

import { PepDesignSystemPage } from "@/components/pep-chrome"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import {
  AVATAR_NAME_ID_TYPOGRAPHY_ID,
  AVATAR_NAME_SUBTITLE_TYPOGRAPHY_ID,
  AVATAR_NAME_TYPOGRAPHY_ID,
  typographyClassName,
} from "@/data/typography-samples"
import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const AVATAR_SIZES = [
  { token: "xs", size: "xs" as const, heightPx: 20 },
  { token: "sm", size: "sm" as const, heightPx: 24 },
  { token: "default", size: "default" as const, heightPx: 32 },
  { token: "lg", size: "lg" as const, heightPx: 40 },
] as const

const AVATAR_IMAGES = {
  shadcn: {
    src: "https://github.com/shadcn.png",
    alt: "@shadcn",
    fallback: "CN",
    name: "Full Name",
    id: "12345678",
    subtitle: "subtitle",
  },
  max: {
    src: "https://github.com/maxleiter.png",
    alt: "@maxleiter",
    fallback: "ML",
    name: "Max Leiter",
  },
  evil: {
    src: "https://github.com/evilrabbit.png",
    alt: "@evilrabbit",
    fallback: "ER",
    name: "Evil Rabbit",
  },
} as const

const AVATAR_COMPOSITIONS = [
  { id: "with-name", label: "Avatar + name" },
  { id: "badge", label: "AvatarBadge" },
  { id: "badge-icon", label: "AvatarBadge (icon)" },
  { id: "group", label: "AvatarGroup" },
  { id: "group-count", label: "AvatarGroupCount" },
  { id: "group-count-icon", label: "AvatarGroupCount (icon)" },
] as const

type AvatarSize = (typeof AVATAR_SIZES)[number]["size"]
type AvatarCompositionId = (typeof AVATAR_COMPOSITIONS)[number]["id"]

function AvatarWithNameRow({ size }: { size: AvatarSize }) {
  return (
    <div
      className={cn(
        "flex min-w-0 max-w-[14rem] items-center",
        size === "xs" && "gap-1",
        size === "sm" && "gap-1.5",
        size === "default" && "gap-2",
        size === "lg" && "gap-2.5",
      )}
    >
      <Avatar size={size} className="shrink-0">
        <AvatarImage src={AVATAR_IMAGES.shadcn.src} alt={AVATAR_IMAGES.shadcn.alt} />
        <AvatarFallback>{AVATAR_IMAGES.shadcn.fallback}</AvatarFallback>
      </Avatar>
      <div className="grid min-w-0 flex-1 text-left leading-tight">
        <small className={cn("truncate", typographyClassName(AVATAR_NAME_TYPOGRAPHY_ID))}>
          {AVATAR_IMAGES.shadcn.name}
        </small>
        {size === "lg" ? (
          <p className={cn("truncate", typographyClassName(AVATAR_NAME_ID_TYPOGRAPHY_ID))}>
            {AVATAR_IMAGES.shadcn.id}
          </p>
        ) : null}
        {size !== "sm" && size !== "xs" ? (
          <p className={cn("truncate", typographyClassName(AVATAR_NAME_SUBTITLE_TYPOGRAPHY_ID))}>
            {AVATAR_IMAGES.shadcn.subtitle}
          </p>
        ) : null}
      </div>
    </div>
  )
}

function AvatarCompositionPreview({
  composition,
  size,
}: {
  composition: AvatarCompositionId
  size: AvatarSize
}) {
  switch (composition) {
    case "with-name":
      return <AvatarWithNameRow size={size} />
    case "badge":
      return (
        <Avatar size={size}>
          <AvatarImage src={AVATAR_IMAGES.shadcn.src} alt={AVATAR_IMAGES.shadcn.alt} />
          <AvatarFallback>{AVATAR_IMAGES.shadcn.fallback}</AvatarFallback>
          <AvatarBadge className="bg-green-600 dark:bg-green-800" />
        </Avatar>
      )
    case "badge-icon":
      return (
        <Avatar size={size}>
          <AvatarImage src={AVATAR_IMAGES.max.src} alt={AVATAR_IMAGES.max.alt} />
          <AvatarFallback>{AVATAR_IMAGES.max.fallback}</AvatarFallback>
          <AvatarBadge>
            <Plus aria-hidden />
          </AvatarBadge>
        </Avatar>
      )
    case "group":
      return (
        <AvatarGroup>
          <Avatar size={size}>
            <AvatarImage src={AVATAR_IMAGES.shadcn.src} alt={AVATAR_IMAGES.shadcn.alt} />
            <AvatarFallback>{AVATAR_IMAGES.shadcn.fallback}</AvatarFallback>
          </Avatar>
          <Avatar size={size}>
            <AvatarImage src={AVATAR_IMAGES.max.src} alt={AVATAR_IMAGES.max.alt} />
            <AvatarFallback>{AVATAR_IMAGES.max.fallback}</AvatarFallback>
          </Avatar>
          <Avatar size={size}>
            <AvatarImage src={AVATAR_IMAGES.evil.src} alt={AVATAR_IMAGES.evil.alt} />
            <AvatarFallback>{AVATAR_IMAGES.evil.fallback}</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      )
    case "group-count":
      return (
        <AvatarGroup>
          <Avatar size={size}>
            <AvatarImage src={AVATAR_IMAGES.shadcn.src} alt={AVATAR_IMAGES.shadcn.alt} />
            <AvatarFallback>{AVATAR_IMAGES.shadcn.fallback}</AvatarFallback>
          </Avatar>
          <Avatar size={size}>
            <AvatarImage src={AVATAR_IMAGES.max.src} alt={AVATAR_IMAGES.max.alt} />
            <AvatarFallback>{AVATAR_IMAGES.max.fallback}</AvatarFallback>
          </Avatar>
          <Avatar size={size}>
            <AvatarImage src={AVATAR_IMAGES.evil.src} alt={AVATAR_IMAGES.evil.alt} />
            <AvatarFallback>{AVATAR_IMAGES.evil.fallback}</AvatarFallback>
          </Avatar>
          <AvatarGroupCount>+3</AvatarGroupCount>
        </AvatarGroup>
      )
    case "group-count-icon":
      return (
        <AvatarGroup>
          <Avatar size={size}>
            <AvatarImage src={AVATAR_IMAGES.shadcn.src} alt={AVATAR_IMAGES.shadcn.alt} />
            <AvatarFallback>{AVATAR_IMAGES.shadcn.fallback}</AvatarFallback>
          </Avatar>
          <Avatar size={size}>
            <AvatarImage src={AVATAR_IMAGES.max.src} alt={AVATAR_IMAGES.max.alt} />
            <AvatarFallback>{AVATAR_IMAGES.max.fallback}</AvatarFallback>
          </Avatar>
          <AvatarGroupCount>
            <Plus aria-hidden />
          </AvatarGroupCount>
        </AvatarGroup>
      )
  }
}

function AvatarSizeCell({ token, heightPx }: { token: string; heightPx: number }) {
  return (
    <span className="font-mono text-xs text-muted-foreground">
      {token} = {heightPx}px
    </span>
  )
}

function AvatarLibraryPreview() {
  return (
    <div className="space-y-0 divide-y rounded-xl border border-border/60 bg-muted">
      <div className="px-4 py-5">
        <Table>
          <TableCaption className="caption-top mb-3 text-left text-xs font-medium text-muted-foreground">
            Avatar sizes
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[8.5rem]">Size</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Fallback</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {AVATAR_SIZES.map(({ token, size, heightPx }) => (
              <TableRow key={token}>
                <TableCell>
                  <AvatarSizeCell token={token} heightPx={heightPx} />
                </TableCell>
                <TableCell>
                  <Avatar size={size}>
                    <AvatarImage src={AVATAR_IMAGES.shadcn.src} alt={AVATAR_IMAGES.shadcn.alt} />
                    <AvatarFallback>{AVATAR_IMAGES.shadcn.fallback}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <Avatar size={size}>
                    <AvatarFallback>PJ</AvatarFallback>
                  </Avatar>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="px-4 py-5">
        <Table>
          <TableCaption className="caption-top mb-3 text-left text-xs font-medium text-muted-foreground">
            Avatar compositions — set <code className="text-foreground">size</code> on each{" "}
            <code className="text-foreground">Avatar</code>; badge and group count scale automatically
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[8.5rem]">Size</TableHead>
              {AVATAR_COMPOSITIONS.map(({ id, label }) => (
                <TableHead
                  key={label}
                  className={cn("min-w-[7.5rem]", id === "with-name" && "min-w-[13rem]")}
                >
                  {label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {AVATAR_SIZES.map(({ token, size, heightPx }) => (
              <TableRow key={token}>
                <TableCell>
                  <AvatarSizeCell token={token} heightPx={heightPx} />
                </TableCell>
                {AVATAR_COMPOSITIONS.map(({ id }) => (
                  <TableCell
                    key={id}
                    className={cn("align-middle", id === "with-name" && "min-w-[13rem]")}
                  >
                    <AvatarCompositionPreview composition={id} size={size} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export function AvatarsPage() {
  return (
    <PepDesignSystemPage title="Avatars" contentClassName="space-y-10">
      <section>
        <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">Notes</h2>
        <p className="text-xs text-muted-foreground">
          Reference:{" "}
          <a
            href="https://ui.shadcn.com/docs/components/avatar"
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-2 hover:text-foreground/80"
          >
            shadcn Avatar
          </a>
          . Matches shadcn — no PEP overrides on primitives.{" "}
          <code className="rounded bg-muted px-1 text-[11px]">Avatar + name</code> uses Typography →{" "}
          <strong className="font-medium text-foreground">Small</strong> for the name and{" "}
          <strong className="font-medium text-foreground">Caption</strong> for subtitle;{" "}
          <strong className="font-medium text-foreground">ID</strong> for numeric ID (
          <code className="text-[11px]">lg</code> only).{" "}
          <code className="text-[11px]">default</code>: name + subtitle;{" "}
          <code className="text-[11px]">sm</code>: name only.
        </p>
      </section>

      <section>
        <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">Avatar library</h2>
        <p className="mb-4 text-xs text-muted-foreground">
          Approved PEP avatar sizes and compositions.{" "}
          <span className="font-medium text-foreground">
            Always pick from this section when creating layouts.
          </span>
        </p>
        <AvatarLibraryPreview />
      </section>

      <section>
        <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">Pending</h2>
        <Card>
          <CardContent className="p-4 text-xs text-muted-foreground">
            No pending avatar styles. Add new avatar compositions here for review before moving them
            into the Avatar library.
          </CardContent>
        </Card>
      </section>
    </PepDesignSystemPage>
  )
}
