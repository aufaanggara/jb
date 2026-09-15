# Product Requirements Document (PRD)
# Rekberin — Platform Rekber Jual-Beli Akun eFootball

> **Versi:** 1.0
> **Tanggal:** 14 September 2026
> **Status:** Draft untuk Review
> **Author:** Tim Product & Engineering
> **Stakeholders:** Developer, Designer, Business Owner

---

## 1. Executive Summary

**Rekberin** adalah platform web **end-to-end** yang menjembatani transaksi jual-beli akun game **eFootball** secara aman melalui mekanisme **rekber (rekening bersama)**. Platform ini hadir untuk menyelesaikan masalah penipuan dalam jual-beli akun game yang selama ini menjadi kekhawatiran utama komunitas gaming Indonesia.

Platform menghubungkan tiga pihak utama: **Pembeli**, **Penjual**, dan **Admin Rekber (Trusted Middleman)** — dengan sistem monitoring transaksi real-time, chat terenkripsi, sistem reputasi/trust score, dan manajemen dispute terintegrasi.

### Visi
> *"Jual-beli akun game, aman, transparan, dan terpercaya — tanpa rasa takup di-scam."*

### Misi
- Membangun ekosistem transaksi akun game yang **aman dan terverifikasi**
- Memberikan pengalaman pengguna **premium dan modern** berbasis web
- Menjadi **platform rekber nomor satu** untuk komunitas eFootball Indonesia

---

## 2. Product Scope

### Dalam Scope (In Scope)

| Fitur | Keterangan |
|-------|-----------|
| Autentikasi & Otorisasi | Register/Login multi-role (User, Admin, Super Admin) |
| Direktori Admin Rekber | Daftar admin terverifikasi dengan trust score, fee, jam aktif |
| Marketplace Listing | CRUD listing akun eFootball dengan upload gambar |
| Sistem Transaksi | Alur transaksi 7 tahap dari pembayaran hingga selesai |
| In-transaction Chat | Obrolan real-time antar pihak dalam satu transaksi |
| Sistem Review & Rating | Review mutual buyer-seller-admin pasca transaksi |
| Dashboard Multi-role | Dashboard terpisah untuk Buyer, Seller, Admin |
| Dispute Management | Mekanisme sengketa dengan eskalasi ke Super Admin |
| Upload Bukti | Upload bukti pembayaran/handover via UploadThing |
| Notifikasi Toast | Notifikasi in-app real-time |
| Landing Page Premium | Hero dengan Three.js particles, animasi GSAP |
| SEO & PWA | Meta tags, manifest, offline page |

### Luar Scope (Out of Scope — Phase 1)

- Payment gateway terintegrasi (manual transfer saat ini)
- Mobile Native App (iOS/Android)
- Support multi-game (selain eFootball)
- Sistem affiliate/referral
- API publik untuk third-party
- Live streaming verifikasi akun

---

## 3. Customer Segments

### Segment 1: Pembeli Akun (Buyer)
**Profil:**
- Gamer aktif eFootball usia 15–30 tahun
- Ingin membeli akun dengan rating/player tertentu tanpa grind dari awal
- Pernah atau khawatir mengalami penipuan di forum/grup WhatsApp

**Pain Points:**
- Tidak tahu penjual terpercaya atau tidak
- Tidak ada jaminan setelah transfer uang
- Proses handover akun tidak terdokumentasi

**Jobs to be Done:**
- Temukan listing akun sesuai budget & spesifikasi
- Bayar dengan aman via rekber terpercaya
- Konfirmasi penerimaan akun dan beri review

---

### Segment 2: Penjual Akun (Seller)
**Profil:**
- Pemain eFootball yang ingin monetisasi akun
- Bisa individu atau "seller semi-profesional" yang aktif jual-beli akun

**Pain Points:**
- Pembeli tidak mau bayar dulu (takut ditipu penjual)
- Tidak ada platform resmi khusus eFootball Indonesia
- Reputasi sulit dibangun tanpa rekam jejak tertulis

**Jobs to be Done:**
- Buat listing akun dengan deskripsi & screenshot detail
- Terima pembayaran terjamin melalui admin rekber
- Serahkan akun hanya setelah dana aman di rekber

---

### Segment 3: Admin Rekber (Trusted Middleman)
**Profil:**
- Individu berreputasi tinggi di komunitas gaming
- Berpengalaman sebagai perantara transaksi akun game
- Memiliki rekening bank aktif untuk menampung dana

> **Catatan Brainstorming (Legal — Penting):** Model di mana admin menampung dana pembeli langsung ke rekening bank pribadi mereka masuk kategori jasa transfer dana/pembayaran yang diawasi **Bank Indonesia**, dan idealnya membutuhkan izin sebagai **Penyelenggara Jasa Pembayaran (PJP)**. Karena admin-admin di platform ini kemungkinan besar **belum berizin resmi** (hanya mengandalkan reputasi & track record di komunitas), disarankan platform bersikap transparan bahwa admin bukan lembaga berizin PJP, dan ke depannya mempertimbangkan integrasi **payment gateway berizin** (Midtrans/Xendit dengan fitur escrow) alih-alih dana masuk langsung ke rekening pribadi admin. Detail lengkap ada di dokumen terpisah "Legalitas & Etika Jual-Beli Akun Game".

**Pain Points:**
- Manajemen transaksi manual via chat WA berantakan
- Tidak ada sistem terpusat untuk tracking transaksi
- Sulit membangun portofolio/reputasi yang terverifikasi

**Jobs to be Done:**
- Kelola multiple transaksi dalam satu dashboard
- Terima dan verifikasi pembayaran secara terstruktur
- Proses handover akun dengan checklist terdokumentasi

---

### Segment 4: Super Admin (Platform Operator)
**Profil:**
- Tim internal Rekberin
- Bertanggung jawab atas kualitas admin rekber dan penyelesaian dispute

**Jobs to be Done:**
- Monitor seluruh aktivitas platform
- Verifikasi dan kelola akun admin rekber
- Selesaikan dispute yang tidak bisa diselesaikan admin biasa

---

## 4. Functional Requirements (FR)

### FR-01: Autentikasi & Manajemen Akun

