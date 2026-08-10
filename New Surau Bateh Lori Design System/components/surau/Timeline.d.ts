/**
 * Rantai kronologis tegak — dipakai untuk silsilah guru/pengurus surau dan roadmap pembangunan.
 * @startingPoint section="Surau" subtitle="Silsilah guru atau roadmap pembangunan" viewport="700x400"
 */
export interface TimelineItem {
  title: string;
  /** rentang waktu, mis. "2019 – 2021" atau "Tahap 3" */
  period?: string;
  /** hanya untuk silsilah: kedudukan, mis. "Tuanku pertama" */
  role?: string;
  description?: string;
  /** hanya untuk roadmap */
  status?: 'selesai' | 'berjalan' | 'rencana';
  /** hanya untuk silsilah: nomor mata rantai (default urutan array) */
  order?: number;
  /** cabang di bawah mata rantai ini — murid, pengurus turunan, atau sub-pekerjaan; boleh bersarang */
  branches?: TimelineItem[];
}
export interface TimelineProps {
  items?: TimelineItem[];
  /** roadmap = titik berstatus (centang/berjalan/rencana); silsilah = titik bernomor maroon */
  variant?: 'roadmap' | 'silsilah';
  style?: React.CSSProperties;
}
export declare function Timeline(props: TimelineProps): JSX.Element;
