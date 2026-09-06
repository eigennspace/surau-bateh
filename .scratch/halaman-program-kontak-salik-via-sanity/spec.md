Status: ready-for-agent

# Migrasi Konten ke Sanity — Fase 3: Narrative+Galeri Halaman Program, Kontak, & Profil Salik

## Problem Statement

Sejak ADR [0013](../../docs/adr/0013-seluruh-konten-sumber-data-migrasi-ke-sanity.md), seluruh konten yang masih hand-edited di `sourceData.js` direncanakan pindah ke Sanity secara bertahap. Setelah galeri/artikel/video Profil Surau (Fase 1) dan `events`/`news` (Fase 2, `.scratch/jadwal-pengumuman-via-sanity/`), yang masih tersisa hand-edited di `SB_DATA` dan jadi giliran fase ini adalah: narasi + galeri dokumentasi keenam Halaman Program (`khitanan`, `dauroh`, `tawajjuh`, `konseling`, `baktiSosial`, `silaturahmi`), kontak person masing-masing program, kontak umum (alamat, maps, daftar pengurus) di halaman `/kontak`, dan seluruh isi halaman `/profil-salik`. Pengurus surau tidak bisa mengubah narasi program, mengganti foto galeri dokumentasi, memperbarui nomor kontak person, atau memperbaiki teks Profil Salik tanpa melibatkan maintainer untuk mengedit kode, menjalankan test, dan mendorong perubahan lewat git.

## Solution

Pindahkan isi ini ke Sanity sebagai delapan dokumen singleton baru: enam schema type Halaman Program (`khitanan`, `dauroh`, `tawajjuh`, `konseling`, `baktiSosial`, `silaturahmi` — satu type per program, lihat ADR [0014](../../docs/adr/0014-halaman-program-jadi-schema-type-terpisah-bukan-satu-type-bersama.md) untuk alasan kenapa bukan satu type bersama), plus `contact` (kontak umum halaman `/kontak`) dan `salik` (halaman Profil Salik). Arsitektur mengikuti pola Fase 1/2 yang sudah terbukti: **build-time fetch**, situs tetap static export tanpa dependency runtime ke Sanity, lewat skrip I/O tipis (`fetch-sanity-content.mjs`) di atas fungsi transformasi murni yang diuji terpisah (`resolveSanityContent.js`).

Kontak person tiap program (`SB_DATA.contact.khitanan`, `.dauroh`, dst.) **digabung ke dalam dokumen programnya sendiri** (field `person`), menggantikan objek `contact` lama yang di-key per-program — sesuai keputusan eksplisit ADR 0013. Kontak umum (`SB_DATA.contact.pengurus`/`.address`/`.maps`, dipakai halaman `/kontak` saja) pindah ke singleton `contact` yang terpisah dari kontak per-program.

## User Stories