| ID | Requirement | Priority |
|----|------------|----------|
| FR-01.1 | User dapat melakukan registrasi dengan email, username, nama lengkap, dan nomor WhatsApp | P0 |
| FR-01.2 | User dapat login menggunakan email dan password (NextAuth) | P0 |
| FR-01.3 | Sistem mendukung 3 role: USER, ADMIN, SUPER_ADMIN | P0 |
| FR-01.4 | Session management dengan JWT/cookie aman | P0 |
| FR-01.5 | User dapat melihat dan mengedit profil mereka | P1 |
| FR-01.6 | Super Admin dapat mengangkat/menurunkan role Admin | P1 |

> **Catatan Brainstorming:** Sempat dibahas apakah email+password ini wajib untuk semua pihak. Kesimpulan diskusi: **Buyer sebaiknya tidak perlu akun sama sekali** di fase MVP (cukup browse + kontak admin). **Seller** cukup diverifikasi ringan lewat **OTP nomor WhatsApp** (tanpa password) untuk mengurangi risiko penyimpanan data sensitif dan kompleksitas sistem lupa password. Email+password (FR-01.1–FR-01.2) tetap relevan khusus untuk **Admin Rekber & Super Admin**, karena mereka mengakses dashboard berisi data transaksi — sebaiknya pakai layanan auth siap pakai (Supabase Auth/Firebase Auth) daripada membangun sistem sendiri. Ini perlu diputuskan tim sebelum masuk Sprint 2.

---

### FR-02: Direktori Admin Rekber

| ID | Requirement | Priority |
|----|------------|----------|
| FR-02.1 | Halaman direktori menampilkan semua admin aktif | P0 |
| FR-02.2 | Setiap admin card menampilkan nama, trust score, fee, jam aktif, total sukses | P0 |
| FR-02.3 | Filter admin berdasarkan fee (slider), rating, dan status aktif/nonaktif | P1 |
| FR-02.4 | Trust Score Ring (SVG animated) menampilkan persentase kepercayaan | P1 |
| FR-02.5 | User dapat melihat profil detail admin (bio, bank account, histori) | P1 |
| FR-02.6 | Badge Crown untuk top 3 admin dengan performa terbaik | P2 |

> **Catatan Brainstorming:** FR-02.2 & FR-02.3 saat ini menampilkan **fee admin secara terbuka** dengan filter slider. Dari diskusi, ini berisiko memicu **perang harga & persaingan tidak sehat antar admin** yang sudah lama membangun kebiasaan sendiri di luar platform. Alternatif yang dibahas: **sembunyikan fee dari tampilan publik** (fee dinegosiasikan langsung admin-buyer via chat, seperti kebiasaan mereka selama ini), dan direktori hanya menonjolkan **trust score, jumlah transaksi sukses, dan status aktif/tidak aktif**. Selain itu dibahas juga **sistem rotasi/antrian otomatis** (mirip status "online" WhatsApp, bukan real-time matching ala ojek online) untuk mendistribusikan transaksi secara adil antar admin yang sedang aktif, alih-alih buyer memilih admin secara manual dari daftar terbuka. Ini keputusan strategis yang perlu didiskusikan ulang dengan tim sebelum FR-02.3 dikerjakan.

---

### FR-03: Marketplace Listing

| ID | Requirement | Priority |
|----|------------|----------|
| FR-03.1 | Seller dapat membuat listing akun eFootball dengan: judul, harga, deskripsi, detail stats, gambar | P0 |
| FR-03.2 | Upload multiple gambar screenshot akun via UploadThing | P0 |
| FR-03.3 | Listing memiliki status: AVAILABLE, IN_TRANSACTION, SOLD, INACTIVE | P0 |
| FR-03.4 | Explorer listing dengan filter: harga, status, game | P0 |
| FR-03.5 | Listing detail page dengan informasi lengkap dan tombol "Beli via Rekber" | P0 |
| FR-03.6 | Listing otomatis berubah status IN_TRANSACTION saat ada transaksi aktif | P0 |
| FR-03.7 | Seller dapat menonaktifkan (INACTIVE) atau menandai SOLD listing mereka | P1 |
| FR-03.8 | Listing Featured (diprioritaskan tampil di halaman utama) | P2 |
| FR-03.9 | Share listing ke media sosial (copy link) | P2 |

---

### FR-04: Sistem Transaksi (Core Flow)

| ID | Requirement | Priority |
|----|------------|----------|
| FR-04.1 | Buyer memilih listing dan admin rekber, lalu membuat transaksi | P0 |
| FR-04.2 | Alur transaksi 7 tahap: `PENDING_PAYMENT → PAYMENT_CONFIRMED → IN_HANDOVER → PENDING_BUYER_CONFIRM → COMPLETED` | P0 |
| FR-04.3 | Admin dapat mengkonfirmasi pembayaran masuk dari buyer | P0 |
| FR-04.4 | Admin dapat menandai proses handover akun dimulai | P0 |
| FR-04.5 | Buyer dapat mengkonfirmasi akun berhasil diterima (trigger COMPLETED) | P0 |
| FR-04.6 | Buyer dapat membuka dispute (status → DISPUTED) | P0 |
| FR-04.7 | Admin atau Super Admin dapat membatalkan transaksi (CANCELLED) | P0 |
| FR-04.8 | Logs aktivitas transaksi tersimpan otomatis (timeline event) | P1 |
| FR-04.9 | Checklist handover terdokumentasi (email akun, password, 2FA, dll) | P1 |
| FR-04.10 | Kalkulasi otomatis: harga + platform fee (Rp 500) + admin fee | P1 |
| FR-04.11 | Upload bukti pembayaran (screenshot transfer) | P1 |

---

### FR-05: In-Transaction Chat

| ID | Requirement | Priority |
|----|------------|----------|
| FR-05.1 | Chat room per transaksi untuk 3 pihak: buyer, seller, admin | P0 |
| FR-05.2 | Pesan tampil secara real-time (polling atau WebSocket) | P0 |
| FR-05.3 | Riwayat pesan tersimpan di database | P1 |
| FR-05.4 | Indikator pengirim (nama + role badge) pada setiap pesan | P1 |
| FR-05.5 | Chat hanya aktif saat transaksi belum COMPLETED/CANCELLED | P1 |

---

### FR-06: Sistem Review & Rating

