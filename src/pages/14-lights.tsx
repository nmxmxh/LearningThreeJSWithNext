import {
  Box,
  OrbitControls,
  Plane,
  Sphere,
  Torus,
  useHelper,
} from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import _ from 'lodash';
import Head from 'next/head';
import { useRef } from 'react';
import styled from 'styled-components';
import THREE, {
  CameraHelper,
  Clock,
  Mesh,
  RectAreaLight,
  SpotLight,
  SpotLightHelper,
  Vector3,
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

// TODO: Look into helpers

function AnimatedComponent() {
  const sphereRef = useRef<Mesh>(null!);
  const cubeRef = useRef<Mesh>(null!);
  const torusRef = useRef<Mesh>(null!);

  const clock = new Clock();

  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    sphereRef.current.rotation.y = 0.1 * elapsedTime;
    cubeRef.current.rotation.y = 0.1 * elapsedTime;
    torusRef.current.rotation.y = 0.1 * elapsedTime;

    sphereRef.current.rotation.x = 0.15 * elapsedTime;
    cubeRef.current.rotation.x = 0.15 * elapsedTime;
    torusRef.current.rotation.x = 0.15 * elapsedTime;
  });

  function Material() {
    return <meshStandardMaterial roughness={0.4} />;
  }

  return (
    <>
      <Torus ref={torusRef} args={[0.3, 0.2, 32, 64]} position={[1.5, 0, 0]}>
        <Material />
      </Torus>
      <Box ref={cubeRef} args={[0.75, 0.75, 0.75]}>
        <Material />
      </Box>
      <Plane
        args={[5, 5]}
        rotation={[-Math.PI * 0.5, 0, 0]}
        position={[0, -0.65, 0]}
      >
        <Material />
      </Plane>
      <Sphere args={[0.5, 32, 32]} position={[-1.5, 0, 0]} ref={sphereRef}>
        <Material />
      </Sphere>
    </>
  );
}

export default function Lights() {
  const { _window } = useWindowAndDocument();
  const toggleFullscreen = useToggleFullscreen();
  const cameraRef = useRef<SpotLight>(null!);

  return (
    <S.Container>
      <Head>
        <title>14 - Lights</title>
      </Head>

      <Canvas
        camera={{ position: [1, 1, 2], fov: 75 }}
        dpr={Math.min(_window ? window.devicePixelRatio : 1, 2)}
        onDoubleClick={toggleFullscreen}
      >
        <group>
          <AnimatedComponent />
        </group>
        <axesHelper args={[5]} />
        <ambientLight args={['white', 0.25]} />
        {/* <directionalLight args={['blue', 0.3]} position={[1, 0.25, 0]} /> */}
        {/* <hemisphereLight args={['blue', 'red', 3]} /> */}
        {/* <pointLight args={['white', 0.2, 1]} position={[1, -0.5, 1]} /> */}
        <rectAreaLight
          args={[0x4e00ff, 5, 1, 1]}
          position={[-1.5, 0, 0.5]}
          lookAt={() => [0, 0, 0]}
        />
        <spotLight
          args={[0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1]}
          position={[0, 2, 3]}
          ref={cameraRef}
        />
        <OrbitControls enableDamping />
      </Canvas>
    </S.Container>
  );
}
