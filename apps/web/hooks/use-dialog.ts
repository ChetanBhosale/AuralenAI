import { useCallback } from "react";
import { useQuery } from "./use-query";

/**
 * Query-based dialog management.
 * Opens a dialog by setting `?d=<dialogId>` in the URL.
 * Close by removing the `d` param.
 *
 * Usage:
 *   const { isOpen, open, close } = useDialog("cancel-onboarding");
 */
export function useDialog(dialogId: string) {
  const { getQuery, setQuery, searchParams } = useQuery();

  const isOpen = getQuery("d") === dialogId;

  const open = useCallback(() => {
    setQuery("d", dialogId);
  }, [dialogId, setQuery]);

  const close = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("d");
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [searchParams]);

  return { isOpen, open, close };
}
