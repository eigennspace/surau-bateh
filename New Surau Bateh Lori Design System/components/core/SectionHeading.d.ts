/**
 * Judul bagian: overline maroon huruf besar, opsional baris Arab emas, judul, deskripsi.
 * @startingPoint section="Core" subtitle="Pola judul bagian dengan overline & baris Arab" viewport="700x200"
 */
export interface SectionHeadingProps {
  overline?: string; title: string; description?: string;
  align?: 'left' | 'center';
  /** teks Arab pendek di atas judul, dirender dengan Amiri emas */
  arabic?: string;
  style?: React.CSSProperties;
}
export declare function SectionHeading(props: SectionHeadingProps): JSX.Element;
