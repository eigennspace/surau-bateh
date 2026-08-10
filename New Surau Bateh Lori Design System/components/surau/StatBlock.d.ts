/** Angka ringkas tentang surau (jumlah jamaah rutin, kajian per bulan, dana terkumpul). */
export interface StatBlockProps {
  icon?: string; value: string | number; label: string;
  tone?: 'sand' | 'dark' | 'plain'; style?: React.CSSProperties;
}
export declare function StatBlock(props: StatBlockProps): JSX.Element;
