import { Canvas } from "@react-three/fiber";
import { useCallback, useEffect, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Vector3 } from "three";
import { useRtfCollection } from "../hooks/rtfcollection";

const ThreeWrapper = () => {
  const [cameraSettings, setCameraSettings] = useState({
    fov: 75,
    position: new Vector3(7, 7, 0),
  });
  const { data, SelectedComponent, handleClick } = useRtfCollection();

  const ChangeThreeItems = useCallback(() => {
    return SelectedComponent ? <SelectedComponent /> : null;
  }, [SelectedComponent]);

  useEffect(() => {
    if (SelectedComponent) {
      if (SelectedComponent.name === "Light") {
        setCameraSettings({
          fov: 75,
          position: new Vector3(7, 7, 0),
        });
      } else {
        setCameraSettings({
          fov: 60,
          position: new Vector3(5, 5, 5),
        });
      }
    }
  }, [SelectedComponent]);

  return (
    <div className="w-full h-full ">
      <div className="mx-auto w-fit space-x-5 pt-5 space-y-5">
        {data?.map(({ name }, idx) => (
          <button
            key={idx}
            className="hover:text-red-600 text-lg"
            onClick={() => {
              handleClick(name);
            }}
          >
            {name}
          </button>
        ))}
      </div>

      <Canvas camera={{ ...cameraSettings }}>
        <OrbitControls />
        <ChangeThreeItems />
      </Canvas>
    </div>
  );
};

export default ThreeWrapper;
