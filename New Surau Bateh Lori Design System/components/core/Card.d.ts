/**
 * Wadah konten dasar: sudut 16px, garis rambut, bayangan lembut.
 * @startingPoint section="Core" subtitle="Kartu putih, pasir, maroon, gelap, teduh" viewport="700x220"
 */
export interface CardProps {
  children?: React.ReactNode;
  tone?: 'default' | 'sand' | 'brand' | 'dark' | 'calm';
  padding?: string | number;
  /** aktifkan angkat 2px + bayangan sedang saat hover */
  interactive?: boolean;
  style?: React.CSSProperties;
}
export declare function Card(props: CardProps): JSX.Element;
