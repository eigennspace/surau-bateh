# Surau Bateh Lori — Design System

Sistem desain untuk **Surau Bateh Lori, Kota Padang** (Lori Lubuk Minturun, Sumatera Barat) — surau/musala warga di lereng bukit yang melayani salat lima waktu, kajian pekanan, tahsin dewasa, latihan silat tradisi, dan penggalangan infak jamaah. **Surau ini tidak memiliki TPQ** — jangan menuliskan program itu.

## Sumber yang diberikan
- `uploads/logo-surau-bateh.jpeg` — emblem resmi: kubah bertingkat emas + maroon, bulan sabit dan tiga bintang emas, kaligrafi **إِحْسَان (Ihsan)** di dalam mihrab, alas berbentuk kitab terbuka berwarna slate, dan wordmark **SURAU BATEH LORI KOTA PADANG** dalam huruf besar maroon tebal. Semua warna sistem ini diambil langsung dari berkas tersebut.
- `uploads/referensi-web-surau.jpg` — referensi tata letak situs masjid (Islamic center) yang dipilih pengguna: latar krem hangat, kartu putih, kartu jadwal salat dengan satu baris disorot, hero dua kolom, badge pil, tombol pil.

**Tidak ada codebase, berkas Figma, font asli, atau foto surau yang diberikan.** Semua yang tidak berasal dari kedua berkas di atas ditandai sebagai substitusi di bawah ini.

Tidak ada produk digital eksisting: sistem ini menyiapkan satu produk — **situs publik surau** (`ui_kits/website/`) — dan fondasi untuk turunan berikutnya (layar TV jadwal salat, spanduk, slide).

---

## CONTENT FUNDAMENTALS

**Bahasa.** Bahasa Indonesia sepenuhnya. Istilah ibadah tetap dalam bentuk yang lazim dipakai jamaah Minang: *Subuh, Dzuhur, Ashar, Maghrib, Isya, iqamah, adzan, khatib, ba'da Maghrib, tahsin, sasaran silat, infak, sedekah, jamaah, pengurus surau*. Jangan menerjemahkan istilah ini ke bahasa Inggris, dan jangan mencampur "prayer times"/"donate" ke dalam antarmuka.

**Sapaan.** Netral dan hormat. Sistem berbicara sebagai **pengurus surau** kepada **jamaah**, bukan sebagai merek kepada pelanggan. Hindari "kami" yang berlebihan; hindari sama sekali "Anda" dalam bentuk penjualan.
- Baik: "Salurkan Infak", "Lihat Agenda", "Dana dikelola pengurus dan dilaporkan setiap bulan."
- Hindari: "Yuk donasi sekarang!", "Jangan sampai ketinggalan!", "Klaim slot kajianmu."

**Kapitalisasi.** *Sentence case* untuk judul dan kalimat ("Kegiatan rutin Surau Bateh Lori"). *Title case* hanya untuk nama diri dan label tombol pendek ("Salurkan Infak", "Jadwal Salat"). HURUF BESAR hanya pada overline 11px dengan tracking 0.14em ("PROGRAM", "AGENDA") dan pada wordmark logo.

**Panjang.** Judul hero maksimal dua baris. Deskripsi bagian maksimal dua kalimat. Keterangan kartu satu kalimat. Tidak ada paragraf pemasaran panjang.

**Angka & waktu.** Format 24 jam dengan titik dua (`04:58`), selalu `tabular-nums`. Waktu naratif memakai titik dan "WIB" (`19.45 WIB`) atau penanda ibadah (`Ba'da Maghrib`). Tanggal Masehi selalu berpasangan dengan Hijriah: "Senin, 10 Agustus 2026 · 26 Safar 1448 H". Mata uang: `Rp 100.000` (titik ribuan, spasi setelah Rp).

**Teks Arab.** Selalu `dir="rtl" lang="ar"` dan font Amiri. Ayat selalu disertai terjemahan Indonesia dan sumber ("QS. At-Taubah: 18"). Maksimal satu kutipan per halaman. Jangan memakai teks Arab sebagai hiasan tanpa terjemahan.

**Ucapan keagamaan.** Dipakai secukupnya dan hanya pada momen yang tepat: "Jazakumullah khairan" setelah infak tercatat; "Bismillah" tidak dipakai sebagai label tombol.

**Emoji: tidak dipakai sama sekali.** Semua simbol memakai ikon Lucide.

