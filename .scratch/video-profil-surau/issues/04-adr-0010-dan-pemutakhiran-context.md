# 04 — ADR 0010 + pemutakhiran CONTEXT.md

**What to build:** Maintainer berikutnya yang melihat seksi video di Profil Surau dan berpikir "kan sudah ada Sanity, kenapa videonya tidak diunggah saja ke sana?" menemukan jawabannya di repo, tanpa perlu bertanya kepada siapa pun.

Yang layak diabadikan sebagai ADR bukan "video dikelola lewat Sanity" — itu lanjutan wajar dari ADR 0006. Yang perlu dicatat adalah **keputusan yang mahal dibalik**: video di-host di YouTube dan Sanity hanya menyimpan link-nya, beserta alternatif yang ditolak dan alasan penolakannya.

Selain itu, `CONTEXT.md` kini memuat klaim yang tidak lagi sepenuhnya benar dan harus diperbaiki: entri **Sumber Data** masih menyatakan seluruh teks dan caption foto Halaman Profil berasal dari Sumber Data. Setelah fitur ini, Halaman Profil Surau membaca dari **dua sumber** — dan itu harga langsung dari keputusan membatasi cakupan, yang harus disebut eksplisit agar tidak jadi kejutan.

"Video Profil" **tidak** dijadikan istilah glosarium baru: ia tidak punya sinonim yang membingungkan, tidak punya batas yang diperdebatkan, dan tidak dipakai di luar satu seksi di satu halaman — beda dari istilah seperti Cabang Silsilah atau Salik yang menandai batas konseptual.

**Blocked by:** 01 — Seksi video profil tayang dari Sanity.

- [ ] ADR baru bernomor berikutnya mencatat keputusan meng-host video di YouTube, bukan sebagai asset Sanity
- [ ] ADR menyebut alternatif yang ditolak beserta alasannya: Google Drive (kuota tayang harian per berkas, di luar kendali kita) dan asset file Sanity (tanpa adaptive bitrate, dan video adalah cara tercepat menghabiskan kuota bandwidth asset)
- [ ] ADR mencatat bahwa Sanity menyimpan link, bukan berkas — sehingga mengganti video tidak melibatkan maintainer
- [ ] Entri **Sumber Data** di `CONTEXT.md` diperbaiki: klaim tentang seluruh teks dan caption foto Halaman Profil tidak lagi berlaku sepenuhnya
- [ ] Entri **Halaman Profil** menyebutkan seksi video di Profil Surau dan bahwa isinya berasal dari Sanity
- [ ] Entri **Dataset Sanity** menambahkan tipe dokumen baru ke daftar tipe yang disimpannya
- [ ] Tidak ada istilah glosarium baru yang ditambahkan
- [ ] Prasyarat operasional dicatat: video perlu diunggah ke channel YouTube milik surau, bukan akun pribadi seseorang, karena link yang tayang ikut nasib akun itu

**Status:** ready-for-agent
