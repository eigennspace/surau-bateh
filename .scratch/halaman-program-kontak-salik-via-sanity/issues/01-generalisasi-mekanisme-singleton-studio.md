# 01 — Generalisasi mekanisme singleton Sanity Studio

**What to build:** `sanity.config.ts` saat ini mengunci perilaku singleton (masuk daftar "Konten" sebagai satu entri langsung-edit, tidak bisa dibuat entri kedua/duplicate/delete) untuk **satu** nama type (`profilSurau`, lewat konstanta `SINGLETON_TYPE`/`SINGLETON_ID` tunggal). Tiket ini menggeneralisasi mekanisme itu supaya mendukung **daftar** tipe dokumen singleton, masing-masing dengan `_id` tetapnya sendiri, tanpa menulis ulang struktur/filter setiap kali satu singleton baru ditambahkan. Ini murni infrastruktur Studio — belum ada schema atau konten baru, situs publik tidak berubah.

**Blocked by:** None — bisa mulai langsung.

**Status:** done — sudah terimplementasi & tergabung di main (lihat riwayat git); label ready-for-agent sebelumnya usang

- [x] `sanity.config.ts` diubah dari satu pasang `SINGLETON_TYPE`/`SINGLETON_ID` (string tunggal) jadi daftar/mapping (mis. array `{type, id}` atau `Record<type, id>`) yang bisa menampung banyak singleton — `profilSurau` yang sudah ada dipindah jadi entri pertama di daftar itu, perilakunya tidak berubah.
- [x] Struktur `S.list().items([...])` menampilkan satu baris per singleton di daftar itu (pola `.id(type).child(S.document().schemaType(type).documentId(id))` diulang per entri), diikuti divider, lalu sisa tipe dokumen non-singleton seperti sekarang (`S.documentTypeListItems().filter(...)` mengecualikan seluruh nama singleton, bukan cuma satu).
- [x] `document.newDocumentOptions` dan `document.actions` diubah dari cek `schemaType === SINGLETON_TYPE` (satu string) jadi cek keanggotaan `schemaType` di daftar/set nama singleton.
- [x] Diverifikasi manual di Studio lokal (`npm run dev` di `studio/`): `profilSurau` masih berperilaku identik seperti sebelumnya (tidak bisa dibuat entri kedua, tidak bisa di-duplicate/delete/unpublish, tetap tampil sebagai entri langsung-edit di daftar "Konten").
- [x] Kode ini disiapkan untuk gampang ditambah entri singleton baru (tiket 02/03/04 masing-masing hanya perlu menambah satu entri ke daftar ini, tidak menyentuh ulang struktur/filter).
