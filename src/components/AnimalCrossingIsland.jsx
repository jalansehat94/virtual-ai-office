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

      {/* Tier 2: Lower Terrace (Book Library Maze Studio) (Y: 2.4) */}
      {/* Deep Main Terrace Body (Z: -11.0 to +1.8) */}
      <group position={[0, 0, -4.6]}>
        <mesh position={[0, 1.2, 0]} receiveShadow castShadow>
          <boxGeometry args={[32, 2.4, 12.8]} />
          <meshStandardMaterial color="#cfa170" roughness={0.9} />
        </mesh>
        <mesh position={[0, 2.41, 0]} receiveShadow>
          <boxGeometry args={[32.1, 0.05, 12.9]} />
          <meshStandardMaterial color="#7ec850" roughness={0.8} />
        </mesh>
        {/* Warm Terracotta / Wood Floor */}
        <mesh position={[0, 2.46, 0]} receiveShadow castShadow>
          <boxGeometry args={[31.4, 0.08, 12.4]} />
          <meshStandardMaterial color="#b5651d" roughness={0.6} />
        </mesh>

        {/* ============================================================== */}
        {/* CLASH OF CLANS / AC STYLE 3D COBBLESTONE ROADS FROM STAIRS    */}
        {/* ============================================================== */}
        {/* 1. Central Grand Avenue (From Stairway 1 top Z: 2.2 to Z: -8.5) */}
        <group position={[0, 2.47, 0]}>
          {/* Main Avenue Stone Bed */}
          <mesh position={[0, 0.015, -3.15]} receiveShadow>
            <boxGeometry args={[3.4, 0.03, 11.2]} />
            <meshStandardMaterial color="#ded1bf" roughness={0.85} />
          </mesh>
          {/* Side Stone Kerbs (Left & Right) */}
          <mesh position={[-1.75, 0.035, -3.15]} receiveShadow castShadow>
            <boxGeometry args={[0.12, 0.05, 11.2]} />
            <meshStandardMaterial color="#6b4c35" roughness={0.7} />
          </mesh>
          <mesh position={[1.75, 0.035, -3.15]} receiveShadow castShadow>
            <boxGeometry args={[0.12, 0.05, 11.2]} />
            <meshStandardMaterial color="#6b4c35" roughness={0.7} />
          </mesh>

          {/* Staggered Decorative Cobblestone Pavers along Central Avenue */}
          {[-8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2].map((pz, idx) => (
            <group key={`pave-center-${idx}`} position={[0, 0.032, pz]}>
              <mesh position={[-0.8, 0, 0]} rotation={[-Math.PI / 2, 0, idx * 0.2]} receiveShadow>
                <circleGeometry args={[0.38, 7]} />
                <meshStandardMaterial color={idx % 2 === 0 ? '#cbbea9' : '#e6dbcc'} roughness={0.9} />
              </mesh>
              <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, idx * 0.3]} receiveShadow>
                <circleGeometry args={[0.42, 8]} />
                <meshStandardMaterial color={idx % 3 === 0 ? '#b8a993' : '#dfd4c4'} roughness={0.9} />
              </mesh>
              <mesh position={[0.8, 0, 0]} rotation={[-Math.PI / 2, 0, idx * 0.4]} receiveShadow>
                <circleGeometry args={[0.36, 6]} />
                <meshStandardMaterial color={idx % 2 === 0 ? '#ded4c4' : '#c5b6a0'} roughness={0.9} />
              </mesh>
            </group>
          ))}

          {/* 2. Connecting Boulevard to Stairway 2 (Right wing to Tier 3 at Z: -7.5) */}
          <mesh position={[5.8, 0.015, -7.5]} receiveShadow>
            <boxGeometry args={[11.6, 0.03, 2.6]} />
            <meshStandardMaterial color="#ded1bf" roughness={0.85} />
          </mesh>
          <mesh position={[5.8, 0.035, -6.2]} receiveShadow castShadow>
            <boxGeometry args={[11.6, 0.05, 0.12]} />
            <meshStandardMaterial color="#6b4c35" roughness={0.7} />
          </mesh>
          <mesh position={[5.8, 0.035, -8.8]} receiveShadow castShadow>
            <boxGeometry args={[11.6, 0.05, 0.12]} />
            <meshStandardMaterial color="#6b4c35" roughness={0.7} />
          </mesh>

          {/* 3. Lateral Walkway Row 1 (Between Desks at Z: -1.5) */}
          <mesh position={[0, 0.012, -1.5]} receiveShadow>
            <boxGeometry args={[26.0, 0.024, 2.0]} />
            <meshStandardMaterial color="#ded1bf" roughness={0.85} />
          </mesh>

          {/* 4. Lateral Walkway Row 2 (Between Desks at Z: -5.5) */}
          <mesh position={[0, 0.012, -5.5]} receiveShadow>
            <boxGeometry args={[26.0, 0.024, 2.0]} />
            <meshStandardMaterial color="#ded1bf" roughness={0.85} />
          </mesh>
        </group>
      </group>

      {/* Tier 2 Front Cliff Wings (Z: +1.8 to +4.0) with Wide Center Gap at X: -2.4 to +2.4 for Stairway 1 */}
      {/* Left Cliff Wing */}
      <group position={[-9.2, 0, 2.9]}>
        <mesh position={[0, 1.2, 0]} receiveShadow castShadow>
          <boxGeometry args={[13.6, 2.4, 2.2]} />
          <meshStandardMaterial color="#cfa170" roughness={0.9} />
        </mesh>
        <mesh position={[0, 2.41, 0]} receiveShadow>
          <boxGeometry args={[13.7, 0.05, 2.3]} />
          <meshStandardMaterial color="#7ec850" roughness={0.8} />
        </mesh>
        <mesh position={[0, 2.46, 0]} receiveShadow castShadow>
          <boxGeometry args={[13.4, 0.08, 2.1]} />
          <meshStandardMaterial color="#b5651d" roughness={0.6} />
        </mesh>
      </group>

      {/* Right Cliff Wing */}
      <group position={[9.2, 0, 2.9]}>
        <mesh position={[0, 1.2, 0]} receiveShadow castShadow>
          <boxGeometry args={[13.6, 2.4, 2.2]} />
          <meshStandardMaterial color="#cfa170" roughness={0.9} />
        </mesh>
        <mesh position={[0, 2.41, 0]} receiveShadow>
          <boxGeometry args={[13.7, 0.05, 2.3]} />
          <meshStandardMaterial color="#7ec850" roughness={0.8} />
        </mesh>
        <mesh position={[0, 2.46, 0]} receiveShadow castShadow>
          <boxGeometry args={[13.4, 0.08, 2.1]} />
          <meshStandardMaterial color="#b5651d" roughness={0.6} />
        </mesh>
      </group>

      {/* Tier 3: Upper Terrace (Executive Hedge Lounge) (Y: 4.6, Z: -17.0) */}
      {/* Main Upper Cliff Body with cut-out at X: 11.5 for Stairway 2 */}
      <group position={[-1.5, 0, -17.0]}>
        <mesh position={[0, 2.3, 0]} receiveShadow castShadow>
          <boxGeometry args={[25, 4.6, 14]} />
          <meshStandardMaterial color="#cfa170" roughness={0.9} />
        </mesh>
        <mesh position={[0, 4.61, 0]} receiveShadow>
          <boxGeometry args={[25.1, 0.05, 14.1]} />
          <meshStandardMaterial color="#7ec850" roughness={0.8} />
        </mesh>
        {/* Upper Lounge Warm Wood Floor */}
        <mesh position={[0, 4.66, 0]} receiveShadow castShadow>
          <boxGeometry args={[24.4, 0.08, 13.4]} />
          <meshStandardMaterial color="#c68b59" roughness={0.5} />
        </mesh>
      </group>

      {/* Tier 3 Right Wing (beyond Stairway 2 at X: 13.5 to 14.5) */}
      <group position={[13.6, 0, -17.0]}>
        <mesh position={[0, 2.3, 0]} receiveShadow castShadow>
          <boxGeometry args={[2.8, 4.6, 14]} />
          <meshStandardMaterial color="#cfa170" roughness={0.9} />
        </mesh>
        <mesh position={[0, 4.61, 0]} receiveShadow>
          <boxGeometry args={[2.9, 0.05, 14.1]} />
          <meshStandardMaterial color="#7ec850" roughness={0.8} />
        </mesh>
      </group>

      {/* Far Right Raised Cliff with Telescope */}
      <group position={[15.2, 0, -12]}>
        <mesh position={[0, 3.2, 0]} receiveShadow castShadow>
          <boxGeometry args={[2.6, 6.4, 18]} />
          <meshStandardMaterial color="#cfa170" roughness={0.9} />
        </mesh>
        <mesh position={[0, 6.41, 0]} receiveShadow>
          <boxGeometry args={[2.7, 0.05, 18.1]} />
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
      {/* 3. PROMINENT 3D WOODEN INCLINE STAIRWAYS WITH RAILINGS & LAMPS */}
      {/* ============================================================== */}

      {/* STAIRWAY 1: Center Grand Wooden Incline (Tier 1 <-> Tier 2, X: 0) */}
      <group position={[0, 0, 0]}>
        {/* Tier 1 Cobblestone Promenade Network */}
        <group position={[0, 0.615, 0]}>
          {/* Central Grand Promenade (from Stairway 1 base Z: 6.4 down to beach Z: 13.0) */}
          <mesh position={[0, 0.012, 9.7]} receiveShadow>
            <boxGeometry args={[4.4, 0.024, 6.6]} />
            <meshStandardMaterial color="#ded1bf" roughness={0.85} />
          </mesh>
          <mesh position={[-2.25, 0.030, 9.7]} receiveShadow castShadow>
            <boxGeometry args={[0.12, 0.04, 6.6]} />
            <meshStandardMaterial color="#6b4c35" roughness={0.7} />
          </mesh>
          <mesh position={[2.25, 0.030, 9.7]} receiveShadow castShadow>
            <boxGeometry args={[0.12, 0.04, 6.6]} />
            <meshStandardMaterial color="#6b4c35" roughness={0.7} />
          </mesh>

          {/* West Promenade to Brewster Cafe & Animal Crossing Cottage */}
          <mesh position={[-7.5, 0.010, 8.8]} receiveShadow>
            <boxGeometry args={[11.5, 0.020, 2.8]} />
            <meshStandardMaterial color="#ded1bf" roughness={0.85} />
          </mesh>

          {/* East Promenade to Patio Lounge & Bulletin Board / Tom Nook */}
          <mesh position={[7.5, 0.010, 8.8]} receiveShadow>
            <boxGeometry args={[11.5, 0.020, 2.8]} />
            <meshStandardMaterial color="#ded1bf" roughness={0.85} />
          </mesh>

          {/* Stepping Stone Trail to Beach & Pier */}
          {[13.5, 14.5, 15.5, 16.5].map((bz, idx) => (
            <mesh key={`beach-trail-${idx}`} position={[-1.0 + (idx % 2) * 2.0, 0.015, bz]} rotation={[-Math.PI / 2, 0, idx * 0.4]} receiveShadow>
              <circleGeometry args={[0.5, 8]} />
              <meshStandardMaterial color="#c2b280" roughness={0.9} />
            </mesh>
          ))}
        </group>

        {/* 9 Solid Timber Steps */}
        {[
          { y: 0.80, z: 6.2 },
          { y: 1.00, z: 5.7 },
          { y: 1.20, z: 5.2 },
          { y: 1.40, z: 4.7 },
          { y: 1.60, z: 4.2 },
          { y: 1.80, z: 3.7 },
          { y: 2.00, z: 3.2 },
          { y: 2.20, z: 2.7 },
          { y: 2.40, z: 2.2 },
        ].map((s, idx) => (
          <group key={`s1-step-${idx}`}>
            {/* Wooden Timber Tread */}
            <mesh position={[0, s.y - 0.10, s.z]} receiveShadow castShadow>
              <boxGeometry args={[4.4, 0.20, 0.50]} />
              <meshStandardMaterial color="#b5835a" roughness={0.6} />
            </mesh>
            {/* Front Step Edge Detail */}
            <mesh position={[0, s.y - 0.01, s.z + 0.23]} castShadow>
              <boxGeometry args={[4.45, 0.04, 0.06]} />
              <meshStandardMaterial color="#8b5a2b" roughness={0.5} />
            </mesh>
          </group>
        ))}

        {/* Left Handrail & Log Posts */}
        <group position={[-2.25, 0, 0]}>
          {[6.2, 5.2, 4.2, 3.2, 2.2].map((pz, idx) => (
            <mesh key={`lp-left-${idx}`} position={[0, 1.2 + idx * 0.35, pz]} castShadow>
              <cylinderGeometry args={[0.07, 0.08, 0.75, 10]} />
              <meshStandardMaterial color="#6f4e37" roughness={0.8} />
            </mesh>
          ))}
          {/* Sloped Log Handrail */}
          <mesh position={[0, 1.95, 4.2]} rotation={[-0.45, 0, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 4.6, 10]} />
            <meshStandardMaterial color="#8b5a2b" roughness={0.7} />
          </mesh>
        </group>

        {/* Right Handrail & Log Posts */}
        <group position={[2.25, 0, 0]}>
          {[6.2, 5.2, 4.2, 3.2, 2.2].map((pz, idx) => (
            <mesh key={`lp-right-${idx}`} position={[0, 1.2 + idx * 0.35, pz]} castShadow>
              <cylinderGeometry args={[0.07, 0.08, 0.75, 10]} />
              <meshStandardMaterial color="#6f4e37" roughness={0.8} />
            </mesh>
          ))}
          {/* Sloped Log Handrail */}
          <mesh position={[0, 1.95, 4.2]} rotation={[-0.45, 0, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 4.6, 10]} />
            <meshStandardMaterial color="#8b5a2b" roughness={0.7} />
          </mesh>
        </group>

        {/* 2 Cute Animal Crossing Lantern Posts at Stair Base */}
        {[-2.6, 2.6].map((lx, idx) => (
          <group key={`stair-lamp-1-${idx}`} position={[lx, 0.6, 6.4]}>
            <mesh position={[0, 0.8, 0]} castShadow>
              <cylinderGeometry args={[0.06, 0.08, 1.6, 8]} />
              <meshStandardMaterial color="#4a2e18" roughness={0.9} />
            </mesh>
            <mesh position={[0, 1.65, 0]} castShadow>
              <coneGeometry args={[0.22, 0.16, 4]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0, 1.5, 0]}>
              <boxGeometry args={[0.20, 0.22, 0.20]} />
              <meshBasicMaterial color="#fef08a" />
            </mesh>
            <pointLight position={[0, 1.5, 0]} color="#fef08a" intensity={1.8} distance={4.0} />
          </group>
        ))}
      </group>

      {/* STAIRWAY 2: Right Wing Wooden Incline (Tier 2 <-> Tier 3, X: 11.5) */}
      <group position={[11.5, 0, 0]}>
        {/* 9 Solid Timber Steps */}
        {[
          { y: 2.62, z: -8.2 },
          { y: 2.86, z: -8.6 },
          { y: 3.10, z: -9.0 },
          { y: 3.34, z: -9.4 },
          { y: 3.58, z: -9.8 },
          { y: 3.82, z: -10.2 },
          { y: 4.06, z: -10.6 },
          { y: 4.30, z: -11.0 },
          { y: 4.54, z: -11.4 },
          { y: 4.66, z: -11.8 },
        ].map((s, idx) => (
          <group key={`s2-step-${idx}`}>
            <mesh position={[0, s.y - 0.12, s.z]} receiveShadow castShadow>
              <boxGeometry args={[3.2, 0.24, 0.46]} />
              <meshStandardMaterial color="#b5835a" roughness={0.6} />
            </mesh>
            <mesh position={[0, s.y - 0.01, s.z + 0.21]} castShadow>
              <boxGeometry args={[3.25, 0.04, 0.06]} />
              <meshStandardMaterial color="#8b5a2b" roughness={0.5} />
            </mesh>
          </group>
        ))}

        {/* Left Handrail */}
        <group position={[-1.65, 0, 0]}>
          {[-8.2, -9.4, -10.6, -11.7].map((pz, idx) => (
            <mesh key={`s2-lp-left-${idx}`} position={[0, 2.9 + idx * 0.52, pz]} castShadow>
              <cylinderGeometry args={[0.07, 0.08, 0.75, 10]} />
              <meshStandardMaterial color="#6f4e37" roughness={0.8} />
            </mesh>
          ))}
          <mesh position={[0, 4.0, -10.0]} rotation={[-0.52, 0, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 4.2, 10]} />
            <meshStandardMaterial color="#8b5a2b" roughness={0.7} />
          </mesh>
        </group>

        {/* Right Handrail */}
        <group position={[1.65, 0, 0]}>
          {[-8.2, -9.4, -10.6, -11.7].map((pz, idx) => (
            <mesh key={`s2-lp-right-${idx}`} position={[0, 2.9 + idx * 0.52, pz]} castShadow>
              <cylinderGeometry args={[0.07, 0.08, 0.75, 10]} />
              <meshStandardMaterial color="#6f4e37" roughness={0.8} />
            </mesh>
          ))}
          <mesh position={[0, 4.0, -10.0]} rotation={[-0.52, 0, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 4.2, 10]} />
            <meshStandardMaterial color="#8b5a2b" roughness={0.7} />
          </mesh>
        </group>

        {/* 2 Cute Lantern Posts at Tier 2 Stair Entrance */}
        {[-1.9, 1.9].map((lx, idx) => (
          <group key={`stair-lamp-2-${idx}`} position={[lx, 2.4, -8.0]}>
            <mesh position={[0, 0.8, 0]} castShadow>
              <cylinderGeometry args={[0.06, 0.08, 1.6, 8]} />
              <meshStandardMaterial color="#4a2e18" roughness={0.9} />
            </mesh>
            <mesh position={[0, 1.65, 0]} castShadow>
              <coneGeometry args={[0.22, 0.16, 4]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0, 1.5, 0]}>
              <boxGeometry args={[0.20, 0.22, 0.20]} />
              <meshBasicMaterial color="#fef08a" />
            </mesh>
            <pointLight position={[0, 1.5, 0]} color="#fef08a" intensity={1.5} distance={3.5} />
          </group>
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
          <group position={[-0.54, 0, 0.28]}>
            <ModelProp url="./models/desk.glb" scale={1.5} />
          </group>
          <ModelProp url="./models/chairModernCushion.glb" position={[0, 0, -0.68]} scale={1.5} />
          
          {/* Executive Laptop on Desk - Opened and flush on desk at Y = 0.58 */}
          <group position={[0, 0.58, 0]}>
            {/* Base */}
            <mesh position={[0, 0.012, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.56, 0.024, 0.38]} />
              <meshStandardMaterial color="#f472b6" metalness={0.6} roughness={0.2} />
            </mesh>
            {/* Trackpad nearest to Ai */}
            <mesh position={[0, 0.025, -0.12]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.18, 0.09]} />
              <meshBasicMaterial color="#fbcfe8" />
            </mesh>
            {/* Keyboard */}
            <mesh position={[0, 0.025, -0.02]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.48, 0.18]} />
              <meshBasicMaterial color="#374151" />
            </mesh>

            {/* Laptop Screen Tilted towards Ai */}
            <group position={[0, 0.022, 0.15]} rotation={[0.34, 0, 0]}>
              {/* Back Cover */}
              <mesh position={[0, 0.18, 0]} castShadow>
                <boxGeometry args={[0.56, 0.36, 0.02]} />
                <meshStandardMaterial color="#ec4899" metalness={0.7} roughness={0.2} />
              </mesh>
              {/* Glowing Pink Screen Facing Ai at -Z */}
              <mesh position={[0, 0.18, -0.012]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={[0.52, 0.32]} />
                <meshBasicMaterial color="#f43f5e" />
              </mesh>
              <pointLight position={[0, 0.18, -0.18]} color="#f472b6" intensity={2.2} distance={2.5} />
            </group>
          </group>
        </group>

        {/* Lounge Seating Left: Coffee Table & Armchairs */}
        <group position={[-5.5, 0, 1.5]}>
          <ModelProp url="./models/tableCoffee.glb" position={[0, 0, 0]} scale={1.8} />
          <ModelProp url="./models/chairModernCushion.glb" position={[-1.6, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={1.5} />
          <ModelProp url="./models/chairModernCushion.glb" position={[1.6, 0, 0]} rotation={[0, -Math.PI / 2, 0]} scale={1.5} />
        </group>

        {/* Raymond (Iconic Business Cat Executive Advisor) */}
        <group position={[-5.5, 0, 0.1]} rotation={[0, 0, 0]}>
          <ModelProp url="./models/raymond/scene.gltf" scale={0.0022} />
          {showLabels && (
            <Html position={[0, 1.6, 0]} center distanceFactor={15}>
              <div className="px-2.5 py-0.5 rounded-full bg-[#f1f5f9] border border-[#475569] shadow-sm text-[10px] font-black text-[#1e293b] whitespace-nowrap pointer-events-none select-none">
                👓 Raymond (Executive Advisor)
              </div>
            </Html>
          )}
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
        {/* Perimeter & Maze Dividing Bookcases - Scaled to Full Architectural Height (2.8m) */}
        <group position={[0, 0, -3.5]}>
          {/* Back Wall Bookcases (Perimeter behind desks) */}
          <ModelProp url="./models/bookcaseClosedWide.glb" position={[-11.5, 0, -6.5]} scale={3.2} />
          <ModelProp url="./models/bookcaseOpen.glb" position={[-8.0, 0, -6.5]} scale={3.2} />
          <ModelProp url="./models/bookcaseClosedWide.glb" position={[-4.5, 0, -6.5]} scale={3.2} />
          <ModelProp url="./models/bookcaseClosedWide.glb" position={[4.5, 0, -6.5]} scale={3.2} />
          <ModelProp url="./models/bookcaseOpen.glb" position={[8.0, 0, -6.5]} scale={3.2} />
          <ModelProp url="./models/bookcaseClosedWide.glb" position={[11.5, 0, -6.5]} scale={3.2} />

          {/* Departmental Divider Bookcase Walls */}
          <ModelProp url="./models/bookcaseClosedWide.glb" position={[-4.8, 0, -1.8]} rotation={[0, Math.PI / 2, 0]} scale={3.0} />
          <ModelProp url="./models/bookcaseOpen.glb" position={[-4.8, 0, 2.8]} rotation={[0, Math.PI / 2, 0]} scale={3.0} />
          <ModelProp url="./models/bookcaseClosedWide.glb" position={[4.8, 0, -1.8]} rotation={[0, Math.PI / 2, 0]} scale={3.0} />
          <ModelProp url="./models/bookcaseOpen.glb" position={[4.8, 0, 2.8]} rotation={[0, Math.PI / 2, 0]} scale={3.0} />
        </group>

        {/* 16 Real Desks, Chairs, and Laptops with Centered Symmetry & Zero-Float */}
        {tier2Desks.map(d => (
          <group key={d.id} position={[d.pos[0], 0, d.pos[2]]}>
            {/* Centered Desk Body (Offsetting origin to place center exactly at 0, 0) */}
            <group position={[-0.482, 0, 0.25]}>
              <ModelProp url="./models/desk.glb" scale={1.35} />
            </group>

            {/* Office Chair centered directly behind the desk */}
            <ModelProp url="./models/chairDesk.glb" position={[0, 0, -0.60]} rotation={[0, 0, 0]} scale={1.35} />

            {/* Glowing Laptop sitting FLUSH on top of the desk wood surface at Y = 0.52 */}
            <group position={[0, 0.52, 0]}>
              {/* Laptop base */}
              <mesh position={[0, 0.010, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.50, 0.018, 0.34]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.25} />
              </mesh>
              {/* Trackpad (nearest to seated villager) */}
              <mesh position={[0, 0.020, -0.10]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.15, 0.08]} />
                <meshBasicMaterial color="#cbd5e1" />
              </mesh>
              {/* Keyboard */}
              <mesh position={[0, 0.020, -0.01]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.42, 0.15]} />
                <meshBasicMaterial color="#1e293b" />
              </mesh>

              {/* Tilted Laptop Screen with Glowing Emerald Code facing seated villager at -Z */}
              <group position={[0, 0.018, 0.13]} rotation={[0.32, 0, 0]}>
                {/* Back Cover */}
                <mesh position={[0, 0.15, 0]} castShadow>
                  <boxGeometry args={[0.50, 0.30, 0.018]} />
                  <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.25} />
                </mesh>
                {/* Screen Display (facing -Z directly into villager eyes) */}
                <mesh position={[0, 0.15, -0.010]} rotation={[0, Math.PI, 0]}>
                  <planeGeometry args={[0.46, 0.26]} />
                  <meshBasicMaterial color="#10b981" />
                </mesh>
                <pointLight position={[0, 0.15, -0.15]} color="#34d399" intensity={1.8} distance={1.8} />
              </group>
            </group>

            {/* Cute Ceramic Coffee Mug sitting on Corner of Desk Surface */}
            <mesh position={[0.30, 0.575, 0.05]} castShadow>
              <cylinderGeometry args={[0.045, 0.04, 0.11, 10]} />
              <meshStandardMaterial color="#ffffff" roughness={0.3} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ============================================================== */}
      {/* 6. TIER 1: THE ROOST CAFE (LEFT WING) & PATIO GARDEN (RIGHT)   */}
      {/* ============================================================== */}
      
      {/* BREWSTER'S COFFEE BAR COUNTER (LEFT WING, World X: -6.2, World Z: 8.8) */}
      <group position={[-6.2, 0.6, 8.8]}>
        {/* Long Mahogany Coffee Bar Counter (Spans X: -9.8 to -2.6, Z: 8.1 to 9.5) */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[7.2, 1.0, 1.4]} />
          <meshStandardMaterial color="#3b1d0a" roughness={0.4} />
        </mesh>
        
        {/* 6 Coffee Bar Stools - Placed in front of counter at Z = -1.5 (World Z: 7.3) */}
        {[-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((mx, idx) => (
          <group key={`stool-${idx}`} position={[mx, 0, -1.5]}>
            <mesh position={[0, 0.42, 0]} castShadow>
              <cylinderGeometry args={[0.26, 0.26, 0.08, 16]} />
              <meshStandardMaterial color="#8b5a2b" roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.20, 0]} castShadow>
              <cylinderGeometry args={[0.045, 0.055, 0.40, 8]} />
              <meshStandardMaterial color="#1f2937" metalness={0.8} />
            </mesh>
          </group>
        ))}

        {/* Steaming Ceramic Mugs on Bar Counter (World Z: 8.45) */}
        {[-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((cx, idx) => (
          <group key={`mug-${idx}`} position={[cx, 1.06, -0.35]}>
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
      </group>

      {/* OUTDOOR PATIO TABLES (RIGHT WING, World X: +6.5) */}
      <group position={[6.5, 0.6, 0]}>
        {/* Cafe Lounge Table 1 (Near lawn, World Z: 8.0) with AUTHENTIC FROGGY CHAIRS */}
        <group position={[0, 0, 8.0]}>
          <ModelProp url="./models/tableCoffee.glb" scale={1.8} />
          <ModelProp url="./models/froggy_chair/scene.gltf" position={[-1.3, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={0.048} />
          <ModelProp url="./models/froggy_chair/scene.gltf" position={[1.3, 0, 0]} rotation={[0, -Math.PI / 2, 0]} scale={0.048} />
          <ModelProp url="./models/froggy_chair/scene.gltf" position={[0, 0, -1.1]} rotation={[0, 0, 0]} scale={0.048} />
          <ModelProp url="./models/froggy_chair/scene.gltf" position={[0, 0, 1.1]} rotation={[0, Math.PI, 0]} scale={0.048} />
        </group>

        {/* Cafe Lounge Table 2 (Front patio, World Z: 11.2) with AUTHENTIC FROGGY CHAIRS */}
        <group position={[0, 0, 11.2]}>
          <ModelProp url="./models/tableCoffee.glb" scale={1.8} />
          <ModelProp url="./models/froggy_chair/scene.gltf" position={[-1.3, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={0.048} />
          <ModelProp url="./models/froggy_chair/scene.gltf" position={[1.3, 0, 0]} rotation={[0, -Math.PI / 2, 0]} scale={0.048} />
          <ModelProp url="./models/froggy_chair/scene.gltf" position={[0, 0, -1.1]} rotation={[0, 0, 0]} scale={0.048} />
          <ModelProp url="./models/froggy_chair/scene.gltf" position={[0, 0, 1.1]} rotation={[0, Math.PI, 0]} scale={0.048} />
        </group>
      </group>

      {/* Picnic Benches on the Lawn */}
      <group position={[-11.5, 0.6, 6.0]} rotation={[0, Math.PI / 3, 0]}>
        <ModelProp url="./models/benchCushion.glb" scale={1.6} />
      </group>
      <group position={[12.0, 0.6, 6.0]} rotation={[0, -Math.PI / 3, 0]}>
        <ModelProp url="./models/benchCushion.glb" scale={1.6} />
      </group>

      {/* Low Hedge Bordering the Front */}
      <group position={[0, 0.6, 0]}>
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
      {/* 7. AUTHENTIC ANIMAL CROSSING COTTAGE & RESIDENT SERVICES       */}
      {/* ============================================================== */}
      {/* Iconic Animal Crossing House on Left Beach Lawn */}
      <group position={[-13.5, 0.6, 9.0]} rotation={[0, Math.PI / 6, 0]}>
        <ModelProp url="./models/ac_house/scene.gltf" scale={0.026} />
        {/* Cobblestone walkway to the door */}
        {[0, 1, 2].map((s) => (
          <mesh key={`path-${s}`} position={[0.2, 0.02, 3.0 + s * 0.9]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <circleGeometry args={[0.5 - s * 0.05, 12]} />
            <meshStandardMaterial color="#c2b280" roughness={0.9} />
          </mesh>
        ))}
        {/* Wooden Mailbox */}
        <group position={[2.2, 0, 3.0]}>
          <mesh position={[0, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.07, 1.0, 8]} />
            <meshStandardMaterial color="#8b5a2b" roughness={0.8} />
          </mesh>
          <mesh position={[0, 1.05, 0]} castShadow>
            <boxGeometry args={[0.35, 0.3, 0.45]} />
            <meshStandardMaterial color="#3b82f6" roughness={0.4} />
          </mesh>
        </group>

        {showLabels && (
          <Html position={[0, 5.6, 0]} center distanceFactor={18}>
            <div className="px-3 py-1 rounded-full bg-[#fef9e7] border-2 border-[#8b5a2b] shadow-sm text-[11px] font-black text-[#5c3a21] whitespace-nowrap pointer-events-none select-none">
              🏡 Rumah Warga Pulau
            </div>
          </Html>
        )}
      </group>

      {/* Tom Nook standing proudly next to Bulletin Board */}
      <group position={[13.2, 1.03, 5.8]} rotation={[0, -Math.PI / 3, 0]}>
        <ModelProp url="./models/tom_nook/scene.gltf" scale={0.32} />
        {showLabels && (
          <Html position={[0, 1.6, 0]} center distanceFactor={15}>
            <div className="px-2.5 py-0.5 rounded-full bg-[#fef9e7] border border-[#2b5c4b] shadow-sm text-[10px] font-black text-[#1b5e50] whitespace-nowrap pointer-events-none select-none">
              🍃 Tom Nook (Resident Services)
            </div>
          </Html>
        )}
      </group>

      {/* Audie enjoying the sun on the front lawn */}
      <group position={[-8.5, 0.6, 12.0]} rotation={[0, Math.PI / 4, 0]}>
        <ModelProp url="./models/audie/scene.gltf" scale={0.0034} />
        {showLabels && (
          <Html position={[0, 1.5, 0]} center distanceFactor={15}>
            <div className="px-2.5 py-0.5 rounded-full bg-[#fff7ed] border border-[#ea580c] shadow-sm text-[10px] font-black text-[#c2410c] whitespace-nowrap pointer-events-none select-none">
              🦊 Audie (Warga Pantai)
            </div>
          </Html>
        )}
      </group>

      {/* ============================================================== */}
      {/* 8. INTERACTIVE CORK BULLETIN BOARD (LAWN)                     */}
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
