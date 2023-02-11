import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, OrbitControls, Stars } from "@react-three/drei";
import BoxParticles from "./Components/BoxParticles";
import HeartParticles from "./Components/heartParticles";
import Heart from "./Components/heartParticles/heart";
import { Vector3 } from "three";
import { useSpring, a, config, easings } from "@react-spring/three";

const t = new Vector3();

const defaultPosition = {
  position: [0, 0, 0],
  target: [0, 0, 0],
};

const closeBy = {
  position: [2, 2, 2],
  target: [0, 0, 0],
};

const farAway = {
  position: [2, 5, 5],
  target: [0, 0, 0],
};

const cameraPositionSetting = [
  {
    position: [0, 0, 20],
    positionLaptop: [0, 0, 20],
    target: [0, 0, 20],
    config: config.default,
    overlay: (
      <div className="text">Best wishes to the other half of my life...</div>
    ),
  },
  {
    position: [0, 0, 10],
    positionLaptop: [0, 0, 10],
    target: [0, 0, 10],
    config: config.wobbly,
    overlay: <div className="text">and this page is for you!</div>,
  },
  {
    position: [2, 5, 5],
    positionLaptop: [3, 4, 4],
    target: [0, 0, 0],
    overlay: <></>,
    config: {
      tension: 300,
      friction: 200,
    },
  },
];

const CameraWrapper: React.FC<{
  cameraPosition: [x: number, y: number, z: number];
  target: [x: number, y: number, z: number];
}> = ({ cameraPosition, target }) => {
  const { camera } = useThree();
  camera.position.set(...cameraPosition);
  camera.lookAt(t.set(...target));
  return null;
};

const AnimationCamera: React.FC<{ index: number }> = ({ index }) => {
  const [cameraSettings, setCameraSetting] = useState(
    cameraPositionSetting[index]
  );
  const { camera, size } = useThree();

  useEffect(() => {
    setCameraSetting(cameraPositionSetting[index]);
  }, [index]);

  const s = useSpring({
    from: cameraSettings,
    config: cameraSettings.config,
  });
  s.position.start({
    from: camera.position.toArray(),
    to:
      size.width >= 640
        ? cameraSettings.positionLaptop
        : cameraSettings.position,
  });
  s.target.start({ from: s.target, to: cameraSettings.target });
  const AnimatedNavigation = a(CameraWrapper);

  return (
    <>
      <AnimatedNavigation
        cameraPosition={s.position as any}
        target={s.target as any}
      />
    </>
  );
};

function App() {
  const [index, setIndex] = useState(0);

  return (
    <>
      {
        <div className="container">
          {cameraPositionSetting[index].overlay}
          {index < 2 && (
            <div className="button" onClick={() => setIndex(index + 1)}>
              Continue...
            </div>
          )}
        </div>
      }
      <Canvas
        // camera={{ fov: 45, position: [0, 0, -20] }}
        gl={{ antialias: false }}
      >
        <AnimationCamera index={index} />
        {/* <Plane /> */}
        {/* <Blob /> */}
        {/* <BoxParticles /> */}
        <Environment preset="sunset" />
        <Float
          position={[0, 0, 0]}
          speed={2}
          // rotationIntensity={2}
          floatIntensity={2}
        >
          {index === 0 && (
            <mesh position={[0, 0, 10]}>
              <sphereGeometry args={[1, 20]} />
              <meshPhysicalMaterial color="white" />
            </mesh>
          )}

          {index === 1 && (
            <mesh position={[0, 0, 5]} scale={0.1}>
              <torusGeometry args={[5, 2]} />
              <meshPhysicalMaterial color="white" />
            </mesh>
          )}
        </Float>
        {index === 2 && (
          <>
            <Heart />
            <HeartParticles />
          </>
        )}
        (
        <Stars
          radius={500}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        )
        <OrbitControls
        // enableZoom={false}
        // autoRotate
        />
        {/* <axesHelper /> */}
      </Canvas>
    </>
  );
}

export default App;
