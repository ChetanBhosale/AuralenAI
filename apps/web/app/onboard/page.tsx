"use client";

import { useRootContext } from "@/context/root-context";
import { useQuery } from "@/hooks/use-query";
import { ProductDetails } from "@/components/custom/onboard/product-details";
import { CustomerProfile } from "@/components/custom/onboard/customer-profile";
import { AgentIdentity } from "@/components/custom/onboard/agent-identity";
import { Suspense, useEffect } from "react";

function OnboardContent() {
  const { user } = useRootContext();
  const { getQuery, setQuery } = useQuery();

  const step = getQuery("step");

  useEffect(() => {
    if (!step) {
      setQuery("step", "1", { replace: true });
    }
  }, [step, setQuery]);

  if (!step || step === "1") {
    return <ProductDetails />;
  }

  if (step === "2") {
    return <CustomerProfile />;
  }

  if (step === "3") {
    return <AgentIdentity />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      {/* Fallback space for unmapped routes */}
    </div>
  );
}

export default function OnboardPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-background">Loading...</div>}>
      <OnboardContent />
    </Suspense>
  );
}
