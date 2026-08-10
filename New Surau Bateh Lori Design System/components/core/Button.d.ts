/**
 * Aksi utama Surau Bateh Lori — pil penuh, maroon emblem untuk aksi primer.
 * @startingPoint section="Core" subtitle="Tombol pil maroon, emas, sekunder, ghost" viewport="700x160"
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** primary = maroon, accent = emas, secondary = outline, ghost, dark */
  tone?: 'primary' | 'accent' | 'secondary' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  /** nama ikon Lucide, mis. "map-pin" */
  icon?: string;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;