**Nada keseluruhan.** Tenang, jujur, dan berjarak dari nada kampanye. Konten yang belum ada dinyatakan kosong secara terbuka ("Sengaja dikosongkan — belum ada materi sumber") alih-alih diisi teks palsu.

---

## VISUAL FOUNDATIONS

**Warna.** Tiga warna diambil dari emblem: maroon `#9E2A2B` (utama — aksi, judul aksen, kalender agenda), emas `#DCC945` (aksen — garis nav aktif, ikon di atas latar gelap, badge "berikutnya"), slate `#3B4048` (teks dan blok gelap). Dua tambahan yang diperlukan untuk antarmuka: **pasir** `#F8F3E9` sebagai latar halaman (mengikuti latar krem pada referensi — putih murni hanya untuk kartu) dan **teal** `#12796A` sebagai satu-satunya warna status "sedang berlangsung" pada jadwal salat (referensi memakai teal untuk baris salat aktif). Maroon tidak pernah dipakai untuk status; teal tidak pernah dipakai untuk aksi.

**Tipografi.** Satu keluarga Latin: **Plus Jakarta Sans** (400–800). Display 56/44px ExtraBold tracking −0.02em; judul bagian 28px Bold; isi 15px/1.7; label 13px SemiBold; overline 11px tracking 0.14em huruf besar. Arab: **Amiri** 22–34px, line-height 2. Tidak ada font ketiga, tidak ada font dekoratif kaligrafi selain Amiri.

**Latar.** Datar dan hangat — bidang warna, bukan gambar. Tidak ada gradien latar, tidak ada tekstur berulang, tidak ada pola geometri Islami sebagai wallpaper. Satu-satunya gradien di seluruh sistem adalah bilah kemajuan donasi (maroon → emas). Satu bentuk hias diizinkan: lingkaran emas pucat (`--gold-100`) di belakang kartu jadwal pada hero. Bila foto surau tersedia nanti, gunakan foto penuh di kolom hero dengan `--overlay-scrim` di bawahnya untuk teks — bukan sebagai latar seluruh halaman.

**Kartu.** Putih, radius 16px, garis 1px `--border-default`, bayangan `--shadow-sm`. Kartu di atas kartu memakai nada pasir tanpa bayangan. Tidak ada kartu dengan garis kiri berwarna. Modal radius 24px + `--shadow-lg`.

**Sudut.** 4/8/12/16/24/32px. Semua kontrol (tombol, badge, tag, tab, sakelar) berbentuk **pil penuh** — ini ciri paling kentara sistem ini. Kotak isian dan kartu tetap persegi membulat.

**Bayangan.** Rendah, netral, berbasis slate transparan — tidak ada bayangan pekat atau warna-warni. Satu pengecualian: tombol primer memakai `--shadow-brand` (maroon 24%). Inner shadow hanya dipakai sebagai garis rambut (`--shadow-inset-hairline`).

**Transparansi & blur.** Hanya dua tempat: kepala situs (`rgba(253,251,246,.88)` + `backdrop-filter: saturate(140%) blur(14px)`, menempel di atas saat gulir) dan latar gelap modal (`rgba(34,38,44,.48)` + blur). Tidak ada kartu kaca di tempat lain.

**Gerak.** Cepat dan tenang. Kontrol 160ms, panel 240ms, bilah donasi 420ms — semuanya `cubic-bezier(.2,.8,.2,1)`. Tidak ada pantulan, tidak ada animasi masuk saat gulir, tidak ada gerak yang menunda pembacaan jadwal salat.

**Hover.** Tombol: `filter: brightness(0.94)` (warna tetap, hanya sedikit lebih gelap). Kartu interaktif: naik 2px + bayangan `sm → md`. Tautan nav: warna maroon + garis emas 2px muncul. Tidak ada perubahan warna latar pada tautan.

**Tekan.** `transform: scale(0.98)`, tanpa perubahan warna tambahan.

**Fokus.** Garis tepi maroon + cincin emas 3px (`rgba(220,201,69,.35)`) — kontras cukup di atas pasir maupun putih. Jangan hilangkan outline tanpa penggantinya.

**Garis.** Dua tingkat: `--border-hairline` (pasir gelap, untuk pembatas di atas latar hangat) dan `--border-default` (slate-200, untuk kartu putih). Ketebalan aksen 4px hanya untuk penanda vertikal jadwal, tidak untuk kartu.

**Tata letak.** Grid maksimum 1180px, kolom teks 760px, padding halaman 32px, jarak antarbagian 80px. Kepala situs `position: sticky`.

