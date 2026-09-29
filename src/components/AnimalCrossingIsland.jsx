import React, { Suspense } from 'react'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import ModelProp from './ModelProp'

export default function AnimalCrossingIsland({ counts, showLabels = true, onOpenBulletin }) {
  return (
    <group>
      {/* ============================================================== */}
      {/* 1. NATURAL CLIFFS & BASE ELEVATION                             */}
      {/* ============================================================== */}
      
      {/* River Basin at front */}
      <mesh position={[0, -0.4, 11]} receiveShadow>
        <boxGeometry args={[30, 0.4, 8]} />
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

      {/* Tier 2: Lower Terrace (Book Library Maze) (Y: 2.2, Z: -1) */}
      <group position={[0, 0, -1]}>
        <mesh position={[0, 1.1, 0]} receiveShadow castShadow>
          <boxGeometry args={[18, 2.2, 7.5]} />
          <meshStandardMaterial color="#cfa170" roughness={0.9} />
        </mesh>
        <mesh position={[0, 2.21, 0]} receiveShadow>
          <boxGeometry args={[18.1, 0.05, 7.6]} />
          <meshStandardMaterial color="#7ec850" roughness={0.8} />
        </mesh>
        {/* Warm Terracotta / Wood Floor */}
        <mesh position={[0, 2.26, 0]} receiveShadow castShadow>
          <boxGeometry args={[17.4, 0.08, 6.9]} />
          <meshStandardMaterial color="#b5651d" roughness={0.6} />
        </mesh>
      </group>

      {/* Tier 3: Upper Terrace (Executive Hedge Lounge) (Y: 4.2, Z: -8) */}
      <group position={[0, 0, -8]}>
        <mesh position={[0, 2.1, 0]} receiveShadow castShadow>
          <boxGeometry args={[18, 4.2, 6.5]} />
          <meshStandardMaterial color="#cfa170" roughness={0.9} />
        </mesh>
        <mesh position={[0, 4.21, 0]} receiveShadow>
          <boxGeometry args={[18.1, 0.05, 6.6]} />
          <meshStandardMaterial color="#7ec850" roughness={0.8} />
        </mesh>
        {/* Upper Lounge Warm Wood Floor */}
        <mesh position={[0, 4.26, 0]} receiveShadow castShadow>
          <boxGeometry args={[17.4, 0.08, 5.9]} />
          <meshStandardMaterial color="#c68b59" roughness={0.5} />
        </mesh>
      </group>

      {/* Far Right Raised Cliff with Telescope */}
      <group position={[7.8, 0, -5]}>
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
      <group position={[0, 4.3, -8]}>
        {/* Back Hedge Wall */}
        <mesh position={[-0.8, 0.65, -3.1]} castShadow receiveShadow>
          <boxGeometry args={[14.5, 1.3, 0.7]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
        </mesh>

        {/* Left Hedge Wall */}
        <mesh position={[-7.8, 0.65, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.7, 1.3, 6.2]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
        </mesh>

        {/* Front Dividing Hedge Wall */}
        <mesh position={[-4.0, 0.65, 3.1]} castShadow receiveShadow>
          <boxGeometry args={[8.0, 1.3, 0.7]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
        </mesh>
        <mesh position={[2.5, 0.65, 3.1]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 1.3, 0.7]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 3. WOODEN INCLINE STAIRS                                       */}
      {/* ============================================================== */}
      <group position={[5.4, 2.3, -4.8]}>
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

      <group position={[0, 0.6, 1.8]}>
        {[0, 1, 2, 3, 4, 5].map(step => (
          <mesh
            key={step}
            position={[0, step * 0.28 + 0.14, -step * 0.35]}
            receiveShadow
            castShadow
          >
            <boxGeometry args={[2.2, 0.16, 0.42]} />
            <meshStandardMaterial color="#d4a373" roughness={0.6} />
          </mesh>
        ))}
      </group>

      {/* ============================================================== */}
      {/* 4. UPPER LOUNGE (WITH 3D GLB MODELS & FIREPLACE)               */}
      {/* ============================================================== */}
      <group position={[-1, 4.3, -8]}>
        {/* Brick Fireplace */}
        <group position={[0, 0, -2.4]}>
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

        {/* 3D GLB Coffee Table */}
        <Suspense fallback={null}>
          <ModelProp url="./models/tableCoffee.glb" position={[0, 0, 0]} scale={1.8} />
          <ModelProp url="./models/chairModernCushion.glb" position={[-1.8, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={1.5} />
          <ModelProp url="./models/chairModernCushion.glb" position={[1.8, 0, 0]} rotation={[0, -Math.PI / 2, 0]} scale={1.5} />
          <ModelProp url="./models/lampRoundFloor.glb" position={[4.2, 0, -1.8]} scale={1.5} />
        </Suspense>

        {/* Dark Two-Seater Couch on Left */}
        <group position={[-4.5, 0, -1.8]}>
          <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.8, 0.65, 0.9]} />
            <meshStandardMaterial color="#334155" roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.8, -0.35]} castShadow>
            <boxGeometry args={[1.8, 0.6, 0.25]} />
            <meshStandardMaterial color="#1e293b" roughness={0.8} />
          </mesh>
        </group>

        {/* Coat Rack */}
        <group position={[4.6, 0, 1.2]}>
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
      {/* 5. LOWER TERRACE BOOKCASE MAZE (AUTHENTIC 3D GLB BOOKCASES)    */}
      {/* ============================================================== */}
      <group position={[0, 2.3, -1]}>
        <Suspense fallback={null}>
          {/* Back Row Bookcases */}
          <ModelProp url="./models/bookcaseClosedWide.glb" position={[-5.0, 0, -3.0]} scale={1.6} />
          <ModelProp url="./models/bookcaseOpen.glb" position={[-1.2, 0, -3.0]} scale={1.6} />
          <ModelProp url="./models/bookcaseClosedWide.glb" position={[2.6, 0, -3.0]} scale={1.6} />

          {/* L-Shaped Divider Bookcases */}
          <ModelProp url="./models/bookcaseOpen.glb" position={[-3.0, 0, -1.2]} rotation={[0, Math.PI / 2, 0]} scale={1.6} />
          <ModelProp url="./models/bookcaseClosedWide.glb" position={[1.5, 0, -1.2]} rotation={[0, Math.PI / 2, 0]} scale={1.6} />

          {/* Front Row Bookcases */}
          <ModelProp url="./models/bookcaseOpen.glb" position={[-5.0, 0, 0.6]} scale={1.6} />
          <ModelProp url="./models/bookcaseClosedWide.glb" position={[0.2, 0, 0.6]} scale={1.6} />

          {/* 3D GLB Desks in the Maze Nooks */}
          {[-3, 3].map((x, i) => (
            <group key={`desk-glb-${i}`}>
              {[-2, 0.2, 2, 3.8].map(z => (
                <group key={`d-${x}-${z}`} position={[x, 0, z + 0.35]}>
                  <ModelProp url="./models/desk.glb" scale={1.3} />
                  <ModelProp url="./models/chairDesk.glb" position={[0, 0, -0.45]} rotation={[0, Math.PI, 0]} scale={1.3} />
                </group>
              ))}
            </group>
          ))}
        </Suspense>
      </group>

      {/* ============================================================== */}
      {/* 6. ROOM DIVISION C: THE ROOST CAFE (FRONT PATIO)              */}
      {/* ============================================================== */}
      <group position={[0, 0.6, 6]}>
        {/* Mahogany Coffee Bar Counter */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[8.5, 0.9, 1.6]} />
          <meshStandardMaterial color="#3b1d0a" roughness={0.4} />
        </mesh>
        {[-3, -1.5, 0, 1.5, 3].map((mx, idx) => (
          <group key={idx} position={[mx, 1.02, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.08, 0.07, 0.14, 12]} />
              <meshStandardMaterial color="#ffffff" roughness={0.2} />
            </mesh>
            <mesh position={[0, -0.06, 0]}>
              <cylinderGeometry args={[0.13, 0.13, 0.02, 12]} />
              <meshStandardMaterial color="#e5e7eb" />
            </mesh>
          </group>
        ))}

        {/* Low Hedge Bordering the River */}
        <mesh position={[-5.5, 0.45, 1.8]} castShadow receiveShadow>
          <boxGeometry args={[5.5, 0.9, 0.6]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
        </mesh>
        <mesh position={[5.5, 0.45, 1.8]} castShadow receiveShadow>
          <boxGeometry args={[5.5, 0.9, 0.6]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 7. INTERACTIVE CORK BULLETIN BOARD (LAWN)                     */}
      {/* ============================================================== */}
      <group
        position={[6.5, 0.6, 3.8]}
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
      <Suspense fallback={null}>
        <ModelProp url="./models/tree_oak.glb" position={[-9.5, 4.3, -9.5]} scale={2.2} />
        <ModelProp url="./models/tree_default.glb" position={[-9.2, 2.3, -3.5]} scale={2.0} />
        <ModelProp url="./models/tree_cone.glb" position={[-10, 0.6, 4.5]} scale={2.0} />
        <ModelProp url="./models/tree_oak.glb" position={[9.5, 0.6, 4.5]} scale={2.0} />
        <ModelProp url="./models/plant_bush.glb" position={[-4, 0.6, 7.5]} scale={1.8} />
        <ModelProp url="./models/plant_bush.glb" position={[4, 0.6, 7.5]} scale={1.8} />
      </Suspense>

      {/* ============================================================== */}
      {/* 9. 3D HTML ZONE LABELS (WHEN UNLOCKED)                         */}
      {/* ============================================================== */}
      {showLabels && (
        <>
          <Html position={[-1, 8.2, -8]} center distanceFactor={18}>
            <div className="px-3 py-1 rounded-full bg-[#fef9e7] border-2 border-[#5c3a21] shadow-[0_3px_0_#5c3a21] text-[#5c3a21] text-xs font-black flex items-center gap-1.5 whitespace-nowrap pointer-events-none select-none">
              <span>🌿</span> Ruang Bos & Hedge Lounge (@Ai)
            </div>
          </Html>

          <Html position={[0, 5.0, -1]} center distanceFactor={18}>
            <div className="px-3 py-1 rounded-full bg-[#e0f5f0] border-2 border-[#286f63] shadow-[0_3px_0_#286f63] text-[#1b4b41] text-xs font-black flex items-center gap-1.5 whitespace-nowrap pointer-events-none select-none">
              <span>📚</span> Library Maze & Studio ({counts.working} kerja)
            </div>
          </Html>

          <Html position={[0, 2.6, 6]} center distanceFactor={18}>
            <div className="px-3 py-1 rounded-full bg-[#fef3c7] border-2 border-[#92400e] shadow-[0_3px_0_#92400e] text-[#92400e] text-xs font-black flex items-center gap-1.5 whitespace-nowrap pointer-events-none select-none">
              <span>☕</span> The Roost Cafe ({counts.standby} santai)
            </div>
          </Html>
        </>
      )}
    </group>
  )
}
