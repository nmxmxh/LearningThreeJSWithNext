import {
  Box,
  Center,
  OrbitControls,
  Text3D,
  Torus,
  useTexture,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import _ from 'lodash';
import Head from 'next/head';
import { useRef } from 'react';
import styled from 'styled-components';
import { Clock } from 'three';
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
  const fontPath = '/fonts/helvetiker_regular.typeface.json';
  const textRef = useRef(null!);
  const config = {
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  };
  const [mapcapTexture] = useTexture(['/textures/matcaps/8.png']);

  const clock = new Clock();

  useFrame(() => {});

  function Donut(
    torus: string | number | undefined,
    positionX: number,
    positionY: number,
    positionZ: number,
    rotationX: number,
    rotationY: number,
    scale: number,
  ) {
    return (
      <Torus
        key={torus}
        args={[0.3, 0.2, 20, 45]}
        position={[positionX, positionY, positionZ]}
        rotation={[rotationX, rotationY, 0]}
        scale={[scale, scale, scale]}
      >
        <meshMatcapMaterial matcap={mapcapTexture} />
      </Torus>
    );
  }

  return (
    <>
      <Center top>
        <Text3D ref={textRef} font={fontPath} {...config}>
          Momoh Nobert
          <meshMatcapMaterial matcap={mapcapTexture} />
        </Text3D>
      </Center>
      {_.times(300, (torus) => {
        const positionX = (Math.random() - 0.5) * 10;
        const positionY = (Math.random() - 0.5) * 10;
        const positionZ = (Math.random() - 0.5) * 10;

        const rotationX = Math.random() * Math.PI;
        const rotationY = Math.random() * Math.PI;

        const scale = Math.random();

        return Donut(
          torus,
          positionX,
          positionY,
          positionZ,
          rotationX,
          rotationY,
          scale,
        );
      })}
    </>
  );
}

export default function ThreeDText() {
  const { _window } = useWindowAndDocument();
  const toggleFullscreen = useToggleFullscreen();

  return (
    <S.Container>
      <Head>
        <title>13 - 3D Text</title>
      </Head>

      <Canvas
        camera={{ position: [1, 2, 5], fov: 75 }}
        dpr={Math.min(_window ? window.devicePixelRatio : 1, 2)}
        onDoubleClick={toggleFullscreen}
      >
        <group>
          <AnimatedComponent />
        </group>
        <axesHelper args={[5]} />
        <OrbitControls enableDamping />
      </Canvas>
    </S.Container>
  );
}
