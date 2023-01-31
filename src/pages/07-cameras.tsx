import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import Head from 'next/head';
import { useRef } from 'react';
import styled from 'styled-components';
import { Mesh } from 'three';
import { Cube } from 'components';
import { useMousePosition, useWindowDimensions } from 'hooks';

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
  // const clock = new Clock();
  const { x, y } = useMousePosition();
  const { height, width } = useWindowDimensions();

  const cordX = (x ?? 0) / width - 0.5;
  const cordY = (y ?? 0) / height - 0.5;

  useFrame(state => {
    // const elapsedTime = clock.getElapsedTime();
    // cubeRef.current.rotation.y = elapsedTime;
    // console.log(cordX, cordY)

    // state.camera.position.x = Math.sin(cordX * Math.PI * 2) * 3;
    // state.camera.position.z = Math.cos(cordX * Math.PI * 2) * 3;
    // state.camera.position.y = cordY * 5;

    // lookAt AFTER setting position
    // state.camera.lookAt(cubeRef.current.position);
    // switching camera controls to orbit controls
  });

  return (
    <Cube ref={cubeRef} geometryArgs={{ args: [1, 1, 1, 5, 5, 5] }} materialArgs={{ color: "red" }} />
  )
};



export default function Cameras() {
  return (
    <S.Container>
      <Head>
        <title>07 - Cameras</title>
      </Head>

      <Canvas
        camera={{ position: [0, 0, 4], fov: 75 }}>
        <group>
          <AnimatedComponent />
        </group>
        <axesHelper args={[5]} />
        {/* Example of Orthographic Camera */}
        {/* <OrthographicCamera
          makeDefault
          top={2}
          bottom={-2}
          left={-2}
          right={2}
          near={0.1}
          far={100}
          position={[1, 1, 1]}
        /> */}
        <OrbitControls target={[0, 2, 0]} enableDamping />
      </Canvas>
    </S.Container>
  );
}