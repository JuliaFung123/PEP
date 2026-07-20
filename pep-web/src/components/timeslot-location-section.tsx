import { FieldSelect, FieldTextarea } from "@/components/field-library-controls"
import { LibraryField } from "@/components/library-field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { typeToken } from "@/data/typography-tokens"
import { cn } from "@/lib/utils"

export type TimeslotLocationMode = "select" | "address" | "virtual"

export type TimeslotLocationSelectData = {
  locationId: string
  spaceId: string
}

export type TimeslotLocationAddressData = {
  address: string
  geom: string
}

export type TimeslotLocationVirtualData = {
  platform: string
  virtualUrl: string
  meetingId: string
  meetingPassword: string
  meetingPasscode: string
  dialInCountryCode?: string
  dialInNumbers: string
  dialInPassword: string
}

function LocationSectionTitle() {
  return (
    <h3 className={cn(typeToken("text-lg/semibold"), "tracking-tight text-foreground")}>
      Location
    </h3>
  )
}

function SelectLocationFields({ data }: { data: TimeslotLocationSelectData }) {
  return (
    <div className="grid gap-2 pl-6 sm:grid-cols-[200px_minmax(0,1fr)]">
      <FieldSelect
        options={[data.locationId, "Hall A", "Hall B"]}
        defaultValue={data.locationId}
        placeholder="location_id"
        aria-label="location_id"
      />
      <FieldSelect
        options={[data.spaceId, "Room 201", "Room 202"]}
        defaultValue={data.spaceId}
        placeholder="space_id"
        aria-label="space_id"
      />
    </div>
  )
}

function AddressLocationFields(_props: { data: TimeslotLocationAddressData }) {
  return (
    <div className="space-y-2.5 pl-6">
      <FieldTextarea placeholder="EN  Placeholder" className="min-h-[72px] resize-none" />
      <LibraryField label="geom GEOMETRY" required className="max-w-none">
        <Input placeholder="Placeholder" />
      </LibraryField>
    </div>
  )
}

function VirtualLocationFields({ data }: { data: TimeslotLocationVirtualData }) {
  const dialInCountryCode = data.dialInCountryCode ?? "+852"

  return (
    <div className="space-y-3 pl-6">
      <LibraryField label="platform" required>
        <FieldSelect
          options={["Zoom", "Teams", "Google Meet"]}
          placeholder="Placeholder"
          aria-label="platform"
        />
      </LibraryField>
      <LibraryField label="virtual_url" required>
        <Input placeholder="Placeholder" />
      </LibraryField>
      <LibraryField label="meeting_id" required>
        <Input placeholder="Placeholder" />
      </LibraryField>
      <div className="grid gap-3 sm:grid-cols-2">
        <LibraryField label="meeting_password" required>
          <Input placeholder="Placeholder" />
        </LibraryField>
        <LibraryField label="meeting_passcode" required>
          <Input placeholder="Placeholder" />
        </LibraryField>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 sm:items-end">
        <LibraryField label="dial_in_numbers" required>
          <div className="flex gap-1">
            <FieldSelect
              options={[dialInCountryCode, "+1", "+86"]}
              defaultValue={dialInCountryCode}
              aria-label="Country code"
              className="w-[90px] shrink-0"
            />
            <Input placeholder="Placeholder" className="min-w-0 flex-1" />
          </div>
        </LibraryField>
        <LibraryField label="dial_in_password" required>
          <Input placeholder="Placeholder" />
        </LibraryField>
      </div>
    </div>
  )
}

/** Interactive Location section for timeslot forms (Figma 1208:28082). */
export function TimeslotLocationSection({
  mode,
  onModeChange,
}: {
  mode: TimeslotLocationMode
  onModeChange: (mode: TimeslotLocationMode) => void
}) {
  return (
    <section className="space-y-4">
      <LocationSectionTitle />
      <RadioGroup
        value={mode}
        onValueChange={(value) => onModeChange(value as TimeslotLocationMode)}
        className="gap-4"
      >
        <div className="space-y-3">
          <label className={cn(typeToken("text-sm/medium"), "flex items-center gap-2")}>
            <RadioGroupItem value="select" />
            選地點
          </label>
          {mode === "select" ? (
            <SelectLocationFields
              data={{ locationId: "location_id", spaceId: "space_id" }}
            />
          ) : null}
        </div>

        <div className="space-y-3">
          <label className={cn(typeToken("text-sm/medium"), "flex items-center gap-2")}>
            <RadioGroupItem value="address" />
            填寫address
          </label>
          {mode === "address" ? (
            <AddressLocationFields
              data={{
                address: "Input Value",
                geom: "GEOMETRY123, 456",
              }}
            />
          ) : null}
        </div>

        <div className="space-y-3">
          <label className={cn(typeToken("text-sm/medium"), "flex items-center gap-2")}>
            <RadioGroupItem value="virtual" />
            virtual
          </label>
          {mode === "virtual" ? (
            <VirtualLocationFields
              data={{
                platform: "platform",
                virtualUrl: "virtual_url",
                meetingId: "meeting_id",
                meetingPassword: "meeting_password",
                meetingPasscode: "meeting_passcode",
                dialInNumbers: "dial_in_numbers",
                dialInPassword: "dial_in_password",
              }}
            />
          ) : null}
        </div>
      </RadioGroup>
    </section>
  )
}
