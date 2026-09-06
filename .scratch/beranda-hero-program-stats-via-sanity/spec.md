Status: ready-for-agent

# Migrasi Konten ke Sanity — Fase 4: Hero, Program Beranda, & Statistik Beranda

## Problem Statement

Sejak ADR [0013](../../docs/adr/0013-seluruh-konten-sumber-data-migrasi-ke-sanity.md), seluruh konten yang masih hand-edited di `sourceData.js` direncanakan pindah ke Sanity secara bertahap. Setelah galeri/artikel/video Profil Surau (Fase 1), `events`/`news` (Fase 2), dan narrative+galeri+kontak Halaman Program/Profil Salik (Fase 3, `.scratch/halaman-program-kontak-salik-via-sanity/`), yang masih tersisa untuk Beranda (`/`) adalah tiga bagian: seksi **Hero** (sebagian besar hardcode di `Hero.jsx`, bukan cuma di `sourceData.js`), `SB_DATA.programs` (4 kartu "Kegiatan rutin" di `ProgramsSection.jsx`), dan `SB_DATA.stats` (dipakai `StatsSection.jsx` dan sebagian oleh Hero). Pengurus surau tidak bisa mengubah lokasi/tagline/foto Hero, menambah-kurangi kartu program ringkas, atau memperbarui angka statistik Beranda tanpa melibatkan maintainer untuk mengedit kode dan mendorong perubahan lewat git.

`AgendaSection`, `ArticlesSection`, dan `GallerySection` di Beranda **sudah** membaca dari Sanity sejak fase-fase sebelumnya — di luar cakupan spec ini. `VerseSection` (kutipan ayat tetap) diputuskan **tetap** di kode, bukan bagian dari migrasi ini (bukan konten yang berubah-ubah).

## Solution

Pindahkan Hero + Program Beranda + Statistik Beranda ke Sanity sebagai **satu dokumen singleton baru**, `beranda` (mengikuti istilah domain "Beranda" yang sudah dipakai `CONTEXT.md`/ADR 0013 untuk merujuk konten ringkasan/counter halaman `/`), dengan tiga kelompok field (`hero`, `programs`, `stats`) dalam satu dokumen Studio — bukan tiga singleton terpisah. Arsitektur mengikuti pola Fase 1–3 yang sudah terbukti: **build-time fetch**, situs tetap static export tanpa dependency runtime ke Sanity, lewat fungsi transformasi murni baru (`resolveBeranda`) di `resolveSanityContent.js`, dipanggil dari `fetch-sanity-content.mjs`.

Judul surau ("Surau Bateh Lori") dan tujuan navigasi tombol CTA Hero **tetap dikunci di kode** — bukan field editorial (risiko salah-arah/link mati). Field `icon` di `programs`/`stats`/highlight Hero dikunci ke dropdown pilihan terkurasi, bukan teks bebas — mengikuti prinsip "kurasi field berisiko" yang sudah dipakai `galleryItem.ratio`.

## User Stories

