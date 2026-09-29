import React, { Suspense } from 'react'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import ModelProp from './ModelProp'

export default function AnimalCrossingIsland({ counts, showLabels = true, onOpenBulletin }) {
  // 16 Spacious Desks on Tier 2:
  const tier2Desks = [
    // Divisi 01 Akademik (Far Left Wing)
    { id: 'luna', pos: [-10.0, 2.4, -7.5], color: '#9d71e8' },
    { id: 'kutu', pos: [-6.5, 2.4, -7.5], color: '#c49b71' },
    { id: 'crayon', pos: [-10.0, 2.4, -3.5], color: '#ffb347' },
    { id: 'kucing', pos: [-6.5, 2.4, -3.5], color: '#ffa07a' },
    { id: 'mata', pos: [-8.25, 2.4, 0.5], color: '#38bdf8' },

    // Divisi 03 BIM & Konstruksi (Center-Left Wing)
    { id: 'kaktus', pos: [-2.5, 2.4, -7.5], color: '#4ade80' },
    { id: 'tabrak', pos: [-2.5, 2.4, -3.5], color: '#d7ccc8' },
    { id: 'cuan', pos: [-2.5, 2.4, 0.5], color: '#fffbeb' },

    // Divisi 04 Trading & Quant (Center-Right Wing)
    { id: 'masamba', pos: [2.5, 2.4, -7.5], color: '#64748b' },
    { id: 'lilin', pos: [2.5, 2.4, -3.5], color: '#c2410c' },
    { id: 'bandar', pos: [2.5, 2.4, 0.5], color: '#334155' },

    // Divisi 02 Web & Software (Far Right Wing)
    { id: 'mochi', pos: [6.5, 2.4, -7.5], color: '#fbbf24' },
    { id: 'piksel', pos: [10.0, 2.4, -7.5], color: '#78716c' },
    { id: 'kunci', pos: [6.5, 2.4, -3.5], color: '#64748b' },
    { id: 'botik', pos: [10.0, 2.4, -3.5], color: '#84cc16' },
    { id: 'rem', pos: [8.25, 2.4, 0.5], color: '#14b8a6' },
  ]

  return (
    <group>
      {/* ============================================================== */}
      {/* 1. NATURAL CLIFFS & BASE ELEVATION (SPACIOUS DIORAMA)          */}
      {/* ============================================================== */}
      
      {/* Tier 1: Front Garden & The Roost Lawn (Y: 0.6, Z: 8.5) */}
      <group position={[0, 0, 8.5]}>
        <mesh position={[0, 0.3, 0]} receiveShadow castShadow>
          <boxGeometry args={[36, 0.6, 12]} />
          <meshStandardMaterial color="#cfa170" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.61, 0]} receiveShadow>
          <boxGeometry args={[36.1, 0.05, 12.1]} />
          <meshStandardMaterial color="#7ec850" roughness={0.8} />
        </mesh>
      </group>

      {/* Tier 2: Lower Terrace (Book Library Maze Studio) (Y: 2.4, Z: -3.5) */}
      <group position={[0, 0, -3.5]}>
        <mesh position={[0, 1.2, 0]} receiveShadow castShadow>
          <boxGeometry args={[32, 2.4, 15]} />
          <meshStandardMaterial color="#cfa170" roughness={0.9} />
        </mesh>
        <mesh position={[0, 2.41, 0]} receiveShadow>
          <boxGeometry args={[32.1, 0.05, 15.1]} />
          <meshStandardMaterial color="#7ec850" roughness={0.8} />
        </mesh>
        {/* Warm Terracotta / Wood Floor */}
        <mesh position={[0, 2.46, 0]} receiveShadow castShadow>
          <boxGeometry args={[31.4, 0.08, 14.4]} />
          <meshStandardMaterial color="#b5651d" roughness={0.6} />
        </mesh>
      </group>

      {/* Tier 3: Upper Terrace (Executive Hedge Lounge) (Y: 4.6, Z: -17.0) */}
      <group position={[0, 0, -17.0]}>
        <mesh position={[0, 2.3, 0]} receiveShadow castShadow>
          <boxGeometry args={[28, 4.6, 14]} />
          <meshStandardMaterial color="#cfa170" roughness={0.9} />
        </mesh>
        <mesh position={[0, 4.61, 0]} receiveShadow>
          <boxGeometry args={[28.1, 0.05, 14.1]} />
          <meshStandardMaterial color="#7ec850" roughness={0.8} />
        </mesh>
        {/* Upper Lounge Warm Wood Floor */}
        <mesh position={[0, 4.66, 0]} receiveShadow castShadow>
          <boxGeometry args={[27.4, 0.08, 13.4]} />
          <meshStandardMaterial color="#c68b59" roughness={0.5} />
        </mesh>
      </group>

      {/* Far Right Raised Cliff with Telescope */}
      <group position={[14.5, 0, -12]}>
        <mesh position={[0, 3.2, 0]} receiveShadow castShadow>
          <boxGeometry args={[3.2, 6.4, 18]} />
          <meshStandardMaterial color="#cfa170" roughness={0.9} />
        </mesh>
        <mesh position={[0, 6.41, 0]} receiveShadow>
          <boxGeometry args={[3.3, 0.05, 18.1]} />
          <meshStandardMaterial color="#7ec850" roughness={0.8} />
        </mesh>
        {/* White Telescope */}
        <mesh position={[0, 7.0, -4]} rotation={[0.4, -0.3, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 1.2, 10]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.5} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 2. ROOM DIVISION A: TALL HEDGE WALLS (LOUNGE ENCLOSURE)       */}
      {/* ============================================================== */}
      <group position={[0, 4.6, -17.0]}>
        {/* Back Hedge Wall */}
        <mesh position={[0, 0.8, -6.6]} castShadow receiveShadow>
          <boxGeometry args={[26.5, 1.6, 0.8]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
        </mesh>

        {/* Left Hedge Wall */}
        <mesh position={[-13.2, 0.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.8, 1.6, 13.5]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
        </mesh>

        {/* Front Dividing Hedge Wall (with wide entrance on right) */}
        <mesh position={[-5.0, 0.8, 6.6]} castShadow receiveShadow>
          <boxGeometry args={[16.0, 1.6, 0.8]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
        </mesh>
        <mesh position={[8.5, 0.8, 6.6]} castShadow receiveShadow>
          <boxGeometry args={[5.0, 1.6, 0.8]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 3. WOODEN INCLINE STAIRS                                       */}
      {/* ============================================================== */}
      {/* Stairway 2: Connecting Tier 2 to Tier 3 on the Right (X: 11.5) */}
      <group position={[11.5, 2.4, -11.0]}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map(step => (
          <mesh
            key={step}
            position={[0, step * 0.28 + 0.14, -step * 0.38]}
            receiveShadow
            castShadow
          >
            <boxGeometry args={[3.2, 0.18, 0.44]} />
            <meshStandardMaterial color="#d4a373" roughness={0.6} />
          </mesh>
        ))}
      </group>

      {/* Stairway 1: Connecting Tier 1 to Tier 2 in Center (X: 0) */}
      <group position={[0, 0.6, 3.2]}>
        {[0, 1, 2, 3, 4, 5, 6].map(step => (
          <mesh
            key={step}
            position={[0, step * 0.28 + 0.14, -step * 0.35]}
            receiveShadow
            castShadow
          >
            <boxGeometry args={[3.2, 0.16, 0.42]} />
            <meshStandardMaterial color="#d4a373" roughness={0.6} />
          </mesh>
        ))}
      </group>

      {/* ============================================================== */}
      {/* 4. UPPER LOUNGE (EXECUTIVE DESK, FIREPLACE & COZY SEATING)     */}
      {/* ============================================================== */}
      <group position={[0, 4.6, -17.0]}>
        {/* Brick Fireplace */}
        <group position={[0, 0, -5.5]}>
          <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.6, 1.8, 1.0]} />
            <meshStandardMaterial color="#9c4a36" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.55, 0.35]}>
            <boxGeometry args={[1.3, 0.9, 0.6]} />
            <meshBasicMaterial color="#111827" />
          </mesh>
          <pointLight position={[0, 0.6, 0.5]} color="#ff7b00" intensity={3.0} distance={4} />
          <mesh position={[0, 1.9, 0]} castShadow>
            <boxGeometry args={[0.7, 0.3, 0.4]} />
            <meshStandardMaterial color="#2a9d8f" />
          </mesh>
        </group>

        {/* Executive Boss Desk for @Ai with Glowing Pink Laptop */}
        <group position={[0, 0, 1.5]}>
          <ModelProp url="./models/desk.glb" scale={1.5} />
          <ModelProp url="./models/chairModernCushion.glb" position={[0, 0, -0.75]} scale={1.5} />
          
          {/* Executive Laptop on Desk */}
          <group position={[0, 0.76, 0.12]}>
            <mesh position={[0, 0.015, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.56, 0.025, 0.38]} />
              <meshStandardMaterial color="#f472b6" metalness={0.6} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.028, 0.1]}>
              <planeGeometry args={[0.18, 0.09]} />
              <meshBasicMaterial color="#fbcfe8" />
            </mesh>
            <mesh position={[0, 0.028, -0.06]}>
              <planeGeometry args={[0.48, 0.18]} />
              <meshBasicMaterial color="#374151" />
            </mesh>

            {/* Laptop Screen Tilted */}
            <group position={[0, 0.025, -0.18]} rotation={[-0.35, 0, 0]}>
              <mesh position={[0, 0.18, 0]} castShadow>
                <boxGeometry args={[0.56, 0.36, 0.02]} />
                <meshStandardMaterial color="#ec4899" metalness={0.7} roughness={0.2} />
              </mesh>
              <mesh position={[0, 0.18, 0.012]}>
                <planeGeometry args={[0.52, 0.32]} />
                <meshBasicMaterial color="#f43f5e" />
              </mesh>
              <pointLight position={[0, 0.18, 0.15]} color="#f472b6" intensity={2.0} distance={2.5} />
            </group>
          </group>
        </group>

        {/* Lounge Seating Left: Coffee Table & Armchairs */}
        <group position={[-5.5, 0, 1.5]}>
          <ModelProp url="./models/tableCoffee.glb" position={[0, 0, 0]} scale={1.8} />
          <ModelProp url="./models/chairModernCushion.glb" position={[-1.6, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={1.5} />
          <ModelProp url="./models/chairModernCushion.glb" position={[1.6, 0, 0]} rotation={[0, -Math.PI / 2, 0]} scale={1.5} />
        </group>

        {/* Floor Lamp & Coat Rack */}
        <ModelProp url="./models/lampRoundFloor.glb" position={[5.5, 0, -3.5]} scale={1.6} />
        <group position={[5.5, 0, 1.5]}>
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
      {/* 5. TIER 2: BOOKCASE MAZE & 16 SPACIOUS DESKS WITH LAPTOPS      */}
      {/* ============================================================== */}
      <group position={[0, 2.4, 0]}>
        {/* Perimeter & Maze Dividing Bookcases */}
        <group position={[0, 0, -3.5]}>
          {/* Back Row Bookcases */}
          <ModelProp url="./models/bookcaseClosedWide.glb" position={[-12.0, 0, -6.5]} scale={1.6} />
          <ModelProp url="./models/bookcaseOpen.glb" position={[-8.5, 0, -6.5]} scale={1.6} />
          <ModelProp url="./models/bookcaseClosedWide.glb" position={[-4.5, 0, -6.5]} scale={1.6} />
          <ModelProp url="./models/bookcaseClosedWide.glb" position={[4.5, 0, -6.5]} scale={1.6} />
          <ModelProp url="./models/bookcaseOpen.glb" position={[8.5, 0, -6.5]} scale={1.6} />
          <ModelProp url="./models/bookcaseClosedWide.glb" position={[12.0, 0, -6.5]} scale={1.6} />

          {/* Departmental Divider Bookcases */}
          <ModelProp url="./models/bookcaseOpen.glb" position={[-4.5, 0, -2.0]} rotation={[0, Math.PI / 2, 0]} scale={1.6} />
          <ModelProp url="./models/bookcaseClosedWide.glb" position={[4.5, 0, -2.0]} rotation={[0, Math.PI / 2, 0]} scale={1.6} />
          <ModelProp url="./models/bookcaseOpen.glb" position={[-4.5, 0, 2.5]} rotation={[0, Math.PI / 2, 0]} scale={1.6} />
          <ModelProp url="./models/bookcaseClosedWide.glb" position={[4.5, 0, 2.5]} rotation={[0, Math.PI / 2, 0]} scale={1.6} />
        </group>

        {/* 16 Real Desks, Chairs, and Laptops with Generous Spacing */}
        {tier2Desks.map(d => (
          <group key={d.id} position={[d.pos[0], 0, d.pos[2]]}>
            <ModelProp url="./models/desk.glb" scale={1.35} />
            <ModelProp url="./models/chairDesk.glb" position={[0, 0, -0.72]} rotation={[0, 0, 0]} scale={1.35} />

            {/* Glowing Laptop on Each Desk */}
            <group position={[0, 0.74, 0.1]}>
              {/* Laptop base */}
              <mesh position={[0, 0.012, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.52, 0.02, 0.35]} />
                <meshStandardMaterial color="#cbd5e1" metalness={0.6} roughness={0.3} />
              </mesh>
              {/* Keyboard */}
              <mesh position={[0, 0.024, -0.05]}>
                <planeGeometry args={[0.45, 0.15]} />
                <meshBasicMaterial color="#1e293b" />
              </mesh>
              {/* Trackpad */}
              <mesh position={[0, 0.024, 0.1]}>
                <planeGeometry args={[0.16, 0.08]} />
                <meshBasicMaterial color="#94a3b8" />
              </mesh>

              {/* Tilted Laptop Screen with Glowing Code */}
              <group position={[0, 0.02, -0.16]} rotation={[-0.32, 0, 0]}>
                <mesh position={[0, 0.16, 0]} castShadow>
                  <boxGeometry args={[0.52, 0.32, 0.018]} />
                  <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.3} />
                </mesh>
                <mesh position={[0, 0.16, 0.011]}>
                  <planeGeometry args={[0.48, 0.28]} />
                  <meshBasicMaterial color="#10b981" />
                </mesh>
                <pointLight position={[0, 0.16, 0.12]} color="#34d399" intensity={1.4} distance={1.6} />
              </group>
            </group>

            {/* Cute Ceramic Coffee Mug on Corner of Desk */}
            <mesh position={[0.32, 0.74, -0.06]} castShadow>
              <cylinderGeometry args={[0.05, 0.045, 0.11, 10]} />
              <meshStandardMaterial color="#ffffff" roughness={0.3} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ============================================================== */}
      {/* 6. TIER 1: THE ROOST CAFE (FRONT PATIO & LAWN)                 */}
      {/* ============================================================== */}
      <group position={[0, 0.6, 7.5]}>
        {/* Long Mahogany Coffee Bar Counter */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[11.0, 1.0, 1.6]} />
          <meshStandardMaterial color="#3b1d0a" roughness={0.4} />
        </mesh>
        
        {/* 6 Coffee Bar Stools */}
        {[-4, -2.4, -0.8, 0.8, 2.4, 4].map((mx, idx) => (
          <group key={`stool-${idx}`} position={[mx, 0, -1.2]}>
            <mesh position={[0, 0.35, 0]} castShadow>
              <cylinderGeometry args={[0.24, 0.24, 0.06, 14]} />
              <meshStandardMaterial color="#8b5a2b" roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.17, 0]} castShadow>
              <cylinderGeometry args={[0.04, 0.05, 0.34, 8]} />
              <meshStandardMaterial color="#1f2937" metalness={0.8} />
            </mesh>
          </group>
        ))}

        {/* Steaming Ceramic Mugs on Bar Counter */}
        {[-3.5, -1.8, 0, 1.8, 3.5].map((cx, idx) => (
          <group key={`mug-${idx}`} position={[cx, 1.06, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.075, 0.065, 0.13, 10]} />
              <meshStandardMaterial color="#ffffff" roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.055, 0]}>
              <cylinderGeometry args={[0.055, 0.055, 0.01, 8]} />
              <meshBasicMaterial color="#6f4e37" />
            </mesh>
          </group>
        ))}

        {/* Cafe Lounge Table 1 (Left Wing Patio) */}
        <group position={[-7.5, 0, 2.0]}>
          <ModelProp url="./models/tableCoffee.glb" scale={1.8} />
          <ModelProp url="./models/chairModernCushion.glb" position={[-1.4, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={1.4} />
          <ModelProp url="./models/chairModernCushion.glb" position={[1.4, 0, 0]} rotation={[0, -Math.PI / 2, 0]} scale={1.4} />
          <ModelProp url="./models/chairModernCushion.glb" position={[0, 0, -1.2]} rotation={[0, 0, 0]} scale={1.4} />
          <ModelProp url="./models/chairModernCushion.glb" position={[0, 0, 1.2]} rotation={[0, Math.PI, 0]} scale={1.4} />
        </group>

        {/* Cafe Lounge Table 2 (Right Wing Patio) */}
        <group position={[7.5, 0, 2.0]}>
          <ModelProp url="./models/tableCoffee.glb" scale={1.8} />
          <ModelProp url="./models/chairModernCushion.glb" position={[-1.4, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={1.4} />
          <ModelProp url="./models/chairModernCushion.glb" position={[1.4, 0, 0]} rotation={[0, -Math.PI / 2, 0]} scale={1.4} />
          <ModelProp url="./models/chairModernCushion.glb" position={[0, 0, -1.2]} rotation={[0, 0, 0]} scale={1.4} />
          <ModelProp url="./models/chairModernCushion.glb" position={[0, 0, 1.2]} rotation={[0, Math.PI, 0]} scale={1.4} />
        </group>

        {/* Picnic Benches on the Lawn */}
        <group position={[-12.0, 0, -1.5]} rotation={[0, Math.PI / 3, 0]}>
          <ModelProp url="./models/benchCushion.glb" scale={1.6} />
        </group>
        <group position={[12.0, 0, -1.5]} rotation={[0, -Math.PI / 3, 0]}>
          <ModelProp url="./models/benchCushion.glb" scale={1.6} />
        </group>

        {/* Low Hedge Bordering the Front */}
        <mesh position={[-9.5, 0.4, 3.6]} castShadow receiveShadow>
          <boxGeometry args={[9.0, 0.8, 0.6]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
        </mesh>
        <mesh position={[9.5, 0.4, 3.6]} castShadow receiveShadow>
          <boxGeometry args={[9.0, 0.8, 0.6]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 7. INTERACTIVE CORK BULLETIN BOARD (LAWN)                     */}
      {/* ============================================================== */}
      <group
        position={[11.5, 0.6, 5.0]}
        rotation={[0, -Math.PI / 6, 0]}
        onClick={(e) => {
          e.stopPropagation()
          onOpenBulletin?.()
        }}
        cursor="pointer"
      >
        <mesh position={[-0.8, 0.9, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.08, 1.8, 8]} />
          <meshStandardMaterial color="#6f4e37" roughness={0.8} />
        </mesh>
        <mesh position={[0.8, 0.9, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.08, 1.8, 8]} />
          <meshStandardMaterial color="#6f4e37" roughness={0.8} />
        </mesh>
        <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 1.2, 0.1]} />
          <meshStandardMaterial color="#8b5a2b" roughness={0.7} />
        </mesh>
        <mesh position={[0, 1.4, 0.055]}>
          <planeGeometry args={[1.8, 1.0]} />
          <meshStandardMaterial color="#d4a373" roughness={0.9} />
        </mesh>
        <mesh position={[-0.4, 1.5, 0.065]}>
          <planeGeometry args={[0.55, 0.55]} />
          <meshBasicMaterial color="#fefae0" />
        </mesh>
        <mesh position={[-0.4, 1.75, 0.075]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>

        {showLabels && (
          <Html position={[0, 2.3, 0]} center distanceFactor={16}>
            <div className="px-2.5 py-1 rounded-full bg-[#fef9e7] border border-[#8b5a2b] shadow-sm text-[11px] font-black text-[#5c3a21] cursor-pointer hover:scale-105 transition-all">
              📌 Papan Buletin Harian
            </div>
          </Html>
        )}
      </group>

      {/* ============================================================== */}
      {/* 8. 3D GLB TREES SURROUNDING THE CLIFFS                         */}
      {/* ============================================================== */}
      <group>
        <ModelProp url="./models/tree_oak.glb" position={[-15.0, 4.6, -18.0]} scale={2.5} />
        <ModelProp url="./models/tree_cone_dark.glb" position={[-14.0, 2.4, -4.0]} scale={2.4} />
        <ModelProp url="./models/tree_cone.glb" position={[-15.5, 0.6, 6.0]} scale={2.4} />
        <ModelProp url="./models/tree_oak.glb" position={[15.5, 0.6, 6.0]} scale={2.4} />
        <ModelProp url="./models/plant_bush.glb" position={[-6.0, 0.6, 11.5]} scale={2.0} />
        <ModelProp url="./models/plant_bush.glb" position={[6.0, 0.6, 11.5]} scale={2.0} />
      </group>

      {/* ============================================================== */}
      {/* 9. 3D HTML ZONE LABELS (WHEN UNLOCKED)                         */}
      {/* ============================================================== */}
      {showLabels && (
        <>
          <Html position={[0, 9.2, -17.0]} center distanceFactor={22}>
            <div className="px-3.5 py-1 rounded-full bg-[#fef9e7] border-2 border-[#5c3a21] shadow-[0_3px_0_#5c3a21] text-[#5c3a21] text-xs font-black flex items-center gap-1.5 whitespace-nowrap pointer-events-none select-none">
              <span>🌿</span> Ruang Bos & Hedge Lounge (@Ai)
            </div>
          </Html>

          <Html position={[0, 6.0, -3.5]} center distanceFactor={22}>
            <div className="px-3.5 py-1 rounded-full bg-[#e0f5f0] border-2 border-[#286f63] shadow-[0_3px_0_#286f63] text-[#1b4b41] text-xs font-black flex items-center gap-1.5 whitespace-nowrap pointer-events-none select-none">
              <span>📚</span> Library Maze & Studio ({counts.working} kerja)
            </div>
          </Html>

          <Html position={[0, 3.2, 7.5]} center distanceFactor={22}>
            <div className="px-3.5 py-1 rounded-full bg-[#fef3c7] border-2 border-[#92400e] shadow-[0_3px_0_#92400e] text-[#92400e] text-xs font-black flex items-center gap-1.5 whitespace-nowrap pointer-events-none select-none">
              <span>☕</span> The Roost Cafe ({counts.standby} santai)
            </div>
          </Html>
        </>
      )}
    </group>
  )
}
