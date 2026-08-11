# Photo Lightbox — Klik Foto untuk Lihat Full + Deskripsi

Status: done

## Problem Statement

Pengunjung situs melihat foto-foto surau (di galeri beranda dan halaman Profil) hanya dalam ukuran kecil di dalam grid/kartu. Foto-foto ini punya cerita di baliknya — label kategori (`meta`) dan kalimat deskripsi (`caption`) — tapi teks itu tampil kecil, tertumpuk di atas gambar sebagai overlay, dan gambarnya sendiri terpotong (`object-fit: cover`) mengikuti rasio kartu. Pengunjung tidak punya cara untuk melihat foto secara utuh atau membaca deskripsinya dengan nyaman.

## Solution

Setiap foto yang ditampilkan lewat `PhotoTile` menjadi bisa diklik. Klik membuka modal yang menampilkan foto dalam ukuran penuh (mengikuti rasio aslinya, tidak terpotong) beserta label kategori dan deskripsinya sebagai teks yang mudah dibaca, terpisah dari overlay di atas gambar. Modal ditutup lewat tombol close atau klik di luar area gambar.

## User Stories

1. Sebagai pengunjung situs di halaman beranda, saya ingin mengklik foto di galeri (Ruang Utama, Kajian Rutin, dst.), sehingga saya bisa melihat foto tersebut dalam ukuran penuh.
2. Sebagai pengunjung situs di halaman beranda, saya ingin melihat deskripsi lengkap foto di dalam modal, sehingga saya paham konteks foto itu tanpa harus menebak dari caption kecil yang tertumpuk di gambar.
3. Sebagai pengunjung situs di halaman Profil, saya ingin mengklik foto pembangunan surau, gotong royong, atau pengurus, sehingga saya bisa melihat foto itu dalam ukuran penuh juga — sama seperti di galeri beranda.
4. Sebagai pengunjung situs, saya ingin melihat foto potret (rasio 4/5) maupun foto lanskap lebar (rasio 16/7) sama-sama utuh di dalam modal (tidak terdistorsi, tidak terpotong), sehingga pengalaman melihat foto konsisten apa pun orientasinya.
5. Sebagai pengunjung situs, saya ingin menutup modal dengan mengklik tombol X, sehingga saya bisa kembali ke halaman dengan cara yang jelas dan familiar.
6. Sebagai pengunjung situs, saya ingin menutup modal dengan mengklik area gelap di luar gambar (backdrop), sehingga saya punya cara cepat untuk keluar tanpa harus mencari tombol X.
7. Sebagai pengunjung situs yang membuka satu foto, saya ingin modal itu tetap fokus ke satu foto tersebut (tanpa panah lanjut/mundur ke foto lain), sehingga interaksinya sederhana dan sesuai kebutuhan saat ini.
8. Sebagai pengunjung situs yang mengklik foto tanpa `caption`/`meta` (jika ada), saya ingin modal tetap menampilkan foto secara penuh tanpa blok deskripsi kosong yang janggal, sehingga tampilan tetap rapi.
9. Sebagai pengurus situs yang mengedit `sourceData.js`, saya tidak perlu menambah field data baru untuk fitur ini — `alt`, `caption`, dan `meta` yang sudah ada dipakai langsung oleh modal.
10. Sebagai pengunjung yang sedang membuka modal konfirmasi donasi di halaman Infak (fitur lama, tidak terkait foto), saya ingin perilaku modal itu tidak berubah sama sekali oleh fitur ini, sehingga tidak ada regresi di alur donasi.
11. Sebagai pengunjung situs di perangkat mobile, saya ingin bisa tap foto untuk membuka modal dan tap di luar gambar untuk menutupnya, sehingga interaksinya bekerja sama baiknya di layar sentuh.

## Implementation Decisions

- **Cakupan**: fitur dipasang di komponen `PhotoTile` (dipakai oleh `GallerySection` di beranda dan tiga foto di `ProfilePage`). Tidak menyentuh `DonationCard` (gambar QRIS, bukan foto dokumentasi) dan tidak menyentuh `SchedulePage` (tidak ada foto di sana saat ini). Tidak membangun galeri foto baru.
- **Lokasi state**: state "modal ini sedang terbuka atau tidak" dikelola secara lokal di dalam `PhotoTile` itu sendiri (bukan di level page/`GallerySection`/`ProfilePage`). Setiap instance `PhotoTile` mengurus modalnya sendiri — halaman pemanggil tidak perlu tahu apa pun tentang modal ini.
- **Selalu aktif**: semua `PhotoTile` menjadi bisa diklik secara default, tanpa prop opt-out. Tidak ada pemakaian `PhotoTile` yang dekoratif saat ini yang perlu dikecualikan.
- **Komponen modal baru, terpisah dari `Dialog`**: dibuat komponen baru (bagian dari design system, mis. lightbox foto) yang tidak mereuse/mengubah `Dialog` (komponen feedback yang ada, dipakai modal konfirmasi donasi di `DonatePage`). Alasan: `Dialog` belum punya perilaku "klik backdrop untuk tutup", dan menambahkannya ke `Dialog` akan otomatis mengubah perilaku modal konfirmasi donasi yang sudah ada — di luar scope fitur ini. Komponen baru ini boleh meniru gaya visual `Dialog` (backdrop blur, surface card, border-radius, shadow, tombol close dengan ikon `x`) memakai token desain yang sama, supaya konsisten secara visual dengan modal lain di situs, tapi kode dan perilakunya independen.
- **Konten modal**:
  - Gambar penuh (`src`/`alt` dari foto yang diklik), ditampilkan dengan `object-fit: contain`, dibatasi max-width/max-height terhadap viewport (mis. sekitar 90vw × 85vh) supaya rasio asli foto (4/3, 4/5, 16/9, 16/7, dst.) tidak terdistorsi maupun terpotong.
  - Di bawah/di sekitar gambar: `meta` (label kategori) ditampilkan sebagai judul/label kecil, dan `caption` ditampilkan sebagai teks deskripsi. Kedua elemen ini opsional (render kondisional) — jika foto tidak punya `meta`/`caption`, blok teks itu tidak dirender sama sekali (tidak ada whitespace kosong yang janggal).
  - Tombol close (ikon `x`, konsisten dengan pola tombol close `Dialog`).
