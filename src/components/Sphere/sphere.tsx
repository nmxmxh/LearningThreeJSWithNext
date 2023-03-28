import {
  MeshBasicMaterialProps,
  MeshProps,
  SphereGeometryProps,
} from '@react-three/fiber';
import React from 'react';
import { Mesh } from 'three';

interface SphereProps extends MeshProps {
  geometryArgs?: SphereGeometryProps;
  materialArgs?: MeshBasicMaterialProps;
}

const Sphere = React.forwardRef(
  (props: SphereProps, ref: React.ForwardedRef<Mesh>) => {
    const { geometryArgs, materialArgs } = props;

    return (
      <mesh ref={ref} {...props}>
        <sphereBufferGeometry args={[1, 1, 1]} {...geometryArgs} />
        <meshBasicMaterial {...materialArgs} />
      </mesh>
    );
  },
);

Sphere.displayName = 'Sphere';

export default Sphere;
