// deriveSiteData — satu-satunya titik di mana Sumber Data mentah (`SB_DATA`)
// diterjemahkan menjadi data siap-render. Fungsi murni: keluarannya hanya
// bergantung pada `rawData` dan `now`, tidak ada efek samping, tidak memutasi
// input. Komponen halaman hanya menerima hasil fungsi ini sebagai props.

const MONTHS_ID = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, Mei: 4, Jun: 5,
  Jul: 6, Ags: 7, Sep: 8, Okt: 9, Nov: 10, Des: 11,
};

function parseMinutesOfDay(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

/**
 * Menentukan waktu salat yang sedang berlangsung (`active`) dan berikutnya
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

export function deriveSiteData(rawData, now = new Date()) {
  const { activePrayerName, nextPrayerName } = computeActiveNextPrayer(rawData.times, now);

  return {
    times: rawData.times,
    events: rawData.events,
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
