import { ReactNode, Suspense } from "react";
import { CancelOnboardingModal } from "@/components/modals/cancel-onboarding";

export default function OnboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen overflow-hidden bg-background">
      {children}
      <Suspense>
        <CancelOnboardingModal />
      </Suspense>
    </div>
  );
}
