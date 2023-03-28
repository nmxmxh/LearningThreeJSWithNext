import {
  MeshBasicMaterialProps,
  MeshNormalMaterialProps,
} from '@react-three/fiber';

export type MaterialType = 'basic' | 'normal';
export type MaterialArgsProps =
  | { name: 'basic'; args?: MeshBasicMaterialProps }
  | { name: 'normal'; args?: MeshNormalMaterialProps };
