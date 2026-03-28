"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { customerProfileSchema, type CustomerProfileInput } from "@repo/types";
import { useQuery } from "@/hooks/use-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SidebarPanel } from "./sidebar-panel";
import { StepProgress } from "./step-progress";

export const CustomerProfile = () => {
  const { setQuery } = useQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerProfileInput>({
    resolver: zodResolver(customerProfileSchema),
  });

  const handleBack = () => {
    setQuery("step", "1");
  };

  const onSubmit = (data: CustomerProfileInput) => {
    localStorage.setItem("onboard_step2", JSON.stringify(data));
    setQuery("step", "3");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <SidebarPanel
        title="Define your<br/>target persona."
        subtitle="Step 2 of 3: Map your ideal customer profile so Auralen can reach the right people."
      />

      <div className="flex flex-1 items-center justify-center overflow-hidden px-8 lg:px-16">
        <div className="w-full max-w-[480px]">
          <StepProgress currentStep={2} totalSteps={3} />

          <div className="mb-10 space-y-2">
            <h2 className="text-headline-lg text-foreground">Target Customer Profile</h2>
            <p className="text-body-md text-muted-foreground">
              Describe who you want Auralen to reach on your behalf.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label className="text-label-sm uppercase tracking-[0.15em] text-muted-foreground">
                Target Customer Description
              </Label>
              <Textarea
                rows={3}
                placeholder="Describe the ideal decision maker..."
                className="min-h-[100px] rounded-lg px-4 py-3 text-sm"
                {...register("target_description")}
              />
              {errors.target_description && (
                <p className="text-body-sm text-destructive">{errors.target_description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-label-sm uppercase tracking-[0.15em] text-muted-foreground">
                Job Roles
              </Label>
              <Input
                placeholder="e.g. Founder, CTO, Growth Lead"
                className="h-12 rounded-lg px-4 text-sm"
                {...register("job_roles")}
              />
              {errors.job_roles && (
                <p className="text-body-sm text-destructive">{errors.job_roles.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-label-sm uppercase tracking-[0.15em] text-muted-foreground">
                Industries
              </Label>
              <Input
                placeholder="e.g. SaaS, Fintech, E-commerce"
                className="h-12 rounded-lg px-4 text-sm"
                {...register("industries")}
              />
              {errors.industries && (
                <p className="text-body-sm text-destructive">{errors.industries.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-label-sm uppercase tracking-[0.15em] text-muted-foreground">
                Locations
              </Label>
              <Input
                placeholder="e.g. North America, EMEA, India"
                className="h-12 rounded-lg px-4 text-sm"
                {...register("locations")}
              />
              {errors.locations && (
                <p className="text-body-sm text-destructive">{errors.locations.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between pt-4">
              <Button type="button" variant="ghost" onClick={handleBack}>
                Back
              </Button>
              <Button type="submit" size="lg">
                Continue to Agent
                <svg className="ml-1 h-3.5 w-3.5 transition-transform group-hover/button:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
