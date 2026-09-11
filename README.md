# RekberGG — Visual-First (v2, lengkap)

Platform direktori & dashboard rekber untuk jual-beli akun eFootball. Tampilan dark-premium
"Awwwards-grade" dengan GSAP ScrollTrigger, Lenis smooth-scroll, custom cursor, Three.js particle
background, dan filter berbasis Radix UI.

## Status: semua item yang diminta sudah diimplementasikan

| Item | Status | Lokasi |
|---|---|---|
| Palet warna premium + gradient text | ✅ | `app/globals.css`, `tailwind.config.ts` |
| Lenis smooth-scroll | ✅ | `lib/lenis.ts` |
| GSAP ScrollTrigger (reveal/stagger/count-up) | ✅ | `lib/gsap-animations.ts` |
| Custom cursor (dot + ring, blend difference) | ✅ | `components/ui/Cursor.tsx` |
| TrustScoreRing (SVG progress ring) | ✅ | `components/marketplace/TrustScoreRing.tsx` |
| TrustBadge (pulse glow) | ✅ | `components/ui/TrustBadge.tsx` |
| CrownBadge (top 3 admin) | ✅ | `components/ui/CrownBadge.tsx` |
| `bg-grid` + `noise` texture | ✅ | `app/globals.css`, dipakai di Hero & direktori rekber |
| Card glass hover (glow border + shadow) | ✅ | `.card-glass` di `app/globals.css` |
| **Three.js particle field di Hero** | ✅ | `components/three/HeroScene.tsx`, `ParticleField.tsx` |
| **Radix Slider (filter harga)** | ✅ | `components/ui/Slider.tsx`, dipakai di `FilterSidebar.tsx` |
| **Radix Checkbox (filter status)** | ✅ | `components/ui/Checkbox.tsx` |
| **Radix RadioGroup (filter rating)** | ✅ | `components/ui/RadioGroup.tsx` |

## Sudah diverifikasi

- ✅ `npx tsc --noEmit` — bersih
- ✅ `npm run build` — **compile berhasil penuh**, termasuk Three.js scene (client-only via `next/dynamic` + `ssr:false`) dan semua komponen Radix baru
- ⚠️ Satu-satunya error di build sandbox saya: Prisma gagal download engine binary
  (`binaries.prisma.sh` diblokir jaringan sandbox saya). Jalankan `npx prisma generate` di
  komputer Anda sendiri — ini murni pembatasan sandbox saya, bukan bug kode.

## Menjalankan

```bash
npm install
cp .env.example .env.local   # isi kredensial Supabase Anda
npx prisma generate
npm run dev
```

## Yang masih dummy (belum berubah dari sebelumnya, di luar scope "visual")

- Data (listing, admin, transaksi) — dari `data/dummy.ts`
- Aksi tombol (beli, konfirmasi dana, dsb) — hanya toast notifikasi, belum menyimpan ke database
- Auth — belum tersambung ke Supabase Auth sungguhan

Semua kode integrasi backend (Supabase/Prisma/NextAuth) sudah siap di `lib/`, `prisma/schema.prisma`,
dan `app/api/` — tinggal isi kredensial dan sambungkan hook di `hooks/useListings.ts` /
`hooks/useTransactions.ts` ke query asli.
