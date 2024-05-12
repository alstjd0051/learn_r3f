import { Html, useTexture } from "@react-three/drei";
import MaterialMapping from "../../items/materialMapping";

const MaterialThree = () => {
  const textures = useTexture({
    map: `/images/glass/Glass_Window_002_basecolor.jpg`,
    roughnessMap: `/images/glass/Glass_Window_002_roughness.jpg`,
    metalnessMap: `/images/glass/Glass_Window_002_metallic.jpg`,
    normalMap: `/images/glass/Glass_Window_002_normal.jpg`,
    displacementMap: `/images/glass/Glass_Window_002_height.png`,
    aoMap: `/images/glass/Glass_Window_002_ambientOcclusion.jpg`,
    alphaMap: `/images/glass/Glass_Window_002_opacity.jpg`,
  });
  return (
    <>
      <Html
        style={{ transform: "-50%,-50%" }}
        fullscreen
        center
        zIndexRange={[100, 0]}
      >
        <div className="w-fit mx-auto ">
          <h1 className="py-2 px-5 rounded-lg  bg-blue-500 text-2xl">
            텍스쳐맵핑 속성
          </h1>
        </div>
      </Html>
      <MaterialMapping textures={textures} />
    </>
  );
};

export default MaterialThree;
