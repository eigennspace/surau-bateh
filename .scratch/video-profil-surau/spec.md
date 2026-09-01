# Video Profil di Halaman Profil Surau

Status: ready-for-agent

## Problem Statement

Halaman **Profil Surau** memperkenalkan surau lewat teks dan foto diam: cerita pembangunan, foto gotong royong, silsilah keilmuan, dan foto pengurus. Pengurus surau mendapat masukan bahwa perkenalan itu terasa kurang hidup — ada video profil surau yang sudah dibuat, tapi hari ini tidak ada tempat untuk menayangkannya di situs, dan tidak ada cara untuk pengurus menambahkannya sendiri.

Dua kekurangan yang menyertainya:

1. **Bagi pengunjung** — tidak ada cara melihat surau dalam gerak dan suara. Foto diam tidak menyampaikan suasana majelis, lokasi, atau orang-orangnya seperti video.
2. **Bagi pengurus** — seluruh isi Halaman Profil hari ini hidup di **Sumber Data**, artinya menambah atau mengganti video berarti maintainer situs harus mengedit kode dan mendorong perubahan lewat git. Video profil adalah konten yang justru diperkirakan akan direvisi berulang (berkas yang ada sekarang sudah bernama "REVISI TIGA"), sehingga menaruhnya di Sumber Data akan menciptakan permintaan berulang ke maintainer — bottleneck yang persis ingin dihilangkan ADR 0006.

## Solution

Menambahkan satu **seksi video** di Halaman Profil Surau, tepat setelah seksi hero, yang isinya dikelola pengurus sendiri lewat **Sanity Studio**.

Videonya **di-host di YouTube**, bukan diunggah sebagai asset Sanity dan bukan disematkan dari Google Drive. Yang disimpan di Dataset Sanity hanyalah **URL** video beserta judul dan paragraf pengantar seksinya. Pengurus mengganti video dengan menempel link baru dan menekan Publish; webhook memicu rebuild + deploy seperti galeri dan artikel hari ini.

Di halaman, seksi itu tidak langsung memuat player YouTube. Yang tampil adalah **thumbnail video + tombol play**; iframe YouTube baru disisipkan setelah pengunjung mengklik. Thumbnail diambil otomatis dari YouTube berdasarkan ID video, jadi pengurus tidak perlu mengunggah gambar apa pun.

Bila dokumen video belum di-publish atau URL-nya tidak sah, seksi itu **tidak muncul sama sekali** dan halaman tampil persis seperti sebelum fitur ini ada — build tetap berhasil, dengan peringatan di log.

Cakupan Sanity dibatasi pada seksi video ini saja. Sejarah surau, foto, silsilah, dan foto pengurus **tetap di Sumber Data**; memindahkan seluruh Halaman Profil ke Sanity adalah pekerjaan tersendiri di luar spec ini.

## User Stories

