import React from "react";
import { MeshWobbleMaterial } from "@react-three/drei";
import { useControls } from "leva";

const MeshTrousMaterial = () => {
  const { factor, speed } = useControls({
    factor: {
      value: 1,
      min: 0,
      max: 10,
      step: 0.1,
    },
    speed: {
      value: 10,
      min: 0,
      max: 10,
      step: 0.1,
    },
  });
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 1, 0]} />
      <directionalLight position={[1, 2, 8]} intensity={0.7} />

      <mesh>
        <torusGeometry />
        <MeshWobbleMaterial factor={factor} speed={speed} />
      </mesh>
    </>
  );
};

export default MeshTrousMaterial;
