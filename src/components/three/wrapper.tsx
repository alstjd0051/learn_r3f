import { Canvas } from "@react-three/fiber";
import { useCallback, useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";

import { useRtfCollection } from "../hooks/rtfcollection";
import { Vector3dArray } from "leva/dist/declarations/src/types";

const ThreeWrapper = () => {
  const [cameraSettings, setCameraSettings] = useState<{
    fov?: number;
    position: Vector3dArray | undefined;
    near?: number;
    far?: number;
    zoom?: number;
  }>({
    fov: 75,
    position: [7, 7, 0],
  });
  const CanvasRef = useRef<HTMLCanvasElement>(null);
  const [OrthographicCamera, setOrthographicCamera] = useState(false);

  const { data, SelectedComponent, handleClick } = useRtfCollection();

  const ChangeThreeItems = useCallback(() => {
    return SelectedComponent ? <SelectedComponent /> : null;
  }, [SelectedComponent]);

  useEffect(() => {
    if (SelectedComponent) {
      if (SelectedComponent.name.includes("Light")) {
        setCameraSettings({
          fov: 75,
          position: [7, 7, 0],
        });
        setOrthographicCamera(false);
      } else if (SelectedComponent.name === "PerspectiveCamera") {
        setCameraSettings({
          fov: 130,
          near: 0.1,
          far: 20,
          position: [7, 7, 0],
        });
        setOrthographicCamera(false);
      } else if (SelectedComponent.name === "OrthographicCamera") {
        setCameraSettings({
          near: 0.1,
          far: 20,
          position: [7, 7, 0],
          zoom: 100,
        });
        setOrthographicCamera(true);
      } else {
        setCameraSettings({
          fov: 60,
          position: [5, 5, 5],
        });
        setOrthographicCamera(false);
      }
    }
  }, [SelectedComponent]);

  const CameraWrapper = useCallback(() => {
    return (
      <Canvas
        ref={CanvasRef}
        orthographic={OrthographicCamera}
        camera={cameraSettings}
      >
        {SelectedComponent?.name !== "Camera" && <OrbitControls />}
        <ChangeThreeItems />
      </Canvas>
    );
  }, [
    ChangeThreeItems,
    OrthographicCamera,
    SelectedComponent?.name,
    cameraSettings,
  ]);

  return (
    <div className="w-full h-dvh overflow-hidden">
      <nav className="grid grid-cols-2 gap-y-3 md:gap-y-5 md:grid-cols-5   gap-x-5 max-w-2xl md:max-w-3xl xl:max-w-4xl mx-auto ">
        {data?.map(({ name }, idx) => (
          <button
            key={idx}
            className="hover:text-red-600 text-balance  lg:text-lg text-black dark:text-white cursor-pointer uppercase"
            onClick={() => {
              handleClick(name);
            }}
          >
            {name}
          </button>
        ))}
      </nav>
      <CameraWrapper />
    </div>
  );
};

export default ThreeWrapper;
