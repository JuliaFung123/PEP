import { X } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { typeToken } from "@/data/typography-tokens"

type SaveFilterGroupMode = 'existing' | 'new'

type SaveFilterGroupDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (mode: SaveFilterGroupMode, name: string) => void
  onSaveAndApply: (mode: SaveFilterGroupMode, name: string) => void
}

function RadioRow({
  checked,
  label,
  onSelect,
}: {
  checked: boolean
  label: string
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex min-h-8 w-full items-center gap-2 text-left outline-none"
    >
      <span
        className={cn(
          'relative inline-flex size-4 shrink-0 items-center justify-center rounded-full border border-input bg-background shadow-elevation-sm',
        )}
        aria-hidden
      >
        {checked ? <span className="size-2.5 rounded-full bg-primary" /> : null}
      </span>
      <span className={cn(typeToken("text-sm/medium"), "text-foreground")}>{label}</span>
    </button>
  )
}

export function SaveFilterGroupDialog({
  open,
  onOpenChange,
  onSave,
  onSaveAndApply,
}: SaveFilterGroupDialogProps) {
  const [mode, setMode] = React.useState<SaveFilterGroupMode>('existing')
  const [name, setName] = React.useState('')

  React.useEffect(() => {
    if (!open) return
    setMode('existing')
    setName('')
  }, [open])

  const handleSave = () => {
    onSave(mode, name)
    onOpenChange(false)
  }

  const handleSaveAndApply = () => {
    onSaveAndApply(mode, name)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden" data-node-id="1609:65183">
        <DialogDescription className="sr-only">
          Save the current filter group to an existing group or as a new group.
        </DialogDescription>

        <div className="flex items-center gap-2.5 bg-background p-6">
          <DialogTitle className="flex-1 text-left">Save Filter Group</DialogTitle>
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              className="size-7 shrink-0 rounded-md"
              aria-label="Close"
            >
              <X className="size-4" aria-hidden />
            </Button>
          </DialogClose>
        </div>

        <div className="flex flex-col gap-6 p-6 pt-0">
          <p className={cn(typeToken("text-base/normal"), "font-normal leading-6 text-foreground")}>Do you want to XXXXXXXX?</p>

          <div className="flex flex-col gap-1">
            <RadioRow
              checked={mode === 'existing'}
              label="Save to existing Group"
              onSelect={() => setMode('existing')}
            />

            <div className="flex items-center gap-6">
              <div className="shrink-0">
                <RadioRow checked={mode === 'new'} label="Save as new" onSelect={() => setMode('new')} />
              </div>
              <div className={cn('min-w-0 flex-1', mode !== 'new' && 'opacity-50')}>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  disabled={mode !== 'new'}
                  className="h-9 min-h-9 shadow-elevation-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="ghost" className="min-h-9 px-2">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" variant="Light" className="min-h-9 px-2" onClick={handleSave}>
            Save
          </Button>
          <Button type="button" variant="default" className="min-h-9 px-2" onClick={handleSaveAndApply}>
            Save & Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

