/** Daftar pilihan tunggal (mis. pilih masjid, pilih program). */
export interface SelectOption { label: string; value: string }
export interface SelectProps {
  label?: string; options?: (SelectOption | string)[]; value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  hint?: string; disabled?: boolean; id?: string; style?: React.CSSProperties;
}
export declare function Select(props: SelectProps): JSX.Element;
