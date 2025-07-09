import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SimpleCosmicBackgroundProps {
  count?: number;
}

function SimpleStars({ count = 1000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Create a spherical distribution
      const radius = Math.random() * 20 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Blue to purple colors
      colors[i * 3] = 0.3 + Math.random() * 0.4; // R
      colors[i * 3 + 1] = 0.5 + Math.random() * 0.3; // G
      colors[i * 3 + 2] = 0.9; // B
    }
    
    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.02;
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.5}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function SimpleOrbs() {
  const meshRefs = useRef<THREE.Mesh[]>([]);
  
  const orbs = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
      ] as [number, number, number],
      scale: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 0.01 + 0.005
    }));
  }, []);

  useFrame((state) => {
    meshRefs.current.forEach((mesh, i) => {
      if (mesh && orbs[i]) {
        const time = state.clock.elapsedTime;
        mesh.position.y = orbs[i].position[1] + Math.sin(time * orbs[i].speed + i) * 1.5;
        mesh.position.x = orbs[i].position[0] + Math.cos(time * orbs[i].speed * 0.7 + i) * 0.8;
      }
    });
  });

  return (
    <>
      {orbs.map((orb, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) meshRefs.current[i] = el;
          }}
          position={orb.position}
          scale={orb.scale}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial
            color={new THREE.Color(0.4, 0.6, 1)}
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </>
  );
}

export const SimpleCosmicBackground: React.FC<SimpleCosmicBackgroundProps> = ({ count = 1000 }) => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.1} />
        <SimpleStars count={count} />
        <SimpleOrbs />
      </Canvas>
    </div>
  );
};