1. Sebagai pengurus surau, saya ingin mengubah narasi Halaman Program (mis. deskripsi Khitanan, Dauroh, dst.) lewat Sanity Studio, sehingga informasi program selalu mutakhir tanpa saya menyunting kode.
2. Sebagai pengurus surau, saya ingin menambah/mengganti/menghapus foto galeri dokumentasi tiap Halaman Program lewat Sanity Studio, sehingga dokumentasi kegiatan bisa diperbarui sendiri.
3. Sebagai pengurus surau, saya ingin mengubah nama/peran/nomor telepon kontak person tiap Halaman Program lewat Sanity Studio, sehingga jamaah selalu menghubungi nomor yang benar.
4. Sebagai pengurus surau, saya ingin mengubah alamat, link Google Maps, dan daftar pengurus umum di halaman `/kontak` lewat Sanity Studio, sehingga info kontak surau selalu akurat.
5. Sebagai pengurus surau, saya ingin mengubah narasi, daftar karakter (bullets), paragraf penutup, dan galeri di halaman Profil Salik lewat Sanity Studio, sehingga penjelasan tentang Salik bisa disempurnakan tanpa bantuan maintainer.
6. Sebagai pengurus surau yang mengisi narasi/bullets/closing, saya ingin tetap bisa menandai teks tebal/miring dengan cara yang sudah biasa dipakai (`**tebal**`/`*miring*`), sehingga tidak perlu belajar cara baru.
7. Sebagai pengurus surau, saya ingin field `title`, `narrative`, dan kontak person tiap Halaman Program wajib diisi di Studio (tidak bisa disimpan kosong), sehingga halaman publik tidak pernah tampil dengan bagian penting kosong.
8. Sebagai pengurus surau, saya ingin galeri tiap Halaman Program dan Profil Salik boleh dikosongkan (beberapa program memang belum punya dokumentasi foto), sehingga saya tidak dipaksa mengisi foto placeholder.
9. Sebagai pengunjung situs, saya ingin keenam Halaman Program, halaman `/kontak`, dan halaman `/profil-salik` tampil identik seperti sekarang setelah migrasi — tidak ada perbedaan visual atau perilaku apa pun.
10. Sebagai pengunjung situs, saya ingin situs tetap bisa diakses normal meski Sanity sedang down, karena situs yang saya lihat adalah hasil build statis, bukan hasil fetch langsung ke Sanity.
11. Sebagai maintainer situs, saya ingin isi `SB_DATA.khitanan`/`.dauroh`/`.tawajjuh`/`.konseling`/`.baktiSosial`/`.silaturahmi`/`.salik` dan `SB_DATA.contact` yang ada sekarang termigrasi ke Sanity lewat skrip satu-kali, termasuk narasi berstatus draft (`tawajjuh`, `baktiSosial`, `silaturahmi`) yang di-publish apa adanya (bukan disimpan sebagai draft Studio yang belum tayang), sehingga tidak ada konten yang hilang atau diam-diam tidak tayang saat cutover.
12. Sebagai maintainer situs, saya ingin fungsi resolve baru diuji dengan fixture GROQ-shaped, mengikuti pola `resolveArticles`/`resolveGallery`/`resolveEvents` yang sudah ada, sehingga logika normalisasi bisa diverifikasi tanpa memanggil Sanity sungguhan.
13. Sebagai maintainer situs, begitu keenam Halaman Program + `/kontak` + `/profil-salik` terverifikasi jalan end-to-end dari Sanity, saya ingin key-key terkait (`khitanan`, `dauroh`, `tawajjuh`, `konseling`, `baktiSosial`, `silaturahmi`, `contact`, `salik`) dihapus dari `sourceData.js` sebagai tiket cutover terpisah, sehingga tidak ada dua sumber kebenaran yang tumpang tindih.
14. Sebagai pengurus surau, saya ingin menekan tombol "Publish" di Studio untuk dokumen manapun di fase ini dan melihat perubahan tayang di situs publik dalam beberapa menit lewat webhook → rebuild otomatis yang sudah ada, tanpa langkah tambahan apa pun dari saya.

## Implementation Decisions

- **Delapan schema type baru** di `studio/schemaTypes/`, semuanya singleton (pola `profilSurau.ts`: `_id` tetap, dikeluarkan dari alur "Create new"/duplicate/delete lewat `SINGLETON_TYPE`/`SINGLETON_ID` di `sanity.config.ts` — tiap type baru butuh entri singleton sendiri di konfigurasi itu, bukan berbagi satu entri):
  - `khitanan`, `dauroh`, `tawajjuh`, `konseling`, `baktiSosial`, `silaturahmi` — `_id` sama persis dengan nama type (tanpa prefix, mengikuti pola `profilSurau`). Field bersama ditarik ke helper `studio/schemaTypes/lib/programFields.ts` (pola `eventFields.ts`): `title` (string, required), `narrative` (text, required, isi bisa multi-paragraf dipisah `\n \n`, markup `**bold**`/`*italic*` tetap dipakai apa adanya — bukan Portable Text), `person` (object `{name: string required, role: string required, phone: string required}`), `gallery` (array objek inline `{image (type image, hotspot: true, required), alt (string, required), caption (string, required), meta (string, opsional)}` — opsional/boleh array kosong; TIDAK ada field `ratio` — rasio galeri Halaman Program tetap hardcode `1 / 1` di `ProgramSection.jsx`, bukan field editorial, konsisten prinsip "kurasi field berisiko").
  - `contact` — `_id: 'contact'`. Fields: `address` (string atau text, required), `mapsUrl` (url, required), `pengurus` (array objek `{name, role, phone}`, minimal 1 item).
  - `salik` — `_id: 'salik'`. Fields: `title` (string, required), `narrative` (text, required, format sama dengan program), `bullets` (array of string, required, minimal 1 item, tiap item boleh pakai markup `**bold**`), `closing` (text, required, format sama), `gallery` (array objek inline, bentuk identik dengan gallery Halaman Program, opsional).
