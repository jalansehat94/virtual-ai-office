import React from 'react'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

export default function AnimalCrossingIsland({ counts }) {
  return (
    <group>
      {/* --- 1. NATURAL TERRAIN & CLIFFS (3-TIER TERRACE) --- */}
      
      {/* River Basin at front */}
      <mesh position={[0, -0.4, 11]} receiveShadow>
        <boxGeometry args={[28, 0.4, 8]} />
        <meshStandardMaterial color="#5ab3e8" roughness={0.15} metalness={0.1} />
      </mesh>

      {/* Tier 1: Ground / Roost Cafe Lawn (Y: 0 to 0.6, Z: 2 to 9) */}
      <group position={[0, 0, 5.5]}>
        <mesh position={[0, 0.3, 0]} receiveShadow castShadow>
          <boxGeometry args={[18, 0.6, 7]} />
          <meshStandardMaterial color="#cfa170" roughness={0.9} /> {/* Dirt cliff side */}
        </mesh>
        <mesh position={[0, 0.61, 0]} receiveShadow>
          <boxGeometry args={[18.1, 0.05, 7.1]} />
          <meshStandardMaterial color="#7ec850" roughness={0.8} /> {/* Grass top */}
        </mesh>
      </group>

      {/* Tier 2: Mid-Level Cliff & Wooden Deck (Creative Studio) (Y: 2.2, Z: -2) */}
      <group position={[0, 0, -2]}>
        <mesh position={[0, 1.1, 0]} receiveShadow castShadow>
          <boxGeometry args={[14, 2.2, 7.5]} />
          <meshStandardMaterial color="#cfa170" roughness={0.9} />
        </mesh>
        <mesh position={[0, 2.21, 0]} receiveShadow>
          <boxGeometry args={[14.1, 0.05, 7.6]} />
          <meshStandardMaterial color="#7ec850" roughness={0.8} />
        </mesh>
        {/* Wooden Deck Planks */}
        <mesh position={[0, 2.26, 0]} receiveShadow castShadow>
          <boxGeometry args={[13.4, 0.08, 6.9]} />
          <meshStandardMaterial color="#c68b59" roughness={0.5} />
        </mesh>
      </group>

      {/* Tier 3: High Cliff (Ruang Bos & Perpustakaan Outdoor) (Y: 4.2, Z: -8.5) */}
      <group position={[0, 0, -8.5]}>
        <mesh position={[0, 2.1, 0]} receiveShadow castShadow>
          <boxGeometry args={[14, 4.2, 5.5]} />
          <meshStandardMaterial color="#cfa170" roughness={0.9} />
        </mesh>
        <mesh position={[0, 4.21, 0]} receiveShadow>
          <boxGeometry args={[14.1, 0.05, 5.6]} />
          <meshStandardMaterial color="#7ec850" roughness={0.8} />
        </mesh>
        {/* Upper Wooden Deck */}
        <mesh position={[0, 4.26, 0]} receiveShadow castShadow>
          <boxGeometry args={[13.4, 0.08, 4.9]} />
          <meshStandardMaterial color="#b07d52" roughness={0.45} />
        </mesh>
      </group>

      {/* --- 2. LOG STAIRS (INCLINES) --- */}
      {/* Stairs from Tier 1 to Tier 2 */}
      <group position={[0, 0.6, 1.8]}>
        {[0, 1, 2, 3, 4, 5].map(step => (
          <mesh
            key={step}
            position={[0, step * 0.28 + 0.14, -step * 0.35]}
            receiveShadow
            castShadow
          >
            <boxGeometry args={[2.0, 0.16, 0.42]} />
            <meshStandardMaterial color="#9c6644" roughness={0.7} />
          </mesh>
        ))}
      </group>

      {/* Stairs from Tier 2 to Tier 3 */}
      <group position={[0, 2.3, -5.7]}>
        {[0, 1, 2, 3, 4, 5].map(step => (
          <mesh
            key={step}
            position={[0, step * 0.33 + 0.16, -step * 0.32]}
            receiveShadow
            castShadow
          >
            <boxGeometry args={[1.8, 0.16, 0.38]} />
            <meshStandardMaterial color="#9c6644" roughness={0.7} />
          </mesh>
        ))}
      </group>

      {/* --- 3. COUNTRY LOG FENCES --- */}
      {/* Tier 2 Perimeter Fences */}
      {[-6.4, 6.4].map((x, i) => (
        <group key={`t2-side-${i}`}>
          {[-5, -4, -3, -2, -1, 0, 1].map(z => (
            <mesh key={z} position={[x, 2.65, z]} castShadow>
              <cylinderGeometry args={[0.08, 0.09, 0.7, 10]} />
              <meshStandardMaterial color="#8b5a2b" roughness={0.8} />
            </mesh>
          ))}
          {/* Horizontal cross log */}
          <mesh position={[x, 2.75, -2]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 6, 8]} />
            <meshStandardMaterial color="#8b5a2b" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Tier 3 Perimeter Fences */}
      {[-6.4, 6.4].map((x, i) => (
        <group key={`t3-side-${i}`}>
          {[-10.5, -9.5, -8.5, -7.5, -6.5].map(z => (
            <mesh key={z} position={[x, 4.65, z]} castShadow>
              <cylinderGeometry args={[0.08, 0.09, 0.7, 10]} />
              <meshStandardMaterial color="#8b5a2b" roughness={0.8} />
            </mesh>
          ))}
        </group>
      ))}

      {/* --- 4. GRAND OUTDOOR BOOKSHELVES WALL (TIER 3) --- */}
      {/* Large library bookshelves lining the back cliff */}
      {[-4.2, 0, 4.2].map((x, i) => (
        <group key={`shelf-${i}`} position={[x, 4.3, -10.8]}>
          {/* Main Wooden Cabinet */}
          <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
            <boxGeometry args={[4.0, 3.6, 0.7]} />
            <meshStandardMaterial color="#582f0e" roughness={0.6} />
          </mesh>
          {/* Colorful Book Rows */}
          {[-0.9, 0, 0.9, 1.8].map((y, rowIdx) => (
            <mesh key={rowIdx} position={[0, y, 0.05]} castShadow>
              <boxGeometry args={[3.7, 0.65, 0.68]} />
              <meshStandardMaterial
                color={['#d4a373', '#e76f51', '#2a9d8f', '#e9c46a'][rowIdx % 4]}
                roughness={0.7}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* --- 5. COZY BRICK FIREPLACE & TEAPOT --- */}
      <group position={[4.5, 4.3, -7.5]}>
        {/* Brick Base */}
        <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 1.4, 0.9]} />
          <meshStandardMaterial color="#9c4a36" roughness={0.9} />
        </mesh>
        {/* Fire Cavity */}
        <mesh position={[0, 0.45, 0.2]}>
          <boxGeometry args={[0.8, 0.7, 0.6]} />
          <meshBasicMaterial color="#1a0f0f" />
        </mesh>
        {/* Glowing Ember */}
        <pointLight position={[0, 0.5, 0.2]} color="#ff7b00" intensity={2.5} distance={3} />
        {/* Chimney Pipe */}
        <mesh position={[0, 2.0, 0]} castShadow>
          <boxGeometry args={[0.6, 1.4, 0.6]} />
          <meshStandardMaterial color="#7f2e1e" roughness={0.9} />
        </mesh>
        {/* White Porcelain Teapot on Mantel */}
        <mesh position={[0, 1.52, 0]} castShadow>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
      </group>

      {/* --- 6. RATTAN FURNITURE SETS --- */}
      {/* Tier 3: Reading Lounge */}
      <group position={[-3.5, 4.3, -7.5]}>
        {/* Rattan Round Coffee Table */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.55, 0.5, 0.65, 18]} />
          <meshStandardMaterial color="#c89f65" roughness={0.8} />
        </mesh>
        {/* Table Top Book & Coffee */}
        <mesh position={[0, 0.7, 0]}>
          <boxGeometry args={[0.3, 0.05, 0.22]} />
          <meshStandardMaterial color="#3a86ff" />
        </mesh>

        {/* Left Armchair with Soft Cushion */}
        <mesh position={[-1.1, 0.35, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.42, 0.4, 0.5, 16]} />
          <meshStandardMaterial color="#c89f65" roughness={0.8} />
        </mesh>
        <mesh position={[-1.1, 0.65, 0]} castShadow>
          <boxGeometry args={[0.55, 0.12, 0.55]} />
          <meshStandardMaterial color="#fefae0" roughness={0.9} />
        </mesh>

        {/* Right Armchair with Soft Cushion */}
        <mesh position={[1.1, 0.35, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.42, 0.4, 0.5, 16]} />
          <meshStandardMaterial color="#c89f65" roughness={0.8} />
        </mesh>
        <mesh position={[1.1, 0.65, 0]} castShadow>
          <boxGeometry args={[0.55, 0.12, 0.55]} />
          <meshStandardMaterial color="#fefae0" roughness={0.9} />
        </mesh>
      </group>

      {/* --- 7. TIER 2 CREATIVE STUDIO WORKSPACES --- */}
      {[-3.2, 3.2].map((x, i) => (
        <group key={`studio-desk-${i}`} position={[x, 2.3, -0.5]}>
          {/* Wooden Work Table */}
          <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
            <boxGeometry args={[3.2, 0.12, 1.6]} />
            <meshStandardMaterial color="#d4a373" roughness={0.6} />
          </mesh>
          {/* Wooden Table Legs */}
          {[-1.4, 1.4].map(lx =>
            [-0.6, 0.6].map(lz => (
              <mesh key={`${lx}-${lz}`} position={[lx, 0.22, lz]} castShadow>
                <cylinderGeometry args={[0.06, 0.06, 0.45, 8]} />
                <meshStandardMaterial color="#9c6644" roughness={0.7} />
              </mesh>
            ))
          )}
          {/* Cute Mint Laptops */}
          <mesh position={[-0.8, 0.55, 0]} castShadow>
            <boxGeometry args={[0.55, 0.04, 0.4]} />
            <meshStandardMaterial color="#76cdbe" roughness={0.4} />
          </mesh>
          <mesh position={[0.8, 0.55, 0]} castShadow>
            <boxGeometry args={[0.55, 0.04, 0.4]} />
            <meshStandardMaterial color="#fcd34d" roughness={0.4} />
          </mesh>
          {/* Potted Succulent Plant */}
          <mesh position={[0, 0.6, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.08, 0.16, 10]} />
            <meshStandardMaterial color="#d97706" />
          </mesh>
          <mesh position={[0, 0.74, 0]} castShadow>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#2d6a4f" />
          </mesh>
        </group>
      ))}

      {/* --- 8. TIER 1 THE ROOST CAFE COUNTER --- */}
      <group position={[0, 0.6, 6]}>
        {/* Mahogany Coffee Bar */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[7.5, 0.9, 1.6]} />
          <meshStandardMaterial color="#4a2810" roughness={0.4} />
        </mesh>
        {/* Coffee Mugs with tiny saucers */}
        {[-2.5, -1.2, 0, 1.2, 2.5].map((mx, idx) => (
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
      </group>

      {/* --- 9. PINE TREES (CEDAR TREES SURROUNDING CLIFFS) --- */}
      {[
        [-8.5, 4.3, -10.5],
        [8.5, 4.3, -10.5],
        [-8.2, 2.3, -3.5],
        [8.2, 2.3, -3.5],
        [-10, 0.6, 4.5],
        [10, 0.6, 4.5],
      ].map(([tx, ty, tz], idx) => (
        <group key={`tree-${idx}`} position={[tx, ty, tz]}>
          {/* Wood Trunk */}
          <mesh position={[0, 1.0, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.32, 2.0, 10]} />
            <meshStandardMaterial color="#6f4e37" roughness={0.8} />
          </mesh>
          {/* Tiered Foliage Cones */}
          <mesh position={[0, 2.6, 0]} castShadow>
            <coneGeometry args={[1.5, 2.0, 10]} />
            <meshStandardMaterial color="#2d6a4f" roughness={0.9} />
          </mesh>
          <mesh position={[0, 3.8, 0]} castShadow>
            <coneGeometry args={[1.2, 1.8, 10]} />
            <meshStandardMaterial color="#40916c" roughness={0.9} />
          </mesh>
          <mesh position={[0, 4.8, 0]} castShadow>
            <coneGeometry args={[0.8, 1.4, 10]} />
            <meshStandardMaterial color="#52b788" roughness={0.9} />
          </mesh>
        </group>
      ))}

      {/* --- 10. 3D HTML ZONE BADGES --- */}
      {/* Tier 3: Ruang Bos */}
      <Html position={[0, 8.2, -9]} center distanceFactor={18}>
        <div className="px-3 py-1 rounded-full bg-[#fef9e7] border-2 border-[#5c3a21] shadow-[0_3px_0_#5c3a21] text-[#5c3a21] text-xs font-black flex items-center gap-1.5 whitespace-nowrap pointer-events-none select-none">
          <span>👑</span> Ruang Bos & Arsip (@Ai)
        </div>
      </Html>

      {/* Tier 2: Creative Studio */}
      <Html position={[0, 5.0, -1.5]} center distanceFactor={18}>
        <div className="px-3 py-1 rounded-full bg-[#e0f5f0] border-2 border-[#286f63] shadow-[0_3px_0_#286f63] text-[#1b4b41] text-xs font-black flex items-center gap-1.5 whitespace-nowrap pointer-events-none select-none">
          <span>🎨</span> Creative Studio ({counts.working} kerja)
        </div>
      </Html>

      {/* Tier 1: Roost Cafe */}
      <Html position={[0, 2.6, 6]} center distanceFactor={18}>
        <div className="px-3 py-1 rounded-full bg-[#fef3c7] border-2 border-[#92400e] shadow-[0_3px_0_#92400e] text-[#92400e] text-xs font-black flex items-center gap-1.5 whitespace-nowrap pointer-events-none select-none">
          <span>☕</span> The Roost Cafe ({counts.standby} santai)
        </div>
      </Html>
    </group>
  )
}
