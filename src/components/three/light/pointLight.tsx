import { useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";

// 특정한 위치에 빛을 쏘는 빛
const PointLight = () => {
  const TorusMesh = useMemo(() => {
    return (
      <mesh
        geometry={new THREE.TorusGeometry(0.4, 0.1, 32, 32)}
        material={
          new THREE.MeshStandardMaterial({
            color: "#9b59b6",
            roughness: 0.5,
            metalness: 0.5,
          })
        }
        position={[3, 0.5, 0]}
      />
    );
  }, []);
  const smallSpherePrivot = useRef<THREE.Group>(null);
  const light = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!smallSpherePrivot.current || !light.current) return;
    const time = state.clock.elapsedTime;
    smallSpherePrivot.current.rotation.y = THREE.MathUtils.degToRad(time * 70); // 70도로 회전

    smallSpherePrivot.current.children[0].getWorldPosition(
      light.current.position
    );
  });
  useHelper(
    light as React.MutableRefObject<THREE.Object3D<THREE.Object3DEventMap>>,
    THREE.PointLightHelper,
    0.5
  );

  return (
    <>
      <pointLight
        ref={light}
        color={"#ffffff"}
        intensity={2}
        position={[0, 5, 0]}
        distance={10}
      />
      <mesh rotation-x={THREE.MathUtils.degToRad(-90)}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color={"#2c3e50"}
          roughness={0.5}
          metalness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation-x={THREE.MathUtils.degToRad(-90)}>
        <sphereGeometry args={[1.5, 64, 64, 0, Math.PI]} />
        <meshStandardMaterial color={"#fff"} roughness={0.1} metalness={0.2} />
      </mesh>
      {new Array(8).fill("").map((_, index) => {
        return (
          <group key={index} rotation-y={THREE.MathUtils.degToRad(45 * index)}>
            {TorusMesh}
          </group>
        );
      })}
      <group ref={smallSpherePrivot}>
        <mesh position={[3, 0.5, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color={"#e74c3c"}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>
      </group>
    </>
  );
};

export default PointLight;