| ID | Requirement | Priority |
|----|------------|----------|
| FR-06.1 | Pasca transaksi COMPLETED, buyer dapat memberikan review ke seller dan admin | P0 |
| FR-06.2 | Review mencakup rating bintang (1–5) dan komentar opsional | P0 |
| FR-06.3 | Trust Score admin terhitung otomatis dari rata-rata review | P1 |
| FR-06.4 | Histori review tampil di profil admin | P1 |

---

### FR-07: Dashboard Multi-Role

#### 7a. Dashboard Buyer
| ID | Requirement | Priority |
|----|------------|----------|
| FR-07a.1 | Daftar semua transaksi buyer beserta status | P0 |
| FR-07a.2 | Halaman detail transaksi dengan timeline, chat, dan action button | P0 |
| FR-07a.3 | Tombol konfirmasi penerimaan akun | P0 |
| FR-07a.4 | Tombol buka dispute | P1 |

#### 7b. Dashboard Seller
| ID | Requirement | Priority |
|----|------------|----------|
| FR-07b.1 | Daftar semua listing milik seller | P0 |
| FR-07b.2 | Daftar transaksi terkait listing seller | P0 |
| FR-07b.3 | Account Vault Panel: kelola akun game yang akan dijual | P1 |

#### 7c. Dashboard Admin
| ID | Requirement | Priority |
|----|------------|----------|
| FR-07c.1 | Daftar semua transaksi yang ditangani admin | P0 |
| FR-07c.2 | Tombol: konfirmasi pembayaran, mulai handover, selesaikan, batalkan | P0 |
| FR-07c.3 | Statistik: total transaksi, total pendapatan fee, dispute count | P1 |
| FR-07c.4 | Kelola rekening bank untuk informasi pembayaran | P1 |

---

### FR-08: Dispute Management

| ID | Requirement | Priority |
|----|------------|----------|
| FR-08.1 | Buyer dapat membuka dispute dengan alasan tertulis | P0 |
| FR-08.2 | Status transaksi berubah ke DISPUTED, semua pihak dinotifikasi | P0 |
| FR-08.3 | Super Admin dapat meresolve dispute: release dana ke seller atau refund ke buyer | P1 |
| FR-08.4 | Log semua aktivitas dispute tersimpan | P1 |

---

## 5. Non-Functional Requirements (NFR)

### NFR-01: Performa

| ID | Requirement | Target |
|----|------------|--------|
| NFR-01.1 | First Contentful Paint (FCP) | < 1.5 detik |
| NFR-01.2 | Time to Interactive (TTI) | < 3 detik |
| NFR-01.3 | Lighthouse Performance Score | ≥ 85 |
| NFR-01.4 | API response time (95th percentile) | < 500ms |
| NFR-01.5 | Three.js scene tidak memblokir main thread | Menggunakan `next/dynamic` + `ssr: false` |

### NFR-02: Keamanan

| ID | Requirement | Keterangan |
|----|------------|-----------|
| NFR-02.1 | Semua endpoint API dilindungi autentikasi NextAuth | JWT session |
| NFR-02.2 | Role-based access control (RBAC) di setiap route | Middleware Next.js |
| NFR-02.3 | Input validasi menggunakan Zod schema | Server-side validation |
| NFR-02.4 | Proteksi CSRF via NextAuth | Built-in |
| NFR-02.5 | Data sensitif (password, token) tidak tersimpan plain text | Supabase Auth hashing |
| NFR-02.6 | File upload dibatasi ukuran dan tipe via UploadThing | Max 10MB, image only |

> **Catatan Brainstorming (Privasi):** Untuk in-transaction chat (FR-05), disepakati agar pesan **terenkripsi saat tersimpan di database** (bukan hanya HTTPS saat transit), dan akses chat dibatasi hanya untuk pihak yang terlibat dalam transaksi tersebut (role-based access, bukan admin lain bisa lihat semua chat). Detail finansial (nomor rekening, dsb) sebaiknya tidak disimpan sebagai data mentah di database sendiri — idealnya diserahkan ke payment gateway pihak ketiga yang sudah punya standar keamanan (PCI-DSS). Prinsip data minimization: hanya kumpulkan data yang benar-benar dipakai (relevan dengan UU PDP).

### NFR-03: Skalabilitas

| ID | Requirement | Keterangan |
|----|------------|-----------|
| NFR-03.1 | Database di-host di Supabase (managed PostgreSQL) | Auto-scaling |
| NFR-03.2 | Static assets di-serve via CDN | Next.js Image + Vercel Edge |
| NFR-03.3 | Query database menggunakan Prisma dengan indexing yang tepat | Performance query |
| NFR-03.4 | Mendukung ≥ 500 concurrent users tanpa degradasi signifikan | Load testing Phase 2 |

### NFR-04: Ketersediaan & Reliabilitas

| ID | Requirement | Target |
|----|------------|--------|
| NFR-04.1 | Uptime platform | ≥ 99.5% |
| NFR-04.2 | Database backup otomatis | Daily (Supabase built-in) |
| NFR-04.3 | Halaman offline tersedia saat jaringan putus (PWA) | `/offline` page |
| NFR-04.4 | Graceful error handling di semua komponen | Error boundary + toast |

### NFR-05: Usability & Aksesibilitas

| ID | Requirement | Keterangan |
|----|------------|-----------|
| NFR-05.1 | Desain responsif (Mobile-first) | Breakpoints: 375px, 768px, 1280px |
| NFR-05.2 | Kontras warna memenuhi WCAG AA | ≥ 4.5:1 ratio |
| NFR-05.3 | Keyboard navigasi penuh untuk elemen interaktif | Radix UI accessibility |
| NFR-05.4 | Loading state dan skeleton di semua data fetching | UX consistency |
| NFR-05.5 | Toast notifikasi yang informatif untuk setiap aksi penting | Sonner library |

### NFR-06: Maintainability

| ID | Requirement | Keterangan |
|----|------------|-----------|
| NFR-06.1 | TypeScript strict mode aktif | Zero `any` types |
| NFR-06.2 | Komponen terstruktur modular (feature-based) | Reusable components |
| NFR-06.3 | Semua env variable terdokumentasi di `.env.example` | Developer onboarding |
| NFR-06.4 | Prisma schema sebagai single source of truth | Database versioning |

---

