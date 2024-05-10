import { Canvas } from "@react-three/fiber";
import React from "react";
import { useRtfCollection } from "../hooks/rtfcollection";
import { OrbitControls } from "@react-three/drei";

const ThreeWrapper = () => {
  const { collections } = useRtfCollection();

  return (
    <Canvas className="h-full">
      <OrbitControls />
      {collections.map((Component) => (
        <Component />
      ))}
    </Canvas>
  );
};

export default ThreeWrapper;
