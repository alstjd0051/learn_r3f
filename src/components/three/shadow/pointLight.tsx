/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

const PointLightShadow = () => {
  const smallSpherePivot = useRef<THREE.Group>(null);
  const pointLight = useRef<THREE.PointLight>(null);
  const TorusMesh = useMemo(() => {
    return (
      <mesh
        geometry={new THREE.TorusGeometry(0.4, 0.1, 32, 32)}
        receiveShadow
        castShadow
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

  useFrame((state) => {
    if (!smallSpherePivot.current || !pointLight.current) return;
    const time = state.clock.elapsedTime;
    smallSpherePivot.current.rotation.y = THREE.MathUtils.degToRad(time * 50);
    smallSpherePivot.current.children[0].getWorldPosition(
      pointLight.current?.position
    );
  });

  return (
    <>
      <ambientLight intensity={0.1} />

      <pointLight
        castShadow
        ref={pointLight}
        color={0xffffff}
        intensity={1}
        position={[0, 5, 0]}
      />

      <mesh receiveShadow rotation-x={THREE.MathUtils.degToRad(-90)}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color={"#2c3e50"}
          roughness={0.5}
          metalness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh castShadow receiveShadow position-y={1.7}>
        <torusKnotGeometry args={[1, 0.2, 128, 32]} />
        <meshStandardMaterial color={"#fff"} roughness={0.1} metalness={0.2} />
      </mesh>

      {new Array(10).fill(0).map((_, idx) => {
        return (
          <group key={idx} rotation-y={THREE.MathUtils.degToRad(45 * idx)}>
            {TorusMesh}
          </group>
        );
      })}

      <group ref={smallSpherePivot} name="smallSpherePivot">
        <mesh castShadow receiveShadow position={[3, 0.5, 0]}>
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

export default PointLightShadow;
