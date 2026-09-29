import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CameraDirector({ cameraPos, lookAtPos, controlsRef, isFreeCam = false }) {
  const { camera } = useThree()
  const isTransitioningRef = useRef(true)

  // Trigger transition whenever target changes
  useEffect(() => {
    isTransitioningRef.current = true
  }, [cameraPos, lookAtPos])

  useFrame(() => {
    if (isFreeCam) return
    if (!controlsRef?.current || !isTransitioningRef.current) return

    const controls = controlsRef.current

    // Smoothly lerp camera position
    camera.position.lerp(cameraPos, 0.05)

    // Smoothly lerp orbit controls target
    controls.target.lerp(lookAtPos, 0.05)
    controls.update()

    // Stop lerp once arrived to allow gentle local orbit
    const dPos = camera.position.distanceTo(cameraPos)
    const dTarget = controls.target.distanceTo(lookAtPos)
    if (dPos < 0.15 && dTarget < 0.15) {
      isTransitioningRef.current = false
    }
  })

  return null
}
