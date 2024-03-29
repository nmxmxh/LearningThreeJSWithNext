import { OrbitControls, useTexture } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import Head from 'next/head';
import { useRef } from 'react';
import styled from 'styled-components';
import THREE, { Mesh } from 'three';
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
  const [
    colorTexture,
    alphaTexture,
    heightTexture,
    normalTexture,
    aOTexture,
    metalnessTexture,
    roughnessTexture,
  ] = useTexture([
    '/textures/door/color.jpg',
    '/textures/door/alpha.jpg',
    '/textures/door/height.jpg',
    '/textures/door/normal.jpg',
    '/textures/door/ambientOcclusion.jpg',
    '/textures/door/metalness.jpg',
    '/textures/door/roughness.jpg',
  ]);

  const cubeRef = useRef<Mesh>(null!);
  useFrame(() => {
    // colorTexture.center.x = 0.5;
    // colorTexture.rotation = Math.PI / 4;

    if (THREE) {
      // colorTexture.wrapS = THREE.MirroredRepeatWrapping;
      // colorTexture.minFilter = THREE.NearestFilter;
      colorTexture.magFilter = THREE.NearestFilter;
    }
  });

  return (
    <Cube
      ref={cubeRef}
      geometryArgs={{
        args: [1, 1, 1, 3, 3, 3],
      }}
      materialArgs={{
        // color: 'red',
        map: colorTexture,
        // normalMap: normalTexture,
        // alphaMap: alphaTexture,
        // aoMap: aOTexture,
        // heightMap: heightTexture,
        // metalnessMap: metalnessTexture,
        // roughnessMap: roughnessTexture,
      }}
    />
  );
}

export default function Textures() {
  const { _window } = useWindowAndDocument();
  const toggleFullscreen = useToggleFullscreen();

  return (
    <S.Container>
      <Head>
        <title>11 - Textures</title>
      </Head>

      <Canvas
        camera={{ position: [1, 1, 4], fov: 75 }}
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
