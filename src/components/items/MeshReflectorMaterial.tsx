import React from "react";
import { MeshReflectorMaterial } from "@react-three/drei";
import { useControls } from "leva";

const ReflectorMaterial = () => {
  const {
    blur,
    mixBlur,
    mirror,
    resolution,
    mixStrength,
    roughness,
    depthScale,
    minDepthThreshold,
    maxDepthThreshold,
    color,
    metalness,
  } = useControls({
    blur: {
      value: [300, 100],
    },
    mixBlur: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.1,
    },
    mirror: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.1,
    },
    mirrormresolution: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.1,
    },
    mixStrength: {
      value: 30,
      min: 0,
      max: 100,
      step: 0.1,
    },
    roughness: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.1,
    },
    depthScale: {
      value: 0.7,
      min: 0,
      max: 1,
      step: 0.1,
    },
    minDepthThreshold: {
      value: 0.4,
      min: 0,
      max: 1,
      step: 0.1,
    },
    maxDepthThreshold: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.1,
    },
    color: {
      value: "#695e5e",
    },
    metalness: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.1,
    },
    resolution: {
      value: 2048,
      min: 0,
      max: 4096,
      step: 0.1,
    },
  });
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 1, 0]} />
      <directionalLight position={[1, 2, 8]} intensity={0.7} />
      <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <MeshReflectorMaterial
          blur={blur}
          mixBlur={mixBlur}
          mirror={mirror}
          resolution={resolution}
          mixStrength={mixStrength}
          roughness={roughness}
          depthScale={depthScale}
          minDepthThreshold={minDepthThreshold}
          maxDepthThreshold={maxDepthThreshold}
          color={color}
          metalness={metalness}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial color={"cyan"} />
      </mesh>
    </>
  );
};

export default ReflectorMaterial;