1. Sebagai pengunjung situs, saya ingin melihat video profil surau di halaman Profil Surau, sehingga saya bisa mengenal suasana dan orang-orangnya, bukan hanya membaca ceritanya.
2. Sebagai pengunjung situs, saya ingin video itu muncul di dekat bagian atas halaman (tepat setelah perkenalan), sehingga saya menemukannya tanpa harus menggulir melewati seluruh silsilah.
3. Sebagai pengunjung situs, saya ingin melihat judul dan satu paragraf pengantar di samping/atas videonya, sehingga saya tahu apa yang akan saya tonton sebelum memutuskan menekan play.
4. Sebagai pengunjung di koneksi mobile terbatas, saya ingin membuka halaman Profil Surau **tanpa** ikut mengunduh player video, sehingga saya tidak membayar kuota untuk sesuatu yang tidak saya tonton.
5. Sebagai pengunjung yang ingin menonton, saya ingin menekan tombol play pada thumbnail dan video langsung dimuat lalu diputar, sehingga tidak ada langkah tambahan yang membingungkan.
6. Sebagai pengunjung yang memakai pembaca layar, saya ingin tombol play dan bingkai videonya punya label yang menyebutkan judul videonya, sehingga saya tahu media apa yang ada di halaman itu.
7. Sebagai pengunjung yang peduli privasi, saya ingin situs tidak memasang cookie pelacak YouTube sebelum saya benar-benar memutar videonya.
8. Sebagai pengunjung yang membuka halaman di ponsel, saya ingin video tampil selebar layar dalam gutter halaman dengan proporsi yang benar, sehingga tidak terpotong atau menyisakan bilah hitam.
9. Sebagai pengunjung di desktop, saya ingin video tampil dengan lebar yang seimbang dengan isi halaman lain, bukan melebar mendominasi seluruh layar.
10. Sebagai pengurus surau, saya ingin membuka Sanity Studio dan menemukan satu entri "Profil Surau" yang bisa saya edit, sehingga saya tahu persis di mana mengubah video profil.
11. Sebagai pengurus surau, saya ingin mengganti video profil cukup dengan menempel link YouTube yang saya salin dari tombol Share, sehingga saya tidak perlu memotong ID video atau memahami format URL embed.
12. Sebagai pengurus surau, saya ingin link yang saya tempel tetap diterima meski membawa ekor penanda waktu atau playlist, sehingga saya tidak perlu membersihkan URL secara manual.
13. Sebagai pengurus surau, saya ingin diberi tahu langsung di Studio kalau link yang saya tempel bukan link video YouTube yang sah, sehingga saya memperbaikinya saat itu juga, bukan setelah situs tayang.
14. Sebagai pengurus surau, saya ingin mengubah judul dan paragraf pengantar seksi video di tempat yang sama dengan link videonya, sehingga saat saya mengganti video dengan versi baru, teks yang memperkenalkannya bisa saya sesuaikan sekaligus tanpa melibatkan maintainer.
15. Sebagai pengurus surau, saya ingin menekan Publish dan melihat video baru tayang di situs dalam beberapa menit tanpa menghubungi siapa pun, sama seperti saat saya mengunggah foto galeri.
16. Sebagai pengurus surau, saya ingin tidak bisa membuat dua entri "Profil Surau" secara tidak sengaja, sehingga tidak pernah ada kebingungan tentang entri mana yang tayang.
17. Sebagai pengurus surau, saya ingin bisa menayangkan video yang statusnya Unlisted di YouTube, sehingga video itu bisa tampil di situs surau tanpa harus bisa ditemukan orang lewat pencarian YouTube.
18. Sebagai pengurus surau, saya ingin kelak bisa mengubah status video itu jadi Public tanpa mengubah apa pun di Studio maupun di kode, sehingga keputusan itu murni keputusan kami di YouTube.
19. Sebagai pengurus surau yang belum sempat mengisi apa pun, saya ingin halaman Profil Surau tetap tampil normal tanpa ruang kosong atau tulisan "video segera hadir", sehingga situs tidak menjanjikan sesuatu yang belum tentu ada.
20. Sebagai maintainer situs, saya ingin situs tetap 100% static export tanpa dependency runtime ke Sanity, sehingga jaminan yang ditetapkan ADR 0006 tidak dilanggar oleh fitur ini.
21. Sebagai maintainer situs, saya ingin salah tempel link oleh pengurus **tidak** menggagalkan build, sehingga satu kekeliruan pada satu seksi tidak menjatuhkan seluruh situs saat deploy otomatis berjalan.
22. Sebagai maintainer situs, saya ingin melihat peringatan di log GitHub Actions ketika sebuah URL video ditolak, sehingga saya bisa menjelaskan kepada pengurus kenapa videonya tidak muncul.
23. Sebagai maintainer situs, saya ingin logika penerjemahan URL YouTube jadi URL embed diuji sebagai fungsi murni terpisah dari React, sehingga semua bentuk URL bisa dicek tanpa merender halaman.
24. Sebagai maintainer situs, saya ingin ada tes yang membuktikan seksi video benar-benar hilang saat datanya kosong, sehingga perilaku itu tidak diam-diam rusak di kemudian hari.
25. Sebagai maintainer situs, saya ingin membaca ADR yang menjelaskan **kenapa** video di-host di YouTube dan bukan diunggah ke Sanity, sehingga orang berikutnya yang berpikir "kan sudah ada Sanity, upload saja ke sana" menemukan jawabannya tanpa bertanya.
26. Sebagai maintainer situs, saya ingin `CONTEXT.md` menyebutkan bahwa Halaman Profil kini sebagian berasal dari Sanity, sehingga definisi "Sumber Data" tidak lagi menyesatkan pembaca berikutnya.
27. Sebagai maintainer situs, saya ingin tata letak seksi video (rasio, lebar, warna latar) tidak bisa diubah dari Studio, sehingga komposisi halaman tidak bisa rusak dari sisi konten — konsisten dengan prinsip "kurasi field berisiko" yang sudah dipakai galeri.

