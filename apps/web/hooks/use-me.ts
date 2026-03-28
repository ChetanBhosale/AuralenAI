import { useQuery } from "@tanstack/react-query";
import auth from "@/data/auth";

export function useMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => auth.me(),
    select: (res) => res.data,
    enabled: typeof window !== "undefined" && !!localStorage.getItem("token"),
    staleTime: 60000,
    retry: false,
  });
}
