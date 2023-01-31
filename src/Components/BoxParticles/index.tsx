import React, { useMemo, useRef } from "react";
import { fragmentShader } from "./fragmentShader";
import { vertexShader } from "./vertexShader";
import { useFrame, useLoader } from "@react-three/fiber";
import {
  MathUtils,
  Mesh,
  Points,
  ShaderMaterial,
  BufferAttribute,
  AdditiveBlending,
  TextureLoader,
} from "three";

const BoxParticles = () => {
  const mesh = useRef<Mesh>(null);
  const points = useRef<Points>(null);

  const count = 6000;
  const radius = 2;
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    // // box
    // for (let i = 0; i < count; i++) {
    //   const x = (Math.random() - 0.5) * 2;
    //   const y = (Math.random() - 0.5) * 2;
    //   const z = (Math.random() - 0.5) * 2;

    //   positions.set([x, y, z], i * 3);
    // }

    // sphere
    for (let i = 0; i < count; i++) {
      const distance = Math.sqrt(Math.random() - 0.5) * radius;
      const theta = MathUtils.randFloatSpread(360);
      const phi = MathUtils.randFloatSpread(360);

      const x = distance * Math.sin(theta) * Math.cos(phi);
      const y = distance * Math.sin(theta) * Math.sin(phi);
      const z = distance * Math.cos(theta);
      positions.set([x, y, z], i * 3);
    }

    return positions;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0,
      },
      uRadius: { value: radius },
    }),
    []
  );
  // console.log(uniforms.uTexture);

  useFrame((state) => {
    const { clock } = state;
    (points.current?.material as ShaderMaterial).uniforms.uTime.value =
      clock.getElapsedTime();
  });

  // useFrame(({ clock }) => {
  //   (mesh.current?.material as ShaderMaterial).uniforms.uTime.value =
  //     clock.getElapsedTime();
  // });

  return (
    <>
      {/*  <mesh ref={mesh} position={[0, 0, 0]}>
       <boxGeometry args={[1, 1, 1, 10, 10, 10]} />
       <shaderMaterial
         uniforms={uniforms}
         vertexShader={vertexShader}
         fragmentShader={fragmentShader}
       />

     </mesh> */}
      {/* <points ref={points}>
        <sphereGeometry args={[1, 48, 48]} />
        <pointsMaterial color="#5786F5" size={0.015} sizeAttenuation />
      </points> */}
      {/* <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach={"attributes-position"}
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#5786F5" size={0.015} sizeAttenuation />
      </points> */}
      <ambientLight intensity={1} color="white" />
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach={"attributes-position"}
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
          blending={AdditiveBlending}
          depthWrite={false}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
        />
        {/* <meshStandardMaterial color="white" /> */}
      </points>
    </>
  );
};

export default BoxParticles;