## Implementation Decisions

### Hosting video

- Video di-host di **YouTube**, di channel milik surau. **Bukan** sebagai asset file Sanity, dan **bukan** disematkan dari Google Drive.
  - Asset Sanity ditolak: MP4 mentah dari CDN asset tidak punya adaptive bitrate, dan setiap tontonan membebani kuota bandwidth asset — video adalah cara tercepat menghabiskannya.
  - Google Drive ditolak: `drive.google.com/file/d/<id>/preview` memang bisa di-iframe (mengembalikan 200 tanpa `X-Frame-Options`), tetapi tiap berkas punya kuota tayang harian yang, bila tercapai, membuat video mati sampai kuota reset — di luar kendali kita sama sekali.
- Status video di YouTube (Unlisted maupun Public) **tidak memengaruhi kode**: URL embed dan URL thumbnail sama-sama bekerja untuk keduanya. Keputusan status adalah keputusan pengurus di YouTube, bukan keputusan teknis.

### Model konten Sanity

- Tipe dokumen baru **`profilSurau`**, diperlakukan sebagai **singleton**: satu dokumen dengan `_id` tetap, ditampilkan di Studio sebagai satu entri yang langsung bisa diedit — bukan koleksi dengan tombol "buat baru". Tombol create/delete dinonaktifkan untuk tipe ini.
- Field:
  - `title` — judul seksi. **Wajib**, karena ia juga menjadi sumber seluruh teks aksesibilitas.
  - `description` — satu paragraf pengantar. Opsional.
  - `videoUrl` — URL YouTube. **Wajib**, dengan validasi di schema.
- Judul dan paragraf sengaja ikut ke Sanity meski keputusan lain membatasi cakupan pada "seksi video saja": teks itu memperkenalkan video tertentu, jadi mengganti video tanpa bisa mengganti kalimatnya akan membuat pengurus terjebak setengah jalan.
- Tidak ada field yang mengendalikan tata letak (rasio, lebar, warna). Tata letak sepenuhnya keputusan kode, konsisten dengan cara `galleryItem` mengunci field berisiko.
- Tidak ada field thumbnail. Thumbnail diturunkan dari ID video.

### Bentuk URL yang diterima

- Diterima: bentuk `watch?v=<id>`, `youtu.be/<id>`, dan `/embed/<id>`.
- **Ditolak: `/shorts/<id>`** — Shorts berorientasi 9:16 dan akan merusak bingkai 16:9 seksi ini. Ini penolakan berbasis bentuk, bukan keterbatasan teknis.
- Parameter tambahan (`t`, `list`, dan lainnya) dibuang saat normalisasi. Penanda waktu mulai bukan sesuatu yang layak diputuskan lewat tempel-link.
- Aturan yang sama diberlakukan **dua kali**: sebagai validasi schema di Studio (pengurus dikoreksi saat mengetik) dan saat build (jaring pengaman). Karena Studio dan situs adalah paket npm terpisah tanpa modul bersama, aturan ini **diduplikasi secara sadar** di dua tempat, masing-masing dengan komentar yang menunjuk ke pasangannya. Membangun jalur impor lintas paket hanya untuk satu regex tidak sepadan.

