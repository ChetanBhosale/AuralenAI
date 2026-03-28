"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productDetailsSchema, type ProductDetailsInput } from "@repo/types";
import { useQuery } from "@/hooks/use-query";
import { useDialog } from "@/hooks/use-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SidebarPanel } from "./sidebar-panel";
import { StepProgress } from "./step-progress";

export const ProductDetails = () => {
  const { setQuery } = useQuery();
  const { open: openCancelDialog } = useDialog("cancel-onboarding");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductDetailsInput>({
    resolver: zodResolver(productDetailsSchema),
  });

  const onSubmit = (data: ProductDetailsInput) => {
    localStorage.setItem("onboard_step1", JSON.stringify(data));
    setQuery("step", "2");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <SidebarPanel
        title="Define your<br/>digital essence."
        subtitle="Step 1 of 3: Let's establish the core identity of your product to tailor the AI experience."
      />

      <div className="flex flex-1 items-center justify-center overflow-hidden px-8 lg:px-16">
        <div className="w-full max-w-[480px]">
          <StepProgress currentStep={1} totalSteps={3} />

          <div className="mb-10 space-y-2">
            <h2 className="text-headline-lg text-foreground">Product Details</h2>
            <p className="text-body-md text-muted-foreground">
              Provide the foundational information for Auralen AI.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label className="text-label-sm uppercase tracking-[0.15em] text-muted-foreground">
                Product/Service Name
              </Label>
              <Input
                placeholder="e.g. Auralen Enterprise"
                className="h-12 rounded-lg px-4 text-sm"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-body-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-label-sm uppercase tracking-[0.15em] text-muted-foreground">
                Website Link
              </Label>
              <Input
                type="url"
                placeholder="https://www.auralen.ai"
                className="h-12 rounded-lg px-4 text-sm"
                {...register("website_url")}
              />
              {errors.website_url && (
                <p className="text-body-sm text-destructive">{errors.website_url.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-label-sm uppercase tracking-[0.15em] text-muted-foreground">
                Brief Description
              </Label>
              <Textarea
                rows={4}
                placeholder="Tell us what makes your product unique..."
                className="min-h-[120px] rounded-lg px-4 py-3 text-sm"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-body-sm text-destructive">{errors.description.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={openCancelDialog}
              >
                Cancel
              </Button>
              <Button type="submit" size="lg">
                Continue to Persona
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
