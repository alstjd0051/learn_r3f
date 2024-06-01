import { Canvas } from "@react-three/fiber";
import React from "react";
import AnimateWrapper from "../components/units/animateWrapper";
import AnimateModel from "../components/commons/model/animate";

const AnimatePage = () => {
  return (
    <Canvas camera={{ near: 1, far: 100, position: [7, 7, 0] }}>
      <AnimateWrapper />
      <AnimateModel />
    </Canvas>
  );
};

export default AnimatePage;
