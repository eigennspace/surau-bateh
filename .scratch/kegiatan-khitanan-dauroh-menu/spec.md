# Menu "Kegiatan & Aksi Sosial" — Sub-menu Khitanan & Dauroh

Status: ready-for-agent

## Problem Statement

Tuan guru Surau Bateh minta ada "space" khusus untuk dua kegiatan — Dauroh dan Khitanan — masing-masing dengan narasi penjelasan dan kontak person yang bisa dihubungi umat yang berminat. Saat ini situs hanya punya satu menu navigasi datar "Kajian" yang mengarah ke halaman agenda kajian rutin; tidak ada tempat untuk memperkenalkan program Khitanan maupun Dauroh sebagai kegiatan tersendiri, dan tidak ada cara bagi pengunjung untuk tahu siapa yang harus dihubungi kalau berminat ikut salah satu dari keduanya.

Menu navigasi situs (`NavBar` desktop, `MobileHeader` mobile, `BottomBar` tab bawah mobile) saat ini juga sepenuhnya datar satu level — belum pernah ada pola dropdown/submenu di codebase ini.

## Solution

Mengubah menu "Kajian" pada navigasi jadi menu berjenjang dua level dengan parent baru **"Kegiatan & Aksi Sosial"**, beranak tiga: Kajian (halaman yang sudah ada, tidak berubah), Khitanan (halaman baru), dan Dauroh (halaman baru — ejaan "Dauroh", bukan "Daurah").

- **Desktop (large view)**: item nav "Kegiatan & Aksi Sosial" membuka dropdown saat di-hover, berisi 3 tautan: Kajian, Khitanan, Dauroh. Parent tidak punya halaman/URL sendiri — murni trigger dropdown.
- **Mobile header** (menu hamburger): label "Kajian" pada daftar menu diganti "Kegiatan"; tap membuka drop-up dengan struktur sub-menu yang sama (Kajian, Khitanan, Dauroh).
- **Bottom tab bar mobile** (bar tetap di bawah layar, komponen terpisah dari header): tab "Kajian" diganti "Kegiatan"; tap tidak menu navigasi langsung, melainkan membuka popover kecil di atas tab berisi 3 pilihan yang sama.
- **Dua halaman baru**, `/khitanan` dan `/dauroh`, masing-masing berisi: narasi penjelasan program, daftar jadwal (kalau ada data — kalau belum ada, tampilkan pesan "Kegiatan akan segera hadir"), dan kartu kontak person dengan tombol WhatsApp langsung.
- Kontak person baru ditambahkan ke Sumber Data: Khitanan → Angku Bosa (0813-7472-0759), Dauroh → Muhammad Galang (0821-7113-6418).

## User Stories

