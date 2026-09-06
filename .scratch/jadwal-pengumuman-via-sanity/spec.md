Status: ready-for-agent

# Migrasi Konten ke Sanity — Fase 2: Jadwal Kegiatan (events) & Pengumuman (news)

## Problem Statement

Sejak ADR [0013](../../docs/adr/0013-seluruh-konten-sumber-data-migrasi-ke-sanity.md), seluruh konten yang masih hand-edited di `sourceData.js` direncanakan pindah ke Sanity secara bertahap, dengan `events` (dikonsumsi halaman **Jadwal Kegiatan** dan tiap **Halaman Program**) dan `news` (pengumuman di panel Agenda Beranda) sebagai giliran pertama setelah galeri, artikel, dan video Profil Surau (Fase 1, `docs/adr/0006`/`0010`/`0012`). Pengurus surau butuh mengubah jadwal kajian/tawajjuh dan menerbitkan pengumuman tanpa melibatkan maintainer untuk mengedit kode, menjalankan test, dan mendorong perubahan lewat git.

Masalah tambahan yang sudah lama ada di `events`: field `day`/`month` di-overload untuk merepresentasikan dua hal berbeda — event mingguan berulang (`day` = singkatan hari, `month` = bagian hari seperti "Malam"/"Pagi") dan event sekali-jalan bertanggal (entri "Daurah Aswaja" menaruh string tanggal `13/08/26` ke field bernama `month`). Hack ini membuat Sanity Studio tidak bisa menampilkan field yang sesuai jenis event yang sedang ditambah pengurus, dan berisiko salah isi.

## Solution

Pindahkan `events` dan `news` ke Sanity sebagai tiga tipe dokumen baru: **`recurringEvent`** (event mingguan berulang — hari-dalam-minggu + label waktu), **`oneOffEvent`** (event sekali-jalan — tanggal sungguhan), dan **`news`** (pengumuman/berita). Arsitektur mengikuti pola Fase 1 yang sudah terbukti: **build-time fetch** (situs tetap static export, tidak ada dependency runtime ke Sanity), lewat skrip I/O tipis (`fetch-sanity-content.mjs`) di atas fungsi transformasi murni yang diuji terpisah (`resolveSanityContent.js`).

Untuk `events`, dua tipe dokumen Sanity dinormalkan balik ke **satu bentuk datar** yang sudah dikonsumsi komponen UI sekarang (`{day, month, title, speaker, time, place, category}`) — sehingga `deriveSiteData.js`, `AgendaSection.jsx`, dan `ProgramSection.jsx` (yang memfilter `events` berdasarkan `category` untuk tiap Halaman Program) **tidak perlu diubah sama sekali**. Perbaikan modeling hack `day`/`month` terjadi di lapisan schema Sanity + fungsi resolve, bukan di frontend.

## User Stories

