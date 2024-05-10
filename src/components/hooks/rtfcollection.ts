import React, { useMemo, useState } from "react";
import Transformation from "../three/transformation";
export const useRtfCollection = () => {
  const [collections, setCollections] = useState<(() => React.ReactElement)[]>(
    []
  );

  useMemo(() => {
    const components = [Transformation];
    setCollections(components);
  }, []);

  return { collections };
};
