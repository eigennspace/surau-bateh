# UI Kit — Situs Surau Bateh Lori

Rekreasi situs publik surau: beranda, jadwal salat, agenda kajian, dan halaman infak.
Tata letak mengikuti referensi yang diberikan (`uploads/referensi-web-surau.jpg`): hero dua kolom dengan kartu jadwal salat mengambang di kanan, lalu blok program, kutipan ayat, agenda + panel samping, dan pita statistik.

## Responsif
Situs ini **satu kode untuk semua lebar**; titik ubah tunggal `max-width: 860px` lewat `useBreakpoint()`. `mobile.html` menampilkannya pada lebar 390px berdampingan dengan catatan perubahannya — kartu itulah pratinjau versi ponsel.

## Berkas
- `index.html` — kerangka aplikasi + navigasi antar halaman (klik menu di kepala situs; di ponsel: tombol menu + bilah bawah).
- `mobile.html` — pratinjau situs yang sama pada lebar 390px.
- `data.js` — data contoh (waktu salat, agenda, program, pengumuman).
- `Hero.jsx` — hero beranda + kartu jadwal salat.
- `Sections.jsx` — `ProgramsSection`, `GallerySection`, `VerseSection`, `AgendaSection`, `StatsSection`, `ProfilePage`.
- `SchedulePage.jsx` — halaman jadwal salat (hari ini / pekan ini, pengaturan pengingat).
- `DonatePage.jsx` — formulir infak dengan dialog konfirmasi dan toast.

## Alur yang bisa diklik
Beranda → menu **Jadwal Salat** → tab Hari ini/Pekan ini → menu **Kajian** → filter kategori → tombol **Salurkan Infak** → isi formulir → **Lanjutkan** → dialog konfirmasi → **Kirim** → toast berhasil.

## Catatan
Halaman **Profil** memakai foto dokumentasi asli (masa pembangunan, gotong royong, musyawarah pengurus); narasinya hanya menyebut apa yang terlihat pada foto — tidak ada tahun, nama, atau angka yang dikarang.
Halaman **Kontak** memakai data asli: tautan Google Maps surau dan nomor Ustadz Anshor (pengurus). Alamat jalan lengkap belum ada, jadi hanya kelurahan dan kota yang ditulis.
Halaman **Profil** memuat **roadmap pembangunan** (`Timeline variant="roadmap"`) — status tahapnya disusun dari apa yang terlihat pada foto, mohon dikoreksi pengurus. Blok **silsilah guru** sengaja dibiarkan kosong dengan catatan; jangan mengisinya dengan nama karangan.
Surau ini **tidak memiliki TPQ** — jangan menambahkannya kembali. Program yang berjalan: kajian rutin, tahsin dewasa, silat tradisi, dan santunan.
