# 03 — Hero Beranda via Sanity

**What to build:** Pengurus bisa mengubah badge lokasi, tagline, label tombol CTA, foto background (upload + hotspot), dan baris-baris highlight (ikon + teks singkat) Hero Beranda lewat Sanity Studio, dan perubahan itu tampil setelah rebuild otomatis — menggantikan teks/foto yang sekarang hardcode di `Hero.jsx`. Judul "Surau Bateh Lori" dan tujuan navigasi tombol CTA tetap hardcode di kode (bukan field editorial). Baris angka jamaah di Hero dicari lewat `stats.find(s => s.showInHero)` (field dari tiket 01), menggantikan pencocokan teks label yang rapuh.

**Blocked by:** 01 (Statistik Beranda via Sanity) — butuh fondasi schema `beranda`/`resolveBeranda`/helper icon terkurasi, dan field `stats[].showInHero` sudah tersedia untuk baris angka jamaah. Bisa paralel dengan tiket 02.

**Status:** done — sudah terimplementasi & tergabung di main (lihat riwayat git); label ready-for-agent sebelumnya usang

- [x] Field `hero` (object, fieldset "Hero") ditambahkan ke schema `beranda`: `locationBadge` (string, required), `tagline` (string, required), `ctaLabel` (string, required), `backgroundImage` (image, `options.hotspot: true`, required), `highlights` (array of object `{icon (string, required, curated `options.list` yang sama dengan tiket 01), text (string, required)}`, boleh kosong).
- [x] `resolveBeranda(urlFor, doc)` diperluas mengembalikan juga `hero: {locationBadge, tagline, ctaLabel, backgroundImage: resolveImage(...)-shaped, highlights: [...]}` (selain `stats`/`programs` dari tiket 01/02) — `highlights` selalu array (fallback `[]`), `backgroundImage` diresolve lewat `resolveImage` yang sudah ada (hotspot → object-position).
- [x] Test baru ditambahkan ke `resolveSanityContent.test.js` untuk bagian `hero`: `highlights` kosong/`undefined` tidak error, `backgroundImage` diresolve jadi `{url, position}` dari hotspot (pola test `resolveImage` yang sudah ada untuk field image lain).
- [x] `fetch-sanity-content.mjs`: query dokumen `beranda` diperluas menyertakan `hero{locationBadge, tagline, ctaLabel, backgroundImage, highlights}`.
- [x] `App.jsx` menggabungkan `hero: sanityContent.beranda?.hero` ke `rawData`; `deriveSiteData.js` meneruskan `hero: rawData.hero` apa adanya (field baru, tidak ada turunan yang perlu dihitung).
- [x] `Hero.jsx` diubah: badge lokasi/tagline/label CTA/foto background/highlights dibaca dari `site.hero` (bukan hardcode); baris angka jamaah dicari lewat `site.stats.find(s => s.showInHero)` (menggantikan `label.toLowerCase().includes('jamaah')`); render aman (tidak crash, cuma bagian terkait yang tidak tampil) bila `site.hero` `null`/`highlights` kosong/tidak ada stat dengan `showInHero: true`.
- [x] Import `foto-surau.jpg` yang di-bundle langsung di `Hero.jsx` tidak dipakai lagi sebagai fallback tetap (foto sekarang dari `site.hero.backgroundImage`) — import lama boleh dihapus di tiket ini atau ditinggalkan untuk dihapus di tiket 04 cutover, selama tidak dipakai render.
- [x] Skrip migrasi satu-kali (dari tiket 01, `scripts/migrate-beranda-to-sanity.mjs`) diperluas menuliskan nilai `hero` yang sekarang hardcode di `Hero.jsx` (badge lokasi "Lori Lubuk Minturun, Kota Padang", tagline, label CTA "Lihat Agenda", dua baris highlight aktif) sebagai nilai awal, dan mengunggah `foto-surau.jpg` sebagai asset Sanity (`client.assets.upload`) untuk field `backgroundImage`.
- [x] Diverifikasi di dev server: Hero Beranda tampil identik seperti sebelum migrasi (termasuk baris angka jamaah).
- [x] Diverifikasi end-to-end di produksi: publish di Studio memicu webhook → rebuild otomatis, log build mengonfirmasi konten ditarik segar dari dataset produksi.
- [x] `npm test`/`npm run build` lulus penuh.
