import { useControls } from "leva";
import StandardMaterial from "../../items/Standardmaterial";
import ReflectorMaterial from "../../items/MeshReflectorMaterial";
import MeshTransmisionMaterial from "../../items/meshTransmisionMaterial";
import MeshTrousMaterial from "../../items/meshTrousMaterial";
import MeshDistortmaterial from "../../items/meshDistortmaterial";
import MeshDiscardmaterial from "../../items/MeshDiscardmaterial";
import MeshShaderMaterial from "../../items/shaderMaterial";

const MaterialTwo = () => {
  const {
    meshStandard,
    meshReflectorMaterial,
    meshTransmisionMaterial,
    meshTrousMaterial,
    meshDistortmaterial,
    meshDiscardmaterial,
    meshShaderMaterial,
  } = useControls({
    meshStandard: {
      value: false,
      label: "Mesh Standard Material",
    },
    meshReflectorMaterial: {
      value: false,
      label: "Mesh Reflector Material",
    },
    meshTransmisionMaterial: {
      value: false,
      label: "Mesh Transmision Material",
    },
    meshTrousMaterial: {
      value: false,
      label: "Mesh Trous Material",
    },
    meshDistortmaterial: {
      value: false,
      label: "Mesh Distort Material",
    },
    meshDiscardmaterial: {
      value: false,
      lebel: "Mesh Discard Material",
    },
    meshShaderMaterial: {
      value: true,
      label: "Mesh Shader Material",
    },
  });

  return (
    <>
      {meshReflectorMaterial && <ReflectorMaterial />}
      {meshStandard && <StandardMaterial />}
      {meshTransmisionMaterial && <MeshTransmisionMaterial />}
      {meshTrousMaterial && <MeshTrousMaterial />}
      {meshDistortmaterial && <MeshDistortmaterial />}
      {meshDiscardmaterial && <MeshDiscardmaterial />}
      {meshShaderMaterial && <MeshShaderMaterial />}
    </>
  );
};

export default MaterialTwo;
