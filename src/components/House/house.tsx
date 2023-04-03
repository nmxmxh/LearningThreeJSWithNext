import { Box, Cone, Plane, Sphere, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import _ from 'lodash';
import { useRef } from 'react';
import {
  Mesh,
  Clock,
  Vector3,
  PointLight,
  Float32BufferAttribute,
  RepeatWrapping,
} from 'three';

interface Props {
  position: Vector3;
  scale: Vector3;
}

function Bush(props: Props) {
  const { position, scale } = props;
  return (
    <Sphere position={position} scale={scale} castShadow>
      <sphereBufferGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#89c854" />
    </Sphere>
  );
}

function Door() {
  const doorRef = useRef<Mesh>(null!);
  useFrame(() => {
    doorRef.current.geometry.setAttribute(
      'uv2',
      new Float32BufferAttribute(
        doorRef.current.geometry.attributes.uv.array,
        2,
      ),
    );
  });

  const [
    doorColorTexture,
    doorAlphaTexture,
    doorHeightTexture,
    doorNormalTexture,
    doorAOTexture,
    doorMetalnessTexture,
    doorRoughnessTexture,
  ] = useTexture([
    '/textures/door/color.jpg',
    '/textures/door/alpha.jpg',
    '/textures/door/height.jpg',
    '/textures/door/normal.jpg',
    '/textures/door/ambientOcclusion.jpg',
    '/textures/door/metalness.jpg',
    '/textures/door/roughness.jpg',
  ]);

  return (
    <Plane position={[0, 1, 2.01]} ref={doorRef}>
      <planeBufferGeometry args={[2.2, 2.2, 100, 100]} />
      <meshStandardMaterial
        map={doorColorTexture}
        transparent
        alphaMap={doorAlphaTexture}
        aoMap={doorAOTexture}
        displacementMap={doorHeightTexture}
        displacementScale={0.1}
        normalMap={doorNormalTexture}
        metalnessMap={doorMetalnessTexture}
        roughnessMap={doorRoughnessTexture}
      />
    </Plane>
  );
}

function Walls() {
  const wallRef = useRef<Mesh>(null!);
  const [
    bricksColorTexture,
    bricksNormalTexture,
    bricksAOTexture,
    bricksRoughnessTexture,
  ] = useTexture([
    '/textures/bricks/color.jpg',
    '/textures/bricks/normal.jpg',
    '/textures/bricks/ambientOcclusion.jpg',
    '/textures/bricks/roughness.jpg',
  ]);

  useFrame(() => {
    wallRef.current.geometry.setAttribute(
      'uv2',
      new Float32BufferAttribute(
        wallRef.current.geometry.attributes.uv.array,
        2,
      ),
    );
  });

  return (
    <Box position={[0, 1.25, 0]} ref={wallRef} castShadow>
      <boxBufferGeometry args={[4, 2.5, 4]} />
      <meshStandardMaterial
        map={bricksColorTexture}
        transparent
        aoMap={bricksAOTexture}
        normalMap={bricksNormalTexture}
        roughnessMap={bricksRoughnessTexture}
      />
    </Box>
  );
}

function Graves(x: number, z: number) {
  return (
    <Box
      position={[x, 0.2, z]}
      rotation={[0, Math.random() - 0.5 * 0.3, Math.random() - 0.4]}
      castShadow
    >
      <boxBufferGeometry args={[0.6, 0.8, 0.2]} />
      <meshStandardMaterial color="#b2b6b1" />
    </Box>
  );
}

function Floor() {
  const floorRef = useRef<Mesh>(null!);

  const [
    grassColorTexture,
    grassNormalTexture,
    grassAOTexture,
    grassRoughnessTexture,
  ] = useTexture([
    '/textures/grass/color.jpg',
    '/textures/grass/normal.jpg',
    '/textures/grass/ambientOcclusion.jpg',
    '/textures/grass/roughness.jpg',
  ]);

  grassColorTexture.repeat.set(8, 8);
  grassNormalTexture.repeat.set(8, 8);
  grassAOTexture.repeat.set(8, 8);
  grassRoughnessTexture.repeat.set(8, 8);

  grassColorTexture.wrapS = RepeatWrapping;
  grassNormalTexture.wrapS = RepeatWrapping;
  grassAOTexture.wrapS = RepeatWrapping;
  grassRoughnessTexture.wrapS = RepeatWrapping;

  grassColorTexture.wrapT = RepeatWrapping;
  grassNormalTexture.wrapT = RepeatWrapping;
  grassAOTexture.wrapT = RepeatWrapping;
  grassRoughnessTexture.wrapT = RepeatWrapping;

  useFrame(() => {
    floorRef.current.geometry.setAttribute(
      'uv2',
      new Float32BufferAttribute(
        floorRef.current.geometry.attributes.uv.array,
        2,
      ),
    );
  });

  return (
    <Plane
      args={[20, 20]}
      rotation={[-Math.PI * 0.5, 0, 0]}
      position={[0, 0, 0]}
      ref={floorRef}
      receiveShadow
    >
      <meshStandardMaterial
        map={grassColorTexture}
        transparent
        aoMap={grassAOTexture}
        normalMap={grassNormalTexture}
        roughnessMap={grassRoughnessTexture}
      />
      ;
    </Plane>
  );
}

function Doorlight() {
  const lightRef = useRef<PointLight>(null!);
  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.shadow.mapSize.width = 256;
      lightRef.current.shadow.mapSize.height = 256;
      lightRef.current.shadow.camera.far = 7;
    }
  });

  return (
    <pointLight
      args={['#ff7d46', 1, 7]}
      position={[0, 2.2, 2.7]}
      ref={lightRef}
      castShadow
    />
  );
}

