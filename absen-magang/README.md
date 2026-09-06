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
