/** Satu baris waktu salat: nama, adzan, iqamah, dan status berjalan/berikutnya. */
export interface PrayerTimeRowProps {
  /** Subuh | Syuruq | Dzuhur | Ashar | Maghrib | Isya */
  name: string;
  adzan: string; iqamah?: string;
  state?: 'default' | 'active' | 'next';
  /** ikut varian tabel induknya */
  variant?: 'solid' | 'glass';
  style?: React.CSSProperties;
}
export declare function PrayerTimeRow(props: PrayerTimeRowProps): JSX.Element;
