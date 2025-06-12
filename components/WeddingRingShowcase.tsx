"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Ring() {
  const ringRef = useRef<THREE.Mesh>(null!);

  // Diamantes
  const diamonds = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    diamonds.push(
      <mesh
        key={i}
        position={[Math.cos(angle) * 1.2, 0.1, Math.sin(angle) * 1.2]}
      >
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshPhongMaterial color={0xffffff} shininess={200} transparent opacity={0.9} />
      </mesh>
    );
  }

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.y += 0.0045;
      ringRef.current.rotation.x += 0.0015;
      ringRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={ringRef} castShadow receiveShadow material={new THREE.MeshPhongMaterial({ color: 0xc0c0c0, shininess: 100, specular: 0xffffff })} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.7, 0.15, 32, 100]} />
        {diamonds}
      </mesh>
    </group>
  );
}

export function WeddingRingShowcase() {
  return (
    <div style={{ width: 300, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} shadows style={{ background: "transparent", width: 300, height: 300 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
        <pointLight position={[-5, 3, 2]} intensity={0.8} />
        <directionalLight position={[-3, -3, -5]} intensity={0.3} color={0x6666ff} />
        <Ring />
        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
    </div>
  );
} 