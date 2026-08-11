# Scroll Reveal — Efek Muncul Halus saat Scroll di Beranda

Status: done

## Problem Statement

Saat pengunjung men-scroll halaman Beranda, semua section (Programs, Gallery, Verse, Agenda, Stats) langsung tampil statis begitu masuk viewport — tidak ada transisi apa pun antara "belum terlihat" dan "terlihat". Pengalaman scroll terasa datar dibanding situs modern pada umumnya, yang biasanya punya sedikit "kehidupan" saat konten baru muncul ke layar.

Di sisi lain, guideline motion yang sudah difinalkan di design system (`New Surau Bateh Lori Design System/guidelines/motion.html`) secara eksplisit menyatakan "tidak ada pantulan atau animasi masuk yang mencolok" — jadi solusinya harus sangat halus, bukan efek reveal yang umum dipakai (slide besar, scale, bounce, dsb.), supaya tetap sejalan dengan bahasa desain yang sudah ada.

## Solution

Section-section di Beranda (di bawah Hero) fade-in secara halus — opacity dari 0 ke 1 disertai pergeseran vertikal kecil (8px) — begitu section itu pertama kali masuk viewport saat di-scroll. Hero dikecualikan karena sudah terlihat penuh saat halaman pertama dibuka (tidak ada momen "scroll masuk viewport" yang relevan). Efek ini dibungkus dalam satu komponen reusable (`Reveal`) di situs production, dipakai membungkus lima section Beranda. Untuk pengguna dengan `prefers-reduced-motion: reduce`, konten langsung tampil penuh tanpa animasi apa pun. Guideline motion di design system diberi catatan singkat yang mendokumentasikan pengecualian halus ini secara sadar.

## User Stories

1. Sebagai pengunjung situs yang membuka Beranda dan mulai men-scroll ke bawah, saya ingin melihat section `ProgramsSection` muncul dengan fade halus (bukan langsung "meloncat" tampil), sehingga transisi antar section terasa lebih hidup.
2. Sebagai pengunjung situs yang terus men-scroll, saya ingin `GallerySection`, `VerseSection`, `AgendaSection`, dan `StatsSection` masing-masing juga fade-in dengan cara yang sama saat pertama kali masuk viewport.
3. Sebagai pengunjung situs yang membuka Beranda, saya ingin `Hero` tetap tampil penuh seketika tanpa efek fade apa pun, karena section ini sudah terlihat begitu halaman dimuat — tidak ada momen scroll-masuk-viewport untuk dia.
4. Sebagai pengunjung situs yang sudah men-scroll melewati sebuah section (sudah pernah fade-in), lalu men-scroll ke atas dan ke bawah lagi melewati section yang sama, saya ingin section itu tetap terlihat penuh tanpa fade ulang / kedip, sehingga scroll bolak-balik tidak terasa mengganggu.
5. Sebagai pengunjung situs yang mengaktifkan pengaturan "reduce motion" di perangkat/browser-nya, saya ingin semua section langsung tampil penuh tanpa animasi apa pun, sehingga situs tetap nyaman diakses sesuai preferensi aksesibilitas saya.
6. Sebagai pengunjung situs di perangkat mobile, saya ingin efek fade ini bekerja sama halusnya saat scroll dengan sentuhan (touch scroll), sama seperti di desktop.
7. Sebagai pengunjung yang membuka halaman Jadwal Shalat, Kajian, Infak, Profil, atau Kontak, saya ingin section-section di halaman itu **tidak** ikut fade — efek ini cuma berlaku di Beranda pada iterasi ini.
8. Sebagai pengunjung yang mengklik foto galeri (fitur lightbox yang sudah ada) di `GallerySection` yang baru saja fade-in, saya ingin modal lightbox tetap terbuka dan berperilaku sama seperti sebelumnya — efek reveal tidak mengganggu interaksi lain yang sudah ada di section itu.
9. Sebagai pengunjung yang membuka modal konfirmasi donasi di `DonatePage` (fitur lama, tidak terkait), saya ingin perilaku modal itu sama sekali tidak berubah oleh fitur ini.
10. Sebagai maintainer situs yang membaca `New Surau Bateh Lori Design System/guidelines/motion.html`, saya ingin melihat catatan yang menjelaskan bahwa reveal-on-scroll halus ini adalah pengecualian yang disengaja (dengan batas opacity+translateY≤8px, tanpa bounce/scale), sehingga saya tidak salah paham ini sebagai pelanggaran guideline yang tidak disadari.
11. Sebagai pengurus situs yang mengedit `sourceData.js` (Sumber Data), saya tidak perlu mengubah field data apa pun untuk fitur ini — efek reveal murni presentasional, tidak bergantung pada konten section.
12. Sebagai developer yang nanti ingin menambahkan efek reveal yang sama ke section/halaman lain, saya ingin ada satu komponen wrapper reusable (`Reveal`) yang tinggal dipakai membungkus elemen apa pun, tanpa perlu menulis ulang logika `IntersectionObserver`.

## Implementation Decisions

