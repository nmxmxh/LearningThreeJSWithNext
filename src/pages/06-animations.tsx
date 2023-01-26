import { Canvas, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import Head from 'next/head';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Clock, Mesh } from 'three';
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

function AnimatedComponent() {
  const cubeRef = useRef<Mesh>(null!);
  // let time = Date.now();

  const clock = new Clock();

  // SOLUTION 3. Using an external library. i.e (GSAP);
  useEffect(() => {
    gsap.to(cubeRef.current.position, { duration: 1, delay: 1, x: 2 });
  }, []);


  useFrame(state => {
    // SOLUTION 1. Delta Time
    // const currentTime = Date.now();
    // const deltaTime = currentTime - time;
    // time = currentTime;
    // cubeRef.current.rotation.y += 0.002 * deltaTime;

    // SOLUTION 2. Using Clock.
    const elapsedTime = clock.getElapsedTime();
    cubeRef.current.rotation.y = Math.sin(elapsedTime);
    state.camera.position.x = Math.sin(elapsedTime);
    state.camera.lookAt(cubeRef.current.position)
  });

  return (
    <group>
      <Cube ref={cubeRef} />
    </group>
  )
};

export default function TransformObjects() {


  return (
    <S.Container>
      <Head>
        <title>06 - Animations</title>
      </Head>

      <Canvas
        camera={{ position: [1, 1, 5], fov: 75 }}
      >
        <AnimatedComponent />
        <axesHelper args={[3]} />
      </Canvas>
    </S.Container>
  );
};