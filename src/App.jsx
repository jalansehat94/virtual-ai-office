import React, { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, SoftShadows, Sky } from '@react-three/drei'
import * as THREE from 'three'

import SecurityGate from './components/SecurityGate'
import AnimalCrossingIsland from './components/AnimalCrossingIsland'
import Villager from './components/Villager'
import UIOverlay from './components/UIOverlay'
import { AGENTS_DATA } from './data/agents'

export default function App() {
  const [unlocked, setUnlocked] = useState(() => {
    return sessionStorage.getItem('sb_unlocked') === '1'
  })

  // Agents status map: { [id]: 'working' | 'standby' }
  const [agentStatuses, setAgentStatuses] = useState(() => {
    const init = {}
    Object.keys(AGENTS_DATA).forEach(id => {
      // Default: Ai is working in office, others mostly standby or working
      init[id] = id === 'ai' ? 'working' : (['luna', 'mochi', 'kaktus', 'masamba'].includes(id) ? 'working' : 'standby')
    })
    return init
  })

  const [selectedAgent, setSelectedAgent] = useState(null)
  const [commsLogs, setCommsLogs] = useState([
    '🦉 [Telegram] @Luna: Bab II Mattoanging Al-Marwaee & Carter disinkronkan',
    '🐺 [Telegram] @MasAmba: Funding rate Binance net-neutral, bull safe',
    '🦝 [Cloud] @Piksel: UI component responsive layout synced',
    '🌵 [Cloud] @Kaktus: Menara Dynamo IFC clash free',
    '🐰 [Telegram] @Ai: Heru baru saja login dari terminal Makassar',
    '🐶 [Cloud] @Botik: Python backtest Sharpe ratio 2.14 verified'
  ])

  const controlsRef = useRef()

  // Polling live_state.json
  useEffect(() => {
    const fetchLiveState = async () => {
      try {
        const res = await fetch('./live_state.json?t=' + Date.now())
        if (res.ok) {
          const data = await res.json()
          if (data.agents) {
            setAgentStatuses(prev => {
              const updated = { ...prev }
              Object.keys(data.agents).forEach(id => {
                if (updated[id] !== undefined) {
                  updated[id] = data.agents[id].status
                }
              })
              return updated
            })
          }
        }
      } catch (e) {
        // Fallback gracefully
      }
    }

    const interval = setInterval(fetchLiveState, 3000)
    fetchLiveState()
    return () => clearInterval(interval)
  }, [])

  // Comms feed simulator
  useEffect(() => {
    const sampleMsgs = [
      '🦉 @Luna: Rujukan SNI 03-6197 diverifikasi untuk Bab 4',
      '🐺 @MasAmba: Order block H4 BTC dipertahankan, risk 1.2%',
      '🦝 @Piksel: Tailwind grid layout selesai dioptimasi',
      '🌵 @Kaktus: MEP vs Struktur clash-free di Revit LOD 350',
      '🐰 @Ai: Seluruh 17 agen aktif memantau SecondBrain Heru',
      '🐼 @Lilin: Fair Value Gap M15 terisi sempurna'
    ]

    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        const msg = sampleMsgs[Math.floor(Math.random() * sampleMsgs.length)]
        setCommsLogs(prev => [msg, ...prev.slice(0, 10)])
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  // Working & Standby counts
  const counts = {
    working: Object.values(agentStatuses).filter(s => s === 'working').length,
    standby: Object.values(agentStatuses).filter(s => s === 'standby').length,
  }

  // Toggle single agent status
  const handleToggleAgent = (id) => {
    setAgentStatuses(prev => {
      const current = prev[id]
      const next = current === 'working' ? 'standby' : 'working'
      const agent = AGENTS_DATA[id]
      setCommsLogs(l => [
        `🍃 [Dispatch] ${agent.name} berpindah ke ${next === 'working' ? 'Creative Studio' : 'Roost Cafe'}!`,
        ...l
      ])
      return { ...prev, [id]: next }
    })
  }

  // Camera focus positions
  const handleFocusTier = (tier) => {
    if (!controlsRef.current) return
    const controls = controlsRef.current

    if (tier === 'all') {
      controls.target.set(0, 2, 0)
      controls.object.position.set(22, 16, 24)
    } else if (tier === 'boss') {
      controls.target.set(0, 4.5, -9)
      controls.object.position.set(0, 9, 0)
    } else if (tier === 'workspace') {
      controls.target.set(0, 2.5, -2)
      controls.object.position.set(11, 7, 7)
    } else if (tier === 'pantry') {
      controls.target.set(0, 0.6, 6)
      controls.object.position.set(0, 5, 17)
    }
    controls.update()
  }

  const handleLock = () => {
    sessionStorage.removeItem('sb_unlocked')
    setUnlocked(false)
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#a2e8dd]">
      {/* 1. Security Gate PIN Overlay */}
      {!unlocked && <SecurityGate onUnlocked={() => setUnlocked(true)} />}

      {/* 2. Three.js Canvas Scene */}
      <Canvas
        shadows
        camera={{ position: [22, 16, 24], fov: 40, near: 0.1, far: 1000 }}
        className="w-full h-full"
      >
        {/* Soft Animal Crossing Golden Hour Lighting */}
        <ambientLight intensity={0.7} color="#ffffff" />
        <hemisphereLight intensity={1.1} groundColor="#8fcc70" color="#fff6e5" />
        <directionalLight
          position={[18, 32, 12]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={60}
          shadow-camera-left={-16}
          shadow-camera-right={16}
          shadow-camera-top={16}
          shadow-camera-bottom={-16}
          color="#fff5db"
        />

        {/* Soft sunny sky */}
        <Sky
          distance={450000}
          sunPosition={[18, 30, 12]}
          inclination={0.6}
          azimuth={0.25}
          turbidity={6}
          rayleigh={0.5}
        />

        {/* Soft Fog for Cozy Island Atmosphere */}
        <fog attach="fog" args={['#a2e8dd', 15, 65]} />

        {/* Orbit Controls with Damping */}
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={8}
          maxDistance={55}
          target={[0, 2, 0]}
        />

        {/* Island Terrain and Outdoor Library Architecture */}
        <AnimalCrossingIsland counts={counts} showLabels={unlocked} />

        {/* 17 Animal Crossing Villagers */}
        {Object.values(AGENTS_DATA).map(agent => (
          <Villager
            key={agent.id}
            agent={agent}
            status={agentStatuses[agent.id] || 'standby'}
            isSelected={selectedAgent?.id === agent.id}
            onClick={(a) => setSelectedAgent(a)}
          />
        ))}
      </Canvas>

      {/* 3. HTML NookPhone Style UI Overlay */}
      {unlocked && (
        <UIOverlay
          counts={counts}
          selectedAgent={selectedAgent}
          agentStatus={selectedAgent ? (agentStatuses[selectedAgent.id] || 'standby') : 'standby'}
          onCloseModal={() => setSelectedAgent(null)}
          onToggleAgent={handleToggleAgent}
          onFocusTier={handleFocusTier}
          onLock={handleLock}
          commsLogs={commsLogs}
        />
      )}
    </div>
  )
}
