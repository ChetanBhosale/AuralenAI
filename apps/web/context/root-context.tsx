"use client";

import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { useMe } from "@/hooks/use-me";
import { LoadingScreen } from "@/components/custom/loading-screen";
import type { IUser, IUserProduct } from "@/types/api";

interface RootContextValue {
  user: IUser | undefined;
  products: IUserProduct[] | undefined;
  isLoading: boolean;
  refetch: () => void;
}

const RootContext = createContext<RootContextValue>({
  user: undefined,
  products: undefined,
  isLoading: true,
  refetch: () => {},
});

const PUBLIC_ROUTES = ["/signin"];

export function RootContextProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data, isLoading, refetch } = useMe();

  const isPublicRoute = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));

  // Redirect logic
  useEffect(() => {
    if (isPublicRoute) return;

    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/signin");
      return;
    }

    if (!isLoading && data) {
      if (data.products.length > 0) {
        if (pathname === "/" || pathname === "/onboard") {
          router.replace(`/dashboard?p=${data.products[0].id}`);
        }
      } else {
        if (pathname !== "/onboard") {
          router.replace("/onboard");
        }
      }
    }
  }, [data, isLoading, pathname, isPublicRoute, router]);

  // Show loading while fetching user on protected routes
  if (!isPublicRoute && (isLoading || !data)) {
    return <LoadingScreen />;
  }

  return (
    <RootContext.Provider
      value={{
        user: data?.user,
        products: data?.products,
        isLoading,
        refetch,
      }}
    >
      {children}
    </RootContext.Provider>
  );
}

export const useRootContext = () => useContext(RootContext);
