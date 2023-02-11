import { useFrame, useLoader } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import {
  AdditiveBlending,
  MathUtils,
  Points,
  TextureLoader,
  Vector3,
} from "three";

const Heart = () => {
  const points = useRef<Points>(null);

  const [colorMap] = useLoader(TextureLoader, ["./textures/heart.png"]);

  const count = 250;
  const radius = 6;
  const particlesProperty = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // sphere
    for (let i = 0; i < count; i++) {
      const distance = Math.sqrt(Math.random() - 0.5) * radius;
      const theta = MathUtils.randFloatSpread(360);
      const phi = MathUtils.randFloatSpread(360);

      //   const x = distance * Math.sin(theta) * Math.cos(phi);
      //   const y = distance * Math.sin(theta) * Math.sin(phi);
      //   const z = distance * Math.cos(theta);

      // heart
      const t = phi;
      const x = 16 * Math.pow(Math.sin(t), 3) + Math.random() * 4;
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t) +
        Math.random() * 4;
      const z = Math.random() * 4;

      positions.set([x, y, z], i * 3);
      colors.set([Math.random(), Math.random(), Math.random()], i * 3);
    }

    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    const { clock } = state;
    points.current?.rotation.set(
      0,
      Math.sin(clock.getElapsedTime() * 0.2) / 9,
      0
    );

    (
      points.current?.geometry.attributes as unknown as any
    ).position.needsUpdate = true;
  });

  return (
    <>
      {/* <ambientLight intensity={1} color="white" /> */}
      <points ref={points} rotation={[Math.PI / 5, 0, Math.PI / 5]} scale={0.1}>
        <bufferGeometry>
          <bufferAttribute
            attach={"attributes-position"}
            count={particlesProperty.positions.length / 3}
            array={particlesProperty.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach={"attributes-color"}
            count={particlesProperty.colors.length / 3}
            array={particlesProperty.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          map={colorMap}
          transparent={true}
          size={0.4}
          depthTest={false}
          depthWrite={false}
          blending={AdditiveBlending}
          //   color={"white"}
          sizeAttenuation={true}
          vertexColors={true}
        />
      </points>
    </>
  );
};

export default Heart;