## 6. Arsitektur Teknis

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT (Browser)                        │
│  Next.js 14 App Router · React 18 · TypeScript              │
│  TailwindCSS · Framer Motion · GSAP · Three.js · Lenis      │
├──────────────────────────┬──────────────────────────────────┤
│    Pages/Routes          │    State Management              │
│  /             Landing   │  Zustand (global UI state)       │
│  /rekber       Directory │  TanStack Query (server state)   │
│  /listings     Marketplace│  React Hook Form (forms)        │
│  /buyer        Dashboard │  Zod (validation)                │
│  /seller       Dashboard │                                  │
│  /admin        Dashboard │                                  │
├──────────────────────────┴──────────────────────────────────┤
│                     API Layer (Next.js API Routes)           │
│  /api/auth    → NextAuth.js (JWT Session)                   │
│  /api/listings → CRUD Listings                              │
│  /api/transactions → Transaction Lifecycle                  │
│  /api/uploadthing → File Upload Handler                     │
├─────────────────────────────────────────────────────────────┤
│                     Database Layer                           │
│  Supabase (PostgreSQL) ← Prisma ORM                        │
│  Models: User, AdminProfile, Listing, Transaction,          │
│          Review, ChatMessage                                 │
├─────────────────────────────────────────────────────────────┤
│                     External Services                        │
│  Supabase Auth · UploadThing CDN · Vercel Hosting           │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. Product Backlog

### Epic 1: Autentikasi & Onboarding
| Story ID | User Story | Story Points | Priority |
|----------|-----------|-------------|----------|
| US-001 | Sebagai user baru, saya ingin mendaftar dengan email & password agar bisa mengakses platform | 5 | P0 |
| US-002 | Sebagai user, saya ingin login dengan email agar bisa masuk ke akun saya | 3 | P0 |
| US-003 | Sebagai user, saya ingin melihat dan mengedit profil saya | 3 | P1 |
| US-004 | Sebagai Super Admin, saya ingin mengangkat user menjadi admin rekber | 5 | P1 |
| US-005 | Sebagai user, saya ingin melihat halaman landing yang menarik untuk memahami layanan | 8 | P0 |

### Epic 2: Direktori Admin Rekber
| Story ID | User Story | Story Points | Priority |
|----------|-----------|-------------|----------|
| US-006 | Sebagai buyer, saya ingin melihat daftar semua admin rekber beserta profil mereka | 5 | P0 |
| US-007 | Sebagai buyer, saya ingin filter admin berdasarkan fee dan rating | 5 | P1 |
| US-008 | Sebagai buyer, saya ingin melihat trust score admin dalam bentuk visual | 3 | P1 |
| US-009 | Sebagai buyer, saya ingin melihat badge crown untuk top admin | 2 | P2 |

### Epic 3: Marketplace & Listing
| Story ID | User Story | Story Points | Priority |
|----------|-----------|-------------|----------|
| US-010 | Sebagai seller, saya ingin membuat listing akun eFootball dengan detail lengkap | 8 | P0 |
| US-011 | Sebagai seller, saya ingin upload multiple screenshot akun saya | 5 | P0 |
| US-012 | Sebagai buyer, saya ingin browse semua listing yang tersedia | 5 | P0 |
| US-013 | Sebagai buyer, saya ingin filter listing berdasarkan harga dan status | 5 | P1 |
| US-014 | Sebagai buyer, saya ingin melihat detail lengkap sebuah listing | 3 | P0 |
| US-015 | Sebagai seller, saya ingin mengelola (edit/nonaktifkan) listing saya | 5 | P1 |
| US-016 | Sebagai siapapun, saya ingin share listing ke media sosial | 2 | P2 |

### Epic 4: Sistem Transaksi
| Story ID | User Story | Story Points | Priority |
|----------|-----------|-------------|----------|
| US-017 | Sebagai buyer, saya ingin memilih admin rekber dan memulai transaksi | 8 | P0 |
| US-018 | Sebagai buyer, saya ingin upload bukti pembayaran ke sistem | 5 | P0 |
| US-019 | Sebagai admin, saya ingin konfirmasi pembayaran dari buyer | 5 | P0 |
| US-020 | Sebagai admin, saya ingin memulai proses handover akun | 5 | P0 |
| US-021 | Sebagai buyer, saya ingin konfirmasi bahwa akun telah berhasil saya terima | 3 | P0 |
| US-022 | Sebagai buyer, saya ingin membuka dispute jika ada masalah | 5 | P0 |
| US-023 | Sebagai Super Admin, saya ingin meresolve dispute | 8 | P1 |
| US-024 | Sebagai semua pihak, saya ingin melihat timeline lengkap transaksi | 3 | P1 |
| US-025 | Sebagai admin, saya ingin melihat checklist handover terstruktur | 5 | P1 |

### Epic 5: In-Transaction Chat
| Story ID | User Story | Story Points | Priority |
|----------|-----------|-------------|----------|
| US-026 | Sebagai pihak transaksi, saya ingin chat real-time dengan semua pihak terlibat | 8 | P0 |
| US-027 | Sebagai pihak transaksi, saya ingin melihat riwayat chat transaksi | 3 | P1 |

### Epic 6: Review & Rating
| Story ID | User Story | Story Points | Priority |
|----------|-----------|-------------|----------|
| US-028 | Sebagai buyer, saya ingin memberi review ke seller dan admin pasca transaksi | 5 | P0 |
| US-029 | Sebagai admin, saya ingin trust score saya terupdate otomatis dari review | 5 | P1 |
| US-030 | Sebagai semua user, saya ingin melihat histori review di profil admin | 3 | P1 |

### Epic 7: Dashboard & Analytics
| Story ID | User Story | Story Points | Priority |
|----------|-----------|-------------|----------|
| US-031 | Sebagai buyer, saya ingin dashboard dengan semua transaksi saya | 5 | P0 |
| US-032 | Sebagai seller, saya ingin dashboard dengan listing dan transaksi saya | 5 | P0 |
| US-033 | Sebagai admin, saya ingin dashboard manajemen transaksi yang saya tangani | 8 | P0 |
| US-034 | Sebagai admin, saya ingin melihat statistik pendapatan fee saya | 5 | P1 |
| US-035 | Sebagai seller, saya ingin Account Vault untuk menyimpan data akun | 8 | P1 |

