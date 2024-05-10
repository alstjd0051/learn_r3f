import { Box } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";

interface MyBoxProps {
  children: React.ReactNode;
  position: Vector3;
}
function MyBox({ children, position }: MyBoxProps) {
  const geom = new THREE.BoxGeometry();
  return (
    <mesh position={position} geometry={geom}>
      {children}
    </mesh>
  );
}

const Geometry = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 1, 3]} intensity={0.5} />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial
          emissive={"yellow"}
          wireframe={true}
          color={"#1abc9c"}
        />
      </mesh>

      <Box>
        <meshStandardMaterial color={"#8e44ad"} />
      </Box>

      <MyBox position={[-1.2, 0, 0]}>
        <meshStandardMaterial color={"#e74c3c"} />
      </MyBox>
    </>
  );
};

export default Geometry;
