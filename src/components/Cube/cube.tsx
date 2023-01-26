import { Color, Euler, MeshProps, Vector3 } from "@react-three/fiber"
import React from "react";
import { Mesh } from "three";

interface CubeProps extends MeshProps {
  position?: Vector3;
  scale?: Vector3;
  rotation?: Euler;
  color?: Color;
}

const Cube = React.forwardRef((props: CubeProps, ref: React.ForwardedRef<Mesh>) => {
  const { position, scale, rotation, color } = props;
  return (
    <mesh
      position={position}
      scale={scale}
      rotation={rotation}
      ref={ref}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
});

Cube.displayName = "Cube";

export default Cube