1. Sebagai pengunjung situs desktop, saya ingin melihat menu navigasi utama menampilkan "Kegiatan & Aksi Sosial" (bukan lagi "Kajian" datar), sehingga saya tahu ada lebih dari satu jenis kegiatan yang bisa saya ikuti.
2. Sebagai pengunjung situs desktop, saya ingin meng-hover "Kegiatan & Aksi Sosial", sehingga muncul dropdown berisi tiga pilihan: Kajian, Khitanan, Dauroh.
3. Sebagai pengunjung situs desktop, saya ingin mengklik salah satu dari tiga pilihan dropdown itu, sehingga saya diarahkan ke halaman yang sesuai (`/kajian`, `/khitanan`, atau `/dauroh`) dan dropdown tertutup.
4. Sebagai pengunjung situs desktop, saya ingin memindah kursor menjauh dari area menu tanpa mengklik apa pun, sehingga dropdown tertutup dengan sendirinya.
5. Sebagai pengunjung situs desktop yang sedang membuka `/khitanan` atau `/dauroh`, saya ingin item "Kegiatan & Aksi Sosial" di navbar tetap terlihat aktif/ter-highlight, sama seperti perilaku item nav lain saat halamannya sedang dibuka.
6. Sebagai pengunjung situs mobile, saya ingin membuka menu hamburger dan melihat label "Kegiatan" (bukan lagi "Kajian"), sehingga saya tahu di situ ada beberapa kegiatan.
7. Sebagai pengunjung situs mobile, saya ingin men-tap "Kegiatan" di menu hamburger, sehingga muncul drop-up berisi tiga pilihan (Kajian, Khitanan, Dauroh) dengan struktur yang sama seperti dropdown desktop.
8. Sebagai pengunjung situs mobile, saya ingin men-tap salah satu dari tiga pilihan drop-up itu, sehingga saya diarahkan ke halaman yang sesuai dan seluruh menu (drop-up + panel hamburger) tertutup.
9. Sebagai pengunjung situs mobile, saya ingin melihat tab "Kegiatan" di bottom tab bar (menggantikan tab "Kajian" yang ada sekarang), dengan ikon yang sama seperti sebelumnya.
10. Sebagai pengunjung situs mobile, saya ingin men-tap tab "Kegiatan" di bottom tab bar, sehingga muncul popover kecil di atas tab berisi tiga pilihan (Kajian, Khitanan, Dauroh) — bukan langsung berpindah halaman.
11. Sebagai pengunjung situs mobile, saya ingin men-tap salah satu pilihan di popover bottom tab bar itu, sehingga saya diarahkan ke halaman yang sesuai dan popover tertutup.
12. Sebagai pengunjung situs mobile, saya ingin men-tap di luar popover bottom tab bar tanpa memilih apa pun, sehingga popover tertutup tanpa berpindah halaman.
13. Sebagai pengunjung situs yang membuka `/khitanan`, saya ingin membaca narasi penjelasan tentang program Khitanan (apa itu, untuk siapa), sehingga saya paham programnya sebelum memutuskan menghubungi kontak person.
14. Sebagai pengunjung situs yang membuka `/khitanan`, saya ingin melihat kontak person program ini (Angku Bosa, 0813-7472-0759) dengan tombol untuk langsung menghubungi lewat WhatsApp, sehingga saya bisa langsung bertanya/mendaftar tanpa mengetik ulang nomornya.
15. Sebagai pengunjung situs yang membuka `/dauroh`, saya ingin membaca narasi penjelasan tentang program Dauroh, sehingga saya paham programnya sebelum menghubungi kontak person.
16. Sebagai pengunjung situs yang membuka `/dauroh`, saya ingin melihat kontak person program ini (Muhammad Galang, 0821-7113-6418) dengan tombol WhatsApp langsung, sama seperti di halaman Khitanan.
17. Sebagai pengunjung situs yang membuka `/khitanan` atau `/dauroh` saat belum ada jadwal kegiatan terjadwal di Sumber Data, saya ingin melihat pesan "Kegiatan akan segera hadir" di area jadwal, alih-alih area kosong atau daftar rusak.
18. Sebagai pengunjung situs yang membuka `/khitanan` atau `/dauroh` setelah pengurus mengisi jadwal kegiatan kategori itu di Sumber Data, saya ingin melihat daftar jadwal itu tampil, mengikuti pola tampilan jadwal yang sudah ada di halaman Kajian.
19. Sebagai pengunjung situs yang membuka `/kajian` (halaman Kajian yang sudah ada), saya ingin halaman ini tetap berperilaku dan tampil persis seperti sebelumnya — tidak ada perubahan konten atau layout akibat penambahan menu ini.
20. Sebagai pengunjung situs yang membuka halaman lain (Beranda, Profil, Jadwal Shalat, Infak, Artikel, Kontak), saya ingin perilaku dan tampilan halaman-halaman itu tidak berubah sama sekali akibat fitur ini.
21. Sebagai pengunjung situs yang me-refresh browser atau membuka langsung URL `/khitanan` atau `/dauroh` (bukan lewat klik di situs), saya ingin tetap sampai di halaman yang benar, sama seperti perilaku deep-link yang sudah berfungsi untuk halaman lain di situs ini.
22. Sebagai pengunjung situs yang menekan tombol back/forward browser setelah berpindah antar Kajian/Khitanan/Dauroh, saya ingin URL dan halaman yang ditampilkan tetap sinkron, sama seperti navigasi halaman lain di situs.
23. Sebagai pengurus surau yang ingin menambah/mengubah jadwal kegiatan Khitanan atau Dauroh, saya ingin cukup menambah entri baru di Sumber Data dengan kategori yang sesuai (`Khitanan`/`Dauroh`), tanpa perlu mengubah kode.
24. Sebagai pengurus surau yang ingin mengubah nomor kontak person Khitanan atau Dauroh di masa depan, saya ingin cukup mengubah nilai di Sumber Data, tanpa perlu mengubah kode.
25. Sebagai maintainer situs yang membaca `sourceData.js`, saya ingin narasi Khitanan dan Dauroh juga tersimpan sebagai teks di Sumber Data (bukan hardcode di komponen halaman), konsisten dengan pola "semua konten yang bisa berubah ada di satu berkas" yang sudah dipakai di seluruh situs ini.

