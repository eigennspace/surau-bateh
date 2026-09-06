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
import pembangunanSurau from '../design-system/assets/photos/pembangunan-surau.jpg';
import gotongRoyongBelakang from '../design-system/assets/photos/gotong-royong-belakang.jpg';
import pengurusSurau from '../design-system/assets/photos/pengurus-surau.jpg';

export const SB_DATA = {
  // Koordinat Surau Bateh Lori, Kota Padang -- dipakai peta mini di footer.
  // (Dulu juga dipakai generator jadwal shalat; fitur itu sudah dihapus,
  // lihat ADR 0007.) Ubah nilai di `location.js` bila koordinat perlu
  // direvisi (dipecah dari berkas ini supaya bisa diimpor tanpa menarik
  // dependency aset/React -- lihat komentar di `location.js`).
  location: LOCATION,
  // `programs`/`stats` DIHAPUS dari sini sejak ADR 0013 (cutover Fase 4,
  // `.scratch/beranda-hero-program-stats-via-sanity/issues/04-cutover-hapus-programs-stats-hero-lama.md`)
  // -- Program Beranda/Statistik Beranda sekarang sepenuhnya berasal dari
  // dokumen singleton Sanity `beranda` (lihat `resolveBeranda` di
  // `src/lib/resolveSanityContent.js`).
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
      branches: [
        { title: 'Imam Muhammad bin Muhammad Al Ghazali' }
      ],
      order: 8
    },
    {
      title: 'Abu Yakub Yusuf Al-Hamadani bin Ayyub',
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
  // `contact` (kontak umum halaman `/kontak`, kontak person tiap Halaman
  // Program, narasi+galeri keenam Halaman Program) SUDAH PINDAH ke Sanity
  // sejak Fase 3 migrasi Sumber Data (ADR 0013,
  // `.scratch/halaman-program-kontak-salik-via-sanity/spec.md`) -- ditarik
  // build-time oleh `scripts/fetch-sanity-content.mjs` dan digabung ke
  // `rawData` di `App.jsx`. Field-field itu DIHAPUS sepenuhnya dari sini
  // (bukan ditinggal sebagai fallback mati) sebagai tiket cutover terpisah,
  // sama seperti `gallery` sebelumnya (lihat komentar di bawah).
  //
  // Isi Halaman Profil (lihat istilah "Halaman Profil" di CONTEXT.md). Bukan
  // Halaman Program: Profil Surau punya tata letak sendiri (tiap fotonya
  // berpasangan dengan teks di sebelahnya), Profil Salik meminjam
  // `ProgramSection` tapi tanpa blok jadwal.
  //
  // Sama seperti `gallery` program: RASIO dan POSISI foto TIDAK diatur di
  // sini -- itu keputusan tata letak yang tinggal di komponen halaman. Yang
  // bisa disunting dari sini adalah isinya: teks, `alt`, `caption`, `meta`,
  // dan `icon`.
  profilSurau: {
    hero: {
      badge: 'Lori Lubuk Minturun, Kota Padang',
      title: 'Dibangun bersama, dari halaman yang masih tanah',
      paragraphs: [
        'Surau Bateh Lori berdiri di lereng bukit di tepi nagari. Surau ini dikerjakan bertahap oleh jamaah sendiri — dari tiang beton dan tumpukan batu bata sampai ruang shalat berkarpet yang dipakai hari ini.',
        'Setiap pekan halaman dan lerengnya dibersihkan bergiliran. Pekerjaan itu tidak pernah selesai, dan justru dari situ surau ini hidup.',
      ],
      photo: { src: pembangunanSurau, alt: 'Masa pembangunan surau', meta: 'Masa Pembangunan', icon: 'hammer', caption: 'Proses pembangunan surau' },
    },
    pengelolaan: {
      title: 'Dikelola pengurus, dikerjakan jamaah',
      paragraph: 'Pengurus surau mengatur jadwal kajian & tawajjuh pekanan, dan laporan kas bulanan. Kegiatan hariannya dijalankan bergiliran oleh jamaah sekitar.',
      photo: { src: gotongRoyongBelakang, alt: 'Membersihkan sisi belakang surau', meta: 'Gotong Royong', icon: 'users', caption: 'Merapikan area surau' },
    },
    // Judul seksi silsilah. Isi pohonnya sendiri ada di `ilmuTasawuf` di atas
    // (begitu juga `ilmuTauhid`/`ilmuFiqh` yang seksinya masih dikomentari di
    // halaman).
    silsilah: { overline: 'Silsilah', title: 'Ilmu Tasawuf' },
    pengurus: {
      overline: 'Pengurus',
      title: 'Musyawarah pengurus dan tuanku',
      photo: { src: pengurusSurau, alt: 'Pengurus surau berfoto bersama', caption: 'Selepas musyawarah pengurus di ruang utama.' },
    },
  },
  // `salik` (seluruh isi Profil Salik) SUDAH PINDAH ke Sanity sejak Fase 3
  // migrasi Sumber Data yang sama (lihat komentar `contact` di atas) --
  // dihapus sepenuhnya dari sini, bukan ditinggal sebagai fallback mati.
  //
  // Nilai awal `bank` berasal dari `New Surau Bateh Lori Design System/assets/informasi-rekening.md`.
  donation: {
    qris: qrisImage,
    bank: { name: 'Bank Syariah Indonesia (BSI)', account: '7771 806 168', holder: 'PONPES RIBATH AS SA ADY' },
    campaign: { active: false, title: 'Renovasi Atap Surau', description: 'Menunggu dana infak jamaah terkumpul untuk tahap renovasi atap.' },
  },
  // `stats` DIHAPUS dari sini sejak ADR 0013 (cutover Fase 4, lihat komentar
  // `programs` di atas) -- sekarang berasal dari dokumen Sanity `beranda`.
  // `gallery` DIHAPUS dari sini sejak ADR 0006 (cutover tiket 06) -- galeri
  // foto sekarang sepenuhnya berasal dari Sanity (dokumen `galleryItem`),
  // ditarik build-time oleh `scripts/fetch-sanity-content.mjs` dan
  // digabung ke `rawData` di `App.jsx` sebelum dipanggil ke
  // `deriveSiteData`. Lihat `docs/adr/0006-galeri-artikel-pindah-ke-sanity.md`.
};
