import React, { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js'

export default function ModelProp({ url, position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, onClick }) {
  const { scene } = useGLTF(url)
  // Clone scene so multiple props can be placed independently
  const clonedScene = useMemo(() => {
    if (!scene) return null
    let hasSkinned = false
    scene.traverse(c => {
      if (c.isSkinnedMesh) hasSkinned = true
    })
    const clone = hasSkinned ? SkeletonUtils.clone(scene) : scene.clone(true)
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    return clone
  }, [scene])

  if (!clonedScene) return null

  return (
    <primitive
      object={clonedScene}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={onClick}
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
    './models/tree_cone_dark.glb',
    './models/tree_cone.glb',
    './models/plant_bush.glb',
    './models/froggy_chair/scene.gltf',
    './models/ac_house/scene.gltf',
    './models/tom_nook/scene.gltf'
  ]
  models.forEach(m => useGLTF.preload(m))
}
