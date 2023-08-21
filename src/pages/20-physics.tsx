import { Physics, usePlane, useSphere } from '@react-three/cannon';
import {
  OrbitControls,
  Plane,
  Sphere,
  useCubeTexture,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import _ from 'lodash';
import Head from 'next/head';
import { createRef, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  AmbientLight,
  DirectionalLight,
  Mesh,
  PCFSoftShadowMap,
  Clock,
} from 'three';
import { useToggleFullscreen, useWindowAndDocument } from 'hooks';

// TODO: Find out how to implement raycaster with react.

const S = {
  Container: styled.div`
    width: 100%;
    height: 100vh;
    display: flex;

    canvas {
      background-color: black;
    }
  `,
};

function AmbLight() {
  const lightRef = useRef<AmbientLight>(null!);
  useFrame(() => {
    if (lightRef.current) {
      // lightRef.current.shadow.mapSize.width = 256;
      // lightRef.current.shadow.mapSize.height = 256;
      // lightRef.current.shadow.camera.far = 7;
    }
  });

  return (
    <ambientLight
      args={[0xffffff, 0.7]}
      position={[0, 2.2, 2.7]}
      ref={lightRef}
      castShadow
    />
  );
}
const floorRef = createRef<Mesh>();
function Floor() {
  const envTexture = useCubeTexture(
    ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
    { path: '/textures/environmentMaps/3/' },
  );
  const [ref] = usePlane(
    () => ({
      position: [0, 0, 0],
      rotation: [-Math.PI * 0.5, 0, 0],
      receiveShadow: true,
      mass: 0,
      material: 'concrete',
    }),
    floorRef,
  );
  return (
    <Plane
      ref={ref}
      // position={[0, -2.5, 0]}
      // rotation={[-Math.PI * 0.5, 0, 0]}
      // receiveShadow
    >
      <planeBufferGeometry args={[10, 10]} />
      <meshStandardMaterial
        color={'#777777'}
        metalness={0.3}
        roughness={0.4}
        envMap={envTexture}
      />
    </Plane>
  );
}

function Dirlight() {
  const lightRef = useRef<DirectionalLight>(null!);
  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.shadow.mapSize.width = 1024;
      lightRef.current.shadow.mapSize.height = 1024;
      lightRef.current.shadow.camera.far = 15;
      lightRef.current.shadow.camera.left = -7;
      lightRef.current.shadow.camera.right = 7;
      lightRef.current.shadow.camera.top = 7;
      lightRef.current.shadow.camera.bottom = -7;
    }
  });

  return (
    <directionalLight
      args={[0xffffff, 0.2]}
      position={[5, 5, 5]}
      ref={lightRef}
      castShadow
    />
  );
}

const ball = createRef<Mesh>();

function AnimatedComponent() {
  const envTexture = useCubeTexture(
    ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
    { path: '/textures/environmentMaps/3/' },
  );

  const clock = new Clock();
  let oldElapsedTime = useRef(0);

  const [ref, api] = useSphere(
    () => ({
      args: [0.5],
      mass: 0.1,
      position: [0, 5, 0],
      castShadow: true,
      material: 'plastic',
    }),
    ball,
  );

  // useFrame(() => {
  //   // const elapsedTime = clock.getElapsedTime();
  //   // const deltaTime = elapsedTime - oldElapsedTime.current;
  //   // oldElapsedTime.current = elapsedTime;
  //   // console.log(deltaTime);
  // });

  return (
    <group>
      <Sphere ref={ref} position={[0, 0.5, 0]} castShadow>
        <sphereBufferGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          metalness={0.3}
          roughness={0.4}
          envMap={envTexture}
        />
      </Sphere>
    </group>
  );
}

export default function PhysicsComponent() {
  const { _window } = useWindowAndDocument();
  const toggleFullscreen = useToggleFullscreen();

  return (
    <S.Container>
      <Head>
        <title>20 - Physics</title>
      </Head>

      <Canvas
        camera={{ position: [-3, 3, 3], fov: 75 }}
        dpr={Math.min(_window ? window.devicePixelRatio : 1, 2)}
        onDoubleClick={toggleFullscreen}
        shadows={{ type: PCFSoftShadowMap }}
      >
        <AmbLight />
        <Dirlight />
        <OrbitControls enableDamping />
        <Physics
          gravity={[0, -9.82, 0]}
          defaultContactMaterial={{
            friction: 0.1,
            restitution: 0.7,
            contactEquationStiffness: 1e7,
            contactEquationRelaxation: 1,
            frictionEquationStiffness: 1e7,
            frictionEquationRelaxation: 2,
          }}
        >
          <AnimatedComponent />
          <Floor />
        </Physics>
      </Canvas>
    </S.Container>
  );
}
