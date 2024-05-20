import { useHelper } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const SpotLight = () => {
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
  const smallSpherePivot = useRef<THREE.Group>(null);
  const light = useRef<THREE.SpotLight>(null);

  useFrame((state) => {
    if (!smallSpherePivot.current || !light.current) return;
    const time = state.clock.elapsedTime;
    smallSpherePivot.current.rotation.y = THREE.MathUtils.degToRad(time * 30);
    smallSpherePivot.current.children[0].getWorldPosition(
      light.current.target.position
    ); // 빛이 비추는 방향을 계속해서 업데이트
  });
  useHelper(
    light as React.MutableRefObject<THREE.Object3D<THREE.Object3DEventMap>>,
    THREE.SpotLightHelper
  );

  const { scene } = useThree();
  useEffect(() => {
    if (!light.current) return;
    scene.add(light.current?.target);
    return () => {
      scene.remove(light.current!.target);
    };
  }, [scene, light]);

  return (
    <>
      <spotLight
        ref={light}
        color={0xffffff}
        intensity={10} // 빛의 세기
        position={[0, 5, 0]}
        target-position={[0, 0, 0]} // 빛이 비추는 방향
        distance={0} // 빛이 닿는 거리 기본값은 0
        angle={THREE.MathUtils.degToRad(30)} // 빛이 비추는 각도 기본값은 Math.PI / 3
        penumbra={0} // 빛의 감쇠 정도 기본값은 0
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
      <group ref={smallSpherePivot}>
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

export default SpotLight;
