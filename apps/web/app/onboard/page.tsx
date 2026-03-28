"use client";

import { useRootContext } from "@/context/root-context";

export default function OnboardPage() {
  const { user } = useRootContext();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-2">
        <h1 className="text-display-sm text-foreground">Welcome to Auralen</h1>
        <p className="text-body-lg text-muted-foreground">
          Let&apos;s set up your first product, {user?.name || user?.email}
        </p>
      </div>
    </div>
  );
}
