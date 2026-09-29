import React, { useState, useEffect, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky } from '@react-three/drei'
import * as THREE from 'three'

import ErrorBoundary from './components/ErrorBoundary'
import LoadingScreen from './components/LoadingScreen'
import SecurityGate from './components/SecurityGate'
import IslandEnvironment from './components/IslandEnvironment'
import AnimalCrossingIsland from './components/AnimalCrossingIsland'
import Villager from './components/Villager'
import UIOverlay from './components/UIOverlay'
import CameraDirector from './components/CameraDirector'
import { AGENTS_DATA } from './data/agents'

export default function App() {
  // Auto-unlock on localhost for instant preview
  const [unlocked, setUnlocked] = useState(() => {
    if (typeof window !== 'undefined') {
      const host = window.location.hostname
      if (host === 'localhost' || host === '127.0.0.1' || host === '') {
        return true
      }
      return sessionStorage.getItem('sb_unlocked') === '1'
    }
    return true
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

  // Camera Mode: Director vs Free Cam
  const [isFreeCam, setIsFreeCam] = useState(false)

  // Camera targets for smooth cinematic director
  const [camPos, setCamPos] = useState(() => new THREE.Vector3(28, 22, 34))
  const [lookPos, setLookPos] = useState(() => new THREE.Vector3(0, 2, -2))

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

  // Auto Office Autonomous Mode
  useEffect(() => {
    if (!autoMode) return

    const autonomousScenarios = [
      () => {
        setAgentStatuses(p => ({ ...p, luna: 'researching' }))
        setCommsLogs(l => ['🦉 @Luna berjalan ke rak buku meneliti jurnal Scopus Q1...', ...l.slice(0, 8)])
      },
      () => {
        setAgentStatuses(p => ({ ...p, masamba: 'collaborating', botik: 'collaborating' }))
        setCommsLogs(l => ['🐺📈 @MasAmba & @Botik rapat di lounge membahas FVG BTC/USDT...', ...l.slice(0, 8)])
      },
      () => {
        setAgentStatuses(p => ({ ...p, mochi: 'standby' }))
        setCommsLogs(l => ['🐕☕ @Mochi istirahat ngopi di The Roost Cafe...', ...l.slice(0, 8)])
      },
      () => {
        setAgentStatuses(p => ({ ...p, kaktus: 'working' }))
        setCommsLogs(l => ['🌵📐 @Kaktus membuka laptop memeriksa clash IFC Revit...', ...l.slice(0, 8)])
      },
      () => {
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

  // Dispatch Command Handler
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

    setAlertedAgentId(targetAgentId)
    setTimeout(() => setAlertedAgentId(null), 2500)
    setAgentStatuses(prev => ({ ...prev, [targetAgentId]: 'working' }))

    const agent = AGENTS_DATA[targetAgentId]
    setCommsLogs(l => [
      `🚀 [Command] ${agent?.name || '@Ai'} menerima tugas: "${taskText}"!`,
      ...l
    ])

    // Focus camera on working area
    setIsFreeCam(false)
    if (targetAgentId === 'ai') {
      handleFocusTier('boss')
    } else {
      setCamPos(new THREE.Vector3(agent.deskPos[0] + 6, agent.deskPos[1] + 6, agent.deskPos[2] + 7))
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

  // Camera Focus Tier with Smooth Glide
  const handleFocusTier = (tier) => {
    setIsFreeCam(false)
    if (tier === 'all') {
      setCamPos(new THREE.Vector3(28, 22, 34))
      setLookPos(new THREE.Vector3(0, 2, -2))
    } else if (tier === 'boss') {
      setCamPos(new THREE.Vector3(0, 11.0, -8.0))
      setLookPos(new THREE.Vector3(0, 4.6, -15.5))
    } else if (tier === 'workspace') {
      setCamPos(new THREE.Vector3(0, 13.0, 9.0))
      setLookPos(new THREE.Vector3(0, 2.4, -3.5))
    } else if (tier === 'pantry') {
      setCamPos(new THREE.Vector3(0, 6.5, 18.0))
      setLookPos(new THREE.Vector3(0, 0.6, 7.5))
    }
  }

  const handleLock = () => {
    sessionStorage.removeItem('sb_unlocked')
    setUnlocked(false)
  }

  return (
    <ErrorBoundary>
      <div className="relative w-screen h-screen overflow-hidden bg-[#a2e8dd]">
        {/* 1. Security Gate PIN Overlay */}
        {!unlocked && <SecurityGate onUnlocked={() => setUnlocked(true)} />}

        {/* 2. Three.js Canvas Scene */}
        <Canvas
          shadows
          camera={{ position: [28, 22, 34], fov: 42, near: 0.1, far: 1000 }}
          className="w-full h-full"
        >
          {/* Cinematic Camera Director */}
          <CameraDirector
            cameraPos={camPos}
            lookAtPos={lookPos}
            controlsRef={controlsRef}
            isFreeCam={isFreeCam}
          />

          {/* Soft Sunlight */}
          <ambientLight intensity={0.7} color="#ffffff" />
          <hemisphereLight intensity={1.1} groundColor="#8fcc70" color="#fff6e5" />
          <directionalLight
            position={[25, 45, 20]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={0.5}
            shadow-camera-far={120}
            shadow-camera-left={-28}
            shadow-camera-right={28}
            shadow-camera-top={28}
            shadow-camera-bottom={-28}
            color="#fff5db"
          />

          <Sky
            distance={450000}
            sunPosition={[25, 40, 20]}
            inclination={0.6}
            azimuth={0.25}
            turbidity={5}
            rayleigh={0.5}
          />

          <fog attach="fog" args={['#a2e8dd', 35, 120]} />

          {/* Orbit Controls with full free cam capabilities */}
          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.06}
            maxPolarAngle={Math.PI / 2.05}
            minDistance={3}
            maxDistance={120}
            enablePan={true}
            screenSpacePanning={true}
            target={[0, 2, -2]}
          />

          {/* Suspense wrapper with 3D Assets */}
          <Suspense fallback={null}>
            {/* Vast Ocean, Sandy Beach, Palm Trees, Clouds & Mountains */}
            <IslandEnvironment />

            {/* Expanded Island Terraces, Desks & Laptops */}
            <AnimalCrossingIsland
              counts={counts}
              showLabels={unlocked}
              onOpenBulletin={() => setBulletinOpen(true)}
            />

            {/* 17 Villagers with Laptops and Sitting Poses */}
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
          </Suspense>
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
            isFreeCam={isFreeCam}
            onToggleFreeCam={() => setIsFreeCam(!isFreeCam)}
          />
        )}
      </div>
    </ErrorBoundary>
  )
}
