import { Box, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import _ from 'lodash';
import Head from 'next/head';
import { useRef } from 'react';
import styled from 'styled-components';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
} from 'three';
import { useToggleFullscreen, useWindowAndDocument } from 'hooks';

// TODO: Find out how to work with distribution of particles.

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

const parameters = {
  count: 100000,
  size: 0.01,
  radius: 5,
  branches: 3,
  spin: 1,
  randomness: 0.2,
  randomnessPower: 3,
  innerColor: '#ff6030',
  outsideColor: '#1b3984',
};

function GenerateGalaxy() {
  const particlesRef = useRef<BufferGeometry>(null!);

  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);

  const colorInside = new Color(parameters.innerColor);
  const colorOutside = new Color(parameters.outsideColor);

  _.times(parameters.count, (i) => {
    const countBy3 = i * 3;
    const positionX = countBy3;
    const positionY = countBy3 + 1;
    const positionZ = countBy3 + 2;

    const radius = Math.random() * parameters.radius;
    const spinAngle = radius * parameters.spin;
    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;

    positions[positionX] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[positionY] = randomY;
    positions[positionZ] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    // Color
    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, radius / parameters.radius);

    colors[positionX] = mixedColor.r;
    colors[positionY] = mixedColor.g;
    colors[positionZ] = mixedColor.b;
  });

  useFrame(() => {
    particlesRef.current.setAttribute('color', new BufferAttribute(colors, 3));
  });

  return (
    <points>
      <bufferGeometry attach="geometry" ref={particlesRef}>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={parameters.count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={parameters.size}
        vertexColors
        depthWrite={false}
        blending={AdditiveBlending}
        sizeAttenuation
        transparent
      />
    </points>
  );
}

function AnimatedComponent() {
  useFrame(() => {});

  return <GenerateGalaxy />;
}
export default function GalaxyGenerator() {
  const { _window } = useWindowAndDocument();
  const toggleFullscreen = useToggleFullscreen();

  return (
    <S.Container>
      <Head>
        <title>18 - Galaxy Generator</title>
      </Head>

      <Canvas
        camera={{ position: [3, 3, 3], fov: 75 }}
        dpr={Math.min(_window ? window.devicePixelRatio : 1, 2)}
        onDoubleClick={toggleFullscreen}
      >
        <AnimatedComponent />
        <OrbitControls enableDamping />
      </Canvas>
    </S.Container>
  );
}
