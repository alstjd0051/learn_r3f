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
      if (SelectedComponent.name.includes("Light")) {
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
    <div className="w-full">
      <nav className="grid grid-cols-2 gap-y-3 md:gap-y-5 md:grid-cols-5  gap-x-5 max-w-xl md:max-w-2xl xl:max-w-3xl mx-auto">
        {data?.map(({ name }, idx) => (
          <button
            key={idx}
            className="hover:text-red-600 text-lg text-black dark:text-white cursor-pointer"
            onClick={() => {
              handleClick(name);
            }}
          >
            {name}
          </button>
        ))}
      </nav>

      <Canvas style={{ height: `90dvh` }} camera={{ ...cameraSettings }}>
        <OrbitControls />
        <ChangeThreeItems />
      </Canvas>
    </div>
  );
};

export default ThreeWrapper;
