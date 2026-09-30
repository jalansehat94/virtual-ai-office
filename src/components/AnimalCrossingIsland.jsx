import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

// =========================================================================
// PROCEDURAL VOXEL SAKURA TREE COMPONENT
// Zero GLTF download, instant GPU rendering with instanced cubic voxels
// =========================================================================
function VoxelSakuraTree({ position = [0, 0, 0], scale = 1.0, isWeeping = false }) {
  const voxelGeo = useMemo(() => new THREE.BoxGeometry(0.36, 0.36, 0.36), [])
  const trunkVoxelGeo = useMemo(() => new THREE.BoxGeometry(0.48, 0.48, 0.48), [])

  const mWoodDark = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x3d271d, roughness: 0.8 }), [])
  const mSakura = useMemo(() => new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.85, flatShading: true }), [])

  const trunkPoints = [
    [0, 0.25, 0], [0, 0.75, 0], [0.1, 1.25, 0.05], [0.2, 1.75, 0.12],
    [0.35, 2.25, 0.22], [0.48, 2.75, 0.30], [0.30, 3.25, 0.18], [0.12, 3.75, 0.05],
    [-0.3, 2.8, 0.1], [-0.65, 3.2, 0.0], [-1.0, 3.5, -0.2],
    [0.7, 3.0, 0.35], [1.1, 3.4, 0.45], [1.5, 3.7, 0.35]
  ]

  const foliageCenters = isWeeping
    ? [
        { x: 0.2, y: 4.6, z: 0.1, count: 65, spread: 1.5 },
        { x: -0.9, y: 3.8, z: -0.3, count: 50, spread: 1.3 },
        { x: 1.3, y: 4.0, z: 0.4, count: 55, spread: 1.4 },
        { x: 1.6, y: 3.0, z: 0.5, count: 35, spread: 0.8 },
        { x: 1.9, y: 2.2, z: 0.6, count: 25, spread: 0.6 }
      ]
    : [
        { x: 0, y: 5.0, z: 0, count: 70, spread: 1.6 },
        { x: -1.1, y: 4.0, z: -0.2, count: 55, spread: 1.4 },
        { x: 1.0, y: 4.2, z: 0.3, count: 55, spread: 1.4 },
        { x: 0.2, y: 3.6, z: -0.9, count: 45, spread: 1.2 },
        { x: -0.3, y: 3.4, z: 0.9, count: 45, spread: 1.2 }
      ]

  const totalCubes = useMemo(() => foliageCenters.reduce((sum, fc) => sum + fc.count, 0), [foliageCenters])

  const instancedMesh = useMemo(() => {
    const mesh = new THREE.InstancedMesh(voxelGeo, mSakura, totalCubes)
    mesh.castShadow = true
    mesh.receiveShadow = true
    const dummy = new THREE.Object3D()
    const color = new THREE.Color()
    let idx = 0

    foliageCenters.forEach(fc => {
      for (let i = 0; i < fc.count; i++) {
        const r = Math.pow(Math.random(), 0.5) * fc.spread
        const theta = Math.random() * Math.PI * 2
        const phi = (Math.random() - 0.5) * Math.PI

        const step = 0.32
        const vx = fc.x + Math.round((r * Math.cos(phi) * Math.cos(theta)) / step) * step
        const vy = fc.y + Math.round((r * Math.sin(phi)) / step) * step
        const vz = fc.z + Math.round((r * Math.cos(phi) * Math.sin(theta)) / step) * step

        dummy.position.set(vx, vy, vz)
        dummy.updateMatrix()
        mesh.setMatrixAt(idx, dummy.matrix)

        const p = Math.random()
        if (p > 0.65) color.setHex(0xfbcfe8)
        else if (p < 0.2) color.setHex(0xdb2777)
        else color.setHex(0xf472b6)

        mesh.setColorAt(idx, color)
        idx++
      }
    })
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    return mesh
  }, [totalCubes])

  return (
    <group position={position} scale={scale}>
      {trunkPoints.map(([tx, ty, tz], i) => (
        <mesh key={i} geometry={trunkVoxelGeo} material={mWoodDark} position={[tx, ty, tz]} castShadow receiveShadow />
      ))}
      <primitive object={instancedMesh} />
    </group>
  )
}

