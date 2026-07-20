import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

/** Expanded sub-row shell — Figma Expanded detail-* (2755:102533). */
const EXPANDED_DETAIL_SHELL = "flex flex-col gap-0.5 px-4 py-2"

export type TimeslotExpandedDetailLocationData = {
  locationName: string
  spaceName: string
}

export type TimeslotExpandedDetailAddressData = {
  address: string
  geom: string
}

export type TimeslotExpandedDetailVirtualData = {
  platformName: string
  url: string
  phone: string
}

export type TimeslotExpandedDetailProps =
  | { variant: "location"; data: TimeslotExpandedDetailLocationData }
  | { variant: "address"; data: TimeslotExpandedDetailAddressData }
  | { variant: "virtual"; data: TimeslotExpandedDetailVirtualData }

/** Expanded detail-location — two text-sm/medium lines (Figma 2754:101394). */
export function TimeslotExpandedDetailLocation({
  locationName,
  spaceName,
}: TimeslotExpandedDetailLocationData) {
  return (
    <div className={EXPANDED_DETAIL_SHELL}>
      <p className={cn(typeToken("text-sm/medium"), "text-foreground")}>{locationName}</p>
      <p className={cn(typeToken("text-sm/medium"), "text-foreground")}>{spaceName}</p>
    </div>
  )
}

/** Expanded detail-address — text-sm/medium + text-xs/normal (Figma 2755:102529). */
export function TimeslotExpandedDetailAddress({ address, geom }: TimeslotExpandedDetailAddressData) {
  return (
    <div className={EXPANDED_DETAIL_SHELL}>
      <p className={cn(typeToken("text-sm/medium"), "text-foreground")}>{address}</p>
      <p className={cn(typeToken("text-xs/normal"), "text-foreground")}>{geom}</p>
    </div>
  )
}

/** Expanded detail-virtual — platform + underlined url + phone (Figma 2755:102369). */
export function TimeslotExpandedDetailVirtual({
  platformName,
  url,
  phone,
}: TimeslotExpandedDetailVirtualData) {
  return (
    <div className={EXPANDED_DETAIL_SHELL}>
      <p className={cn(typeToken("text-sm/medium"), "text-foreground")}>{platformName}</p>
      <p className={cn(typeToken("text-xs/normal"), "text-foreground underline underline-offset-2")}>
        {url}
      </p>
      <p className={cn(typeToken("text-xs/normal"), "text-foreground")}>{phone}</p>
    </div>
  )
}

export function TimeslotExpandedDetail(props: TimeslotExpandedDetailProps) {
  if (props.variant === "location") {
    return <TimeslotExpandedDetailLocation {...props.data} />
  }
  if (props.variant === "address") {
    return <TimeslotExpandedDetailAddress {...props.data} />
  }
  return <TimeslotExpandedDetailVirtual {...props.data} />
}