### Alur data

- Penarikan dokumen `profilSurau` menyusul pola build-time fetch yang sudah ada: skrip fetch menarik dokumen lewat GROQ, meneruskannya ke modul resolve murni, dan hasilnya ditulis ke JSON hasil build. Tidak ada fetch ke Sanity dari browser pengunjung (ADR 0006).
- Modul resolve mendapat fungsi ekspor baru **`resolveVideo`**, sejajar dengan `resolveArticles` dan `resolveGallery`. Kontraknya: menerima dokumen mentah, mengembalikan objek siap-render berisi `title`, `description`, `embedUrl`, dan `thumbnailUrl` — atau **`null`** bila dokumen tidak ada, `videoUrl` kosong, atau URL-nya tidak lolos aturan di atas.
- `embedUrl` dibangun di atas **`youtube-nocookie.com/embed/<id>`**, bukan `youtube.com/embed/<id>` — menunda cookie pelacak sampai video benar-benar diputar, tanpa mengorbankan apa pun.
- `thumbnailUrl` memakai varian **`hqdefault`**, bukan `maxresdefault`. `maxresdefault` hanya ada bila sumbernya minimal 720p dan sebaliknya membalas 404 — kegagalan yang hanya bisa dideteksi di browser, sesuatu yang tidak ingin kita tangani untuk keuntungan ketajaman yang marginal.
- Data hasil resolve **digabungkan ke cabang `profilSurau` yang sudah ada** saat data mentah disusun, sehingga komponen halaman tetap membaca satu objek dan tidak perlu tahu bagian mana yang berasal dari Sanity dan bagian mana dari Sumber Data. Pencampuran Sumber Data dengan konten Sanity memang sudah terjadi di lapisan itu untuk galeri. Fungsi derivasi data situs meneruskan cabang itu apa adanya, seperti sekarang.

### Perilaku saat data tidak ada atau rusak

- Seksi video **tidak dirender sama sekali** — bukan placeholder, bukan ruang kosong. Sejalan dengan cara Kampanye Donasi yang mati menghilangkan bloknya sepenuhnya.
- Build **tetap berhasil**. Publish di Studio memicu deploy otomatis lewat webhook, sehingga satu salah-tempel tidak boleh menjatuhkan seluruh situs.
- URL yang ditolak menghasilkan **peringatan di log build** (bukan error, tidak mengubah exit code). Jaring utamanya tetap validasi di Studio; peringatan ini untuk sisa kasus yang lolos, dan menjadi satu-satunya tempat yang bisa menjawab "kenapa videonya hilang".

### Komponen dan tampilan

- Komponen baru **`VideoEmbed`** hidup di design system situs bersama komponen bertema surau lainnya dan diekspor lewat titik impor tunggal design system.
- Kontrak komponennya sengaja **bodoh**: ia menerima `embedUrl`, `thumbnailUrl`, dan `title` yang sudah jadi, dan tidak melakukan parsing apa pun. Ini bukan pola baru — komponen Footer sudah merender `<iframe>` peta yang URL-nya dibangun di luar komponen dan dioper sebagai prop.
- **Klik-untuk-muat**: yang dirender awalnya adalah `<img>` thumbnail + tombol play. Iframe baru disisipkan ke DOM setelah tombol ditekan. Halaman yang tidak diklik tidak pernah memuat player YouTube.
- **Aksesibilitas** seluruhnya diturunkan dari `title`: `alt` thumbnail, `title` pada iframe, dan `aria-label` tombol play. Tidak ada field a11y terpisah di Sanity — field semacam itu cenderung dibiarkan kosong atau diisi asal, sementara judul seksi di sini memang sudah mendeskripsikan videonya.
- **Penempatan**: seksi tersendiri antara seksi hero dan seksi pengelolaan.
- **Tata letak**: latar `sand-200` (kontras halus dari hero `sand-100`, tanpa memaksa mengubah warna seksi mana pun yang sudah final), bingkai rasio 16:9, lebar maksimum mengikuti container sempit yang sudah dipakai seksi silsilah — bukan container lebar. Di mobile: lebar penuh dalam gutter, rasio tetap 16:9. Judul dan paragraf memakai komponen heading seksi yang sama dengan seksi lain di halaman ini.
- Halaman Profil Surau tetap **bespoke** dan tetap **tidak** memakai komponen seksi Halaman Program — seksi video mengikuti pola halaman ini (media berpasangan dengan teks), bukan sebaliknya.

