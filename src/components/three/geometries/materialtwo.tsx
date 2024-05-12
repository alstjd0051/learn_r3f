import { useControls } from "leva";
import StandardMaterial from "../../items/Standardmaterial";
import ReflectorMaterial from "../../items/MeshReflectorMaterial";

const MaterialTwo = () => {
  const { meshStandard, meshReflectorMaterial } = useControls({
    meshStandard: {
      value: true,
      label: "Mesh Standard Material",
    },
    meshReflectorMaterial: {
      value: false,
      label: "Mesh Reflector Material",
    },
  });

  return (
    <>
      {meshReflectorMaterial && <ReflectorMaterial />}
      {meshStandard && <StandardMaterial />}
    </>
  );
};

export default MaterialTwo;
