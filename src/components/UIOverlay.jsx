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
  Bot
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
  onToggleAutoMode
}) {
  const [activeTab, setActiveTab] = useState('thoughts')
  const [customCommand, setCustomCommand] = useState('')

  const handleSendPrompt = (e) => {
    e.preventDefault()
    if (!customCommand.trim()) return
    onDispatchCommand('custom', customCommand)
    setCustomCommand('')
  }

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden font-sans">
      
      {/* --- TOP HEADER (ANIMAL CROSSING NOOK MILES STYLE) --- */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
        
        {/* Island Info Badge */}
        <div className="flex items-center gap-2.5 bg-[#fefae0] border-2 border-[#76cdbe] px-4 py-2 rounded-2xl shadow-[0_4px_0_#529d8f] backdrop-blur-sm">
          <div className="w-8 h-8 rounded-full bg-[#76cdbe] flex items-center justify-center text-lg shadow-inner">
            🏝️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-[#5c3a21]">SecondBrain Island HQ</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e0f5f0] text-[#1b4b41] text-[10px] font-black tracking-wide border border-[#76cdbe]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
                AUTONOMOUS SYSTEM
              </span>
            </div>
            <div className="text-[11px] text-[#8b5a2b] font-bold">
              Representative: <span className="text-[#286f63]">Heru Ardiansyah</span> • 17 Villagers
            </div>
          </div>
        </div>

        {/* Boss Announcement Banner (When Command Dispatched) */}
        {bossMessage && (
          <div className="hidden lg:flex items-center gap-2 bg-[#fefae0] border-2 border-[#f59e0b] px-4 py-2 rounded-2xl shadow-[0_4px_0_#d97706] text-xs font-black text-[#78350f] animate-in slide-in-from-top-2">
            <span className="text-base">👑</span>
            <span>{bossMessage}</span>
          </div>
        )}

        {/* Cloud Comms Status & Controls */}
        <div className="flex items-center gap-2">
          {/* Auto Mode Toggle */}
          <button
            onClick={onToggleAutoMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 text-[11px] font-black transition-all shadow-[0_3px_0_rgba(0,0,0,0.15)] active:translate-y-0.5 ${
              autoMode
                ? 'bg-[#e0f5f0] border-[#10b981] text-[#065f46]'
                : 'bg-[#fee2e2] border-[#f87171] text-[#991b1b]'
            }`}
          >
            {autoMode ? <Play size={12} className="fill-current" /> : <Pause size={12} />}
            <span>Auto Office: {autoMode ? 'ON' : 'OFF'}</span>
          </button>

          {/* Bulletin Board Button */}
          <button
            onClick={onOpenBulletin}
            className="flex items-center gap-1.5 bg-[#fefae0] border-2 border-[#d4a373] px-3 py-1.5 rounded-xl shadow-[0_3px_0_#b07d52] text-[11px] font-black text-[#5c3a21] hover:bg-[#ede0d4] transition-all"
          >
            <span>📌</span> Buletin
          </button>

          <div className="flex items-center gap-1.5 bg-[#fefae0] border-2 border-[#60a5fa] px-3 py-1.5 rounded-xl shadow-[0_3px_0_#3b82f6] text-[11px] font-black text-[#1e40af]">
            <Send size={13} className="text-[#3b82f6]" />
            <span>@SecondBrainHeruBot</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
          </div>

          {/* Counts & Lock */}
          <div className="flex items-center gap-2 bg-[#fefae0] border-2 border-[#fcd34d] px-3 py-1.5 rounded-xl shadow-[0_3px_0_#f59e0b] text-[11px] font-black text-[#78350f]">
            <span>Bekerja: <strong className="text-[#15803d]">{counts.working}</strong></span>
            <span>•</span>
            <span>Santai: <strong className="text-[#b45309]">{counts.standby}</strong></span>
            <button
              onClick={onLock}
              title="Kunci Markas (Master PIN 211103)"
              className="ml-1 w-6 h-6 rounded-lg bg-[#fbbf24] hover:bg-[#f59e0b] text-[#78350f] flex items-center justify-center transition-all shadow-[0_2px_0_#d97706] active:translate-y-0.5 active:shadow-none"
            >
              <Lock size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* --- BOTTOM LEFT: LIVE COMMS TICKER --- */}
      <div className="absolute bottom-24 left-4 max-w-sm pointer-events-auto">
        <div className="bg-[#fef9e7] border-2 border-[#d4a373] rounded-2xl p-3 shadow-[0_4px_0_#b07d52] backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-[#e6ccb2] pb-1 mb-1.5">
            <span className="text-[11px] font-black text-[#5c3a21] flex items-center gap-1">
              📌 NOOKLINK LIVE COMMS
            </span>
            <span className="text-[9px] font-bold text-[#8b5a2b] bg-[#ede0d4] px-1.5 py-0.5 rounded-full">
              Session 1
            </span>
          </div>
          <div className="space-y-1 text-[11px] font-bold">
            {commsLogs.slice(0, 3).map((log, idx) => (
              <div key={idx} className="text-[#2b7264] truncate leading-tight">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- BOTTOM CENTER: NOOKPHONE COMMAND BAR & CAMERA SELECTOR --- */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 flex flex-col items-center gap-2 pointer-events-auto">
        
        {/* Quick Action Dispatch Chips (Triggering Live Walking & Typing!) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          <button
            onClick={() => onDispatchCommand('luna', 'Audit Skripsi Bab II SNI 03-6197')}
            className="px-2.5 py-1 rounded-xl bg-[#fefae0] border-2 border-[#9d71e8] shadow-[0_2px_0_#6d28d9] text-[11px] font-black text-[#5b21b6] hover:bg-[#ede9fe] active:translate-y-0.5 transition-all flex items-center gap-1"
          >
            <span>🎓</span> @Luna: Skripsi
          </button>
          <button
            onClick={() => onDispatchCommand('masamba', 'Analisis Order Block BTC & FVG')}
            className="px-2.5 py-1 rounded-xl bg-[#fefae0] border-2 border-[#f59e0b] shadow-[0_2px_0_#d97706] text-[11px] font-black text-[#92400e] hover:bg-[#fef3c7] active:translate-y-0.5 transition-all flex items-center gap-1"
          >
            <span>🐺</span> @MasAmba: Trading
          </button>
          <button
            onClick={() => onDispatchCommand('kaktus', 'Razia Clash BIM Menara Dynamo')}
            className="px-2.5 py-1 rounded-xl bg-[#fefae0] border-2 border-[#10b981] shadow-[0_2px_0_#059669] text-[11px] font-black text-[#065f46] hover:bg-[#d1fae5] active:translate-y-0.5 transition-all flex items-center gap-1"
          >
            <span>🌵</span> @Kaktus: BIM
          </button>
          <button
            onClick={() => onDispatchCommand('mochi', 'Deploy GradiEnt Studio Web V3')}
            className="px-2.5 py-1 rounded-xl bg-[#fefae0] border-2 border-[#06b6d4] shadow-[0_2px_0_#0891b2] text-[11px] font-black text-[#0e7490] hover:bg-[#cffafe] active:translate-y-0.5 transition-all flex items-center gap-1"
          >
            <span>🐕</span> @Mochi: Web
          </button>
          <button
            onClick={() => onDispatchCommand('all_rest', 'Semua agen istirahat di Roost Cafe')}
            className="px-2.5 py-1 rounded-xl bg-[#fefae0] border-2 border-[#f97316] shadow-[0_2px_0_#ea580c] text-[11px] font-black text-[#c2410c] hover:bg-[#ffedd5] active:translate-y-0.5 transition-all flex items-center gap-1"
          >
            <span>☕</span> Semua Ngopi
          </button>
        </div>

        {/* Input Prompt Bar */}
        <form
          onSubmit={handleSendPrompt}
          className="w-full flex items-center gap-2 bg-[#fefae0] border-3 border-[#76cdbe] p-1.5 pl-4 rounded-2xl shadow-[0_4px_0_#529d8f] backdrop-blur-md"
        >
          <Bot size={18} className="text-[#286f63] flex-shrink-0" />
          <input
            type="text"
            value={customCommand}
            onChange={(e) => setCustomCommand(e.target.value)}
            placeholder="Perintahkan agen pulau... (contoh: @luna cek referensi jurnal)"
            className="w-full bg-transparent text-xs font-bold text-[#5c3a21] placeholder-[#a98467] focus:outline-none"
          />
          <button
            type="submit"
            className="h-8 px-4 rounded-xl bg-[#76cdbe] hover:bg-[#529d8f] text-[#1b4b41] text-xs font-black shadow-[0_2px_0_#3d8276] active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-1 flex-shrink-0"
          >
            <span>Kirim</span>
            <Send size={12} />
          </button>
        </form>

        {/* Camera Tier Selector */}
        <div className="flex items-center gap-1.5 bg-[#fefae0]/95 border-2 border-[#d4a373] p-1 rounded-2xl shadow-[0_3px_0_#b07d52] backdrop-blur-md">
          <button
            onClick={() => onFocusTier('all')}
            className="px-3 py-1 rounded-xl text-[11px] font-black text-[#286f63] hover:bg-[#e0f5f0] transition-all flex items-center gap-1"
          >
            <Compass size={13} /> Seluruh Pulau
          </button>
          <button
            onClick={() => onFocusTier('boss')}
            className="px-3 py-1 rounded-xl text-[11px] font-black text-[#5c3a21] hover:bg-[#ede0d4] transition-all flex items-center gap-1"
          >
            <Crown size={13} /> Hedge Lounge
          </button>
          <button
            onClick={() => onFocusTier('workspace')}
            className="px-3 py-1 rounded-xl text-[11px] font-black text-[#1b4b41] hover:bg-[#e0f5f0] transition-all flex items-center gap-1"
          >
            <Palette size={13} /> Library Maze
          </button>
          <button
            onClick={() => onFocusTier('pantry')}
            className="px-3 py-1 rounded-xl text-[11px] font-black text-[#92400e] hover:bg-[#fef3c7] transition-all flex items-center gap-1"
          >
            <Coffee size={13} /> Roost Cafe
          </button>
        </div>
      </div>

      {/* --- RIGHT: NOOKPHONE INSPECTOR V2 --- */}
      {selectedAgent && (
        <div className="absolute bottom-24 right-4 w-96 bg-[#fefae0] border-4 border-[#76cdbe] rounded-3xl p-5 shadow-[0_8px_0_#529d8f,0_20px_25px_-5px_rgba(0,0,0,0.15)] pointer-events-auto transition-all animate-in fade-in slide-in-from-bottom-4">
          
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm border-2 border-white"
                style={{ backgroundColor: selectedAgent.color }}
              >
                {selectedAgent.emoji}
              </div>
              <div>
                <h3 className="text-base font-black text-[#5c3a21] leading-tight">
                  {selectedAgent.name}
                </h3>
                <span className="text-[11px] font-bold text-[#8b5a2b]">
                  {selectedAgent.role}
                </span>
              </div>
            </div>
            <button
              onClick={onCloseModal}
              className="w-7 h-7 rounded-full bg-[#ede0d4] text-[#7f5539] hover:bg-[#ddb892] flex items-center justify-center transition-all shadow-sm"
            >
              <X size={14} />
            </button>
          </div>

          <div className="mb-3 flex items-center justify-between">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase border ${
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
              className={`flex-1 py-1 text-[11px] font-black rounded-lg transition-all flex items-center justify-center gap-1 ${
                activeTab === 'thoughts' ? 'bg-[#fefae0] text-[#5c3a21] shadow-sm' : 'text-[#8b5a2b]'
              }`}
            >
              <Brain size={12} /> Status
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              className={`flex-1 py-1 text-[11px] font-black rounded-lg transition-all flex items-center justify-center gap-1 ${
                activeTab === 'terminal' ? 'bg-[#fefae0] text-[#5c3a21] shadow-sm' : 'text-[#8b5a2b]'
              }`}
            >
              <Terminal size={12} /> Terminal
            </button>
            <button
              onClick={() => setActiveTab('deliverables')}
              className={`flex-1 py-1 text-[11px] font-black rounded-lg transition-all flex items-center justify-center gap-1 ${
                activeTab === 'deliverables' ? 'bg-[#fefae0] text-[#5c3a21] shadow-sm' : 'text-[#8b5a2b]'
              }`}
            >
              <FileText size={12} /> Berkas
            </button>
          </div>

          {activeTab === 'thoughts' && (
            <div className="space-y-3 mb-4">
              <div className="bg-[#fffdf5] border-2 border-[#e6ccb2] rounded-2xl p-3 shadow-inner">
                <div className="text-[10px] font-black text-[#8b5a2b] uppercase tracking-wider mb-1">
                  PIKIRAN REAL-TIME:
                </div>
                <div className="text-xs font-bold text-[#286f63] flex items-center gap-1.5">
                  <span className="text-base">{selectedAgent.bubbleIcon || '💡'}</span>
                  <span>{selectedAgent.bubbleText}</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-black text-[#8b5a2b] uppercase tracking-wider mb-1.5">
                  KEAHLIAN & METODE:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedAgent.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-[#e5f4ef] text-[#244f45] px-2 py-0.5 rounded-lg text-[10px] font-bold border border-[#b2e2d7]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'terminal' && (
            <div className="mb-4 bg-[#0f172a] text-[#38bdf8] font-mono text-[10px] p-3 rounded-2xl shadow-inner border border-[#334155] space-y-1 h-36 overflow-y-auto">
              <div className="text-[#64748b] text-[9px] border-b border-[#1e293b] pb-1 mb-1">
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
            <div className="mb-4 space-y-2 h-36 overflow-y-auto pr-1">
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
                      <div className="font-bold text-[#1e293b] truncate text-[11px]">{doc.name}</div>
                      <div className="text-[9px] text-[#64748b]">{doc.size} • {doc.date}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#059669] bg-[#ecfdf5] px-1.5 py-0.5 rounded border border-[#a7f3d0]">
                    Siap
                  </span>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => onToggleAgent(selectedAgent.id)}
            className={`w-full py-2.5 rounded-2xl text-xs font-black shadow-[0_4px_0_rgba(0,0,0,0.15)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 ${
              agentStatus === 'working'
                ? 'bg-[#fed7aa] text-[#9a3412] hover:bg-[#fdba74]'
                : 'bg-[#76cdbe] text-[#1b4b41] hover:bg-[#529d8f]'
            }`}
          >
            {agentStatus === 'working' ? (
              <>
                <Coffee size={15} /> Ajak Santai ke Roost Cafe
              </>
            ) : (
              <>
                <Palette size={15} /> Buka Laptop & Tugaskan Kerja
              </>
            )}
          </button>
        </div>
      )}

      {/* --- CORK BULLETIN BOARD POPUP --- */}
      {bulletinOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-auto p-4">
          <div className="w-full max-w-lg bg-[#fef9e7] border-4 border-[#8b5a2b] rounded-3xl p-6 shadow-[0_12px_0_#5c3a21] animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b-2 border-[#d4a373] pb-3 mb-4">
              <div className="flex items-center gap-2 text-lg font-black text-[#5c3a21]">
                <span>📌</span> Papan Buletin Harian Pulau SecondBrain
              </div>
              <button
                onClick={onCloseBulletin}
                className="w-8 h-8 rounded-full bg-[#ede0d4] text-[#7f5539] hover:bg-[#ddb892] flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#5c3a21] max-h-80 overflow-y-auto pr-1">
              <div className="bg-[#fffdf5] border-2 border-[#e6ccb2] p-3 rounded-2xl">
                <div className="font-black text-[#8b5a2b] mb-1 flex items-center gap-1.5">
                  <Calendar size={13} /> Sesi Terakhir: 30 September 2026 (WITA)
                </div>
                <p className="font-medium text-[#475569] leading-relaxed">
                  Semua 17 agen SecondBrain aktif dalam Session 1. Arsitektur 3D Virtual AI Office telah berhasil dimigrasikan ke Vite + React Three Fiber + Drei dengan keamanan Master PIN 211103.
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