1. Sebagai pengurus surau, saya ingin mengubah teks badge lokasi Hero (mis. "Lori Lubuk Minturun, Kota Padang") lewat Sanity Studio, sehingga tidak perlu bantuan maintainer bila lokasi perlu diperjelas.
2. Sebagai pengurus surau, saya ingin mengubah tagline Hero ("Ber-IHSAN Bersama Surau Bateh Lori Kota Padang") lewat Sanity Studio, sehingga pesan utama Beranda bisa disesuaikan kapan saja.
3. Sebagai pengurus surau, saya ingin mengubah label tombol CTA Hero (sekarang "Lihat Agenda") lewat Sanity Studio, sehingga teks ajakan bisa disegarkan tanpa mengubah tujuan navigasinya.
4. Sebagai pengurus surau, saya ingin mengganti foto background Hero dengan mengunggah foto baru lewat Sanity Studio (lengkap dengan hotspot untuk titik fokus), sehingga foto Beranda bisa diperbarui tanpa build manual.
5. Sebagai pengurus surau, saya ingin menambah, mengubah, menghapus, atau mengurutkan ulang baris highlight Hero (ikon + teks singkat, sekarang "Kajian 4 kali sepekan"/"Gotong royong tiap pekan") lewat Sanity Studio, sehingga sorotan singkat di Hero selalu relevan.
6. Sebagai pengurus surau, saya ingin menambah, mengubah, menghapus, atau mengurutkan ulang kartu Program Beranda (ikon, judul, deskripsi, jadwal singkat) lewat Sanity Studio, sehingga daftar kegiatan rutin yang ditonjolkan di Beranda selalu mutakhir — termasuk mengaktifkan kembali program yang sekarang nonaktif (dikomentari di kode) tanpa menyentuh kode.
7. Sebagai pengurus surau, saya ingin menambah, mengubah, atau menghapus item Statistik Beranda (ikon, nilai, label) lewat Sanity Studio, sehingga angka yang ditampilkan (jamaah rutin, kajian per bulan, gotong royong) selalu sesuai kondisi terkini.
8. Sebagai pengurus surau, saya ingin menandai tepat satu item Statistik sebagai "tampil di Hero" lewat sebuah toggle eksplisit, sehingga baris angka jamaah di Hero tetap terhubung ke Statistik yang benar walau labelnya saya ubah kapan saja.
9. Sebagai pengurus surau yang mengisi ikon untuk highlight Hero/Program/Statistik, saya ingin memilih dari daftar ikon yang sudah dikurasi (dropdown), bukan mengetik nama ikon bebas, sehingga saya tidak bisa salah ketik nama ikon dan merusak tampilan.
10. Sebagai pengurus surau, saya ingin field wajib (badge lokasi, tagline, label CTA, foto background, judul/deskripsi tiap kartu program, nilai/label tiap item statistik) tidak bisa disimpan kosong di Studio, sehingga Beranda tidak pernah tampil dengan bagian penting hilang.
11. Sebagai pengurus surau, saya ingin daftar Program Beranda dan Statistik Beranda boleh dikosongkan (array kosong), sehingga saya tidak dipaksa mengisi item placeholder bila memang sedang tidak ada yang mau ditonjolkan.
12. Sebagai pengunjung situs, saya ingin Beranda tampil identik seperti sekarang setelah migrasi — tidak ada perbedaan visual atau perilaku apa pun pada Hero, Program Beranda, atau Statistik Beranda.
13. Sebagai pengunjung situs, saya ingin situs tetap bisa diakses normal meski Sanity sedang down, karena Beranda yang saya lihat adalah hasil build statis, bukan hasil fetch langsung ke Sanity.
14. Sebagai maintainer situs, saya ingin isi `SB_DATA.programs`/`SB_DATA.stats` yang ada sekarang, ditambah teks Hero yang sekarang hardcode di `Hero.jsx` (badge lokasi, tagline, label CTA, foto background, dua baris highlight), termigrasi ke dokumen `beranda` lewat skrip satu-kali, sehingga tidak ada konten yang hilang atau diam-diam berubah saat cutover.
15. Sebagai maintainer situs, saya ingin fungsi `resolveBeranda` diuji dengan fixture GROQ-shaped, mengikuti pola `resolveProgram`/`resolveContact`/`resolveSalik` yang sudah ada di `resolveSanityContent.test.js`, sehingga logika normalisasi bisa diverifikasi tanpa memanggil Sanity sungguhan.
16. Sebagai maintainer situs, begitu Beranda terverifikasi jalan end-to-end dari Sanity, saya ingin `programs` dan `stats` dihapus dari `sourceData.js` sebagai tiket cutover terpisah, sehingga tidak ada dua sumber kebenaran yang tumpang tindih.
17. Sebagai pengurus surau, saya ingin menekan tombol "Publish" di Studio untuk dokumen `beranda` dan melihat perubahan tayang di situs publik dalam beberapa menit lewat webhook → rebuild otomatis yang sudah ada, tanpa langkah tambahan apa pun dari saya.
18. Sebagai pengunjung situs, saya ingin Hero tetap tampil wajar (tanpa baris angka jamaah, bukan error/crash) bila kebetulan tidak ada satu pun item Statistik yang ditandai "tampil di Hero".

## Implementation Decisions

