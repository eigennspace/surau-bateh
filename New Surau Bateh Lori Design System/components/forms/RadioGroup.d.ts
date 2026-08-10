/** Pilihan tunggal eksklusif dalam satu kelompok (mis. nominal infak). */
export interface RadioOption { label: string; value: string }
export interface RadioGroupProps {
  label?: string; options?: (RadioOption | string)[]; value?: string;
  onChange?: (value: string) => void; name?: string; style?: React.CSSProperties;
}
export declare function RadioGroup(props: RadioGroupProps): JSX.Element;
