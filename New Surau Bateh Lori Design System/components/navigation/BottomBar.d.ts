/**
 * Bilah navigasi tetap di dasar layar ponsel; otomatis tidak dirender di layar lebar.
 * @startingPoint section="Navigation" subtitle="Bilah bawah tetap untuk ponsel" viewport="390x90"
 */
export interface BottomBarItem {
  label: string;
  /** nama ikon Lucide */
  icon: string;
  /** label pendek bila nama panjang, mis. "Jadwal" untuk "Jadwal Salat" */
  short?: string;
}
export interface BottomBarProps {
  items?: BottomBarItem[];
  active?: string;
  onNavigate?: (label: string) => void;
  style?: React.CSSProperties;
}
export declare function BottomBar(props: BottomBarProps): JSX.Element | null;
