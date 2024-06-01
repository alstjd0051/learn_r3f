import React from "react";
import { Canvas } from "@react-three/fiber";
import { Cloud, Clouds, OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

const TestWrapper = () => {
  const { position } = useControls({
    position: {
      value: [0, 0, -10],
      step: 0.01,
      label: "Position",
    },
  });
  return (
    <Canvas>
      <ambientLight />
      <OrbitControls />
      <pointLight position={position} />
      {/* <Environment preset="city" background blur={1} /> */}
      <Clouds>
        <Cloud
          concentrate="outside"
          seed={1}
          segments={100}
          bounds={20}
          volume={20}
          growth={10}
          opacity={0.15}
          position={[0, 0, -10]}
          speed={1}
        />
      </Clouds>
    </Canvas>
  );
};

export default TestWrapper;
