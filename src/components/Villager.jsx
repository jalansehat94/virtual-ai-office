import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Villager({ agent, status, isSelected, onClick }) {
  const groupRef = useRef()
  const earsRef = useRef()

  // Target position based on status ('working' -> deskPos, 'standby' -> pantryPos)
  const targetPos = status === 'working' ? agent.deskPos : agent.pantryPos

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    const idx = agent.id.length

    // Smooth lerp movement to target position
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPos[0], delta * 3)
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetPos[2], delta * 3)

    // Bouncy Animal Crossing hop & waddle
    const hop = Math.abs(Math.sin(t * 4 + idx * 0.7)) * 0.12
    const targetY = targetPos[1] + hop
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 8)

    // Side-to-side cute body waddle
    groupRef.current.rotation.z = Math.sin(t * 4 + idx * 0.7) * 0.08

    // Ear wiggles
    if (earsRef.current) {
      earsRef.current.rotation.z = Math.sin(t * 6 + idx) * 0.1
    }
  })

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
      {/* 1. Chubby Head */}
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

      {/* Species-Specific Ears / Accessories */}
      <group ref={earsRef}>
        {agent.species === 'bunny' && (
          <>
            {/* Ai: Floppy Bunny Ears */}
            <mesh position={[-0.16, 1.58, 0]} rotation={[ -0.1, 0, 0.15 ]} castShadow>
              <cylinderGeometry args={[0.07, 0.09, 0.44, 16]} />
              <meshStandardMaterial color={agent.color} roughness={0.4} />
            </mesh>
            <mesh position={[0.16, 1.58, 0]} rotation={[ -0.1, 0, -0.15 ]} castShadow>
              <cylinderGeometry args={[0.07, 0.09, 0.44, 16]} />
              <meshStandardMaterial color={agent.color} roughness={0.4} />
            </mesh>
          </>
        )}

        {agent.species === 'owl_cat' && (
          <>
            {/* Luna: Graduation Mortarboard Cap */}
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
            {/* Round Bear Ears */}
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
          /* Kaktus: Yellow Blossom Sprout */
          <mesh position={[0, 1.56, 0]} castShadow>
            <dodecahedronGeometry args={[0.14]} />
            <meshStandardMaterial color="#facc15" roughness={0.3} />
          </mesh>
        )}

        {agent.species === 'turtle' && (
          /* Rem: Round Turtle Shell on Back */
          <mesh position={[0, 0.58, -0.25]} rotation={[Math.PI / 4, 0, 0]} castShadow>
            <sphereGeometry args={[0.26, 12, 12]} />
            <meshStandardMaterial color="#2d6a4f" roughness={0.6} />
          </mesh>
        )}

        {/* Default / Puppy / Kitty Pointy Ears */}
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

      {/* 2. Chubby Sweated Body */}
      <mesh position={[0, 0.58, 0]} castShadow>
        <cylinderGeometry args={[0.24, 0.36, 0.6, 18]} />
        <meshStandardMaterial color={agent.sweater} roughness={0.5} />
      </mesh>

      {/* 3. Stubby Paws */}
      <mesh position={[-0.34, 0.58, 0.08]} castShadow>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color={agent.color} />
      </mesh>
      <mesh position={[0.34, 0.58, 0.08]} castShadow>
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
          <ringGeometry args={[0.42, 0.52, 24]} />
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
