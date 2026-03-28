import { LoadingScreen } from "@/components/custom/loading-screen";

export default function Page() {
  // RootContext handles redirect to /dashboard or /onboard
  // This page just shows the loading screen while that happens
  return <LoadingScreen />;
}