### Epic 8: Infrastruktur & DevOps
| Story ID | User Story | Story Points | Priority |
|----------|-----------|-------------|----------|
| US-036 | Setup Supabase + Prisma + NextAuth terintegrasi penuh | 8 | P0 |
| US-037 | Setup UploadThing untuk file storage | 3 | P0 |
| US-038 | Deploy ke Vercel dengan CI/CD | 5 | P1 |
| US-039 | Setup PWA manifest + offline page | 3 | P2 |
| US-040 | Performance optimization (Lighthouse ≥ 85) | 5 | P2 |

---

## 8. Scrum-ban Board

### Metodologi
- **Sprint Duration:** 2 minggu per sprint
- **Team Size:** 4 developer (Frontend & UI/UX, Backend & Database, Payment & Transaksi, Chat/Trust & Notifikasi) — lihat Section 16 untuk detail pembagian klaster
- **Ceremonies:** Sprint Planning (Senin), Daily Standup, Sprint Review + Retro (Jumat akhir sprint)
- **WIP Limit:** Max 3 item per kolom (Scrum-ban hybrid)

---

### BACKLOG (Prioritized)

```
┌──────────────────────────────────────────────────────────────┐
│   PRODUCT BACKLOG                                          │
├──────────────────────────────────────────────────────────────┤
│   P0 (Must Have)                                          │
│  ├── US-001: Registrasi User                     [5 pts]    │
│  ├── US-002: Login User                          [3 pts]    │
│  ├── US-005: Landing Page Premium                [8 pts]    │
│  ├── US-006: Direktori Admin                     [5 pts]    │
│  ├── US-010: Create Listing                      [8 pts]    │
│  ├── US-011: Upload Screenshot                   [5 pts]    │
│  ├── US-012: Browse Listings                     [5 pts]    │
│  ├── US-014: Listing Detail                      [3 pts]    │
│  ├── US-017: Mulai Transaksi                     [8 pts]    │
│  ├── US-018: Upload Bukti Bayar                  [5 pts]    │
│  ├── US-019: Admin Konfirmasi Bayar              [5 pts]    │
│  ├── US-020: Admin Mulai Handover                [5 pts]    │
│  ├── US-021: Buyer Konfirmasi Terima             [3 pts]    │
│  ├── US-022: Buka Dispute                        [5 pts]    │
│  ├── US-026: In-Transaction Chat                 [8 pts]    │
│  ├── US-028: Review Pasca Transaksi              [5 pts]    │
│  ├── US-031: Dashboard Buyer                     [5 pts]    │
│  ├── US-032: Dashboard Seller                    [5 pts]    │
│  ├── US-033: Dashboard Admin                     [8 pts]    │
│  └── US-036: Setup Infrastructure               [8 pts]    │
│                                                              │
│   P1 (Should Have)                                        │
│  ├── US-003, US-004, US-007, US-008, US-013                 │
│  ├── US-015, US-023, US-024, US-025, US-027                 │
│  ├── US-029, US-030, US-034, US-035, US-038                 │
│  └── US-037                                                  │
│                                                              │
│   P2 (Nice to Have)                                       │
│  └── US-009, US-016, US-039, US-040                         │
└──────────────────────────────────────────────────────────────┘
```

---

### Sprint Board

```
┌─────────────┬─────────────┬─────────────┬─────────────┬─────────────┐
│   BACKLOG   │   TO DO     │ IN PROGRESS │  REVIEW/QA  │    DONE     │
│             │  (Sprint)   │  (WIP ≤ 3)  │  (WIP ≤ 3)  │             │
├─────────────┼─────────────┼─────────────┼─────────────┼─────────────┤
│ US-023      │ US-036      │             │             │ US-001    │
│ US-025      │ US-001      │             │             │ US-002    │
│ US-027      │ US-002      │             │             │ US-005    │
│ US-029      │ US-005      │             │             │ US-006    │
│ US-030      │             │             │             │ US-010    │
│ US-034      │             │             │             │ US-012    │
│ US-035      │             │             │             │ US-014    │
│ US-037      │             │             │             │ US-026    │
│ US-038      │             │             │             │ (UI only)   │
│ US-039      │             │             │             │             │
│ US-040      │             │             │             │             │
│ ...         │             │             │             │             │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────┘

Note: Kolom "Done" mencerminkan komponen UI yang sudah diimplementasi
sebagai visual/dummy. Backend integration masuk Sprint berikutnya.
```

---

## 9. Gantt Chart — Roadmap 12 Minggu

```
MINGGU →         W1   W2   W3   W4   W5   W6   W7   W8   W9   W10  W11  W12
                 ─────────────────────────────────────────────────────────────
PHASE 1: FOUNDATION & VISUAL (Sprint 1-2)
─────────────────────────────────────────────────────────────────────────────
Setup Project &  ████
  Infrastructure  ────
Landing Page     ████ ████
  & UI System    ─────────
Auth UI          ████ ████
  (Login/Reg)    ─────────
Direktori Admin  ████ ████
  (Visual)       ─────────
Marketplace      ████ ████
  Explorer (UI)  ─────────

PHASE 2: CORE BACKEND INTEGRATION (Sprint 3-4)
─────────────────────────────────────────────────────────────────────────────
Supabase Auth              ████ ████
  Integration              ─────────
Listing CRUD               ████ ████
  API + DB                 ─────────
File Upload                     ████ ████
  (UploadThing)                 ─────────
Admin Direktori                 ████ ████
  API + DB                      ─────────

PHASE 3: TRANSACTION ENGINE (Sprint 5-6)
─────────────────────────────────────────────────────────────────────────────
Transaction                          ████ ████
  Lifecycle API                       ─────────
Payment Upload                       ████ ████
  + Verification                      ─────────
In-Transaction                            ████ ████
  Chat (Real-time)                         ─────────
Dispute System                            ████ ████
  + Resolution                             ─────────

PHASE 4: DASHBOARD & POLISH (Sprint 7-8)
─────────────────────────────────────────────────────────────────────────────
Dashboard Buyer                               ████ ████
  (Full Integration)                           ─────────
Dashboard Seller                              ████ ████
  (Full Integration)                           ─────────
Dashboard Admin                                    ████ ████
  (Full Integration)                                ─────────
Review & Rating                                    ████ ████
  System                                            ─────────

PHASE 5: TESTING & LAUNCH (Sprint 9)
─────────────────────────────────────────────────────────────────────────────
QA & Bug Fixing                                         ████ ████
E2E Testing                                             ████ ████
Performance Opt.                                              ████
Production Deploy                                             ████ ████
PWA & SEO Polish                                              ████ ████
─────────────────────────────────────────────────────────────────────────────
MILESTONE:  ▼ Setup  ▼ Landing   ▼ Auth+   ▼ Trans-   ▼ Dash-  ▼ LAUNCH
            Done     Live        Market    action     board    
            W1       W2          W4        W6         W9       W12
```

