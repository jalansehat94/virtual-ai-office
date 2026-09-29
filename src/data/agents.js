export const AGENTS_DATA = {
  ai: {
    id: 'ai',
    name: '@Ai (PM)',
    species: 'bunny',
    role: 'Executive PM & Teman Masa Kecil Heru',
    deskPos: [0.0, 4.6, -15.5],
    pantryPos: [0.0, 0.6, 7.5],
    meetingPos: [-4.5, 4.6, -15.5],
    color: '#ffb7c5',
    sweater: '#ff6b8b',
    emoji: '🐰💖',
    bubbleIcon: '👑',
    bubbleText: 'Mengorkestrasi 17 Agen Pulau',
    skills: ['superadmin_access', 'autonomous_orchestrator', 'secondbrain_sync'],
    terminalLogs: [
      '$ secondbrain sync --all-divisions',
      '[OK] Master PROFILE.md loaded into memory',
      '[OK] Session 1 Physical Desktop Automation Active',
      '[INFO] 17 villagers synchronized across 4 divisions',
      '[HEARTBEAT] Cloud Telegram & WhatsApp gateway connected'
    ],
    deliverables: [
      { name: 'INDEX_SISTEM_SECONDBRAIN.docx', type: 'word', size: '245 KB', date: 'Hari ini' },
      { name: 'Roadmap_GradiEnt_Studio_2026.xlsx', type: 'excel', size: '1.2 MB', date: 'Kemarin' },
      { name: 'Laporan_Evaluasi_Sesi_Harian.pdf', type: 'pdf', size: '480 KB', date: 'Hari ini' }
    ]
  },
  
  // Divisi 01 Akademik (Far Left Wing)
  luna: {
    id: 'luna',
    name: '@Luna (Prof. LUNA)',
    species: 'owl_cat',
    role: 'Koordinator Riset Akademik & Skripsi',
    deskPos: [-10.0, 2.4, -7.5],
    pantryPos: [-7.0, 0.6, 8.5],
    meetingPos: [-4.5, 4.6, -15.5],
    bookshelfPos: [-12.0, 2.4, -9.5],
    color: '#9d71e8',
    sweater: '#6d28d9',
    emoji: '🦉🎓',
    bubbleIcon: '📚',
    bubbleText: 'Audit SNI 03-6197 & Scopus Q1',
    skills: ['luna-academic-grounding', 'heru-academic-voice'],
    terminalLogs: [
      '$ python luna_grounding.py --thesis "Bab_2_Mattoanging.docx"',
      '[PARSE] 42 sitasi terdeteksi di Daftar Pustaka',
      '[VERIFY] Al-Marwaee & Carter (2020) confirmed Scopus Q1',
      '[CHECK] SNI 03-6197 intensitas pencahayaan standar 350 lux [VALID]',
      '[OUTPUT] Evaluasi metodologi siap diserahkan ke Heru'
    ],
    deliverables: [
      { name: 'Skripsi_Bab_II_Mattoanging_Final.docx', type: 'word', size: '890 KB', date: 'Hari ini' },
      { name: 'Matriks_Validasi_Jurnal_Scopus.xlsx', type: 'excel', size: '340 KB', date: 'Kemarin' }
    ]
  },
  kutu: {
    id: 'kutu',
    name: '@Kutu',
    species: 'hedgehog',
    role: 'Peneliti Jurnal Scopus Q1 & Standar SNI',
    deskPos: [-6.5, 2.4, -7.5],
    pantryPos: [-8.5, 0.6, 8.5],
    bookshelfPos: [-5.0, 2.4, -9.5],
    color: '#c49b71',
    sweater: '#8b5a2b',
    emoji: '🦔📚',
    bubbleIcon: '🔍',
    bubbleText: 'Scraping DOAJ & ScienceDirect',
    skills: ['scopus-validator', 'literature-search'],
    terminalLogs: [
      '$ py-scholar search --doi 10.1016/j.buildenv.2023.109982',
      '[QUERY] Daylight performance in tropical stadium architecture',
      '[FETCH] 18 artikel relevan ditemukan dengan Q1 ranking',
      '[SAVED] Abstrak dan parameter lux disimpan ke 01_knowledge/resources/'
    ],
    deliverables: [
      { name: 'Daftar_Pustaka_Daur_Ulang_Ramping.docx', type: 'word', size: '120 KB', date: 'Hari ini' }
    ]
  },
  crayon: {
    id: 'crayon',
    name: '@Crayon',
    species: 'bear',
    role: 'Pelukis Grafik Ilmiah 600 DPI (GradiEnt Style)',
    deskPos: [-10.0, 2.4, -3.5],
    pantryPos: [-7.0, 0.6, 10.0],
    color: '#ffb347',
    sweater: '#ff7043',
    emoji: '🐻🎨',
    bubbleIcon: '📊',
    bubbleText: 'Plotting Kurva Lux 600 DPI',
    skills: ['scientific-figure-making', 'pixa-infographics'],
    terminalLogs: [
      '$ python render_lux_curve.py --dpi 600 --palette gradient_house',
      '[RENDER] Menggambar grafik intensitas pencahayaan alami vs buatan',
      '[COLOR] Hex #2a9d8f & #e76f51 diterapkan pada legend',
      '[EXPORT] Gambar vector SVG & PNG 600 DPI tersimpan rapi'
    ],
    deliverables: [
      { name: 'Kurva_Pencahayaan_Mattoanging_600DPI.png', type: 'image', size: '3.4 MB', date: 'Hari ini' },
      { name: 'Diagram_Alur_Metodologi_Skripsi.svg', type: 'image', size: '540 KB', date: 'Hari ini' }
    ]
  },
  kucing: {
    id: 'kucing',
    name: '@Kucing',
    species: 'cat',
    role: 'Penjaga Integritas Anti-Turnitin',
    deskPos: [-6.5, 2.4, -3.5],
    pantryPos: [-8.5, 0.6, 10.0],
    color: '#ffa07a',
    sweater: '#c084fc',
    emoji: '🐱🛡️',
    bubbleIcon: '✨',
    bubbleText: 'Human-Touch Polishing',
    skills: ['aigc-detector-rewriter', 'heru-academic-voice'],
    terminalLogs: [
      '$ python anti_turnitin_sanitizer.py --file "Bab_3_Metode.docx"',
      '[SCAN] Skor AI Writing Risk: 4.2% (Sangat Aman / Human Tone)',
      '[REWRITE] Mengganti frasa robotik dengan gaya berpikir Heru Unhas',
      '[SUCCESS] Paragraf mengalir alami dengan standar LUNA'
    ],
    deliverables: [
      { name: 'Laporan_Sanitasi_AI_Turnitin_0_Persen.pdf', type: 'pdf', size: '210 KB', date: 'Kemarin' }
    ]
  },
  mata: {
    id: 'mata',
    name: '@Mata',
    species: 'bird',
    role: 'Penonton Video YouTube & Transkrip Tutorial',
    deskPos: [-8.25, 2.4, 0.5],
    pantryPos: [-11.0, 0.6, 8.5],
    color: '#38bdf8',
    sweater: '#0284c7',
    emoji: '🐧🍿',
    bubbleIcon: '🎬',
    bubbleText: 'Transkrip Tutorial YouTube',
    skills: ['claude-video', 'watch'],
    terminalLogs: [
      '$ yt-dlp --write-sub --sub-lang id,en "https://youtube.com/watch?v=..."',
      '[EXTRACT] Audio diekstrak ke 16kHz WAV',
      '[WHISPER] Transkripsi model speech-to-text selesai (0.8s)',
      '[SUMMARIZE] Rangkuman langkah-langkah Revit Dynamo siap'
    ],
    deliverables: [
      { name: 'Ringkasan_Tutorial_Revit_Dynamo.docx', type: 'word', size: '180 KB', date: 'Kemarin' }
    ]
  },

  // Divisi 03 BIM & Konstruksi (Center-Left Wing)
  kaktus: {
    id: 'kaktus',
    name: '@Kaktus',
    species: 'cactus',
    role: 'BIM & AEC Engineering Lead',
    deskPos: [-2.5, 2.4, -7.5],
    pantryPos: [-3.0, 0.6, 7.5],
    meetingPos: [-4.5, 4.6, -15.5],
    color: '#4ade80',
    sweater: '#15803d',
    emoji: '🌵🏗️',
    bubbleIcon: '📐',
    bubbleText: 'Revit LOD 350 Inspection',
    skills: ['ddc-construction-suite', 'revit-bim-connector'],
    terminalLogs: [
      '$ pyrevit run audit_lod350 --model "Menara_Dynamo.rvt"',
      '[BIM] Autodesk Revit 2027 engine connected via Session 1',
      '[ISO19650] Klasifikasi elemen struktur beton tervalidasi',
      '[READY] Ekspor QTO volume beton dan bekisting siap'
    ],
    deliverables: [
      { name: 'Audit_BIM_LOD350_Menara_Dynamo.pdf', type: 'pdf', size: '4.8 MB', date: 'Kemarin' },
      { name: 'Model_Federasi_Struktur_MEP.ifc', type: 'cad', size: '48 MB', date: 'Kemarin' }
    ]
  },
  tabrak: {
    id: 'tabrak',
    name: '@Tabrak',
    species: 'bulldog',
    role: 'Tukang Razia Clash 3D Pipa vs Balok',
    deskPos: [-2.5, 2.4, -3.5],
    pantryPos: [-1.5, 0.6, 7.5],
    color: '#d7ccc8',
    sweater: '#f59e0b',
    emoji: '🐶💥',
    bubbleIcon: '⚠️',
    bubbleText: 'Zero-Clash Detection',
    skills: ['clash-detection', 'ifc-validator'],
    terminalLogs: [
      '$ ifc-clash --tolerance 5mm --source mep.ifc --target struct.ifc',
      '[SCAN] Memeriksa 4,210 titik persilangan pipa HVAC vs balok',
      '[RESULT] 0 Hard Clash, 2 Soft Clash (Clearance insulation safe)',
      '[STATUS] Bangunan lolos audit keselamatan struktur'
    ],
    deliverables: [
      { name: 'Laporan_Clash_Detection_Navisworks.pdf', type: 'pdf', size: '1.8 MB', date: 'Hari ini' }
    ]
  },
  cuan: {
    id: 'cuan',
    name: '@Cuan',
    species: 'cat_lucky',
    role: 'Estimator RAB & Volume QTO Makassar',
    deskPos: [-2.5, 2.4, 0.5],
    pantryPos: [-12.0, 0.6, 6.0],
    color: '#fffbeb',
    sweater: '#f59e0b',
    emoji: '🐱💰',
    bubbleIcon: '💵',
    bubbleText: 'Hitung RAB AHSP Makassar',
    skills: ['qto-estimator', 'rab-calculator'],
    terminalLogs: [
      '$ python calculate_rab.py --rates ahsp_makassar_2026.csv',
      '[EXTRACT] Volume beton bertulang: 3,420 m³',
      '[CALCULATE] Total estimasi biaya konstruksi: Rp 14.850.000.000',
      '[SHEET] Rekapitulasi Rencana Anggaran Biaya diekspor ke Excel'
    ],
    deliverables: [
      { name: 'RAB_Menara_Dynamo_Makassar_2026.xlsx', type: 'excel', size: '2.4 MB', date: 'Hari ini' },
      { name: 'Analisa_Harga_Satuan_AHSP_Makassar.xlsx', type: 'excel', size: '1.1 MB', date: 'Kemarin' }
    ]
  },

  // Divisi 04 Trading & Kuantitatif (Center-Right Wing)
  masamba: {
    id: 'masamba',
    name: '@MasAmba',
    species: 'wolf',
    role: 'Lead Quantitative Trader',
    deskPos: [2.5, 2.4, -7.5],
    pantryPos: [1.5, 0.6, 7.5],
    meetingPos: [-1.0, 4.6, -15.5],
    color: '#64748b',
    sweater: '#d97706',
    emoji: '🐺📈',
    bubbleIcon: '📊',
    bubbleText: 'SMC & Order Block Analysis',
    skills: ['algo-trading-quant', 'ml-best-practices'],
    terminalLogs: [
      '$ ccxt-cli fetch-ticker binance BTC/USDT',
      '[TICKER] BTC/USDT: $64,280 | 24h Vol: $32.4B',
      '[SMC] Bullish Order Block terdeteksi di level $63,800',
      '[SENTIMENT] Funding rate 0.008% (Netral-Akumulasi Sehat)',
      '[GUARDRAIL] Stop loss dikunci, risiko portofolio maksimal 1.5%'
    ],
    deliverables: [
      { name: 'Jurnal_Trading_Kuantitatif_Harian.xlsx', type: 'excel', size: '850 KB', date: 'Hari ini' },
      { name: 'Analisa_Makro_Crypto_Q3_2026.docx', type: 'word', size: '420 KB', date: 'Hari ini' }
    ]
  },
  lilin: {
    id: 'lilin',
    name: '@Lilin',
    species: 'red_panda',
    role: 'Chartist & SMC Specialist (FVG & Liquidity)',
    deskPos: [2.5, 2.4, -3.5],
    pantryPos: [3.0, 0.6, 7.5],
    color: '#c2410c',
    sweater: '#ea580c',
    emoji: '🐼🕯️',
    bubbleIcon: '🕯️',
    bubbleText: 'Scanning FVG & Likuiditas',
    skills: ['smart-money-concepts', 'order-blocks'],
    terminalLogs: [
      '$ python smc_scanner.py --timeframe H1,H4 --symbols BTC,ETH,SOL',
      '[SCAN] Fair Value Gap (FVG) H1 terisi 100%',
      '[SWEEP] Likuiditas sisi beli (BSL) berhasil disapu',
      '[SIGNAL] Setup probabilitas tinggi terkonfirmasi'
    ],
    deliverables: [
      { name: 'Peta_Likuiditas_Market_H4.png', type: 'image', size: '1.6 MB', date: 'Hari ini' }
    ]
  },
  bandar: {
    id: 'bandar',
    name: '@Bandar',
    species: 'bear_big',
    role: 'Whale Tracker & Sentiment Analyzer',
    deskPos: [2.5, 2.4, 0.5],
    pantryPos: [7.0, 0.6, 8.5],
    color: '#334155',
    sweater: '#1d4ed8',
    emoji: '🐻🐋',
    bubbleIcon: '🐋',
    bubbleText: 'Tracking Transaksi Paus',
    skills: ['whale-tracking', 'sentiment-analysis'],
    terminalLogs: [
      '$ onchain-radar stream --threshold 500BTC',
      '[ALERT] Transfer 1,200 BTC keluar dari Coinbase Pro ke Cold Wallet',
      '[INTERPRETATION] Akumulasi dingin institusional (Outflow)',
      '[METRIC] Net Exchange Flow 24h: -4,800 BTC (Bullish Divergence)'
    ],
    deliverables: [
      { name: 'Onchain_Whale_Flow_Report.pdf', type: 'pdf', size: '390 KB', date: 'Hari ini' }
    ]
  },

  // Divisi 02 Web & Software (Far Right Wing)
  mochi: {
    id: 'mochi',
    name: '@Mochi',
    species: 'puppy',
    role: 'Lead Architect GradiEnt Studio',
    deskPos: [6.5, 2.4, -7.5],
    pantryPos: [8.5, 0.6, 8.5],
    meetingPos: [2.5, 4.6, -15.5],
    color: '#fbbf24',
    sweater: '#0891b2',
    emoji: '🐕💻',
    bubbleIcon: '⚡',
    bubbleText: 'Fullstack React Three Fiber',
    skills: ['building-data-apps', 'typesafe-ai', 'jev-ai'],
    terminalLogs: [
      '$ vite build --mode production',
      '[VITE] Transforming 2093 modules...',
      '[R3F] Canvas WebGL renderer initialized successfully',
      '[SERVER] Supabase edge functions deployed'
    ],
    deliverables: [
      { name: 'Arsitektur_GradiEnt_Web_V3.docx', type: 'word', size: '640 KB', date: 'Hari ini' },
      { name: 'Schema_Database_Supabase_Production.sql', type: 'code', size: '45 KB', date: 'Kemarin' }
    ]
  },
  piksel: {
    id: 'piksel',
    name: '@Piksel',
    species: 'raccoon',
    role: 'Spesialis UI/UX Tailwind (Nook Style)',
    deskPos: [10.0, 2.4, -7.5],
    pantryPos: [11.0, 0.6, 8.5],
    color: '#78716c',
    sweater: '#0d9488',
    emoji: '🦝✨',
    bubbleIcon: '🎨',
    bubbleText: 'Tailwind CSS Layouting',
    skills: ['cult-ui', 'fast-gui-orchestrator'],
    terminalLogs: [
      '$ npx tailwindcss -i ./src/index.css -o ./dist/output.css --minify',
      '[TAILWIND] 126 utility classes generated',
      '[DESIGN] Animal Crossing pastel palette hex verified',
      '[MOBILE] Touch-friendly responsive layout active'
    ],
    deliverables: [
      { name: 'Design_System_GradiEnt_NookUI.pdf', type: 'pdf', size: '2.1 MB', date: 'Hari ini' }
    ]
  },
  kunci: {
    id: 'kunci',
    name: '@Kunci',
    species: 'badger',
    role: 'DBA Supabase PostgreSQL & RLS Security',
    deskPos: [6.5, 2.4, -3.5],
    pantryPos: [7.0, 0.6, 10.0],
    color: '#64748b',
    sweater: '#334155',
    emoji: '🦡🔑',
    bubbleIcon: '🔒',
    bubbleText: 'Mengunci RLS & Query SQL',
    skills: ['supabase-integration', 'sql-optimization'],
    terminalLogs: [
      '$ psql -h db.supabase.co -U postgres -d postgres -f security.sql',
      '[RLS] Row Level Security enabled for user_id = auth.uid()',
      '[INDEX] B-tree index created on session_archives(timestamp)',
      '[SECURE] Zero leak guarantee active'
    ],
    deliverables: [
      { name: 'Audit_Keamanan_Database_RLS.xlsx', type: 'excel', size: '190 KB', date: 'Kemarin' }
    ]
  },
  botik: {
    id: 'botik',
    name: '@Botik',
    species: 'robo_pup',
    role: 'Algo & Python Backtest Engine',
    deskPos: [10.0, 2.4, -3.5],
    pantryPos: [8.5, 0.6, 10.0],
    color: '#84cc16',
    sweater: '#4d7c0f',
    emoji: '🐶⚡',
    bubbleIcon: '💻',
    bubbleText: 'Backtest Sharpe 2.14',
    skills: ['backtest-engine', 'risk-parity'],
    terminalLogs: [
      '$ python backtest_engine.py --strategy SMC_Breakout --years 5',
      '[SIMULATE] 1,482 transaksi historis diproses',
      '[STATS] Win Rate: 63.8% | Sharpe: 2.14 | Max DD: 6.4%',
      '[PASSED] Parameter strategi siap untuk live-paper-trade'
    ],
    deliverables: [
      { name: 'Hasil_Backtest_Python_5_Tahun.xlsx', type: 'excel', size: '4.2 MB', date: 'Kemarin' },
      { name: 'Script_Algo_Trading_Binance.py', type: 'code', size: '32 KB', date: 'Kemarin' }
    ]
  },
  rem: {
    id: 'rem',
    name: '@Rem',
    species: 'turtle',
    role: 'Chief Risk Officer (Batas Lot 1-2%)',
    deskPos: [8.25, 2.4, 0.5],
    pantryPos: [12.0, 0.6, 6.0],
    color: '#14b8a6',
    sweater: '#dc2626',
    emoji: '🐢🛑',
    bubbleIcon: '🛡️',
    bubbleText: 'Kunci Batas Risiko 1.5%',
    skills: ['risk-management', 'position-sizer'],
    terminalLogs: [
      '$ risk-guard calculate --equity 50000 --risk-pct 1.5 --stop 450',
      '[CALC] Ukuran posisi maksimal: 1.66 kontrak',
      '[GUARD] Margin call prevention buffer: 94.2%',
      '[APPROVED] Eksekusi order diperbolehkan dengan batas risiko ketat'
    ],
    deliverables: [
      { name: 'Kalkulator_Ukuran_Lot_Anti_MC.xlsx', type: 'excel', size: '310 KB', date: 'Hari ini' }
    ]
  }
}
