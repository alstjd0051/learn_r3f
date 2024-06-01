import React, { useEffect, useState } from "react";
import { Environment, useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";

const AnimateModel = () => {
  const model = useGLTF("/model/sample.glb");
  const [height, setHeight] = useState(0);
  const animations = useAnimations(model.animations, model.scene);

  console.log(animations);

  const { actionName } = useControls({
    actionName: {
      value: animations.names[1],
      options: animations.names,
    },
  });

  useEffect(() => {
    const action = animations.actions[actionName];
    action?.reset().fadeIn(0.5).play();

    return () => {
      action?.fadeOut(0.5);
    };
  }, [actionName]);

  useEffect(() => {
    let minY = Infinity,
      maxY = -Infinity;
    model.scene.traverse((item) => {
      if ((item as THREE.Mesh).isMesh) {
        const geomBbox = (item as THREE.Mesh).geometry.boundingBox;
        if (!geomBbox) return;
        if (minY > geomBbox.min.y) minY = geomBbox.min.y;
        if (maxY < geomBbox.max.y) maxY = geomBbox.max.y;
      }
    });
    const h = maxY - minY;
    setHeight(h);
    console.log(h);
  }, [model.scene]);

  return (
    <>
      <Environment preset="sunset" />

      <primitive
        scale={5}
        object={model.scene}
        position-y={-(height / 2) * 5}
      />
    </>
  );
};

export default AnimateModel;