---

## 10. Sprint Detail

### Sprint 1 (W1–W2): Foundation & UI Foundation
**Goal:** Setup infrastruktur, design system, dan halaman utama visual

| Task | Assignee | Estimasi | Status |
|------|----------|----------|--------|
| Inisialisasi Next.js 14 + TypeScript + Tailwind | Full | 1 hari | Done |
| Setup Prisma schema + Supabase connection | Backend | 2 hari | Done |
| Global CSS design system (dark theme, tokens) | Frontend | 1 hari | Done |
| Landing page: Hero + Three.js Particles | Frontend | 3 hari | Done |
| Landing page: Stats section + GSAP animations | Frontend | 2 hari | Done |
| Lenis smooth scroll + custom cursor | Frontend | 1 hari | Done |
| Direktori admin rekber (visual only) | Frontend | 2 hari | Done |
| Admin card + TrustScore Ring | Frontend | 2 hari | Done |

**Velocity:** ~42 story points

---

### Sprint 2 (W3–W4): Auth + Marketplace UI
**Goal:** Halaman auth lengkap, marketplace explorer, listing detail

| Task | Assignee | Estimasi | Status |
|------|----------|----------|--------|
| Login & Register page UI | Frontend | 2 hari | Done |
| NextAuth setup (credentials) | Backend | 2 hari | Todo |
| Supabase Auth integration | Backend | 2 hari | Todo |
| ListingsExplorer dengan filter | Frontend | 3 hari | Done |
| Listing detail page | Frontend | 2 hari | Todo |
| CreateListingForm + UploadThing | Full | 3 hari | Done (UI) |
| FilterSidebar (Radix Slider, Checkbox) | Frontend | 1 hari | Done |

---

### Sprint 3 (W5–W6): Transaction Engine
**Goal:** Alur transaksi end-to-end berfungsi penuh

| Task | Assignee | Estimasi | Status |
|------|----------|----------|--------|
| API: POST /api/transactions | Backend | 2 hari | Todo |
| API: PATCH /api/transactions/[id]/status | Backend | 3 hari | Todo |
| PaymentModal: upload bukti + submit | Full | 2 hari | Done (UI) |
| BuyerTransactionView: tampilan + aksi | Full | 2 hari | Done (UI) |
| AdminTransactionView: tampilan + aksi | Full | 2 hari | Done (UI) |
| SellerTransactionView: tampilan | Full | 1 hari | Done (UI) |
| TransactionTimeline component | Frontend | 1 hari | Done |
| DisputeModal: form + submit | Full | 2 hari | Done (UI) |

---

### Sprint 4 (W7–W8): Chat + Reviews + Dashboard
**Goal:** Chat real-time, sistem review, dashboard terintegrasi

| Task | Assignee | Estimasi | Status |
|------|----------|----------|--------|
| TransactionChat: real-time polling/WS | Full | 3 hari | Done (UI) |
| API: chat messages CRUD | Backend | 2 hari | Todo |
| Review form pasca transaksi | Frontend | 2 hari | Todo |
| API: POST /api/reviews | Backend | 1 hari | Todo |
| Trust score recalculation logic | Backend | 2 hari | Todo |
| Dashboard Buyer (full integration) | Full | 3 hari | Todo |
| Dashboard Admin (full integration) | Full | 3 hari | Done (UI) |
| AccountVaultPanel | Full | 2 hari | Done (UI) |

---

### Sprint 5 (W9–W10): QA, Testing & Polish
**Goal:** Bug fixing, performance, production-ready

| Task | Assignee | Estimasi | Status |
|------|----------|----------|--------|
| E2E test happy path (transaksi penuh) | QA | 3 hari | Todo |
| Fix semua TypeScript errors | Full | 1 hari | Done |
| Lighthouse audit & optimization | Frontend | 2 hari | Todo |
| Mobile responsiveness QA | Frontend | 2 hari | Todo |
| Security audit (RBAC check) | Backend | 2 hari | Todo |
| PWA setup + offline page | Frontend | 1 hari | Done |
| Seed data production | Backend | 1 hari | Todo |
| Deploy ke Vercel + domain setup | DevOps | 1 hari | Todo |

---

## 11. Definition of Done (DoD)

Sebuah user story dianggap **Done** jika memenuhi semua kriteria berikut:

- [ ] Kode ter-review dan di-approve minimal 1 developer lain
- [ ] Unit/integration test tersedia untuk logika business critical
- [ ] TypeScript compile tanpa error (`npx tsc --noEmit`)
- [ ] Komponen responsif di mobile (375px), tablet (768px), desktop (1280px)
- [ ] Error handling dan loading states sudah diimplementasi
- [ ] Data dari database nyata (bukan dummy data) sudah digunakan
- [ ] Aksi dilindungi autentikasi & otorisasi yang tepat
- [ ] Deployed ke staging environment dan diverifikasi

---

## 12. Risiko & Mitigasi

| Risiko | Dampak | Kemungkinan | Mitigasi |
|--------|--------|-------------|----------|
| Prisma engine binary gagal di server | Tinggi | Rendah | Pastikan `npx prisma generate` dijalankan sebelum build |
| Real-time chat butuh WebSocket (bukan polling) | Medium | Medium | Mulai dengan polling (5s), upgrade ke Supabase Realtime jika dibutuhkan |
| UploadThing rate limit untuk free tier | Medium | Medium | Implementasi compression gambar sebelum upload |
| Supabase free tier row limit | Medium | Rendah | Monitor usage, upgrade jika mendekati limit |
| Performa Three.js di mobile low-end | Tinggi | Tinggi | Deteksi perangkat low-end, nonaktifkan particle scene |
| Penipuan admin rekber palsu | Sangat Tinggi | Medium | Verifikasi manual admin oleh Super Admin + badge verified |

