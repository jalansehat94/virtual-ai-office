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

  const [waModalOpen, setWaModalOpen] = useState(false)
  const [waGroupLogs, setWaGroupLogs] = useState([
    { id: 1, sender: '@Luna (Prof. LUNA)', role: 'Divisi 01 Riset Akademik', time: '04:05', text: 'Rujukan SNI 03-6197 & Al-Marwaee dikunci pada Bab II Skripsi Mattoanging.' },
    { id: 2, sender: '@MasAmba', role: 'Divisi 04 Trading & Quant', time: '04:08', text: 'Market BTC/USDT bertahan di atas FVG H4. Risk dikunci max 1.5%.' },
    { id: 3, sender: '@Kaktus', role: 'Divisi 03 BIM & Konstruksi', time: '04:10', text: 'Revit IFC Menara Dynamo clean, zero clash pipa vs struktur.' },
    { id: 4, sender: '@Mochi', role: 'Divisi 02 Software & Web', time: '04:12', text: 'Layout responsif mobile & visual 2.5D CoC dioptimalkan untuk HP!' },
    { id: 5, sender: '@Ai (PM)', role: 'Chief of Staff', time: '04:15', text: 'Heru, semua 17 bot SecondBrain aktif dan terhubung di WhatsApp Desktop!' }
  ])

  // Camera Mode: Director vs Free Cam
  const [isFreeCam, setIsFreeCam] = useState(false)

  // Camera targets for smooth cinematic director (CoC 2.5D Isometric default)
  const [camPos, setCamPos] = useState(() => new THREE.Vector3(30, 24, 30))
  const [lookPos, setLookPos] = useState(() => new THREE.Vector3(0, 2, -2))

  const [commsLogs, setCommsLogs] = useState([
    '💬 [WhatsApp Group] @Ai: 17 Bot SecondBrain terhubung di Session 1',
    '🦉 [WhatsApp Group] @Luna: Bab II Mattoanging Al-Marwaee & Carter disinkronkan',
    '🐺 [WhatsApp Group] @MasAmba: Funding rate Binance net-neutral, bull safe',
    '🦝 [Cloud] @Piksel: UI component responsive layout synced',
    '🌵 [Cloud] @Kaktus: Menara Dynamo IFC clash free',
    '🐶 [Cloud] @Botik: Python backtest Sharpe ratio 2.14 verified'
  ])

  const controlsRef = useRef()

  const handleSendWhatsAppMessage = (text) => {
    if (!text.trim()) return
    const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    const userMsg = {
      id: Date.now(),
      sender: 'Heru (You)',
      role: 'Master Admin',
      time: timeStr,
      text: text,
      isSelf: true
    }

    let botId = 'ai'
    let botReply = 'Siap Heru! Perintah diterima dan disinkronkan ke seluruh sistem SecondBrain.'
    const lower = text.toLowerCase()
    if (lower.includes('skripsi') || lower.includes('@luna')) {
      botId = 'luna'
      botReply = 'Baik Heru, rujukan SNI 03-6197 dan jurnal Scopus Q1 segera dievaluasi untuk naskah skripsi.'
    } else if (lower.includes('trading') || lower.includes('@masamba') || lower.includes('btc')) {
      botId = 'masamba'
      botReply = 'Order block dan FVG H4 siap dipantau. Risk per trade tetap dibatasi 1-2% modal.'
    } else if (lower.includes('bim') || lower.includes('@kaktus') || lower.includes('revit')) {
      botId = 'kaktus'
      botReply = 'Pemeriksaan clash geometry IFC Menara Dynamo sedang dieksekusi!'
    } else if (lower.includes('web') || lower.includes('@mochi')) {
      botId = 'mochi'
      botReply = 'Komponen web dan layout mobile GradiEnt Studio siap disinkronkan.'
    }

    const botMsg = {
      id: Date.now() + 1,
      sender: AGENTS_DATA[botId]?.name || '@Ai',
      role: AGENTS_DATA[botId]?.role || 'Chief of Staff',
      time: timeStr,
      text: botReply,
      isSelf: false
    }

    setWaGroupLogs(prev => [...prev, userMsg, botMsg])
    setCommsLogs(prev => [`💬 [WhatsApp Group] ${AGENTS_DATA[botId]?.name || '@Ai'}: ${botReply}`, ...prev.slice(0, 8)])
    handleDispatchCommand(botId, text)
  }

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
    if (agent) {
      setSelectedAgent(agent)
    }

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
      setCamPos(new THREE.Vector3(30, 24, 30))
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
      <div className="relative w-screen h-screen overflow-hidden bg-[#e06d4e]">
        {/* 1. Security Gate PIN Overlay */}
        {!unlocked && <SecurityGate onUnlocked={() => setUnlocked(true)} />}

        {/* 2. Three.js Canvas Scene - Optimized with Clash of Clans (CoC) Titan 2.5D Aesthetic */}
        <Canvas
          shadows
          dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.8)]}
          performance={{ min: 0.5 }}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.18,
          }}
          camera={{ position: [30, 24, 30], fov: 36, near: 0.1, far: 1000 }}
          className="w-full h-full touch-none"
        >
          {/* Terracotta Sunset Sky matching reference */}
          <color attach="background" args={['#e06d4e']} />

          {/* Cinematic Camera Director */}
          <CameraDirector
            cameraPos={camPos}
            lookAtPos={lookPos}
            controlsRef={controlsRef}
            isFreeCam={isFreeCam}
          />

          {/* Warm Terracotta Diorama Lighting & Golden Rim Light */}
          <ambientLight intensity={0.8} color="#fff1e6" />
          <hemisphereLight intensity={0.9} groundColor="#8d5b4c" color="#fff3e0" />
          <directionalLight
            position={[26, 38, 20]}
            intensity={1.85}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={0.5}
            shadow-camera-far={120}
            shadow-camera-left={-30}
            shadow-camera-right={30}
            shadow-camera-top={30}
            shadow-camera-bottom={-30}
            shadow-bias={-0.0004}
            color="#fff7ed"
          />
          {/* Anime / Clay Golden Rim Light */}
          <directionalLight position={[-25, 18, -25]} intensity={0.75} color="#ffa270" />

          <fog attach="fog" args={['#e06d4e', 45, 135]} />

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
              showLabels={unlocked && !waModalOpen && !bulletinOpen}
              onOpenBulletin={() => setBulletinOpen(true)}
            />

            {/* 17 Villagers with Laptops and Sitting Poses */}
            {Object.values(AGENTS_DATA).map(agent => (
              <Villager
                key={agent.id}
                agent={agent}
                status={agentStatuses[agent.id] || 'standby'}
                isSelected={selectedAgent?.id === agent.id}
                showLabels={unlocked && !waModalOpen && !bulletinOpen}
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
            waModalOpen={waModalOpen}
            onOpenWaModal={() => setWaModalOpen(true)}
            onCloseWaModal={() => setWaModalOpen(false)}
            waGroupLogs={waGroupLogs}
            onSendWhatsAppMessage={handleSendWhatsAppMessage}
          />
        )}
      </div>
    </ErrorBoundary>
  )
}
