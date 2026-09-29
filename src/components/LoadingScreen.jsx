import React from 'react'
import { useProgress } from '@react-three/drei'

export default function LoadingScreen() {
  const { progress } = useProgress()

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#a2e8dd] font-sans select-none pointer-events-none transition-opacity duration-500">
      <div className="relative mb-6">
        <div className="text-6xl animate-bounce">
          🍃
        </div>
        <div className="w-10 h-2 bg-black/10 rounded-full mx-auto mt-2 blur-xs animate-pulse" />
      </div>

      <div className="bg-[#fef9e7] border-3 border-[#76cdbe] rounded-2xl px-6 py-4 shadow-[0_6px_0_#529d8f] text-center max-w-xs mx-4">
        <h3 className="text-sm font-black text-[#5c3a21] mb-1">
          Menyiapkan Pulau SecondBrain...
        </h3>
        <p className="text-[11px] text-[#8b5a2b] font-bold mb-3">
          Memuat model 3D & 17 warga pulau ({Math.round(progress)}%)
        </p>

        {/* Progress bar */}
        <div className="w-full bg-[#e8e4d9] rounded-full h-3 p-0.5 border border-[#d4a373]">
          <div
            className="bg-[#76cdbe] h-full rounded-full transition-all duration-300 shadow-inner"
            style={{ width: `${Math.max(5, progress)}%` }}
          />
        </div>
      </div>
    </div>
  )
}
