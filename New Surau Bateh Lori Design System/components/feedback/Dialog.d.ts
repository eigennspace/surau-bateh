/** Panel modal untuk konfirmasi infak, detail kajian, atau formulir pendek. */
export interface DialogProps {
  open?: boolean; title?: string; description?: string;
  children?: React.ReactNode; footer?: React.ReactNode;
  onClose?: () => void; width?: number;
  /** true = dirender di dalam alur halaman (untuk kartu spesimen), bukan overlay layar penuh */
  inline?: boolean;
}
export declare function Dialog(props: DialogProps): JSX.Element | null;