1. Sebagai pengurus surau, saya ingin menambah/mengubah/menghapus event kajian/tawajjuh mingguan (hari, waktu, judul, pembicara, tempat, kategori) lewat Sanity Studio, sehingga jadwal kajian selalu mutakhir tanpa saya menyunting kode.
2. Sebagai pengurus surau, saya ingin menambah event sekali-jalan bertanggal (mis. Dauroh Aswaja tanggal tertentu) lewat Sanity Studio dengan field **tanggal sungguhan** (date picker), bukan menulis string tanggal ke field yang salah nama, sehingga saya tidak salah isi.
3. Sebagai pengurus surau yang menambah event, saya ingin Studio hanya menampilkan field yang relevan dengan jenis event yang sedang saya buat (mingguan vs sekali-jalan), sehingga saya tidak bingung field mana yang harus diisi.
4. Sebagai pengurus surau, saya ingin menambah/mengubah/menghapus pengumuman (tag, judul, tanggal, link, deskripsi) lewat Sanity Studio, sehingga jamaah selalu melihat pengumuman terbaru tanpa saya menyunting kode.
5. Sebagai pengunjung situs, saya ingin halaman Jadwal Kegiatan tetap bisa difilter per hari seperti sekarang, dan tetap menampilkan event sekali-jalan (mis. Dauroh) dengan wajar, meski sumber datanya sekarang gabungan dua tipe dokumen Sanity.
6. Sebagai pengunjung situs, saya ingin tiap Halaman Program (Tawajjuh, Dauroh, Khitanan, dst.) tetap menampilkan jadwal kegiatannya sendiri yang tersaring dari `category`, persis seperti sekarang, tanpa perbedaan visual apa pun akibat migrasi ini.
7. Sebagai pengunjung situs, saya ingin panel Agenda di Beranda tetap menampilkan pengumuman apa adanya (tag, judul, tanggal, deskripsi, link) seperti sekarang.
8. Sebagai pengunjung situs, saya ingin situs tetap bisa diakses normal meski Sanity sedang down, karena situs yang saya lihat adalah hasil build statis, bukan hasil fetch langsung ke Sanity.
9. Sebagai pengunjung situs, saya ingin halaman tetap secepat sekarang (situs tetap static export) meski `events`/`news` sekarang berasal dari Sanity.
10. Sebagai maintainer situs, saya ingin 8 entri `events` dan 1 entri `news` yang ada sekarang termigrasi ke Sanity lewat skrip satu-kali, dengan tiap event lama diklasifikasi dengan benar ke `recurringEvent` atau `oneOffEvent` (entri "Daurah Aswaja" jadi `oneOffEvent` dengan tanggal sungguhan `2026-08-13`, sisanya jadi `recurringEvent`), sehingga jadwal lama tidak hilang saat cutover.
11. Sebagai maintainer situs, saya ingin fungsi resolve (`resolveEvents`/`resolveNews`) diuji dengan fixture GROQ-shaped, mengikuti pola `resolveArticles`/`resolveGallery` yang sudah ada, sehingga logika normalisasi bisa diverifikasi tanpa memanggil Sanity sungguhan.
12. Sebagai maintainer situs, begitu `events`/`news` terverifikasi jalan end-to-end dari Sanity, saya ingin field `events`/`news` dihapus dari `sourceData.js`, sehingga tidak ada dua sumber kebenaran yang tumpang tindih untuk tipe konten yang sama (konsisten dengan tiket cutover Fase 1).
13. Sebagai pengurus surau, saya ingin menekan tombol "Publish" di Studio untuk `recurringEvent`/`oneOffEvent`/`news` dan melihat perubahan tayang di situs publik dalam beberapa menit lewat webhook → rebuild otomatis yang sudah ada, tanpa langkah tambahan apa pun dari saya.

## Implementation Decisions

- **Schema `recurringEvent`** (`studio/schemaTypes/recurringEvent.ts`): `dayOfWeek` (string, dropdown pilihan tetap 7 hari — `Sen`/`Sel`/`Rab`/`Kam`/`Jum`/`Sab`/`Min` — field berisiko-layout-filter dikurasi seperti prinsip Fase 1), `timeLabel` (string bebas, mis. "Ba'da Maghrib", "09:00 WIB" — meniru field `month`+`time` lama yang digabung jadi satu label waktu bebas teks), `title`, `speaker`, `place`, `category` (string bebas, dipakai filter Halaman Program berdasarkan nilai literal yang sudah ada: `Tawajjuh`/`Dauroh`/`Silat`/`Kajian & Tawajjuh`/`Kajian` — pertimbangkan dropdown pilihan tetap berisi nilai-nilai ini plus opsi "lainnya" bertipe teks bebas, keputusan detail final diserahkan ke implementer).
- **Schema `oneOffEvent`** (`studio/schemaTypes/oneOffEvent.ts`): `date` (tipe date Sanity, tanggal sungguhan — menggantikan string `13/08/26` di field `month`), `timeLabel`, `title`, `speaker`, `place`, `category`.
- **Schema `news`** (`studio/schemaTypes/news.ts`): `tag` (string, mis. "Pengumuman"), `title`, `date` (tipe date Sanity — field lama berupa string tanggal Indonesia "8 Agustus 2026" diformat ulang saat resolve, bukan disimpan sebagai string bebas), `link` (url, opsional), `description` (text, opsional).
- **`resolveEvents(recurringDocs, oneOffDocs, referenceDate)`** (fungsi murni baru di `src/lib/resolveSanityContent.js`): menggabungkan dua array dokumen jadi satu array datar bentuk lama `{day, month, title, speaker, time, place, category}` —
  - `recurringEvent` → `day` = `dayOfWeek`, `month` = tetap ada agar bentuk objek konsisten (nilai turunan sederhana, mis. label kosong atau "Malam"/dsb tidak lagi punya makna khusus di jalur baru — tinjau apakah field `month` masih perlu dipertahankan di bentuk output sama sekali, atau `deriveSiteData.js`/`AgendaSection.jsx` cukup dengan `day`+`time`; keputusan detail bentuk output persis diserahkan ke implementer selama filter-per-hari (`AgendaSection`) dan filter-per-kategori (`ProgramSection`) tetap berfungsi identik).
  - `oneOffEvent` → dikonversi jadi bentuk yang tetap kompatibel dengan `deriveKhatibJumat`/tampilan `EventItem` yang ada (`day` diisi angka hari-dalam-bulan dari `date`, `month` diisi nama bulan 3-huruf sesuai `MONTHS_ID` di `deriveSiteData.js`, supaya fungsi turunan itu tidak perlu diubah).
  - `referenceDate` opsional untuk kebutuhan test deterministik (fixture tidak boleh bergantung pada `Date.now()` sungguhan).
