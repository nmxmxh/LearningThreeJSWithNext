import { Box, OrbitControls, Sphere } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import _ from 'lodash';
import Head from 'next/head';
import { MutableRefObject, Ref, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Vector3, Raycaster, Mesh } from 'three';
import { useToggleFullscreen, useWindowAndDocument } from 'hooks';

// TODO: Find out how to implement raycaster with react.

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
  useFrame(() => {});
  const raycasterRef = useState<any>();
  const sphere1 = useState<Mesh>(null!);
  const sphere2 = useRef<Mesh>(null!);
  const sphere3 = useRef<Mesh>(null!);

  useEffect(() => {
    if (!raycasterRef) return;
    // console.log(raycasterRef.ray?.direction);
    // const intersect = raycasterRef?.intersectObject(sphere1);
    // console.log(intersect);
  }, []);

  return (
    <group>
      <Sphere position={[-2, 0, 0]}>
        <sphereBufferGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#ff0000" />
      </Sphere>
      <Sphere ref={sphere2}>
        <sphereBufferGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#ff0000" />
      </Sphere>
      <Sphere position={[2, 0, 0]} ref={sphere3}>
        <sphereBufferGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#ff0000" />
      </Sphere>
      <raycaster
      // ref={raycasterRef}
      // ray={[new Vector3(-3, 0, 0), new Vector3(10, 0, 0)]}
      ></raycaster>
    </group>
  );
}

export default function RaycasterEl() {
  const { _window } = useWindowAndDocument();
  const toggleFullscreen = useToggleFullscreen();

  return (
    <S.Container>
      <Head>
        <title>19 - Raycaster</title>
      </Head>

      <Canvas
        camera={{ position: [0, 0, 3], fov: 75 }}
        dpr={Math.min(_window ? window.devicePixelRatio : 1, 2)}
        onDoubleClick={toggleFullscreen}
      >
        <AnimatedComponent />
        <OrbitControls enableDamping />
      </Canvas>
    </S.Container>
  );
}