// =========================================================================
// PROCEDURAL ARCHITECTURAL OFFICE DESK + CHAIR + LAPTOP
// Fast, lightweight, zero GLTF bottleneck
// =========================================================================
function ProceduralDesk({ position, id, color }) {
  const mOak = useMemo(() => new THREE.MeshStandardMaterial({ color: 0xc49b71, roughness: 0.6 }), [])
  const mMetal = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7, roughness: 0.3 }), [])
  const mScreen = useMemo(() => new THREE.MeshBasicMaterial({ color: 0x10b981 }), [])
  const mChair = useMemo(() => new THREE.MeshStandardMaterial({ color: color || 0x64748b, roughness: 0.7 }), [])
  const mWhite = useMemo(() => new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 }), [])

  return (
    <group position={position}>
      {/* ── DESK ── */}
      {/* Wood Top Surface */}
      <mesh position={[0, 0.48, 0]} castShadow receiveShadow material={mOak}>
        <boxGeometry args={[1.5, 0.08, 0.9]} />
      </mesh>
      {/* Metal Legs */}
      {[[-0.65, -0.35], [0.65, -0.35], [-0.65, 0.35], [0.65, 0.35]].map(([lx, lz], i) => (
        <mesh key={i} position={[lx, 0.22, lz]} castShadow material={mMetal}>
          <boxGeometry args={[0.06, 0.44, 0.06]} />
        </mesh>
      ))}

      {/* ── OFFICE CHAIR (Behind desk at Z = -0.55) ── */}
      <group position={[0, 0, -0.55]}>
        {/* Seat Cushion */}
        <mesh position={[0, 0.32, 0]} castShadow receiveShadow material={mChair}>
          <boxGeometry args={[0.55, 0.08, 0.52]} />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 0.58, -0.22]} castShadow material={mChair}>
          <boxGeometry args={[0.52, 0.45, 0.06]} />
        </mesh>
        {/* Metal Pedestal */}
        <mesh position={[0, 0.14, 0]} material={mMetal}>
          <cylinderGeometry args={[0.04, 0.04, 0.28, 8]} />
        </mesh>
        {/* Star Base */}
        <mesh position={[0, 0.02, 0]} material={mMetal}>
          <cylinderGeometry args={[0.26, 0.26, 0.04, 6]} />
        </mesh>
      </group>

      {/* ── LAPTOP (Flush on desk surface at Y = 0.52) ── */}
      <group position={[0, 0.52, 0.08]}>
        {/* Base */}
        <mesh position={[0, 0.01, 0]} castShadow material={mMetal}>
          <boxGeometry args={[0.48, 0.016, 0.32]} />
        </mesh>
        {/* Screen Hinge & Display (Facing seated agent at -Z) */}
        <group position={[0, 0.018, 0.12]} rotation={[0.28, 0, 0]}>
          <mesh position={[0, 0.14, 0]} castShadow material={mMetal}>
            <boxGeometry args={[0.48, 0.28, 0.016]} />
          </mesh>
          {/* Glowing Code Screen */}
          <mesh position={[0, 0.14, -0.01]} rotation={[0, Math.PI, 0]} material={mScreen}>
            <planeGeometry args={[0.44, 0.24]} />
          </mesh>
        </group>
      </group>

      {/* ── CERAMIC COFFEE MUG ── */}
      <mesh position={[0.45, 0.56, -0.15]} castShadow material={mWhite}>
        <cylinderGeometry args={[0.045, 0.04, 0.09, 8]} />
      </mesh>
    </group>
  )
}

// =========================================================================
// DRIFTING SAKURA PETALS ACROSS THE ISLAND
// =========================================================================
function SakuraPetalShower() {
  const count = 140
  const instancedRef = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const petalGeo = useMemo(() => new THREE.BoxGeometry(0.12, 0.03, 0.18), [])
  const petalMat = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffb7c5 }), [])

  const petalData = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: (Math.random() - 0.5) * 36,
      y: Math.random() * 16 + 2,
      z: (Math.random() - 0.5) * 36 - 4,
      vx: -0.015 - Math.random() * 0.02,
      vy: -0.02 - Math.random() * 0.03,
      vz: 0.01 + Math.random() * 0.015,
      rx: Math.random() * Math.PI,
      ry: Math.random() * Math.PI,
      vrx: (Math.random() - 0.5) * 0.04,
      vry: (Math.random() - 0.5) * 0.04
    }))
  }, [])

  useFrame((state) => {
    if (!instancedRef.current) return
    const t = state.clock.getElapsedTime()

    for (let i = 0; i < count; i++) {
      const p = petalData[i]
      p.x += p.vx + Math.sin(t * 1.5 + i) * 0.01
      p.y += p.vy
      p.z += p.vz
      p.rx += p.vrx
      p.ry += p.vry

      if (p.y < 0 || p.x < -20 || p.z > 18) {
        p.x = (Math.random() - 0.5) * 32 + 5
        p.y = 16 + Math.random() * 4
        p.z = (Math.random() - 0.5) * 32 - 4
      }

      dummy.position.set(p.x, p.y, p.z)
      dummy.rotation.set(p.rx, p.ry, 0)
      dummy.updateMatrix()
      instancedRef.current.setMatrixAt(i, dummy.matrix)
    }
    instancedRef.current.instanceMatrix.needsUpdate = true
  })

  return <instancedMesh ref={instancedRef} args={[petalGeo, petalMat, count]} />
}