- **`resolveNews(newsDocs)`** (fungsi murni baru di modul yang sama): memformat `date` (tipe date Sanity) jadi string tanggal Indonesia yang sama persis formatnya dengan yang sudah ada di `sourceData.js` sekarang (mis. "8 Agustus 2026"), meneruskan `tag`/`title`/`link`/`description` apa adanya.
- **`fetch-sanity-content.mjs`**: ditambah tiga GROQ query (`recurringEvent`, `oneOffEvent`, `news`), memanggil `resolveEvents`/`resolveNews`, menambah key `events`/`news` ke `sanityContent.json` yang sudah ada.
- **`App.jsx`**: `rawData` digabung dengan `events: sanityContent.events` dan `news: sanityContent.news` sebelum dipanggil ke `deriveSiteData`, persis pola `gallery` (tiket 05 Fase 1) sekarang.
- **`deriveSiteData.js`, `AgendaSection.jsx`, `ProgramSection.jsx`**: tidak berubah — tetap mengonsumsi `events`/`news` dalam bentuk yang sudah ada.
- **Migrasi konten existing**: skrip satu-kali (`scripts/migrate-events-news-to-sanity.mjs`, dijalankan manual, `--dry-run` dulu lalu `--write`, mengikuti pola `migrate-gallery-to-sanity.mjs`) yang membaca 8 entri `events` + 1 entri `news` di `sourceData.js`, mengklasifikasi tiap event ke `recurringEvent`/`oneOffEvent` (entri "Daurah Aswaja" → `oneOffEvent`, `date: 2026-08-13`; 7 entri lain → `recurringEvent`), dan upload sebagai dokumen ke dataset `production`.
- **Cutover**: begitu terverifikasi jalan end-to-end di produksi (mengikuti bukti yang sama seperti tiket 03/04/05 Fase 1 — build log + webhook + rebuild otomatis), field `events`/`news` dihapus dari `sourceData.js` sebagai tiket terpisah, tidak dibiarkan sebagai fallback mati.

## Testing Decisions

- `resolveEvents`/`resolveNews` ditest dengan fixture objek GROQ-shaped (dokumen `recurringEvent`/`oneOffEvent`/`news` palsu) → dibandingkan terhadap bentuk output datar yang diharapkan, mengikuti pola persis `resolveArticles.test.js`/`resolveGallery` yang sudah ada di `resolveSanityContent.test.js`.
- Kasus wajib diuji:
  - `resolveEvents` mengembalikan bentuk yang tepat untuk `recurringEvent` (hari, label waktu, kategori diteruskan benar) dan untuk `oneOffEvent` (tanggal terkonversi jadi `day`/`month` yang dikenali `deriveKhatibJumat`/`AgendaSection`).
  - Gabungan `recurringEvent`+`oneOffEvent` menghasilkan satu array (urutan tidak signifikan kecuali dites eksplisit ada keputusan urutan).
  - `resolveNews` memformat `date` jadi string Indonesia yang benar, meneruskan field lain apa adanya, menangani `link`/`description` kosong dengan wajar.