- **Satu schema type baru** di `studio/schemaTypes/`, singleton (pola `profilSurau.ts`/enam Halaman Program: `_id` tetap `"beranda"`, ditambahkan sebagai satu entri baru di array `SINGLETONS` di `studio/sanity.config.ts` — mekanisme singleton sudah generik sejak Fase 3, jadi tidak perlu menyentuh ulang struktur/filter, cukup tambah entri `{type: 'beranda', id: 'beranda', title: 'Beranda'}`).
- **`beranda.ts`** fields (dikelompokkan lewat `fieldset`, tiga kelompok "Hero"/"Program"/"Statistik"):
  - `hero` (object):
    - `locationBadge` (string, required) — teks badge lokasi.
    - `tagline` (string, required).
    - `ctaLabel` (string, required) — hanya label; tujuan navigasi (`onNavigate('Jadwal Kegiatan')`) tetap hardcode di `Hero.jsx`.
    - `backgroundImage` (image, `options.hotspot: true`, required).
    - `highlights` (array of object `{icon (string, required, curated `options.list`), text (string, required)}`, boleh kosong — dua item aktif sekarang ("Kajian 4 kali sepekan"/"Gotong royong tiap pekan") jadi 2 entri awal, bukan field terpisah/fixed-length).
  - `programs` (array of object `{icon (string, required, curated `options.list`), title (string, required), desc (string, required), meta (string, required)}`, boleh kosong — menggantikan `SB_DATA.programs`; tidak ada field `order` terpisah, urutan array = urutan tampil, drag-reorder bawaan Studio).
  - `stats` (array of object `{icon (string, required, curated `options.list`), value (string, required — TETAP teks bebas, bukan number, karena ada nilai seperti "Tiap pekan"), label (string, required), showInHero (boolean, `initialValue: false`)}`, boleh kosong — menggantikan `SB_DATA.stats`).
  - Judul "Surau Bateh Lori" **tidak** jadi field — tetap hardcode di `Hero.jsx`.
  - Daftar `options.list` icon (dropdown terkurasi, bukan enum tervalidasi ketat di beberapa tempat — cukup satu daftar dipakai ulang untuk ketiga field icon di atas lewat helper, pola `programFields.ts`/`eventFields.ts`): seed awal dari icon yang sudah dipakai kode sekarang — `mic`, `swords`, `users`, `calendar-days`, `heart-handshake`, `map-pin` — daftar ini indikatif, boleh diperluas implementer bila ada icon lain yang relevan, selama tetap berupa `options.list` tertutup (bukan teks bebas).
- **`resolveSanityContent.js`** — fungsi murni baru `resolveBeranda(urlFor, doc)`:
  - Menerima satu dokumen `beranda` mentah hasil GROQ, mengembalikan bentuk siap-render: `{hero: {locationBadge, tagline, ctaLabel, backgroundImage: resolveImage(...)-shaped, highlights: [{icon, text}]}, programs: [{icon, title, desc, meta}], stats: [{icon, value, label, showInHero}]}`.
  - `highlights`/`programs`/`stats` selalu array (fallback `[]`), tidak pernah error saat kosong/`undefined` — pola sama seperti `gallery` di `resolveProgram`/`resolveSalik`.
  - `backgroundImage` diresolve lewat `resolveImage` yang sudah ada (hotspot → object-position, `urlFor` build-time), sama seperti `cover`/`image` di fungsi resolve lain.
  - Dokumen `null` (belum pernah di-publish) → kembalikan `null`, mengikuti pola `resolveProgram`/`resolveContact`/`resolveSalik`; komponen homepage menangani `null` dengan wajar (lihat poin `App.jsx`/komponen di bawah).
