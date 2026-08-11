# 02 — Jadwal "Hari ini" dihitung otomatis, ujung ke ujung

**What to build:** Alur lengkap dari perhitungan sampai tampilan untuk tab "Hari ini" di halaman Jadwal Salat: skrip build-time yang menghasilkan dataset jadwal ±1 tahun ke depan (memakai kalkulator dari ticket 01), Sumber Data (`sourceData.js`) yang tidak lagi menyimpan jam adzan hand-typed, dan halaman Jadwal Salat yang menampilkan jam hasil hitung hari ini — termasuk indikator "sedang berlangsung"/"berikutnya" dan layar TV countdown yang sudah ada, tetap bekerja tanpa perubahan perilaku dari sudut pandang pengunjung selain jamnya kini akurat per tanggal.

**Blocked by:** 01 — Kalkulator jam salat metode Kemenag.

**Status:** ready-for-agent

- [ ] Skrip build-time (nama indikatif `generate-prayer-times.mjs`, mengikuti pola `scripts/sync-design-system.mjs`) memanggil kalkulator dari ticket 01 berulang untuk kira-kira 1 tahun ke depan dari tanggal skrip dijalankan, dan menulis hasilnya ke berkas hasil generate di dalam `site/src/` (bisa diimpor Vite).
- [ ] Berkas hasil generate ditambahkan ke `site/.gitignore` — tidak ikut ter-commit.
- [ ] Skrip generate dijalankan otomatis sebagai bagian dari `npm run build` (tidak ada langkah manual tambahan bagi pengurus atau CI).
- [ ] Skrip gagal jelas (exit non-zero) bila koordinat tidak tersedia atau perhitungan gagal — build tidak boleh lanjut dengan data kosong/salah secara diam-diam.
- [ ] `sourceData.js`: field `times` (array hand-typed) dihapus. Field baru `location: { latitude, longitude }` (nilai awal koordinat Surau Bateh Lori: −0.8317255, 100.4060905) dan `iqamahOffsets: { Subuh, Dzuhur, Ashar, Maghrib, Isya }` dalam menit (Syuruq tidak punya iqamah). Nilai awal offset diturunkan dari selisih adzan/iqamah pada tabel `times` lama sebelum dihapus, supaya tampilan iqamah tidak berubah drastis.
- [ ] `deriveSiteData` menerima dataset hasil generate, mencari entri hari ini berdasarkan tanggal `now`, dan membentuk `times` (bentuk existing `[{name, adzan, iqamah?}]`, urutan Subuh–Syuruq–Dzuhur–Ashar–Maghrib–Isya) dengan `iqamahOffsets` dari Sumber Data diterapkan per nama salat.
- [ ] Logika `activePrayerName`/`nextPrayerName` yang sudah ada tetap bekerja benar, memakai `times` hasil turunan baru ini.
- [ ] Bila tanggal yang dibutuhkan tidak ada di dataset (dataset kadaluarsa/skrip gagal diam-diam), ini diperlakukan sebagai bug integritas build, bukan fallback runtime senyap — perilaku dan tesnya diputuskan eksplisit oleh pengerja ticket.
- [ ] Tab "Hari ini" di `SchedulePage.jsx`, indikator waktu shalat berlangsung/berikutnya, dan hitung mundur layar TV surau semuanya menampilkan jam hasil hitung untuk tanggal hari ini saat situs dibuka.
- [ ] Disclaimer kecil ditambahkan di dekat `SectionHeading` halaman Jadwal Salat, memakai token tipografi kecil/muted yang sudah ada, naskah: *"Dihitung otomatis mengikuti metode Kementerian Agama RI (sudut fajar −20°, isya −18°, mazhab Syafi'i untuk Ashar, dengan ihtiyat)."*
- [ ] Tes `deriveSiteData` diperluas: `times` hari ini bersumber benar dari entri dataset yang cocok + `iqamahOffsets` diterapkan per nama salat (Syuruq dikecualikan); dataset hasil generate dipakai sebagai fixture langsung di tes (tidak dihitung ulang oleh kalkulator ticket 01).
