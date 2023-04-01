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
  SpotLight as SL,
  PointLight as PL,
} from 'three';
import { House } from 'components/House/house';
import { useToggleFullscreen, useWindowAndDocument } from 'hooks';

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

function DirectionalLight() {
  const lightRef = useRef<DL>(null!);
  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.shadow.mapSize.width = 1024;
      lightRef.current.shadow.mapSize.height = 1024;
    }
  });

  return (
    <directionalLight
      args={['#b9d5ff', 0.12]}
      position={[4, 5, -2]}
      ref={lightRef}
    />
  );
}

export default function HauntedHouse() {
  const { _window } = useWindowAndDocument();
  const toggleFullscreen = useToggleFullscreen();

  return (
    <S.Container>
      <Head>
        <title>16 - Haunted House</title>
      </Head>

      <Canvas
        camera={{ position: [4, 2, 5], fov: 75 }}
        dpr={Math.min(_window ? window.devicePixelRatio : 1, 2)}
        onDoubleClick={toggleFullscreen}
      >
        <group>
          <House />
        </group>
        <axesHelper args={[5]} />

        <ambientLight args={['#b9d5ff', 0.12]} />
        <fog attach="fog" color="#262837" near={1} far={15} />
        <pointLight />
        <DirectionalLight />
        <OrbitControls enableDamping />
        <color attach="background" args={['#262837']} />
      </Canvas>
    </S.Container>
  );
}
