import { Canvas } from "@react-three/fiber";
import React from "react";
import { useRtfCollection } from "../hooks/rtfcollection";
import { OrbitControls } from "@react-three/drei";

const ThreeWrapper = () => {
  const { collections } = useRtfCollection();

  return (
    <Canvas style={{ height: "100dvh" }}>
      <OrbitControls />
      {collections.map((Component) => (
        <Component />
      ))}
    </Canvas>
  );
};

export default ThreeWrapper;
