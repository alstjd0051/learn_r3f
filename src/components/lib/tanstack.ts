import { useCallback, useEffect, useState } from "react";
import { DevtoolsPosition } from "@tanstack/query-devtools";
import { QueryClient } from "@tanstack/react-query";

export const useClient = () => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60,
            gcTime: 1000 * 60 * 5,
          },
        },
      })
  );
  return queryClient;
};

export const useChangeTools = () => {
  const [preview, setPreview] = useState<DevtoolsPosition>("right");
  const handleResize = useCallback(() => {
    setPreview(window.innerWidth > 844 ? "right" : "bottom");
  }, []);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);
  return { preview };
};
