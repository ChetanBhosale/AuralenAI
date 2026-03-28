---
inclusion: always
---

# Dialog & Modal Patterns

## Query-Based Dialog Management

All dialogs/modals are managed via URL query params using the `useDialog` hook:

```typescript
import { useDialog } from "@/hooks/use-dialog";

const { isOpen, open, close } = useDialog("my-dialog-id");
```

This sets `?d=<dialogId>` in the URL when opened, making dialogs shareable and back-button friendly.

## Modal File Location

All modals live in `apps/web/components/modals/`:
- One file per modal (e.g. `cancel-onboarding.tsx`, `delete-product.tsx`)
- Each modal is a self-contained component that uses `useDialog` internally
- Modals are mounted in the relevant layout file (not inside page components)

## Modal Structure

Always use the shadcn `Dialog` component:

```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/hooks/use-dialog";

export function MyModal() {
  const { isOpen, close } = useDialog("my-dialog-id");

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={close}>Cancel</Button>
          <Button onClick={handleAction}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## Opening a Modal

From any component, use the `open` function from `useDialog`:

```typescript
const { open } = useDialog("cancel-onboarding");
<Button onClick={open}>Cancel</Button>
```

## Rules
- Never use local `useState` for dialog open/close — always use `useDialog` with query params
- Mount modals in layout files, not inside page components
- Wrap modals in `<Suspense>` when mounted in layouts (since `useSearchParams` requires it)
- One modal per file in `components/modals/`