---

## 13. Metrics & KPI

| Metrik | Target (Month 1) | Target (Month 3) |
|--------|-----------------|-----------------|
| Registered Users | 50 | 500 |
| Active Admin Rekber | 5 | 20 |
| Transaksi Berhasil | 20 | 200 |
| Dispute Rate | < 10% | < 5% |
| Average Transaction Value | Rp 150.000 | Rp 200.000 |
| NPS (Net Promoter Score) | > 30 | > 50 |
| Platform Revenue (fee) | Rp 50.000/bulan | Rp 500.000/bulan |

---

## 14. Referensi Teknis

| Resource | Link/Keterangan |
|---------|-----------------|
| Next.js 14 Docs | https://nextjs.org/docs |
| Supabase Docs | https://supabase.com/docs |
| Prisma Docs | https://www.prisma.io/docs |
| NextAuth.js | https://next-auth.js.org |
| UploadThing | https://uploadthing.com/docs |
| Radix UI | https://www.radix-ui.com |
| TanStack Query | https://tanstack.com/query/latest |
| GSAP ScrollTrigger | https://gsap.com/docs/v3/Plugins/ScrollTrigger/ |
| Three.js R3F | https://docs.pmnd.rs/react-three-fiber |

---

## 15. Lampiran: Rekap Hasil Brainstorming

*Bagian ini menggabungkan seluruh hasil diskusi brainstorming (di luar isi teknis PRD versi codebase) yang perlu jadi pertimbangan tim. Bila ada yang tumpang tindih dengan section di atas, dianggap sebagai catatan pelengkap — bukan menggantikan keputusan yang sudah dituliskan di PRD.*

### 15.1 Legalitas & Etika (Penting)

- Jual-beli akun game **legal di Indonesia** — belum ada undang-undang spesifik yang melarang, dan sudah ada preseden bisnis serupa yang beroperasi lama (Itemku sejak 2014, VCGamers, dll).
- Risiko utama bukan hukum negara, melainkan **pelanggaran ToS/EULA penerbit game** (Konami, Moonton, dll) — akun bisa kena banned oleh penerbit, di luar kendali platform.
- Model **menampung dana pihak ketiga langsung** (admin pegang rekening sendiri) berpotensi masuk pengawasan **Bank Indonesia** (butuh izin PJP) — lihat catatan di bagian Segment 3 di atas.
- Garis merah yang wajib dijaga: platform tidak boleh memfasilitasi akun hasil curian/hack — ini beda dari sekadar melanggar ToS, dan berisiko pidana.
- Detail lengkap ada di dokumen terpisah: **"Legalitas & Etika Jual-Beli Akun Game"**.

### 15.2 Evolusi Model Bisnis

Dua model sempat dipertimbangkan:

| Model | Keterangan | Status |
|---|---|---|
| **A — Full platform (sesuai isi PRD ini)** | Admin rekber terintegrasi penuh, chat & transaksi dalam satu web, dana lewat sistem platform | Arah saat ini di PRD |
| **B — Direktori murni** | Platform hanya jadi direktori/penunjuk ke admin rekber eksternal, transaksi tetap di luar (WA) | Sempat jadi opsi awal yang lebih ringan untuk validasi cepat |

Keputusan akhir condong ke **Model A** (sesuai arah PRD ini) karena dianggap memberi pengalaman lebih baik ("all-in-one"), dengan syarat mitigasi legal di atas (payment gateway berizin, bukan rekening pribadi admin) benar-benar diterapkan.

### 15.3 Model Monetisasi (Referensi Awal)

- Fee listing dari seller: sekitar Rp500 per transaksi sukses
- Fee dari admin rekber: flat Rp500–1.000 per transaksi sukses (bukan persentase — fee rekber sendiri biasanya sudah kecil, Rp1.000–5.000 untuk akun di bawah Rp300rb)
- FR-04.10 di PRD ini sudah mencantumkan platform fee Rp500 — sejalan dengan angka referensi hasil brainstorming
- Proyeksi awal: dengan asumsi ~Rp2.750/transaksi (gabungan fee seller+admin), pada volume 50–1000 transaksi/bulan pendapatan platform berkisar Rp137rb–Rp2,75jt/bulan — konsisten dengan target KPI "Platform Revenue" di Section 13

### 15.4 Struktur Tim (Kondisi Aktual: Mahasiswa IT UGM)

| Kondisi | Pembagian Role |
|---|---|
| 2 orang (saat ini) | Kamu: Product & Business (strategi, approach admin, data/tracking, keuangan) · Teman 1: Technical (frontend+backend MVP, n8n, basic security) |
| 4 orang (rencana) | + Frontend Developer khusus, + Backend & Security khusus, + Automation & Integrasi (n8n, WhatsApp API, dsb) |

- **Catatan:** sebaiknya mulai dari struktur 2 orang untuk validasi awal, baru menambah role begitu ada traksi nyata.
- **Perlu didiskusikan segera dengan tim:** kesepakatan pembagian kepemilikan/kontribusi (equity split) sebelum development lanjut jauh.
- n8n cocok untuk otomasi (notifikasi WA, sync data ke spreadsheet, reminder), **bukan pengganti** developer frontend/backend maupun security engineer.

### 15.5 Strategi Akuisisi Admin Rekber Awal

- Jangan minta admin mengubah cara kerja di awal — cukup tambahkan visibilitas lewat direktori, proses transaksi tetap familiar bagi mereka.
- Fokus ke 1–2 **"anchor admin"** yang sudah punya nama di komunitas eFootball, didekati personal, diberi insentif jelas (gratis, badge verified, promosi), sebelum mengajak admin lain.
- Framing ke admin: platform ini **memperbesar pasar** (mendatangkan buyer baru), bukan memindahkan klien dari admin ke admin lain — penting untuk mengurangi kesan kompetisi terbuka antar admin (lihat juga catatan di FR-02).
- Gunakan data hasil trial anchor admin sebagai bukti sosial untuk menarik admin berikutnya, bukan sekadar janji di awal.

### 15.6 Roadmap Validasi (Sebelum/Bersamaan dengan Sprint 1)

