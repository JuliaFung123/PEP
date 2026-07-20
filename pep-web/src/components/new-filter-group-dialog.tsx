import { X } from 'lucide-react'
import * as React from 'react'

import { FilterGroupDialogFields } from '@/components/filter-group-dialog-fields'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'

type NewFilterGroupDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (name: string) => void
  onSaveAndApply: (name: string) => void
}

function newFilterRowLabel(name: string) {
  const t = name.trim()
  if (t.length > 0) return t.startsWith('Activity table ·') ? t : `Activity table · ${t}`
  return 'Activity table · New preset'
}

export function NewFilterGroupDialog({
  open,
  onOpenChange,
  onSave,
  onSaveAndApply,
}: NewFilterGroupDialogProps) {
  const [name, setName] = React.useState('')

  React.useEffect(() => {
    if (open) setName('')
  }, [open])

  const handleSave = () => {
    onSave(newFilterRowLabel(name))
    onOpenChange(false)
  }

  const handleSaveAndApply = () => {
    onSaveAndApply(newFilterRowLabel(name))
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-x-hidden" data-node-id="1542:57793">
        <DialogDescription className="sr-only">
          Create a new saved filter group. Figma ref 1542:57793.
        </DialogDescription>

        <div className="flex items-center gap-2.5 bg-background p-6">
          <DialogTitle className="flex-1 text-left">New Filter Group</DialogTitle>
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

        <FilterGroupDialogFields name={name} onNameChange={setName} />

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
