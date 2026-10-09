# 🏢 Virtual AI Office — SecondBrain 3D Command Center
> **Live Web HQ:** [https://jalansehat94.github.io/virtual-ai-office/](https://jalansehat94.github.io/virtual-ai-office/)  
> **Pemilik:** Heru Ardiansyah (`@jalansehat94` / GradiEnt Studio)  
> **Arsitek Sistem & Operator:** Ai (Chief Operator & Memory SecondBrain)  
> **Versi:** 2.0 (Hybrid Live Telemetry & Cloud Auto-Sync)

---

## 🌟 Arsitektur & Gambaran Umum
Virtual AI Office adalah markas komando 3D isometrik interaktif yang mencerminkan aktivitas seluruh staf AI di ekosistem SecondBrain Heru secara *real-time*. Agen-agen di kantor akan bekerja, mengetik di laptop, berpindah ke ruang rapat, atau istirahat di lounge sesuai dengan pekerjaan riil yang sedang dijalankan di Antigravity dan Codex.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   VIRTUAL AI OFFICE 3D COMMAND CENTER                  │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
           ┌─────────────────────────┴─────────────────────────┐
           ▼                                                   ▼
┌─────────────────────────┐                         ┌─────────────────────┐
│  Mode Lokal / Hybrid    │                         │  Mode Cloud 24/7    │
│  (Laptop Fisik Heru)    │                         │  (Mobile & Publik)  │
│  http://127.0.0.1:4848  │                         │  GitHub Pages CDN   │
│  PNA CORS · Latensi 0ms │                         │  Snapshot Tiap 60s  │
└─────────────────────────┘                         └─────────────────────┘
```

---

## 🚀 Fitur Unggulan

### 1. 🌐 Hybrid Telemetry (Direct Local Loopback + Cloud Fallback)
* **Private Network Access (PNA CORS):** Saat dibuka di laptop Heru melalui `https://jalansehat94.github.io/virtual-ai-office/`, halaman web secara otomatis menyapa daemon lokal di `http://127.0.0.1:4848/api/state` (latensi 0ms, refresh tiap 2 detik).
* **Badge Otomatis:**
  * `🟢 LAPTOP ONLINE · LIVE`: Laptop Heru aktif dan terhubung langsung ke Antigravity.
  * `💤 LAPTOP OFFLINE · ISTIRAHAT`: Laptop Heru sedang sleep/off, menampilkan snapshot cloud terakhir secara aman.
* **Toleransi Cloud:** Snapshot cloud memiliki toleransi hingga 15 menit (900 detik) untuk mengantisipasi jeda sinkronisasi GitHub Actions.

### 2. 🤖 Representasi & Pembagian Divisi Agen 3D
| Agen | Posisi / Divisi | Tugas Riil di SecondBrain |
| :--- | :--- | :--- |
| **Heru** | Principal & Founder | Pengarah arsitektur, kepemimpinan desain & keputusan strategis. |
| **Ai** | Chief Operator & PM | Asisten pribadi sahabat karib Heru, orkestrasi memori & sistem. |
| **Profesor LUNA** | Divisi 01 Akademik | Dosen pembimbing killer, telaah skripsi, simulasi daylighting, SNI. |
| **Kutu** | Staf Akademik | Validasi sitasi ganda & jurnal Scopus Q1. |
| **Crayon** | Staf Akademik | Plotting kurva lux 600 DPI & diagram alur metodologi. |
| **Kucing** | Staf Akademik | Sanitasi pola kalimat robotik (*Human Touch* khas Heru). |
| **Mata** | Staf Akademik | Ekstraksi & analisis video web / YouTube. |
| **Mochi** | Divisi 02 Web & Software | Senior Frontend, Headless CMS, Three.js & GradiEnt Studio web. |
| **Piksel** | Staf Web | Desain komponen Cult-UI & antarmuka taktil. |
| **Kunci** | Staf Web | Keamanan data, RLS & skema Supabase. |
| **Kaktus** | Divisi 03 BIM & Konstruksi | Revit 2027, Dynamo, evaluasi LOD 350, clash detection. |
| **Tabrak** | Staf BIM | Penyisiran benturan MEP vs struktur. |
| **Cuan** | Staf BIM | Quantity Takeoff (QTO) & estimasi biaya RAB AHSP. |
| **Mas Amba** | Divisi 04 Trading & Kuantitatif | Analisis teknikal, SMC, strategi probabilitas Crypto & Gold. |
| **Lilin** | Staf Trading | Pembacaan pola candlestick, FVG & Order Block. |
| **Bandar** | Staf Trading | Pemantauan on-chain, volume paus & kalender makro. |
| **Botik** | Staf Trading | Pengujian backtest strategi Python. |
| **Rem** | Staf Trading | Manajemen risiko ketat (1-2% risk per trade). |
| **Pixa** | Divisi 05 Infografis | Visualisasi data elegan, diagram Mermaid, palet GradiEnt. |

### 3. 🎮 Tombol Kendali Ruangan Interaktif (HUD Quick Actions)
Pengguna dapat mengarahkan agen secara massal melalui tombol cepat di antarmuka HUD:
* **📋 Rapat Semua (`meeting`):** Memanggil seluruh agen ke meja rapat lantai 2.
* **💻 Semua Kerja (`meja`):** Memerintahkan semua staf kembali bekerja di meja masing-masing.
* **🏠 Ke Studio (`rumah`):** Seluruh agen berkunjung santai ke Studio Heru & Ai di lantai 3.
* **🏋️ Olahraga (`gym`):** Sesi istirahat aktif di area gym & olahraga.
* **🎬 Demo Mode:** Memutar simulasi visual acak untuk keperluan demonstrasi/showcase.

---

## ⚙️ Komponen Sistem di Laptop (`D:\SecondBrain\00_system\`)
1. **`office_backend.py`:** Server telemetri mandiri (Port 4848) berbasis Python standard library (`http.server` + `ReusableHTTPServer`). Dilengkapi proteksi stream `None` pada Python 3.14 Windows dan thread auto-sync GitHub.
2. **`sync_github_office.py`:** Skrip sinkronisasi berkas telemetri `live_state.json` dan pembuat berkas `index.html` tunggal (*self-contained* 200KB).
3. **`build_office_page.py`:** Generator template halaman kantor 3D yang menggabungkan Three.js r128, OrbitControls, FontLoader, logika bot dynamic lifecycle, dan PNA connector.

---

## 🔒 Privasi & Keamanan (Zero-Data-Leak)
* Dokumen naskah skripsi pribadi, file `.env`, kredensial API, dan catatan rahasia di SecondBrain **TIDAK PERNAH** dikirim ke repositori publik.
* Telemetri publik hanya memuat metadata non-sensitif: nama agen, status bekerja/idle, durasi aktivitas, dan ringkasan pekerjaan umum.
