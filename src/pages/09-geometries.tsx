import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import Head from 'next/head';
import { useRef } from 'react';
import styled from 'styled-components';
import { Mesh } from 'three';
import { Cube } from 'components';
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
  const cubeRef = useRef<Mesh>(null!);
  useFrame(state => {

  });

  return (
    <Cube ref={cubeRef} geometryArgs={[1, 1, 1, 5, 5, 5]} color={"red"} />
  )
};



export default function Geometries() {
  const { _window } = useWindowAndDocument();
  const toggleFullscreen = useToggleFullscreen();

  return (
    <S.Container>
      <Head>
        <title>09 - Geometries</title>
      </Head>

      <Canvas
        camera={{ position: [0, 0, 4], fov: 75 }}
        dpr={Math.min((_window ? window.devicePixelRatio : 1), 2)}
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