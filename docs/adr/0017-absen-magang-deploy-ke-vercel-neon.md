# Absen Magang di-deploy ke Vercel + Neon, bukan mengikuti pola GitHub Pages statis milik `site/`

ADR 0005 memutuskan `site/` tidak butuh hosting selain GitHub Pages karena ia static export tanpa server-side rendering atau API. Absen Magang sebaliknya butuh server hidup (Next.js App Router dengan Server Actions dan API routes) dan koneksi database Postgres langsung dari server (lihat ADR 0015) — bentuk yang tidak bisa dilayani GitHub Pages. Kami pilih **Vercel** (mendukung Next.js secara native, termasuk Server Actions) untuk hosting aplikasi, dan **Neon** (Postgres serverless, region AWS Asia Pacific/Singapore) untuk databasenya, dipisah dari database `site/`/Sanity sesuai ADR 0015.

Repo ini tetap satu monorepo git yang sama; Vercel diarahkan ke `absen-magang/` lewat **Root Directory di Project Settings** (bukan `vercel.json` yang di-commit), mengikuti preseden ADR 0005: config hosting yang tidak sensitif terhadap hilangnya version control disetel langsung di dashboard provider, bukan dipelihara sebagai file terpisah di repo.

`DATABASE_URL` produksi memakai bentuk **pooled** Neon (lewat PgBouncer, host `-pooler`) karena Vercel menjalankan Absen Magang sebagai serverless functions — tiap cold start berpotensi membuka koneksi Postgres baru, dan koneksi langsung (non-pooled) berisiko kehabisan slot di sisi Neon.

Domain custom `absen.suraubateh.web.id` ditambahkan sebagai CNAME ke Vercel lewat panel Domainesia (bukan lewat GitHub Pages Settings seperti domain apex `suraubateh.web.id` — dua zona DNS berbeda meski nama domain sama).

Migrasi skema (`db/schema.sql`) dijalankan otomatis tiap production deploy lewat build command (`npm run migrate && next build`), bukan manual sekali di awal — aman karena semua statement di `schema.sql` idempotent (`CREATE TABLE IF NOT EXISTS`, `ADD COLUMN IF NOT EXISTS`).

**Konsekuensi**: Preview Deployment Vercel (per-PR/branch) sengaja **tidak** diberi `DATABASE_URL` — route yang menyentuh database akan gagal dengan error eksplisit (`DATABASE_URL belum diatur`, lihat `lib/db.js`) di Preview, bukan diam-diam menulis ke database produksi atau butuh provisioning Neon branch terpisah. Ini keputusan yang dibatasi untuk kondisi sekarang (tim kecil, PR jarang perlu diuji dengan DB hidup); kalau ke depannya itu berubah, pertimbangkan Neon database branching per Preview.
