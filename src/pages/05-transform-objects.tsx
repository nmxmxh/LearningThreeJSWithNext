import { Canvas } from '@react-three/fiber';
import Head from 'next/head';
import styled from 'styled-components';
import Cube from 'components/Cube/cube';

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

// Look for how to implement lookAt functionality with React & Three

export default function TransformObjects() {
  return (
    <S.Container>
      <Head>
        <title>05 - Transfrom Objects</title>
      </Head>

      <Canvas camera={{ position: [0, 1, 5], fov: 75 }}>
        <group position={[0, 0, 0]} scale={[1, 2, 1]}>
          <Cube position={[2, 1, 1]} color={'red'} />
          <Cube position={[0, 1, 1]} color={'blue'} />
          <Cube position={[-2, 1, 1]} color={'green'} />
        </group>
        <axesHelper args={[5]} />
      </Canvas>
    </S.Container>
  );
}
