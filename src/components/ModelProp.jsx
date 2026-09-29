import React, { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'

export default function ModelProp({ url, position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) {
  const { scene } = useGLTF(url)
  // Clone scene so multiple props can be placed independently
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    return clone
  }, [scene])

  return (
    <primitive
      object={clonedScene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  )
}

// Preload models for instant render
export function preloadCommonModels() {
  const models = [
    './models/bookcaseOpen.glb',
    './models/bookcaseClosedWide.glb',
    './models/desk.glb',
    './models/chairDesk.glb',
    './models/chairModernCushion.glb',
    './models/tableCoffee.glb',
    './models/tree_oak.glb',
    './models/tree_default.glb',
    './models/tree_cone.glb',
    './models/plant_bush.glb'
  ]
  models.forEach(m => useGLTF.preload(m))
}