- **Interaksi tutup**: tombol X, dan klik pada area backdrop (di luar gambar/kartu modal). Tidak ada dukungan tombol Escape maupun navigasi keyboard (Tab/Enter/Space) di iterasi ini — klik mouse dan tap saja.
- **Navigasi**: tidak ada navigasi prev/next antar foto di dalam modal. Satu foto per buka; menutup modal kembali ke grid.
- **Skema data**: tidak ada perubahan pada `sourceData.js` atau `deriveSiteData.js`. Field `alt`, `caption`, `meta` yang sudah ada per item `gallery` (dan per pemakaian langsung `PhotoTile` di `ProfilePage`) dipakai apa adanya.
- **Tidak menyentuh `Dialog.jsx`**: file ini tetap seperti sekarang; modal konfirmasi donasi di `DonatePage` tidak terpengaruh oleh perubahan ini.

## Testing Decisions

- Repo ini belum memiliki harness test komponen (tidak ada React Testing Library/jsdom di `site/package.json`); test otomatis yang ada (`prayerTimeCalculator.test.js`, `deriveSiteData.test.js`) hanya menguji fungsi murni di `site/src/lib/`.
- Fitur ini murni UI/markup ditambah satu boolean open/close per instance `PhotoTile` — tidak ada logika non-trivial (kalkulasi, transformasi data) yang layak diekstrak menjadi fungsi murni yang testable secara terisolasi.
- Keputusan: **tidak menambahkan test otomatis baru** untuk fitur ini, konsisten dengan cakupan test repo saat ini. Verifikasi dilakukan secara manual/visual lewat dev server (`npm run dev` di `site/`): klik foto di galeri beranda dan di halaman Profil → modal muncul dengan gambar penuh + `meta`/`caption` yang benar sesuai foto yang diklik → tutup lewat tombol X → buka lagi → tutup lewat klik backdrop → pastikan modal konfirmasi donasi di halaman Infak masih berperilaku sama seperti sebelumnya (regresi check).
- Menambahkan infra test komponen (React Testing Library) secara eksplisit **di luar scope** — lihat "Out of Scope".

## Out of Scope

- `DonationCard.jsx` (gambar QRIS) — tidak dipasangi fitur modal ini.
- `SchedulePage.jsx` — tidak ada foto di halaman ini saat ini; tidak ditambahkan sebagai bagian dari fitur ini.
- Galeri foto baru/terpisah — belum dibangun, tetap sebagai `GallerySection` dan foto-foto `ProfilePage` yang sudah ada.
- Navigasi prev/next antar foto di dalam modal.
- Dukungan tombol Escape dan aksesibilitas keyboard (Tab/Enter/Space) untuk membuka/menutup modal.
- Field data description/detail baru yang lebih panjang dari `caption` yang sudah ada.
- Perubahan apa pun pada `Dialog.jsx` atau perilaku modal konfirmasi donasi di `DonatePage`.
- Menambahkan React Testing Library atau infra test komponen lain ke repo.

## Further Notes

- Referensi komponen yang relevan (bisa berubah — jangan jadikan satu-satunya sumber kebenaran saat implementasi, cek ulang isi filenya):
  - `site/src/design-system/components/surau/PhotoTile.jsx` — komponen yang akan menerima logika klik + modal.
  - `site/src/components/GallerySection.jsx` — pemakai `PhotoTile` untuk galeri beranda, sumber datanya `site.gallery` dari `sourceData.js`.
  - `site/src/pages/ProfilePage.jsx` — tiga pemakaian langsung `PhotoTile` (bukan lewat `gallery` array).
  - `site/src/design-system/components/feedback/Dialog.jsx` — pola visual modal yang ada di situs, dijadikan referensi gaya (bukan dependency) untuk komponen modal foto baru.
  - `site/src/data/sourceData.js` — sumber field `alt`/`caption`/`meta` per foto.
  - `site/src/ds.js` — titik ekspor terpusat komponen design system; komponen modal foto baru (jika ditaruh di file terpisah) sebaiknya diekspor lewat sini juga.
- Konteks domain: sesuai `CONTEXT.md`, "Sumber Data" (`sourceData.js`) adalah satu-satunya sumber konten yang boleh berubah, diedit manual oleh pengurus — fitur ini tidak menambah lapisan data baru dan tetap konsisten dengan batasan itu.
- Tidak ada ADR yang bertentangan dengan keputusan-keputusan di atas (ADR 0001–0004 membahas sumber data statis, vendoring design system, dan jadwal salat ter-generate — tidak terkait area ini).
