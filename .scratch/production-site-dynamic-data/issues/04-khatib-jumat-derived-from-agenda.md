# 04 — Kartu Khatib Jumat diturunkan dari agenda

**What to build:** `deriveSiteData` menurunkan `khatibJumat` dari `events` di Sumber Data — mengambil entri berkategori "Jumat" yang terdekat — bukan field terpisah yang diisi manual. Kartu "Khatib Jumat" di halaman Jadwal Salat memakai hasil turunan ini, sehingga pengurus cukup mengisi entri di `events` sekali, tidak dobel di dua tempat.

**Blocked by:** 01 — Situs produksi tayang di GitHub Pages dengan navigasi penuh, konten dari Sumber Data

**Status:** ready-for-agent

- [ ] `deriveSiteData` menghasilkan `khatibJumat` dari `events` berkategori "Jumat" terdekat
- [ ] Kartu Khatib Jumat di halaman Jadwal Salat memakai hasil turunan ini
- [ ] Tidak ada field terpisah untuk Khatib Jumat di Sumber Data
- [ ] Unit test: ada entri "Jumat" yang tepat terpilih saat beberapa entri "Jumat" ada di `events`
- [ ] Unit test: tidak ada entri berkategori "Jumat" di `events` → ditangani dengan wajar (tanpa error)