**Responsif — satu titik ubah: `max-width: 860px`.** Di bawahnya: padding halaman turun ke 20px dan jarak antarbagian ke 48px; semua kisi dua/empat kolom menumpuk jadi satu (`minmax(0,1fr)`, bukan `1fr`, agar kartu jadwal tidak memaksa lebar kolom); galeri foto jadi dua kolom; judul hero turun 56px → 36px, judul halaman 36px → 28px; tombol utama jadi selebar layar. Navigasi berganti bentuk: tautan mendatar menjadi tombol menu 44px dengan daftar menumpuk 48px per baris, ditambah **BottomBar** tetap di dasar layar dengan lima tujuan dan sasaran sentuh 56px. Beranda ponsel menampilkan **judul dan foto dulu**, kartu jadwal salat menyusul di bawahnya. Isi halaman diberi `padding-bottom` 64px agar tidak tertutup bilah bawah. Hook `useBreakpoint()` (di `components/core/useBreakpoint.js`) adalah satu-satunya cara komponen mengetahui lebar layar — jangan menulis media query dalam CSS komponen. Kartu jadwal salat selalu di kolom kanan pada layar lebar dan menjadi blok pertama setelah hero pada layar sempit — ia adalah elemen terpenting di seluruh situs.

**Citra.** **Dokumenter, bukan promosi.** Semua foto direkam pengurus dengan ponsel: cahaya apa adanya (neon putih saat majelis malam, matahari siang yang keras di halaman), tanpa penataan, tanpa filter, tanpa hitam-putih, tanpa grain buatan. Hijau daun, langit biru, dan karpet merah dibiarkan seperti aslinya. Jangan memoles, memangkas sampai wajah jamaah terpotong, atau mengganti foto ini dengan stok korporat.

Dua perlakuan: foto **penuh dengan teks di atasnya** wajib memakai gradien pelindung slate (`#22262C` 86% → 22%, arah 100°) dengan teks `--sand-100` dan aksen emas `--gold-500` — bukan maroon; foto **berkeretangan** memakai `PhotoTile` (scrim `--overlay-scrim` dari bawah, overline emas + satu kalimat catatan). Karpet ruang salat sangat dekat dengan maroon emblem — jangan menumpuk elemen maroon di atas foto interior.

---

## ICONOGRAPHY

- **Set resmi: Lucide 24px, stroke 2, ujung membulat** — dimuat dari CDN `lucide-static@0.469.0`. **Ini substitusi**: sumber yang diberikan tidak memuat set ikon apa pun. Bila surau kelak memiliki ikon sendiri, ganti sumber di `components/core/Icon.jsx` saja.
- Ikon dirender lewat **CSS mask** sehingga selalu mewarisi `currentColor` — tidak pernah ditempel sebagai `<img>` berwarna tetap.
- Kosakata ikon tetap: `sunrise` Subuh · `sun` Syuruq/Dzuhur · `cloud-sun` Ashar · `sunset` Maghrib · `moon-star` Isya · `clock` waktu · `map-pin` lokasi · `calendar-days` agenda · `book-open` Qur'an/bacaan · `swords` silat tradisi · `mic` penceramah · `hand-coins` infak · `users` jamaah · `heart-handshake` santunan · `volume-2` adzan · `chevron-right` navigasi.
- **Tidak ada emoji.** Tidak ada karakter Unicode sebagai ikon (☪, 🕌, ★). Bulan sabit dan bintang hanya muncul di dalam emblem — jangan menggambar ulang atau memisahkannya sebagai ikon.
- **Jangan menggambar SVG sendiri.** Emblem hanya dipakai dari `assets/logo-mark.png` / `assets/logo-lockup.png`.

## Aset
- `assets/logo-mark.png` — emblem saja, latar transparan (diekstrak dari berkas unggahan; latar putih dihapus secara program).
- `assets/logo-lockup.png` — emblem + wordmark, latar transparan.
- `assets/foto-surau.jpg` — eksterior surau saat cahaya sore; latar hero beranda dengan gradien pelindung.
- `assets/photos/` — sembilan foto dokumentasi asli: `interior-ruang-salat.png` (diputar 90° agar tegak), `majelis-jamaah.jpg`, `kajian-majelis.jpg`, `pengurus-surau.jpg`, `latihan-silat.jpg`, `gotong-royong-halaman.jpg`, `gotong-royong-jamaah.jpg`, `gotong-royong-belakang.jpg`, `pembangunan-surau.jpg` (masa pembangunan).
- Belum ada foto kelas tahsin dan foto khatib Jumat.