function Ghosts() {
  const ghost1Ref = useRef<PointLight>(null!);
  const ghost2Ref = useRef<PointLight>(null!);
  const ghost3Ref = useRef<PointLight>(null!);

  const clock = new Clock();

  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();

    const ghost1Angle = elapsedTime * 0.5;
    const ghost2Angle = -elapsedTime * 0.32;
    const ghost3Angle = -elapsedTime * 0.18;

    ghost1Ref.current.position.x = Math.cos(ghost1Angle) * 4;
    ghost1Ref.current.position.z = Math.sin(ghost1Angle) * 4;
    ghost1Ref.current.position.y = Math.sin(elapsedTime * 3);

    ghost2Ref.current.position.x = Math.cos(ghost2Angle) * 5;
    ghost2Ref.current.position.z = Math.sin(ghost2Angle) * 5;
    ghost2Ref.current.position.y =
      Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

    ghost3Ref.current.position.x =
      Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
    ghost3Ref.current.position.z =
      Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
    ghost3Ref.current.position.y =
      Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

    ghost1Ref.current.shadow.mapSize.width = 256;
    ghost1Ref.current.shadow.mapSize.height = 256;
    ghost1Ref.current.shadow.camera.far = 7;

    ghost2Ref.current.shadow.mapSize.width = 256;
    ghost2Ref.current.shadow.mapSize.height = 256;
    ghost2Ref.current.shadow.camera.far = 7;

    ghost3Ref.current.shadow.mapSize.width = 256;
    ghost3Ref.current.shadow.mapSize.height = 256;
    ghost3Ref.current.shadow.camera.far = 7;
  });

  return (
    <group>
      <pointLight args={['#ff00ff', 2, 3]} ref={ghost1Ref} castShadow />
      <pointLight args={['#00ffff', 2, 3]} ref={ghost2Ref} castShadow />
      <pointLight args={['#ffff00', 2, 3]} ref={ghost3Ref} castShadow />
    </group>
  );
}

const bushes: Props[] = [
  {
    position: new Vector3(0.8, 0.2, 2.2),
    scale: new Vector3(0.5, 0.5, 0.5),
  },
  {
    position: new Vector3(1.4, 0.1, 2.1),
    scale: new Vector3(0.25, 0.25, 0.25),
  },
  {
    position: new Vector3(-0.8, 0.1, 2.2),
    scale: new Vector3(0.4, 0.4, 0.4),
  },
  {
    position: new Vector3(-1, 0.05, 2.6),
    scale: new Vector3(0.15, 0.15, 0.15),
  },
];

export function House() {
  return (
    <group>
      <Cone position={[0, 3, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneBufferGeometry args={[3.5, 1, 4]} />
        <meshStandardMaterial color="#b35f45" />
      </Cone>
      <Walls />
      <Door />
      <group>
        {bushes.map(({ position, scale }, bushIndex) => (
          <Bush key={bushIndex} position={position} scale={scale} />
        ))}
      </group>
      <group>
        {_.times(50, function generate50Graves() {
          const angle = Math.random() * Math.PI * 2;
          const radius = 3 + Math.random() * 6;

          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;

          return Graves(x, z);
        })}
      </group>
      <Floor />
      <Doorlight />
      <Ghosts />
    </group>
  );
}
