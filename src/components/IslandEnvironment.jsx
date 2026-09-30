import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Procedural Low-Poly Pine & Oak Trees (Zero GLTF download, zero Suspense delay)
function LowPolyTree({ position = [0, 0, 0], scale = 1, isCone = true, isDark = false }) {
  const mTrunk = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x4a3728, roughness: 0.9 }), [])
  const mLeaves = useMemo(() => new THREE.MeshStandardMaterial({
    color: isDark ? 0x14532d : (isCone ? 0x15803d : 0x22c55e),
    roughness: 0.85,
    flatShading: true
  }), [isDark, isCone])

  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.6, 0]} castShadow material={mTrunk}>
        <cylinderGeometry args={[0.18, 0.28, 1.2, 6]} />
      </mesh>
      {/* Foliage Cones */}
      {isCone ? (
        <>
          <mesh position={[0, 1.6, 0]} castShadow receiveShadow material={mLeaves}>
            <coneGeometry args={[1.3, 1.4, 6]} />
          </mesh>
          <mesh position={[0, 2.4, 0]} castShadow receiveShadow material={mLeaves}>
            <coneGeometry args={[1.0, 1.2, 6]} />
          </mesh>
          <mesh position={[0, 3.1, 0]} castShadow material={mLeaves}>
            <coneGeometry args={[0.7, 1.0, 6]} />
          </mesh>
        </>
      ) : (
        <mesh position={[0, 2.0, 0]} castShadow receiveShadow material={mLeaves}>
          <dodecahedronGeometry args={[1.4, 1]} />
        </mesh>
      )}
    </group>
  )
}

