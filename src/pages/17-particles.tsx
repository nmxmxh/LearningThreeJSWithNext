import { Box, OrbitControls, useTexture } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import _ from 'lodash';
import Head from 'next/head';
import { useRef } from 'react';
import styled from 'styled-components';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Clock,
  Mesh,
  Points,
} from 'three';
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

function AnimatedComponent() {
  const geometryRef = useRef<BufferGeometry>(null!);
  const particlesRef = useRef<Points>(null!);
  const particleTexture = useTexture('textures/particles/1.png');

  const count = 20000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  _.times(count * 3, (currentCount) => {
    positions[currentCount] = (Math.random() - 0.5) * 12;
    colors[currentCount] = Math.random();
  });

  const clock = new Clock();

  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();
    geometryRef.current.setAttribute('color', new BufferAttribute(colors, 3));

    // particlesRef.current.rotation.y = -elapsedTime * 0.02;

    _.times(count, (currentCount) => {
      const countBy3 = currentCount * 3;
      let positionX = countBy3;
      let positionY = countBy3 + 1;

      // TODO: look into set attributes alternative
      geometryRef.current.attributes.position.array[positionY] = Math.sin(
        elapsedTime + geometryRef.current.attributes.position.array[positionX],
      );
    });

    geometryRef.current.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry attach="geometry" ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        alphaMap={particleTexture}
        vertexColors
        // alphaTest={0.001}
        // depthTest={false}
        depthWrite={false}
        blending={AdditiveBlending}
        transparent
      />
    </points>
  );
}
export default function Particles() {
  const { _window } = useWindowAndDocument();
  const toggleFullscreen = useToggleFullscreen();

  return (
    <S.Container>
      <Head>
        <title>17 - Particles</title>
      </Head>

      <Canvas
        camera={{ position: [4, 2, 5], fov: 75 }}
        dpr={Math.min(_window ? window.devicePixelRatio : 1, 2)}
        onDoubleClick={toggleFullscreen}
      >
        <AnimatedComponent />
        <OrbitControls enableDamping />
      </Canvas>
    </S.Container>
  );
}
