import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

const Transformation = () => {
  const refMesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!refMesh.current) return null;
    refMesh.current.rotation.y += delta;
  });
  return (
    <>
      <directionalLight position={[1, 1, 1]} />
      <mesh ref={refMesh} rotation={[0, (45 * Math.PI) / 180, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="#e67e22" />
      </mesh>
    </>
  );
};

export default Transformation;
