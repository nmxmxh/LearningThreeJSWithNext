import {
  BoxGeometryProps,
  Color,
  Euler,
  MeshBasicMaterialProps,
  MeshProps,
  Vector3,
} from '@react-three/fiber';
import React from 'react';
import { Mesh } from 'three';

interface CubeProps extends MeshProps {
  geometryArgs?: BoxGeometryProps;
  materialArgs?: MeshBasicMaterialProps;
}

const Cube = React.forwardRef(
  (props: CubeProps, ref: React.ForwardedRef<Mesh>) => {
    const { geometryArgs, materialArgs } = props;

    return (
      <mesh ref={ref} {...props}>
        <boxGeometry args={[1, 1, 1]} {...geometryArgs} />
        <meshBasicMaterial {...materialArgs} />
      </mesh>
    );
  },
);

Cube.displayName = 'Cube';

export default Cube;
