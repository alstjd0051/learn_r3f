import React from "react";
import { extend } from "@react-three/fiber";
import { SimpleMaterial } from "../lib/shader";

extend({ SimpleMaterial });

const MeshShaderMaterial = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 1, 0]} />
      <directionalLight position={[1, 2, 8]} intensity={0.7} />

      <mesh>
        <boxGeometry />
        <simpleMaterial uColor={"green"} />
      </mesh>
    </>
  );
};

export default MeshShaderMaterial;
