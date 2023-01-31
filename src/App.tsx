import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import BoxParticles from "./Components/BoxParticles";
import HeartParticles from "./Components/heartParticles";
import Heart from "./Components/heartParticles/heart";

function App() {
  const [active, setActive] = useState(false);
  return (
    <>
      {!active && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            zIndex: 2,
            transform: "translate(-50%,-50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            fontSize: "2rem",
            fontFamily: "fantasy",
          }}
        >
          <div
            style={{
              color: "white",
              textAlign: "justify",
            }}
          >
            Best wishes to the other half of my life... and this page is for
            you!
          </div>
          <div
            style={{
              fontSize: "1rem",
              borderRadius: "10px",
              cursor: "pointer",
              background: "white",
              padding: "10px 20px",
              marginTop: "10px",
            }}
            onClick={() => setActive(!active)}
          >
            Continue...
          </div>
        </div>
      )}
      <Canvas
        camera={{ fov: 45, position: [0, 0, 0] }}
        gl={{ antialias: false }}
      >
        {/* <Plane /> */}
        {/* <Blob /> */}
        {/* <BoxParticles /> */}
        {active && <Heart />}
        {active && <HeartParticles />}
        {active && (
          <Stars
            radius={500}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
        )}

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