---

## Substitusi yang perlu dikonfirmasi
1. **Font.** Tidak ada berkas font asli. Plus Jakarta Sans (Latin) dan Amiri (Arab) dipilih dari Google Fonts — Plus Jakarta Sans karena geometrinya dekat dengan wordmark logo dan lazim untuk situs berbahasa Indonesia; Amiri karena naskh-nya sesuai untuk ayat. Kirim berkas font resmi bila ada.
2. **Ikon.** Lucide sebagai pengganti set yang tidak ada.
3. **Teal & pasir.** Dua warna di luar emblem, diambil dari referensi tata letak yang Anda kirim.
4. **Foto.** Sudah lengkap untuk beranda, dokumentasi, Profil, dan Kontak. Yang masih kosong: kelas tahsin dan khatib Jumat.
5. **Silsilah guru.** Struktur `Timeline variant="silsilah"` sudah siap tetapi isinya kosong — nama, urutan, dan tahun mata rantai belum ada.
6. **Angka jamaah.** "180 jamaah rutin Subuh" dan "8 kajian per bulan" masih angka contoh — mohon dikoreksi dengan angka sebenarnya.

---

## Index

**Root**
- `styles.css` — satu-satunya berkas yang perlu ditautkan konsumen (hanya `@import`).
- `readme.md` (berkas ini), `SKILL.md`, `thumbnail.html`.

**tokens/** — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `radii.css`, `elevation.css`, `motion.css`.

**guidelines/** — kartu spesimen: warna (`color-brand`, `color-gold`, `color-neutral`, `color-sand`, `color-semantic`, `color-prayer`), tipografi (`type-display`, `type-headings`, `type-body`, `type-arabic`, `type-numerals`), tata ruang (`spacing-scale`, `spacing-layout`, `radii`, `elevation`, `motion`), brand (`brand-logo`, `brand-surfaces`, `brand-iconography`, `brand-imagery`, `brand-photos`).

**components/**
- `core/` — **Button**, **Icon**, **Card**, **Badge**, **Tag**, **SectionHeading**
- `forms/` — **Input**, **Select**, **Checkbox**, **RadioGroup**, **Switch**
- `feedback/` — **Dialog**, **Toast**, **Tooltip**
- `navigation/` — **NavBar**, **Tabs**, **Footer**, **BottomBar**
- `surau/` — **PrayerTimeTable**, **PrayerTimeRow**, **ArabicVerse**, **EventItem**, **StatBlock**, **DonationProgress**, **PhotoTile**, **Timeline**

**ui_kits/website/** — rekreasi situs publik surau (beranda, jadwal salat, agenda, infak). Lihat `ui_kits/website/README.md`.

### Intentional additions
Tidak ada sumber yang mendefinisikan inventaris komponen, sehingga set standar (Button, Input, Select, Checkbox, RadioGroup, Switch, Card, Badge, Tag, Tabs, Dialog, Toast, Tooltip) diauthor dari nol. Tambahan di luar set standar, masing-masing dengan alasan:
- **Icon** — pembungkus glif Lucide agar warna ikon konsisten dengan `currentColor`.
- **PrayerTimeTable / PrayerTimeRow** — jadwal salat adalah isi utama setiap permukaan surau; referensi yang diberikan memusatkan tata letaknya pada komponen ini.
- **ArabicVerse** — kutipan ayat butuh penanganan `dir="rtl"` + font Amiri yang tidak bisa diwakili komponen teks biasa.
- **EventItem**, **StatBlock**, **DonationProgress** — agenda kajian, angka jamaah, dan penggalangan dana adalah tiga pola berulang pada referensi.
- **PhotoTile** — foto dokumentasi surau selalu perlu gradien pelindung + catatan satu kalimat; tanpa komponen ini setiap layar akan menyusun scrim sendiri-sendiri.
- **BottomBar** — jamaah hampir semuanya membuka situs dari ponsel; navigasi mendatar tidak cukup, jadi lima tujuan tersering dipindah ke bilah bawah tetap. Otomatis tidak dirender di layar lebar.
- **Timeline** — diminta pengurus untuk dua kebutuhan sekaligus: **silsilah** guru/tuanku surau dan **roadmap** tahapan pembangunan. Satu komponen dengan dua varian, karena strukturnya identik (rantai tegak bernomor/berstatus).
- **NavBar / Footer** — muncul di setiap halaman situs dengan struktur tetap.
