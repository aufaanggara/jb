"use client";
import { Canvas } from "@react-three/fiber";
import { ParticleField } from "./ParticleField";

// Layer 3D di belakang teks hero. pointer-events-none supaya tidak
// menghalangi klik tombol/link di atasnya. Transparan (tanpa background)
// biar menyatu dengan bg-grid + gradient CSS yang sudah ada.
export function HeroScene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        dpr={[1, 1.5]}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
}
