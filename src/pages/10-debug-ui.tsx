import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import Head from 'next/head';
import { useRef } from 'react';
import DatGui, { DatBoolean, DatNumber } from 'react-dat-gui';
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
    <>    <Cube
      ref={cubeRef}
      geometryArgs={{
        args: [1, 1, 1, 3, 3, 3]
      }}
      materialArgs={{
        color: "red",
        wireframe: true,
      }}
    />
      <DatGui

        onUpdate={() => console.log("updating")}
        data={{
          string: "Preset B",
          minMaxNumber: 12,
          number: 68,
          boolean: true,
          select: "three",
          color: "#2FD654",
          random: Math.random(),
        }} >
        <DatNumber path="number" label="Number" min={0}
          max={100}
          step={1} />
        <DatBoolean path="boolean" label="Boolean" />
      </DatGui>
    </>

  )
};



export default function DebugUI() {
  const { _window } = useWindowAndDocument();
  const toggleFullscreen = useToggleFullscreen();

  return (
    <S.Container>
      <Head>
        <title>10 - Debug UI</title>
      </Head>

      <Canvas
        camera={{ position: [1, 1, 4], fov: 75 }}
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