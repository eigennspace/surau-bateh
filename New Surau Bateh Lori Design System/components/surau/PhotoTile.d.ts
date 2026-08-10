/**
 * Foto dokumentasi surau dengan gradien pelindung dan keterangan di bawah.
 * @startingPoint section="Surau" subtitle="Kartu foto dokumentasi dengan keterangan" viewport="700x300"
 */
export interface PhotoTileProps {
  src: string; alt?: string;
  /** keterangan satu kalimat, bukan judul pemasaran */
  caption?: string;
  /** overline di atas keterangan, mis. "Gotong Royong" */
  meta?: string;
  /** nama ikon Lucide di samping overline */
  icon?: string;
  /** aspect-ratio CSS, mis. "4 / 3" atau "1 / 1" */
  ratio?: string;
  /** object-position, mis. "center 40%" */
  position?: string;
  /** scrim = gradien pelindung (default); none = tanpa gradien, hanya untuk foto tanpa teks */
  tone?: 'scrim' | 'none';
  style?: React.CSSProperties;
}
export declare function PhotoTile(props: PhotoTileProps): JSX.Element;
