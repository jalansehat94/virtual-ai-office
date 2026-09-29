import React, { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

// Waypoint router for 100% natural, zero-clipping stair navigation
function getNavigationPath(startPos, endPos) {
  const startTier = startPos[1] < 1.5 ? 1 : (startPos[1] < 3.5 ? 2 : 3)
  const endTier = endPos[1] < 1.5 ? 1 : (endPos[1] < 3.5 ? 2 : 3)

  if (startTier === endTier) {
    return [endPos]
  }

  // Stairway 1 (Tier 1 <-> Tier 2, Center X: 0)
  const s1Bottom = [0.0, 0.6, 5.6]
  const s1Mid = [0.0, 1.5, 3.8]
  const s1Top = [0.0, 2.4, 2.0]

  // Stairway 2 (Tier 2 <-> Tier 3, Right X: 11.5)
  const s2Bottom = [11.5, 2.4, -8.2]
  const s2Mid = [11.5, 3.5, -10.0]
  const s2Top = [11.5, 4.6, -11.8]
  const s2Lounge = [9.0, 4.6, -14.0]

  const path = []

  if (startTier === 1 && endTier === 2) {
    path.push(s1Bottom, s1Mid, s1Top, endPos)
  } else if (startTier === 2 && endTier === 1) {
    path.push(s1Top, s1Mid, s1Bottom, endPos)
  } else if (startTier === 2 && endTier === 3) {
    path.push(s2Bottom, s2Mid, s2Top, s2Lounge, endPos)
  } else if (startTier === 3 && endTier === 2) {
    path.push(s2Lounge, s2Top, s2Mid, s2Bottom, endPos)
  } else if (startTier === 1 && endTier === 3) {
    path.push(s1Bottom, s1Mid, s1Top, s2Bottom, s2Mid, s2Top, s2Lounge, endPos)
  } else if (startTier === 3 && endTier === 1) {
    path.push(s2Lounge, s2Top, s2Mid, s2Bottom, s1Top, s1Mid, s1Bottom, endPos)
  } else {
    path.push(endPos)
  }

  return path
}

export default function Villager({ agent, status, isSelected, showLabels, isAlerted, onClick }) {
  const groupRef = useRef()
  const bodyRef = useRef()
  const headRef = useRef()
  const earsRef = useRef()
  const tailRef = useRef()
  const leftArmRef = useRef()
  const rightArmRef = useRef()
  const leftLegRef = useRef()
  const rightLegRef = useRef()

  // Target final position based on status
  // When working at desk, sit on the chair cushion behind the desk with zero clipping
  const finalPos = useMemo(() => {
    if (status === 'working') {
      return [agent.deskPos[0], agent.deskPos[1] + 0.44, agent.deskPos[2] - 0.74]
    }
    if (status === 'collaborating' && agent.meetingPos) {
      return agent.meetingPos
    }
    if (status === 'researching' && agent.bookshelfPos) {
      return agent.bookshelfPos
    }
    return agent.pantryPos
  }, [status, agent])

  // Navigation waypoint queue
  const pathRef = useRef([finalPos])
  const targetWaypointRef = useRef(finalPos)
  const isMovingRef = useRef(false)
  const [isMoving, setIsMoving] = useState(false)

  // Recalculate path when final position changes
  React.useEffect(() => {
    if (!groupRef.current) return
    const current = [
      groupRef.current.position.x,
      groupRef.current.position.y,
      groupRef.current.position.z
    ]
    const newPath = getNavigationPath(current, finalPos)
    pathRef.current = newPath
    targetWaypointRef.current = newPath[0] || finalPos
  }, [finalPos])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    const idx = (agent.id.charCodeAt(0) + agent.id.length) % 10

    const target = targetWaypointRef.current || finalPos
    const dx = target[0] - groupRef.current.position.x
    const dy = target[1] - groupRef.current.position.y
    const dz = target[2] - groupRef.current.position.z
    const horizontalDist = Math.sqrt(dx * dx + dz * dz)
    const moving = horizontalDist > 0.18

    // Update moving state with hysteresis
    if (moving !== isMovingRef.current) {
      isMovingRef.current = moving
      setIsMoving(moving)
    }

    // Waypoint reached -> pop next waypoint
    if (horizontalDist < 0.25 && pathRef.current.length > 1) {
      pathRef.current.shift()
      targetWaypointRef.current = pathRef.current[0] || finalPos
    }

    // Smooth movement
    const moveSpeed = moving ? 4.5 : 2.8
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, target[0], delta * moveSpeed)
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, target[2], delta * moveSpeed)

    // Height lerp
    const hopSpeed = moving ? 9.5 : 1.8
    const hopHeight = moving ? 0.14 : (status === 'working' ? 0.0 : 0.05)
    const hop = moving ? Math.abs(Math.sin(t * hopSpeed + idx * 0.7)) * hopHeight : 0
    const targetY = (moving ? target[1] : finalPos[1]) + hop
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 7)

    // Rotation & Facing: At desk or bar stool, face +Z (into desk/counter)
    if (moving) {
      const targetAngle = Math.atan2(dx, dz)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetAngle, delta * 7)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.12, delta * 6)
    } else {
      const isFacingDeskOrBar = status === 'working' || (finalPos[2] >= 6.8 && finalPos[2] <= 7.2)
      const idleRot = isFacingDeskOrBar ? 0 : Math.PI
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, idleRot, delta * 4)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, delta * 5)
    }

    // Dynamic Animal Crossing Squash & Stretch
    if (bodyRef.current) {
      if (moving) {
        const squash = Math.sin(t * hopSpeed * 2 + idx) * 0.06
        bodyRef.current.scale.set(1 - squash * 0.5, 1 + squash, 1 - squash * 0.5)
        // Adorable toddler waddle side-to-side
        groupRef.current.rotation.z = Math.sin(t * 5 + idx) * 0.08
      } else {
        // Gentle breathing idle
        const breath = Math.sin(t * 2.2 + idx) * 0.015
        bodyRef.current.scale.set(1 + breath * 0.2, 1 + breath, 1 + breath * 0.2)
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, delta * 5)
      }
    }

    // SITTING VS WALKING LEGS:
    // Sits if working at desk or resting on a stool/chair (height > 0.9)
    const isSitting = !moving && (status === 'working' || finalPos[1] > 0.9)
    if (leftLegRef.current && rightLegRef.current) {
      if (isSitting) {
        // PROPER SITTING POSE: Legs bend forward 90 degrees onto chair/stool cushion!
        leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, -Math.PI / 2.3, delta * 8)
        rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, -Math.PI / 2.3, delta * 8)
      } else if (moving) {
        leftLegRef.current.rotation.x = Math.sin(t * 12 + idx) * 0.55
        rightLegRef.current.rotation.x = -Math.sin(t * 12 + idx) * 0.55
      } else {
        leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, delta * 8)
        rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, delta * 8)
      }
    }

    // TYPING ON LAPTOP VS SWINGING ARMS:
    if (leftArmRef.current && rightArmRef.current) {
      if (status === 'working' && !moving) {
        // Arms reach forward onto laptop keyboard with clacking motion
        leftArmRef.current.rotation.x = -1.15 + Math.sin(t * 15 + idx) * 0.12
        rightArmRef.current.rotation.x = -1.15 + Math.cos(t * 15 + idx) * 0.12
        leftArmRef.current.rotation.y = 0.30
        rightArmRef.current.rotation.y = -0.30
      } else if (moving) {
        leftArmRef.current.rotation.x = Math.sin(t * 12 + idx) * 0.5
        rightArmRef.current.rotation.x = -Math.sin(t * 12 + idx) * 0.5
        leftArmRef.current.rotation.y = 0
        rightArmRef.current.rotation.y = 0
      } else {
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -0.2, delta * 6)
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.2, delta * 6)
      }
    }

    // Head tilt while working/observing laptop screen
    if (headRef.current) {
      if (status === 'working' && !moving) {
        headRef.current.rotation.x = 0.14 + Math.sin(t * 2 + idx) * 0.03
        headRef.current.rotation.y = Math.sin(t * 1.5 + idx) * 0.05
      } else {
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, 0, delta * 5)
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, 0, delta * 5)
      }
    }

    // Ear twitches
    if (earsRef.current) {
      earsRef.current.rotation.z = Math.sin(t * 4 + idx) * 0.08
    }

    // Tail physics sway
    if (tailRef.current) {
      tailRef.current.rotation.y = Math.sin(t * 6 + idx) * 0.25
      tailRef.current.rotation.x = moving ? 0.35 : 0.15
    }
  })

  const isWorking = status === 'working'
  const sp = agent.species

  return (
    <group
      ref={groupRef}
      position={[finalPos[0], finalPos[1], finalPos[2]]}
      onClick={(e) => {
        e.stopPropagation()
        onClick(agent)
      }}
      cursor="pointer"
    >
      {/* --- 1. FLOATING 3D THOUGHT / ACTION BUBBLE --- */}
      {showLabels && (
        <Html position={[0, 2.35, 0]} center distanceFactor={16}>
          <div
            className={`px-2.5 py-1 rounded-2xl flex items-center gap-1.5 shadow-[0_3px_0_rgba(0,0,0,0.15)] text-[10px] font-black whitespace-nowrap select-none transition-all duration-300 pointer-events-none ${
              isAlerted
                ? 'bg-amber-400 text-amber-950 border-2 border-amber-600 scale-125 animate-bounce'
                : isWorking
                ? 'bg-[#e0f5f0] text-[#1b4b41] border-2 border-[#76cdbe] animate-bounce'
                : 'bg-[#fef9e7] text-[#8b5a2b] border-2 border-[#d4a373]'
            }`}
          >
            <span className="text-xs">{isAlerted ? '❗' : (isWorking ? (agent.bubbleIcon || '💻') : '☕')}</span>
            <span className="truncate max-w-[130px]">
              {isAlerted ? 'Menerima Tugas!' : (isWorking ? agent.bubbleText : 'Santai di Roost')}
            </span>
          </div>
        </Html>
      )}

      {/* --- 2. COFFEE CUP IN HAND (WHEN CHILLING IN ROOST CAFE) --- */}
      {!isWorking && !isMoving && (
        <group position={[0.22, 0.5, 0.22]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.06, 0.05, 0.12, 10]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.07, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.01, 8]} />
            <meshBasicMaterial color="#6f4e37" />
          </mesh>
        </group>
      )}

      {/* --- 3. CHUBBY PEAR-SHAPED BODY (ANIMAL CROSSING PROPORTIONS) --- */}
      <group ref={bodyRef}>
        {/* Soft Tapered Sweater Body */}
        <mesh position={[0, 0.62, 0]} castShadow>
          <cylinderGeometry args={[0.20, 0.38, 0.58, 24]} />
          <meshStandardMaterial color={agent.sweater} roughness={0.5} />
        </mesh>
        {/* Rounded Bottom Hem */}
        <mesh position={[0, 0.34, 0]}>
          <torusGeometry args={[0.34, 0.05, 10, 24]} />
          <meshStandardMaterial color={agent.sweater} roughness={0.6} />
        </mesh>
        {/* White Collar / Turtleneck */}
        <mesh position={[0, 0.88, 0]}>
          <torusGeometry args={[0.20, 0.03, 8, 24]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>

        {/* Turtle Shell on Back (Rem) */}
        {sp === 'turtle' && (
          <mesh position={[0, 0.6, -0.26]} rotation={[0.4, 0, 0]} castShadow>
            <sphereGeometry args={[0.28, 16, 16]} />
            <meshStandardMaterial color="#1b4332" roughness={0.6} />
          </mesh>
        )}

        {/* Lucky Koban Coin on Chest (Cuan) */}
        {sp === 'cat_lucky' && (
          <mesh position={[0, 0.72, 0.24]}>
            <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
          </mesh>
        )}

        {/* Construction Vest Stripes (Tabrak) */}
        {sp === 'bulldog' && (
          <mesh position={[0, 0.62, 0.22]}>
            <planeGeometry args={[0.3, 0.06]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        )}

        {/* --- 4. SPECIES TAIL --- */}
        <group ref={tailRef} position={[0, 0.42, -0.32]}>
          {sp === 'bunny' && (
            <mesh castShadow>
              <sphereGeometry args={[0.11, 14, 14]} />
              <meshStandardMaterial color="#ffffff" roughness={0.8} />
            </mesh>
          )}

          {sp === 'red_panda' && (
            /* Big Bushy Striped Red Panda Tail */
            <group rotation={[0.5, 0, 0]}>
              <mesh position={[0, 0.16, -0.1]} castShadow>
                <cylinderGeometry args={[0.12, 0.07, 0.45, 16]} />
                <meshStandardMaterial color="#c2410c" roughness={0.6} />
              </mesh>
              <mesh position={[0, 0.08, -0.09]}>
                <cylinderGeometry args={[0.122, 0.10, 0.06, 16]} />
                <meshBasicMaterial color="#fefae0" />
              </mesh>
              <mesh position={[0, 0.24, -0.11]}>
                <cylinderGeometry args={[0.11, 0.08, 0.06, 16]} />
                <meshBasicMaterial color="#fefae0" />
              </mesh>
            </group>
          )}

          {sp === 'wolf' && (
            <mesh position={[0, 0.14, -0.08]} rotation={[0.4, 0, 0]} castShadow>
              <coneGeometry args={[0.13, 0.42, 12]} />
              <meshStandardMaterial color="#64748b" roughness={0.6} />
            </mesh>
          )}

          {['cat', 'cat_lucky'].includes(sp) && (
            <mesh position={[0, 0.16, -0.05]} rotation={[0.6, 0, 0]} castShadow>
              <cylinderGeometry args={[0.04, 0.05, 0.35, 10]} />
              <meshStandardMaterial color={agent.color} roughness={0.5} />
            </mesh>
          )}

          {sp === 'raccoon' && (
            <mesh position={[0, 0.15, -0.08]} rotation={[0.4, 0, 0]} castShadow>
              <cylinderGeometry args={[0.13, 0.08, 0.38, 14]} />
              <meshStandardMaterial color="#57534e" roughness={0.7} />
            </mesh>
          )}

          {sp === 'puppy' && (
            <mesh position={[0, 0.12, -0.05]} rotation={[0.5, 0, 0]} castShadow>
              <cylinderGeometry args={[0.05, 0.06, 0.28, 10]} />
              <meshStandardMaterial color={agent.color} roughness={0.5} />
            </mesh>
          )}

          {sp === 'robo_pup' && (
            <mesh position={[0, 0.14, -0.06]} rotation={[0.5, 0, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.26, 8]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.9} />
            </mesh>
          )}
        </group>

        {/* --- 5. HEAD & FACIAL SCULPT --- */}
        <group ref={headRef} position={[0, 1.22, 0]}>
          <mesh
            scale={sp === 'owl_cat' ? [1.16, 1.05, 1.1] : (sp === 'bulldog' ? [1.22, 0.92, 1.12] : [1.12, 0.98, 1.04])}
            castShadow
          >
            <sphereGeometry args={[0.43, 28, 28]} />
            <meshStandardMaterial color={agent.color} roughness={0.4} />
          </mesh>

          {/* OWL (Prof. LUNA) */}
          {sp === 'owl_cat' && (
            <>
              <mesh position={[-0.18, 0.06, 0.37]}>
                <circleGeometry args={[0.13, 20]} />
                <meshBasicMaterial color="#fefae0" />
              </mesh>
              <mesh position={[0.18, 0.06, 0.37]}>
                <circleGeometry args={[0.13, 20]} />
                <meshBasicMaterial color="#fefae0" />
              </mesh>
              <mesh position={[-0.18, 0.06, 0.38]}>
                <circleGeometry args={[0.09, 16]} />
                <meshBasicMaterial color="#d97706" />
              </mesh>
              <mesh position={[0.18, 0.06, 0.38]}>
                <circleGeometry args={[0.09, 16]} />
                <meshBasicMaterial color="#d97706" />
              </mesh>
              <mesh position={[-0.18, 0.06, 0.39]}>
                <circleGeometry args={[0.05, 12]} />
                <meshBasicMaterial color="#111827" />
              </mesh>
              <mesh position={[0.18, 0.06, 0.39]}>
                <circleGeometry args={[0.05, 12]} />
                <meshBasicMaterial color="#111827" />
              </mesh>
              <mesh position={[0, -0.06, 0.45]} rotation={[0.4, 0, 0]} castShadow>
                <coneGeometry args={[0.07, 0.18, 4]} />
                <meshStandardMaterial color="#f59e0b" roughness={0.3} />
              </mesh>
              <mesh position={[0, 0.46, 0]} castShadow>
                <boxGeometry args={[0.56, 0.04, 0.56]} />
                <meshStandardMaterial color="#2e1065" roughness={0.3} />
              </mesh>
              <mesh position={[0, 0.50, 0]}>
                <cylinderGeometry args={[0.12, 0.12, 0.07, 12]} />
                <meshStandardMaterial color="#fbbf24" />
              </mesh>
              <mesh position={[0.25, 0.38, 0.2]}>
                <sphereGeometry args={[0.045, 8, 8]} />
                <meshBasicMaterial color="#fbbf24" />
              </mesh>
            </>
          )}

          {/* RACCOON (Piksel) */}
          {sp === 'raccoon' && (
            <>
              <mesh position={[0, 0.05, 0.37]}>
                <boxGeometry args={[0.72, 0.22, 0.08]} />
                <meshStandardMaterial color="#3e2723" roughness={0.5} />
              </mesh>
              <mesh position={[0, -0.08, 0.39]} scale={[1.1, 0.8, 0.9]} castShadow>
                <sphereGeometry args={[0.16, 16, 16]} />
                <meshStandardMaterial color="#fefae0" />
              </mesh>
              <mesh position={[0, -0.02, 0.51]}>
                <sphereGeometry args={[0.04, 10, 10]} />
                <meshBasicMaterial color="#111827" />
              </mesh>
            </>
          )}

          {/* WOLF (Mas Amba) */}
          {sp === 'wolf' && (
            <>
              <mesh position={[0, -0.06, 0.43]} rotation={[0.2, 0, 0]} castShadow>
                <coneGeometry args={[0.16, 0.36, 12]} />
                <meshStandardMaterial color="#f1f5f9" roughness={0.4} />
              </mesh>
              <mesh position={[0, 0.04, 0.57]}>
                <sphereGeometry args={[0.04, 10, 10]} />
                <meshBasicMaterial color="#111827" />
              </mesh>
              <mesh position={[-0.16, 0.08, 0.38]}>
                <circleGeometry args={[0.07, 16]} />
                <meshBasicMaterial color="#f59e0b" />
              </mesh>
              <mesh position={[0.16, 0.08, 0.38]}>
                <circleGeometry args={[0.07, 16]} />
                <meshBasicMaterial color="#f59e0b" />
              </mesh>
              <mesh position={[-0.16, 0.08, 0.385]}>
                <circleGeometry args={[0.04, 12]} />
                <meshBasicMaterial color="#111827" />
              </mesh>
              <mesh position={[0.16, 0.08, 0.385]}>
                <circleGeometry args={[0.04, 12]} />
                <meshBasicMaterial color="#111827" />
              </mesh>
            </>
          )}

          {/* HEDGEHOG (Kutu) */}
          {sp === 'hedgehog' && (
            <>
              <group position={[0, 0.1, -0.2]}>
                {[-0.2, 0, 0.2].map((qx, i) => (
                  <mesh key={i} position={[qx, 0.2, -0.1]} rotation={[-0.4, 0, qx]}>
                    <coneGeometry args={[0.15, 0.46, 6]} />
                    <meshStandardMaterial color="#5c3a21" roughness={0.9} />
                  </mesh>
                ))}
              </group>
              <mesh position={[0, -0.08, 0.36]} scale={[1.1, 0.8, 0.9]} castShadow>
                <sphereGeometry args={[0.16, 16, 16]} />
                <meshStandardMaterial color="#f5ebe0" />
              </mesh>
              <mesh position={[0, -0.02, 0.49]}>
                <sphereGeometry args={[0.04, 10, 10]} />
                <meshBasicMaterial color="#111827" />
              </mesh>
            </>
          )}

          {/* TURTLE (Rem) */}
          {sp === 'turtle' && (
            <>
              <mesh position={[0, 0.41, 0]}>
                <cylinderGeometry args={[0.19, 0.23, 0.05, 12]} />
                <meshStandardMaterial color="#2d6a4f" roughness={0.6} />
              </mesh>
              <mesh position={[0, -0.08, 0.38]} scale={[1.2, 0.8, 0.9]}>
                <sphereGeometry args={[0.16, 16, 16]} />
                <meshStandardMaterial color="#a7f3d0" />
              </mesh>
            </>
          )}

          {/* CACTUS (Kaktus) */}
          {sp === 'cactus' && (
            <>
              <mesh position={[0, 0.47, 0]} castShadow>
                <dodecahedronGeometry args={[0.17]} />
                <meshStandardMaterial color="#facc15" roughness={0.3} />
              </mesh>
              <mesh position={[0, 0.58, 0]}>
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshStandardMaterial color="#ef4444" />
              </mesh>
            </>
          )}

          {/* ROBO PUP (Botik) */}
          {sp === 'robo_pup' && (
            <>
              <mesh position={[0, 0.5, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.25, 8]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.8} />
              </mesh>
              <mesh position={[0, 0.65, 0]}>
                <sphereGeometry args={[0.06, 12, 12]} />
                <meshBasicMaterial color="#ef4444" />
              </mesh>
              <mesh position={[0, 0.06, 0.39]}>
                <boxGeometry args={[0.44, 0.12, 0.06]} />
                <meshBasicMaterial color="#06b6d4" />
              </mesh>
            </>
          )}

          {/* BULLDOG (Tabrak) */}
          {sp === 'bulldog' && (
            <>
              <mesh position={[0, 0.38, 0]} castShadow>
                <sphereGeometry args={[0.38, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
                <meshStandardMaterial color="#eab308" roughness={0.3} />
              </mesh>
              <mesh position={[0, 0.38, 0.2]}>
                <boxGeometry args={[0.45, 0.04, 0.2]} />
                <meshStandardMaterial color="#ca8a04" />
              </mesh>
            </>
          )}

          {/* STANDARD / RED PANDA / CAT / BEAR / PUPPY */}
          {!['owl_cat', 'wolf', 'robo_pup'].includes(sp) && (
            <>
              <mesh position={[-0.25, -0.06, 0.23]} rotation={[0, -0.3, 0]}>
                <sphereGeometry args={[0.18, 16, 16]} />
                <meshStandardMaterial color="#fefae0" roughness={0.5} />
              </mesh>
              <mesh position={[0.25, -0.06, 0.23]} rotation={[0, 0.3, 0]}>
                <sphereGeometry args={[0.18, 16, 16]} />
                <meshStandardMaterial color="#fefae0" roughness={0.5} />
              </mesh>

              <mesh position={[0, -0.08, 0.35]} scale={[1.2, 0.85, 0.9]} castShadow>
                <sphereGeometry args={[0.16, 18, 18]} />
                <meshStandardMaterial color="#ffffff" roughness={0.35} />
              </mesh>
              <mesh position={[0, -0.02, 0.48]}>
                <sphereGeometry args={[0.04, 12, 12]} />
                <meshBasicMaterial color="#1f2937" />
              </mesh>

              {/* Big Expressive Animal Crossing Eyes */}
              <group position={[-0.17, 0.05, 0.37]} rotation={[0, -0.15, 0]}>
                <mesh>
                  <circleGeometry args={[0.078, 20]} />
                  <meshBasicMaterial color="#1e1e24" />
                </mesh>
                <mesh position={[-0.025, 0.025, 0.002]}>
                  <circleGeometry args={[0.026, 12]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
              </group>
              <group position={[0.17, 0.05, 0.37]} rotation={[0, 0.15, 0]}>
                <mesh>
                  <circleGeometry args={[0.078, 20]} />
                  <meshBasicMaterial color="#1e1e24" />
                </mesh>
                <mesh position={[-0.025, 0.025, 0.002]}>
                  <circleGeometry args={[0.026, 12]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
              </group>

              {/* Brow Dots for Red Panda Lilin */}
              {sp === 'red_panda' && (
                <>
                  <mesh position={[-0.15, 0.22, 0.39]}>
                    <sphereGeometry args={[0.038, 12, 12]} />
                    <meshBasicMaterial color="#fefae0" />
                  </mesh>
                  <mesh position={[0.15, 0.22, 0.39]}>
                    <sphereGeometry args={[0.038, 12, 12]} />
                    <meshBasicMaterial color="#fefae0" />
                  </mesh>
                  <mesh position={[-0.26, -0.08, 0.34]}>
                    <planeGeometry args={[0.05, 0.15]} />
                    <meshBasicMaterial color="#fefae0" />
                  </mesh>
                  <mesh position={[0.26, -0.08, 0.34]}>
                    <planeGeometry args={[0.05, 0.15]} />
                    <meshBasicMaterial color="#fefae0" />
                  </mesh>
                </>
              )}
            </>
          )}

          {/* EARS */}
          <group ref={earsRef}>
            {sp === 'bunny' && (
              <>
                <group position={[-0.18, 0.43, 0]} rotation={[-0.1, 0, 0.18]}>
                  <mesh castShadow>
                    <cylinderGeometry args={[0.07, 0.1, 0.48, 16]} />
                    <meshStandardMaterial color={agent.color} roughness={0.4} />
                  </mesh>
                  <mesh position={[0, 0, 0.04]}>
                    <cylinderGeometry args={[0.04, 0.06, 0.40, 16]} />
                    <meshBasicMaterial color="#fecdd3" />
                  </mesh>
                </group>
                <group position={[0.18, 0.43, 0]} rotation={[-0.1, 0, -0.18]}>
                  <mesh castShadow>
                    <cylinderGeometry args={[0.07, 0.1, 0.48, 16]} />
                    <meshStandardMaterial color={agent.color} roughness={0.4} />
                  </mesh>
                  <mesh position={[0, 0, 0.04]}>
                    <cylinderGeometry args={[0.04, 0.06, 0.40, 16]} />
                    <meshBasicMaterial color="#fecdd3" />
                  </mesh>
                </group>
                <mesh position={[0.28, 0.28, 0.26]}>
                  <dodecahedronGeometry args={[0.07]} />
                  <meshStandardMaterial color="#fbbf24" metalness={0.8} />
                </mesh>
              </>
            )}

            {['bear', 'bear_big', 'raccoon'].includes(sp) && (
              <>
                <mesh position={[-0.33, 0.36, 0]} castShadow>
                  <sphereGeometry args={[0.13, 14, 14]} />
                  <meshStandardMaterial color={agent.color} roughness={0.4} />
                </mesh>
                <mesh position={[-0.33, 0.36, 0.05]}>
                  <sphereGeometry args={[0.08, 10, 10]} />
                  <meshBasicMaterial color="#fefae0" />
                </mesh>
                <mesh position={[0.33, 0.36, 0]} castShadow>
                  <sphereGeometry args={[0.13, 14, 14]} />
                  <meshStandardMaterial color={agent.color} roughness={0.4} />
                </mesh>
                <mesh position={[0.33, 0.36, 0.05]}>
                  <sphereGeometry args={[0.08, 10, 10]} />
                  <meshBasicMaterial color="#fefae0" />
                </mesh>

                {agent.id === 'crayon' && (
                  <mesh position={[0.16, 0.46, 0]} rotation={[0.2, 0, -0.3]} castShadow>
                    <cylinderGeometry args={[0.28, 0.22, 0.12, 16]} />
                    <meshStandardMaterial color="#b91c1c" roughness={0.6} />
                  </mesh>
                )}
              </>
            )}

            {sp === 'puppy' && (
              <>
                <group position={[-0.36, 0.25, 0]} rotation={[0, 0, -0.4]}>
                  <mesh castShadow>
                    <cylinderGeometry args={[0.08, 0.12, 0.38, 12]} />
                    <meshStandardMaterial color={agent.color} roughness={0.5} />
                  </mesh>
                </group>
                <group position={[0.36, 0.25, 0]} rotation={[0, 0, 0.4]}>
                  <mesh castShadow>
                    <cylinderGeometry args={[0.08, 0.12, 0.38, 12]} />
                    <meshStandardMaterial color={agent.color} roughness={0.5} />
                  </mesh>
                </group>
              </>
            )}

            {['cat', 'cat_lucky', 'wolf', 'red_panda', 'hedgehog'].includes(sp) && (
              <>
                <group position={[-0.32, 0.35, 0]} rotation={[0, 0.2, 0.45]}>
                  <mesh scale={[1.2, 1.4, 0.5]} castShadow>
                    <coneGeometry args={[0.18, 0.34, 4]} />
                    <meshStandardMaterial color={agent.color} roughness={0.4} />
                  </mesh>
                  <mesh position={[0, -0.02, 0.04]} scale={[0.8, 1.0, 0.4]}>
                    <coneGeometry args={[0.14, 0.28, 4]} />
                    <meshBasicMaterial color="#fefae0" />
                  </mesh>
                </group>
                <group position={[0.32, 0.35, 0]} rotation={[0, -0.2, -0.45]}>
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

        {/* --- 6. ARMS & WHITE PAWS --- */}
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

        {/* --- 7. STUBBY LEGS & SHOES --- */}
        <group ref={leftLegRef} position={[-0.14, 0.3, 0]}>
          <mesh position={[0, -0.1, 0]} castShadow>
            <cylinderGeometry args={[0.065, 0.065, 0.24, 12]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0, -0.22, 0.04]} castShadow>
            <boxGeometry args={[0.13, 0.08, 0.18]} />
            <meshStandardMaterial color="#5c3a21" />
          </mesh>
        </group>

        <group ref={rightLegRef} position={[0.14, 0.3, 0]}>
          <mesh position={[0, -0.1, 0]} castShadow>
            <cylinderGeometry args={[0.065, 0.065, 0.24, 12]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0, -0.22, 0.04]} castShadow>
            <boxGeometry args={[0.13, 0.08, 0.18]} />
            <meshStandardMaterial color="#5c3a21" />
          </mesh>
        </group>

        {/* Selection Ring */}
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
    </group>
  )
}
