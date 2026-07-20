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

type EditFilterGroupDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialName: string
  onSave: (name: string) => void
  /** Persist name, close this dialog, and run extra UI (e.g. close parent sheet). */
  onSaveAndApply: (name: string) => void
}

export function EditFilterGroupDialog({
  open,
  onOpenChange,
  initialName,
  onSave,
  onSaveAndApply,
}: EditFilterGroupDialogProps) {
  const [name, setName] = React.useState(initialName)

  React.useEffect(() => {
    if (open) setName(initialName)
  }, [open, initialName])

  const handleSave = () => {
    onSave(name.trim() || initialName)
    onOpenChange(false)
  }

  const handleSaveAndApply = () => {
    onSaveAndApply(name.trim() || initialName)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-x-hidden" data-node-id="1566:40192">
        <DialogDescription className="sr-only">
          Edit saved filter group name and criteria. Figma ref 1566:40192.
        </DialogDescription>

        <div className="flex items-center gap-2.5 bg-background p-6">
          <DialogTitle className="flex-1 text-left">Edit Filter Group</DialogTitle>
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
