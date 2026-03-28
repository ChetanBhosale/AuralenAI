"use client";

import { useRouter } from "next/navigation";
import { useDialog } from "@/hooks/use-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function CancelOnboardingModal() {
  const router = useRouter();
  const { isOpen, close } = useDialog("cancel-onboarding");

  const handleConfirm = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("onboard_step1");
    localStorage.removeItem("onboard_step2");
    localStorage.removeItem("onboard_step3");
    close();
    router.replace("/signin");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel onboarding?</DialogTitle>
          <DialogDescription>
            You&apos;ll be signed out and any progress will be lost. You can
            always come back and start again.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={close}>
            Keep going
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Yes, cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
