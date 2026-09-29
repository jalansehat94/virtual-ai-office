import React, { useState } from 'react'
import {
  Lock,
  Sparkles,
  Send,
  MessageSquare,
  Coffee,
  Palette,
  Crown,
  Layers,
  CheckCircle2,
  X,
  Compass,
  Terminal,
  FileText,
  Brain,
  Calendar,
  Play,
  Pause,
  Bot,
  Video,
  CheckCheck
} from 'lucide-react'

export default function UIOverlay({
  counts,
  selectedAgent,
  agentStatus,
  onCloseModal,
  onToggleAgent,
  onFocusTier,
  onLock,
  commsLogs,
  bulletinOpen,
  onCloseBulletin,
  onOpenBulletin,
  onDispatchCommand,
  bossMessage,
  autoMode,
  onToggleAutoMode,
  isFreeCam,
  onToggleFreeCam,
  waModalOpen = false,
  onOpenWaModal,
  onCloseWaModal,
  waGroupLogs = [],
  onSendWhatsAppMessage
}) {
  const [activeTab, setActiveTab] = useState('thoughts')
  const [customCommand, setCustomCommand] = useState('')
  const [waInput, setWaInput] = useState('')

  // Track viewport dimensions to guarantee 0-collision in landscape and portrait
  const [viewport, setViewport] = useState(() => ({
    isShort: typeof window !== 'undefined' ? window.innerHeight < 560 : false,
    isNarrow: typeof window !== 'undefined' ? window.innerWidth < 640 : false,
  }))

  React.useEffect(() => {
    const handleResize = () => {
      setViewport({
        isShort: window.innerHeight < 560,
        isNarrow: window.innerWidth < 640,
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isCompact = viewport.isNarrow || viewport.isShort

  const handleSendPrompt = (e) => {
    e.preventDefault()
    if (!customCommand.trim()) return
    onDispatchCommand('custom', customCommand)
    setCustomCommand('')
  }

  const handleSendWa = (e) => {
    e.preventDefault()
    if (!waInput.trim()) return
    if (onSendWhatsAppMessage) {
      onSendWhatsAppMessage(waInput)
    }
    setWaInput('')
  }

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden font-sans">
      
      {/* ============================================================== */}
      {/* 1. TOP HEADER (DESKTOP & MOBILE RESPONSIVE NOOK MILES STYLE)   */}
      {/* ============================================================== */}
      
      {/* DESKTOP HEADER (Only when NOT compact/short) */}
      {!isCompact && (
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2.5 pointer-events-auto z-20">
        
        {/* Island Info Badge */}
        <div className="flex items-center gap-2 bg-[#fefae0]/95 border-2 border-[#76cdbe] px-3.5 py-1.5 rounded-2xl shadow-[0_3px_0_#529d8f] backdrop-blur-sm">
          <div className="w-7 h-7 rounded-full bg-[#76cdbe] flex items-center justify-center text-base shadow-inner">
            🏝️
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-[#5c3a21]">SecondBrain Island HQ</span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-[#e0f5f0] text-[#1b4b41] text-[9px] font-black border border-[#76cdbe]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
                AUTONOMOUS
              </span>
            </div>
            <div className="text-[10px] text-[#8b5a2b] font-bold">
              Rep: <span className="text-[#286f63]">Heru Ardiansyah</span> • 17 Villagers
            </div>
          </div>
        </div>

        {/* Boss Announcement Banner (When Command Dispatched) */}
        {bossMessage && (
          <div className="hidden lg:flex items-center gap-2 bg-[#fefae0] border-2 border-[#f59e0b] px-3 py-1.5 rounded-2xl shadow-[0_3px_0_#d97706] text-xs font-black text-[#78350f] animate-in slide-in-from-top-2">
            <span className="text-base">👑</span>
            <span className="truncate max-w-sm">{bossMessage}</span>
          </div>
        )}

        {/* Cloud Comms Status, WhatsApp Bot Group & Controls */}
        <div className="flex items-center gap-1.5">
          {/* Auto Mode Toggle */}
          <button
            onClick={onToggleAutoMode}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border-2 text-[10px] font-black transition-all shadow-[0_2px_0_rgba(0,0,0,0.12)] active:translate-y-0.5 ${
              autoMode
                ? 'bg-[#e0f5f0] border-[#10b981] text-[#065f46]'
                : 'bg-[#fee2e2] border-[#f87171] text-[#991b1b]'
            }`}
          >
            {autoMode ? <Play size={11} className="fill-current" /> : <Pause size={11} />}
            <span>Auto: {autoMode ? 'ON' : 'OFF'}</span>
          </button>

          {/* WhatsApp Bot Group Button */}
          <button
            onClick={onOpenWaModal}
            className="flex items-center gap-1.5 bg-[#e8f5e9] border-2 border-[#25d366] px-3 py-1.5 rounded-xl shadow-[0_2px_0_#128c7e] text-[10px] font-black text-[#1b5e20] hover:bg-[#c8e6c9] active:translate-y-0.5 transition-all"
            title="Buka Grup Chat WhatsApp Bot SecondBrain"
          >
            <span className="text-xs">💬</span>
            <span>WA Group Bot</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#25d366] animate-pulse" />
          </button>

          {/* Bulletin Board Button */}
          <button
            onClick={onOpenBulletin}
            className="flex items-center gap-1 bg-[#fefae0] border-2 border-[#d4a373] px-2.5 py-1.5 rounded-xl shadow-[0_2px_0_#b07d52] text-[10px] font-black text-[#5c3a21] hover:bg-[#ede0d4] active:translate-y-0.5 transition-all"
          >
            <span>📌</span> Buletin
          </button>

          {/* Working & Standby Counts + Lock */}
          <div className="flex items-center gap-1.5 bg-[#fefae0] border-2 border-[#fcd34d] px-2.5 py-1.5 rounded-xl shadow-[0_2px_0_#f59e0b] text-[10px] font-black text-[#78350f]">
            <span>Kerja: <strong className="text-[#15803d]">{counts.working}</strong></span>
            <span>•</span>
            <span>Santai: <strong className="text-[#b45309]">{counts.standby}</strong></span>
            <button
              onClick={onLock}
              title="Kunci Markas (Master PIN 211103)"
              className="ml-1 w-5 h-5 rounded-lg bg-[#fbbf24] hover:bg-[#f59e0b] text-[#78350f] flex items-center justify-center transition-all shadow-[0_1px_0_#d97706] active:translate-y-0.5"
            >
              <Lock size={10} />
            </button>
          </div>
        </div>
      </div>
      )}

      {/* MOBILE HEADER (Phones in Portrait & Landscape: ultra slim single row) */}
      {isCompact && (
        <div className="flex absolute top-2 left-2 right-2 items-center justify-between gap-1 pointer-events-auto z-20 bg-[#fefae0]/95 border-2 border-[#76cdbe] px-2.5 py-1.5 rounded-2xl shadow-[0_3px_0_#529d8f] backdrop-blur-md">
          {/* Left: Island Mini Badge */}
          <div className="flex items-center gap-1.5">
            <span className="text-base">🏝️</span>
            <div>
              <div className="text-[11px] font-black text-[#5c3a21] leading-tight">SecondBrain HQ</div>
              <div className="text-[8px] font-bold text-[#8b5a2b] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
                17 Agen • {counts.working} Kerja
              </div>
            </div>
          </div>

          {/* Right: Compact Action Buttons */}
          <div className="flex items-center gap-1">
            {/* WhatsApp Bot Button */}
            <button
              onClick={onOpenWaModal}
              className="flex items-center gap-1 bg-[#25d366] text-white px-2 py-1 rounded-xl text-[10px] font-black shadow-sm active:scale-95 transition-all"
              title="WhatsApp Group Bot"
            >
              <span>💬</span>
              <span>WA Bot</span>
            </button>

            {/* Bulletin Button */}
            <button
              onClick={onOpenBulletin}
              className="w-7 h-7 bg-[#ede0d4] text-[#5c3a21] rounded-xl flex items-center justify-center text-xs font-bold shadow-sm active:scale-95"
              title="Papan Buletin"
            >
              📌
            </button>

            {/* Auto Mode Pill */}
            <button
              onClick={onToggleAutoMode}
              className={`w-7 h-7 rounded-xl flex items-center justify-center text-[10px] font-black border transition-all ${
                autoMode
                  ? 'bg-[#e0f5f0] border-[#10b981] text-[#065f46]'
                  : 'bg-[#fee2e2] border-[#f87171] text-[#991b1b]'
              }`}
              title={`Auto Office: ${autoMode ? 'ON' : 'OFF'}`}
            >
              {autoMode ? '▶' : '⏸'}
            </button>

            {/* Lock */}
            <button
              onClick={onLock}
              className="w-7 h-7 rounded-xl bg-[#fbbf24] text-[#78350f] flex items-center justify-center shadow-sm active:scale-95"
              title="Kunci Markas"
            >
              <Lock size={12} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Boss Announcement Toast */}
      {bossMessage && isCompact && (
        <div className="flex absolute top-12 left-2 right-2 pointer-events-auto z-10 justify-center">
          <div className="bg-[#fefae0] border-2 border-[#f59e0b] px-3 py-1 rounded-xl shadow-md text-[10px] font-black text-[#78350f] flex items-center gap-1 animate-in fade-in slide-in-from-top-2 truncate max-w-full">
            <span>👑</span>
            <span className="truncate">{bossMessage}</span>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. BOTTOM LEFT: LIVE COMMS TICKER (DESKTOP ONLY)              */}
      {/* ============================================================== */}
      {!isCompact && (
        <div className="absolute bottom-24 left-4 max-w-xs pointer-events-auto z-10">
          <div className="bg-[#fef9e7]/95 border-2 border-[#d4a373] rounded-2xl p-2.5 shadow-[0_3px_0_#b07d52] backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-[#e6ccb2] pb-1 mb-1.5">
              <span className="text-[10px] font-black text-[#5c3a21] flex items-center gap-1">
                📌 NOOKLINK & WA COMMS
              </span>
              <button
                onClick={onOpenWaModal}
                className="text-[9px] font-bold text-[#1b5e20] bg-[#e8f5e9] hover:bg-[#c8e6c9] px-1.5 py-0.2 rounded-full border border-[#a5d6a7] transition-all"
              >
                Session 1 WA
              </button>
            </div>
            <div className="space-y-1 text-[10px] font-bold">
              {commsLogs.slice(0, 3).map((log, idx) => (
                <div key={idx} className="text-[#2b7264] truncate leading-tight">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. BOTTOM CENTER: COMMAND BAR & HORIZONTAL SWIPEABLE CONTROLS   */}
      {/* ============================================================== */}
      <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 w-full max-w-2xl px-2 sm:px-4 flex flex-col items-center gap-1.5 pointer-events-auto z-20">
        
        {/* Quick Action Dispatch Chips (NEVER WRAPS ON MOBILE - HORIZONTALLY SCROLLABLE) */}
        <div className="w-full flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-1 justify-start sm:justify-center">
          <button
            onClick={() => onDispatchCommand('luna', 'Audit Skripsi Bab II SNI 03-6197')}
            className="flex-shrink-0 px-2.5 py-1 rounded-xl bg-[#fefae0] border-2 border-[#9d71e8] shadow-[0_2px_0_#6d28d9] text-[10px] sm:text-[11px] font-black text-[#5b21b6] hover:bg-[#ede9fe] active:translate-y-0.5 transition-all flex items-center gap-1 whitespace-nowrap"
          >
            <span>🎓</span> @Luna: Skripsi
          </button>
          <button
            onClick={() => onDispatchCommand('masamba', 'Analisis Order Block BTC & FVG')}
            className="flex-shrink-0 px-2.5 py-1 rounded-xl bg-[#fefae0] border-2 border-[#f59e0b] shadow-[0_2px_0_#d97706] text-[10px] sm:text-[11px] font-black text-[#92400e] hover:bg-[#fef3c7] active:translate-y-0.5 transition-all flex items-center gap-1 whitespace-nowrap"
          >
            <span>🐺</span> @MasAmba: Trading
          </button>
          <button
            onClick={() => onDispatchCommand('kaktus', 'Razia Clash BIM Menara Dynamo')}
            className="flex-shrink-0 px-2.5 py-1 rounded-xl bg-[#fefae0] border-2 border-[#10b981] shadow-[0_2px_0_#059669] text-[10px] sm:text-[11px] font-black text-[#065f46] hover:bg-[#d1fae5] active:translate-y-0.5 transition-all flex items-center gap-1 whitespace-nowrap"
          >
            <span>🌵</span> @Kaktus: BIM
          </button>
          <button
            onClick={() => onDispatchCommand('mochi', 'Deploy GradiEnt Studio Web V3')}
            className="flex-shrink-0 px-2.5 py-1 rounded-xl bg-[#fefae0] border-2 border-[#06b6d4] shadow-[0_2px_0_#0891b2] text-[10px] sm:text-[11px] font-black text-[#0e7490] hover:bg-[#cffafe] active:translate-y-0.5 transition-all flex items-center gap-1 whitespace-nowrap"
          >
            <span>🐕</span> @Mochi: Web
          </button>
          <button
            onClick={() => onDispatchCommand('all_rest', 'Semua agen istirahat di Roost Cafe')}
            className="flex-shrink-0 px-2.5 py-1 rounded-xl bg-[#fefae0] border-2 border-[#f97316] shadow-[0_2px_0_#ea580c] text-[10px] sm:text-[11px] font-black text-[#c2410c] hover:bg-[#ffedd5] active:translate-y-0.5 transition-all flex items-center gap-1 whitespace-nowrap"
          >
            <span>☕</span> Semua Ngopi
          </button>
        </div>

        {/* Input Prompt Bar */}
        <form
          onSubmit={handleSendPrompt}
          className="w-full flex items-center gap-2 bg-[#fefae0]/95 border-2 sm:border-3 border-[#76cdbe] p-1 pl-3 sm:pl-4 rounded-xl sm:rounded-2xl shadow-[0_3px_0_#529d8f] backdrop-blur-md"
        >
          <Bot size={16} className="text-[#286f63] flex-shrink-0" />
          <input
            type="text"
            value={customCommand}
            onChange={(e) => setCustomCommand(e.target.value)}
            placeholder="Perintahkan agen pulau... (contoh: @luna cek bab 2)"
            className="w-full bg-transparent text-xs font-bold text-[#5c3a21] placeholder-[#a98467] focus:outline-none"
          />
          <button
            type="submit"
            className="h-7 sm:h-8 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-[#76cdbe] hover:bg-[#529d8f] text-[#1b4b41] text-xs font-black shadow-[0_2px_0_#3d8276] active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1 flex-shrink-0"
          >
            <span>Kirim</span>
            <Send size={11} />
          </button>
        </form>

        {/* Camera Tier Selector (Responsive single row) */}
        <div className="flex items-center justify-center gap-1 bg-[#fefae0]/95 border-2 border-[#d4a373] p-1 rounded-xl sm:rounded-2xl shadow-[0_2px_0_#b07d52] backdrop-blur-md overflow-x-auto no-scrollbar max-w-full">
          <button
            onClick={() => onFocusTier('all')}
            className="flex-shrink-0 px-2 sm:px-2.5 py-1 rounded-lg sm:rounded-xl text-[10px] sm:text-[11px] font-black text-[#286f63] hover:bg-[#e0f5f0] transition-all flex items-center gap-1"
          >
            <Compass size={12} /> <span className="hidden xs:inline">Seluruh</span> Pulau
          </button>
          <button
            onClick={() => onFocusTier('boss')}
            className="flex-shrink-0 px-2 sm:px-2.5 py-1 rounded-lg sm:rounded-xl text-[10px] sm:text-[11px] font-black text-[#5c3a21] hover:bg-[#ede0d4] transition-all flex items-center gap-1"
          >
            <Crown size={12} /> Lounge
          </button>
          <button
            onClick={() => onFocusTier('workspace')}
            className="flex-shrink-0 px-2 sm:px-2.5 py-1 rounded-lg sm:rounded-xl text-[10px] sm:text-[11px] font-black text-[#1b4b41] hover:bg-[#e0f5f0] transition-all flex items-center gap-1"
          >
            <Palette size={12} /> Labirin
          </button>
          <button
            onClick={() => onFocusTier('pantry')}
            className="flex-shrink-0 px-2 sm:px-2.5 py-1 rounded-lg sm:rounded-xl text-[10px] sm:text-[11px] font-black text-[#92400e] hover:bg-[#fef3c7] transition-all flex items-center gap-1"
          >
            <Coffee size={12} /> Cafe
          </button>
          <button
            onClick={onToggleFreeCam}
            className={`flex-shrink-0 px-2 sm:px-2.5 py-1 rounded-lg sm:rounded-xl text-[10px] sm:text-[11px] font-black transition-all flex items-center gap-1 shadow-sm ${
              isFreeCam
                ? 'bg-[#3b82f6] text-white shadow-inner animate-pulse'
                : 'bg-[#dbeafe] text-[#1e40af] hover:bg-[#bfdbfe]'
            }`}
          >
            <Video size={12} />
            <span>{isFreeCam ? 'Bebas' : '🎥 Kamera'}</span>
          </button>
        </div>

        {/* Free Cam Active Hint */}
        {isFreeCam && (
          <div className="bg-[#1e40af]/90 text-white text-[9px] sm:text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md backdrop-blur-sm animate-in fade-in text-center truncate max-w-full">
            🎥 Sentuh/klik putar 360° • Dua jari geser • Cubit/scroll zoom
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* 4. SELECTED AGENT INSPECTOR: RESPONSIVE BOTTOM SHEET ON MOBILE */}
      {/* ============================================================== */}
      {selectedAgent && (
        <div className="pointer-events-auto z-40 fixed md:absolute 
          inset-x-0 bottom-0 md:inset-x-auto md:bottom-24 md:right-4 
          w-full md:w-96 max-h-[80vh] md:max-h-none overflow-y-auto
          bg-[#fefae0] border-t-4 md:border-4 border-[#76cdbe] 
          rounded-t-3xl md:rounded-3xl p-4 sm:p-5 
          shadow-[0_-8px_30px_rgba(0,0,0,0.25)] md:shadow-[0_8px_0_#529d8f,0_20px_25px_-5px_rgba(0,0,0,0.15)] 
          transition-all animate-in slide-in-from-bottom-6">
          
          {/* Mobile Drag Indicator Pill */}
          <div className="md:hidden w-10 h-1.5 bg-[#d4a373] rounded-full mx-auto mb-3" />

          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-sm border-2 border-white flex-shrink-0"
                style={{ backgroundColor: selectedAgent.color }}
              >
                {selectedAgent.emoji}
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-[#5c3a21] leading-tight">
                  {selectedAgent.name}
                </h3>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#8b5a2b]">
                  {selectedAgent.role}
                </span>
              </div>
            </div>
            <button
              onClick={onCloseModal}
              className="w-7 h-7 rounded-full bg-[#ede0d4] text-[#7f5539] hover:bg-[#ddb892] flex items-center justify-center transition-all shadow-sm flex-shrink-0"
            >
              <X size={14} />
            </button>
          </div>

          {/* Status Badge */}
          <div className="mb-3 flex items-center justify-between">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-black tracking-wider uppercase border ${
                agentStatus === 'working'
                  ? 'bg-[#e0f5f0] text-[#1b4b41] border-[#76cdbe]'
                  : 'bg-[#fef3c7] text-[#92400e] border-[#fcd34d]'
              }`}
            >
              <CheckCircle2 size={13} />
              {agentStatus === 'working' ? 'Bekerja di Laptop' : 'Santai di Roost Cafe'}
            </div>
          </div>

          {/* 3 Tabs */}
          <div className="flex items-center gap-1 bg-[#ede0d4] p-1 rounded-xl mb-3">
            <button
              onClick={() => setActiveTab('thoughts')}
              className={`flex-1 py-1 text-[10px] sm:text-[11px] font-black rounded-lg transition-all flex items-center justify-center gap-1 ${
                activeTab === 'thoughts' ? 'bg-[#fefae0] text-[#5c3a21] shadow-sm' : 'text-[#8b5a2b]'
              }`}
            >
              <Brain size={12} /> Status
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              className={`flex-1 py-1 text-[10px] sm:text-[11px] font-black rounded-lg transition-all flex items-center justify-center gap-1 ${
                activeTab === 'terminal' ? 'bg-[#fefae0] text-[#5c3a21] shadow-sm' : 'text-[#8b5a2b]'
              }`}
            >
              <Terminal size={12} /> Terminal
            </button>
            <button
              onClick={() => setActiveTab('deliverables')}
              className={`flex-1 py-1 text-[10px] sm:text-[11px] font-black rounded-lg transition-all flex items-center justify-center gap-1 ${
                activeTab === 'deliverables' ? 'bg-[#fefae0] text-[#5c3a21] shadow-sm' : 'text-[#8b5a2b]'
              }`}
            >
              <FileText size={12} /> Berkas
            </button>
          </div>

          {activeTab === 'thoughts' && (
            <div className="space-y-2.5 mb-3">
              <div className="bg-[#fffdf5] border-2 border-[#e6ccb2] rounded-2xl p-2.5 sm:p-3 shadow-inner">
                <div className="text-[9px] sm:text-[10px] font-black text-[#8b5a2b] uppercase tracking-wider mb-1">
                  PIKIRAN REAL-TIME:
                </div>
                <div className="text-xs font-bold text-[#286f63] flex items-center gap-1.5">
                  <span className="text-base">{selectedAgent.bubbleIcon || '💡'}</span>
                  <span>{selectedAgent.bubbleText}</span>
                </div>
              </div>

              <div>
                <div className="text-[9px] sm:text-[10px] font-black text-[#8b5a2b] uppercase tracking-wider mb-1.5">
                  KEAHLIAN & METODE:
                </div>
                <div className="flex flex-wrap gap-1">
                  {selectedAgent.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-[#e5f4ef] text-[#244f45] px-2 py-0.5 rounded-lg text-[9px] sm:text-[10px] font-bold border border-[#b2e2d7]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'terminal' && (
            <div className="mb-3 bg-[#0f172a] text-[#38bdf8] font-mono text-[9px] sm:text-[10px] p-2.5 sm:p-3 rounded-2xl shadow-inner border border-[#334155] space-y-1 h-32 sm:h-36 overflow-y-auto">
              <div className="text-[#64748b] text-[8px] sm:text-[9px] border-b border-[#1e293b] pb-1 mb-1">
                SESSION 1 • DAEMON PTY ATTACHED
              </div>
              {selectedAgent.terminalLogs?.map((log, i) => (
                <div
                  key={i}
                  className={log.startsWith('$') ? 'text-[#facc15]' : (log.includes('[OK]') || log.includes('[SUCCESS]') || log.includes('[VALID]') ? 'text-[#4ade80]' : 'text-[#94a3b8]')}
                >
                  {log}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'deliverables' && (
            <div className="mb-3 space-y-1.5 h-32 sm:h-36 overflow-y-auto pr-1">
              {selectedAgent.deliverables?.map((doc, i) => (
                <div
                  key={i}
                  className="bg-white border border-[#e2e8f0] p-2 rounded-xl flex items-center justify-between text-xs hover:border-[#76cdbe] transition-all shadow-sm"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-base">
                      {doc.type === 'word' ? '📄' : (doc.type === 'excel' ? '📊' : (doc.type === 'pdf' ? '📕' : '📐'))}
                    </span>
                    <div className="truncate">
                      <div className="font-bold text-[#1e293b] truncate text-[10px] sm:text-[11px]">{doc.name}</div>
                      <div className="text-[8px] sm:text-[9px] text-[#64748b]">{doc.size} • {doc.date}</div>
                    </div>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#059669] bg-[#ecfdf5] px-1.5 py-0.5 rounded border border-[#a7f3d0]">
                    Siap
                  </span>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => onToggleAgent(selectedAgent.id)}
            className={`w-full py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs font-black shadow-[0_3px_0_rgba(0,0,0,0.15)] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 ${
              agentStatus === 'working'
                ? 'bg-[#fed7aa] text-[#9a3412] hover:bg-[#fdba74]'
                : 'bg-[#76cdbe] text-[#1b4b41] hover:bg-[#529d8f]'
            }`}
          >
            {agentStatus === 'working' ? (
              <>
                <Coffee size={14} /> Ajak Santai ke Roost Cafe
              </>
            ) : (
              <>
                <Palette size={14} /> Buka Laptop & Tugaskan Kerja
              </>
            )}
          </button>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. WHATSAPP BOT GROUP LIVE HUB MODAL                           */}
      {/* ============================================================== */}
      {waModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-auto p-2 sm:p-4">
          <div className="w-full max-w-lg bg-[#efeae2] border-2 border-[#128c7e] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95">
            
            {/* WhatsApp Header */}
            <div className="bg-[#075e54] text-white p-3.5 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-[#128c7e] border border-white/20 flex items-center justify-center text-lg">
                  🏝️
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                    SecondBrain Bot Group
                    <span className="w-2 h-2 rounded-full bg-[#25d366] inline-block animate-ping" />
                  </h3>
                  <p className="text-[10px] text-[#a7f3d0]">
                    17 bot aktif • Session 1 Physical Desktop Connected
                  </p>
                </div>
              </div>
              <button
                onClick={onCloseWaModal}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Verification Status Banner */}
            <div className="bg-[#dcf8c6] border-b border-[#c8e6c9] px-3 py-1.5 text-[10px] text-[#1b5e20] font-bold flex items-center justify-between">
              <span className="flex items-center gap-1">
                🔒 Terverifikasi di WhatsApp Desktop Session 1
              </span>
              <span className="text-[9px] bg-white/70 px-1.5 py-0.5 rounded-full">
                PID 15620 • Live
              </span>
            </div>

            {/* Chat Feed */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2.5 bg-[#efeae2] bg-opacity-95">
              {waGroupLogs.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.isSelf ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-1.5 shadow-sm text-xs ${
                      msg.isSelf
                        ? 'bg-[#d9fdd3] text-[#111b21] rounded-tr-none'
                        : 'bg-white text-[#111b21] rounded-tl-none border border-[#e2e8f0]'
                    }`}
                  >
                    {!msg.isSelf && (
                      <div className="flex items-center gap-1 text-[10px] font-black text-[#128c7e] mb-0.5">
                        <span>{msg.sender}</span>
                        <span className="text-[9px] text-[#64748b] font-normal">({msg.role})</span>
                      </div>
                    )}
                    <p className="leading-snug">{msg.text}</p>
                    <div className="text-[9px] text-[#667781] text-right mt-0.5 flex items-center justify-end gap-1">
                      <span>{msg.time}</span>
                      {msg.isSelf && <CheckCheck size={11} className="text-[#53bdeb]" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp Input Bar */}
            <form
              onSubmit={handleSendWa}
              className="bg-[#f0f2f5] p-2 flex items-center gap-2 border-t border-[#d1d7db]"
            >
              <input
                type="text"
                value={waInput}
                onChange={(e) => setWaInput(e.target.value)}
                placeholder="Kirim pesan ke grup bot WhatsApp..."
                className="flex-1 bg-white text-xs px-3.5 py-2 rounded-full border border-[#e2e8f0] focus:outline-none text-[#111b21] placeholder-[#8696a0]"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-full bg-[#00a884] hover:bg-[#008f6f] text-white flex items-center justify-center shadow-sm active:scale-95 transition-all flex-shrink-0"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 6. CORK BULLETIN BOARD POPUP                                   */}
      {/* ============================================================== */}
      {bulletinOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-auto p-4">
          <div className="w-full max-w-lg bg-[#fef9e7] border-4 border-[#8b5a2b] rounded-3xl p-5 sm:p-6 shadow-[0_12px_0_#5c3a21] animate-in zoom-in-95 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b-2 border-[#d4a373] pb-3 mb-3">
              <div className="flex items-center gap-2 text-base sm:text-lg font-black text-[#5c3a21]">
                <span>📌</span> Papan Buletin Pulau SecondBrain
              </div>
              <button
                onClick={onCloseBulletin}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#ede0d4] text-[#7f5539] hover:bg-[#ddb892] flex items-center justify-center font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-[#5c3a21]">
              <div className="bg-[#fffdf5] border-2 border-[#e6ccb2] p-3 rounded-2xl">
                <div className="font-black text-[#8b5a2b] mb-1 flex items-center gap-1.5">
                  <Calendar size={13} /> Sesi Terakhir: 30 September 2026 (WITA)
                </div>
                <p className="font-medium text-[#475569] leading-relaxed">
                  Semua 17 agen SecondBrain aktif dalam Session 1. Arsitektur 3D Virtual AI Office telah diperbarui dengan visual Clash of Clans 2.5D (Titan Engine) dan sinkronisasi WhatsApp Desktop.
                </p>
              </div>

              <div className="bg-[#e0f5f0] border-2 border-[#76cdbe] p-3 rounded-2xl">
                <div className="font-black text-[#1b4b41] mb-1">
                  🎓 Arahan Riset Akademik (Prof. LUNA):
                </div>
                <p className="font-medium text-[#244f45] leading-relaxed">
                  Bab II Skripsi Mattoanging Al-Marwaee & Carter telah disinkronkan dengan rujukan SNI 03-6197. Dilarang menggemukkan daftar pustaka dengan jurnal acak (prinsip anti-bloat).
                </p>
              </div>

              <div className="bg-[#fef3c7] border-2 border-[#fcd34d] p-3 rounded-2xl">
                <div className="font-black text-[#92400e] mb-1">
                  📈 Batas Risiko Trading (Mas Amba & Rem):
                </div>
                <p className="font-medium text-[#78350f] leading-relaxed">
                  Batas risiko per transaksi dikunci pada 1-2% dari modal portofolio. FVG H1 BTC/USDT terpantau aman untuk akumulasi bertahap.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#e6ccb2] text-[10px] text-[#8b5a2b] font-bold text-center">
              Tersambung langsung dengan arsip SecondBrain: <code>02_brains/SESSION_ARCHIVES/</code>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
