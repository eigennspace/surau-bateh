// Sumber Data — satu-satunya berkas yang diedit tangan oleh pengurus surau untuk
// mengubah konten situs. Mengikuti bentuk `window.SB_DATA` dari
// `New Surau Bateh Lori Design System/ui_kits/website/data.js`, disesuaikan jadi
// `export const SB_DATA` agar bisa di-import langsung oleh Vite.
//
// Cara memperbarui situs: ubah nilai di sini, lalu jalankan build + deploy ulang.
// Tidak ada panel admin, tidak ada database — berkas ini SATU-SATUNYA sumber
// konten yang bisa berubah (jadwal salat, agenda, program, donasi, dll).

import qrisImage from '../design-system/assets/qris-surau-lori.jpg';
import interiorRuangSalat from '../design-system/assets/photos/interior-ruang-salat.png';
import majelisJamaah from '../design-system/assets/photos/majelis-jamaah.jpg';
import gotongRoyongHalaman from '../design-system/assets/photos/gotong-royong-halaman.jpg';
import latihanSilat from '../design-system/assets/photos/latihan-silat.jpg';
import pengurusSurau from '../design-system/assets/photos/pengurus-surau.jpg';
import gotongRoyongJamaah from '../design-system/assets/photos/gotong-royong-jamaah.jpg';

export const SB_DATA = {
  times: [
    { name: 'Subuh', adzan: '04:58', iqamah: '05:10' },
    { name: 'Syuruq', adzan: '06:14' },
    { name: 'Dzuhur', adzan: '12:16', iqamah: '12:30' },
    { name: 'Ashar', adzan: '15:38', iqamah: '15:50' },
    { name: 'Maghrib', adzan: '18:24', iqamah: '18:32' },
    { name: 'Isya', adzan: '19:36', iqamah: '19:45' },
  ],
  events: [
    { day: 'Sel', month: 'Pekan', title: 'Kajian & Tawajjuh', speaker: 'Tuan Guru Surau Bateh', time: "Ba'da Maghrib", place: 'Ruang utama', category: 'Kajian & Tawajjuh' },
    { day: 'Kam', month: 'Pekan', title: 'Kajian & Tawajjuh', speaker: 'Tuan Guru Surau Bateh', time: "Ba'da Maghrib", place: 'Ruang utama', category: 'Kajian & Tawajjuh' },
    { day: 'Jum', month: 'Pekan', title: 'Latihan Silat Tradisi', speaker: 'Pelatih sasaran surau', time: "Ba'da Isya", place: 'Ruang bawah', category: 'Silat' },
    { day: 'Sab', month: 'Pekan', title: 'Kajian & Tawajjuh', speaker: 'Tuan Guru Surau Bateh', time: "Ba'da Maghrib", place: 'Ruang utama', category: 'Kajian & Tawajjuh' },
    { day: 'Min', month: 'Pekan', title: 'Kajian & Tawajjuh', speaker: 'Tuan Guru Surau Bateh', time: "Ba'da Maghrib", place: 'Ruang utama', category: 'Kajian & Tawajjuh' },
  ],
  programs: [
    { icon: 'mic', title: 'Kajian dan Tawajjuh', desc: 'Tafsir dan fikih ibadah bersama ustaz undangan dari Kota Padang.', meta: 'Selasa & Kamis · Ba’da Maghrib' },
    { icon: 'swords', title: 'Silat Tradisi', desc: 'Sasaran silat untuk remaja dan dewasa di ruang bawah surau.', meta: 'Malam pekanan · Ba’da Isya' },
    // { icon: 'users', title: 'Tahsin Dewasa', desc: 'Perbaikan bacaan Al-Qur’an untuk jamaah dewasa, kelompok kecil.', meta: 'Rabu · Ba’da Isya' },
    // { icon: 'heart-handshake', title: 'Santunan Anak Yatim', desc: 'Penyaluran bulanan dari infak jamaah untuk anak yatim sekitar surau.', meta: 'Setiap Jumat pertama' },
  ],
  news: [
    // { tag: 'Pengumuman', title: 'Jadwal Khatib Jumat Agustus 1448 H', date: '8 Agustus 2026' },
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
      title: 'Al Arif Billah Imam Agus Al Khalidi, Syaikh Abdul Ghani Al Kampari',
      order: 40
    },
    {
      title: 'Syaikh Mudo Muhammad Banoq Al Khalidi – Taeh Baruah',
      order: 41
    },
    {
      title: 'Syaikh Muhammad Muda Wali Al Khalidi',
      order: 42
    },
    {
      title: 'Syaikh Mudo Muhammad Nasir bin Abdullah Al Khalidi – Taeh Baruah',
      order: 43
    },
    {
      title: 'Abu Samah Al Khalidi – Solok',
      order: 44
    },
    {
      title: 'Al Arif Billah Malin Mudo Etriyel MYH bin Muhammad Nasir Al Khalidi – Taeh Baruah',
      order: 45
    },
    {
      title: 'Malin Sati Bestari Jaka Budiman bin Dhiyauddin Al Khalidi – Padang Panjang',
      order: 46
    },
    {
      title: "Angku Mudo 'Alim Jummardianata Aicha bin Chaidir Al Khalidi – Solok",
      order: 47
    }
  ],
  contact: {
    maps: 'https://maps.app.goo.gl/bVQSzRjYxisicxUq6?g_st=ic',
    pengurus: [{ name: 'Ustadz Anshor', role: 'Pengurus surau', phone: '081261246706' }],
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
  gallery: [
    { src: interiorRuangSalat, alt: 'Ruang shalat surau', ratio: '16 / 9', meta: 'Ruang Utama', caption: 'Karpet ruang shalat selepas Dzuhur.', span: 2 },
    { src: majelisJamaah, alt: 'Majelis jamaah', ratio: '16 / 9', meta: 'Kajian Rutin', caption: 'Majelis ba’da Isya, jamaah putra dan putri.', span: 2 },
    { src: gotongRoyongHalaman, alt: 'Gotong royong halaman surau', ratio: '3 / 4', meta: 'Gotong Royong', caption: 'Membersihkan lereng halaman.' },
    { src: latihanSilat, alt: 'Latihan silat di surau', ratio: '3 / 4', position: 'center 35%', meta: 'Remaja', caption: 'Latihan silat tradisi, malam pekanan.' },
    { src: pengurusSurau, alt: 'Pengurus surau', ratio: '3 / 4', position: 'center 40%', meta: 'Pengurus', caption: 'Pengurus dan tuanku selepas musyawarah.' },
    { src: gotongRoyongJamaah, alt: 'Jamaah bekerja di halaman', ratio: '3 / 4', meta: 'Gotong Royong', caption: 'Jamaah menanam di halaman atas.' },
  ],
};
