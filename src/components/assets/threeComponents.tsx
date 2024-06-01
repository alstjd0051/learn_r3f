import Transformation from "../three/geometries/transformation";
import Geometry from "../three/geometries/geometry";
import GeometryTwo from "../three/geometries/geometrytwo";
import Material from "../three/material/material";
import MaterialTwo from "../three/material/materialtwo";
import MaterialThree from "../three/material/materialthree";
import AmbientLight from "../three/light/ambientLight";
import HemisphereLight from "../three/light/hemisphereLight";
import DirectionalLight from "../three/light/directionalLight";
import PointLight from "../three/light/pointLight";
import SpotLight from "../three/light/spotLight";
import RectAreaLight from "../three/light/rectAreaLight";
import EnvironmentLight from "../three/light/environmentLight";
import OrthographicCamera from "../three/camera/orthographic_camera";
import PerspectiveCamera from "../three/camera/camera";
import DirectionalLightShadow from "../three/shadow/directionalLight";
import PointLightShadow from "../three/shadow/pointLight";
import SpotLightShadow from "../three/shadow/spotLight";

export const R3FDatas = async () => {
  return [
    { name: "Transformation", Component: Transformation },
    { name: "Geometry", Component: Geometry },
    { name: "Geometry2", Component: GeometryTwo },
    { name: "Material", Component: Material },
    { name: "Material2", Component: MaterialTwo },
    { name: "Material3", Component: MaterialThree },
    { name: "ambientLight", Component: AmbientLight },
    { name: "hemisphereLight", Component: HemisphereLight },
    { name: "directionalLight", Component: DirectionalLight },
    { name: "pointLight", Component: PointLight },
    { name: "spotLight", Component: SpotLight },
    { name: "rectAreaLight", Component: RectAreaLight },
    { name: "environment", Component: EnvironmentLight },
    { name: "Perspective Camera", Component: PerspectiveCamera },
    { name: "Orthographic Camera", Component: OrthographicCamera },
    { name: "Directional Light Shadow", Component: DirectionalLightShadow },
    { name: "Point Light Shadow", Component: PointLightShadow },
    { name: "Spot Light Shadow", Component: SpotLightShadow },
  ];
};
