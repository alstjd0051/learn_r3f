import { ReactThreeFiber } from "@react-three/fiber";

declare global {
  module JSX {
    interface IntrinsicElements {
      simpleMaterial: ReactThreeFiber.Object3DNode<typeof SimpleMaterial>;
    }
  }
}
