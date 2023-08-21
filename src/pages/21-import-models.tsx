import { useSphere } from '@react-three/cannon';
import {
  Clone,
  OrbitControls,
  Plane,
  Sphere,
  useAnimations,
  useCubeTexture,
  useGLTF,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import _ from 'lodash';
import Head from 'next/head';
import { Ref, createRef, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  AmbientLight,
  DirectionalLight,
  Mesh,
  PCFSoftShadowMap,
  Clock,
  Group,
} from 'three';
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

function AmbLight() {
  const lightRef = useRef<AmbientLight>(null!);

  return (
    <ambientLight
      args={[0xffffff, 0.7]}
      position={[0, 2.2, 2.7]}
      ref={lightRef}
    />
  );
}

function Floor() {
  return (
    <Plane
      // position={[0, -2.5, 0]}
      rotation={[-Math.PI * 0.5, 0, 0]}
      receiveShadow
    >
      <planeBufferGeometry args={[10, 10]} />
      <meshStandardMaterial color={'#777777'} metalness={0.3} roughness={0.4} />
    </Plane>
  );
}

function Dirlight() {
  const lightRef = useRef<DirectionalLight>(null!);
  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.shadow.mapSize.width = 1024;
      lightRef.current.shadow.mapSize.height = 1024;
      lightRef.current.shadow.camera.far = 15;
      lightRef.current.shadow.camera.left = -7;
      lightRef.current.shadow.camera.right = 7;
      lightRef.current.shadow.camera.top = 7;
      lightRef.current.shadow.camera.bottom = -7;
    }
  });

  return (
    <directionalLight
      args={[0xffffff, 0.2]}
      position={[5, 5, 5]}
      ref={lightRef}
      castShadow
    />
  );
}

const ball = createRef<Mesh>();

function Duck() {
  const { scene, animations } = useGLTF('/models/Fox/glTF/Fox.gltf');
  const { ref, mixer, names, actions, clips } = useAnimations(animations);

  // animations.forEach((clip) => {
  //   const action = mixer.clipAction(clip);
  //   action.play();
  // });

  // useFrame((state, delta) => {
  //   mixer.update(delta)
  // })

  console.log('ANIMATIONS>>>>>>>>>>>>>>>', animations);
  useEffect(() => {
    actions?.Run?.play();
  });

  return (
    <group>
      <Clone
        ref={ref as Ref<Group> | undefined}
        scale={[0.01, 0.01, 0.01]}
        object={scene}
        castShadow
      />
    </group>
  );
}

export default function ImportModels() {
  const { _window } = useWindowAndDocument();
  const toggleFullscreen = useToggleFullscreen();

  return (
    <S.Container>
      <Head>
        <title>21 - Import Models</title>
      </Head>

      <Canvas
        camera={{ position: [2, 2, 2], fov: 75 }}
        dpr={Math.min(_window ? window.devicePixelRatio : 1, 2)}
        onDoubleClick={toggleFullscreen}
        shadows={{ type: PCFSoftShadowMap }}
      >
        <AmbLight />
        <Dirlight />
        <OrbitControls enableDamping />
        <Duck />
        <Floor />
      </Canvas>
    </S.Container>
  );
}
