import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { R3FDatas } from "../assets/threeComponents";

export const useRtfCollection = () => {
  const [SelectedComponent, setSelectedComponent] = useState<
    (() => JSX.Element) | null
  >(null);

  const { data: queryData } = useQuery({
    queryKey: ["Collections"],
    queryFn: async () => {
      const result = await R3FDatas();
      return result.map(({ Component, name }) => ({
        name,
        Component: Component as () => JSX.Element,
      }));
    },
    staleTime: Infinity,
  });

  const memoizedCollections = useMemo(() => queryData ?? [], [queryData]);

  const handleClick = (componentName: string) => {
    const foundComponent = memoizedCollections.find(
      (item) => item.name === componentName
    )?.Component;
    setSelectedComponent(() => foundComponent ?? null);
  };

  return { data: memoizedCollections, SelectedComponent, handleClick };
};
