// Sumber Data — satu-satunya berkas yang diedit tangan oleh pengurus surau untuk
// mengubah konten situs. Mengikuti bentuk `window.SB_DATA` dari
// `New Surau Bateh Lori Design System/ui_kits/website/data.js`, disesuaikan jadi
// `export const SB_DATA` agar bisa di-import langsung oleh Vite.
//
// Cara memperbarui situs: ubah nilai di sini, lalu jalankan build + deploy ulang.
// Tidak ada panel admin, tidak ada database — berkas ini SATU-SATUNYA sumber
// konten yang bisa berubah (agenda, program, galeri program, donasi, dll).

import { LOCATION } from './location.js';
import qrisImage from '../design-system/assets/qris-surau-lori.jpg';
import dokumentasiKhitanan1 from '../design-system/assets/photos/dokumentasi-khitanan-1.jpeg';
import dokumentasiKhitanan2 from '../design-system/assets/photos/dokumentasi-khitanan-2.jpeg';
import dokumentasiKhitanan3 from '../design-system/assets/photos/dokumentasi-khitanan-3.jpeg';
import kunjunganLembaga from '../design-system/assets/photos/kunjungan-lembaga.jpeg';
import kunjunganLembaga2 from '../design-system/assets/photos/kunjungan-lembaga-2.jpeg';
import dokumentasiKhitanan3 from '../design-system/assets/photos/dokumentasi-khitanan-3.jpeg';
import daurahPertama from '../design-system/assets/photos/daurah-pertama.jpeg';
import daurahFlyer from '../design-system/assets/background-daurah.jpeg';

