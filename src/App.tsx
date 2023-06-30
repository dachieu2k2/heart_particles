import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  Loader,
  OrbitControls,
  PresentationControls,
  Stars,
} from "@react-three/drei";
import BoxParticles from "./Components/BoxParticles";
import HeartParticles from "./Components/heartParticles";
import Heart from "./Components/heartParticles/heart";
import { Vector3 } from "three";
import { useSpring, a, config } from "@react-spring/three";
import click from "../src/click.mp3";
import cute from "../src/cute.mp3";
import React from "react";

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
    position: [0, 0, 40],
    positionLaptop: [0, 0, 40],
    target: [0, 0, 40],
    config: config.default,
    overlay: <div className="text">It’s my happiness to see your smile...</div>,
  },
  {
    position: [0, 0, 30],
    positionLaptop: [0, 0, 30],
    target: [0, 0, 30],
    config: config.default,
    overlay: (
      <div className="text">Wish my love a happy Valentine’s Day...</div>
    ),
  },
  {
    position: [0, 0, 20],
    positionLaptop: [0, 0, 20],
    target: [0, 0, 20],
    config: config.default,
    overlay: (
      <div className="text">and always have a smile on your lips...</div>
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
  const audio = new Audio(click);
  const cuteMusic = new Audio(cute);
  cuteMusic.loop = true;
  // console.log(audio);
  // console.log("adsasd");
  const [props, api] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
    }),
    []
  );

  return (
    <>
      {
        <div className="container">
          {/* <animated.div>
            <animated.span>a</animated.span>
          </animated.div> */}
          {/* <a.div style={props}>Hello World</a.div> */}
          {cameraPositionSetting[index].overlay}
          {index < cameraPositionSetting.length - 1 && (
            <div
              className="button"
              onClick={() => {
                audio.play();

                if (index === cameraPositionSetting.length - 2) {
                  cuteMusic.play();
                }
                setIndex(index + 1);
              }}
            >
              Continue...
            </div>
          )}
        </div>
      }
      <Canvas
        // camera={{ fov: 45, position: [0, 0, -20] }}
        gl={{ antialias: false }}
      >
        <React.Suspense fallback={null}>
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
              <mesh position={[0, 0, 20]} scale={1}>
                <boxGeometry args={[3, 3, 3]} />
                <meshPhysicalMaterial color="hotpink" />
              </mesh>
            )}
            {index === 1 && (
              <mesh position={[0, 0, 15]} scale={0.3}>
                <coneGeometry args={[5, 10]} />
                <meshPhysicalMaterial color="#03C988" />
              </mesh>
            )}
            {index === 2 && (
              <mesh position={[0, 0, 10]}>
                <sphereGeometry args={[1, 20]} />
                <meshPhysicalMaterial color="#3C84AB" />
              </mesh>
            )}

            {index === 3 && (
              <mesh position={[0, 0, 5]} scale={0.1}>
                <torusGeometry args={[5, 2]} />
                <meshPhysicalMaterial color="#C3ACD0" />
              </mesh>
            )}
          </Float>
          {index === cameraPositionSetting.length - 1 && (
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
          <PresentationControls
            global
            zoom={0.3}
            rotation={[0, 0, 0]}
            polar={[0, 0]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          ></PresentationControls>
          <OrbitControls
            // minAzimuthAngle={-Math.PI / 4}
            // maxAzimuthAngle={Math.PI / 4}
            // minPolarAngle={Math.PI / 6}
            // maxPolarAngle={Math.PI - Math.PI / 6}
            enableZoom={false}
            // autoRotate
          />
          {/* <axesHelper /> */}
        </React.Suspense>
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
