Status: done

# Jadwal Salat Dihitung Otomatis (Metode Kemenag)

## Problem Statement

Jam adzan di Sumber Data ([site/src/data/sourceData.js](../../site/src/data/sourceData.js)) sekarang di-hand-type oleh pengurus, dan cepat basi — jam salat bergeser tiap hari mengikuti posisi matahari, tapi berkas ini cuma punya satu baris waktu per salat, tanpa tanggal. Tabel "Pekan ini" di halaman Jadwal Salat ([SchedulePage.jsx](../../site/src/pages/SchedulePage.jsx)) bahkan bukan data 7 hari yang sungguhan — cuma trik interpolasi dari jadwal hari ini (sengaja ditandai di kode sebagai di luar cakupan pekerjaan sebelumnya). Pengurus tidak mau (dan tidak realistis) mengetik ulang jam adzan tiap hari secara manual.

## Solution

Jam adzan dihitung otomatis mengikuti metode resmi Kementerian Agama RI (sudut fajar −20°, isya −18°, mazhab Syafi'i untuk Ashar, ihtiyat resmi Kemenag), berdasarkan koordinat Surau Bateh Lori, Kota Padang. Perhitungan berjalan saat build/CI (bukan di browser pengunjung), menghasilkan rentang data ±1 tahun ke depan yang di-bundle ke situs — sehingga halaman "Hari ini" dan "Pekan ini" (7 hari bergulir) sama-sama menampilkan jam asli hasil hitung, bukan lagi trik offset. Sumber Data (`sourceData.js`) tidak lagi menyimpan jam adzan — hanya koordinat lokasi dan offset iqamah per salat (kebijakan lokal, tetap hand-typed karena Kemenag tidak mendefinisikan iqamah). Halaman Jadwal Salat mendapat disclaimer singkat menjelaskan metode ini ke pengunjung. Keputusan ini mempersempit batas ADR `0001-static-site-hand-edited-data-file` — dicatat sebagai ADR baru.

## User Stories

1. Sebagai pengurus surau, saya ingin jam adzan dihitung otomatis mengikuti metode Kemenag, sehingga saya tidak perlu mengetik ulang jam salat tiap hari.
2. Sebagai pengunjung situs, saya ingin melihat jadwal salat hari ini yang akurat untuk koordinat Surau Bateh Lori, Kota Padang.
3. Sebagai pengunjung situs, saya ingin tabel "Pekan ini" menampilkan 7 hari nyata ke depan dengan jam yang benar-benar dihitung per tanggal, bukan perkiraan interpolasi.
4. Sebagai pengurus surau, saya ingin offset iqamah tiap salat (mis. "+12 menit" setelah adzan) tetap bisa saya atur manual di Sumber Data, sehingga kebiasaan lokal surau tidak berubah walau jam adzan dihitung otomatis.
5. Sebagai maintainer situs, saya ingin logika astronomi (posisi matahari, sudut Kemenag) terisolasi di satu fungsi murni, sehingga bisa diuji terpisah dari logika tampilan dan dari skrip build.
6. Sebagai maintainer situs, saya ingin data jadwal ±1 tahun ke depan digenerate otomatis tiap `npm run build`/deploy, sehingga tidak ada langkah manual yang bisa lupa dijalankan pengurus.
7. Sebagai maintainer situs, saya ingin berkas hasil generate tidak ikut di-commit (di-gitignore), sehingga tidak ada data turunan yang berpotensi basi tersimpan di riwayat git.
8. Sebagai pengunjung situs, saya ingin ada keterangan singkat di halaman Jadwal Salat yang menjelaskan bahwa jadwal dihitung memakai metode Kemenag, sehingga saya tahu dasar angkanya.
9. Sebagai maintainer situs, saya ingin ada ADR baru yang mendokumentasikan bahwa jam adzan kini dihitung, bukan lagi bagian dari Sumber Data yang diedit tangan, sehingga keputusan ini tidak jadi asumsi diam-diam bagi kontributor berikutnya.
10. Sebagai maintainer situs, saya ingin build gagal secara jelas kalau proses generate jadwal gagal atau data untuk tanggal yang dibutuhkan tidak ditemukan, sehingga situs tidak pernah tayang dengan jadwal salat yang kosong/salah secara diam-diam.
11. Sebagai pengunjung situs, saya ingin indikator "waktu shalat berlangsung" dan "waktu shalat berikutnya" tetap bekerja benar dengan jam hasil hitung, persis seperti perilakunya sekarang dengan jam hand-typed.
12. Sebagai pengurus surau, saya ingin layar TV surau (hitung mundur yang sama dengan halaman Jadwal Salat) ikut menampilkan jam hasil hitung otomatis ini tanpa perubahan terpisah.
13. Sebagai pengunjung situs, saya ingin waktu Dzuhur otomatis terkoreksi mendekati waktu istiwa (zawal) mengikuti musim, tanpa pengurus perlu koreksi manual.
14. Sebagai maintainer situs, saya ingin fungsi perhitungan menerima koordinat + tanggal sebagai parameter (bukan koordinat Padang di-hardcode di dalam fungsi), sehingga logikanya bisa dipakai ulang bila koordinat surau perlu direvisi, tanpa menulis ulang fungsi.
15. Sebagai pengurus surau, saya ingin field koordinat lokasi tetap ada di Sumber Data dan mudah diubah, kalau-kalau koordinat perlu direvisi/dikoreksi di kemudian hari.
16. Sebagai pengunjung situs, saya ingin label hari di tabel "Pekan ini" menampilkan nama hari + tanggal asli (bukan teks hardcode seperti sekarang), sesuai kalender sungguhan.
17. Sebagai maintainer situs, saya ingin `sourceData.js` tidak lagi berisi jam adzan hardcode sama sekali, sehingga tidak ada dua sumber kebenaran (data hand-typed vs data hasil generate) yang bisa saling bertentangan.
18. Sebagai pengurus surau, saya ingin proses update konten situs tetap sesederhana sekarang (edit Sumber Data bila perlu → push → deploy), tanpa langkah manual tambahan untuk memperbarui jadwal salat.
19. Sebagai maintainer situs, saya ingin rentang data yang digenerate cukup panjang (≥1 tahun) supaya situs tidak pernah kehabisan tanggal yang tersedia di antara dua kali deploy, walau deploy jarang terjadi.
20. Sebagai pengunjung situs, saya ingin waktu Syuruq tetap tampil sebagai info (tanpa iqamah), konsisten dengan struktur data salat yang sudah ada sekarang.
21. Sebagai maintainer situs, saya ingin nilai awal offset iqamah di Sumber Data diturunkan dari selisih adzan/iqamah pada tabel hand-typed yang ada sekarang, sehingga tampilan iqamah tidak berubah drastis saat cutover ke sistem baru.

## Implementation Decisions

- **Seam baru — kalkulator murni**: modul baru (nama indikatif `site/src/lib/prayerTimeCalculator.js`) mengekspor fungsi murni `computePrayerTimes({ latitude, longitude, date })` yang mengembalikan enam jam (Subuh, Syuruq, Dzuhur, Ashar, Maghrib, Isya) untuk satu tanggal, dihitung dari algoritma posisi matahari standar (NOAA/Meeus). Parameter metode Kemenag (sudut fajar −20°, isya −18°, mazhab Syafi'i untuk Ashar, nilai ihtiyat resmi) di-hardcode di dalam modul — bukan parameter yang bisa diubah dari luar, karena itu bagian dari definisi "metode Kemenag" itu sendiri, bukan konfigurasi surau.
- **Skrip build-time**: skrip baru (nama indikatif `site/scripts/generate-prayer-times.mjs`), mengikuti pola `scripts/sync-design-system.mjs` yang sudah ada. Membaca koordinat lokasi dari `sourceData.js` (atau konfigurasi kecil terpisah yang bisa diimpor tanpa menarik dependency React), memanggil `computePrayerTimes` berulang untuk kira-kira 1 tahun ke depan dari tanggal skrip dijalankan, menulis hasilnya ke berkas hasil generate di dalam `site/src/` (supaya bisa diimpor Vite), dan berkas itu ditambahkan ke `site/.gitignore`.
- **Wiring build**: `site/package.json` — skrip generate dijalankan sebagai bagian dari `npm run build` (mis. `"build": "node scripts/generate-prayer-times.mjs && vite build"`), sehingga CI (`deploy.yml`, yang sudah menjalankan `npm run build`) otomatis mendapat data segar tiap kali situs di-build, tanpa perlu menambah cron/jadwal terpisah.
- **Bentuk data hasil generate**: array entri per tanggal, `{ date: 'YYYY-MM-DD', subuh, syuruq, dzuhur, ashar, maghrib, isya }` — jam adzan mentah saja, tanpa iqamah (iqamah ditambahkan belakangan).
- **Sumber Data (`sourceData.js`)**: field `times` (array hand-typed) dihapus. Field baru: `location: { latitude, longitude }` (nilai awal dari koordinat Surau Bateh Lori: −0.8317255, 100.4060905) dan `iqamahOffsets: { Subuh, Dzuhur, Ashar, Maghrib, Isya }` dalam menit (Syuruq tidak punya iqamah, konsisten dengan struktur sekarang). Nilai awal offset diturunkan dari selisih adzan/iqamah pada tabel `times` yang ada sekarang sebelum dihapus.
- **Seam yang diperluas — `deriveSiteData`**: [deriveSiteData.js](../../site/src/lib/deriveSiteData.js) menerima parameter tambahan berupa dataset hasil generate (nama parameter final ditentukan implementer), dengan tanggung jawab baru:
  - Mencari entri hari ini dari dataset hasil generate berdasarkan tanggal `now`.
  - Membentuk `times` (bentuk existing: `[{name, adzan, iqamah?}]`, urutan Subuh–Syuruq–Dzuhur–Ashar–Maghrib–Isya) dengan menerapkan `iqamahOffsets` dari `rawData` per nama salat (Syuruq tetap tanpa iqamah).
  - Membentuk `week`: array 7 entri berturut-turut mulai hari ini, tiap entri berisi tanggal asli + jam per salat (adzan+iqamah, offset iqamah sama tiap hari karena itu kebijakan tetap, bukan hasil hitung tanggal).
  - Logika `activePrayerName`/`nextPrayerName` yang sudah ada tetap dipakai apa adanya, memakai `times` hasil turunan baru ini sebagai input, bukan lagi `rawData.times` langsung.
  - Kasus tanggal yang dibutuhkan tidak ditemukan di dataset (mis. skrip generate gagal diam-diam, atau dataset kadaluarsa) diperlakukan sebagai bug integritas build — build harus gagal jelas (skrip generate exit non-zero bila jangkauan tanggal tidak mencukupi), bukan ditangani sebagai fallback runtime senyap di `deriveSiteData`.
- **`SchedulePage.jsx`**: array `WEEK` hardcode dan logika interpolasi offset di tabel "Pekan ini" dihapus, diganti render dari `site.week` (data real per hari). Label hari dihitung dari tanggal asli (format singkat konsisten dengan gaya sekarang, mis. "Sen 10"), bukan teks hardcode. Ditambahkan teks disclaimer kecil di dekat `SectionHeading` halaman ini, memakai token tipografi kecil/muted yang sudah ada (mis. `--fs-body-sm`, `--text-muted`), tanpa komponen design-system baru — naskah: *"Dihitung otomatis mengikuti metode Kementerian Agama RI (sudut fajar −20°, isya −18°, mazhab Syafi'i untuk Ashar, dengan ihtiyat)."*
- **ADR baru**: `docs/adr/0004-prayer-times-computed-not-hand-typed.md` (penomoran indikatif) — mendokumentasikan bahwa jam adzan tidak lagi bagian dari Sumber Data yang diedit tangan; dihitung saat build dari lokasi + metode Kemenag lewat kalkulator murni + skrip generate. Hanya lokasi dan offset iqamah yang tetap hand-typed. ADR ini mempersempit (bukan membatalkan) `0001-static-site-hand-edited-data-file`; ADR 0001 tetap ada, ditaut silang.

## Testing Decisions

- Tes hanya menyasar dua seam sebagai unit murni (fixture in, bentuk output diverifikasi — bukan detail internal implementasi), mengikuti prior art [deriveSiteData.test.js](../../site/src/lib/deriveSiteData.test.js).
- **`computePrayerTimes` (kalkulator, tes baru)**:
  - Invarian urutan: untuk kombinasi koordinat/tanggal yang valid, Subuh < Syuruq < Dzuhur < Ashar < Maghrib < Isya sebagai waktu dalam sehari.
  - Minimal satu titik referensi nyata untuk koordinat Surau Bateh Lori pada tanggal tertentu, dibandingkan terhadap angka jadwal Kemenag resmi yang sudah dikonfirmasi (bukan dikarang) dengan toleransi kecil (mis. ±1 menit) — implementer wajib mencari/mengonfirmasi angka referensi ini sebelum menulis assersi, konsisten dengan norma proyek untuk tidak mengarang angka yang belum dikonfirmasi.
  - Kasus tepi tanggal (pergantian tahun 31 Des → 1 Jan) tidak error.
- **`deriveSiteData` (perluasan tes existing)**:
  - `times` hari ini bersumber benar dari entri dataset hasil generate yang cocok + `iqamahOffsets` diterapkan per nama salat (Syuruq dikecualikan dari iqamah).
  - `week` berisi 7 tanggal berurutan mulai hari ini, tiap entri punya offset iqamah yang diterapkan benar; dataset hasil generate dipakai sebagai fixture langsung di tes (bukan dihitung ulang oleh `computePrayerTimes`), supaya tes seam ini tetap tidak bergantung pada astronomi.
  - Perilaku eksplisit saat tanggal yang dibutuhkan tidak ada di dataset fixture (implementer memutuskan bentuknya — melempar error atau fallback aman — dan menulis tes untuk perilaku yang dipilih).
  - Tes `activePrayerName`/`nextPrayerName` yang sudah ada tetap lolos secara semantik, sekarang diberi makan lewat jalur turunan `times` yang baru.
- Tidak ada tes komponen/rendering/browser untuk perubahan `SchedulePage.jsx` — cek visual manual di browser saat implementasi selesai, sesuai kebiasaan proyek, tapi bukan bagian suite otomatis.
- Skrip build-time (`generate-prayer-times.mjs`) tidak punya tes khusus — konsisten dengan `sync-design-system.mjs` yang juga tidak diuji; skrip ini pembungkus I/O tipis di atas `computePrayerTimes` yang sudah diuji.

## Out of Scope

- Perhitungan untuk lokasi selain Surau Bateh Lori — koordinat lain bisa dikonfigurasi lewat Sumber Data, tapi tidak divalidasi/diuji untuk lokasi lain di pekerjaan ini.
- Override manual per tanggal (mis. penyesuaian khusus Ramadhan) — jam adzan 100% dari hasil generate, tidak ada jalur override.
- Cron/jadwal rebuild harian terpisah dari trigger push/manual dispatch yang sudah ada di `deploy.yml`.
- Fitur pengingat/notifikasi adzan (switch di `SchedulePage` tetap UI murni tanpa pengkabelan backend, sama seperti spec sebelumnya).
- Perubahan visual pada komponen design system, di luar disclaimer teks kecil dan konten tabel "Pekan ini" yang sudah disepakati.
- Waktu Imsak atau waktu-waktu tambahan lain di luar enam yang sudah ada (Subuh, Syuruq, Dzuhur, Ashar, Maghrib, Isya).
- Validasi/perbandingan otomatis terhadap API atau situs Kemenag resmi saat runtime — perbandingan referensi hanya dilakukan manual, sekali, saat menulis tes.

## Further Notes

- Keputusan-keputusan di spec ini berasal dari sesi grilling sebelumnya (riwayat percakapan sesi ini).
- ADR terkait: `docs/adr/0001-static-site-hand-edited-data-file.md` (dipersempit oleh spec ini, dicatat lewat ADR baru), `0002` dan `0003` tidak terpengaruh.
- Nama-nama berkas/fungsi/skrip di atas (`prayerTimeCalculator.js`, `generate-prayer-times.mjs`, nama field dataset hasil generate, penomoran ADR `0004`) bersifat indikatif — keputusan final ada di tangan agen implementasi, selama bentuk dan tanggung jawabnya sesuai spec ini.
- Koordinat Surau Bateh Lori: −0.8317255, 100.4060905 (Kota Padang, WIB/UTC+7) — sumber: tautan Google Maps yang dibagikan pengurus di sesi grilling.
