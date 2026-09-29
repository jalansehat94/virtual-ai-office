import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

export default function Villager({ agent, status, isSelected, showLabels, isAlerted, onClick }) {
  const groupRef = useRef()
  const earsRef = useRef()
  const leftArmRef = useRef()
  const rightArmRef = useRef()
  const leftLegRef = useRef()
  const rightLegRef = useRef()

  // Target position based on status
  let targetPos = agent.pantryPos
  if (status === 'working') {
    targetPos = agent.deskPos
  } else if (status === 'collaborating' && agent.meetingPos) {
    targetPos = agent.meetingPos
  } else if (status === 'researching' && agent.bookshelfPos) {
    targetPos = agent.bookshelfPos
  }

  const [isMoving, setIsMoving] = useState(false)

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    const idx = agent.id.length

    // Calculate distance to target to detect movement
    const dx = targetPos[0] - groupRef.current.position.x
    const dz = targetPos[2] - groupRef.current.position.z
    const dist = Math.sqrt(dx * dx + dz * dz)
    const moving = dist > 0.15
    setIsMoving(moving)

    // Smooth movement to target position
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPos[0], delta * 3.5)
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetPos[2], delta * 3.5)

    // Face in direction of movement when walking, or face forward/desk
    if (moving) {
      const targetAngle = Math.atan2(dx, dz)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetAngle, delta * 6)
      groupRef.current.rotation.x = 0.1
    } else {
      const idleRot = status === 'working' ? 0 : Math.PI
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, idleRot, delta * 4)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, delta * 5)
    }

    // Authentic Animal Crossing hop & gentle bounce
    const hopSpeed = moving ? 8 : (status === 'working' ? 1.8 : 4)
    const hopHeight = moving ? 0.14 : (status === 'working' ? 0.025 : 0.08)
    const hop = Math.abs(Math.sin(t * hopSpeed + idx * 0.7)) * hopHeight
    const targetY = targetPos[1] + hop
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 8)

    // Leg swinging when walking
    if (moving && leftLegRef.current && rightLegRef.current) {
      leftLegRef.current.rotation.x = Math.sin(t * 12 + idx) * 0.45
      rightLegRef.current.rotation.x = -Math.sin(t * 12 + idx) * 0.45
    } else if (leftLegRef.current && rightLegRef.current) {
      leftLegRef.current.rotation.x = 0
      rightLegRef.current.rotation.x = 0
    }

    // Side-to-side waddle when walking/chilling
    if (moving || status !== 'working') {
      groupRef.current.rotation.z = Math.sin(t * 4 + idx * 0.7) * 0.06
    } else {
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, delta * 5)
    }

    // Ear twitches
    if (earsRef.current) {
      earsRef.current.rotation.z = Math.sin(t * 5 + idx) * 0.07
    }

    // Typing paw movements at laptop
    if (status === 'working' && !moving && leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.x = -0.75 + Math.sin(t * 16 + idx) * 0.16
      rightArmRef.current.rotation.x = -0.75 + Math.cos(t * 16 + idx) * 0.16
    } else if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.x = moving ? Math.sin(t * 12 + idx) * 0.4 : -0.2
      rightArmRef.current.rotation.x = moving ? -Math.sin(t * 12 + idx) * 0.4 : -0.2
    }
  })

  const isWorking = status === 'working'
  const sp = agent.species

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
      {/* --- 1. FLOATING 3D THOUGHT / ACTION BUBBLE --- */}
      {showLabels && (
        <Html position={[0, 2.35, 0]} center distanceFactor={14}>
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

      {/* --- 2. OPERATING LAPTOP (WHEN WORKING AT DESK) --- */}
      {isWorking && !isMoving && (
        <group position={[0, 0.46, 0.38]}>
          <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.55, 0.02, 0.38]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.5} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.032, 0.1]}>
            <planeGeometry args={[0.18, 0.09]} />
            <meshBasicMaterial color="#94a3b8" />
          </mesh>
          <mesh position={[0, 0.032, -0.05]}>
            <planeGeometry args={[0.48, 0.16]} />
            <meshBasicMaterial color="#334155" />
          </mesh>

          <group position={[0, 0.03, -0.19]} rotation={[-0.35, 0, 0]}>
            <mesh position={[0, 0.18, 0]} castShadow>
              <boxGeometry args={[0.55, 0.36, 0.02]} />
              <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.18, 0.012]}>
              <planeGeometry args={[0.5, 0.31]} />
              <meshBasicMaterial color="#10b981" />
            </mesh>
            <pointLight position={[0, 0.18, 0.1]} color="#76cdbe" intensity={1.3} distance={1.6} />
          </group>
        </group>
      )}

      {/* --- 3. COFFEE CUP IN HAND (WHEN CHILLING IN ROOST CAFE) --- */}
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

      {/* --- 4. INDIVIDUAL ANIMAL CROSSING SPECIES MODELING --- */}
      
      {/* HEAD GROUP */}
      <group position={[0, 1.2, 0]}>
        
        {/* Base Head Sphere (Scaled for natural species shapes) */}
        <mesh
          scale={sp === 'owl_cat' ? [1.15, 1.05, 1.1] : (sp === 'bulldog' ? [1.2, 0.9, 1.1] : [1.1, 0.96, 1.02])}
          castShadow
        >
          <sphereGeometry args={[0.42, 28, 28]} />
          <meshStandardMaterial color={agent.color} roughness={0.4} />
        </mesh>

        {/* --- SPECIES-SPECIFIC FACIAL FEATURES --- */}

        {/* 1. OWL (Prof. LUNA - Blathers Style) */}
        {sp === 'owl_cat' && (
          <>
            {/* White/Cream Eyering Discs */}
            <mesh position={[-0.18, 0.06, 0.36]}>
              <circleGeometry args={[0.13, 20]} />
              <meshBasicMaterial color="#fefae0" />
            </mesh>
            <mesh position={[0.18, 0.06, 0.36]}>
              <circleGeometry args={[0.13, 20]} />
              <meshBasicMaterial color="#fefae0" />
            </mesh>
            {/* Big Wise Golden Eyes */}
            <mesh position={[-0.18, 0.06, 0.37]}>
              <circleGeometry args={[0.09, 16]} />
              <meshBasicMaterial color="#d97706" />
            </mesh>
            <mesh position={[0.18, 0.06, 0.37]}>
              <circleGeometry args={[0.09, 16]} />
              <meshBasicMaterial color="#d97706" />
            </mesh>
            <mesh position={[-0.18, 0.06, 0.38]}>
              <circleGeometry args={[0.05, 12]} />
              <meshBasicMaterial color="#111827" />
            </mesh>
            <mesh position={[0.18, 0.06, 0.38]}>
              <circleGeometry args={[0.05, 12]} />
              <meshBasicMaterial color="#111827" />
            </mesh>
            {/* Curved Owl Beak */}
            <mesh position={[0, -0.06, 0.44]} rotation={[0.4, 0, 0]} castShadow>
              <coneGeometry args={[0.07, 0.18, 4]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.3} />
            </mesh>
            {/* Graduation Mortarboard Toga Cap */}
            <mesh position={[0, 0.45, 0]} castShadow>
              <boxGeometry args={[0.55, 0.04, 0.55]} />
              <meshStandardMaterial color="#2e1065" roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.49, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 0.07, 12]} />
              <meshStandardMaterial color="#fbbf24" />
            </mesh>
            {/* Gold Tassel dangling to side */}
            <mesh position={[0.24, 0.36, 0.2]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshBasicMaterial color="#fbbf24" />
            </mesh>
          </>
        )}

        {/* 2. RACCOON / TANUKI (Piksel - Tom Nook Style) */}
        {sp === 'raccoon' && (
          <>
            {/* Dark Mask across eyes */}
            <mesh position={[0, 0.05, 0.36]}>
              <boxGeometry args={[0.7, 0.22, 0.08]} />
              <meshStandardMaterial color="#3e2723" roughness={0.5} />
            </mesh>
            {/* Cream Snout */}
            <mesh position={[0, -0.08, 0.38]} scale={[1.1, 0.8, 0.9]} castShadow>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial color="#fefae0" />
            </mesh>
            <mesh position={[0, -0.02, 0.5]}>
              <sphereGeometry args={[0.04, 10, 10]} />
              <meshBasicMaterial color="#111827" />
            </mesh>
          </>
        )}

        {/* 3. WOLF (Mas Amba - Sleek Fang Style) */}
        {sp === 'wolf' && (
          <>
            {/* Long Sharp Wolf Snout */}
            <mesh position={[0, -0.06, 0.42]} rotation={[0.2, 0, 0]} castShadow>
              <coneGeometry args={[0.16, 0.35, 12]} />
              <meshStandardMaterial color="#f1f5f9" roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.04, 0.56]}>
              <sphereGeometry args={[0.04, 10, 10]} />
              <meshBasicMaterial color="#111827" />
            </mesh>
            {/* Piercing Golden Trader Eyes */}
            <mesh position={[-0.16, 0.08, 0.37]}>
              <circleGeometry args={[0.07, 16]} />
              <meshBasicMaterial color="#f59e0b" />
            </mesh>
            <mesh position={[0.16, 0.08, 0.37]}>
              <circleGeometry args={[0.07, 16]} />
              <meshBasicMaterial color="#f59e0b" />
            </mesh>
            <mesh position={[-0.16, 0.08, 0.375]}>
              <circleGeometry args={[0.04, 12]} />
              <meshBasicMaterial color="#111827" />
            </mesh>
            <mesh position={[0.16, 0.08, 0.375]}>
              <circleGeometry args={[0.04, 12]} />
              <meshBasicMaterial color="#111827" />
            </mesh>
          </>
        )}

        {/* 4. HEDGEHOG (Kutu - Sable/Mabel Style) */}
        {sp === 'hedgehog' && (
          <>
            {/* Spiky Quills on Back of Head */}
            <group position={[0, 0.1, -0.2]}>
              {[-0.2, 0, 0.2].map((qx, i) => (
                <mesh key={i} position={[qx, 0.2, -0.1]} rotation={[-0.4, 0, qx]}>
                  <coneGeometry args={[0.14, 0.45, 6]} />
                  <meshStandardMaterial color="#5c3a21" roughness={0.9} />
                </mesh>
              ))}
            </group>
            {/* Soft Muzzle */}
            <mesh position={[0, -0.08, 0.35]} scale={[1.1, 0.8, 0.9]} castShadow>
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshStandardMaterial color="#f5ebe0" />
            </mesh>
            <mesh position={[0, -0.02, 0.48]}>
              <sphereGeometry args={[0.04, 10, 10]} />
              <meshBasicMaterial color="#111827" />
            </mesh>
          </>
        )}

        {/* 5. TURTLE (Rem - Kapp'n Style) */}
        {sp === 'turtle' && (
          <>
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.18, 0.22, 0.05, 12]} />
              <meshStandardMaterial color="#2d6a4f" roughness={0.6} />
            </mesh>
            <mesh position={[0, -0.08, 0.38]} scale={[1.2, 0.8, 0.9]}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial color="#a7f3d0" />
            </mesh>
          </>
        )}

        {/* 6. CACTUS (Kaktus - Blooming Flower) */}
        {sp === 'cactus' && (
          <>
            {/* Golden Desert Blossom Flower on Head */}
            <mesh position={[0, 0.46, 0]} castShadow>
              <dodecahedronGeometry args={[0.16]} />
              <meshStandardMaterial color="#facc15" roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.56, 0]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial color="#ef4444" />
            </mesh>
          </>
        )}

        {/* 7. ROBO PUP (Botik - Sprocket Style) */}
        {sp === 'robo_pup' && (
          <>
            {/* Antenna on head */}
            <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.25, 8]} />
              <meshStandardMaterial color="#94a3b8" metalness={0.8} />
            </mesh>
            <mesh position={[0, 0.65, 0]}>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshBasicMaterial color="#ef4444" />
            </mesh>
            {/* Glowing Cyan Visor Eyes */}
            <mesh position={[0, 0.06, 0.38]}>
              <boxGeometry args={[0.42, 0.12, 0.06]} />
              <meshBasicMaterial color="#06b6d4" />
            </mesh>
          </>
        )}

        {/* 8. STANDARD / RED PANDA / CAT / BEAR / BUNNY EYES & SNOUT */}
        {!['owl_cat', 'wolf', 'robo_pup'].includes(sp) && (
          <>
            {/* Cheek Patches */}
            <mesh position={[-0.24, -0.06, 0.22]} rotation={[0, -0.3, 0]}>
              <sphereGeometry args={[0.18, 16, 16]} />
              <meshStandardMaterial color="#fefae0" roughness={0.5} />
            </mesh>
            <mesh position={[0.24, -0.06, 0.22]} rotation={[0, 0.3, 0]}>
              <sphereGeometry args={[0.18, 16, 16]} />
              <meshStandardMaterial color="#fefae0" roughness={0.5} />
            </mesh>

            {/* Muzzle / Snout */}
            <mesh position={[0, -0.08, 0.34]} scale={[1.2, 0.85, 0.9]} castShadow>
              <sphereGeometry args={[0.16, 18, 18]} />
              <meshStandardMaterial color="#ffffff" roughness={0.35} />
            </mesh>
            <mesh position={[0, -0.02, 0.47]}>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshBasicMaterial color="#1f2937" />
            </mesh>

            {/* Big Expressive Eyes */}
            <group position={[-0.17, 0.05, 0.36]} rotation={[0, -0.15, 0]}>
              <mesh>
                <circleGeometry args={[0.075, 20]} />
                <meshBasicMaterial color="#1e1e24" />
              </mesh>
              <mesh position={[-0.025, 0.025, 0.002]}>
                <circleGeometry args={[0.025, 12]} />
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
            </group>

            {/* Brow dots for Red Panda (Lilin) */}
            {sp === 'red_panda' && (
              <>
                <mesh position={[-0.15, 0.22, 0.38]}>
                  <sphereGeometry args={[0.035, 12, 12]} />
                  <meshBasicMaterial color="#fefae0" />
                </mesh>
                <mesh position={[0.15, 0.22, 0.38]}>
                  <sphereGeometry args={[0.035, 12, 12]} />
                  <meshBasicMaterial color="#fefae0" />
                </mesh>
              </>
            )}
          </>
        )}

        {/* EARS HIERARCHY */}
        <group ref={earsRef}>
          {sp === 'bunny' && (
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
          )}

          {['bear', 'bear_big', 'raccoon'].includes(sp) && (
            <>
              {/* Round Bear/Tanuki Ears */}
              <mesh position={[-0.32, 0.35, 0]} castShadow>
                <sphereGeometry args={[0.13, 14, 14]} />
                <meshStandardMaterial color={agent.color} roughness={0.4} />
              </mesh>
              <mesh position={[-0.32, 0.35, 0.05]}>
                <sphereGeometry args={[0.08, 10, 10]} />
                <meshBasicMaterial color="#fefae0" />
              </mesh>
              <mesh position={[0.32, 0.35, 0]} castShadow>
                <sphereGeometry args={[0.13, 14, 14]} />
                <meshStandardMaterial color={agent.color} roughness={0.4} />
              </mesh>
              <mesh position={[0.32, 0.35, 0.05]}>
                <sphereGeometry args={[0.08, 10, 10]} />
                <meshBasicMaterial color="#fefae0" />
              </mesh>
            </>
          )}

          {sp === 'puppy' && (
            <>
              {/* Droopy Floppy Dog Ears */}
              <group position={[-0.36, 0.25, 0]} rotation={[0, 0, -0.4]}>
                <mesh castShadow>
                  <cylinderGeometry args={[0.08, 0.11, 0.38, 12]} />
                  <meshStandardMaterial color={agent.color} roughness={0.5} />
                </mesh>
              </group>
              <group position={[0.36, 0.25, 0]} rotation={[0, 0, 0.4]}>
                <mesh castShadow>
                  <cylinderGeometry args={[0.08, 0.11, 0.38, 12]} />
                  <meshStandardMaterial color={agent.color} roughness={0.5} />
                </mesh>
              </group>
            </>
          )}

          {['cat', 'cat_lucky', 'wolf', 'red_panda', 'hedgehog'].includes(sp) && (
            <>
              {/* Pointed Triangular Ears with Inner Fur */}
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

      {/* --- BODY & SWEATER TUNIC --- */}
      <mesh position={[0, 0.62, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.36, 0.58, 20]} />
        <meshStandardMaterial color={agent.sweater} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.88, 0]}>
        <torusGeometry args={[0.19, 0.025, 8, 24]} />
        <meshStandardMaterial color="#ffffff" roughness={0.4} />
      </mesh>

      {/* Turtle Shell on Back (Rem) */}
      {sp === 'turtle' && (
        <mesh position={[0, 0.6, -0.24]} rotation={[0.4, 0, 0]} castShadow>
          <sphereGeometry args={[0.26, 16, 16]} />
          <meshStandardMaterial color="#1b4332" roughness={0.6} />
        </mesh>
      )}

      {/* Lucky Coin on Chest (Cuan) */}
      {sp === 'cat_lucky' && (
        <mesh position={[0, 0.72, 0.24]}>
          <cylinderGeometry args={[0.07, 0.07, 0.02, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
        </mesh>
      )}

      {/* --- SLIM ARMS & WHITE PAWS --- */}
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

      {/* --- LEGS & SHOES --- */}
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
