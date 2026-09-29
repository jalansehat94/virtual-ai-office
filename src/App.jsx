import React, { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky } from '@react-three/drei'
import * as THREE from 'three'

import SecurityGate from './components/SecurityGate'
import AnimalCrossingIsland from './components/AnimalCrossingIsland'
import Villager from './components/Villager'
import UIOverlay from './components/UIOverlay'
import CameraDirector from './components/CameraDirector'
import { AGENTS_DATA } from './data/agents'

export default function App() {
  const [unlocked, setUnlocked] = useState(() => {
    return sessionStorage.getItem('sb_unlocked') === '1'
  })

  // Agents status map
  const [agentStatuses, setAgentStatuses] = useState(() => {
    const init = {}
    Object.keys(AGENTS_DATA).forEach(id => {
      init[id] = ['ai', 'luna', 'kutu', 'mochi', 'piksel', 'kaktus', 'masamba', 'botik'].includes(id)
        ? 'working'
        : 'standby'
    })
    return init
  })

  const [selectedAgent, setSelectedAgent] = useState(null)
  const [bulletinOpen, setBulletinOpen] = useState(false)
  const [bossMessage, setBossMessage] = useState('')
  const [alertedAgentId, setAlertedAgentId] = useState(null)
  const [autoMode, setAutoMode] = useState(true)

  // Camera targets for smooth cinematic director
  const [camPos, setCamPos] = useState(() => new THREE.Vector3(22, 16, 24))
  const [lookPos, setLookPos] = useState(() => new THREE.Vector3(0, 2, 0))

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
      } catch (e) {}
    }

    const interval = setInterval(fetchLiveState, 4000)
    fetchLiveState()
    return () => clearInterval(interval)
  }, [])

  // Auto Office Autonomous Mode: Villagers spontaneously collaborate, walk, research
  useEffect(() => {
    if (!autoMode) return

    const autonomousScenarios = [
      () => {
        // Luna goes to bookcase to research
        setAgentStatuses(p => ({ ...p, luna: 'researching' }))
        setCommsLogs(l => ['🦉 @Luna berjalan ke rak buku meneliti jurnal Scopus Q1...', ...l.slice(0, 8)])
      },
      () => {
        // MasAmba and Botik collaborate at meeting table
        setAgentStatuses(p => ({ ...p, masamba: 'collaborating', botik: 'collaborating' }))
        setCommsLogs(l => ['🐺📈 @MasAmba & @Botik rapat di lounge membahas FVG BTC/USDT...', ...l.slice(0, 8)])
      },
      () => {
        // Mochi finishes coding and goes to Roost for coffee
        setAgentStatuses(p => ({ ...p, mochi: 'standby' }))
        setCommsLogs(l => ['🐕☕ @Mochi istirahat ngopi di The Roost Cafe...', ...l.slice(0, 8)])
      },
      () => {
        // Kaktus heads back to desk to check BIM
        setAgentStatuses(p => ({ ...p, kaktus: 'working' }))
        setCommsLogs(l => ['🌵📐 @Kaktus membuka laptop memeriksa clash IFC Revit...', ...l.slice(0, 8)])
      },
      () => {
        // Luna returns to desk with laptop
        setAgentStatuses(p => ({ ...p, luna: 'working' }))
        setCommsLogs(l => ['🦉💻 @Luna kembali ke bilik labirin buku mengetik revisi Bab II...', ...l.slice(0, 8)])
      }
    ]

    const interval = setInterval(() => {
      const scenario = autonomousScenarios[Math.floor(Math.random() * autonomousScenarios.length)]
      scenario()
    }, 14000)

    return () => clearInterval(interval)
  }, [autoMode])

  // Working & Standby counts
  const counts = {
    working: Object.values(agentStatuses).filter(s => s === 'working' || s === 'collaborating' || s === 'researching').length,
    standby: Object.values(agentStatuses).filter(s => s === 'standby').length,
  }

  // Dispatch Command Handler (Prompt / Quick Chips)
  const handleDispatchCommand = (type, taskText) => {
    let targetAgentId = 'ai'

    if (type === 'luna' || taskText.toLowerCase().includes('@luna') || taskText.toLowerCase().includes('skripsi')) {
      targetAgentId = 'luna'
      setBossMessage(`@Ai: "@Luna, tolong verifikasi sitasi SNI 03-6197 untuk Bab 2 sekarang!"`)
    } else if (type === 'masamba' || taskText.toLowerCase().includes('@masamba') || taskText.toLowerCase().includes('trading') || taskText.toLowerCase().includes('btc')) {
      targetAgentId = 'masamba'
      setBossMessage(`@Ai: "@MasAmba, cek Order Block & FVG BTC/USDT timeframe H4!"`)
    } else if (type === 'kaktus' || taskText.toLowerCase().includes('@kaktus') || taskText.toLowerCase().includes('bim') || taskText.toLowerCase().includes('revit')) {
      targetAgentId = 'kaktus'
      setBossMessage(`@Ai: "@Kaktus, razia benturan clash pipa vs balok Menara Dynamo!"`)
    } else if (type === 'mochi' || taskText.toLowerCase().includes('@mochi') || taskText.toLowerCase().includes('web')) {
      targetAgentId = 'mochi'
      setBossMessage(`@Ai: "@Mochi, deploy fitur visual office V3 ke server production!"`)
    } else if (type === 'all_rest') {
      // Put everyone to Roost Cafe
      setBossMessage(`@Ai: "Waktunya santai! Semua agen istirahat ngopi di Roost Cafe! ☕"`)
      setAgentStatuses(p => {
        const next = { ...p }
        Object.keys(next).forEach(k => { next[k] = 'standby' })
        return next
      })
      handleFocusTier('pantry')
      return
    } else {
      targetAgentId = 'luna'
      setBossMessage(`@Ai: "Instruksi diterima: '${taskText}'. Mendelegasikan ke tim..."`)
    }

    // Trigger alert reaction on target agent
    setAlertedAgentId(targetAgentId)
    setTimeout(() => setAlertedAgentId(null), 2500)

    // Put agent to working state
    setAgentStatuses(prev => ({ ...prev, [targetAgentId]: 'working' }))

    // Add live log
    const agent = AGENTS_DATA[targetAgentId]
    setCommsLogs(l => [
      `🚀 [Command] ${agent?.name || '@Ai'} menerima tugas: "${taskText}"!`,
      ...l
    ])

    // Smoothly focus camera on the working area
    if (targetAgentId === 'ai') {
      handleFocusTier('boss')
    } else {
      setCamPos(new THREE.Vector3(8, 10, 8))
      setLookPos(new THREE.Vector3(agent.deskPos[0], agent.deskPos[1], agent.deskPos[2]))
    }
  }

  // Toggle single agent
  const handleToggleAgent = (id) => {
    setAgentStatuses(prev => {
      const current = prev[id]
      const next = current === 'working' ? 'standby' : 'working'
      const agent = AGENTS_DATA[id]
      setCommsLogs(l => [
        `🍃 [Dispatch] ${agent.name} ${next === 'working' ? 'membuka laptop di Studio' : 'santai di Roost Cafe'}!`,
        ...l
      ])
      return { ...prev, [id]: next }
    })
  }

  // Camera Focus Tier with Smooth Cinematic Director
  const handleFocusTier = (tier) => {
    if (tier === 'all') {
      setCamPos(new THREE.Vector3(22, 16, 24))
      setLookPos(new THREE.Vector3(0, 2, 0))
    } else if (tier === 'boss') {
      setCamPos(new THREE.Vector3(-1, 8.5, -2))
      setLookPos(new THREE.Vector3(-1, 4.5, -8))
    } else if (tier === 'workspace') {
      setCamPos(new THREE.Vector3(0, 9, 6))
      setLookPos(new THREE.Vector3(0, 2.5, -1))
    } else if (tier === 'pantry') {
      setCamPos(new THREE.Vector3(0, 4.5, 14))
      setLookPos(new THREE.Vector3(0, 0.6, 6))
    }
  }

  const handleLock = () => {
    sessionStorage.removeItem('sb_unlocked')
    setUnlocked(false)
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#a2e8dd]">
      {/* 1. Security Gate PIN Overlay (Master PIN 211103) */}
      {!unlocked && <SecurityGate onUnlocked={() => setUnlocked(true)} />}

      {/* 2. Three.js Canvas Scene */}
      <Canvas
        shadows
        camera={{ position: [22, 16, 24], fov: 40, near: 0.1, far: 1000 }}
        className="w-full h-full"
      >
        {/* Cinematic Camera Director with Smooth Damping */}
        <CameraDirector
          cameraPos={camPos}
          lookAtPos={lookPos}
          controlsRef={controlsRef}
        />

        {/* Soft Animal Crossing Sunlight */}
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

        <Sky
          distance={450000}
          sunPosition={[18, 30, 12]}
          inclination={0.6}
          azimuth={0.25}
          turbidity={6}
          rayleigh={0.5}
        />

        <fog attach="fog" args={['#a2e8dd', 15, 65]} />

        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={6}
          maxDistance={55}
          target={[0, 2, 0]}
        />

        {/* Island Terrain and Room Divisions (Hedge Lounge & Bookcase Maze) */}
        <AnimalCrossingIsland
          counts={counts}
          showLabels={unlocked}
          onOpenBulletin={() => setBulletinOpen(true)}
        />

        {/* 17 Villagers with Laptops, Walking Cycles, and Thought Bubbles */}
        {Object.values(AGENTS_DATA).map(agent => (
          <Villager
            key={agent.id}
            agent={agent}
            status={agentStatuses[agent.id] || 'standby'}
            isSelected={selectedAgent?.id === agent.id}
            showLabels={unlocked}
            isAlerted={alertedAgentId === agent.id}
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
          bulletinOpen={bulletinOpen}
          onOpenBulletin={() => setBulletinOpen(true)}
          onCloseBulletin={() => setBulletinOpen(false)}
          onDispatchCommand={handleDispatchCommand}
          bossMessage={bossMessage}
          autoMode={autoMode}
          onToggleAutoMode={() => setAutoMode(!autoMode)}
        />
      )}
    </div>
  )
}
