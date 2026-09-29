import React from 'react'
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
  Compass
} from 'lucide-react'

export default function UIOverlay({
  counts,
  selectedAgent,
  agentStatus,
  onCloseModal,
  onToggleAgent,
  onFocusTier,
  onLock,
  commsLogs
}) {
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
                LIVE SYNC
              </span>
            </div>
            <div className="text-[11px] text-[#8b5a2b] font-bold">
              Representative: <span className="text-[#286f63]">Heru Ardiansyah</span> • 17 Villagers
            </div>
          </div>
        </div>

        {/* Cloud Comms Status (Telegram & WhatsApp) */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-[#fefae0] border-2 border-[#60a5fa] px-3 py-1.5 rounded-xl shadow-[0_3px_0_#3b82f6] text-[11px] font-black text-[#1e40af]">
            <Send size={13} className="text-[#3b82f6]" />
            <span>@SecondBrainHeruBot</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
          </div>

          <div className="flex items-center gap-1.5 bg-[#fefae0] border-2 border-[#4ade80] px-3 py-1.5 rounded-xl shadow-[0_3px_0_#22c55e] text-[11px] font-black text-[#166534]">
            <MessageSquare size={13} className="text-[#22c55e]" />
            <span>WA: Ready</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
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

      {/* --- BOTTOM LEFT: BULLETIN BOARD (LIVE AGENT COMMS) --- */}
      <div className="absolute bottom-4 left-4 max-w-sm pointer-events-auto">
        <div className="bg-[#fef9e7] border-2 border-[#d4a373] rounded-2xl p-3.5 shadow-[0_4px_0_#b07d52] backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-[#e6ccb2] pb-1.5 mb-2">
            <span className="text-xs font-black text-[#5c3a21] flex items-center gap-1.5">
              📌 BULLETIN BOARD (COMMS)
            </span>
            <span className="text-[10px] font-bold text-[#8b5a2b] bg-[#ede0d4] px-2 py-0.5 rounded-full">
              NookLink Live
            </span>
          </div>
          <div className="space-y-1.5 text-xs font-bold">
            {commsLogs.slice(0, 4).map((log, idx) => (
              <div key={idx} className="text-[#2b7264] truncate leading-tight">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- BOTTOM CENTER: CAMERA TIER NAVIGATION PILL --- */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#fefae0]/95 border-2 border-[#76cdbe] p-1.5 rounded-2xl shadow-[0_4px_0_#529d8f] backdrop-blur-md pointer-events-auto">
        <button
          onClick={() => onFocusTier('all')}
          className="px-3 py-1.5 rounded-xl text-xs font-black text-[#286f63] hover:bg-[#e0f5f0] transition-all flex items-center gap-1"
        >
          <Compass size={14} /> Seluruh Pulau
        </button>
        <button
          onClick={() => onFocusTier('boss')}
          className="px-3 py-1.5 rounded-xl text-xs font-black text-[#5c3a21] hover:bg-[#ede0d4] transition-all flex items-center gap-1"
        >
          <Crown size={14} /> Ruang Bos
        </button>
        <button
          onClick={() => onFocusTier('workspace')}
          className="px-3 py-1.5 rounded-xl text-xs font-black text-[#1b4b41] bg-[#76cdbe] shadow-[0_2px_0_#529d8f] transition-all flex items-center gap-1"
        >
          <Palette size={14} /> Studio Kerja
        </button>
        <button
          onClick={() => onFocusTier('pantry')}
          className="px-3 py-1.5 rounded-xl text-xs font-black text-[#92400e] hover:bg-[#fef3c7] transition-all flex items-center gap-1"
        >
          <Coffee size={14} /> Roost Cafe
        </button>
      </div>

      {/* --- RIGHT: AGENT INSPECTOR POPUP MODAL --- */}
      {selectedAgent && (
        <div className="absolute bottom-20 right-4 w-80 bg-[#fefae0] border-4 border-[#76cdbe] rounded-3xl p-5 shadow-[0_8px_0_#529d8f,0_20px_25px_-5px_rgba(0,0,0,0.15)] pointer-events-auto transition-all animate-in fade-in slide-in-from-bottom-4">
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

          {/* Status Badge */}
          <div className="mb-3">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase border ${
                agentStatus === 'working'
                  ? 'bg-[#e0f5f0] text-[#1b4b41] border-[#76cdbe]'
                  : 'bg-[#fef3c7] text-[#92400e] border-[#fcd34d]'
              }`}
            >
              <CheckCircle2 size={13} />
              {agentStatus === 'working' ? 'Bekerja di Studio' : 'Santai di Roost Cafe'}
            </div>
          </div>

          {/* Skills Badges */}
          <div className="mb-4">
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

          {/* Action Dispatch Button */}
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
                <Palette size={15} /> Tugaskan Kerja ke Studio
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