- **Komponen baru `Reveal`**: dibuat di `site/src/components/` (situs production), bukan di folder design system (`New Surau Bateh Lori Design System/` maupun snapshot-nya di `site/src/design-system/`). Efek ini adalah perilaku scroll-trigger spesifik ke halaman panjang situs production, bukan bagian visual dari komponen design system — jadi tidak melewati alur `npm run sync-ds` (lihat ADR 0003-site-vendors-design-system-snapshot).
- **Pemakaian**: `Reveal` membungkus lima section di `HomePage.jsx` — `ProgramsSection`, `GallerySection`, `VerseSection`, `AgendaSection`, `StatsSection`. `Hero` tidak dibungkus.
- **Teknik**: `IntersectionObserver` native (tanpa dependency animasi baru seperti framer-motion). Observer di-unobserve setelah elemen pertama kali terlihat (reveal sekali per elemen, tidak berulang).
- **Granularitas**: reveal per-section sebagai satu blok utuh — bukan stagger per-item di dalam grid (kartu program, foto galeri, kartu agenda, angka statistik tetap muncul bersamaan sebagai bagian dari section-nya, bukan satu-satu).
- **Resep visual**: `opacity: 0 → 1` dan `transform: translateY(8px) → translateY(0)`, transisi `var(--dur-slow)` (420ms) dengan `var(--ease-standard)` — token motion yang sudah ada di `New Surau Bateh Lori Design System/tokens/motion.css` / `site/src/design-system/tokens/motion.css`. Tidak ada scale, tidak ada bounce.
- **`prefers-reduced-motion`**: saat media query ini aktif, elemen langsung tampil penuh (opacity 1, tanpa transform/transisi) — tidak ada fallback "animasi dipercepat", langsung tanpa animasi sama sekali.
- **Dokumentasi guideline**: tambahkan satu baris catatan di `New Surau Bateh Lori Design System/guidelines/motion.html` yang menjelaskan pengecualian ini (subtle reveal-on-scroll diizinkan dengan batas opacity+translateY≤8px, tanpa bounce/scale), supaya tidak dibaca sebagai pelanggaran guideline "tidak ada animasi masuk yang mencolok" yang sudah ada di dokumen yang sama.
- **Skema data**: tidak ada perubahan pada `sourceData.js` atau `deriveSiteData.js`.

## Testing Decisions

- Repo ini belum memiliki harness test komponen (tidak ada React Testing Library/jsdom di `site/package.json`); test otomatis yang ada (`prayerTimeCalculator.test.js`, `deriveSiteData.test.js`) hanya menguji fungsi murni di `site/src/lib/`, dan preseden fitur UI sebelumnya (`.scratch/photo-lightbox/spec.md`) juga tidak menambahkan test otomatis untuk perubahan murni presentasional.
- Fitur ini murni UI/CSS ditambah satu `IntersectionObserver` per elemen `Reveal` — tidak ada logika non-trivial (kalkulasi, transformasi data) yang layak diekstrak menjadi fungsi murni yang testable secara terisolasi.
- Keputusan: **tidak menambahkan test otomatis baru**, konsisten dengan cakupan test repo saat ini. Verifikasi dilakukan manual/visual lewat dev server (`npm run dev` di `site/`): buka Beranda → scroll perlahan dari atas → tiap section fade-in halus sekali saat pertama masuk viewport → scroll naik-turun lagi memastikan tidak fade ulang → aktifkan reduce-motion di OS/browser, reload, pastikan semua section tampil instan tanpa animasi → cek halaman lain (Jadwal Shalat, Kajian, Infak, Profil, Kontak) tidak terpengaruh → cek lightbox galeri dan modal konfirmasi donasi tetap berfungsi normal.
- Menambahkan infra test komponen (React Testing Library) secara eksplisit **di luar scope**.

## Out of Scope

- Efek reveal di halaman selain Beranda (Jadwal Shalat, Kajian, Infak, Profil, Kontak) — bisa jadi iterasi berikutnya kalau dibutuhkan, tapi tidak dibangun sekarang.
- Stagger per-item di dalam grid/list (kartu program, foto galeri, kartu agenda, angka statistik muncul satu-satu dengan delay).
- Efek reveal pada `Hero`.
- Perubahan pada `New Surau Bateh Lori Design System/` di luar satu baris catatan dokumentasi di `motion.html` (tidak ada token baru, tidak ada komponen design system baru).
- Menambahkan animation library (framer-motion atau sejenisnya).
- Dukungan animasi "reveal ulang" tiap kali elemen keluar-masuk viewport.
- Perubahan skema `sourceData.js`/`deriveSiteData.js`.
- Infra test komponen (React Testing Library/jsdom) untuk repo secara umum.

## Further Notes

- Ini adalah pengecualian sadar terhadap kalimat eksplisit "tidak ada pantulan atau animasi masuk yang mencolok" di `New Surau Bateh Lori Design System/guidelines/motion.html` — dibahas dan disepakati lewat sesi grilling sebelum spec ini ditulis (lihat riwayat percakapan). Batasannya ketat: opacity + translateY kecil saja, sekali per elemen, hormat `prefers-reduced-motion`, tanpa scale/bounce.
- Seam pengujian: karena tidak ada logika non-trivial yang bisa diuji terisolasi (murni CSS transition + satu `IntersectionObserver` hook), tidak ada seam otomatis yang diusulkan — verifikasi manual di dev server adalah satu-satunya "seam" untuk fitur ini, konsisten dengan preseden `photo-lightbox`.