- **`resolveSanityContent.js`** — fungsi murni baru:
  - `resolveProgram(doc)`: menerima satu dokumen Halaman Program mentah, mengembalikan bentuk yang sudah dikonsumsi `ProgramSection.jsx` sekarang: `{title, narrative, gallery: resolveGallery(...)-shaped, person: {name, role, phone}}`. Dipanggil sekali per program (6×) di `fetch-sanity-content.mjs`, atau dibungkus jadi satu fungsi yang menerima keenam dokumen dan mengembalikan object berkey nama program — detail final diserahkan ke implementer, selama bentuk output per program tetap identik dengan `SB_DATA.<program>` sekarang.
  - `resolveContact(doc)`: mengembalikan `{address, maps, pengurus: [...]}` — nama field output (`maps`, bukan `mapsUrl`) mengikuti nama field yang sudah dipakai `ContactPage.jsx` sekarang supaya komponen itu tidak perlu diubah.
  - `resolveSalik(doc)`: mengembalikan `{title, narrative, bullets: [...], closing, gallery: [...]}` — bentuk identik `SB_DATA.salik` sekarang.
  - Galeri di ketiga fungsi ini pakai ulang logika resolve gambar yang sama dengan `resolveGallery` yang sudah ada (`resolveImage` untuk hotspot→object-position, `urlFor` build-time) — TANPA field `ratio` (di-hardcode di komponen, bukan hasil resolve).
- **`fetch-sanity-content.mjs`**: ditambah GROQ query untuk kedelapan document baru (`*[_type == "khitanan"][0]{...}` dst., pola singleton `[0]` sama seperti query `profilSurau` yang sudah ada), memanggil `resolveProgram`/`resolveContact`/`resolveSalik`, menambah key-key baru ke `sanityContent.json`.
- **`App.jsx`**: `rawData` digabung dengan hasil resolve di atas sebelum dipanggil ke `deriveSiteData` — pola sama persis dengan `gallery`/`events`/`news`/`profilSurau.video` sekarang (mis. `khitanan: sanityContent.khitanan`, `contact: sanityContent.contact`, `salik: sanityContent.salik`, dst.).
- **`ProgramSection.jsx`, `ProfilSalikPage.jsx`, `ContactPage.jsx`, `Khitanan/Dauroh/Tawajjuh/Konseling/BaktiSosial/SilaturahmiPage.jsx`**: tidak berubah — tetap mengonsumsi props/`site.<key>` dalam bentuk yang sudah ada.
- **`sanity.config.ts`**: struktur singleton diperluas dari satu entri (`profilSurau`) jadi delapan entri baru + yang lama (total 9), tiap entri baris sendiri di `S.list().items([...])` (pola `.id(SINGLETON_TYPE).child(S.document().schemaType(...).documentId(...))` diulang per type) dan filter `document.actions`/`document.newDocumentOptions` diperluas dari cek `schemaType === SINGLETON_TYPE` (satu string) jadi cek keanggotaan di array/set berisi kesembilan nama singleton type.
- **Migrasi konten existing**: skrip satu-kali (`scripts/migrate-program-contact-salik-to-sanity.mjs`, dijalankan manual, `--dry-run` dulu lalu `--write`, mengikuti pola skrip migrasi Fase 1/2 — dibuang setelah dipakai, tidak disimpan permanen di repo) yang membaca `SB_DATA.khitanan/.dauroh/.tawajjuh/.konseling/.baktiSosial/.silaturahmi/.salik/.contact` di `sourceData.js`, menggabungkan tiap program dengan kontak person yang sesuai dari `SB_DATA.contact.<program>` lama, dan upload sebagai delapan dokumen (dengan `_id` tetap sesuai keputusan di atas) ke dataset `production`. Foto lokal (`import img from '...'`) diunggah sebagai asset Sanity lewat `client.assets.upload` (pola yang sama dipakai skrip migrasi galeri Fase 1).
- **Cutover**: begitu terverifikasi jalan end-to-end di produksi (build log + webhook + rebuild otomatis, pola tiket Fase 1/2), key-key terkait dihapus dari `sourceData.js` sebagai tiket terpisah, tidak dibiarkan sebagai fallback mati.

## Testing Decisions

