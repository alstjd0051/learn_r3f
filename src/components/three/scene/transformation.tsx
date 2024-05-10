import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

const Transformation = () => {
  return (
    <>
      <directionalLight position={[1, 1, 1]} />
      <OrbitControls />
      <axesHelper scale={10} />
      <mesh
        position-y={2}
        rotation-z={THREE.MathUtils.degToRad(45)}
        scale={[2, 1, 1]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color={"#e67e22"}
          opacity={0.5}
          transparent={true}
        />
        <axesHelper />
        <mesh
          scale={new THREE.Vector3(0.1, 0.1, 0.1)}
          position={new THREE.Vector3(0, 2, 0)}
        >
          <sphereGeometry />
          <meshStandardMaterial color={"red"} />
          <axesHelper scale={5} />
        </mesh>
      </mesh>
    </>
  );
};

export default Transformation;
