import { Canvas } from "@react-three/fiber";
import { useCallback } from "react";
import { useRtfCollection } from "../hooks/rtfcollection";
import { OrbitControls } from "@react-three/drei";

const ThreeWrapper = () => {
  const { data, SelectedComponent, handleClick } = useRtfCollection();

  const ChangeThreeItems = useCallback(() => {
    return SelectedComponent ? <SelectedComponent /> : null;
  }, [SelectedComponent]);

  return (
    <div className="w-full h-full ">
      <div className="mx-auto w-fit space-x-5 pt-5 space-y-5">
        {data.map(({ name }, idx) => (
          <button
            key={idx}
            onClick={() => {
              handleClick(name);
            }}
          >
            {name}
          </button>
        ))}
      </div>

      <Canvas>
        <OrbitControls />
        <ChangeThreeItems />
      </Canvas>
    </div>
  );
};

export default ThreeWrapper;