- **`fetch-sanity-content.mjs`**: ditambah query singleton baru (`*[_type == "beranda"][0]{hero{locationBadge, tagline, ctaLabel, backgroundImage, highlights}, programs, stats}`, pola `[0]` sama seperti query singleton lain), memanggil `resolveBeranda`, menambah key `beranda` ke `sanityContent.json`. Tambahkan warning `console.warn` bila dokumen belum pernah di-publish, mengikuti pola warning `profilSurau`/`programs`/`contact`/`salik` yang sudah ada.
- **`App.jsx`**: `rawData` digabung dengan hasil `resolveBeranda` sebelum dipanggil ke `deriveSiteData` — pola sama persis dengan key lain (mis. `hero: sanityContent.beranda?.hero`, `programs: sanityContent.beranda?.programs`, `stats: sanityContent.beranda?.stats`, atau diteruskan sebagai satu object `beranda` lalu dipecah di `deriveSiteData.js` — detail final diserahkan ke implementer, selama `site.hero`/`site.programs`/`site.stats` yang diterima komponen tetap bentuk yang sama seperti sekarang).
- **`deriveSiteData.js`**: `programs`/`stats` tetap diteruskan apa adanya (tidak berubah dari sekarang: `programs: rawData.programs, stats: rawData.stats`); tambah `hero: rawData.hero` (baru) diteruskan apa adanya juga — tidak ada turunan yang perlu dihitung.
- **`Hero.jsx`**: menerima `site.hero` (bukan lagi hardcode locationBadge/tagline/ctaLabel/backgroundImage/highlights) dan `site.stats`; baris angka jamaah dicari lewat `site.stats.find(s => s.showInHero)` (menggantikan pencocokan teks label `label.toLowerCase().includes('jamaah')` yang rapuh); render aman (tidak crash, baris highlight/angka jamaah cuma tidak tampil) bila `site.hero` `null`/`highlights` kosong/tidak ada stat dengan `showInHero: true`.
- **`ProgramsSection.jsx`**: tidak berubah struktur — tetap mengonsumsi `site.programs` dalam bentuk yang sama (`icon`/`title`/`desc`/`meta`), cuma sumber datanya kini dari Sanity lewat `deriveSiteData`, bukan langsung dari `SB_DATA`.
- **`StatsSection.jsx`**: tidak berubah — tetap mengonsumsi `site.stats` (`icon`/`value`/`label`) apa adanya; field baru `showInHero` diabaikan komponen ini (dipakai Hero saja).
- **Migrasi konten existing**: skrip satu-kali (`scripts/migrate-beranda-to-sanity.mjs`, dijalankan manual, `--dry-run` dulu lalu `--write`, mengikuti pola skrip migrasi Fase 1–3 — dibuang setelah dipakai, tidak disimpan permanen di repo) yang membaca `SB_DATA.programs`/`SB_DATA.stats` di `sourceData.js`, dan menuliskan nilai Hero yang sekarang hardcode di `Hero.jsx` (badge lokasi, tagline, label CTA "Lihat Agenda", dua baris highlight) sebagai nilai awal field `hero`, lalu upload sebagai satu dokumen `beranda` (`_id: 'beranda'`) ke dataset `production`. Foto background (`foto-surau.jpg`, saat ini asset yang di-bundle di kode) diunggah sebagai asset Sanity lewat `client.assets.upload`, pola yang sama dipakai skrip migrasi galeri Fase 1. Item Statistik yang ditandai `showInHero: true` adalah item berlabel "Jamaah rutin" (sesuai perilaku `Hero.jsx` sekarang).
- **Cutover**: begitu terverifikasi jalan end-to-end di produksi (build log + webhook + rebuild otomatis, pola Fase 1–3), key `programs`/`stats` dihapus dari `sourceData.js` sebagai tiket terpisah, tidak dibiarkan sebagai fallback mati. Asset `foto-surau.jpg` di `design-system/assets/` tidak wajib dihapus dari repo (masih dipakai sebagai referensi desain), tapi import-nya di `Hero.jsx` dihapus.

## Testing Decisions

- `resolveBeranda` ditest dengan fixture objek GROQ-shaped (dokumen palsu `beranda`) → dibandingkan terhadap bentuk output yang diharapkan, mengikuti pola persis `resolveProgram.test`/`resolveContact.test`/`resolveSalik.test` yang sudah ada di `resolveSanityContent.test.js`.
- Kasus wajib diuji:
  - `resolveBeranda` mengembalikan bentuk yang tepat untuk dokumen dengan `highlights`/`programs`/`stats` terisi maupun kosong (array kosong/`undefined` tidak error, selalu jadi `[]`).
  - `resolveBeranda` meresolve `hero.backgroundImage` lewat `resolveImage` (url + object-position dari hotspot), sama seperti test `resolveImage` yang sudah ada untuk field image lain.
  - `resolveBeranda` meneruskan `showInHero` per item `stats` apa adanya (`true`/`false`/`undefined` → `false`).
  - `resolveBeranda(urlFor, null)`/`resolveBeranda(urlFor, undefined)` mengembalikan `null`.
