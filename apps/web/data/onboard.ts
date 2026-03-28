import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import fetcher from "@/lib/fetcher";
import endpoints from "@/utils/enpoints";
import type { IResponse } from "@/types/api";
import type { OnboardingInput } from "@repo/types";

const onboard = {
  create: (data: OnboardingInput): Promise<IResponse<any>> =>
    fetcher.post(endpoints.onboard.create, data).then((res) => res.data),
};

export function useCreateOnboarding() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: OnboardingInput) => onboard.create(data),
    onSuccess: (res) => {
      localStorage.removeItem("onboard_step1");
      localStorage.removeItem("onboard_step2");
      localStorage.removeItem("onboard_step3");

      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.replace(`/dashboard?p=${res.data?.product?.id}`);
    },
    onError: (error: any) => {
      console.error("[Onboard] Error:", error?.response?.data?.message || error);
    },
  });
}

export default onboard;