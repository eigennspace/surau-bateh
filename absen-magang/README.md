# Absen Magang

Pencatatan kehadiran mahasiswi/intern magang di Surau Bateh Lori. Aplikasi
Next.js terpisah dari `site/` (lihat `../CONTEXT-MAP.md`, `../absen/CONTEXT.md`,
dan `../docs/adr/0015-absen-magang-penyimpanan-data-terpisah-dari-sanity.md`
di root repo untuk konteks arsitektur dan domain lengkap).

## Setup

```bash
cp .env.example .env.local   # isi DATABASE_URL dan SESSION_SECRET
npm install
npm run migrate              # buat skema tabel di Postgres
node scripts/create-pengurus.mjs <username> <password>   # akun Pengurus pertama
npm run dev
```

## Struktur

- `lib/absen/` — modul domain: seluruh operasi (`ajukanPendaftaran`,
  `setujuiPendaftaran`, `catatKehadiran`, `generateLaporan`, dst) sebagai
  fungsi yang menerima `db` (objek `{ query(sql, params) }`) sebagai argumen
  pertama. Route handler dan Server Action di `app/` hanya memanggil fungsi
  di sini — tidak ada logika domain di lapisan itu.
- `lib/db.js` — koneksi Postgres produksi (`pg` Pool).
- `lib/absen/testDb.js` — database test sungguhan (PGlite, Postgres asli
  dikompilasi ke WASM, bukan mock) yang dipakai `lib/absen/*.test.js`.
- `app/` — halaman publik (`/daftar`, `/absen`), login Pengurus, dan
  dashboard (`/dashboard/*`, dilindungi `middleware.js`).

## Test

```bash
npm test
```

Uji seluruh alur domain langsung lewat fungsi `lib/absen` terhadap database
test sungguhan (PGlite) — bukan lewat HTTP maupun UI. Lihat
`.scratch/absen-magang/spec.md` (root repo) bagian Testing Decisions.

## Deploy (Vercel + Neon)

Lihat `../docs/adr/0017-absen-magang-deploy-ke-vercel-neon.md` untuk alasan
di balik pilihan-pilihan di bawah.

### 1. Buat database Neon

1. Buat project baru di [Neon](https://console.neon.tech), region **AWS Asia
   Pacific (Singapore)**.
2. Buat database `absen_magang` (atau pakai database default project).
3. Dari halaman Connection Details, salin connection string yang **pooled**
   (host-nya mengandung `-pooler`, bukan yang direct) — ini yang dipakai
   sebagai `DATABASE_URL`.

### 2. Buat project Vercel

1. Import repo ini ke Vercel (New Project → pilih repo GitHub).
2. Di Project Settings → General → **Root Directory**, set ke `absen-magang`.
3. Di Project Settings → General → **Build Command**, override jadi:
   ```
   npm run migrate && next build
   ```
   (aman dijalankan berulang — semua statement di `db/schema.sql` idempotent).
4. Di Project Settings → Environment Variables, tambahkan untuk scope
   **Production** saja (jangan centang Preview/Development):
   - `DATABASE_URL` — connection string pooled dari Neon (langkah 1.3)
   - `SESSION_SECRET` — generate baru khusus produksi, jangan pakai yang di
     `.env.local`:
     ```bash
     openssl rand -base64 32
     ```
5. Deploy.

### 3. Buat akun Pengurus pertama

Sekali saja, dari laptop, arahkan sementara ke database Neon (pakai
connection string **direct**, bukan pooled, supaya tidak konflik dengan
prepared statement PgBouncer saat skrip ini jalan):

```bash
DATABASE_URL="<connection string direct dari Neon>" \
  node scripts/create-pengurus.mjs <username> <password>
```

### 4. Domain custom

1. Di Vercel Project Settings → Domains, tambahkan `absen.suraubateh.web.id`.
2. Vercel akan menampilkan target CNAME (biasanya `cname.vercel-dns.com`).
3. Di panel DNS **Domainesia** untuk domain `suraubateh.web.id`, tambahkan
   record: `CNAME` `absen` → target dari langkah 2.
4. Tunggu propagasi DNS, lalu verifikasi status domain di Vercel jadi
   "Valid Configuration".

### Catatan

- Preview Deployment (per-PR) sengaja **tidak** diberi `DATABASE_URL` — route
  yang menyentuh database akan gagal dengan error eksplisit di Preview,
  bukan menulis ke data produksi.
- Setelah deploy pertama berhasil, uji fitur `/api/laporan` (generate PDF
  lewat `pdfkit`) — ini satu-satunya bagian yang bergantung pada file
  `.afm` di `node_modules` saat runtime (lihat `serverExternalPackages` di
  `next.config.mjs`); Vercel biasanya menyertakannya otomatis lewat file
  tracing Next.js, tapi ini worth di-cek sekali di production.
