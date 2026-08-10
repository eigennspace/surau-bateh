/**
 * Kutipan ayat/hadis: baris Arab (Amiri) di atas, terjemahan, lalu sumber.
 * @startingPoint section="Surau" subtitle="Blok kutipan ayat dengan terjemahan" viewport="700x300"
 */
export interface ArabicVerseProps {
  arabic: string; translation?: string; source?: string;
  align?: 'center' | 'right';
  tone?: 'sand' | 'dark' | 'brand';
  style?: React.CSSProperties;
}
export declare function ArabicVerse(props: ArabicVerseProps): JSX.Element;
