import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import BoxParticles from "./Components/BoxParticles";
import HeartParticles from "./Components/heartParticles";
import Heart from "./Components/heartParticles/heart";

function App() {
  return (
    <Canvas camera={{ fov: 45, position: [0, 0, 0] }}>
      {/* <Plane /> */}
      {/* <Blob /> */}
      {/* <BoxParticles /> */}
      <Heart />
      <HeartParticles />
      <Stars
        radius={500}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <OrbitControls
      // enableZoom={false}
      // autoRotate
      />
      {/* <axesHelper /> */}
    </Canvas>
  );
}

export default App;