- [ ] Validasi manual: hubungi 1–2 admin rekber eFootball yang sudah dikenal reputasinya
- [ ] Buat landing page yang terlihat profesional untuk pitching ke calon admin (bukan Google Form — dianggap kurang meyakinkan)
- [ ] Isi profil awal 1–2 admin (dibuatkan tim, tinggal admin konfirmasi) untuk mengurangi friksi onboarding
- [ ] Sebar link ke grup jual-beli eFootball, ukur minat nyata sebelum lanjut ke fitur backend penuh
- [ ] Diskusikan pembagian kepemilikan/role dengan tim

### 15.7 Checklist Topik yang Sudah Dibahas di Sesi Brainstorming

- [x] Validasi ide bisnis & positioning dibanding kompetitor (Itemku, VCGamers)
- [x] Legalitas jual-beli akun & risiko ToS/EULA penerbit game
- [x] Model bisnis: direktori vs full platform (admin sendiri)
- [x] Pertimbangan izin PJP Bank Indonesia untuk jasa menahan dana
- [x] Model monetisasi & proyeksi pendapatan awal
- [x] Strategi mengurangi persaingan antar admin (sembunyikan fee, sistem rotasi/status aktif)
- [x] Cara akuisisi admin rekber pertama (anchor admin)
- [x] Struktur tim untuk kondisi 2 orang dan 4 orang mahasiswa
- [x] Keputusan autentikasi: buyer tanpa akun, seller via WA OTP, admin/super admin via email+password
- [x] Privasi & keamanan chat serta data finansial
- [x] Web vs app (diputuskan: web dulu untuk tahap MVP)
- [ ] Detail desain database/skema data — belum dibahas detail, lihat Section 6 (Arsitektur Teknis) di PRD ini sebagai acuan awal
- [ ] Detail integrasi payment gateway (Midtrans/Xendit) — arah sudah dibahas, implementasi teknis belum

---

## 16. Pembagian Klaster Kerja Tim (4 Orang)

*Tim final: 4 mahasiswa IT UGM. Pembagian berikut disusun berdasarkan struktur Functional Requirements (FR) di Section 4, supaya masing-masing orang punya lingkup kerja yang jelas dan tidak tumpang tindih.*

### 16.1 Klaster Kerja

| Klaster | Cakupan Kerja | FR Terkait |
|---|---|---|
| **1 — Frontend & UI/UX** | Landing page, direktori admin, marketplace explorer, listing detail, semua dashboard (buyer/seller/admin), design system, responsive design | FR-02, FR-03, FR-07, NFR-05 |
| **2 — Backend & Database** | Skema database (Prisma + Supabase), autentikasi backend (buyer tanpa akun, seller via WA OTP, admin via Supabase Auth), API CRUD listing & direktori, core logic status transaksi | FR-01, FR-02, FR-03, FR-04 (di luar payment) |
| **3 — Payment & Transaksi** | Integrasi payment gateway (Midtrans/Xendit), upload & verifikasi bukti pembayaran, kalkulasi fee otomatis, webhook konfirmasi pembayaran | FR-04.10, FR-04.11, Section 15.1/15.3 |
| **4 — Chat, Trust & Notifikasi** | In-transaction chat real-time + enkripsi pesan, sistem review & rating, trust score, dispute management, notifikasi in-app & otomasi n8n | FR-05, FR-06, FR-08 |

> **Catatan penting:** Klaster 2 (Database) bukan berarti 1 orang bekerja sendirian menentukan skema — skema database wajib **disepakati bersama seluruh tim di awal** (lihat urutan kerja di bawah), karena Klaster 1, 3, dan 4 semuanya bergantung pada skema yang sama. Klaster 2 berperan sebagai *maintainer* skema setelah disepakati bersama, bukan pemilik tunggal.

### 16.2 Urutan Kerja yang Disarankan

1. **Tahap 0 — Sepakati fondasi bersama (sebelum sprint dimulai):** seluruh tim (4 orang) duduk bareng merancang skema database (tabel, relasi, field) berdasarkan Section 6 (Arsitektur Teknis) dan FR yang ada. Ini fondasi yang dipakai semua klaster, sehingga wajib disepakati dulu sebelum kerja paralel dimulai.
2. **Tahap 1 — Kerja paralel dimulai:**
 - Klaster 1 (Frontend) mulai membangun UI menggunakan data dummy/mock sambil menunggu API asli
 - Klaster 2 (Backend) membangun API sungguhan sesuai skema yang sudah disepakati
 - Klaster 3 (Payment) mulai riset opsi payment gateway & mendesain alur integrasi
 - Klaster 4 (Chat/Trust) mulai membangun modul chat & sistem review secara independen
3. **Tahap 2 — Sambungkan:** Klaster 1 mengganti data dummy dengan API asli dari Klaster 2; Klaster 3 disambungkan ke alur transaksi inti dari Klaster 2; Klaster 4 disambungkan ke halaman transaksi dari Klaster 1.
4. **Tahap 3 — Uji end-to-end bareng:** seluruh tim menguji alur penuh (dari posting listing sampai transaksi selesai) untuk memastikan seluruh klaster nyambung dengan benar.
5. **Tahap 4 — Polish & validasi ke pengguna nyata:** sejalan dengan roadmap validasi di Section 15.6 — sebelum full-scale, uji dulu ke 1–2 anchor admin dan buyer nyata.

### 16.3 Titik Koordinasi Wajib

Supaya klaster tidak saling nunggu tanpa arah, tetapkan momen sinkronisasi rutin (misal standup singkat 2–3 kali seminggu) terutama untuk membahas:
- Perubahan pada skema database (harus diketahui semua klaster)
- Bentuk/format data (API contract) yang dibutuhkan Frontend dari Backend
- Titik temu antara Klaster 3 (Payment) dan Klaster 2 (status transaksi inti)
- Titik temu antara Klaster 4 (Chat/Trust) dan Klaster 1 (tampilan di halaman transaksi)

---

*Document ini dibuat berdasarkan analisis codebase Rekberin versi current (September 2026), digabung dengan hasil sesi brainstorming produk & bisnis, serta pembagian klaster kerja tim final 4 orang.*
*PRD ini bersifat living document dan akan diperbarui seiring perkembangan produk.*
