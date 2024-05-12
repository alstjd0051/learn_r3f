import React from "react";
import { useLoader } from "@react-three/fiber";
import { RGBELoader } from "three-stdlib";
import { CubeCamera, MeshRefractionMaterial } from "@react-three/drei";
import { useControls } from "leva";

const StandardMaterial = () => {
  const textture = useLoader(
    RGBELoader,
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr"
  );
  const { color, bounces, aberrationStrength, ior, fresnel, fastChroma } =
    useControls({
      color: {
        value: "#d25383",
      },
      bounces: {
        value: 2,
        min: 0,
        max: 10,
        step: 1,
      },
      aberrationStrength: {
        value: 0.03,
        min: 0,
        max: 1,
        step: 0.01,
      },
      ior: {
        value: 2.75,
        min: 0,
        max: 10,
        step: 0.01,
      },
      fresnel: {
        value: 1,
        min: 0,
        max: 1,
        step: 0.01,
      },
      fastChroma: {
        value: true,
      },
    });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 1, 0]} />
      <directionalLight position={[1, 2, 8]} intensity={0.7} />

      <CubeCamera resolution={1024} frames={1} envMap={textture}>
        {(texture) => (
          <mesh>
            <dodecahedronGeometry />
            <MeshRefractionMaterial
              envMap={texture}
              toneMapped={false}
              bounces={bounces}
              aberrationStrength={aberrationStrength}
              ior={ior}
              fresnel={fresnel}
              color={color}
              fastChroma={fastChroma}
            />
          </mesh>
        )}
      </CubeCamera>
    </>
  );
};

export default StandardMaterial;
