/**
 * Panel jadwal salat harian — elemen paling penting di seluruh sistem ini.
 * @startingPoint section="Surau" subtitle="Jadwal salat harian dengan status berjalan" viewport="700x420"
 */
export interface PrayerTime { name: string; adzan: string; iqamah?: string }
export interface PrayerTimeTableProps {
  date?: string; hijri?: string; location?: string;
  times?: PrayerTime[];
  /** solid = kartu putih (default); glass = semi transparan + blur, untuk di atas foto */
  variant?: 'solid' | 'glass';
  /** nama salat yang sedang berlangsung (teal) */
  activeName?: string;
  /** nama salat berikutnya (emas) */
  nextName?: string;
  style?: React.CSSProperties;
}
export declare function PrayerTimeTable(props: PrayerTimeTableProps): JSX.Element;
