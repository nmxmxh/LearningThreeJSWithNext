import { OrbitControls, Plane, Sphere, useTexture } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import _ from 'lodash';
import Head from 'next/head';
import { useRef } from 'react';
import styled from 'styled-components';
import {
  Clock,
  DirectionalLight as DL,
  Mesh,
  PCFSoftShadowMap,
  SpotLight as SL,
  PointLight as PL,
} from 'three';
import { useToggleFullscreen, useWindowAndDocument } from 'hooks';

const S = {
  Container: styled.div`
    width: 100%;
    height: 100vh;
    display: flex;

    canvas {
      height: 800px;
      width: 600px;
      border: 1px solid black;
      background-color: black;
    }
  `,
};

function AnimatedComponent() {
  const sphereRef = useRef<Mesh>(null!);
  const shadowRef = useRef<Mesh>(null!);
  const planeRef = useRef<Mesh>(null!);

  const shadowTexture = useTexture('/textures/simpleShadow.jpg');

  const clock = new Clock();

  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();

    // set shadow position.
    shadowRef.current.position.y = planeRef.current.position.y + 0.01;

    // Update objects
    sphereRef.current.position.x = Math.cos(elapsedTime) * 1.5;
    sphereRef.current.position.z = Math.sin(elapsedTime) * 1.5;
    sphereRef.current.position.y = Math.abs(Math.sin(elapsedTime * 3) * 0.5);

    // Update the shadow.
    shadowRef.current.position.x = sphereRef.current.position.x;
    shadowRef.current.position.z = sphereRef.current.position.z;

    // Shadow opacity based on position
    (shadowRef.current.material as any).opacity =
      1 - sphereRef.current.position.y;
  });

  function Material() {
    return <meshStandardMaterial roughness={0.7} />;
  }

  return (
    <>
      <Plane
        args={[5, 5]}
        rotation={[-Math.PI * 0.5, 0, 0]}
        position={[0, -0.65, 0]}
        // receiveShadow
        ref={planeRef}
      >
        <Material />
      </Plane>
      <Plane rotation={[-Math.PI * 0.5, 0, 0]} ref={shadowRef}>
        <planeBufferGeometry args={[1.5, 1.5]} />
        <meshBasicMaterial color="black" transparent alphaMap={shadowTexture} />
      </Plane>
      <Sphere
        args={[0.5, 32, 32]}
        ref={sphereRef}
        // castShadow
      >
        <Material />
      </Sphere>
    </>
  );
}

function DirectionalLight() {
  const lightRef = useRef<DL>(null!);
  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.shadow.mapSize.width = 1024;
      lightRef.current.shadow.mapSize.height = 1024;

      lightRef.current.shadow.camera.top = 2;
      lightRef.current.shadow.camera.bottom = -2;
      lightRef.current.shadow.camera.left = -2;
      lightRef.current.shadow.camera.right = 2;

      lightRef.current.shadow.camera.near = 1;
      lightRef.current.shadow.camera.far = 6;
      lightRef.current.shadow.radius = 15;
    }
  });

  return (
    <directionalLight
      args={['white', 0.1]}
      position={[2, 2, 0.1]}
      // castShadow
      ref={lightRef}
    />
  );
}

function Spotlight() {
  const lightRef = useRef<SL>(null!);
  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.shadow.mapSize.width = 1024;
      lightRef.current.shadow.mapSize.height = 1024;

      lightRef.current.shadow.camera.fov = 30;

      lightRef.current.shadow.camera.near = 1;
      lightRef.current.shadow.camera.far = 6;
      lightRef.current.shadow.radius = 15;
    }
  });

  return (
    <spotLight
      args={['white', 0.1, 10, Math.PI * 0.3]}
      position={[0, 2, 2]}
      // castShadow
      ref={lightRef}
    />
  );
}

function Pointlight() {
  const lightRef = useRef<PL>(null!);
  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.shadow.mapSize.width = 1024;
      lightRef.current.shadow.mapSize.height = 1024;
      lightRef.current.shadow.camera.near = 0.1;
      lightRef.current.shadow.camera.far = 5;
    }
  });

  return (
    <pointLight
      args={['white', 0.6]}
      position={[-1, 1, 0]}
      castShadow
      ref={lightRef}
    />
  );
}

export default function Shadows() {
  const { _window } = useWindowAndDocument();
  const toggleFullscreen = useToggleFullscreen();
  const groupRef = useRef<any>(null!);

  return (
    <S.Container>
      <Head>
        <title>15 - Shadows</title>
      </Head>

      <Canvas
        camera={{ position: [1, 1, 2], fov: 75 }}
        dpr={Math.min(_window ? window.devicePixelRatio : 1, 2)}
        onDoubleClick={toggleFullscreen}
        // shadows={{ type: PCFSoftShadowMap }}
      >
        <group ref={groupRef}>
          <AnimatedComponent />
        </group>
        <axesHelper args={[5]} />

        <DirectionalLight />
        <Spotlight />
        <Pointlight />
        {/* <ambientLight args={['white', 0.3]} /> */}

        <OrbitControls enableDamping />
      </Canvas>
    </S.Container>
  );
}
