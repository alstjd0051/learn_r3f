import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

const Transformation = () => {
  const refMesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!refMesh.current) return;
    refMesh.current.rotation.z += delta;
  });
  const { color, opacity, scale } = useControls({
    color: {
      value: "#e67e22",
      label: "Color",
    },
    opacity: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.01,
    },
    scale: {
      value: [2, 1, 1],
      main: [1, 1, 1],
      max: [5, 5, 5],
    },
  });
  return (
    <>
      <directionalLight position={[1, 1, 1]} />
      <OrbitControls />
      <axesHelper scale={10} />
      <mesh
        ref={refMesh}
        position-y={2}
        rotation-z={THREE.MathUtils.degToRad(45)}
        scale={scale}
      >
        <boxGeometry />
        <meshStandardMaterial
          color={color}
          opacity={opacity}
          transparent={true}
        />
        <axesHelper />
        <mesh
          scale={new THREE.Vector3(0.1, 0.1, 0.1)}
          position={new THREE.Vector3(0, 2, 0)}
        >
          <sphereGeometry />
          <meshStandardMaterial color={"red"} />
          <axesHelper scale={5} />
        </mesh>
      </mesh>
    </>
  );
};

export default Transformation;
