// prayerTimeCalculator — modul murni yang menghitung enam waktu shalat
// (Subuh, Syuruq, Dzuhur, Ashar, Maghrib, Isya) untuk satu koordinat + satu
// tanggal, mengikuti metode resmi Kementerian Agama RI: sudut fajar -20°,
// sudut isya -18°, mazhab Syafi'i untuk Ashar, ihtiyat resmi Kemenag.
//
// Parameter-parameter metode ini DIBAKUKAN di dalam modul -- bukan sesuatu
// yang dikonfigurasi dari luar, karena itu bagian dari definisi "metode
// Kemenag" itu sendiri, bukan kebijakan lokal surau. Hanya koordinat +
// tanggal yang diterima sebagai parameter, sehingga fungsi ini bisa dipakai
// ulang bila koordinat surau perlu direvisi, tanpa menulis ulang fungsi.
//
// Astronomi (posisi matahari) dihitung lewat `adhan` -- implementasi
// JavaScript dari algoritma "Astronomical Algorithms" (Jean Meeus), dipakai
// di sini hanya sebagai mesin astronomi; sudut dan mazhab tetap dibakukan
// mengikuti metode Kemenag di atas, bukan salah satu preset bawaan `adhan`
// untuk wilayah lain.
import { Coordinates, CalculationMethod, Madhab, PrayerTimes } from 'adhan';
import { addMinutesToHHMM } from './hhmm.js';

// Ihtiyat (kehati-hatian waktu) resmi Kemenag: 2 menit ditambahkan ke waktu
// *mulai* tiap shalat (Subuh, Dzuhur, Ashar, Maghrib, Isya) supaya awal
// waktu tidak pernah terlalu cepat, dan 2 menit dikurangi dari Syuruq supaya
// akhir waktu Subuh/awal larangan shalat tidak pernah terlalu lambat.
const IHTIYAT_MINUTES = 2;

const PRAYER_ORDER = ['subuh', 'syuruq', 'dzuhur', 'ashar', 'maghrib', 'isya'];

function buildKemenagParams() {
  // `CalculationMethod.Singapore()` di `adhan` sudah memakai sudut fajar 20°
  // dan isya 18° -- persis sudut yang dipakai Kemenag RI (metode ini
  // didokumentasikan `adhan` untuk kawasan Singapura/Malaysia/Indonesia).
  const params = CalculationMethod.Singapore();
  params.madhab = Madhab.Shafi;
  return params;
}

function formatHHMM(date, timeZone) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);
}

/**
 * Menghitung enam waktu shalat metode Kemenag untuk satu koordinat + satu
 * tanggal.
 *
 * @param {{ latitude: number, longitude: number, date: Date, timeZone?: string }} params
 *   `date` hanya tahun/bulan/tanggalnya yang dipakai (kalender Gregorian,
 *   dibaca di zona waktu lokal environment yang memanggil fungsi ini) --
 *   komponen jam/menit diabaikan. `timeZone` adalah identitas zona waktu IANA
 *   dipakai untuk memformat hasil (default `Asia/Jakarta`, WIB).
 * @returns {{ subuh: string, syuruq: string, dzuhur: string, ashar: string, maghrib: string, isya: string }}
 *   Jam dalam format `HH:MM` 24 jam pada `timeZone` yang diminta.
 */
export function computePrayerTimes({ latitude, longitude, date, timeZone = 'Asia/Jakarta' }) {
  const coordinates = new Coordinates(latitude, longitude);
  const params = buildKemenagParams();
  const prayerTimes = new PrayerTimes(coordinates, date, params);

  const raw = {
    subuh: prayerTimes.fajr,
    syuruq: prayerTimes.sunrise,
    dzuhur: prayerTimes.dhuhr,
    ashar: prayerTimes.asr,
    maghrib: prayerTimes.maghrib,
    isya: prayerTimes.isha,
  };

  const result = {};
  for (const name of PRAYER_ORDER) {
    const hhmm = formatHHMM(raw[name], timeZone);
    result[name] = name === 'syuruq'
      ? addMinutesToHHMM(hhmm, -IHTIYAT_MINUTES)
      : addMinutesToHHMM(hhmm, IHTIYAT_MINUTES);
  }
  return result;
}
