/** Bilah kemajuan penggalangan dana pembangunan/operasional surau. */
export interface DonationProgressProps {
  title?: string; collected?: number; target?: number;
  currency?: string; deadline?: string; style?: React.CSSProperties;
}
export declare function DonationProgress(props: DonationProgressProps): JSX.Element;
