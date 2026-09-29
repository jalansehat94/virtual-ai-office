import { useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CameraDirector({ cameraPos, lookAtPos, controlsRef }) {
  const { camera } = useThree()

  useFrame(() => {
    if (!controlsRef?.current) return
    const controls = controlsRef.current

    // Smoothly lerp camera position
    camera.position.lerp(cameraPos, 0.05)

    // Smoothly lerp orbit controls target
    controls.target.lerp(lookAtPos, 0.05)
    controls.update()
  })

  return null
}
