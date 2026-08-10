// Sumber Data — satu-satunya berkas yang diedit tangan oleh pengurus surau untuk
// mengubah konten situs. Mengikuti bentuk `window.SB_DATA` dari
// `New Surau Bateh Lori Design System/ui_kits/website/data.js`, disesuaikan jadi
// `export const SB_DATA` agar bisa di-import langsung oleh Vite.
//
// Cara memperbarui situs: ubah nilai di sini, lalu jalankan build + deploy ulang.
// Tidak ada panel admin, tidak ada database — berkas ini SATU-SATUNYA sumber
// konten yang bisa berubah (jadwal salat, agenda, program, donasi, dll).

import qrisImage from '../../../New Surau Bateh Lori Design System/assets/qris-surau-lori.jpg';
import interiorRuangSalat from '../../../New Surau Bateh Lori Design System/assets/photos/interior-ruang-salat.png';
import majelisJamaah from '../../../New Surau Bateh Lori Design System/assets/photos/majelis-jamaah.jpg';
import gotongRoyongHalaman from '../../../New Surau Bateh Lori Design System/assets/photos/gotong-royong-halaman.jpg';
import latihanSilat from '../../../New Surau Bateh Lori Design System/assets/photos/latihan-silat.jpg';
import pengurusSurau from '../../../New Surau Bateh Lori Design System/assets/photos/pengurus-surau.jpg';
import gotongRoyongJamaah from '../../../New Surau Bateh Lori Design System/assets/photos/gotong-royong-jamaah.jpg';

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
    { day: '12', month: 'Ags', title: 'Kajian Tafsir Surah Al-Kahfi', speaker: 'Ust. Rahmat Hidayat', time: "Ba'da Maghrib", place: 'Ruang utama', category: 'Kajian Rutin' },
    { day: '14', month: 'Ags', title: 'Tahsin Al-Qur’an Dewasa', speaker: 'Ust. Zulfikar', time: '19.45 WIB', place: 'Ruang belajar', category: 'Tahsin' },
    { day: '15', month: 'Ags', title: 'Khutbah Jumat: Amanah dalam Bekerja', speaker: 'Ust. H. Marwan Dt. Rajo', time: '12.10 WIB', place: 'Ruang utama', category: 'Jumat' },
    { day: '17', month: 'Ags', title: 'Doa Bersama HUT Kemerdekaan RI', speaker: 'Pengurus Surau', time: "Ba'da Subuh", place: 'Halaman surau', category: 'Kegiatan' },
    { day: '19', month: 'Ags', title: 'Latihan Silat Tradisi', speaker: 'Pelatih sasaran surau', time: "Ba'da Isya", place: 'Ruang bawah', category: 'Silat' },
  ],
  programs: [
    { icon: 'swords', title: 'Silat Tradisi', desc: 'Sasaran silat untuk remaja dan dewasa di ruang bawah surau.', meta: 'Malam pekanan · Ba’da Isya' },
    { icon: 'mic', title: 'Kajian Rutin Pekanan', desc: 'Tafsir dan fikih ibadah bersama ustaz undangan dari Kota Padang.', meta: 'Selasa & Kamis · Ba’da Maghrib' },
    { icon: 'users', title: 'Tahsin Dewasa', desc: 'Perbaikan bacaan Al-Qur’an untuk jamaah dewasa, kelompok kecil.', meta: 'Rabu · Ba’da Isya' },
    { icon: 'heart-handshake', title: 'Santunan Anak Yatim', desc: 'Penyaluran bulanan dari infak jamaah untuk anak yatim sekitar surau.', meta: 'Setiap Jumat pertama' },
  ],
  news: [
    { tag: 'Pengumuman', title: 'Jadwal Khatib Jumat Agustus 1448 H', date: '8 Agustus 2026' },
    { tag: 'Laporan', title: 'Laporan Kas Surau Juli 2026', date: '2 Agustus 2026' },
    { tag: 'Kegiatan', title: 'Gotong Royong Pembersihan Ruang Wudhu', date: '28 Juli 2026' },
  ],
  roadmap: [
    { title: 'Tiang dan lantai bawah', period: 'Tahap 1', status: 'selesai', description: 'Tiang beton dan lantai surambi bawah dikerjakan jamaah sendiri.' },
    { title: 'Surambi kayu lantai atas', period: 'Tahap 2', status: 'selesai', description: 'Pagar dan lantai kayu untuk majelis di lantai atas.' },
    { title: 'Ruang salat berkarpet', period: 'Tahap 3', status: 'selesai', description: 'Lantai, dinding, dan karpet ruang utama yang dipakai hari ini.' },
    { title: 'Ruang wudhu sisi belakang', period: 'Tahap 4', status: 'berjalan', description: 'Dinding bata dan saluran air di sisi belakang surau.' },
    { title: 'Renovasi atap', period: 'Tahap 5', status: 'rencana', description: 'Menunggu dana infak jamaah terkumpul.' },
  ],
  contact: {
    maps: 'https://maps.app.goo.gl/bVQSzRjYxisicxUq6?g_st=ic',
    pengurus: [{ name: 'Ustadz Anshor', role: 'Pengurus surau', phone: '081261246706' }],
  },
  // Nilai awal `bank` berasal dari `New Surau Bateh Lori Design System/assets/informasi-rekening.md`.
  donation: {
    qris: qrisImage,
    bank: { name: 'Bank Syariah Indonesia (BSI)', account: '7771 806 168', holder: 'PONPES RIBATH AS SA ADY' },
    campaign: { active: true, title: 'Renovasi Atap Surau', description: 'Menunggu dana infak jamaah terkumpul untuk tahap renovasi atap.' },
  },
  // Angka statistik: field manual, diisi berdasarkan pengamatan pengurus — bukan hitungan otomatis.
  stats: [
    { icon: 'users', value: '180', label: 'Jamaah rutin Subuh' },
    { icon: 'mic', value: '8', label: 'Kajian per bulan' },
    { icon: 'calendar-days', value: 'Tiap pekan', label: 'Gotong royong halaman' },
  ],
  gallery: [
    { src: interiorRuangSalat, alt: 'Ruang salat surau', ratio: '16 / 9', meta: 'Ruang Utama', caption: 'Karpet ruang salat selepas Dzuhur.', span: 2 },
    { src: majelisJamaah, alt: 'Majelis jamaah', ratio: '16 / 9', meta: 'Kajian Rutin', caption: 'Majelis ba’da Isya, jamaah putra dan putri.', span: 2 },
    { src: gotongRoyongHalaman, alt: 'Gotong royong halaman surau', ratio: '3 / 4', meta: 'Gotong Royong', caption: 'Membersihkan lereng halaman.' },
    { src: latihanSilat, alt: 'Latihan silat di surau', ratio: '3 / 4', position: 'center 35%', meta: 'Remaja', caption: 'Latihan silat tradisi, malam pekanan.' },
    { src: pengurusSurau, alt: 'Pengurus surau', ratio: '3 / 4', position: 'center 40%', meta: 'Pengurus', caption: 'Pengurus dan tuanku selepas musyawarah.' },
    { src: gotongRoyongJamaah, alt: 'Jamaah bekerja di halaman', ratio: '3 / 4', meta: 'Gotong Royong', caption: 'Jamaah menanam di halaman atas.' },
  ],
};
