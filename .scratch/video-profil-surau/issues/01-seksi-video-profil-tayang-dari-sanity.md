# 01 — Seksi video profil tayang dari Sanity

**What to build:** Pengurus surau membuka Sanity Studio, menemukan satu entri **Profil Surau** yang langsung bisa diedit (bukan koleksi dengan tombol "buat baru"), mengisi judul, paragraf pengantar, dan link YouTube, lalu menekan Publish. Setelah rebuild otomatis berjalan, seksi video muncul di halaman **Profil Surau** — tepat di antara seksi hero dan seksi pengelolaan — berisi judul, paragraf, dan video yang bisa ditonton langsung di halaman.

Kalau entri itu belum pernah di-publish, atau link yang tersimpan bukan link video YouTube yang sah, seksi itu **tidak muncul sama sekali**: halaman tampil persis seperti sebelum fitur ini ada, dan build tetap berhasil. Tidak ada placeholder, tidak ada ruang kosong.

Ini irisan vertikal penuh: tipe dokumen singleton di Studio, penarikan build-time, penerjemahan link jadi URL embed, penggabungan ke data situs, komponen pemutar, seksi halaman, dan tes di dua seam yang sudah ada.

Konteks dan alasan lengkap ada di `spec.md`. Yang paling menentukan: situs tetap 100% static export tanpa dependency runtime ke Sanity (ADR 0006), dan penerjemahan link terjadi saat build — komponennya menerima URL yang sudah jadi, seperti iframe peta di Footer hari ini.

**Blocked by:** None — can start immediately.

- [ ] Tipe dokumen baru untuk Profil Surau ada di Studio dengan field judul (wajib), paragraf pengantar (opsional), dan link YouTube (wajib)
- [ ] Studio menampilkannya sebagai satu entri singleton dengan `_id` tetap; pengurus tidak bisa membuat entri kedua maupun menghapusnya
- [ ] Tidak ada field apa pun yang mengendalikan tata letak (rasio, lebar, warna) — konsisten dengan prinsip "kurasi field berisiko" pada galeri
- [ ] Skrip fetch build-time menarik dokumen itu dan menuliskan hasilnya ke JSON hasil build, tanpa fetch dari browser pengunjung
- [ ] Fungsi resolve baru mengembalikan judul, paragraf, dan URL embed siap pakai — atau `null` bila dokumen tidak ada, link kosong, atau link tidak sah
- [ ] Link bentuk `watch?v=`, `youtu.be/`, dan `/embed/` sama-sama diterima dan menghasilkan URL embed yang sama untuk video yang sama
- [ ] Ekor parameter seperti penanda waktu dan playlist dibuang dari hasil
- [ ] Link Shorts ditolak (`null`) — orientasi 9:16 merusak bingkai seksi ini
- [ ] URL embed dibangun di atas domain `youtube-nocookie`, bukan `youtube.com`
- [ ] Hasil resolve digabungkan ke cabang data Profil Surau yang sudah ada, sehingga komponen halaman tetap membaca satu objek
- [ ] Komponen pemutar baru hidup di design system situs dan diekspor lewat titik impor tunggalnya; ia menerima URL embed dan judul yang sudah jadi, dan tidak melakukan parsing apa pun
- [ ] Seksi tampil dengan latar `sand-200`, rasio 16:9, lebar maksimum mengikuti container sempit yang sudah dipakai seksi silsilah
- [ ] Di mobile seksi tampil selebar gutter halaman dengan rasio tetap 16:9
- [ ] Halaman Profil Surau tetap bespoke dan tetap tidak memakai komponen seksi Halaman Program
- [ ] Tes di seam modul resolve mencakup: ketiga bentuk link diterima, Shorts ditolak, parameter dibuang, dokumen kosong/link sembarang → `null`, domain `youtube-nocookie`, judul/paragraf diteruskan apa adanya
- [ ] Tes di seam halaman mencakup dua kasus: video ada (judul, paragraf, dan teks aksesibilitas muncul) dan video tidak ada (seksi hilang dari markup, seksi lain tetap utuh)
- [ ] Fixture tes halaman memakai teks yang tidak ada di Sumber Data sungguhan, mengikuti konvensi berkas tes itu
- [ ] Komponen pemutar tidak dibuatkan berkas tes sendiri — ia diuji lewat seam halaman

**Status:** ready-for-agent
