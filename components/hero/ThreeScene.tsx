"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ============================================
// PARTICLE CONSTELLATION COMPONENT
// ============================================
function NeuralConstellation() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Set particle limits based on device screen size
  const [particleCount, setParticleCount] = useState(150);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < 768) {
        setParticleCount(60); // Mobile optimization
      } else if (width < 1024) {
        setParticleCount(100); // Tablet optimization
      } else {
        setParticleCount(250); // Desktop default
      }
    }
  }, []);

  // Generate random points in space
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    const range = 18;

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * range;
      pos[i * 3 + 1] = (Math.random() - 0.5) * range;
      pos[i * 3 + 2] = (Math.random() - 0.5) * range;

      vel[i * 3] = (Math.random() - 0.5) * 0.015;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.015;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.015;
    }

    return [pos, vel];
  }, [particleCount]);

  // Frame update loop
  useFrame(({ pointer }) => {
    if (!pointsRef.current || !linesRef.current) return;

    const pointsGeom = pointsRef.current.geometry;
    const lineGeom = linesRef.current.geometry;
    const posAttr = pointsGeom.attributes.position;
    const currentPositions = posAttr.array as Float32Array;

    const linePos = [];
    const maxDistance = 4.2;

    // 1. Move particles
    for (let i = 0; i < particleCount; i++) {
      // Apply velocity
      currentPositions[i * 3] += velocities[i * 3];
      currentPositions[i * 3 + 1] += velocities[i * 3 + 1];
      currentPositions[i * 3 + 2] += velocities[i * 3 + 2];

      // Bounce constraints
      const boundary = 10;
      if (Math.abs(currentPositions[i * 3]) > boundary) velocities[i * 3] *= -1;
      if (Math.abs(currentPositions[i * 3 + 1]) > boundary) velocities[i * 3 + 1] *= -1;
      if (Math.abs(currentPositions[i * 3 + 2]) > boundary) velocities[i * 3 + 2] *= -1;

      // Mouse interactive push/pull
      const dx = currentPositions[i * 3] - pointer.x * 6;
      const dy = currentPositions[i * 3 + 1] - pointer.y * 6;
      const distToMouse = Math.sqrt(dx * dx + dy * dy);
      if (distToMouse < 3.5) {
        currentPositions[i * 3] += dx * 0.002;
        currentPositions[i * 3 + 1] += dy * 0.002;
      }
    }

    posAttr.needsUpdate = true;

    // 2. Connect neighboring particles with lines
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = currentPositions[i * 3] - currentPositions[j * 3];
        const dy = currentPositions[i * 3 + 1] - currentPositions[j * 3 + 1];
        const dz = currentPositions[i * 3 + 2] - currentPositions[j * 3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < maxDistance) {
          linePos.push(
            currentPositions[i * 3],
            currentPositions[i * 3 + 1],
            currentPositions[i * 3 + 2],
            currentPositions[j * 3],
            currentPositions[j * 3 + 1],
            currentPositions[j * 3 + 2]
          );
        }
      }
    }

    lineGeom.setAttribute("position", new THREE.Float32BufferAttribute(linePos, 3));
    lineGeom.attributes.position.needsUpdate = true;

    // Rotate the overall constellation slowly
    pointsRef.current.rotation.y += 0.0008;
    linesRef.current.rotation.y += 0.0008;
  });

  return (
    <group>
      {/* 3D connected lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* 3D neural nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#3B82F6"
          size={0.15}
          sizeAttenuation
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// ============================================
// MAIN WEBGL CONTAINER
// ============================================
export default function ThreeScene() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Basic WebGL compatibility check
    if (typeof window !== "undefined") {
      try {
        const canvas = document.createElement("canvas");
        const ctx = !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
        setShouldRender(ctx);
      } catch (e) {
        setShouldRender(false);
      }
    }
  }, []);

  if (!shouldRender) {
    return (
      <div className="absolute inset-0 bg-gradient-to-tr from-bg-primary via-bg-secondary to-bg-primary opacity-60" />
    );
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 65 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <NeuralConstellation />
      </Canvas>
    </div>
  );
}
