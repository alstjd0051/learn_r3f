import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useControls } from "leva";

const GeometryTwo = () => {
  const refMesh = useRef<THREE.Mesh>(null);
  const refWireMesh = useRef<THREE.Mesh>(null);
  const cylinderrefMesh = useRef<THREE.Mesh>(null);
  const cylinderrefWireMesh = useRef<THREE.Mesh>(null);

  const {
    radius,
    widthSegments,
    heightSegments,
    phiStart,
    phiLength,
    thetaStart,
    thetaLength,
    topRadius,
    bottomRadius,
    height,
    radialSegments,
    cyheightSegments,
    bOpen,
    cythetaStart,
    cythetaLength,
    toradius,
    totube,
    toradialSegments,
    totubularSegments,
    toarc,
  } = useControls({
    radius: { value: 1, min: 0.1, max: 5, step: 0.01 },
    widthSegments: { value: 32, min: 3, max: 256, step: 1 },
    heightSegments: { value: 32, min: 2, max: 256, step: 1 },
    phiStart: { value: 0, min: 0, max: 360, step: 0.1 },
    phiLength: { value: 360, min: 0, max: 360, step: 0.1 },
    thetaStart: { value: 0, min: 0, max: 180, step: 0.1 },
    thetaLength: { value: 180, min: 0, max: 180, step: 0.1 },
    topRadius: { value: 1, min: 0.1, max: 5, step: 0.01 },
    bottomRadius: { value: 1, min: 0.1, max: 5, step: 0.01 },
    height: { value: 1, min: 0.1, max: 5, step: 0.01 },
    radialSegments: { value: 32, min: 3, max: 256, step: 1 },
    cyheightSegments: { value: 1, min: 1, max: 256, step: 1 },
    bOpen: { value: false },
    cythetaStart: { value: 0, min: 0, max: 360, step: 0.01 },
    cythetaLength: { value: 360, min: 0, max: 360, step: 0.01 },
    toradius: { value: 1, min: 1, max: 20, step: 0.01 },
    totube: { value: 0.4, min: 0, max: 10, step: 0.1 },
    toradialSegments: { value: 12, min: 2, max: 30, step: 0.1 },
    totubularSegments: { value: 48, min: 3, max: 200, step: 0.1 },
    toarc: { value: 0.4, min: 0.1, max: 6.3, step: 0.1 },
  });

  useEffect(() => {
    if (!refMesh.current || !refWireMesh.current) return;
    if (!cylinderrefWireMesh.current || !cylinderrefMesh.current) return;
    refWireMesh.current.geometry = refMesh.current?.geometry;
    cylinderrefWireMesh.current.geometry = cylinderrefMesh.current?.geometry;
  }, [
    radius,
    widthSegments,
    heightSegments,
    phiStart,
    phiLength,
    thetaStart,
    thetaLength,
    topRadius,
    bottomRadius,
    height,
    radialSegments,
    cyheightSegments,
    bOpen,
    cythetaStart,
    cythetaLength,
    toradius,
    totube,
    toradialSegments,
    totubularSegments,
    toarc,
  ]);

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[2, 1, 3]} intensity={0.5} />
      <group>
        <mesh ref={refMesh}>
          <sphereGeometry
            args={[
              radius,
              widthSegments,
              heightSegments,
              (phiStart * Math.PI) / 180,
              (phiLength * Math.PI) / 180,
              (thetaStart * Math.PI) / 180,
              (thetaLength * Math.PI) / 180,
            ]}
          />
          <meshStandardMaterial color={"#1abc9c"} />
        </mesh>
        <mesh ref={refWireMesh}>
          <boxGeometry />
          <meshStandardMaterial
            emissive={"yellow"}
            wireframe={true}
            color={"#1abc9c"}
          />
        </mesh>
      </group>

      <group position={[2, 0, 0]}>
        <mesh ref={cylinderrefMesh}>
          <cylinderGeometry
            args={[
              topRadius,
              bottomRadius,
              height,
              radialSegments,
              cyheightSegments,
              bOpen,
              (cythetaStart * Math.PI) / 180,
              (cythetaLength * Math.PI) / 180,
            ]}
          />
          <meshStandardMaterial color={"#1abcdc"} />
        </mesh>
        <mesh ref={cylinderrefWireMesh}>
          <boxGeometry />
          <meshStandardMaterial
            emissive={"red"}
            wireframe={true}
            color={"#1abcdc"}
          />
        </mesh>
      </group>
      <group position={[-3, 0, 0]}>
        <mesh ref={cylinderrefMesh}>
          <torusGeometry
            args={[
              toradius,
              totube,
              toradialSegments,
              totubularSegments,
              toarc * Math.PI,
            ]}
          />
          <meshStandardMaterial color={"#1edcba"} />
        </mesh>
        <mesh ref={cylinderrefWireMesh}>
          <boxGeometry />
          <meshStandardMaterial
            emissive={"red"}
            wireframe={true}
            color={"#1edcba"}
          />
        </mesh>
      </group>
    </>
  );
};

export default GeometryTwo;
