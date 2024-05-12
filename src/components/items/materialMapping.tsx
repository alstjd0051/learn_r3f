import { useControls } from "leva";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface MaterialMappingProps {
  textures: {
    map: THREE.Texture;
    roughnessMap: THREE.Texture;
    metalnessMap: THREE.Texture;
    normalMap: THREE.Texture;
    displacementMap: THREE.Texture;
    aoMap: THREE.Texture;
    alphaMap: THREE.Texture;
  };
}

const MaterialMapping = ({ textures }: MaterialMappingProps) => {
  const mesh = useRef<THREE.Mesh>(null);
  useEffect(() => {
    if (!mesh.current) return;
    textures.map.repeat.x =
      textures.displacementMap.repeat.x =
      textures.aoMap.repeat.x =
      textures.roughnessMap.repeat.x =
      textures.metalnessMap.repeat.x =
      textures.normalMap.repeat.x =
      textures.alphaMap.repeat.x =
        4;

    textures.map.wrapS =
      textures.displacementMap.wrapS =
      textures.aoMap.wrapS =
      textures.roughnessMap.wrapS =
      textures.roughnessMap.wrapS =
      textures.metalnessMap.wrapS =
      textures.normalMap.wrapS =
      textures.alphaMap.wrapS =
        THREE.MirroredRepeatWrapping;
    textures.alphaMap.needsUpdate = true;

    mesh.current.geometry.setAttribute(
      "uv2",
      new THREE.BufferAttribute(mesh.current.geometry.attributes.uv.array, 2)
    );
  }, [textures]);

  const {
    metalness,
    wireframe,
    displacementBias,
    alphaToCoverage,
    transparent,
    displacementScale,
  } = useControls({
    metalness: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.01,
    },
    wireframe: {
      value: false,
    },
    displacementScale: {
      value: 0.2,
      min: -1,
      max: 1,
      step: 0.01,
    },
    displacementBias: {
      value: -0.2,
      min: -1,
      max: 1,
      step: 0.01,
    },
    transparent: {
      value: true,
    },
    alphaToCoverage: {
      value: true,
    },
  });
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 1, -8]} intensity={0.4} />
      <directionalLight position={[1, 2, 8]} intensity={0.4} />
      <mesh ref={mesh}>
        <cylinderGeometry args={[2, 2, 3, 256, 256, true]} />
        <meshStandardMaterial
          wireframe={wireframe}
          side={THREE.DoubleSide}
          map={textures.map}
          roughnessMap={textures.roughnessMap}
          //   roughnessMap-colorSpace={THREE.NoColorSpace}
          metalnessMap={textures.metalnessMap}
          metalness={metalness}
          //   metalnessMap-colorSpace={THREE.NoColorSpace}
          normalMap={textures.normalMap}
          //   normalMap-colorSpace={THREE.NoColorSpace}
          normalScale={new THREE.Vector2(1, 1)}
          displacementMap={textures.displacementMap}
          //   displacementMap-colorSpace={THREE.NoColorSpace}
          displacementScale={displacementScale}
          displacementBias={displacementBias}
          aoMap={textures.aoMap}
          //   alphaMap={textures.alphaMap}
          //   alphaMap-colorSpace={THREE.NoColorSpace}
          transparent={transparent}
          alphaToCoverage={alphaToCoverage}
        />
      </mesh>
    </>
  );
};

export default MaterialMapping;
