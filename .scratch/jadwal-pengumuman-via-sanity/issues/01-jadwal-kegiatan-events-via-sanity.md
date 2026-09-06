# 01 — Jadwal Kegiatan (events) via Sanity

**What to build:** Pengurus bisa menambah/mengubah/menghapus event kajian/tawajjuh mingguan maupun event sekali-jalan bertanggal (mis. Dauroh) lewat Sanity Studio, dan perubahan itu tampil di halaman Jadwal Kegiatan serta tiap Halaman Program (tersaring per kategori) setelah rebuild otomatis — menggantikan hack lama field `day`/`month` yang di-overload untuk merepresentasikan dua jenis event berbeda.

**Blocked by:** None — infrastruktur build-time fetch + webhook sudah ada dari Fase 1 (`.scratch/cms-migration-sanity/issues/03-scaffold-build-time-fetch-webhook.md`).

**Status:** ready-for-agent

- [ ] Schema `recurringEvent` didefinisikan di Sanity Studio: `dayOfWeek` (dropdown pilihan tetap Sen/Sel/Rab/Kam/Jum/Sab/Min), `timeLabel` (teks bebas, mis. "Ba'da Maghrib"), `title`, `speaker`, `place`, `category`.
- [ ] Schema `oneOffEvent` didefinisikan: `date` (tipe date Sanity, tanggal sungguhan), `timeLabel`, `title`, `speaker`, `place`, `category`.
- [ ] Fungsi murni `resolveEvents(recurringDocs, oneOffDocs, referenceDate)` ditambahkan ke `resolveSanityContent.js`: menggabungkan dua tipe dokumen jadi satu array bentuk datar `{day, month, title, speaker, time, place, category}` yang sudah dikonsumsi `deriveSiteData.js`/`AgendaSection.jsx`/`ProgramSection.jsx` — kedua modul itu TIDAK diubah.
- [ ] Ditest dengan fixture GROQ-shaped (mengikuti pola `resolveArticles`/`resolveGallery` di `resolveSanityContent.test.js`): `recurringEvent` menghasilkan `day`=hari, `oneOffEvent` menghasilkan `day`/`month` yang tetap dikenali `deriveKhatibJumat`/`deriveEventsWithToday` di `deriveSiteData.js` (test yang sudah ada untuk fungsi itu tetap lulus tanpa modifikasi ekspektasi).
- [ ] `fetch-sanity-content.mjs` diperluas fetch `recurringEvent`+`oneOffEvent`, memanggil `resolveEvents`, menambah key `events` ke `sanityContent.json`.
- [ ] `App.jsx` menggabungkan `events: sanityContent.events` ke `rawData` sebelum `deriveSiteData` dipanggil, persis pola `gallery` yang sudah ada.
- [ ] Skrip migrasi satu-kali (`--dry-run` dulu, lalu `--write`) membaca 8 entri `events` di `sourceData.js`, mengklasifikasi 7 entri jadi `recurringEvent` dan entri "Daurah Aswaja" jadi `oneOffEvent` (`date: 2026-08-13`), upload ke dataset `production`.
- [ ] Diverifikasi di dev server: halaman Jadwal Kegiatan (filter per hari) dan tiap Halaman Program (filter per kategori: Tawajjuh, Dauroh, Silat, Kajian & Tawajjuh, Kajian) tampil identik seperti sebelum migrasi.
- [ ] Diverifikasi end-to-end di produksi: publish di Studio memicu webhook → `repository_dispatch` → rebuild otomatis, log build mengonfirmasi event ditarik segar dari dataset produksi.
- [ ] `npm test`/`npm run build` lulus penuh.
