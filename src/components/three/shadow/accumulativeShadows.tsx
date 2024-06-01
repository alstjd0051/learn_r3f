import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import {
  AccumulativeShadows as AccumulativeShadow,
  RandomizedLight,
} from "@react-three/drei";

const AccumulativeShadows = () => {
  const smallSpherePivot = useRef<THREE.Group>(null);
  const { camera } = useThree();

  /* 
  shadows
        camera={{
          near: 1,
          far: 100,
          position: [7, 7, 0],
        }}
  */

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
    if (!smallSpherePivot.current) return;
    const time = state.clock.elapsedTime;
    smallSpherePivot.current.rotation.y = THREE.MathUtils.degToRad(time * 40);
  });

  useEffect(() => {
    camera.near = 1;
    camera.far = 100;
    camera.position.set(7, 7, 0);
  }, []);

  return (
    <>
      <ambientLight intensity={0.1} /> {/* 주변광 */}
      <directionalLight color={"#ffffff"} intensity={1} position={[0, 5, 0]} />
      {/* <mesh receiveShadow rotation-x={THREE.MathUtils.degToRad(-90)}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color={"#2c3e50"}
          roughness={0.5}
          metalness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh> */}
      <mesh castShadow position-y={1.7}>
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
        <mesh castShadow position={[3, 0.5, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color={"#e74c3c"}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>
      </group>
      <AccumulativeShadow
        position={[0, 0.01, 0]} // y값을 0.01로 설정하여 그림자가 바닥에 붙도록 설정
        scale={12} // 평면 mesh의 크기를 설정
        color="#000000" // 그림자의 색상을 설정
        opacity={0.7} // 그림자의 투명도를 설정
        alphaTest={1} // 그림자에 대한 pixel의 alpha값을 설정해서 그림자의 표현을 설정
        frames={Infinity} // 그림자의 프레임을 설정
        temporal
        blend={30}
      >
        <RandomizedLight
          radius={0.5}
          ambient={0.01} // 주변광의 세기를 설정
          intensity={1.5} // 광원의 세기를 설정
          position={[5, 3, 0]}
        />
        {/* <RandomizedLight
          amount={4}
          radius={0.5}
          ambient={0.21}
          intensity={0.6}
          position={[-5, 3, 5]}
        /> */}
      </AccumulativeShadow>
    </>
  );
};

export default AccumulativeShadows;
