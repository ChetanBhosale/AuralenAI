"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { agentIdentitySchema, type AgentIdentityInput, type OnboardingInput } from "@repo/types";
import { useQuery } from "@/hooks/use-query";
import { useCreateOnboarding } from "@/data/onboard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarPanel } from "./sidebar-panel";
import { StepProgress } from "./step-progress";

const SPEECH_OPTIONS = [
  { value: "FORMAL" as const, label: "Formal", desc: "Professional and polished" },
  { value: "FRIENDLY" as const, label: "Friendly", desc: "Warm and approachable" },
  { value: "CASUAL" as const, label: "Casual", desc: "Relaxed and conversational" },
];

const GOAL_OPTIONS = [
  { value: "BOOK_MEETING" as const, label: "Book a Meeting" },
  { value: "SALES" as const, label: "Sales" },
  { value: "NETWORKING" as const, label: "Networking" },
  { value: "PARTNERSHIPS" as const, label: "Partnerships" },
  { value: "BRAND_BUILDING" as const, label: "Brand Building" },
];

export const AgentIdentity = () => {
  const { setQuery } = useQuery();
  const { mutate: submitOnboarding, isPending } = useCreateOnboarding();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AgentIdentityInput>({
    resolver: zodResolver(agentIdentitySchema),
    defaultValues: {
      speech: "FORMAL",
      goal: "BOOK_MEETING",
      tone_context: "",
    },
  });

  const handleBack = () => {
    setQuery("step", "2");
  };

  const onSubmit = (data: AgentIdentityInput) => {
    const step1 = JSON.parse(localStorage.getItem("onboard_step1") || "{}");
    const step2 = JSON.parse(localStorage.getItem("onboard_step2") || "{}");

    const payload: OnboardingInput = {
      ...step1,
      ...step2,
      ...data,
    };

    submitOnboarding(payload);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <SidebarPanel
        title="Shape your<br/>AI agent."
        subtitle="Step 3 of 3: Configure how your agent communicates and what it aims to achieve."
      />

      <div className="flex flex-1 items-center justify-center overflow-hidden px-8 lg:px-16">
        <div className="w-full max-w-[480px]">
          <StepProgress currentStep={3} totalSteps={3} />

          <div className="mb-10 space-y-2">
            <h2 className="text-headline-lg text-foreground">Agent Identity</h2>
            <p className="text-body-md text-muted-foreground">
              Define your AI agent&apos;s personality and outreach goal.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Communication Style */}
            <Controller
              name="speech"
              control={control}
              render={({ field }) => (
                <div className="space-y-3">
                  <Label className="text-label-sm uppercase tracking-[0.15em] text-muted-foreground">
                    Communication Style
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    {SPEECH_OPTIONS.map((opt) => (
                      <label
                        key={opt.value}
                        className={`relative flex cursor-pointer flex-col items-center gap-1 rounded-lg border px-3 py-3.5 text-center transition-all hover:bg-accent ${
                          field.value === opt.value
                            ? "border-primary ring-1 ring-ring/30"
                            : "border-input"
                        }`}
                      >
                        <input
                          type="radio"
                          className="sr-only"
                          value={opt.value}
                          checked={field.value === opt.value}
                          onChange={() => field.onChange(opt.value)}
                        />
                        <span className="text-label-lg text-foreground">{opt.label}</span>
                        <span className="text-label-sm text-muted-foreground">{opt.desc}</span>
                      </label>
                    ))}
                  </div>
                  {errors.speech && (
                    <p className="text-body-sm text-destructive">{errors.speech.message}</p>
                  )}
                </div>
              )}
            />

            {/* Outreach Goal */}
            <Controller
              name="goal"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label className="text-label-sm uppercase tracking-[0.15em] text-muted-foreground">
                    Outreach Goal
                  </Label>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-12 w-full rounded-lg px-4 text-sm">
                      <SelectValue placeholder="Select a goal" />
                    </SelectTrigger>
                    <SelectContent>
                      {GOAL_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.goal && (
                    <p className="text-body-sm text-destructive">{errors.goal.message}</p>
                  )}
                </div>
              )}
            />

            {/* Tone Context */}
            <div className="space-y-2">
              <Label className="text-label-sm uppercase tracking-[0.15em] text-muted-foreground">
                Tone Context
                <span className="ml-1 normal-case tracking-normal text-muted-foreground/50">
                  (optional)
                </span>
              </Label>
              <Textarea
                rows={3}
                placeholder="e.g. Be concise, use data points, reference mutual connections..."
                className="min-h-[100px] rounded-lg px-4 py-3 text-sm"
                {...register("tone_context")}
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <Button type="button" variant="ghost" onClick={handleBack}>
                Back
              </Button>
              <Button type="submit" size="lg" disabled={isPending}>
                {isPending ? "Launching..." : "Launch Auralen"}
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
