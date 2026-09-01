# 02 — Klik-untuk-muat dengan thumbnail YouTube

**What to build:** Pengunjung membuka halaman **Profil Surau** di koneksi mobile terbatas dan **tidak** ikut mengunduh player YouTube. Yang tampil di seksi video adalah gambar thumbnail video itu sendiri dengan tombol play di atasnya. Player baru dimuat — dan cookie YouTube baru dipasang — setelah pengunjung benar-benar menekan tombol play.

Thumbnail-nya diambil otomatis dari YouTube berdasarkan video yang dipilih pengurus, jadi ini tidak menambah satu pun pekerjaan di Studio: tidak ada field baru, tidak ada gambar yang perlu diunggah.

Pengunjung yang memakai pembaca layar mendengar judul video pada tombol play, pada thumbnail, dan pada bingkai videonya — semuanya diturunkan dari judul yang sudah diisi pengurus, tanpa field aksesibilitas terpisah.

Varian thumbnail yang dipakai adalah `hqdefault`, bukan `maxresdefault`: yang terakhir hanya ada bila sumber videonya minimal 720p dan sebaliknya membalas 404 — kegagalan yang hanya bisa dideteksi di browser, dan tidak sepadan dengan keuntungan ketajamannya.

**Blocked by:** 01 — Seksi video profil tayang dari Sanity.

- [ ] URL thumbnail masuk ke kontrak fungsi resolve, diturunkan dari ID video yang sama
- [ ] URL thumbnail memakai varian `hqdefault`
- [ ] Seksi video merender gambar thumbnail dan tombol play; iframe tidak ada di markup awal halaman
- [ ] Menekan tombol play menyisipkan iframe dan videonya bisa diputar
- [ ] Membuka halaman tanpa menekan play tidak memuat player YouTube sama sekali
- [ ] Teks alternatif thumbnail, label tombol play, dan judul bingkai video semuanya diturunkan dari judul dokumen — tidak ada field aksesibilitas terpisah di Studio
- [ ] Thumbnail tetap bekerja untuk video berstatus Unlisted maupun Public, tanpa perubahan kode
- [ ] Tes di seam modul resolve mencakup URL thumbnail: varian dan ID video yang benar
- [ ] Tes di seam halaman membuktikan thumbnail dan teks aksesibilitasnya ada di markup saat video tersedia
- [ ] Interaksi klik tidak dites — seam halaman merender markup statis, dan satu tombol tidak sepadan dengan memperkenalkan alat baru ke suite

**Status:** ready-for-agent