## Implementation Decisions

- **Struktur menu**: `NAV` (dipakai `NavBar` desktop & `MobileHeader` mobile di `App.jsx`) berubah dari daftar string datar jadi mendukung entri berjenjang. Entri "Kajian" digantikan entri parent `"Kegiatan & Aksi Sosial"` dengan anak `['Kajian', 'Khitanan', 'Dauroh']`. `NavBar.jsx` dan `MobileHeader` (di `App.jsx`) perlu diperluas untuk merender entri berjenjang ini: desktop merender dropdown saat hover pada entri yang punya anak; mobile merender drop-up saat entri dengan anak di-tap. Entri nav lain (Beranda, Profil, Jadwal Shalat, Infak, Artikel, Kontak) tetap datar, tidak berubah.
- **`BottomBar.jsx`**: entri `Kajian` di `BB_ITEMS` (`App.jsx`) diganti `Kegiatan` dengan ikon yang sama (`calendar-days`). `BottomBar` perlu mendukung entri yang membuka popover (bukan langsung `onNavigate`) — popover kecil melayang di atas tombol tab, berisi tiga pilihan (Kajian/Khitanan/Dauroh), tertutup saat item dipilih atau saat tap di luar popover.
- **Routing** (`App.jsx`): `PAGE_SLUGS`/`SLUG_PAGES`/`pathForPage`/`routeFromPath` diperluas dengan dua slug flat baru satu-level: `Khitanan → 'khitanan'` dan `Dauroh → 'dauroh'` (bukan nested `/kegiatan/khitanan`). Slug `Kajian → 'kajian'` tidak berubah. `"Kegiatan & Aksi Sosial"` sebagai parent nav TIDAK masuk `PAGE_SLUGS` — tidak punya halaman/route sendiri, murni label UI navigasi.
- **Halaman baru**: `KhitananPage` dan `DaurohPage` (nama komponen menyesuaikan konvensi `*Page.jsx` yang ada di `site/src/pages/`), masing-masing terdiri dari:
  - Blok narasi (judul + teks penjelasan program) — teks disimpan di Sumber Data, bukan hardcode di komponen.
  - Blok jadwal, mengikuti pola tampilan jadwal `AgendaSection`/`EventItem` yang sudah ada di halaman Kajian, tapi difilter ke event berkategori `Khitanan`/`Dauroh` masing-masing (lihat poin skema data di bawah). Kalau hasil filter kosong, tampilkan pesan **"Kegiatan akan segera hadir"** (pola sama seperti empty state "Belum ada agenda." yang sudah ada di `AgendaSection`, teks berbeda sesuai keputusan sebelumnya).
  - Kartu kontak person, reuse `ContactCard` (`site/src/components/ContactCard.jsx`) atau varian kecil darinya, dengan `openWhatsApp` (`site/src/lib/whatsapp.js`) — pola identik dengan kontak di sidebar halaman Kajian dan `ContactPage`.
