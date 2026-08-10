/** Label status kecil berbentuk pil (mis. "Sedang berlangsung", "Jumat"). */
export interface BadgeProps {
  children?: React.ReactNode;
  tone?: 'neutral' | 'brand' | 'accent' | 'active' | 'solid';
  icon?: string;
  style?: React.CSSProperties;
}
export declare function Badge(props: BadgeProps): JSX.Element;
