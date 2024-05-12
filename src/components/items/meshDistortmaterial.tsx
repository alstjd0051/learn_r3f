import React from "react";
import { MeshDistortMaterial } from "@react-three/drei";
import { useControls } from "leva";

const MeshDistortmaterial = () => {
  const { distort, speed } = useControls({
    distort: {
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
        <MeshDistortMaterial distort={distort} speed={speed} />
      </mesh>
    </>
  );
};

export default MeshDistortmaterial;
