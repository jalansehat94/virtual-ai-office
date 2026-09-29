import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import ModelProp from './ModelProp'

export default function IslandEnvironment() {
  const cloudsRef = useRef()
  const oceanRef = useRef()

  // Generate 16 fluffy drifting 3D clouds
  const cloudsData = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 160,
      y: 22 + Math.random() * 16,
      z: (Math.random() - 0.5) * 140 - 20,
      speed: 0.8 + Math.random() * 1.4,
      scale: 1.0 + Math.random() * 1.5,
    }))
  }, [])

  useFrame((state, delta) => {
    // Slowly drift clouds across the sky
    if (cloudsRef.current) {
      cloudsRef.current.children.forEach((cloud, i) => {
        const data = cloudsData[i]
        if (!data) return
        cloud.position.x += delta * data.speed * 1.8
        if (cloud.position.x > 90) {
          cloud.position.x = -90
        }
      })
    }

    // Gentle ocean shimmer
    if (oceanRef.current) {
      const t = state.clock.getElapsedTime()
      oceanRef.current.material.opacity = 0.88 + Math.sin(t * 1.5) * 0.05
    }
  })

  return (
    <group>
      {/* ============================================================== */}
      {/* 1. ENDLESS TROPICAL OCEAN                                      */}
      {/* ============================================================== */}
      <mesh
        ref={oceanRef}
        position={[0, -0.42, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[450, 450]} />
        <meshStandardMaterial
          color="#38bdf8"
          roughness={0.12}
          metalness={0.18}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Ocean Shore Wave Foam Rings */}
      <mesh position={[0, -0.38, 22]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[22, 28, 48]} />
        <meshBasicMaterial color="#e0f2fe" transparent opacity={0.4} />
      </mesh>

      {/* ============================================================== */}
      {/* 2. SANDY BEACH COASTLINE (PANTAI TROPIS)                       */}
      {/* ============================================================== */}
      {/* Front Beach Strip */}
      <mesh position={[0, -0.05, 17]} receiveShadow>
        <boxGeometry args={[48, 0.45, 10]} />
        <meshStandardMaterial color="#f6d89b" roughness={0.95} />
      </mesh>

      {/* Left Sandy Bank */}
      <mesh position={[-25, -0.05, 0]} receiveShadow>
        <boxGeometry args={[10, 0.45, 48]} />
        <meshStandardMaterial color="#f6d89b" roughness={0.95} />
      </mesh>

      {/* Right Sandy Bank */}
      <mesh position={[25, -0.05, 0]} receiveShadow>
        <boxGeometry args={[10, 0.45, 48]} />
        <meshStandardMaterial color="#f6d89b" roughness={0.95} />
      </mesh>

      {/* Back Coastline Bank */}
      <mesh position={[0, -0.05, -28]} receiveShadow>
        <boxGeometry args={[56, 0.45, 12]} />
        <meshStandardMaterial color="#f6d89b" roughness={0.95} />
      </mesh>

      {/* Wooden Fishing Pier Extending Into The Ocean */}
      <group position={[-16, 0.1, 23]}>
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.2, 0.25, 12]} />
          <meshStandardMaterial color="#92400e" roughness={0.7} />
        </mesh>
        {/* Pier Pilings (Tiang Kayu) */}
        {[-1.8, 1.8].map((px, i) => (
          <group key={i}>
            {[-4, 0, 4].map((pz, j) => (
              <mesh key={j} position={[px, -0.5, pz]} castShadow>
                <cylinderGeometry args={[0.14, 0.16, 1.6, 8]} />
                <meshStandardMaterial color="#5c3a21" roughness={0.8} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* Tropical Palm Trees Leaning on Beach */}
      {/* Palm 1: Front Left Beach */}
      <group position={[-18, 0.1, 19]} rotation={[0.15, 0.4, -0.15]}>
        {/* Curved Palm Trunk */}
        <mesh position={[0, 2.5, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.38, 5.2, 10]} />
          <meshStandardMaterial color="#8b5a2b" roughness={0.8} />
        </mesh>
        {/* Coconuts */}
        {[-0.2, 0.2].map((cx, i) => (
          <mesh key={i} position={[cx, 4.8, 0.2]} castShadow>
            <sphereGeometry args={[0.18, 10, 10]} />
            <meshStandardMaterial color="#5c3a21" roughness={0.7} />
          </mesh>
        ))}
        {/* Palm Fronds Canopy */}
        {[0, 1, 2, 3, 4, 5].map((angle, i) => (
          <group key={i} position={[0, 5.2, 0]} rotation={[0.4, (angle * Math.PI) / 3, 0]}>
            <mesh position={[0, -0.2, 1.6]} rotation={[-0.3, 0, 0]} castShadow>
              <boxGeometry args={[0.6, 0.08, 3.2]} />
              <meshStandardMaterial color="#2d6a4f" roughness={0.5} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Palm 2: Front Right Beach */}
      <group position={[18, 0.1, 18]} rotation={[0.12, -0.3, 0.18]}>
        <mesh position={[0, 2.5, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.38, 5.2, 10]} />
          <meshStandardMaterial color="#8b5a2b" roughness={0.8} />
        </mesh>
        {[0, 1, 2, 3, 4, 5].map((angle, i) => (
          <group key={i} position={[0, 5.2, 0]} rotation={[0.4, (angle * Math.PI) / 3, 0]}>
            <mesh position={[0, -0.2, 1.6]} rotation={[-0.3, 0, 0]} castShadow>
              <boxGeometry args={[0.6, 0.08, 3.2]} />
              <meshStandardMaterial color="#2d6a4f" roughness={0.5} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ============================================================== */}
      {/* 3. FLUFFY DRIFTING 3D CUMULUS CLOUDS                           */}
      {/* ============================================================== */}
      <group ref={cloudsRef}>
        {cloudsData.map((c) => (
          <group key={c.id} position={[c.x, c.y, c.z]} scale={c.scale}>
            {/* Center Cloud Puffs */}
            <mesh position={[0, 0, 0]} castShadow>
              <sphereGeometry args={[2.8, 12, 12]} />
              <meshStandardMaterial color="#ffffff" roughness={0.3} />
            </mesh>
            <mesh position={[-2.2, -0.4, 0]} castShadow>
              <sphereGeometry args={[2.0, 10, 10]} />
              <meshStandardMaterial color="#ffffff" roughness={0.3} />
            </mesh>
            <mesh position={[2.2, -0.4, 0]} castShadow>
              <sphereGeometry args={[2.1, 10, 10]} />
              <meshStandardMaterial color="#ffffff" roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.8, -0.6]} castShadow>
              <sphereGeometry args={[1.8, 10, 10]} />
              <meshStandardMaterial color="#ffffff" roughness={0.3} />
            </mesh>
            <mesh position={[0.8, -0.6, 1.2]} castShadow>
              <sphereGeometry args={[1.6, 10, 10]} />
              <meshStandardMaterial color="#ffffff" roughness={0.3} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ============================================================== */}
      {/* 4. DISTANT GREEN ROLLING HILLS & HORIZON PINES                 */}
      {/* ============================================================== */}
      {/* Left Cliff Terrace & Forest */}
      <group position={[-24, 0, -8]}>
        <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[8, 4.4, 28]} />
          <meshStandardMaterial color="#cfa170" roughness={0.9} />
        </mesh>
        <mesh position={[0, 4.41, 0]} receiveShadow>
          <boxGeometry args={[8.1, 0.05, 28.1]} />
          <meshStandardMaterial color="#7ec850" roughness={0.8} />
        </mesh>
        {/* Pine cluster */}
        <ModelProp url="./models/tree_cone_dark.glb" position={[-1, 4.4, -8]} scale={2.4} />
        <ModelProp url="./models/tree_oak.glb" position={[1, 4.4, -2]} scale={2.2} />
        <ModelProp url="./models/tree_cone.glb" position={[-1, 4.4, 4]} scale={2.3} />
        <ModelProp url="./models/tree_blocks.glb" position={[1, 4.4, 10]} scale={2.4} />
      </group>

      {/* Right Cliff Terrace & Forest */}
      <group position={[24, 0, -8]}>
        <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[8, 4.4, 28]} />
          <meshStandardMaterial color="#cfa170" roughness={0.9} />
        </mesh>
        <mesh position={[0, 4.41, 0]} receiveShadow>
          <boxGeometry args={[8.1, 0.05, 28.1]} />
          <meshStandardMaterial color="#7ec850" roughness={0.8} />
        </mesh>
        {/* Pine cluster */}
        <ModelProp url="./models/tree_oak.glb" position={[1, 4.4, -8]} scale={2.3} />
        <ModelProp url="./models/tree_cone_dark.glb" position={[-1, 4.4, -2]} scale={2.4} />
        <ModelProp url="./models/tree_blocks_dark.glb" position={[1, 4.4, 4]} scale={2.4} />
        <ModelProp url="./models/tree_cone.glb" position={[-1, 4.4, 10]} scale={2.3} />
      </group>

      {/* Back High Mountain Ridge */}
      <group position={[0, 0, -28]}>
        <mesh position={[0, 3.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[46, 7.6, 10]} />
          <meshStandardMaterial color="#cfa170" roughness={0.9} />
        </mesh>
        <mesh position={[0, 7.61, 0]} receiveShadow>
          <boxGeometry args={[46.1, 0.05, 10.1]} />
          <meshStandardMaterial color="#7ec850" roughness={0.8} />
        </mesh>
        {/* Mountain Ridge Forest */}
        {[-18, -12, -6, 0, 6, 12, 18].map((tx, idx) => (
          <ModelProp
            key={idx}
            url={idx % 2 === 0 ? './models/tree_cone_dark.glb' : './models/tree_oak.glb'}
            position={[tx, 7.6, 0]}
            scale={2.6}
          />
        ))}
      </group>

      {/* ============================================================== */}
      {/* 5. CASCADING WATERFALL (AIR TERJUN CLIFF)                      */}
      {/* ============================================================== */}
      <group position={[-10.5, 0, -11]}>
        {/* Waterfall Stream Falling from Tier 3 to Tier 2 */}
        <mesh position={[0, 3.5, 0]}>
          <boxGeometry args={[2.4, 2.6, 0.15]} />
          <meshStandardMaterial color="#60a5fa" roughness={0.1} transparent opacity={0.85} />
        </mesh>
        {/* Waterfall Stream Falling from Tier 2 to Tier 1 */}
        <mesh position={[0, 1.4, 5.5]}>
          <boxGeometry args={[2.4, 2.0, 0.15]} />
          <meshStandardMaterial color="#60a5fa" roughness={0.1} transparent opacity={0.85} />
        </mesh>
        {/* Splash Mist at Base */}
        <mesh position={[0, 0.65, 5.8]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.5, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  )
}
