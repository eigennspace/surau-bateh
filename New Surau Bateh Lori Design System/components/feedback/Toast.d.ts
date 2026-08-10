/** Pemberitahuan sementara setelah aksi (infak terkirim, pendaftaran tersimpan). */
export interface ToastProps {
  tone?: 'success' | 'info' | 'warning' | 'danger';
  title: string; message?: string; onClose?: () => void; style?: React.CSSProperties;
}
export declare function Toast(props: ToastProps): JSX.Element;
