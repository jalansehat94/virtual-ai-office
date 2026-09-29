import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

export default function Villager({ agent, status, isSelected, showLabels, onClick }) {
  const groupRef = useRef()
  const earsRef = useRef()
  const leftArmRef = useRef()
  const rightArmRef = useRef()

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

    // Smooth movement to target position
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPos[0], delta * 3.2)
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetPos[2], delta * 3.2)

    // Authentic Animal Crossing hop & gentle idle bounce
    const hopSpeed = status === 'working' ? 1.8 : 4
    const hopHeight = status === 'working' ? 0.025 : 0.09
    const hop = Math.abs(Math.sin(t * hopSpeed + idx * 0.7)) * hopHeight
    const targetY = targetPos[1] + hop
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 8)

    // Side-to-side waddle when walking/chilling
    if (status !== 'working') {
      groupRef.current.rotation.z = Math.sin(t * 3.5 + idx * 0.7) * 0.06
    } else {
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, delta * 5)
    }

    // Ear twitches
    if (earsRef.current) {
      earsRef.current.rotation.z = Math.sin(t * 5 + idx) * 0.07
    }

    // Typing paw movements at laptop
    if (status === 'working' && leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.x = -0.7 + Math.sin(t * 14 + idx) * 0.15
      rightArmRef.current.rotation.x = -0.7 + Math.cos(t * 14 + idx) * 0.15
    } else if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.x = -0.2
      rightArmRef.current.rotation.x = -0.2
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
      {/* --- 1. FLOATING 3D THOUGHT/ACTION BUBBLE --- */}
      {showLabels && (
        <Html position={[0, 2.3, 0]} center distanceFactor={14}>
          <div
            className={`px-2.5 py-1 rounded-2xl flex items-center gap-1.5 shadow-[0_3px_0_rgba(0,0,0,0.15)] text-[10px] font-black whitespace-nowrap select-none transition-all duration-300 pointer-events-none ${
              isWorking
                ? 'bg-[#e0f5f0] text-[#1b4b41] border-2 border-[#76cdbe] animate-bounce'
                : 'bg-[#fef9e7] text-[#8b5a2b] border-2 border-[#d4a373]'
            }`}
          >
            <span className="text-xs">{isWorking ? (agent.bubbleIcon || '💻') : '☕'}</span>
            <span className="truncate max-w-[130px]">
              {isWorking ? agent.bubbleText : 'Santai di Roost'}
            </span>
          </div>
        </Html>
      )}

      {/* --- 2. OPERATING LAPTOP (WHEN WORKING) --- */}
      {isWorking && (
        <group position={[0, 0.46, 0.38]}>
          {/* Laptop Base (Aluminum body) */}
          <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.55, 0.02, 0.38]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.5} roughness={0.3} />
          </mesh>
          {/* Trackpad */}
          <mesh position={[0, 0.032, 0.1]}>
            <planeGeometry args={[0.18, 0.09]} />
            <meshBasicMaterial color="#94a3b8" />
          </mesh>
          {/* Keyboard Keys */}
          <mesh position={[0, 0.032, -0.05]}>
            <planeGeometry args={[0.48, 0.16]} />
            <meshBasicMaterial color="#334155" />
          </mesh>

          {/* Open Laptop Screen Lid */}
          <group position={[0, 0.03, -0.19]} rotation={[-0.35, 0, 0]}>
            <mesh position={[0, 0.18, 0]} castShadow>
              <boxGeometry args={[0.55, 0.36, 0.02]} />
              <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Glowing Screen Matrix */}
            <mesh position={[0, 0.18, 0.012]}>
              <planeGeometry args={[0.5, 0.31]} />
              <meshBasicMaterial color="#10b981" />
            </mesh>
            {/* Screen point light */}
            <pointLight position={[0, 0.18, 0.1]} color="#76cdbe" intensity={1.3} distance={1.6} />
          </group>
        </group>
      )}

      {/* --- 3. ANIMAL CROSSING VILLAGER (AUTHENTIC PROPORTIONS) --- */}
      
      {/* A. Chubby Rounded Head (Squircle AC Silhouette) */}
      <group position={[0, 1.2, 0]}>
        <mesh scale={[1.1, 0.96, 1.02]} castShadow>
          <sphereGeometry args={[0.42, 28, 28]} />
          <meshStandardMaterial color={agent.color} roughness={0.4} />
        </mesh>

        {/* White / Cream Cheek Patches (AC signature fur mask) */}
        <mesh position={[-0.24, -0.06, 0.22]} rotation={[0, -0.3, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#fefae0" roughness={0.5} />
        </mesh>
        <mesh position={[0.24, -0.06, 0.22]} rotation={[0, 0.3, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#fefae0" roughness={0.5} />
        </mesh>

        {/* Muzzle / Snout (Cream Ellipsoid) */}
        <mesh position={[0, -0.08, 0.34]} scale={[1.2, 0.85, 0.9]} castShadow>
          <sphereGeometry args={[0.16, 18, 18]} />
          <meshStandardMaterial color="#ffffff" roughness={0.35} />
        </mesh>

        {/* Tiny Button Nose */}
        <mesh position={[0, -0.02, 0.47]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshBasicMaterial color="#1f2937" />
        </mesh>

        {/* Cute Smiling Mouth */}
        <mesh position={[0, -0.11, 0.47]} rotation={[0, 0, Math.PI]}>
          <torusGeometry args={[0.035, 0.008, 8, 16, Math.PI]} />
          <meshBasicMaterial color="#7f1d1d" />
        </mesh>

        {/* Big Expressive Animal Crossing Eyes */}
        <group position={[-0.17, 0.05, 0.36]} rotation={[0, -0.15, 0]}>
          {/* Black Sclera/Pupil */}
          <mesh>
            <circleGeometry args={[0.075, 20]} />
            <meshBasicMaterial color="#1e1e24" />
          </mesh>
          {/* Crisp Specular Light Catch (Eye Sparkle) */}
          <mesh position={[-0.025, 0.025, 0.002]}>
            <circleGeometry args={[0.025, 12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.02, -0.02, 0.002]}>
            <circleGeometry args={[0.012, 10]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        <group position={[0.17, 0.05, 0.36]} rotation={[0, 0.15, 0]}>
          <mesh>
            <circleGeometry args={[0.075, 20]} />
            <meshBasicMaterial color="#1e1e24" />
          </mesh>
          <mesh position={[-0.025, 0.025, 0.002]}>
            <circleGeometry args={[0.025, 12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.02, -0.02, 0.002]}>
            <circleGeometry args={[0.012, 10]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* Cute Cream Eyebrow Dots (Signature Red Panda / ACNH look) */}
        <mesh position={[-0.15, 0.22, 0.38]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color="#fefae0" />
        </mesh>
        <mesh position={[0.15, 0.22, 0.38]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color="#fefae0" />
        </mesh>

        {/* Blushing Pink Cheeks */}
        <mesh position={[-0.27, -0.08, 0.3]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color="#ff758f" />
        </mesh>
        <mesh position={[0.27, -0.08, 0.3]}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color="#ff758f" />
        </mesh>

        {/* Ears Hierarchy (Matching Red Panda / Animal Crossing ears) */}
        <group ref={earsRef}>
          {agent.species === 'bunny' ? (
            <>
              {/* Ai Floppy Bunny Ears */}
              <group position={[-0.18, 0.42, 0]} rotation={[-0.1, 0, 0.18]}>
                <mesh castShadow>
                  <cylinderGeometry args={[0.07, 0.1, 0.46, 16]} />
                  <meshStandardMaterial color={agent.color} roughness={0.4} />
                </mesh>
                <mesh position={[0, 0, 0.04]}>
                  <cylinderGeometry args={[0.04, 0.06, 0.38, 16]} />
                  <meshBasicMaterial color="#fecdd3" />
                </mesh>
              </group>
              <group position={[0.18, 0.42, 0]} rotation={[-0.1, 0, -0.18]}>
                <mesh castShadow>
                  <cylinderGeometry args={[0.07, 0.1, 0.46, 16]} />
                  <meshStandardMaterial color={agent.color} roughness={0.4} />
                </mesh>
                <mesh position={[0, 0, 0.04]}>
                  <cylinderGeometry args={[0.04, 0.06, 0.38, 16]} />
                  <meshBasicMaterial color="#fecdd3" />
                </mesh>
              </group>
            </>
          ) : agent.species === 'owl_cat' ? (
            <>
              {/* Luna Professor Mortarboard Cap */}
              <mesh position={[0, 0.44, 0]} castShadow>
                <boxGeometry args={[0.55, 0.04, 0.55]} />
                <meshStandardMaterial color="#2e1065" roughness={0.3} />
              </mesh>
              <mesh position={[0, 0.48, 0]}>
                <cylinderGeometry args={[0.12, 0.12, 0.07, 12]} />
                <meshStandardMaterial color="#fbbf24" />
              </mesh>
            </>
          ) : (
            <>
              {/* Large Triangular Animal Ears with Cream Inner Fluff (Red Panda style) */}
              <group position={[-0.32, 0.34, 0]} rotation={[0, 0.2, 0.45]}>
                <mesh scale={[1.2, 1.4, 0.5]} castShadow>
                  <coneGeometry args={[0.18, 0.34, 4]} />
                  <meshStandardMaterial color={agent.color} roughness={0.4} />
                </mesh>
                <mesh position={[0, -0.02, 0.04]} scale={[0.8, 1.0, 0.4]}>
                  <coneGeometry args={[0.14, 0.28, 4]} />
                  <meshBasicMaterial color="#fefae0" />
                </mesh>
              </group>

              <group position={[0.32, 0.34, 0]} rotation={[0, -0.2, -0.45]}>
                <mesh scale={[1.2, 1.4, 0.5]} castShadow>
                  <coneGeometry args={[0.18, 0.34, 4]} />
                  <meshStandardMaterial color={agent.color} roughness={0.4} />
                </mesh>
                <mesh position={[0, -0.02, 0.04]} scale={[0.8, 1.0, 0.4]}>
                  <coneGeometry args={[0.14, 0.28, 4]} />
                  <meshBasicMaterial color="#fefae0" />
                </mesh>
              </group>
            </>
          )}
        </group>
      </group>

      {/* B. Animal Crossing Conical A-Line Sweater Tunic */}
      <mesh position={[0, 0.62, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.36, 0.58, 20]} />
        <meshStandardMaterial color={agent.sweater} roughness={0.6} />
      </mesh>
      {/* White Collar trim */}
      <mesh position={[0, 0.88, 0]}>
        <torusGeometry args={[0.19, 0.025, 8, 24]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>

      {/* C. Slim Arms & White Paws */}
      <group ref={leftArmRef} position={[-0.26, 0.74, 0.02]}>
        <mesh position={[0, -0.16, 0]} rotation={[0, 0, 0.25]} castShadow>
          <cylinderGeometry args={[0.06, 0.065, 0.32, 12]} />
          <meshStandardMaterial color={agent.sweater} />
        </mesh>
        <mesh position={[-0.04, -0.32, 0.02]}>
          <sphereGeometry args={[0.075, 12, 12]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
      </group>

      <group ref={rightArmRef} position={[0.26, 0.74, 0.02]}>
        <mesh position={[0, -0.16, 0]} rotation={[0, 0, -0.25]} castShadow>
          <cylinderGeometry args={[0.06, 0.065, 0.32, 12]} />
          <meshStandardMaterial color={agent.sweater} />
        </mesh>
        <mesh position={[0.04, -0.32, 0.02]}>
          <sphereGeometry args={[0.075, 12, 12]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
      </group>

      {/* D. Little Slim Legs & Paws */}
      <mesh position={[-0.14, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.065, 0.065, 0.26, 12]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.14, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.065, 0.065, 0.26, 12]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Brown Shoes / Foot Pads */}
      <mesh position={[-0.14, 0.08, 0.04]} castShadow>
        <boxGeometry args={[0.13, 0.08, 0.18]} />
        <meshStandardMaterial color="#5c3a21" />
      </mesh>
      <mesh position={[0.14, 0.08, 0.04]} castShadow>
        <boxGeometry args={[0.13, 0.08, 0.18]} />
        <meshStandardMaterial color="#5c3a21" />
      </mesh>

      {/* Selection Glow Ring */}
      {isSelected && (
        <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.45, 0.58, 24]} />
          <meshBasicMaterial color="#f59e0b" side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Soft Contact Shadow Disc */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.42, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.25} />
      </mesh>
    </group>
  )
}
