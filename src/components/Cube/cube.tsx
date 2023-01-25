import { Color, Euler, MeshProps, Vector3 } from "@react-three/fiber"

interface CubeProps extends MeshProps {
  position?: Vector3;
  scale?: Vector3;
  rotation?: Euler;
  color?: Color;
}

export default function Cube({ position, scale, rotation, color }: CubeProps) {
  return (
    <mesh
      position={position}
      scale={scale}
      rotation={rotation}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}