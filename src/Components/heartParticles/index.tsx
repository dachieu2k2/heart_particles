import { useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AdditiveBlending,
  MathUtils,
  Mesh,
  Points,
  TextureLoader,
  Vector3,
} from "three";
import Heart from "./heart";

const HeartParticles = () => {
  const [clicked, setClicked] = useState<boolean>(false);

  const points = useRef<Points>(null);

  const [colorMap] = useLoader(TextureLoader, ["./textures/heart.png"]);

  const count = 30000;
  const radius = 8;
  const particlesProperty = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scale = new Float32Array(count * 3);

    // sphere
    for (let i = 0; i < count; i++) {
      const distance = Math.sqrt(Math.random() - 0.5) * radius;
      const theta = MathUtils.randFloatSpread(360);
      const phi = MathUtils.randFloatSpread(360);

      const x = distance * Math.sin(theta) * Math.cos(phi);
      const y = distance * Math.sin(theta) * Math.sin(phi);
      const z = distance * Math.cos(theta);

      // heart
      // const t = phi;
      // const x = 16 * Math.pow(Math.sin(t), 3) + Math.random() * 3;
      // const y =
      //   13 * Math.cos(t) -
      //   5 * Math.cos(2 * t) -
      //   2 * Math.cos(3 * t) -
      //   Math.cos(4 * t) +
      //   Math.random() * 3;
      // const z = Math.random() * 3;

      positions.set([x, y, z], i * 3);
      colors.set([Math.random(), Math.random(), Math.random()], i * 3);
      scale.set([Math.random(), Math.random(), Math.random()], i * 3);
    }

    return { positions, colors, scale };
  }, [count]);

  useFrame((state) => {
    const { clock } = state;
    //   (points.current?.material as ShaderMaterial).uniforms.uTime.value =
    //     clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // (points.current?.geometry.attributes.position.array as number[])[
      //   i3 + 0
      // ] += Math.sin(clock.elapsedTime) * Math.random() * 0.001;
      // (points.current?.geometry.attributes.position.array as number[])[
      //   i3 + 1
      // ] += Math.sin(clock.elapsedTime) * Math.random() * 0.001;
      (points.current?.geometry.attributes.position.array as number[])[
        i3 + 1
      ] += Math.sin(clock.elapsedTime) * Math.random() * 0.001;
      (points.current?.geometry.attributes.position.array as number[])[
        i3 + 2
      ] += Math.cos(clock.elapsedTime) * Math.random() * 0.001;
    }

    (
      points.current?.geometry.attributes as unknown as any
    ).position.needsUpdate = true;
  });

  useFrame(({ camera, mouse, size }) => {
    // console.log(size);

    if (points.current) {
      camera.lookAt(points.current.position);
      camera.position.lerp(
        new Vector3(0.5, 0.5, size.width >= 640 ? 6.5 : 11),
        0.003
      );
      camera.updateProjectionMatrix();
    } else {
    }
    camera.position.lerp(
      new Vector3(mouse.x * 1.5, mouse.y * 1.5, camera.position.z),
      0.02
    );
  });

  // useEffect(() => {
  //   console.log(points.current);
  // });

  return (
    <>
      {/* <ambientLight intensity={1} color="white" /> */}
      <points
        ref={points}
        onClick={() => setClicked(!clicked)}
        rotation={[0, -Math.PI / 3, 0]}
        // scale={0.2}
      >
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
          <bufferAttribute
            attach={"attributes-scale"}
            count={particlesProperty.scale.length / 3}
            array={particlesProperty.scale}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          map={colorMap}
          transparent={true}
          size={0.12}
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

export default HeartParticles;
