import {
  MeshBasicMaterialProps,
  MeshProps,
  PlaneGeometryProps,
} from '@react-three/fiber';
import React from 'react';
import { Mesh } from 'three';

interface PlaneProps extends MeshProps {
  geometryArgs?: PlaneGeometryProps;
  materialArgs?: MeshBasicMaterialProps;
}

const Plane = React.forwardRef(
  (props: PlaneProps, ref: React.ForwardedRef<Mesh>) => {
    const { geometryArgs, materialArgs } = props;

    return (
      <mesh ref={ref} {...props}>
        <planeGeometry args={[1, 1, 1]} {...geometryArgs} />
        <meshBasicMaterial {...materialArgs} />
      </mesh>
    );
  },
);

Plane.displayName = 'Plane';

export default Plane;
