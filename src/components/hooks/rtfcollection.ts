import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Transformation from "../three/scene/transformation";
import Geometry from "../three/scene/geometry";
import GeometryTwo from "../three/scene/geometrytwo";

export const useRtfCollection = () => {
  const [collections, setCollections] = useState<ThreeItem[]>([]);
  const [SelectedComponent, setSelectedComponent] = useState<
    (() => JSX.Element) | null
  >(null);

  useQuery({
    queryKey: ["Collections"],
    queryFn: async () => {
      const result = await fetchData();

      setCollections(
        result.map(({ Component, name }) => ({
          name,
          Component: Component as () => JSX.Element,
        }))
      );
      return result;
    },
    staleTime: Infinity,
  });

  const memoizedCollections = useMemo(() => collections, [collections]);

  const handleClick = (componentName: string) => {
    const Component = memoizedCollections.find(
      (item) => item.name === componentName ?? "Transformation"
    )?.Component;
    setSelectedComponent(() => Component ?? null);
  };

  return { data: memoizedCollections, SelectedComponent, handleClick };
};

const fetchData = async () => {
  return [
    { name: "Transformation", Component: Transformation },
    { name: "Geometry", Component: Geometry },
    { name: "Geometry2", Component: GeometryTwo },
  ];
};
