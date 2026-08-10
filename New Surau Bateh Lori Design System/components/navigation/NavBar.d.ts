/**
 * Kepala situs Surau Bateh Lori: emblem + nama, tautan, satu aksi infak.
 * @startingPoint section="Navigation" subtitle="Kepala situs dengan emblem dan aksi infak" viewport="1180x90"
 */
export interface NavBarProps {
  logoSrc?: string; brand?: string; tagline?: string;
  items?: string[]; active?: string; onNavigate?: (item: string) => void;
  action?: string; onAction?: () => void; style?: React.CSSProperties;
}
export declare function NavBar(props: NavBarProps): JSX.Element;
