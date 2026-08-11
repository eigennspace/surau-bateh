# 01 — Scroll reveal halus di section Beranda

**What to build:** Section-section di Beranda (di bawah Hero) fade-in secara halus — opacity 0→1 disertai pergeseran vertikal kecil (translateY 8px→0) — begitu section itu pertama kali masuk viewport saat pengunjung men-scroll. Efek dibungkus dalam satu komponen reusable `Reveal` di situs production, dipasang membungkus lima section Beranda (`ProgramsSection`, `GallerySection`, `VerseSection`, `AgendaSection`, `StatsSection`). `Hero` dikecualikan — sudah terlihat penuh saat halaman dimuat. Reveal terjadi sekali per elemen (tidak fade ulang saat scroll bolak-balik). Pengguna dengan `prefers-reduced-motion: reduce` melihat semua section tampil instan tanpa animasi. Guideline motion di design system (`New Surau Bateh Lori Design System/guidelines/motion.html`, yang saat ini menyatakan "tidak ada pantulan atau animasi masuk yang mencolok") diberi satu baris catatan yang mendokumentasikan pengecualian halus ini secara sadar.

**Blocked by:** None — can start immediately

**Status:** done

- [x] Komponen `Reveal` baru dibuat di `site/src/components/` (situs production) — **bukan** di `New Surau Bateh Lori Design System/` maupun snapshot-nya di `site/src/design-system/`; tidak melewati alur `npm run sync-ds`.
- [x] `Reveal` menggunakan `IntersectionObserver` native (tanpa dependency animasi baru) dan meng-unobserve elemen setelah pertama kali terlihat.
- [x] `HomePage.jsx` membungkus `ProgramsSection`, `GallerySection`, `VerseSection`, `AgendaSection`, `StatsSection` masing-masing dengan `Reveal` (satu `Reveal` per section, bukan stagger per-item di dalam grid). `Hero` tidak dibungkus.
- [x] Transisi visual: `opacity: 0 → 1` dan `transform: translateY(8px) → translateY(0)`, durasi `var(--dur-slow)` (420ms), easing `var(--ease-standard)` — memakai token yang sudah ada di `site/src/design-system/tokens/motion.css`. Tidak ada scale/bounce.
- [x] Saat `prefers-reduced-motion: reduce` aktif, elemen tampil langsung (opacity 1, tanpa transform/transisi) — tanpa animasi sama sekali, bukan animasi dipercepat.
- [x] Scroll naik-turun berulang melewati section yang sudah pernah reveal tidak memicu fade ulang / kedip (observer di-unobserve setelah reveal pertama).
- [x] Halaman lain (Jadwal Shalat, Kajian, Infak, Profil, Kontak) tidak terpengaruh — tidak ada `Reveal` dipasang di sana pada iterasi ini.
- [x] Lightbox foto di `GallerySection` dan modal konfirmasi donasi di `DonatePage` tetap berfungsi normal setelah perubahan (regresi check — `Reveal` hanya membungkus section dari luar, tidak menyentuh state/DOM internal komponen anak).
- [x] Satu baris catatan ditambahkan di `New Surau Bateh Lori Design System/guidelines/motion.html` menjelaskan pengecualian: subtle reveal-on-scroll diizinkan dengan batas opacity+translateY≤8px, tanpa bounce/scale. Tidak ada token motion baru, tidak ada komponen design system baru.
- [x] Tidak ada perubahan pada `sourceData.js` atau `deriveSiteData.js`.
- [x] Tidak ada test otomatis baru ditambahkan (konsisten dengan cakupan test repo saat ini — lihat spec.md § Testing Decisions); verifikasi dilakukan manual lewat `npm run dev` + inspeksi DOM (opacity/transform per section terhadap posisi scroll).