- `resolveProgram`/`resolveContact`/`resolveSalik` ditest dengan fixture objek GROQ-shaped (dokumen palsu per type) → dibandingkan terhadap bentuk output yang diharapkan, mengikuti pola persis `resolveArticles.test.js`/`resolveGallery`/`resolveEvents` yang sudah ada di `resolveSanityContent.test.js`.
- Kasus wajib diuji:
  - `resolveProgram` mengembalikan bentuk yang tepat untuk dokumen dengan galeri terisi maupun galeri kosong (array kosong tidak error).
  - `resolveProgram` meneruskan `person` (`name`/`role`/`phone`) apa adanya.
  - `resolveContact` mengembalikan `pengurus` sebagai array (termasuk kasus 1 item, sesuai data sekarang) dan meneruskan `address`/`maps` (dari `mapsUrl`) dengan benar.
  - `resolveSalik` meneruskan `bullets` sebagai array string dan `closing` apa adanya, gallery kosong tidak error.
  - Markup `**bold**`/`*italic*` di dalam `narrative`/`bullets`/`closing` diteruskan sebagai string mentah oleh fungsi resolve (parsing tetap tanggung jawab `parseInlineMarkup()` di frontend, tidak diparse di layer resolve) — test memverifikasi string tidak diubah/di-strip.
- `deriveSiteData.js` dan komponen (`ProgramSection`, `ContactPage`, dst.) tidak perlu ditest ulang — tidak berubah, cukup diverifikasi tidak ada regresi visual (test yang ada tetap lulus tanpa modifikasi ekspektasi).
- Skrip migrasi satu-kali tidak wajib ditest otomatis (dijalankan sekali, dibuang setelah dipakai), tapi wajib dijalankan `--dry-run` dulu sebelum `--write` ke dataset produksi, dan wajib diverifikasi manual bahwa upload asset foto (khitanan/dauroh/silaturahmi/salik) berhasil dan ter-link benar ke dokumen yang tepat.
- `fetch-sanity-content.mjs` (I/O nyata ke Sanity) tidak ditest lewat unit test — verifikasi lewat build nyata (dev server lokal dulu, lalu end-to-end produksi lewat webhook, pola Fase 1/2).

## Out of Scope

- Migrasi tipe konten selain yang disebut di sini — `programs`/`stats` (ringkasan/counter Beranda), silsilah, `location`, `donation` (termasuk `qris`/`bank`) — fase terpisah menyusul, urutan sesuai ADR 0013.
- Upgrade field narasi/bullets/closing dari plain text + markup buatan sendiri ke Portable Text — di luar cakupan fase ini (lihat keputusan grilling sesi ini), bisa jadi ADR terpisah bila pengurus merasa terbatas di masa depan.
- Mengubah `ratio` galeri Halaman Program/Profil Salik jadi field editorial di Studio — tetap hardcode di kode (`1 / 1`), konsisten prinsip "kurasi field berisiko" yang sudah dipakai `galleryItem.ratio`.
- Perubahan visual/UI apa pun pada `ProgramSection`/`ContactPage`/`ProfilSalikPage` — tampilan harus identik dengan sekarang.
- Draft/approval workflow sebelum publish, dataset staging/preview terpisah — mengikuti keputusan lintas-fase yang sudah ada sejak Fase 1.
- Memberi pengurus kemampuan membuat Halaman Program baru/rute baru sendiri dari Studio — tetap enam rute tetap di kode per ADR 0013.

## Further Notes

- Keputusan-keputusan di spec ini berasal dari sesi grilling (skill `grilling` + `domain-modeling`) yang melanjutkan roadmap ADR [0013](../../docs/adr/0013-seluruh-konten-sumber-data-migrasi-ke-sanity.md), dan menghasilkan ADR baru [0014](../../docs/adr/0014-halaman-program-jadi-schema-type-terpisah-bukan-satu-type-bersama.md) untuk keputusan "enam schema type terpisah, bukan satu type bersama".
- Nama fungsi resolve (`resolveProgram`/`resolveContact`/`resolveSalik`) dan nama skrip migrasi bersifat indikatif — keputusan final ada di tangan agen implementasi, selama bentuk dan tanggung jawabnya sesuai spec ini dan pola yang sudah dipakai fungsi resolve lain di modul yang sama.
- Prior art detail (pola singleton, pola skrip migrasi `--dry-run`/`--write`, pola upload asset foto lokal ke Sanity) ada di `.scratch/cms-migration-sanity/` (Fase 1) dan `.scratch/jadwal-pengumuman-via-sanity/` (Fase 2) — pola yang sama harus diikuti, bukan didesain ulang dari nol.
- Setelah implementasi fase ini selesai dan cutover terverifikasi, entri glosarium "Sumber Data" dan "Dataset Sanity" di `CONTEXT.md` perlu diperbarui untuk mencatat tipe dokumen baru dan field yang sudah dihapus dari `sourceData.js` — mengikuti pola pembaruan yang sama seperti setelah Fase 1/2 (bukan bagian dari spec ini, dilakukan saat cutover).
