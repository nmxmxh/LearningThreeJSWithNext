import { Canvas } from '@react-three/fiber';
import Head from 'next/head';
import styled from 'styled-components';

const S = {
  Container: styled.div`
    width: 100%;
    height: 100vh;
    display: flex;

    canvas {
      height: 100%;
      width: 100%;
    }
  `,
};

export default function Home() {
  return (
    <S.Container>
      <Head>
        <title>03 - Basic Scene</title>
      </Head>

      <Canvas
        camera={{ position: [2, 0, 12.25], fov: 15 }}
      >
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color='red' />
        </mesh>

      </Canvas>
    </S.Container>
  );
}