export const SB_DATA = {
  // Koordinat Surau Bateh Lori, Kota Padang -- dipakai peta mini di footer.
  // (Dulu juga dipakai generator jadwal shalat; fitur itu sudah dihapus,
  // lihat ADR 0007.) Ubah nilai di `location.js` bila koordinat perlu
  // direvisi (dipecah dari berkas ini supaya bisa diimpor tanpa menarik
  // dependency aset/React -- lihat komentar di `location.js`).
  location: LOCATION,
  events: [
    { day: 'Sel', month: 'Malam', title: 'Tawajjuh', speaker: 'Tuan Guru Surau Bateh', time: "Ba'da Maghrib", place: 'Ruang utama', category: 'Tawajjuh' },
    { day: 'Kam', month: 'Malam', title: 'Tawajjuh', speaker: 'Tuan Guru Surau Bateh', time: "Ba'da Maghrib", place: 'Ruang utama', category: 'Tawajjuh' },
    { day: 'Kam', month: 'Tiap Bulan', title: 'Daurah Aswaja', speaker: 'Tuan Guru Surau Bateh', time: "13 Agustus 2026 — Ba'da Maghrib", place: ' Musholla Al Mukmin Berok', category: 'Dauroh' },
    { day: 'Sab', month: 'Malam', title: 'Latihan Silat Tradisi', speaker: 'Pelatih sasaran surau', time: "Ba'da Isya", place: 'Lapangan', category: 'Silat' },
    { day: 'Sab', month: 'Malam', title: 'Kajian & Tawajjuh', speaker: 'Tuan Guru Surau Bateh', time: "Ba'da Maghrib", place: 'Ruang utama', category: 'Kajian & Tawajjuh' },
    { day: 'Min', month: 'Pagi', title: '(Khusus Salik Baru) Pengenalan Tiga Rukun Agama', speaker: 'Tuan Guru Surau Bateh', time: "09:00 WIB", place: 'Ruang utama', category: 'Kajian' },
    { day: 'Min', month: 'Siang', title: 'Kajian & Tawajjuh Jama\'ah Wanita', speaker: 'Tuan Guru Surau Bateh', time: "Siang", place: 'Ruang utama', category: 'Kajian & Tawajjuh' },
    { day: 'Min', month: 'Malam', title: 'Tawajjuh & Penguatan Karakter Ikhlas Mahasiswa/i', speaker: 'Tuan Guru Surau Bateh', time: "Ba'da Maghrib", place: 'Ruang utama', category: 'Kajian & Tawajjuh' },
  ],
  programs: [
    { icon: 'mic', title: 'Kajian dan Tawajjuh', desc: 'Tafsir dan tawajjuh bersama Guru Surau Bateh', meta: 'Selasa, Kamis, Sabtu, Minggu · Ba’da Maghrib' },
    { icon: 'swords', title: 'Silat Tradisi', desc: 'Sasaran silat untuk remaja dan dewasa di Lapangan.', meta: 'Malam pekanan · Ba’da Isya' },
    // { icon: 'users', title: 'Tahsin Dewasa', desc: 'Perbaikan bacaan Al-Qur’an untuk jamaah dewasa, kelompok kecil.', meta: 'Rabu · Ba’da Isya' },
    // { icon: 'heart-handshake', title: 'Santunan Anak Yatim', desc: 'Penyaluran bulanan dari infak jamaah untuk anak yatim sekitar surau.', meta: 'Setiap Jumat pertama' },
  ],
  news: [
    { tag: 'Pengumuman', title: 'Pendataan Data Salik Surau Bateh', date: '8 Agustus 2026', link: 'https://forms.gle/2Se3M6uMp6P2QP4t6', description: 'Harap bagi para Salik yang belum mengisi Formulir pendataan, untuk segera mengisi dengan klik bagian pengumuman ini.' },
    // { tag: 'Laporan', title: 'Laporan Kas Surau Juli 2026', date: '2 Agustus 2026' },
    // { tag: 'Kegiatan', title: 'Gotong Royong Pembersihan Ruang Wudhu', date: '28 Juli 2026' },
  ],
  ilmuTauhid: [
    {
      title: 'Rasulullah SAW',
      branches: [
        {
          title: 'Anas bin Malik',
          branches: [
            {
              title: 'Rabi\'ah'
            },
            {
              title: 'Ibnu Umar'
            },
            {
              title: 'Nafi\''
            },
            {
              title: 'Imam Malik bin Anas'
            }
          ]
        },
        {
          title: 'Ali bin Abi Thalib',
          branches: [
            {
              title: 'Husain bin Ali'
            },
            {
              title: 'Ali Zainal Abidin'
            }
          ]
        }
      ]
    }
  ],
  ilmuFiqh: [
    {
      title: 'Rasulullah SAW',
      order: 1,
      branches: [
        {
          title: 'Madrasah Madinah',
          order: 2,
          branches: [
            {
              title: 'Umar bin Khattab',
            },
            {
              title: 'Aisyah',
              branches: [
                {title: 'Amr bin Dinar'},
                {title: 'Sufyan bin Uyainah'}
              ]
            },
            {
              title: 'Usman bin Affan'
            },
            {
              title: 'Abdullah bin Abbas',
              branches: [
                {
                  title: 'Imam Nafi',
                  branches: [
                    {
                      title: 'Rabi\'ah Ar Rai',
                      branches: [
                        {
                          title: 'Imam Malik',
                          branches: [
                            {
                              title: 'Imam Syafi\'i'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          title: 'Madrasah Iraq',
          branches: [
            {
              title: 'Ali bin Abi Thalib',
              branches: [
                {
                  title: 'Alqamah bin Ilyas',
                  branches: [
                    { title: 'Amir bin Syahril' },
                    { title: 'Ibrahim An Nakh\'i' }
                  ]
                }
              ]
            },
            {
              title: 'Abdullah bin Mas\'ud',
              branches: [
                {
                  title: 'Alqamah bin Ilyas',
                  description: 'Juga berguru pada Ali bin Abi Thalib — lihat cabang di atas untuk murid-muridnya',
                  // sengaja tanpa `branches` di sini, supaya tidak perlu disinkronkan
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  ilmuTasawuf: [
    {
      title: 'Muhammad bin Abdullah SAW',
      order: 1
    },
    {
      title: 'Abu Bakar Ash Shiddiq',
      order: 2
    },
    {
      title: 'Sayyidina Salman Al-Farisi',
      order: 3
    },
    {
      title: 'Al Imam Sayyidina Qasim bin Muhammad bin Abu Bakar As Siddiq',
      order: 4
    },
    {
      title: "Al 'Arif Billah Al Imam Sayyidina Ja'far As Shadiq",
      order: 5
    },
    {
      title: 'Sultanul Arifin Asy Syekh Thaifur bin Isa bin Adam bin Sarusyan / Asy Syekh Abu Yazid Al-Busthami',
      order: 6
    },
    {
      title: 'Al Arif Billah Asy Syekh Abul Hasan Ali bin Abu Jafar Al Kharqani',
      order: 7
    },
    {
      title: 'Al Arif Billah Asy Syekh Abu Ali Al-Fadhal bin Muhammad Ath Thusi Al Farimadi',
      order: 8
    },
    {
      title: 'Abu Yakub Yusuf Al-Hamadani bin Ayyub, Imam Muhammad bin Muhammad Al Ghazali',
      order: 9
    },
    {
      title: 'Al Arif Billah Asy Syekh Abdul Khaliq Al-Fajduwani Ibnu Al-Imam Abdul Jamil',
      order: 10
    },
    {
      title: 'Al Arif Billah Asy Syekh Ar Riwikari',
      order: 11
    },
    {
      title: 'Al Arif Billah Asy Syekh Mahmud Al-Anjir Faghnawi',
      order: 12
    },
    {
      title: 'Al Arif Billah Asy Syekh Ali Ar Ramitani / Asy Syekh Azizan',
      order: 13
    },
    {
      title: 'Al Arif Billah Asy Syekh Muhammad Baba As Samasi',
      order: 14
    },
    {
      title: 'Al Arif Billah Asy Syekh Sayyid Amir Kulal bin Sayyid Hamzah',
      order: 15
    },
    {
      title: 'As Sayyid Bahauddin Muhammad bin Muhammad bin Muhammad Al Husaini Al Uwaisi Al Bukhari',
      order: 16
    },
    {
      title: 'Al Arif Billah Asy Syekh Muhammad Al-Bukhari Al-Khawarizumi / Asy Syekh Alaudin Al-Aththar',
      order: 17
    },
    {
      title: 'Al Arif Billah Asy Syekh Yaqub Al-Jarkhiq',
      order: 18
    },
    {
      title: 'Al Arif Billah Asy Syekh Nashiruddin Ubaidullah Al-Ahrar As Samarqandi bin Mahmud bin Sihabuddin',
      order: 19
    },
    {
      title: 'Al Arif Billah Asy Syekh Muhammad Az Zahid',
      order: 20
    },
    {
      title: 'Al Arif Billah Asy Syekh Darwis Muhammad Samarqandi',
      order: 21
    },
    {
      title: 'Al Arif Billah Asy Syekh Muhammad Al-Khawajaki Al-Amkani As Samarqandi',
      order: 22
    },
    {
      title: 'Al Arif Billah Asy Syekh Muayyiddin Muhammad Al-Baqi Billah',
      order: 23
    },
    {
      title: 'Al Arif Billah Asy Syekh Akhmad Al-Faruqi As Sirhindi',
      order: 24
    },
    {
      title: "Al Arif Billah Asy Syekh Muhammad Ma'sum",
      order: 25
    },
    {
      title: 'Al Arif Billah Asy Syekh Muhammad Saifuddin',
      order: 26
    },
    {
      title: 'Al Arif Billah Asy Syekh Asy Syarif Nur Muhammad Al-Badwani',
      order: 27
    },
    {
      title: "Al Arif Billah Asy Syekh Syamsuddin Habibullah Jani Janani Muzhir Al-'Alawi",
      order: 28
    },
    {
      title: 'Al Arif Billah Asy Syekh Abdullah Ad Dahlawi',
      order: 29
    },
    {
      title: 'Al Arif Billah Maulana Asy Syekh Dhiyauddin Khalid Al-Utsmani Al-Kurdi',
      order: 30
    },
    {
      title: 'Al Arif Billah Asy Syaikh Abdullah Afandi Al Makki Al Khalidi',
      order: 31
    },
    {
      title: 'Syaikh Ismail Muhammad As Syirwani Al Khalidi',
      order: 32
    },
    {
      title: 'Al Arif Billah Asy Syaikh Sulaiman Al Karimi Al Khalidi',
      order: 33
    },
    {
      title: 'Al Arif Billah Asy Syaikh Muhammad Thahir Al Khalidi – Tungka',
      order: 34
    },
    {
      title: 'Al Arif Billah Asy Syaikh Abu Bakar Al Khalidi – Tabing Pulai',
      order: 35
    },
    {
      title: "Al Arif Billah Asy Syaikh Muhammad Sa'ad bin Tanta Al Khalidi – Mungka",
      order: 36
    },
    {
      title: 'Al Arif Billah Asy Syaikh Abdul Wahid Rabbani Al Khalidi – Mungka',
      order: 37
    },
    {
      title: 'Al Arif Billah Asy Syaikh Abdul Wahid Mani Al Khalidi – Mungka',
      order: 38
    },
    {
      title: 'Al Arif Billah Asy Syaikh Ahmad Al Karim Al Khalidi – Mungka',
      order: 39
    },
    {
      title: 'Syaikh Imam Agus Mungka',
      order: 40
    },
    {
      title: 'Syaikh Mudo Muhammad Banoq Al Khalidi – Taeh Baruah',
      order: 41
    },
    {
      title: 'Syaikh Mudo Muhammad Nasir bin Abdullah Al Khalidi – Taeh Baruah',
      order: 42
    }
  ],
  contact: {
    maps: 'https://maps.app.goo.gl/bVQSzRjYxisicxUq6?g_st=ic',
    address: 'Jl. Lori Lubuk Minturun, Lubuk Minturun, Kec. Koto Tangah, Kota Padang, Sumatera Barat 25586',
    pengurus: [{ name: 'Ustadz Anshor', role: 'Pengurus surau', phone: '081261246706' }],
    // Kontak person khusus per-Halaman Program (bukan pengurus umum surau) --
    // ditampilkan di kartu kontak halaman program masing-masing. Nomor
    // Ustadz Anshor sengaja ditulis ulang di tiga entri, bukan menunjuk ke
    // `pengurus[0]`, supaya kontak satu program bisa diganti tanpa ikut
    // mengubah program lain.
    dauroh: { name: 'Angku Bosa', role: 'Kontak Program Dauroh', phone: '081374720759' },
    khitanan: { name: 'Muhammad Galang', role: 'Kontak Program Khitanan', phone: '082171136418' },
    konseling: { name: 'Ust. Aldi Sanusi', role: 'Kontak Konseling Psikoterapi Tasawuf', phone: '085263318859' },
    tawajjuh: { name: 'Ustadz Anshor', role: 'Kontak Tawajjuh & Kajian Rutin Ihsan', phone: '081261246706' },
    baktiSosial: { name: 'Ustadz Anshor', role: 'Kontak Program Bakti Sosial', phone: '081261246706' },
    silaturahmi: { name: 'Ustadz Anshor', role: 'Kontak Silaturahmi & Kerjasama Lembaga', phone: '081261246706' },
  },
  // Isi tiap Halaman Program: judul, narasi, dan galeri dokumentasi.
  //
  // `gallery` -- array `{ src, alt, caption?, meta? }`. Nama field sengaja
  // sama persis dengan dokumen `galleryItem` di Sanity supaya migrasi nanti
  // tidak butuh penerjemah. Rasio foto TIDAK diatur di sini: grid halaman
  // program selalu kotak (1:1), beda dari galeri Beranda. Cara menambah
  // foto: taruh berkasnya di `src/design-system/assets/photos/`, tambahkan
  // baris `import` di atas berkas ini, lalu masukkan entri baru ke array.
  // Slot `gallery: []` yang kosong memang sengaja ditulis -- itu tempat
  // menempelkan foto, bukan field yang terlupa dihapus.
  khitanan: {
    title: 'Khitanan',
    gallery: [
      { src: dokumentasiKhitanan1, alt: 'Dokumentasi kegiatan khitanan' },
      { src: dokumentasiKhitanan2, alt: 'Dokumentasi kegiatan khitanan' },
      { src: dokumentasiKhitanan3, alt: 'Dokumentasi kegiatan khitanan' },
    ],
    narrative: 'Program khitanan gratis Surau Bateh Lori adalah salah satu kegiatan sosial yang dikhususkan bagi anak-anak yang kurang mampu. Kegiatan ini dilaksanakan pada hari libur semester, yang dilaksanakan/disuvervisi langsung oleh Ahli Urologi yaitu, **Dr.dr. Etriyel MYH, SpU (K)**.  Tujuan dari kegiatan ini adalah meringankan beban orang tua sekaligus menanamkan syi\'ar Agama kepada anak sejak dini. Pendaftaran dan jadwal pelaksanaan diinformasikan langsung oleh kontak person di bawah ini:',
  },
  dauroh: {
    title: 'Dauroh',
    gallery: [
      { src: daurahPertama, alt: 'Dokumentasi Dauroh Aswaja bersama jamaah' },
      { src: daurahFlyer, alt: 'Dokumentasi Flyer Daurah' },
    ],
    narrative: 'Dauroh adalah pelatihan Ahlussunnah wal-Jama\'ah (ASWAJA), berbeda dengan kajian  pada umumnya, dalam pelatihan ini ditargetkan peserta mendapatkan kompetensi yang utuh dan paham dengan rukun Agama yang tiga yaitu, Iman Islam dan Ihsan, sehingga lengkaplah di dalam diri para peserta pemahaman terhadap rukun Agama tersebut. \n \nDalam daurah ini Peserta tidak hanya mendapatkan ilmu secara teori, akan tetapi dibimbing agar bisa mencapai kedudukan Ihsan yang disampaikan oleh Nabi dalam Hadisnya; Merasakan Allah dalam setiap Ibadah. Surau bateh siap hadir untuk mengisi Dauroh di berbagai Mesjid, Musholla, Lembaga atau Komunitas di Seluruh Kota Padang. **Daurah ini full gratis**, untuk info lebih lanjut silahkan hubungi kontak person di bawah ini:',
  },
  tawajjuh: {
    title: 'Tawajjuh & Kajian Rutin Ihsan',
    gallery: [],
    // DRAFT — disusun berdasarkan konteks kajian yang sudah ada di situs,
    // menunggu review/edit pengurus surau sebelum dianggap final.
    narrative: 'Tawajjuh dan kajian rutin adalah nafas harian Surau Bateh Lori: majelis tempat jamaah duduk bersama Tuan Guru untuk membersihkan hati dan meneguhkan pemahaman terhadap rukun Agama yang tiga — Iman, Islam, dan Ihsan. Kajian tidak berhenti pada penjelasan teori; jamaah dibimbing sampai merasakan kehadiran Allah dalam setiap ibadah, kedudukan Ihsan yang disebut Nabi dalam hadisnya.\n \nMajelis ini terbuka untuk siapa saja — salik yang baru mengenal jalan ini maupun yang sudah lama menempuhnya, jamaah wanita, serta mahasiswa/i. Jadwal lengkap tiap pekannya tercantum di bawah. Untuk pertanyaan seputar majelis, silahkan hubungi kontak person di bawah ini:',
  },
  konseling: {
    title: 'Konseling Psikoterapi Tasawuf',
    gallery: [],
    narrative: 'Kesedihan, rasa cemas, amarah, dan pikiran yang berlebihan bukan hanya melelahkan batin, melainkan juga dapat menurunkan kesehatan fisik.\n \nMelalui Psikoterapi Tasawuf - DzikirTerapi, mari duduk bersama untuk menata kembali kedamaian jiwa. Dengan pendekatan yang sesuai dengan Al-Qur\'an dan Sunnah, kami mendampingi Anda melepaskan beban batin dan menjemput kembali ketenangan diri yang sejati. Untuk informasi dan jadwal konsultasi, silahkan hubungi kontak person di bawah ini:',
  },
  baktiSosial: {
    title: 'Bakti Sosial',
    gallery: [],
    // DRAFT — disusun berdasarkan konteks kegiatan sosial yang sudah ada di
    // situs, menunggu review/edit pengurus surau sebelum dianggap final.
    narrative: 'Bakti Sosial Surau Bateh Lori adalah wujud nyata bahwa ilmu yang dipelajari di majelis mesti turun jadi amal di tengah masyarakat. Kegiatannya beragam mengikuti kebutuhan yang ada di sekitar surau — penyaluran bantuan untuk keluarga yang membutuhkan, santunan, gotong royong, serta bantuan bagi warga yang tertimpa musibah.\n \nSeluruh kegiatan ini digerakkan dari infak jamaah dan tenaga sukarela pengurus serta salik surau. Jamaah yang ingin ikut serta, menyalurkan bantuan, atau mengusulkan sasaran bakti sosial di lingkungannya, silahkan hubungi kontak person di bawah ini:',
  },
  silaturahmi: {
    title: 'Silaturahmi & Kerjasama Lembaga',
    gallery: [
      { src: kunjunganLembaga, alt: 'Kunjungan Lembaga UIN IB Imam Bonjol Prodi Tasawuf & Terapi' },
      { src: kunjunganLembaga1, alt: 'Kunjungan Lembaga UIN IB Imam Bonjol Prodi Tasawuf & Terapi' }
    ],
    // DRAFT — disusun berdasarkan konteks program Dauroh yang sudah ada di
    // situs, menunggu review/edit pengurus surau sebelum dianggap final.
    narrative: 'Surau Bateh Lori terbuka untuk bersilaturahmi dan bekerja sama dengan masjid, musholla, pesantren, kampus, lembaga, maupun komunitas di Kota Padang dan sekitarnya. Kerjasama yang sudah berjalan mencakup pengisian dauroh dan kajian di tempat mitra, kegiatan sosial bersama, serta kunjungan silaturahmi antar lembaga.\n \nSurau Bateh siap hadir memenuhi undangan tanpa memungut biaya. Bila lembaga atau komunitas Anda ingin menjalin kerjasama atau mengundang Surau Bateh, silahkan hubungi kontak person di bawah ini:',
  },
  // Nilai awal `bank` berasal dari `New Surau Bateh Lori Design System/assets/informasi-rekening.md`.
  donation: {
    qris: qrisImage,
    bank: { name: 'Bank Syariah Indonesia (BSI)', account: '7771 806 168', holder: 'PONPES RIBATH AS SA ADY' },
    campaign: { active: false, title: 'Renovasi Atap Surau', description: 'Menunggu dana infak jamaah terkumpul untuk tahap renovasi atap.' },
  },
  // Angka statistik: field manual, diisi berdasarkan pengamatan pengurus — bukan hitungan otomatis.
  stats: [
    { icon: 'users', value: '>100', label: 'Jamaah rutin' },
    { icon: 'mic', value: '>10', label: 'Kajian per bulan' },
    { icon: 'calendar-days', value: 'Tiap pekan', label: 'Gotong royong halaman' },
  ],
  // `gallery` DIHAPUS dari sini sejak ADR 0006 (cutover tiket 06) -- galeri
  // foto sekarang sepenuhnya berasal dari Sanity (dokumen `galleryItem`),
  // ditarik build-time oleh `scripts/fetch-sanity-content.mjs` dan
  // digabung ke `rawData` di `App.jsx` sebelum dipanggil ke
  // `deriveSiteData`. Lihat `docs/adr/0006-galeri-artikel-pindah-ke-sanity.md`.
};
