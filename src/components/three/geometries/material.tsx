import { useControls } from "leva";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Material = () => {
  const mesh1 = useRef<THREE.Mesh>(null);
  const mesh2 = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!mesh1.current || !mesh2.current) return;
    mesh2.current.material = mesh1.current.material;
    // mesh1.current.material = mesh2.current.material;
  }, []);

  const {
    side,
    transparent,
    meshOpacity,
    wireframe,
    color,
    emissive,
    specular,
    shininess,
  } = useControls({
    meshOpacity: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.1,
    },
    side: {
      value: THREE.FrontSide,
      options: {
        FrontSide: THREE.FrontSide,
        BackSide: THREE.BackSide,
        DoubleSide: THREE.DoubleSide,
      },
    },
    transparent: {
      value: true,
      option: {
        true: true,
        false: false,
      },
    },
    wireframe: {
      value: false,
      option: {
        true: true,
        false: false,
      },
    },
    color: {
      value: "#d25383",
      label: "Color",
    },
    emissive: {
      value: "#666600",
      label: "Emissive",
    },
    specular: {
      value: "#000000",
      label: "Specular",
    },
    shininess: {
      value: 0,
      min: 0,
      max: 100,
      step: 1,
    },
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 1, 0]} />
      <directionalLight position={[1, 2, 8]} intensity={0.7} />

      <mesh ref={mesh1} position={[0.7, 0, 0]}>
        <boxGeometry />
        <meshPhongMaterial
          visible={true}
          transparent={transparent}
          opacity={meshOpacity}
          depthTest={true}
          depthWrite={true}
          side={side}
          color={color}
          wireframe={wireframe}
          emissive={emissive}
          specular={specular}
          shininess={shininess}
        />
      </mesh>

      <mesh ref={mesh2} position={[-0.7, 0, 0]}>
        <torusGeometry args={[0.5, 0.2]} />
      </mesh>
    </>
  );
};

export default Material;
