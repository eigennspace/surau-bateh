/** Kolom teks satu baris dengan label, ikon opsional, dan pesan bantuan/galat. */
export interface InputProps {
  label?: string; placeholder?: string; value?: string; defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** nama ikon Lucide di sisi kiri */
  icon?: string; hint?: string; error?: string;
  type?: 'text' | 'email' | 'tel' | 'number' | 'search' | 'date';
  disabled?: boolean; id?: string; style?: React.CSSProperties;
}
export declare function Input(props: InputProps): JSX.Element;
