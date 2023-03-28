import {
  OrbitControls,
  useTexture,
  Plane as PlaneDrei,
  Sphere as SphereDrei,
  Torus as TorusDrei,
  useCubeTexture,
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import Head from 'next/head';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import THREE, { BufferAttribute, Clock, Mesh, NearestFilter } from 'three';
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
    mapcapTexture,
    gradientTexture,
  ] = useTexture([
    '/textures/door/color.jpg',
    '/textures/door/alpha.jpg',
    '/textures/door/height.jpg',
    '/textures/door/normal.jpg',
    '/textures/door/ambientOcclusion.jpg',
    '/textures/door/metalness.jpg',
    '/textures/door/roughness.jpg',
    '/textures/matcaps/6.png',
    '/textures/gradients/5.jpg',
  ]);

  const cubeTexture = useCubeTexture(
    ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
    { path: '/textures/environmentMaps/3/' },
  );

  const clock = new Clock();

  const torusRef = useRef<Mesh>(null!);
  const sphereRef = useRef<Mesh>(null!);
  const planeRef = useRef<Mesh>(null!);

  gradientTexture.minFilter = NearestFilter;
  gradientTexture.magFilter = NearestFilter;
  gradientTexture.generateMipmaps = false;

  useFrame(() => {
    const elapsedTime = clock.getElapsedTime();

    sphereRef.current.position.x = -1.5;
    torusRef.current.position.x = 1.5;

    // adjusting uv co-ordinates
    planeRef.current.geometry.setAttribute(
      'uv2',
      new BufferAttribute(planeRef.current.geometry.attributes.uv.array, 2),
    );

    sphereRef.current.geometry.setAttribute(
      'uv2',
      new BufferAttribute(sphereRef.current.geometry.attributes.uv.array, 2),
    );

    torusRef.current.geometry.setAttribute(
      'uv2',
      new BufferAttribute(torusRef.current.geometry.attributes.uv.array, 2),
    );

    // animate objects.
    sphereRef.current.rotation.y = 0.5 * elapsedTime;
    // planeRef.current.rotation.y = -0.5 * elapsedTime;
    torusRef.current.rotation.y = 0.5 * elapsedTime;

    sphereRef.current.rotation.x = 0.5 * elapsedTime;
    // planeRef.current.rotation.x = -0.5 * elapsedTime;
    torusRef.current.rotation.x = 0.5 * elapsedTime;

    if (THREE) {
    }
  });

  function Material() {
    return (
      <meshStandardMaterial
        // map={colorTexture}
        // normalMap={normalTexture}
        // aoMap={aOTexture}
        // displacementMap={heightTexture}
        // displacementScale={0.05}
        // metalnessMap={metalnessTexture}
        // roughnessMap={roughnessTexture}
        // transparent
        // alphaMap={alphaTexture}
        envMap={cubeTexture}
        roughness={0.1}
        metalness={0.9}
      />
    );
  }

  return (
    <>
      <PlaneDrei ref={planeRef} args={[1, 1]}>
        <Material />
      </PlaneDrei>
      <SphereDrei ref={sphereRef} args={[0.5, 16, 16]}>
        {/* <meshNormalMaterial flatShading /> */}
        {/* <meshMatcapMaterial matcap={mapcapTexture} /> */}
        {/* <meshDepthMaterial /> */}
        {/* <meshPhongMaterial shininess={100} specular={'red'} /> */}
        {/* <meshToonMaterial /> */}
        <Material />
      </SphereDrei>
      <TorusDrei ref={torusRef} args={[0.3, 0.2, 64, 128]}>
        {/* <meshNormalMaterial flatShading /> */}
        {/* <meshMatcapMaterial matcap={mapcapTexture} /> */}
        {/* <meshDepthMaterial /> */}
        {/* <meshPhongMaterial shininess={100} specular={'red'} /> */}
        {/* <meshToonMaterial gradientMap={gradientTexture} /> */}
        <Material />
      </TorusDrei>
    </>
  );
}

export default function Materials() {
  const { _window } = useWindowAndDocument();
  const toggleFullscreen = useToggleFullscreen();

  const [guiState, setGuiState] = useState({
    power: 9000,
  });

  return (
    <S.Container>
      <Head>
        <title>12 - Materials</title>
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
        <ambientLight args={['white', 0.5]} />
        <pointLight args={['white', 0.5]} position={[2, 3, 4]} />
        <OrbitControls enableDamping />
      </Canvas>
    </S.Container>
  );
}
