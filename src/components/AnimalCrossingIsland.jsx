import React, { Suspense } from 'react'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import ModelProp from './ModelProp'

export default function AnimalCrossingIsland({ counts, showLabels = true, onOpenBulletin }) {
  // 16 Desks on Tier 2:
  const tier2Desks = [
    // Left Wing Back (Akademik)
    { id: 'luna', pos: [-5.5, 2.3, -3.0], color: '#9d71e8' },
    { id: 'kutu', pos: [-3.5, 2.3, -3.0], color: '#c49b71' },
    { id: 'crayon', pos: [-1.5, 2.3, -3.0], color: '#ffb347' },
    { id: 'kucing', pos: [-4.5, 2.3, -1.2], color: '#ffa07a' },
    { id: 'mata', pos: [-2.5, 2.3, -1.2], color: '#38bdf8' },

    // Left Wing Front (BIM & Konstruksi)
    { id: 'kaktus', pos: [-5.5, 2.3, 0.5], color: '#4ade80' },
    { id: 'tabrak', pos: [-3.5, 2.3, 0.5], color: '#d7ccc8' },
    { id: 'cuan', pos: [-1.5, 2.3, 0.5], color: '#fffbeb' },

    // Right Wing Back (Quant & Trading)
    { id: 'masamba', pos: [1.5, 2.3, -3.0], color: '#64748b' },
    { id: 'lilin', pos: [3.5, 2.3, -3.0], color: '#c2410c' },
    { id: 'bandar', pos: [5.5, 2.3, -3.0], color: '#334155' },
    { id: 'botik', pos: [2.5, 2.3, -1.2], color: '#84cc16' },
    { id: 'rem', pos: [4.5, 2.3, -1.2], color: '#14b8a6' },

    // Right Wing Front (Web & Software)
    { id: 'mochi', pos: [1.5, 2.3, 0.5], color: '#fbbf24' },
    { id: 'piksel', pos: [3.5, 2.3, 0.5], color: '#78716c' },
    { id: 'kunci', pos: [5.5, 2.3, 0.5], color: '#64748b' },
  ]

  return (
    <group>
      {/* ============================================================== */}
      {/* 1. NATURAL CLIFFS & BASE ELEVATION                             */}
      {/* ============================================================== */}
      
      {/* River Basin at front */}
      <mesh position={[0, -0.4, 11]} receiveShadow>
        <boxGeometry args={[32, 0.4, 8]} />
        <meshStandardMaterial color="#5ab3e8" roughness={0.15} metalness={0.1} />
      </mesh>

      {/* Tier 1: Front Garden / The Roost Lawn (Y: 0.6, Z: 5.5) */}
      <group position={[0, 0, 5.5]}>
        <mesh position={[0, 0.3, 0]} receiveShadow castShadow>
          <boxGeometry args={[20, 0.6, 7]} />
          <meshStandardMaterial color="#cfa170" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.61, 0]} receiveShadow>
          <boxGeometry args={[20.1, 0.05, 7.1]} />
          <meshStandardMaterial color="#7ec850" roughness={0.8} />
        </mesh>
      </group>

      {/* Tier 2: Lower Terrace (Book Library Maze) (Y: 2.2, Z: -1.2) */}
      <group position={[0, 0, -1.2]}>
        <mesh position={[0, 1.1, 0]} receiveShadow castShadow>
          <boxGeometry args={[18, 2.2, 7.8]} />
          <meshStandardMaterial color="#cfa170" roughness={0.9} />
        </mesh>
        <mesh position={[0, 2.21, 0]} receiveShadow>
          <boxGeometry args={[18.1, 0.05, 7.9]} />
          <meshStandardMaterial color="#7ec850" roughness={0.8} />
        </mesh>
        {/* Warm Terracotta / Wood Floor */}
        <mesh position={[0, 2.26, 0]} receiveShadow castShadow>
          <boxGeometry args={[17.4, 0.08, 7.2]} />
          <meshStandardMaterial color="#b5651d" roughness={0.6} />
        </mesh>
      </group>

      {/* Tier 3: Upper Terrace (Executive Hedge Lounge) (Y: 4.2, Z: -8.2) */}
      <group position={[0, 0, -8.2]}>
        <mesh position={[0, 2.1, 0]} receiveShadow castShadow>
          <boxGeometry args={[18, 4.2, 6.8]} />
          <meshStandardMaterial color="#cfa170" roughness={0.9} />
        </mesh>
        <mesh position={[0, 4.21, 0]} receiveShadow>
          <boxGeometry args={[18.1, 0.05, 6.9]} />
          <meshStandardMaterial color="#7ec850" roughness={0.8} />
        </mesh>
        {/* Upper Lounge Warm Wood Floor */}
        <mesh position={[0, 4.26, 0]} receiveShadow castShadow>
          <boxGeometry args={[17.4, 0.08, 6.2]} />
          <meshStandardMaterial color="#c68b59" roughness={0.5} />
        </mesh>
      </group>

      {/* Far Right Raised Cliff with Telescope */}
      <group position={[8.0, 0, -5]}>
        <mesh position={[0, 2.8, 0]} receiveShadow castShadow>
          <boxGeometry args={[2.8, 5.6, 12]} />
          <meshStandardMaterial color="#cfa170" roughness={0.9} />
        </mesh>
        <mesh position={[0, 5.61, 0]} receiveShadow>
          <boxGeometry args={[2.9, 0.05, 12.1]} />
          <meshStandardMaterial color="#7ec850" roughness={0.8} />
        </mesh>
        {/* White Telescope */}
        <mesh position={[0, 6.2, -4]} rotation={[0.4, -0.3, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.08, 0.9, 10]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.4} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 2. ROOM DIVISION A: HEDGE WALLS (PEMBAGIAN RUANGAN LOUNGE)    */}
      {/* ============================================================== */}
      <group position={[0, 4.3, -8.2]}>
        {/* Back Hedge Wall */}
        <mesh position={[-0.8, 0.65, -3.2]} castShadow receiveShadow>
          <boxGeometry args={[15.0, 1.3, 0.7]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
        </mesh>

        {/* Left Hedge Wall */}
        <mesh position={[-8.0, 0.65, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.7, 1.3, 6.4]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
        </mesh>

        {/* Front Dividing Hedge Wall (with opening for right stairs) */}
        <mesh position={[-4.2, 0.65, 3.2]} castShadow receiveShadow>
          <boxGeometry args={[8.4, 1.3, 0.7]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
        </mesh>
        <mesh position={[2.0, 0.65, 3.2]} castShadow receiveShadow>
          <boxGeometry args={[2.4, 1.3, 0.7]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 3. WOODEN INCLINE STAIRS (NO CLIPPING PATHS)                   */}
      {/* ============================================================== */}
      {/* Stairway 2: Connecting Tier 2 to Tier 3 on the Right (X: 5.4) */}
      <group position={[5.4, 2.3, -4.5]}>
        {[0, 1, 2, 3, 4, 5, 6].map(step => (
          <mesh
            key={step}
            position={[0, step * 0.28 + 0.14, -step * 0.38]}
            receiveShadow
            castShadow
          >
            <boxGeometry args={[2.4, 0.18, 0.44]} />
            <meshStandardMaterial color="#d4a373" roughness={0.6} />
          </mesh>
        ))}
      </group>

      {/* Stairway 1: Connecting Tier 1 to Tier 2 in Center (X: 0) */}
      <group position={[0, 0.6, 1.7]}>
        {[0, 1, 2, 3, 4, 5].map(step => (
          <mesh
            key={step}
            position={[0, step * 0.28 + 0.14, -step * 0.35]}
            receiveShadow
            castShadow
          >
            <boxGeometry args={[2.4, 0.16, 0.42]} />
            <meshStandardMaterial color="#d4a373" roughness={0.6} />
          </mesh>
        ))}
      </group>

      {/* ============================================================== */}
      {/* 4. UPPER LOUNGE (EXECUTIVE DESK, FIREPLACE & COZY SEATING)     */}
      {/* ============================================================== */}
      <group position={[0, 4.3, -8.2]}>
        {/* Brick Fireplace */}
        <group position={[0, 0, -2.5]}>
          <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.0, 1.4, 0.8]} />
            <meshStandardMaterial color="#9c4a36" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.45, 0.25]}>
            <boxGeometry args={[1.0, 0.7, 0.5]} />
            <meshBasicMaterial color="#111827" />
          </mesh>
          <pointLight position={[0, 0.5, 0.3]} color="#ff7b00" intensity={2.5} distance={3} />
          <mesh position={[0, 1.5, 0]} castShadow>
            <boxGeometry args={[0.5, 0.2, 0.3]} />
            <meshStandardMaterial color="#2a9d8f" />
          </mesh>
        </group>

        {/* Executive Boss Desk for @Ai with Glowing Laptop */}
        <group position={[0, 0, -1.0]}>
          <ModelProp url="./models/desk.glb" scale={1.4} />
          <ModelProp url="./models/chairModernCushion.glb" position={[0, 0, -0.6]} scale={1.4} />
          
          {/* Executive Glowing Pink Laptop */}
          <group position={[0, 0.72, 0.1]}>
            <mesh position={[0, 0.015, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.52, 0.025, 0.36]} />
              <meshStandardMaterial color="#f472b6" metalness={0.6} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.028, 0.09]}>
              <planeGeometry args={[0.16, 0.08]} />
              <meshBasicMaterial color="#fbcfe8" />
            </mesh>
            <mesh position={[0, 0.028, -0.05]}>
              <planeGeometry args={[0.46, 0.16]} />
              <meshBasicMaterial color="#374151" />
            </mesh>

            {/* Laptop Screen Tilted */}
            <group position={[0, 0.025, -0.17]} rotation={[-0.35, 0, 0]}>
              <mesh position={[0, 0.17, 0]} castShadow>
                <boxGeometry args={[0.52, 0.34, 0.02]} />
                <meshStandardMaterial color="#ec4899" metalness={0.7} roughness={0.2} />
              </mesh>
              <mesh position={[0, 0.17, 0.012]}>
                <planeGeometry args={[0.48, 0.30]} />
                <meshBasicMaterial color="#f43f5e" />
              </mesh>
              <pointLight position={[0, 0.17, 0.15]} color="#f472b6" intensity={1.8} distance={2.0} />
            </group>
          </group>
        </group>

        {/* Lounge Seating Left: Coffee Table & Armchairs */}
        <group position={[-3.5, 0, 0]}>
          <ModelProp url="./models/tableCoffee.glb" position={[0, 0, 0]} scale={1.6} />
          <ModelProp url="./models/chairModernCushion.glb" position={[-1.4, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={1.4} />
          <ModelProp url="./models/chairModernCushion.glb" position={[1.4, 0, 0]} rotation={[0, -Math.PI / 2, 0]} scale={1.4} />
        </group>

        {/* Lounge Lamp & Coat Rack Right */}
        <ModelProp url="./models/lampRoundFloor.glb" position={[3.6, 0, -1.8]} scale={1.5} />
        <group position={[3.8, 0, 1.0]}>
          <mesh position={[0, 0.9, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.05, 1.8, 8]} />
            <meshStandardMaterial color="#5c3a21" />
          </mesh>
          <mesh position={[0, 1.7, 0]} rotation={[0.2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.26, 0.18, 0.12, 14]} />
            <meshStandardMaterial color="#fefae0" roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* ============================================================== */}
      {/* 5. TIER 2: BOOKCASE MAZE & 16 DEDICATED DESKS WITH LAPTOPS     */}
      {/* ============================================================== */}
      <group position={[0, 2.3, 0]}>
        {/* Perimeter & Maze Dividing Bookcases */}
        <group position={[0, 0, -1.2]}>
          {/* Back Row Bookcases */}
          <ModelProp url="./models/bookcaseClosedWide.glb" position={[-6.8, 0, -2.6]} scale={1.5} />
          <ModelProp url="./models/bookcaseOpen.glb" position={[-4.5, 0, -2.6]} scale={1.5} />
          <ModelProp url="./models/bookcaseClosedWide.glb" position={[-2.5, 0, -2.6]} scale={1.5} />
          <ModelProp url="./models/bookcaseClosedWide.glb" position={[2.5, 0, -2.6]} scale={1.5} />
          <ModelProp url="./models/bookcaseOpen.glb" position={[4.5, 0, -2.6]} scale={1.5} />
          <ModelProp url="./models/bookcaseClosedWide.glb" position={[6.8, 0, -2.6]} scale={1.5} />

          {/* L-Shaped Divider Bookcases */}
          <ModelProp url="./models/bookcaseOpen.glb" position={[-3.5, 0, -0.9]} rotation={[0, Math.PI / 2, 0]} scale={1.5} />
          <ModelProp url="./models/bookcaseClosedWide.glb" position={[3.5, 0, -0.9]} rotation={[0, Math.PI / 2, 0]} scale={1.5} />
          <ModelProp url="./models/bookcaseOpen.glb" position={[-3.5, 0, 0.8]} rotation={[0, Math.PI / 2, 0]} scale={1.5} />
          <ModelProp url="./models/bookcaseClosedWide.glb" position={[3.5, 0, 0.8]} rotation={[0, Math.PI / 2, 0]} scale={1.5} />
        </group>

        {/* 16 Real Desks, Chairs, and Laptops */}
        {tier2Desks.map(d => (
          <group key={d.id} position={[d.pos[0], 0, d.pos[2]]}>
            <ModelProp url="./models/desk.glb" scale={1.25} />
            <ModelProp url="./models/chairDesk.glb" position={[0, 0, -0.42]} rotation={[0, 0, 0]} scale={1.25} />

            {/* Glowing Laptop on Each Desk */}
            <group position={[0, 0.68, 0.08]}>
              {/* Laptop base */}
              <mesh position={[0, 0.012, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.48, 0.02, 0.32]} />
                <meshStandardMaterial color="#cbd5e1" metalness={0.6} roughness={0.3} />
              </mesh>
              {/* Keyboard */}
              <mesh position={[0, 0.024, -0.04]}>
                <planeGeometry args={[0.42, 0.14]} />
                <meshBasicMaterial color="#1e293b" />
              </mesh>
              {/* Trackpad */}
              <mesh position={[0, 0.024, 0.09]}>
                <planeGeometry args={[0.15, 0.07]} />
                <meshBasicMaterial color="#94a3b8" />
              </mesh>

              {/* Tilted Laptop Screen with Glowing Code */}
              <group position={[0, 0.02, -0.15]} rotation={[-0.32, 0, 0]}>
                <mesh position={[0, 0.15, 0]} castShadow>
                  <boxGeometry args={[0.48, 0.30, 0.018]} />
                  <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.3} />
                </mesh>
                <mesh position={[0, 0.15, 0.011]}>
                  <planeGeometry args={[0.44, 0.26]} />
                  <meshBasicMaterial color="#10b981" />
                </mesh>
                <pointLight position={[0, 0.15, 0.12]} color="#34d399" intensity={1.2} distance={1.4} />
              </group>
            </group>

            {/* Cute Ceramic Coffee Mug on Corner of Desk */}
            <mesh position={[0.26, 0.68, -0.05]} castShadow>
              <cylinderGeometry args={[0.045, 0.04, 0.1, 10]} />
              <meshStandardMaterial color="#ffffff" roughness={0.3} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ============================================================== */}
      {/* 6. TIER 1: THE ROOST CAFE (FRONT PATIO & LAWN)                 */}
      {/* ============================================================== */}
      <group position={[0, 0.6, 5.0]}>
        {/* Mahogany Coffee Bar Counter */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[8.0, 0.9, 1.4]} />
          <meshStandardMaterial color="#3b1d0a" roughness={0.4} />
        </mesh>
        {/* 5 Coffee Bar Stools */}
        {[-3, -1.5, 0, 1.5, 3].map((mx, idx) => (
          <group key={`stool-${idx}`} position={[mx, 0, -1.0]}>
            <mesh position={[0, 0.32, 0]} castShadow>
              <cylinderGeometry args={[0.22, 0.22, 0.06, 14]} />
              <meshStandardMaterial color="#8b5a2b" roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.15, 0]} castShadow>
              <cylinderGeometry args={[0.04, 0.05, 0.3, 8]} />
              <meshStandardMaterial color="#1f2937" metalness={0.8} />
            </mesh>
          </group>
        ))}

        {/* Steaming Ceramic Mugs on Bar Counter */}
        {[-2.5, -1.2, 0, 1.2, 2.5].map((cx, idx) => (
          <group key={`mug-${idx}`} position={[cx, 0.96, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.07, 0.06, 0.12, 10]} />
              <meshStandardMaterial color="#ffffff" roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.05, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.01, 8]} />
              <meshBasicMaterial color="#6f4e37" />
            </mesh>
          </group>
        ))}

        {/* Cafe Lounge Table 1 (Left Wing Patio) */}
        <group position={[-4.2, 0, 1.9]}>
          <ModelProp url="./models/tableCoffee.glb" scale={1.5} />
          <ModelProp url="./models/chairModernCushion.glb" position={[-1.2, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={1.3} />
          <ModelProp url="./models/chairModernCushion.glb" position={[1.2, 0, 0]} rotation={[0, -Math.PI / 2, 0]} scale={1.3} />
          <ModelProp url="./models/chairModernCushion.glb" position={[0, 0, -1.0]} rotation={[0, 0, 0]} scale={1.3} />
          <ModelProp url="./models/chairModernCushion.glb" position={[0, 0, 1.0]} rotation={[0, Math.PI, 0]} scale={1.3} />
        </group>

        {/* Cafe Lounge Table 2 (Right Wing Patio) */}
        <group position={[3.8, 0, 1.9]}>
          <ModelProp url="./models/tableCoffee.glb" scale={1.5} />
          <ModelProp url="./models/chairModernCushion.glb" position={[-1.2, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={1.3} />
          <ModelProp url="./models/chairModernCushion.glb" position={[1.2, 0, 0]} rotation={[0, -Math.PI / 2, 0]} scale={1.3} />
          <ModelProp url="./models/chairModernCushion.glb" position={[0, 0, -1.0]} rotation={[0, 0, 0]} scale={1.3} />
          <ModelProp url="./models/chairModernCushion.glb" position={[0, 0, 1.0]} rotation={[0, Math.PI, 0]} scale={1.3} />
        </group>

        {/* Picnic Bench on the Lawn Overlooking River */}
        <group position={[-7.0, 0, -0.5]} rotation={[0, Math.PI / 4, 0]}>
          <ModelProp url="./models/benchCushion.glb" scale={1.4} />
        </group>

        {/* Low Hedge Bordering the River */}
        <mesh position={[-5.5, 0.4, 2.6]} castShadow receiveShadow>
          <boxGeometry args={[5.2, 0.8, 0.5]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
        </mesh>
        <mesh position={[5.5, 0.4, 2.6]} castShadow receiveShadow>
          <boxGeometry args={[5.2, 0.8, 0.5]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 7. INTERACTIVE CORK BULLETIN BOARD (LAWN)                     */}
      {/* ============================================================== */}
      <group
        position={[7.0, 0.6, 3.8]}
        rotation={[0, -Math.PI / 6, 0]}
        onClick={(e) => {
          e.stopPropagation()
          onOpenBulletin?.()
        }}
        cursor="pointer"
      >
        <mesh position={[-0.7, 0.8, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.07, 1.6, 8]} />
          <meshStandardMaterial color="#6f4e37" roughness={0.8} />
        </mesh>
        <mesh position={[0.7, 0.8, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.07, 1.6, 8]} />
          <meshStandardMaterial color="#6f4e37" roughness={0.8} />
        </mesh>
        <mesh position={[0, 1.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.7, 1.0, 0.08]} />
          <meshStandardMaterial color="#8b5a2b" roughness={0.7} />
        </mesh>
        <mesh position={[0, 1.3, 0.045]}>
          <planeGeometry args={[1.5, 0.8]} />
          <meshStandardMaterial color="#d4a373" roughness={0.9} />
        </mesh>
        <mesh position={[-0.3, 1.35, 0.055]}>
          <planeGeometry args={[0.45, 0.45]} />
          <meshBasicMaterial color="#fefae0" />
        </mesh>
        <mesh position={[-0.3, 1.55, 0.065]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>

        {showLabels && (
          <Html position={[0, 2.1, 0]} center distanceFactor={14}>
            <div className="px-2 py-0.5 rounded-full bg-[#fef9e7] border border-[#8b5a2b] shadow-sm text-[10px] font-black text-[#5c3a21] cursor-pointer hover:scale-105 transition-all">
              📌 Papan Buletin Harian
            </div>
          </Html>
        )}
      </group>

      {/* ============================================================== */}
      {/* 8. 3D GLB TREES SURROUNDING THE CLIFFS                         */}
      {/* ============================================================== */}
      <group>
        <ModelProp url="./models/tree_oak.glb" position={[-9.5, 4.3, -9.5]} scale={2.2} />
        <ModelProp url="./models/tree_cone_dark.glb" position={[-9.2, 2.3, -3.5]} scale={2.0} />
        <ModelProp url="./models/tree_cone.glb" position={[-10, 0.6, 4.5]} scale={2.0} />
        <ModelProp url="./models/tree_oak.glb" position={[9.5, 0.6, 4.5]} scale={2.0} />
        <ModelProp url="./models/plant_bush.glb" position={[-4, 0.6, 7.5]} scale={1.8} />
        <ModelProp url="./models/plant_bush.glb" position={[4, 0.6, 7.5]} scale={1.8} />
      </group>

      {/* ============================================================== */}
      {/* 9. 3D HTML ZONE LABELS (WHEN UNLOCKED)                         */}
      {/* ============================================================== */}
      {showLabels && (
        <>
          <Html position={[0, 8.2, -8.2]} center distanceFactor={18}>
            <div className="px-3 py-1 rounded-full bg-[#fef9e7] border-2 border-[#5c3a21] shadow-[0_3px_0_#5c3a21] text-[#5c3a21] text-xs font-black flex items-center gap-1.5 whitespace-nowrap pointer-events-none select-none">
              <span>🌿</span> Ruang Bos & Hedge Lounge (@Ai)
            </div>
          </Html>

          <Html position={[0, 5.0, -1.2]} center distanceFactor={18}>
            <div className="px-3 py-1 rounded-full bg-[#e0f5f0] border-2 border-[#286f63] shadow-[0_3px_0_#286f63] text-[#1b4b41] text-xs font-black flex items-center gap-1.5 whitespace-nowrap pointer-events-none select-none">
              <span>📚</span> Library Maze & Studio ({counts.working} kerja)
            </div>
          </Html>

          <Html position={[0, 2.6, 5.0]} center distanceFactor={18}>
            <div className="px-3 py-1 rounded-full bg-[#fef3c7] border-2 border-[#92400e] shadow-[0_3px_0_#92400e] text-[#92400e] text-xs font-black flex items-center gap-1.5 whitespace-nowrap pointer-events-none select-none">
              <span>☕</span> The Roost Cafe ({counts.standby} santai)
            </div>
          </Html>
        </>
      )}
    </group>
  )
}
