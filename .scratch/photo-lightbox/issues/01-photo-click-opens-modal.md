# 01 — Klik foto buka modal full image + deskripsi

**What to build:** Semua foto ditampilkan lewat `PhotoTile` (dipakai di `GallerySection` pada beranda, dan tiga foto di `ProfilePage`) menjadi bisa diklik. Klik pada sebuah foto membuka modal yang menampilkan foto tersebut dalam ukuran penuh (mengikuti rasio asli, tidak terpotong/tidak terdistorsi, dibatasi terhadap ukuran viewport), beserta label kategori (`meta`) dan deskripsi (`caption`) foto itu sebagai teks yang mudah dibaca. Modal ditutup lewat tombol close (ikon `x`) atau dengan mengklik area backdrop di luar gambar. Modal ini adalah komponen baru dan terpisah dari `Dialog` yang sudah ada — modal konfirmasi donasi di halaman Infak (`DonatePage`) harus tetap berperilaku persis seperti sekarang, tidak berubah sedikit pun.

Detail keputusan implementasi, daftar user story, dan hal-hal yang di luar scope ada di spec: `.scratch/photo-lightbox/spec.md`. Baca spec itu secara penuh sebelum mulai — jangan berasumsi dari ringkasan tiket ini saja.

**Blocked by:** None — can start immediately

**Status:** done

- [ ] Semua `PhotoTile` di `GallerySection` (galeri beranda) bisa diklik dan membuka modal foto yang sesuai.
- [ ] Semua `PhotoTile` di `ProfilePage` (pembangunan surau, gotong royong, pengurus) bisa diklik dan membuka modal foto yang sesuai.
- [ ] Modal menampilkan gambar dengan `object-fit: contain`, dibatasi max-width/max-height viewport, sehingga foto dengan rasio apa pun (4/3, 4/5, 16/9, 16/7, dst.) tampil utuh tanpa distorsi maupun terpotong.
- [ ] Modal menampilkan `meta` (label kategori) dan `caption` (deskripsi) dari foto yang diklik; jika salah satu atau keduanya tidak ada pada foto tersebut, blok teks terkait tidak dirender (tidak ada whitespace kosong yang janggal).
- [ ] Modal bisa ditutup lewat tombol X.
- [ ] Modal bisa ditutup lewat klik pada area backdrop (di luar gambar/kartu modal).
- [ ] Tidak ada navigasi prev/next antar foto di dalam modal — satu foto per buka.
- [ ] Tidak ada dukungan tombol Escape atau navigasi keyboard (Tab/Enter/Space) untuk membuka/menutup modal di iterasi ini.
- [ ] State buka/tutup modal dikelola secara lokal di dalam `PhotoTile` itu sendiri — `GallerySection` dan `ProfilePage` tidak perlu tahu apa pun tentang modal ini.
- [ ] Semua `PhotoTile` bisa diklik secara default, tanpa prop opt-out.
- [ ] `Dialog.jsx` tidak diubah sama sekali; modal konfirmasi donasi di `DonatePage` diverifikasi masih berperilaku sama seperti sebelum perubahan ini (regresi check manual).
- [ ] Tidak ada perubahan pada `sourceData.js` atau `deriveSiteData.js` — field `alt`/`caption`/`meta` yang sudah ada dipakai apa adanya.
- [ ] Tidak ada test otomatis baru ditambahkan (sesuai keputusan testing di spec) — verifikasi dilakukan manual lewat dev server: klik foto di beranda dan Profil → modal muncul dengan gambar+deskripsi yang benar → tutup via X → buka lagi → tutup via backdrop → cek modal konfirmasi donasi tidak berubah.

