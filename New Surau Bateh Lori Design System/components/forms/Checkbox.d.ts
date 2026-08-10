/** Pilihan ya/tidak untuk daftar persetujuan dan pilihan ganda. */
export interface CheckboxProps {
  label: string; description?: string; checked?: boolean; defaultChecked?: boolean;
  onChange?: (next: boolean) => void; disabled?: boolean; style?: React.CSSProperties;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
