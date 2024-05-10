import React, { useRef } from "react";
import * as THREE from "three";

const Transformation = () => {
  const refMesh = useRef<THREE.Mesh>(null);
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
