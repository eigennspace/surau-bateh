// deriveSiteData — satu-satunya titik di mana Sumber Data mentah (`SB_DATA`)
// digabung dengan dataset jadwal shalat hasil generate build-time menjadi
// data siap-render. Fungsi murni: keluarannya hanya bergantung pada
// `rawData`, `now`, dan `prayerTimesDataset`, tidak ada efek samping, tidak
// memutasi input. Komponen halaman hanya menerima hasil fungsi ini sebagai
// props.

import { parseMinutesOfDay, addMinutesToHHMM } from './hhmm.js';
import { MONTH_NAMES_ID } from './monthNamesId.js';

const MONTHS_ID = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, Mei: 4, Jun: 5,
  Jul: 6, Ags: 7, Sep: 8, Okt: 9, Nov: 10, Des: 11,
};

const DAY_NAMES_ID = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const DAY_ABBR_ID = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

const PRAYER_NAMES = [
  ['Subuh', 'subuh'],
  ['Syuruq', 'syuruq'],
  ['Dzuhur', 'dzuhur'],
  ['Ashar', 'ashar'],
  ['Maghrib', 'maghrib'],
  ['Isya', 'isya'],
];

function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Label tanggal Masehi hari ini dalam Bahasa Indonesia (mis. "Selasa, 11
 * Agustus 2026"), dihitung dari `now` -- bukan teks hardcode. Dipakai kartu
 * jadwal shalat (`PrayerTimeTable`) di beranda dan halaman Jadwal Shalat,
 * yang sebelumnya jatuh ke default hardcode komponen ("Senin, 10 Agustus
 * 2026") karena tak ada pemanggil yang mengirim prop `date`.
 */
function formatMasehiDate(date) {
  return `${DAY_NAMES_ID[date.getDay()]}, ${date.getDate()} ${MONTH_NAMES_ID[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Membentuk `times` (bentuk existing: `[{name, adzan, iqamah?}]`, urutan
 * Subuh–Syuruq–Dzuhur–Ashar–Maghrib–Isya) dari satu entri dataset hasil
 * generate + `iqamahOffsets`. Syuruq tetap tanpa iqamah (bukan waktu
 * shalat), konsisten dengan struktur data yang sudah ada.
 */
function buildTimesForEntry(entry, iqamahOffsets) {
  const offsets = iqamahOffsets || {};
  return PRAYER_NAMES.map(([name, key]) => {
    const adzan = entry[key];
    if (name === 'Syuruq') return { name, adzan };
    const offsetMinutes = offsets[name] || 0;
    return { name, adzan, iqamah: addMinutesToHHMM(adzan, offsetMinutes) };
  });
}

/**
 * Mencari entri satu tanggal di dataset hasil generate. Tanggal yang
 * dibutuhkan tidak ditemukan diperlakukan sebagai bug integritas build
 * (skrip generate gagal diam-diam, atau dataset kadaluarsa) — bukan
 * fallback runtime senyap, jadi fungsi ini melempar error yang jelas.
 * `context` menambah penjelasan singkat di pesan error (mis. kegunaan
 * tanggal itu), untuk membedakan kegagalan "hari ini" vs "Pekan ini".
 */
function requireEntry(dataset, dateKey, context = '') {
  const entry = (dataset || []).find(e => e.date === dateKey);
  if (!entry) {
    throw new Error(
      `deriveSiteData: tidak ada data jadwal shalat untuk tanggal ${dateKey} di dataset hasil generate` +
      (context ? ` (${context})` : '') + '. ' +
      'Jalankan ulang `npm run generate-prayer-times` atau perpanjang jangkauan data.',
    );
  }
  return entry;
}

/**
 * Mencari entri hari ini di dataset hasil generate dan mengubahnya jadi
 * `times` siap-render.
 */
function buildTodayTimes(dataset, iqamahOffsets, now) {
  const entry = requireEntry(dataset, toDateKey(now));
  return buildTimesForEntry(entry, iqamahOffsets);
}

/**
 * Membentuk `week`: 7 entri berturut-turut mulai hari ini, tiap entri berisi
 * tanggal asli + jam per shalat (adzan+iqamah, offset iqamah sama tiap hari
 * karena itu kebijakan tetap, bukan hasil hitung tanggal).
 */
function buildWeek(dataset, iqamahOffsets, now) {
  const week = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const dateKey = toDateKey(date);
    const entry = requireEntry(dataset, dateKey, 'dibutuhkan untuk tabel "Pekan ini"');
    week.push({ date: dateKey, times: buildTimesForEntry(entry, iqamahOffsets) });
  }
  return week;
}

/**
 * Menentukan waktu shalat yang sedang berlangsung (`active`) dan berikutnya
 * (`next`) dengan membandingkan `now` terhadap daftar `times` hari ini.
 * Sebelum waktu pertama hari ini (mis. sebelum Subuh), waktu yang masih
 * "berlangsung" adalah entri terakhir (Isya, dari hari sebelumnya) dan
 * berikutnya adalah entri pertama (Subuh) — mengikuti siklus harian.
 */
function computeActiveNextPrayer(times, now) {
  if (!times || times.length === 0) {
    return { activePrayerName: undefined, nextPrayerName: undefined };
  }
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  let activeIndex = -1;
  for (let i = 0; i < times.length; i++) {
    if (parseMinutesOfDay(times[i].adzan) <= nowMinutes) activeIndex = i;
  }
  if (activeIndex === -1) activeIndex = times.length - 1;
  const nextIndex = (activeIndex + 1) % times.length;
  return {
    activePrayerName: times[activeIndex].name,
    nextPrayerName: times[nextIndex].name,
  };
}

/**
 * Menurunkan kartu "Khatib Jumat" dari `events` berkategori "Jumat" yang
 * terdekat (paling cepat akan datang dari `now`; melingkar ke tahun
 * berikutnya bila tanggalnya sudah lewat tahun ini). Mengembalikan `null`
 * bila tidak ada entri berkategori "Jumat" — ditangani dengan wajar, tanpa
 * error.
 */
function deriveKhatibJumat(events, now) {
  const jumatEvents = (events || []).filter(e => e.category === 'Jumat');
  if (jumatEvents.length === 0) return null;

  const withDates = jumatEvents.map(event => {
    const monthIndex = MONTHS_ID[event.month] ?? 0;
    let date = new Date(now.getFullYear(), monthIndex, Number(event.day));
    if (date < now) date = new Date(now.getFullYear() + 1, monthIndex, Number(event.day));
    return { event, date };
  });
  withDates.sort((a, b) => a.date - b.date);
  return withDates[0].event;
}

/**
 * Menandai tiap event mingguan (`day` berisi singkatan hari Sen/Sel/dst,
 * bukan kategori "Jumat" yang memakai `day` sebagai tanggal-di-bulan) dengan
 * `isToday`: true bila `day` event itu cocok dengan hari-dalam-minggu `now`.
 * Hanya membandingkan hari, bukan jam — jadi tetap `true` sepanjang hari itu
 * berjalan, tidak peduli event sudah/belum lewat jamnya. Event kategori
 * "Jumat" selalu `isToday: false` karena `day`-nya bukan nama hari (lihat
 * `deriveKhatibJumat`), sehingga tidak salah dicocokkan sebagai singkatan
 * hari.
 */
function deriveEventsWithToday(events, now) {
  const todayAbbr = DAY_ABBR_ID[now.getDay()];
  return (events || []).map(event => ({
    ...event,
    isToday: event.category !== 'Jumat' && event.day === todayAbbr,
  }));
}

/**
 * Menggabungkan `donation` mentah jadi bentuk siap-render: `campaign` hanya
 * disertakan (judul + deskripsi) bila togglenya aktif; sebaliknya `null`,
 * sehingga halaman hanya menampilkan QRIS + rekening polos.
 */
function deriveDonation(donation) {
  if (!donation) return undefined;
  const { qris, bank, campaign } = donation;
  return {
    qris,
    bank,
    campaign: campaign && campaign.active
      ? { title: campaign.title, description: campaign.description }
      : null,
  };
}

/**
 * @param {object} rawData `SB_DATA` — Sumber Data mentah.
 * @param {Date} now Jam pengunjung membuka situs.
 * @param {Array<{date: string, subuh: string, syuruq: string, dzuhur: string, ashar: string, maghrib: string, isya: string}>} prayerTimesDataset
 *   Dataset jadwal shalat hasil generate build-time
 *   (`scripts/generate-prayer-times.mjs` / `computePrayerTimes`).
 */
export function deriveSiteData(rawData, now = new Date(), prayerTimesDataset = []) {
  const times = buildTodayTimes(prayerTimesDataset, rawData.iqamahOffsets, now);
  const week = buildWeek(prayerTimesDataset, rawData.iqamahOffsets, now);
  const { activePrayerName, nextPrayerName } = computeActiveNextPrayer(times, now);

  return {
    times,
    week,
    dateLabel: formatMasehiDate(now),
    events: deriveEventsWithToday(rawData.events, now),
    programs: rawData.programs,
    news: rawData.news,
    ilmuTauhid: rawData.ilmuTauhid,
    ilmuFiqh: rawData.ilmuFiqh,
    ilmuTasawuf: rawData.ilmuTasawuf,
    contact: rawData.contact,
    stats: rawData.stats,
    gallery: rawData.gallery,
    activePrayerName,
    nextPrayerName,
    khatibJumat: deriveKhatibJumat(rawData.events, now),
    donation: deriveDonation(rawData.donation),
  };
}