- `deriveSiteData.test.js` (test yang sudah ada untuk `deriveKhatibJumat`/`deriveEventsWithToday`) **tidak perlu diubah** — fungsi itu tetap menerima bentuk `events` yang sama persis seperti sekarang, cukup diverifikasi tidak ada regresi (test yang ada tetap lulus tanpa modifikasi ekspektasi).
- Skrip migrasi satu-kali tidak wajib ditest otomatis (dijalankan sekali, dibuang setelah dipakai, seperti `migrate-gallery-to-sanity.mjs`), tapi wajib dijalankan `--dry-run` dulu sebelum `--write` ke dataset produksi.
- `fetch-sanity-content.mjs` (I/O sungguhan ke Sanity) tidak ditest lewat unit test — verifikasi lewat build sungguhan (dev server lokal dulu, lalu end-to-end produksi lewat webhook, mengikuti pola tiket 03/04/05 Fase 1).

## Out of Scope

- Migrasi tipe konten selain `events`/`news` (`programs`, `contact` tergabung ke Halaman Program, `stats`, narrative+gallery Halaman Program, `profilSurau` lanjutan, `salik`, silsilah, `location`, `donation`) — fase-fase terpisah menyusul, urutan sesuai ADR 0013.
- Perubahan visual/UI apa pun pada `AgendaSection`/`ProgramSection`/halaman Jadwal Kegiatan — tampilan harus identik dengan sekarang.
- Mengizinkan pengurus membuat kategori event yang benar-benar bebas tanpa kurasi apa pun jika implementer memilih pendekatan dropdown untuk `category` (keputusan detail schema field itu ada di Implementation Decisions, tapi menambah kategori baru di luar Halaman Program yang sudah ada tetap butuh kerja developer untuk merutekannya — sejalan ADR 0013 soal Halaman Program tidak bisa dibuat baru sendiri oleh pengurus).
- Notifikasi/reminder untuk event baru — di luar cakupan, tidak ada permintaan untuk ini.
- Dataset staging/preview terpisah, draft/approval workflow sebelum publish — mengikuti keputusan lintas-fase yang sudah ada sejak Fase 1.

## Further Notes

- Keputusan-keputusan di spec ini berasal dari sesi grilling sebelumnya yang menghasilkan ADR [0013](../../docs/adr/0013-seluruh-konten-sumber-data-migrasi-ke-sanity.md), dan melanjutkan langsung "roadmap fase berikutnya" yang sudah dicatat di `.scratch/cms-migration-sanity/spec.md` (Fase 1, status done).
- Nama tipe dokumen (`recurringEvent`/`oneOffEvent`/`news`) dan nama fungsi resolve (`resolveEvents`/`resolveNews`) bersifat indikatif — keputusan final ada di tangan agen implementasi, selama bentuk dan tanggung jawabnya sesuai spec ini dan pola yang sudah dipakai `resolveArticles`/`resolveGallery`.
- Implementer perlu meninjau ulang apakah field `month` di bentuk output `resolveEvents` masih perlu dipertahankan persis, atau bisa disederhanakan — selama `AgendaSection.jsx` (filter per hari) dan `deriveKhatibJumat`/`deriveEventsWithToday` (di `deriveSiteData.js`) tetap berfungsi tanpa perubahan pada kedua modul itu sendiri.
- Prior art detail (nomor tiket, bukti end-to-end produksi, keputusan field-kurasi) ada di `.scratch/cms-migration-sanity/issues/03-scaffold-build-time-fetch-webhook.md` dan `05-galeri-via-sanity.md` — pola yang sama harus diikuti untuk fase ini, bukan didesain ulang dari nol.
