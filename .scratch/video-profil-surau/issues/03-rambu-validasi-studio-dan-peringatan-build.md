# 03 — Rambu untuk pengurus: validasi di Studio + peringatan di log build

**What to build:** Pengurus surau yang menempel link keliru — link Shorts, link channel, link video yang salah satu hurufnya hilang, atau URL yang sama sekali bukan YouTube — **langsung dikoreksi di Studio saat mengetik**, jauh sebelum sempat menekan Publish. Pesannya menyebutkan bentuk link yang diterima, sehingga pengurus bisa memperbaikinya sendiri tanpa bertanya ke maintainer.

Untuk sisa kasus yang lolos dari Studio, build menuliskan **peringatan** di log GitHub Actions yang menyebut URL penyebabnya. Peringatan itu **tidak** mengubah exit code dan **tidak** menggagalkan deploy: publish di Studio memicu deploy otomatis lewat webhook, sehingga satu salah tempel pada satu seksi tidak boleh menjatuhkan seluruh situs. Log itu menjadi satu-satunya tempat yang bisa menjawab pertanyaan maintainer "kenapa videonya hilang?".

Aturan link yang sama berlaku di dua tempat — validasi Studio dan penerjemahan saat build — karena Studio dan situs adalah paket npm terpisah tanpa modul bersama. Duplikasi ini **disengaja**, bukan kelalaian, dan harus ditandai demikian di kode.

**Blocked by:** 01 — Seksi video profil tayang dari Sanity.

- [ ] Field link di Studio menolak URL yang bukan link video YouTube yang sah, dengan pesan yang menyebutkan bentuk yang diterima
- [ ] Link Shorts ditolak di Studio dengan alasan yang bisa dipahami pengurus (orientasi videonya tidak cocok dengan seksi ini)
- [ ] Link berekor penanda waktu atau playlist tetap **diterima** di Studio — pengurus tidak perlu membersihkan URL hasil tombol Share
- [ ] URL yang ditolak saat build menghasilkan peringatan di log yang menyebut URL penyebabnya
- [ ] Peringatan itu tidak mengubah exit code; build dan deploy tetap berhasil, seksi video saja yang hilang
- [ ] Kedua tempat yang memuat aturan link punya komentar yang menunjuk ke pasangannya, menandai duplikasi sebagai keputusan sadar beserta alasannya

**Status:** ready-for-agent
