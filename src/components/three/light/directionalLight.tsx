import { useHelper } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

// 특정한 방향으로 빛을 쏘는 빛
const DirectionalLight = () => {
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
  const light = useRef<THREE.DirectionalLight>(null);

  useFrame((state) => {
    if (!smallSpherePrivot.current || !light.current) return;
    const time = state.clock.elapsedTime;
    smallSpherePrivot.current.rotation.y = THREE.MathUtils.degToRad(time * 70); // 70도로 회전
    smallSpherePrivot.current.children[0].getWorldPosition(
      light.current.target.position
    ); // 빛이 smallSpherePrivot을 향하도록 설정
  });

  useHelper(
    light as React.MutableRefObject<THREE.Object3D<THREE.Object3DEventMap>>,
    THREE.DirectionalLightHelper
  );
  const { scene } = useThree();

  useEffect(() => {
    const lightRef = light.current;
    if (!lightRef) return;
    scene.add(lightRef.target);
    return () => {
      scene.remove(lightRef.target);
    };
  }, [scene, light]);

  return (
    <>
      <directionalLight
        color={0xffffff} // 흰색 빛
        intensity={1} // 강도
        position={[0, 5, 0]} // 위치
        ref={light}
        target-position={[1, 0, 0]}
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

export default DirectionalLight;