// =========================================================================
// MAIN COMPONENT: ARCHITECTURAL DIORAMA OFFICE ISLAND
// =========================================================================
export default function AnimalCrossingIsland({ counts, showLabels = true, onOpenBulletin }) {
  // 16 Division Desks Coordinates
  const tier2Desks = [
    // Room 01 — Divisi Akademik (@Luna & tim) — X: -12 to -5.5
    { id: 'luna',   pos: [-11.2, 2.4, -7.8], color: '#9d71e8' },
    { id: 'kutu',   pos: [-8.4,  2.4, -7.8], color: '#c49b71' },
    { id: 'crayon', pos: [-11.2, 2.4, -3.8], color: '#ffb347' },
    { id: 'kucing', pos: [-8.4,  2.4, -3.8], color: '#ffa07a' },
    { id: 'mata',   pos: [-9.8,  2.4,  0.2], color: '#38bdf8' },

    // Room 02 — Divisi BIM & Konstruksi (@Kaktus & tim) — X: -4.5 to -0.5
    { id: 'kaktus', pos: [-3.8,  2.4, -7.8], color: '#4ade80' },
    { id: 'tabrak', pos: [-1.8,  2.4, -7.8], color: '#d7ccc8' },
    { id: 'cuan',   pos: [-2.8,  2.4, -3.8], color: '#fffbeb' },

    // Room 03 — Divisi Trading & Quant (@MasAmba & tim) — X: 0.5 to 4.5
    { id: 'masamba', pos: [1.8,  2.4, -7.8], color: '#64748b' },
    { id: 'lilin',   pos: [3.8,  2.4, -7.8], color: '#c2410c' },
    { id: 'bandar',  pos: [2.8,  2.4, -3.8], color: '#334155' },

    // Room 04 — Divisi Web & Software (@Mochi & tim) — X: 5.5 to 12.5
    { id: 'mochi',  pos: [7.2,  2.4, -7.8], color: '#fbbf24' },
    { id: 'piksel', pos: [10.2, 2.4, -7.8], color: '#78716c' },
    { id: 'kunci',  pos: [7.2,  2.4, -3.8], color: '#64748b' },
    { id: 'botik',  pos: [10.2, 2.4, -3.8], color: '#84cc16' },
    { id: 'rem',    pos: [8.7,  2.4,  0.2], color: '#14b8a6' },
  ]

  // Shared Materials
  const mEarth = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x7a714e, roughness: 0.9, flatShading: true }), [])
  const mCliff = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x544c42, roughness: 0.95, flatShading: true }), [])
  const mCobble = useMemo(() => new THREE.MeshStandardMaterial({ color: 0xd6cbbd, roughness: 0.85 }), [])
  const mWoodTrim = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x3d271d, roughness: 0.75 }), [])
  const mVermilion = useMemo(() => new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.65 }), [])
  const mPaperWall = useMemo(() => new THREE.MeshStandardMaterial({ color: 0xf5ede0, roughness: 0.6 }), [])

  return (
    <group>
      {/* ============================================================== */}
      {/* 1. STEPPED CONTOUR DIORAMA BASE (TIER 1, TIER 2, TIER 3)      */}
      {/* ============================================================== */}
      
      {/* ── TIER 1: FRONT CAFE & PATIO GARDEN (Y: 0.6, Z: 8.5) ── */}
      <group position={[0, 0, 8.5]}>
        {/* Stepped Earth Mound Base */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow material={mCliff}>
          <boxGeometry args={[34, 0.6, 12]} />
        </mesh>
        {/* Soft Olive Green Lawn Surface */}
        <mesh position={[0, 0.61, 0]} receiveShadow material={mEarth}>
          <boxGeometry args={[34.1, 0.05, 12.1]} />
        </mesh>

        {/* Traditional Arched Red Bridge across entrance path */}
        <group position={[0, 0.62, 5.0]} rotation={[0, 0, 0]}>
          {/* Stepped Wooden Arch Planks */}
          {[-1.2, -0.6, 0, 0.6, 1.2].map((pz, idx) => {
            const archY = Math.cos((idx - 2) * 0.4) * 0.35 + 0.05
            return (
              <mesh key={idx} position={[0, archY, pz]} castShadow receiveShadow material={mWoodTrim}>
                <boxGeometry args={[3.2, 0.12, 0.52]} />
              </mesh>
            )
          })}
          {/* Vermilion Railings */}
          {[-1.6, 1.6].map((rx, idx) => (
            <group key={idx} position={[rx, 0.45, 0]}>
              <mesh castShadow material={mVermilion}>
                <boxGeometry args={[0.12, 0.12, 3.2]} />
              </mesh>
              {[-1.2, 0, 1.2].map((pz, pi) => (
                <mesh key={pi} position={[0, -0.22, pz]} castShadow material={mVermilion}>
                  <boxGeometry args={[0.12, 0.55, 0.12]} />
                </mesh>
              ))}
            </group>
          ))}
        </group>

        {/* Stone Cobblestone Walkway through the Lawn */}
        <mesh position={[0, 0.63, 0]} receiveShadow material={mCobble}>
          <boxGeometry args={[3.4, 0.02, 11.0]} />
        </mesh>
      </group>

      {/* ── TIER 2: MAIN WORKSPACE TERRACE (Y: 2.4, Z: -4.6) ── */}
      <group position={[0, 0, -4.6]}>
        {/* Cliff Facet Base */}
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow material={mCliff}>
          <boxGeometry args={[32, 2.4, 13.0]} />
        </mesh>
        {/* Lawn Rim */}
        <mesh position={[0, 2.41, 0]} receiveShadow material={mEarth}>
          <boxGeometry args={[32.1, 0.05, 13.1]} />
        </mesh>
        {/* Warm Terracotta Studio Floor */}
        <mesh position={[0, 2.45, 0]} receiveShadow castShadow material={mWoodTrim}>
          <boxGeometry args={[31.4, 0.06, 12.4]} />
        </mesh>

        {/* Central Cobblestone Grand Avenue */}
        <mesh position={[0, 2.47, -0.5]} receiveShadow material={mCobble}>
          <boxGeometry args={[3.4, 0.02, 11.2]} />
        </mesh>
      </group>

      {/* ── TIER 3: EXECUTIVE PAGODA LOUNGE (@Ai) (Y: 4.6, Z: -15.5) ── */}
      <group position={[0, 0, -15.5]}>
        {/* Tier 3 Cliff Foundation */}
        <mesh position={[0, 2.3, 0]} castShadow receiveShadow material={mCliff}>
          <boxGeometry args={[22, 4.6, 9.5]} />
        </mesh>
        {/* Wood Deck */}
        <mesh position={[0, 4.62, 0]} receiveShadow castShadow material={mWoodTrim}>
          <boxGeometry args={[21.5, 0.06, 9.0]} />
        </mesh>

        {/* Mini Executive Pagoda Gazebo for @Ai (PM) */}
        <group position={[0, 4.65, 0]}>
          {/* Stepped Eaves Pavilion Roof */}
          <mesh position={[0, 3.8, 0]} castShadow receiveShadow material={mWoodTrim}>
            <boxGeometry args={[7.2, 0.35, 6.2]} />
          </mesh>
          <mesh position={[0, 4.15, 0]} castShadow receiveShadow material={mWoodTrim}>
            <boxGeometry args={[5.6, 0.35, 4.8]} />
          </mesh>
          <mesh position={[0, 4.5, 0]} castShadow material={mWoodTrim}>
            <boxGeometry args={[3.8, 0.35, 3.2]} />
          </mesh>
          {/* Golden Finial Crown */}
          <mesh position={[0, 5.2, 0]} castShadow material={mVermilion}>
            <cylinderGeometry args={[0.08, 0.16, 1.4, 8]} />
          </mesh>

          {/* 4 Corner Vermilion Pillars */}
          {[[-3.0, -2.4], [3.0, -2.4], [-3.0, 2.4], [3.0, 2.4]].map(([px, pz], pi) => (
            <mesh key={pi} position={[px, 1.8, pz]} castShadow material={mVermilion}>
              <boxGeometry args={[0.28, 3.6, 0.28]} />
            </mesh>
          ))}

          {/* Master SecondBrain Beacon in Center */}
          <mesh position={[0, 1.5, -1.8]} castShadow material={mVermilion}>
            <boxGeometry args={[1.2, 0.9, 1.2]} />
          </mesh>
          <mesh position={[0, 2.4, -1.8]}>
            <sphereGeometry args={[0.35, 16, 16]} />
            <meshBasicMaterial color="#ffb7c5" />
          </mesh>
        </group>
      </group>

      {/* ============================================================== */}
      {/* 2. CONNECTING STAIRWAYS (TIER 1 <-> TIER 2 <-> TIER 3)        */}
      {/* ============================================================== */}
      {/* Stairway 1 (Center X: 0, from Tier 1 to Tier 2) */}
      <group position={[0, 0, 3.8]}>
        {[
          { y: 0.75, z: 1.6 },
          { y: 1.05, z: 1.1 },
          { y: 1.35, z: 0.6 },
          { y: 1.65, z: 0.1 },
          { y: 1.95, z: -0.4 },
          { y: 2.25, z: -0.9 },
        ].map((s, idx) => (
          <mesh key={idx} position={[0, s.y, s.z]} castShadow receiveShadow material={mWoodTrim}>
            <boxGeometry args={[3.6, 0.30, 0.62]} />
          </mesh>
        ))}
      </group>

      {/* Stairway 2 (Right X: 11.5, from Tier 2 to Tier 3) */}
      <group position={[11.5, 0, -10.0]}>
        {[
          { y: 2.55, z: 1.6 },
          { y: 2.95, z: 1.0 },
          { y: 3.35, z: 0.4 },
          { y: 3.75, z: -0.2 },
          { y: 4.15, z: -0.8 },
          { y: 4.55, z: -1.4 },
        ].map((s, idx) => (
          <mesh key={idx} position={[0, s.y, s.z]} castShadow receiveShadow material={mWoodTrim}>
            <boxGeometry args={[2.8, 0.40, 0.72]} />
          </mesh>
        ))}
      </group>

      {/* ============================================================== */}
      {/* 3. TIER 2: 4 DIVISION ROOMS WITH ELEGANT TIMBER PARTITIONS    */}
      {/* ============================================================== */}
      <group position={[0, 2.4, 0]}>
        {/* Back Wall */}
        <mesh position={[0, 1.3, -8.4]} castShadow receiveShadow material={mPaperWall}>
          <boxGeometry args={[28.0, 2.6, 0.18]} />
        </mesh>
        {/* Left & Right Outer Walls */}
        <mesh position={[-13.5, 1.3, -3.4]} castShadow receiveShadow material={mPaperWall}>
          <boxGeometry args={[0.18, 2.6, 10.2]} />
        </mesh>
        <mesh position={[13.5, 1.3, -3.4]} castShadow receiveShadow material={mPaperWall}>
          <boxGeometry args={[0.18, 2.6, 10.2]} />
        </mesh>

        {/* Partition Divider Walls with Archways */}
        {[-5.2, 0.2, 5.4].map((divX, di) => (
          <group key={di} position={[divX, 1.3, 0]}>
            {/* Back segment */}
            <mesh position={[0, 0, -7.5]} castShadow receiveShadow material={mPaperWall}>
              <boxGeometry args={[0.18, 2.6, 1.8]} />
            </mesh>
            {/* Front segment */}
            <mesh position={[0, 0, -2.4]} castShadow receiveShadow material={mPaperWall}>
              <boxGeometry args={[0.18, 2.6, 5.6]} />
            </mesh>
            {/* Arch Top */}
            <mesh position={[0, 1.05, -6.15]} castShadow material={mWoodTrim}>
              <boxGeometry args={[0.22, 0.52, 1.2]} />
            </mesh>
          </group>
        ))}

        {/* Division Color Floor Insets */}
        {/* Room 01: Akademik (Ungu) */}
        <mesh position={[-9.35, 0.04, -3.7]} receiveShadow>
          <boxGeometry args={[8.0, 0.02, 9.0]} />
          <meshStandardMaterial color="#ede8f8" roughness={0.7} />
        </mesh>
        {/* Room 02: BIM (Hijau) */}
        <mesh position={[-2.65, 0.04, -3.7]} receiveShadow>
          <boxGeometry args={[5.2, 0.02, 9.0]} />
          <meshStandardMaterial color="#e8f6ed" roughness={0.7} />
        </mesh>
        {/* Room 03: Trading (Amber) */}
        <mesh position={[2.8, 0.04, -3.7]} receiveShadow>
          <boxGeometry args={[5.0, 0.02, 9.0]} />
          <meshStandardMaterial color="#fef6e8" roughness={0.7} />
        </mesh>
        {/* Room 04: Web (Biru) */}
        <mesh position={[9.35, 0.04, -3.7]} receiveShadow>
          <boxGeometry args={[8.0, 0.02, 9.0]} />
          <meshStandardMaterial color="#e8f3fd" roughness={0.7} />
        </mesh>

        {/* Room Name Labels */}
        {showLabels && (
          <>
            <Html position={[-9.35, 2.7, -8.0]} center>
              <div style={{
                background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
                color: '#fff', padding: '4px 10px', borderRadius: '8px',
                fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(0,0,0,0.35)', userSelect: 'none'
              }}>📚 Divisi 01 · Akademik</div>
            </Html>
            <Html position={[-2.65, 2.7, -8.0]} center>
              <div style={{
                background: 'linear-gradient(135deg,#15803d,#22c55e)',
                color: '#fff', padding: '4px 10px', borderRadius: '8px',
                fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(0,0,0,0.35)', userSelect: 'none'
              }}>🏗️ Divisi 02 · BIM</div>
            </Html>
            <Html position={[2.8, 2.7, -8.0]} center>
              <div style={{
                background: 'linear-gradient(135deg,#b45309,#f59e0b)',
                color: '#fff', padding: '4px 10px', borderRadius: '8px',
                fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(0,0,0,0.35)', userSelect: 'none'
              }}>📈 Divisi 03 · Trading</div>
            </Html>
            <Html position={[9.35, 2.7, -8.0]} center>
              <div style={{
                background: 'linear-gradient(135deg,#0369a1,#38bdf8)',
                color: '#fff', padding: '4px 10px', borderRadius: '8px',
                fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(0,0,0,0.35)', userSelect: 'none'
              }}>💻 Divisi 04 · Web & Software</div>
            </Html>
          </>
        )}

        {/* 16 Procedural Desks with Glowing Screens */}
        {tier2Desks.map(d => (
          <ProceduralDesk key={d.id} position={[d.pos[0], 0, d.pos[2]]} id={d.id} color={d.color} />
        ))}
      </group>

      {/* ============================================================== */}
      {/* 4. TIER 1: BREWSTER'S COFFEE BAR & PATIO LOUNGE               */}
      {/* ============================================================== */}
      <group position={[-6.2, 0.6, 8.8]}>
        {/* Mahogany Coffee Bar Counter */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow material={mWoodTrim}>
          <boxGeometry args={[7.2, 1.0, 1.4]} />
        </mesh>
        {/* Bar Stools */}
        {[-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((sx, idx) => (
          <group key={idx} position={[sx, 0, -1.3]}>
            <mesh position={[0, 0.42, 0]} castShadow material={mWoodTrim}>
              <cylinderGeometry args={[0.26, 0.26, 0.08, 12]} />
            </mesh>
            <mesh position={[0, 0.20, 0]} material={mCliff}>
              <cylinderGeometry args={[0.04, 0.04, 0.40, 6]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Patio Garden Tables (Right Wing) */}
      <group position={[6.5, 0.6, 8.8]}>
        <mesh position={[0, 0.42, 0]} castShadow material={mWoodTrim}>
          <cylinderGeometry args={[1.2, 1.2, 0.08, 16]} />
        </mesh>
        <mesh position={[0, 0.2, 0]} material={mCliff}>
          <cylinderGeometry args={[0.1, 0.1, 0.4, 8]} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 5. VOXEL SAKURA TREES & DRIFTING PETALS SHOWER                */}
      {/* ============================================================== */}
      {/* Left Blossom Tree */}
      <VoxelSakuraTree position={[-13.5, 0.6, 7.5]} scale={1.25} />
      {/* Right Weeping Blossom Tree (near the bridge) */}
      <VoxelSakuraTree position={[13.0, 0.6, 8.0]} scale={1.35} isWeeping={true} />
      {/* Back Blossom Trees on Cliffs */}
      <VoxelSakuraTree position={[-14.0, 2.4, -6.5]} scale={1.1} />
      <VoxelSakuraTree position={[14.5, 2.4, -5.5]} scale={1.15} />

      {/* Floating Sakura Petals Drifting across the office */}
      <SakuraPetalShower />
    </group>
  )
}