### Dokumentasi domain

- **ADR baru** yang mencatat keputusan yang mahal dibalik: video di-host di YouTube, bukan sebagai asset Sanity, beserta alternatif yang ditolak dan alasannya. Pemindahan konten ke Sanity itu sendiri tidak butuh ADR — itu lanjutan ADR 0006.
- **`CONTEXT.md` disunting**, tanpa istilah glosarium baru:
  - Entri **Sumber Data** — kalimat yang menyatakan seluruh teks dan caption foto Halaman Profil berasal dari Sumber Data tidak lagi sepenuhnya benar dan harus diperbaiki.
  - Entri **Halaman Profil** — menyebutkan seksi video di Profil Surau dan bahwa isinya berasal dari Sanity.
  - Entri **Dataset Sanity** — menambahkan tipe dokumen baru ke daftar.
- "Video Profil" **tidak** dijadikan istilah glosarium tersendiri: ia tidak punya sinonim yang membingungkan, tidak punya batas yang diperdebatkan, dan tidak dipakai di luar satu seksi di satu halaman — beda dari istilah seperti Cabang Silsilah atau Salik yang menandai batas konseptual.

## Testing Decisions

Tes yang baik di sini menguji **perilaku yang bisa diamati dari luar** — bentuk URL apa yang diterima dan apa keluarannya, serta apa yang muncul dan tidak muncul di halaman. Bukan menguji bahwa suatu fungsi internal dipanggil, bukan menguji struktur internal komponen.

**Tidak ada seam tes baru yang dibuat.** Dua seam yang dipakai keduanya sudah ada:

### Seam A — modul resolve konten Sanity

Modul murni tanpa I/O (builder URL asset disuntik dari luar), yang berkas tesnya sudah ada dengan satu blok `describe` per fungsi ekspor. `resolveVideo` diuji lewat blok `describe` baru di berkas yang sama. Prior art langsung: blok tes `resolveGallery` dan `resolveArticles`.

Yang dicakup:

- Ketiga bentuk URL yang diterima menghasilkan `embedUrl` yang sama untuk ID video yang sama.
- URL Shorts ditolak → `null`.
- Ekor `t`/`list` dibuang dari hasil.
- Dokumen tidak ada, `videoUrl` kosong, dan URL sembarang → `null`.
- `embedUrl` memakai domain `youtube-nocookie`.
- `thumbnailUrl` memakai varian `hqdefault` dan ID video yang benar.
- `title`/`description` diteruskan apa adanya.

### Seam B — halaman Profil Surau

Halaman dirender jadi markup statis dengan fixture prop; berkas tesnya sudah ada dan sudah memisahkan Halaman Profil dari Halaman Program. Fixture-nya mengikuti konvensi yang sudah dipakai di sana: memakai teks yang **tidak** ada di Sumber Data sungguhan, supaya tes bisa membedakan "dibaca dari data" dari "kebetulan sama karena hardcoded".

Yang dicakup:

- Video ada → judul, paragraf, thumbnail, dan teks aksesibilitas muncul di markup.
- Video tidak ada (`null`) → seksi benar-benar tidak ada di markup, dan seksi-seksi lain halaman tetap utuh.

### Yang sengaja tidak dites

