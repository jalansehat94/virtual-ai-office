import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

export default function Villager({ agent, status, isSelected, showLabels, onClick }) {
  const groupRef = useRef()
  const earsRef = useRef()
  const leftPawRef = useRef()
  const rightPawRef = useRef()

  // Target position based on status
  let targetPos = agent.pantryPos
  if (status === 'working') {
    targetPos = agent.deskPos
  } else if (status === 'collaborating' && agent.meetingPos) {
    targetPos = agent.meetingPos
  } else if (status === 'researching' && agent.bookshelfPos) {
    targetPos = agent.bookshelfPos
  }

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    const idx = agent.id.length

    // Smooth lerp movement to target position
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPos[0], delta * 3.2)
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetPos[2], delta * 3.2)

    // Bouncy Animal Crossing hop & waddle
    const hopSpeed = status === 'working' ? 1.5 : 4
    const hopHeight = status === 'working' ? 0.03 : 0.12
    const hop = Math.abs(Math.sin(t * hopSpeed + idx * 0.7)) * hopHeight
    const targetY = targetPos[1] + hop
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 8)

    // Side-to-side cute body waddle (only when moving/chilling)
    if (status !== 'working') {
      groupRef.current.rotation.z = Math.sin(t * 4 + idx * 0.7) * 0.08
    } else {
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, delta * 5)
    }

    // Ear wiggles
    if (earsRef.current) {
      earsRef.current.rotation.z = Math.sin(t * 6 + idx) * 0.1
    }

    // Typing paw animations when working at laptop
    if (status === 'working' && leftPawRef.current && rightPawRef.current) {
      leftPawRef.current.position.y = 0.58 + Math.sin(t * 14 + idx) * 0.06
      leftPawRef.current.position.z = 0.22 + Math.cos(t * 14 + idx) * 0.04
      rightPawRef.current.position.y = 0.58 + Math.cos(t * 14 + idx) * 0.06
      rightPawRef.current.position.z = 0.22 + Math.sin(t * 14 + idx) * 0.04
    } else if (leftPawRef.current && rightPawRef.current) {
      leftPawRef.current.position.set(-0.34, 0.58, 0.08)
      rightPawRef.current.position.set(0.34, 0.58, 0.08)
    }
  })

  const isWorking = status === 'working'

  return (
    <group
      ref={groupRef}
      position={[targetPos[0], targetPos[1], targetPos[2]]}
      onClick={(e) => {
        e.stopPropagation()
        onClick(agent)
      }}
      cursor="pointer"
    >
      {/* --- 1. FLOATING THOUGHT / ACTION BUBBLE (STAR-OFFICE STYLE) --- */}
      {showLabels && (
        <Html position={[0, 2.15, 0]} center distanceFactor={14}>
          <div
            className={`px-2.5 py-1 rounded-2xl flex items-center gap-1.5 shadow-[0_3px_0_rgba(0,0,0,0.15)] text-[10px] font-black whitespace-nowrap select-none transition-all duration-300 pointer-events-none ${
              isWorking
                ? 'bg-[#e0f5f0] text-[#1b4b41] border-2 border-[#76cdbe] animate-bounce'
                : 'bg-[#fef9e7] text-[#8b5a2b] border-2 border-[#d4a373]'
            }`}
          >
            <span className="text-xs">{isWorking ? (agent.bubbleIcon || '💻') : '☕'}</span>
            <span className="truncate max-w-[120px]">
              {isWorking ? agent.bubbleText : 'Santai di Cafe'}
            </span>
          </div>
        </Html>
      )}

      {/* --- 2. LAPTOP ON DESK (WHEN WORKING) --- */}
      {isWorking && (
        <group position={[0, 0.45, 0.35]}>
          {/* Laptop Base (Keyboard) */}
          <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.55, 0.02, 0.38]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.5} roughness={0.3} />
          </mesh>
          {/* Glowing Trackpad */}
          <mesh position={[0, 0.032, 0.1]}>
            <planeGeometry args={[0.18, 0.1]} />
            <meshBasicMaterial color="#94a3b8" />
          </mesh>
          {/* Keypad surface */}
          <mesh position={[0, 0.032, -0.05]}>
            <planeGeometry args={[0.48, 0.16]} />
            <meshBasicMaterial color="#334155" />
          </mesh>

          {/* Laptop Screen Lid (Open 70 degrees) */}
          <group position={[0, 0.03, -0.19]} rotation={[-0.35, 0, 0]}>
            {/* Screen Lid Back */}
            <mesh position={[0, 0.18, 0]} castShadow>
              <boxGeometry args={[0.55, 0.36, 0.02]} />
              <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Screen Display (Glowing Terminal Display) */}
            <mesh position={[0, 0.18, 0.012]}>
              <planeGeometry args={[0.5, 0.31]} />
              <meshBasicMaterial color="#10b981" />
            </mesh>
            {/* Soft Screen Light onto character */}
            <pointLight position={[0, 0.18, 0.1]} color="#76cdbe" intensity={1.2} distance={1.5} />
          </group>
        </group>
      )}

      {/* --- 3. CHUBBY VILLAGER MODEL --- */}
      
      {/* Chubby Head */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <sphereGeometry args={[0.38, 24, 24]} />
        <meshStandardMaterial color={agent.color} roughness={0.4} />
      </mesh>

      {/* Blushing Cheeks */}
      <mesh position={[-0.24, 1.1, 0.28]}>
        <sphereGeometry args={[0.065, 12, 12]} />
        <meshBasicMaterial color="#ff8fa3" />
      </mesh>
      <mesh position={[0.24, 1.1, 0.28]}>
        <sphereGeometry args={[0.065, 12, 12]} />
        <meshBasicMaterial color="#ff8fa3" />
      </mesh>

      {/* Glossy Eyes */}
      <mesh position={[-0.14, 1.2, 0.33]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#1f2937" />
      </mesh>
      <mesh position={[0.14, 1.2, 0.33]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color="#1f2937" />
      </mesh>

      {/* Ears / Caps */}
      <group ref={earsRef}>
        {agent.species === 'bunny' && (
          <>
            <mesh position={[-0.16, 1.58, 0]} rotation={[-0.1, 0, 0.15]} castShadow>
              <cylinderGeometry args={[0.07, 0.09, 0.44, 16]} />
              <meshStandardMaterial color={agent.color} roughness={0.4} />
            </mesh>
            <mesh position={[0.16, 1.58, 0]} rotation={[-0.1, 0, -0.15]} castShadow>
              <cylinderGeometry args={[0.07, 0.09, 0.44, 16]} />
              <meshStandardMaterial color={agent.color} roughness={0.4} />
            </mesh>
          </>
        )}

        {agent.species === 'owl_cat' && (
          <>
            <mesh position={[0, 1.54, 0]} castShadow>
              <boxGeometry args={[0.45, 0.04, 0.45]} />
              <meshStandardMaterial color="#2e1065" roughness={0.3} />
            </mesh>
            <mesh position={[0, 1.58, 0]} castShadow>
              <cylinderGeometry args={[0.1, 0.1, 0.06, 12]} />
              <meshStandardMaterial color="#fbbf24" />
            </mesh>
          </>
        )}

        {(agent.species === 'bear' || agent.species === 'bear_big' || agent.species === 'red_panda') && (
          <>
            <mesh position={[-0.28, 1.45, 0]} castShadow>
              <sphereGeometry args={[0.11, 14, 14]} />
              <meshStandardMaterial color={agent.color} roughness={0.4} />
            </mesh>
            <mesh position={[0.28, 1.45, 0]} castShadow>
              <sphereGeometry args={[0.11, 14, 14]} />
              <meshStandardMaterial color={agent.color} roughness={0.4} />
            </mesh>
          </>
        )}

        {agent.species === 'cactus' && (
          <mesh position={[0, 1.56, 0]} castShadow>
            <dodecahedronGeometry args={[0.14]} />
            <meshStandardMaterial color="#facc15" roughness={0.3} />
          </mesh>
        )}

        {agent.species === 'turtle' && (
          <mesh position={[0, 0.58, -0.25]} rotation={[Math.PI / 4, 0, 0]} castShadow>
            <sphereGeometry args={[0.26, 12, 12]} />
            <meshStandardMaterial color="#2d6a4f" roughness={0.6} />
          </mesh>
        )}

        {['puppy', 'raccoon', 'wolf', 'badger', 'hedgehog', 'bulldog', 'cat', 'cat_lucky'].includes(agent.species) && (
          <>
            <mesh position={[-0.22, 1.48, 0]} rotation={[0, Math.PI / 4, 0.3]} castShadow>
              <coneGeometry args={[0.11, 0.25, 4]} />
              <meshStandardMaterial color={agent.color} roughness={0.4} />
            </mesh>
            <mesh position={[0.22, 1.48, 0]} rotation={[0, Math.PI / 4, -0.3]} castShadow>
              <coneGeometry args={[0.11, 0.25, 4]} />
              <meshStandardMaterial color={agent.color} roughness={0.4} />
            </mesh>
          </>
        )}
      </group>

      {/* Sweated Body */}
      <mesh position={[0, 0.58, 0]} castShadow>
        <cylinderGeometry args={[0.24, 0.36, 0.6, 18]} />
        <meshStandardMaterial color={agent.sweater} roughness={0.5} />
      </mesh>

      {/* Typing Animated Paws */}
      <mesh ref={leftPawRef} position={[-0.34, 0.58, 0.08]} castShadow>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color={agent.color} />
      </mesh>
      <mesh ref={rightPawRef} position={[0.34, 0.58, 0.08]} castShadow>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color={agent.color} />
      </mesh>

      {/* Feet */}
      <mesh position={[-0.16, 0.12, 0.05]} castShadow>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial color="#475569" />
      </mesh>
      <mesh position={[0.16, 0.12, 0.05]} castShadow>
        <sphereGeometry args={[0.1, 10, 10]} />
        <meshStandardMaterial color="#475569" />
      </mesh>

      {/* Selection Glow Ring */}
      {isSelected && (
        <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.42, 0.55, 24]} />
          <meshBasicMaterial color="#f59e0b" side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Soft Contact Shadow Disc */}
      <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.38, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.25} />
      </mesh>
    </group>
  )
}
