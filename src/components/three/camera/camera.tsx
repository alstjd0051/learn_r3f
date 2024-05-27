/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useHelper } from "@react-three/drei";

import { RectAreaLightHelper, RectAreaLightUniformsLib } from "three-stdlib";

RectAreaLightUniformsLib.init();

const PerspectiveCamera = () => {
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
  const ghostSpherePivot = useRef<THREE.Group>(null);
  const light = useRef<THREE.RectAreaLight>(null);

  useFrame((state) => {
    if (
      !smallSpherePivot.current ||
      !light.current ||
      !ghostSpherePivot.current
    )
      return;
    const time = state.clock.elapsedTime;
    smallSpherePivot.current.rotation.y = THREE.MathUtils.degToRad(time * 30);

    const target = new THREE.Vector3(); // 타겟을 설정
    smallSpherePivot.current.children[0].getWorldPosition(target); // 타겟의 위치를 가져옴
    state.camera.position.copy(target); // 카메라의 위치를 타겟의 위치로 설정

    ghostSpherePivot.current.rotation.y = THREE.MathUtils.degToRad(
      time * 50 + 30
    ); // 회전
    ghostSpherePivot.current.children[0].getWorldPosition(target); // 타겟의 위치를 가져옴
    state.camera.lookAt(target); // 카메라의 시선을 타겟의 위치로 설정
  });
  useHelper(
    light as React.MutableRefObject<THREE.Object3D<THREE.Object3DEventMap>>,
    RectAreaLightHelper,
    "#fff"
  );

  /* 
  const { camera } = useThree();
  useControls({
    positionZ: {
      value: 0,
      min: -10,
      max: 10,
      step: 0.1,
      onChange: (v) => (camera.position.z = v), // 카메라의 z축을 변경
    },
    targetZ: {
      value: 0,
      min: -10,
      max: 10,
      step: 0.1,
      onChange: (v) => camera.lookAt(0, 0, v), // 카메라의 시선을 변경
    },
  }); */

  return (
    <>
      <rectAreaLight
        ref={light}
        color={"#ffffff"}
        intensity={10} // 빛의 세기
        width={1}
        height={5}
        position={[0, 5, 0]}
        rotation-x={THREE.MathUtils.degToRad(-90)}
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

      <group ref={ghostSpherePivot}>
        <object3D position={[3, 0.5, 0]} />
      </group>
    </>
  );
};

export default PerspectiveCamera;