- **Skema Sumber Data (`sourceData.js`)**:
  - `events`: entri jadwal Khitanan/Dauroh masuk array `events` yang sudah ada, memakai `category: 'Khitanan'` / `category: 'Dauroh'` (kategori `'Daurah'` yang sudah ada pada entri "Daurah Aswaja" existing perlu diselaraskan ejaannya jadi `'Dauroh'` demi konsistensi, atau kedua ejaan diterima saat filter — keputusan final penyelarasan ejaan diserahkan ke implementer, tapi halaman baru harus tetap menemukan event itu).
  - `contact`: tambah entri kontak baru untuk Khitanan (Angku Bosa, `081374720759`) dan Dauroh (Muhammad Galang, `082171136418`) — bentuk field mengikuti pola `contact.pengurus[]` yang sudah ada (`{ name, role, phone }`), ditempatkan di struktur baru yang jelas milik masing-masing halaman (mis. `contact.khitanan` / `contact.dauroh`, atau array `pengurus` yang diberi field pembeda — struktur persis diserahkan ke implementer, konsisten dengan pola `contact` yang ada).
  - Narasi Khitanan dan Dauroh: field teks baru di `SB_DATA` (mis. blok terpisah per kegiatan berisi judul + paragraf narasi), diisi draft oleh Claude berdasarkan konteks kajian yang sudah ada di situs, untuk direview/diedit pengurus surau sebelum publish.
- **`deriveSiteData.js`**: tidak wajib berubah kalau halaman baru cukup membaca `site.events` (sudah difilter di level komponen halaman, mengikuti pola `AgendaSection` yang juga memfilter di komponen) dan `site.contact` apa adanya; kalau narasi/kontak baru butuh transformasi (mis. lookup kontak per kategori), tambahkan turunan kecil di sini mengikuti pola fungsi-fungsi kecil yang sudah ada di berkas ini (`deriveKhatibJumat`, dll).
- **Tidak ada perubahan** pada `New Surau Bateh Lori Design System/` sumber — komponen baru dibangun langsung di `site/` (lihat ADR 0003), mengikuti token design system yang sudah divendor ke `site/src/design-system/`.
- **Footer**: tidak wajib diubah untuk iterasi ini, kecuali implementer ingin menambah tautan Khitanan/Dauroh ke salah satu kolom footer yang sudah ada — opsional.

## Testing Decisions

- Test menguji perilaku tampak (yang dirender/dihasilkan), bukan detail implementasi — mengikuti pola test yang sudah ada di repo.
- **Seam utama — page-render test** (pola `SchedulePage.test.jsx`/`ArtikelPage.test.jsx`): `renderToStaticMarkup` atas `KhitananPage`/`DaurohPage` dengan fixture `deriveSiteData(rawData, now, prayerTimesDataset)`. Kasus yang perlu dicakup:
  - Narasi program muncul di markup.
  - Kontak person (nama + tombol WhatsApp) muncul, dengan nomor yang benar untuk masing-masing halaman.
  - Jadwal event berkategori `Khitanan`/`Dauroh` yang ada di fixture `events` muncul di daftar jadwal halaman itu.
  - Fixture `events` tanpa entri berkategori yang sesuai → pesan "Kegiatan akan segera hadir" muncul, tidak ada daftar kosong yang rusak.
  - Event dari kategori lain (mis. `Kajian`, `Tawajjuh`) di fixture TIDAK ikut muncul di halaman Khitanan/Dauroh (filter kategori benar, tidak bocor).
