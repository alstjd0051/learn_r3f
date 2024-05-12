import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

export const SimpleMaterial = shaderMaterial(
  {
    uColor: new THREE.Color(1, 0, 0),
  },
  `
  varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }`,
  `
    uniform vec3 uColor;
    varying vec2 vUv;

    void main() {
        gl_FragColor = vec4(vUv.y * uColor, 1.0);
    }
    `
);
