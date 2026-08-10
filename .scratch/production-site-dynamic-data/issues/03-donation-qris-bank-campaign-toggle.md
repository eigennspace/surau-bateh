# 03 — Donasi: QRIS + rekening + toggle kampanye, hapus bilah kemajuan

**What to build:** Sumber Data mendapat field `donation`: gambar QRIS, info rekening bank (nama bank, nomor rekening, nama pemilik — nilai awal dari `informasi-rekening.md`: BSI, 7771 806 168, a.n. PONPES RIBATH AS SA ADY), dan satu toggle **Kampanye Donasi** (judul + deskripsi singkat, mis. "Renovasi Atap Surau"). `deriveSiteData` menggabungkan ini jadi bentuk siap-render: saat kampanye aktif, sertakan judul+deskripsi di atas QRIS/rekening; saat tidak aktif, tampilkan QRIS+rekening polos saja. Halaman Infak dan kartu donasi di panel Agenda (sisi Kajian) dirender dari hasil ini. Gambar QRIS tampil proporsional (`object-fit: contain`, tidak terpotong/gepeng). `DonationProgress` (bilah collected/target/deadline) tidak lagi dirender di manapun — baik di halaman Infak maupun kartu Agenda.

**Blocked by:** 01 — Situs produksi tayang di GitHub Pages dengan navigasi penuh, konten dari Sumber Data

**Status:** ready-for-agent

- [ ] Sumber Data punya field `donation` dengan QRIS, rekening bank, dan toggle kampanye (judul + deskripsi)
- [ ] `deriveSiteData` menghasilkan bentuk donasi siap-render yang berbeda sesuai status toggle kampanye
- [ ] Halaman Infak menampilkan QRIS (proporsional) + info rekening, dengan bingkai kampanye saat toggle aktif
- [ ] Kartu donasi di panel Agenda menampilkan bentuk yang sama (bukan lagi `DonationProgress`)
- [ ] `DonationProgress` tidak dirender di manapun di situs produksi
- [ ] Unit test: toggle kampanye aktif → hasil menyertakan judul & deskripsi
- [ ] Unit test: toggle kampanye tidak aktif → hasil hanya QRIS + rekening
