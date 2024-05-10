import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Vector3 } from "@react-three/fiber";
import { useControls } from "leva";

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
  const refMesh = useRef<THREE.Mesh>(null);
  const refWireMesh = useRef<THREE.Mesh>(null);

  const { xSize, xSegments, ySegments, ySize, zSegments, zSize } = useControls({
    xSize: {
      value: 1,
      min: 0.1,
      max: 5,
      step: 0.01,
    },
    ySize: {
      value: 1,
      min: 0.1,
      max: 5,
      step: 0.01,
    },
    zSize: {
      value: 1,
      min: 0.1,
      max: 5,
      step: 0.01,
    },
    xSegments: {
      value: 1,
      min: 1,
      max: 10,
      step: 1,
    },
    ySegments: {
      value: 1,
      min: 1,
      max: 10,
      step: 1,
    },
    zSegments: {
      value: 1,
      min: 1,
      max: 10,
      step: 1,
    },
  });

  useEffect(() => {
    if (!refMesh.current || !refWireMesh.current) return;
    refWireMesh.current.geometry = refMesh.current?.geometry;
  }, [xSize, xSegments, ySegments, ySize, zSegments, zSize]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[2, 1, 3]} intensity={0.5} />
      <mesh ref={refMesh}>
        <boxGeometry
          args={[xSize, ySize, zSize, xSegments, ySegments, zSegments]}
        />
        <meshStandardMaterial color={"#1abc9c"} />
      </mesh>
      <mesh ref={refWireMesh}>
        <boxGeometry />
        <meshStandardMaterial
          emissive={"yellow"}
          wireframe={true}
          color={"#1abc9c"}
        />
      </mesh>

      <MyBox position={[-1.2, 0, 0]}>
        <meshStandardMaterial color={"#e74c3c"} />
      </MyBox>
    </>
  );
};

export default Geometry;