- **`VideoEmbed` tidak punya berkas tes sendiri.** Ia diuji lewat Seam B. Setelah parsing URL pindah ke build-time, yang tersisa di komponen hanyalah markup dan satu state klik; menambah berkas tes komponen berarti seam ketiga untuk menguji markup yang sudah tercakup. Komponen Footer yang juga merender iframe pun tidak punya tes sendiri hari ini.
- **Interaksi klik-untuk-muat tidak dites.** Tes halaman memakai perenderan markup statis yang tidak menjalankan event handler; menambah tes interaktif berarti memperkenalkan alat baru ke dalam suite hanya untuk satu tombol.
- **Schema Sanity dan skrip fetch tidak dites.** Keduanya adalah lapisan I/O/konfigurasi tipis; pola repo ini memang menempatkan tes pada modul murni di bawahnya.

### Titik lemah yang diterima secara sadar

Fixture di Seam B ditulis tangan, jadi secara teori bisa menyimpang dari keluaran asli `resolveVideo` — kedua seam hijau sementara produksi salah. Ini **tidak** dicegah dengan membangun fixture Seam B lewat pemanggilan `resolveVideo`: risiko yang sama persis sudah ada untuk galeri hari ini, dan menyeret modul resolve ke dalam tes halaman akan mengikat dua lapisan yang selama ini sengaja dipisahkan.

## Out of Scope

- **Memindahkan sisa Halaman Profil Surau ke Sanity.** Sejarah, foto pembangunan, foto gotong royong, foto pengurus, dan silsilah tetap di Sumber Data. Ini pekerjaan besar tersendiri (upload aset, hotspot, struktur silsilah rekursif) dan layak jadi spec sendiri.
- **Video di halaman lain.** Halaman Program, Profil Salik, dan Beranda tidak mendapat seksi video. Bila kelak dibutuhkan, generalisasi model kontennya adalah keputusan tersendiri dengan kebutuhan yang belum diketahui.
- **Daftar video.** Modelnya satu video yang digantikan revisi berikutnya, bukan koleksi yang tumbuh.
- **Playlist, penanda waktu mulai, autoplay, dan kontrol player kustom.**
- **Mengunggah video ke channel YouTube surau.** Itu pekerjaan pengurus di luar repo; sampai dokumennya di-publish dengan URL sah, halaman tampil persis seperti hari ini.
- **Transkrip, subtitle, atau caption video.** Bila dibutuhkan, itu dikelola di YouTube, bukan di situs.
- **Mengubah warna atau tata letak seksi Halaman Profil Surau yang sudah ada.**
- **Menghapus atau mengubah pipeline galeri/artikel yang sudah berjalan.**

## Further Notes

- Berkas video yang jadi pemicu spec ini saat ini ada di Google Drive dengan nama "REVISI TIGA" — nama yang menegaskan bahwa video ini memang direvisi berulang, dan menguatkan keputusan "satu video yang digantikan, bukan daftar yang tumbuh". Berkas itu perlu diunggah ke channel YouTube surau sebelum fitur ini bisa terlihat hasilnya.
- Video sebaiknya diunggah ke **channel milik surau**, bukan akun pribadi seseorang: link yang tayang di situs akan ikut nasib akun itu.
- Setelah spec ini, Halaman Profil Surau membaca dari **dua sumber** — Sumber Data dan Dataset Sanity. Itu harga langsung dari keputusan membatasi cakupan, dan `CONTEXT.md` harus menyebutnya eksplisit agar tidak jadi kejutan bagi pembaca berikutnya.
- Dokumen singleton `profilSurau` sengaja dinamai mengikuti cabang data yang sudah ada, bukan dinamai menurut isinya saat ini (misalnya "video profil"), supaya ia menjadi pintu masuk yang wajar bila kelak sisa Halaman Profil Surau ikut pindah ke Sanity.
- Ini akan menjadi tipe dokumen Sanity ketiga di proyek ini dan **singleton pertama** — Studio belum punya pola struktur kustom sama sekali, jadi implementasinya menetapkan pola itu untuk singleton berikutnya.