export default function IslandEnvironment() {
  const cloudsRef = useRef()
  const oceanRef = useRef()
  const balloonRef = useRef()
  const boatsRef = useRef()

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

    // Drift Animal Crossing Red Balloon Present across the sky
    if (balloonRef.current) {
      const t = state.clock.getElapsedTime()
      balloonRef.current.position.x += delta * 1.6
      balloonRef.current.position.y = 15.5 + Math.sin(t * 1.5) * 0.4
      balloonRef.current.rotation.z = Math.sin(t * 1.2) * 0.08
      if (balloonRef.current.position.x > 70) {
        balloonRef.current.position.x = -70
      }
    }

    // Gentle rocking motion for ocean boats
    if (boatsRef.current) {
      const t = state.clock.getElapsedTime()
      boatsRef.current.children.forEach((boat, idx) => {
        boat.rotation.z = Math.sin(t * 1.4 + idx * 1.2) * 0.06
        boat.rotation.x = Math.cos(t * 1.1 + idx * 0.8) * 0.04
        boat.position.y = (idx === 0 ? 0.1 : 0.05) + Math.sin(t * 1.6 + idx) * 0.06
      })
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
        <LowPolyTree position={[-1, 4.4, -8]} scale={2.4} isDark={true} />
        <LowPolyTree position={[1, 4.4, -2]} scale={2.2} isCone={false} />
        <LowPolyTree position={[-1, 4.4, 4]} scale={2.3} />
        <LowPolyTree position={[1, 4.4, 10]} scale={2.4} isCone={false} />
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
        <LowPolyTree position={[1, 4.4, -8]} scale={2.3} isCone={false} />
        <LowPolyTree position={[-1, 4.4, -2]} scale={2.4} isDark={true} />
        <LowPolyTree position={[1, 4.4, 4]} scale={2.4} isDark={true} />
        <LowPolyTree position={[-1, 4.4, 10]} scale={2.3} />
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
          <LowPolyTree
            key={idx}
            isDark={idx % 2 === 0}
            isCone={idx % 3 !== 0}
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

      {/* ============================================================== */}
      {/* 6. ICONIC ANIMAL CROSSING BALLOON PRESENT IN THE SKY          */}
      {/* ============================================================== */}
      <group ref={balloonRef} position={[-40, 16, 2]}>
        {/* Shiny Red Latex Balloon */}
        <mesh position={[0, 1.4, 0]} castShadow>
          <sphereGeometry args={[0.85, 20, 20]} />
          <meshStandardMaterial color="#ef4444" roughness={0.15} metalness={0.1} />
        </mesh>
        {/* Balloon Tie Knot */}
        <mesh position={[0, 0.52, 0]}>
          <coneGeometry args={[0.12, 0.16, 8]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        {/* White Hanging String */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.85, 6]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        {/* Gift Present Box */}
        <group position={[0, -0.65, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.8, 0.7, 0.8]} />
            <meshStandardMaterial color="#fef08a" roughness={0.4} />
          </mesh>
          {/* Green Ribbon Horizontal */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.82, 0.16, 0.82]} />
            <meshStandardMaterial color="#16a34a" roughness={0.3} />
          </mesh>
          {/* Green Ribbon Vertical */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.16, 0.72, 0.82]} />
            <meshStandardMaterial color="#16a34a" roughness={0.3} />
          </mesh>
          {/* Cute Bow on Top */}
          <mesh position={[0, 0.38, 0]}>
            <sphereGeometry args={[0.14, 8, 8]} />
            <meshStandardMaterial color="#15803d" />
          </mesh>
        </group>
      </group>

      {/* ============================================================== */}
      {/* 7. CHARMING WOODEN SAILBOATS IN THE OCEAN                      */}
      {/* ============================================================== */}
      <group ref={boatsRef}>
        {/* Sailboat 1 (Cruising near the fishing pier) */}
        <group position={[-28, 0.1, 26]} rotation={[0, -Math.PI / 4, 0]}>
          {/* Hull */}
          <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.2, 0.6, 5.0]} />
            <meshStandardMaterial color="#78350f" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.35, 1.8]} rotation={[-0.4, 0, 0]} castShadow>
            <boxGeometry args={[2.1, 0.5, 1.4]} />
            <meshStandardMaterial color="#92400e" roughness={0.7} />
          </mesh>
          {/* Mast */}
          <mesh position={[0, 2.6, 0.2]} castShadow>
            <cylinderGeometry args={[0.06, 0.08, 4.8, 8]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
          {/* Main Canvas Sail */}
          <mesh position={[0, 2.8, -0.6]} rotation={[0, 0.1, 0]} castShadow>
            <planeGeometry args={[0.04, 3.8]} />
            <boxGeometry args={[0.04, 3.6, 2.2]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.8} />
          </mesh>
          {/* Red Flag at Mast Tip */}
          <mesh position={[0, 5.0, -0.2]} rotation={[0, 0, 0]}>
            <coneGeometry args={[0.2, 0.4, 3]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
        </group>

        {/* Sailboat 2 (Further out in the sunny horizon) */}
        <group position={[34, 0.05, 30]} rotation={[0, Math.PI / 6, 0]} scale={0.75}>
          <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.0, 0.5, 4.2]} />
            <meshStandardMaterial color="#1e3a8a" roughness={0.6} />
          </mesh>
          {/* Mast */}
          <mesh position={[0, 2.2, 0.1]} castShadow>
            <cylinderGeometry args={[0.05, 0.07, 4.0, 8]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
          {/* Teal Sail */}
          <mesh position={[0, 2.4, -0.5]} rotation={[0, -0.15, 0]} castShadow>
            <boxGeometry args={[0.04, 3.0, 1.8]} />
            <meshStandardMaterial color="#38bdf8" roughness={0.8} />
          </mesh>
        </group>
      </group>

      {/* ============================================================== */}
      {/* 8. DISTANT TROPICAL ARCHIPELAGO ISLANDS (HORIZON ATOLIS)       */}
      {/* ============================================================== */}
      {/* Atoll 1 (West Horizon, X: -75, Z: 25) */}
      <group position={[-75, -0.2, 25]}>
        {/* Sandy beach hill */}
        <mesh position={[0, 0.6, 0]} receiveShadow>
          <cylinderGeometry args={[16, 20, 1.6, 18]} />
          <meshStandardMaterial color="#f6d89b" roughness={0.9} />
        </mesh>
        {/* Green lush grassy hill */}
        <mesh position={[0, 1.8, 0]} receiveShadow>
          <cylinderGeometry args={[11, 14, 1.2, 16]} />
          <meshStandardMaterial color="#7ec850" roughness={0.8} />
        </mesh>
        {/* Tropical Coconut Palms */}
        <LowPolyTree position={[-3, 2.4, -2]} scale={2.8} isCone={false} />
        <LowPolyTree position={[4, 2.4, 3]} scale={2.5} isDark={true} />
        {/* Sea Rocks */}
        <mesh position={[12, 0.4, -8]} castShadow>
          <dodecahedronGeometry args={[2.4]} />
          <meshStandardMaterial color="#64748b" roughness={0.9} />
        </mesh>
      </group>

      {/* Atoll 2 (East Horizon with Lighthouse Beacon, X: 78, Z: 18) */}
      <group position={[78, -0.2, 18]}>
        {/* Sandy foundation */}
        <mesh position={[0, 0.6, 0]} receiveShadow>
          <cylinderGeometry args={[18, 22, 1.6, 18]} />
          <meshStandardMaterial color="#f6d89b" roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.8, 0]} receiveShadow>
          <cylinderGeometry args={[12, 15, 1.2, 16]} />
          <meshStandardMaterial color="#7ec850" roughness={0.8} />
        </mesh>
        {/* Cute Miniature Lighthouse Tower */}
        <group position={[-4, 2.4, 0]}>
          <mesh position={[0, 3.5, 0]} castShadow>
            <cylinderGeometry args={[0.9, 1.5, 7.0, 12]} />
            <meshStandardMaterial color="#ffffff" roughness={0.5} />
          </mesh>
          {/* Red Stripes on Lighthouse */}
          <mesh position={[0, 3.5, 0]}>
            <cylinderGeometry args={[0.95, 1.25, 2.2, 12]} />
            <meshStandardMaterial color="#ef4444" roughness={0.5} />
          </mesh>
          {/* Glass Lantern Room */}
          <mesh position={[0, 7.4, 0]}>
            <cylinderGeometry args={[0.8, 0.8, 1.2, 8]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>
          <pointLight position={[0, 7.4, 0]} color="#fef08a" intensity={2.5} distance={15} />
          <mesh position={[0, 8.2, 0]}>
            <coneGeometry args={[1.1, 0.8, 8]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
        </group>
        <LowPolyTree position={[4, 2.4, -3]} scale={2.8} isCone={false} />
      </group>

      {/* Atoll 3 (North-East Mountainous Islet, X: 65, Z: -65) */}
      <group position={[65, -0.2, -65]}>
        <mesh position={[0, 2.5, 0]} receiveShadow>
          <coneGeometry args={[22, 6.0, 16]} />
          <meshStandardMaterial color="#7ec850" roughness={0.85} />
        </mesh>
        <LowPolyTree position={[0, 5.5, 0]} scale={3.2} isDark={true} />
        <LowPolyTree position={[-5, 4.0, 4]} scale={2.6} />
      </group>

      {/* ============================================================== */}
      {/* 9. COLORFUL WILDFLOWERS & SEASHELLS ON LAWN & BEACH            */}
      {/* ============================================================== */}
      {/* Front Lawn Wildflowers */}
      <group position={[0, 0.6, 0]}>
        {[
          { x: -5, z: 5.5, c: '#f43f5e' },
          { x: -4.2, z: 5.8, c: '#fbbf24' },
          { x: -3.6, z: 5.2, c: '#a855f7' },
          { x: 3.5, z: 5.5, c: '#38bdf8' },
          { x: 4.2, z: 5.8, c: '#f43f5e' },
          { x: 5.0, z: 5.2, c: '#fbbf24' },
          { x: -10, z: 7.2, c: '#ec4899' },
          { x: -9.2, z: 7.5, c: '#fbbf24' },
        ].map((f, idx) => (
          <group key={`flower-${idx}`} position={[f.x, 0.05, f.z]}>
            {/* Green Stem */}
            <mesh position={[0, 0.1, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.2, 6]} />
              <meshBasicMaterial color="#15803d" />
            </mesh>
            {/* Flower Petals */}
            <mesh position={[0, 0.22, 0]}>
              <sphereGeometry args={[0.09, 6, 6]} />
              <meshBasicMaterial color={f.c} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Beach Seashells along the Front Sand Strip */}
      <group position={[0, 0.2, 16]}>
        {[
          { x: -8, z: 0, r: 0.15, c: '#fed7aa' },
          { x: -3, z: 1.2, r: 0.18, c: '#fecdd3' },
          { x: 4, z: -0.5, r: 0.14, c: '#ffffff' },
          { x: 10, z: 0.8, r: 0.16, c: '#fed7aa' },
          { x: -14, z: 1.5, r: 0.2, c: '#fef08a' },
        ].map((s, idx) => (
          <mesh key={`shell-${idx}`} position={[s.x, 0, s.z]} rotation={[0.2, idx, -0.1]} castShadow>
            <coneGeometry args={[s.r, s.r * 1.5, 5]} />
            <meshStandardMaterial color={s.c} roughness={0.4} />
          </mesh>
        ))}
      </group>
    </group>
  )
}
