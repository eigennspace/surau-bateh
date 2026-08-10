/** Pembungkus ikon Lucide — satu-satunya cara menampilkan ikon di sistem ini. */
export interface IconProps {
  /** nama ikon Lucide dalam kebab-case, mis. "moon-star", "clock", "map-pin" */
  name: string;
  size?: number;
  /** override warna; default mengikuti currentColor */
  strokeColor?: string;
  title?: string;
  style?: React.CSSProperties;
}
export declare function Icon(props: IconProps): JSX.Element;
