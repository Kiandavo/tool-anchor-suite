import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface CosmicBackgroundProps {
  count?: number;
}

function Stars({ count = 2000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Create a spherical distribution
      const radius = Math.random() * 25 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Assign colors (blue to purple gradient)
      const colorIntensity = Math.random();
      colors[i * 3] = 0.2 + colorIntensity * 0.5; // R
      colors[i * 3 + 1] = 0.4 + colorIntensity * 0.3; // G
      colors[i * 3 + 2] = 0.8 + colorIntensity * 0.2; // B
    }
    
    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
      ref.current.rotation.y = state.clock.elapsedTime * 0.075;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={2}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function FloatingOrbs() {
  const orbRefs = useRef<(THREE.Mesh | null)[]>([]);
  
  const orbs = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 0.02 + 0.01,
      color: new THREE.Color().setHSL(0.6 + Math.random() * 0.2, 0.7, 0.6)
    }));
  }, []);

  useFrame((state) => {
    orbRefs.current.forEach((orb, i) => {
      if (orb && orb.material) {
        const time = state.clock.elapsedTime;
        orb.position.y = orbs[i].position[1] + Math.sin(time * orbs[i].speed + i) * 2;
        orb.position.x = orbs[i].position[0] + Math.cos(time * orbs[i].speed * 0.7 + i) * 1;
        if ('opacity' in orb.material) {
          (orb.material as any).opacity = 0.3 + Math.sin(time * 2 + i) * 0.1;
        }
      }
    });
  });

  return (
    <>
      {orbs.map((orb, i) => (
        <mesh
          key={i}
          ref={(el) => (orbRefs.current[i] = el)}
          position={orb.position}
          scale={orb.scale}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color={orb.color}
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </>
  );
}

export const CosmicBackground3D: React.FC<CosmicBackgroundProps> = ({ count = 2000 }) => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.3} />
        <Stars count={count} />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
};