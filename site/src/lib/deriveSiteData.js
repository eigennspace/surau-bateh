// deriveSiteData — satu-satunya titik di mana Sumber Data mentah (`SB_DATA`)
// diubah jadi data siap-render. Fungsi murni: keluarannya hanya bergantung
// pada `rawData` dan `now`, tidak ada efek samping, tidak memutasi input.
// Komponen halaman hanya menerima hasil fungsi ini sebagai props.

const MONTHS_ID = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, Mei: 4, Jun: 5,
  Jul: 6, Ags: 7, Sep: 8, Okt: 9, Nov: 10, Des: 11,
};

const DAY_ABBR_ID = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

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
 */
export function deriveSiteData(rawData, now = new Date()) {
  return {
    events: deriveEventsWithToday(rawData.events, now),
    programs: rawData.programs,
    news: rawData.news,
    ilmuTauhid: rawData.ilmuTauhid,
    ilmuFiqh: rawData.ilmuFiqh,
    ilmuTasawuf: rawData.ilmuTasawuf,
    contact: rawData.contact,
    // Isi tiap Halaman Program (judul, narasi, galeri) diteruskan apa adanya
    // dari Sumber Data -- tidak ada turunan yang perlu dihitung di sini.
    khitanan: rawData.khitanan,
    dauroh: rawData.dauroh,
    tawajjuh: rawData.tawajjuh,
    konseling: rawData.konseling,
    baktiSosial: rawData.baktiSosial,
    silaturahmi: rawData.silaturahmi,
    stats: rawData.stats,
    gallery: rawData.gallery,
    khatibJumat: deriveKhatibJumat(rawData.events, now),
    donation: deriveDonation(rawData.donation),
  };
}
