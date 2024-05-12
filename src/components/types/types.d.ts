import { ReactThreeFiber } from "@react-three/fiber";
interface ThreeItem {
  name: string;
  Component: () => React.ReactElement;
}

declare global {
  module JSX {
    interface IntrinsicElements {
      simpleMaterial: ReactThreeFiber.Object3DNode<typeof SimpleMaterial>;
    }
  }
}
