import React from 'react'
import { Sparkles, RefreshCw } from 'lucide-react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('SecondBrain Island Error Boundary caught an error:', error, errorInfo)
  }

  handleReload = () => {
    sessionStorage.clear()
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-screen h-screen flex items-center justify-center bg-[#a2e8dd] p-4 font-sans select-none">
          <div className="w-full max-w-md bg-[#fef9e7] border-4 border-[#76cdbe] rounded-3xl p-6 shadow-[0_12px_0_#529d8f,0_20px_25px_-5px_rgba(0,0,0,0.1)] text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#e0f5f0] border-2 border-[#76cdbe] flex items-center justify-center text-3xl shadow-sm">
              🍃
            </div>
            
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#76cdbe] text-[#1b4b41] text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles size={14} /> SecondBrain Island Rescue
            </div>

            <h2 className="text-xl font-black text-[#5c3a21] mb-2">
              Ups, Pulau Sedang Merestart!
            </h2>
            
            <p className="text-xs text-[#8b5a2b] font-medium mb-4 leading-relaxed">
              Sistem visual mendeteksi gangguan rendering ringan. Klik tombol di bawah untuk memuat ulang pulau Heru secara bersih.
            </p>

            <button
              onClick={this.handleReload}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-[#76cdbe] hover:bg-[#5dbfae] active:translate-y-1 text-[#1b4b41] font-black text-sm border-2 border-[#3f9e8e] shadow-[0_4px_0_#2e8072] transition-all"
            >
              <RefreshCw size={16} /> Muat Ulang Pulau
            </button>

            <div className="mt-4 text-[10px] text-[#a98467] font-semibold">
              Otomasi Session 1 • GradiEnt Studio & SecondBrain
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
