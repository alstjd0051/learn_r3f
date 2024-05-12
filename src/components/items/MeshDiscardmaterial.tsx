import { MeshDiscardMaterial } from "@react-three/drei";
import React from "react";

const MeshDiscardmaterial = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 1, 0]} />
      <directionalLight position={[1, 2, 8]} intensity={0.7} />

      <mesh>
        <torusGeometry />
        <MeshDiscardMaterial />
        {/* <meshStandardMaterial visible={false} /> */}
      </mesh>
    </>
  );
};

export default MeshDiscardmaterial;
