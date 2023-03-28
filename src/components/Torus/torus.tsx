import {
  MeshBasicMaterialProps,
  MeshProps,
  TorusGeometryProps,
} from '@react-three/fiber';
import React from 'react';
import { Mesh } from 'three';

interface TorusProps extends MeshProps {
  geometryArgs?: TorusGeometryProps;
  materialArgs?: MeshBasicMaterialProps;
}

const Torus = React.forwardRef(
  (props: TorusProps, ref: React.ForwardedRef<Mesh>) => {
    const { geometryArgs, materialArgs } = props;

    return (
      <mesh ref={ref} {...props}>
        <torusGeometry args={[1, 1, 1]} {...geometryArgs} />
        <meshBasicMaterial {...materialArgs} />
      </mesh>
    );
  },
);

Torus.displayName = 'Torus';

export default Torus;