- Test baru/diperbarui di level komponen (`Hero.jsx`, kalau ada test-nya) untuk memverifikasi: highlight Hero merender dari `site.hero.highlights` bukan hardcode, dan pencarian angka jamaah pakai `stats.find(s => s.showInHero)` bukan pencocokan teks label — pastikan test lama yang mengasumsikan pencocokan label lama (bila ada) diperbarui, bukan dihapus diam-diam.
- `deriveSiteData.js` — cukup tambah assersi bahwa `hero` diteruskan apa adanya dari `rawData.hero` (pola sama seperti assersi `programs`/`stats` yang sudah ada di `deriveSiteData.test.js`, bila ada).
- Skrip migrasi satu-kali tidak wajib ditest otomatis (dijalankan sekali, dibuang setelah dipakai), tapi wajib dijalankan `--dry-run` dulu sebelum `--write` ke dataset produksi, dan wajib diverifikasi manual bahwa upload asset foto background berhasil dan ter-link benar ke dokumen `beranda`.
- `fetch-sanity-content.mjs` (I/O nyata ke Sanity) tidak ditest lewat unit test — verifikasi lewat build nyata (dev server lokal dulu, lalu end-to-end produksi lewat webhook, pola Fase 1–3).

## Out of Scope

- Migrasi tipe konten selain yang disebut di sini — silsilah, `location`, `donation` (termasuk `qris`/`bank`) — fase terpisah menyusul, urutan sesuai catatan rencana ADR 0013.
- `VerseSection` (kutipan ayat Beranda) — diputuskan tetap di kode (bukan konten yang berubah-ubah), tidak jadi field Sanity di fase ini.
- Mengubah tujuan navigasi tombol CTA Hero jadi field editorial (mis. dropdown halaman tujuan) — tetap hardcode di kode, hanya label tombolnya yang jadi field.
- Mengubah judul "Surau Bateh Lori" jadi field editorial — tetap hardcode.
- Membatasi jumlah maksimum item `programs` (layout kartu sudah wrap otomatis ke baris baru, tidak ada validasi `Rule.max()` yang membatasi jumlah kartu).
- Upgrade field teks (`tagline`, `desc`, dll.) ke Portable Text — tetap string/text polos, konsisten dengan pola Fase 3.
- Perubahan visual/UI apa pun pada `Hero`/`ProgramsSection`/`StatsSection` — tampilan harus identik dengan sekarang.
- Draft/approval workflow sebelum publish, dataset staging/preview terpisah — mengikuti keputusan lintas-fase yang sudah ada sejak Fase 1.

## Further Notes

- Keputusan-keputusan di spec ini berasal dari sesi grilling (skill `grilling` + `domain-modeling`) yang melanjutkan roadmap ADR [0013](../../docs/adr/0013-seluruh-konten-sumber-data-migrasi-ke-sanity.md) — item `programs`/`stats` sudah eksplisit disebut ADR 0013 sebagai fase berikutnya setelah Fase 3. Migrasi teks Hero (badge lokasi, tagline, label CTA, highlight) adalah **perluasan** di luar penyebutan literal ADR 0013 (yang menyebut "hero" hanya untuk konteks perluasan `profilSurau`/Halaman Profil Surau, bukan Hero Beranda) — disepakati eksplisit dalam sesi grilling ini karena teks Hero saat ini hand-edited di kode (`Hero.jsx`), sejalan semangat ADR 0013 "seluruh konten yang masih hand-edited pindah ke Sanity".
- Nama schema type (`beranda`) dan nama fungsi resolve (`resolveBeranda`)/skrip migrasi bersifat indikatif — keputusan final ada di tangan agen implementasi, selama bentuk dan tanggung jawabnya sesuai spec ini dan pola yang sudah dipakai fungsi resolve lain di modul yang sama.
- Prior art detail (mekanisme singleton generik `SINGLETONS` di `sanity.config.ts`, pola skrip migrasi `--dry-run`/`--write`, pola upload asset foto lokal ke Sanity, pola `options.list` icon terkurasi) ada di `.scratch/cms-migration-sanity/` (Fase 1), `.scratch/jadwal-pengumuman-via-sanity/` (Fase 2), dan `.scratch/halaman-program-kontak-salik-via-sanity/` (Fase 3) — pola yang sama harus diikuti, bukan didesain ulang dari nol.
- Setelah implementasi fase ini selesai dan cutover terverifikasi, entri glosarium "Sumber Data" dan "Dataset Sanity" di `CONTEXT.md` perlu diperbarui untuk mencatat tipe dokumen baru (`beranda`) dan field yang sudah dihapus dari `sourceData.js` — mengikuti pola pembaruan yang sama seperti setelah Fase 1–3 (bukan bagian dari spec ini, dilakukan saat cutover).
