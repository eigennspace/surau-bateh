/** Sakelar pengaturan langsung-berlaku (mis. adzan otomatis, mode gelap layar TV). */
export interface SwitchProps {
  label?: string; checked?: boolean; defaultChecked?: boolean;
  onChange?: (next: boolean) => void; disabled?: boolean; style?: React.CSSProperties;
}
export declare function Switch(props: SwitchProps): JSX.Element;