- **Seam data-invariant** (pola `sourceData.test.js`): assert di `SB_DATA` bahwa entri kontak Khitanan dan Dauroh ada dan nomor telepon terisi (tidak kosong/`undefined`), dan kategori event baru (`Khitanan`/`Dauroh`) konsisten penulisannya di seluruh `events`.
- **Regresi halaman lain**: tidak perlu test baru untuk Beranda/Jadwal Shalat/Kajian/Infak/Profil/Kontak/Artikel — pastikan test suite yang sudah ada (`SchedulePage.test.jsx`, `deriveSiteData.test.js`, `sourceData.test.js`, test `ArtikelPage.*`, dll) tetap lulus tanpa modifikasi setelah perubahan `App.jsx`/`NAV`/`PAGE_SLUGS`/`BB_ITEMS`.
- **Di luar cakupan test otomatis**: perilaku interaktif navigasi (dropdown hover desktop, drop-up click mobile, popover bottom tab bar, tutup-saat-klik-di-luar) — konsisten dengan konvensi repo saat ini, di mana `NavBar.jsx`/`BottomBar.jsx`/`App.jsx` (routing/nav) belum pernah ditest sama sekali. Verifikasi bagian ini dilakukan manual/visual oleh implementer (mis. lewat browser preview), bukan test otomatis.

## Out of Scope

- Halaman/landing tersendiri untuk parent "Kegiatan & Aksi Sosial" — parent murni trigger dropdown/drop-up/popover, tidak punya URL atau konten sendiri.
- Perubahan pada halaman Kajian (`/kajian`, `AgendaSection`, `AgendaPage`) selain menjadi salah satu anak dropdown baru — konten dan layoutnya tidak berubah.
- Nested URL (`/kegiatan/khitanan`, `/kegiatan/daurah`) — dipakai slug flat satu-level sesuai keputusan.
- Perluasan `BottomBar` untuk item nav lain di luar "Kegiatan" (mis. Artikel tidak ditambahkan ke bottom bar) — di luar cakupan spec ini.
- Info tambahan di luar narasi + kontak + jadwal untuk Khitanan/Dauroh (syarat pendaftaran, biaya, lokasi khusus, dll) — belum ada data ini dari tuan guru; ditambahkan nanti sebagai perubahan Sumber Data terpisah kalau tersedia.
- Test otomatis untuk interaksi navigasi (hover/click/popover/klik-di-luar) — lihat Testing Decisions.
- Perubahan pada `New Surau Bateh Lori Design System/` sumber — lihat Implementation Decisions.
- Pratinjau share media sosial (og:title/og:image) untuk dua halaman baru ini — mengikuti perilaku generic situs yang sudah ada, tidak ada penanganan khusus.

## Further Notes

- Ada aset foto/flyer Dauroh yang sudah ada di repo tapi baru dipakai di galeri Beranda: `daurah-aswaja-13-agus.jpeg`, `background-daurah.jpeg`, `daurah-pertama.jpeg`, `karakter-salik.jpeg` (lihat `sourceData.js`). Implementer boleh mempertimbangkan salah satu di antaranya sebagai gambar hero/pendukung narasi di halaman `/dauroh`, meski tidak wajib.
- `SB_DATA.events` sudah punya satu entri berkategori `'Daurah'` (event "Daurah Aswaja", 13 Agustus 2026, ejaan "Daurah" bukan "Dauroh") — implementer perlu menyelaraskan ejaan kategori ini (lihat Implementation Decisions) supaya halaman `/dauroh` yang baru benar-benar menampilkannya, bukan malah tidak menemukan event yang sudah ada.
- Ejaan final yang dipakai di UI (label menu, judul halaman, URL) adalah **"Dauroh"**, sesuai keputusan eksplisit pengurus saat sesi ini — bukan "Daurah" yang sempat disebut di draf awal permintaan.
- Ini adalah perubahan navigasi berjenjang pertama di situs ini — sebelum ini semua menu (`NavBar`, `MobileHeader`, `BottomBar`) selalu datar satu level. Pola yang dibangun di sini (dropdown/drop-up/popover untuk entri ber-anak) bisa jadi acuan kalau nanti ada kebutuhan submenu lain.
