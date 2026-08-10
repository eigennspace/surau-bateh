/**
 * Baris agenda kajian: kalender maroon, judul, penceramah, waktu, tempat.
 * @startingPoint section="Surau" subtitle="Baris agenda kajian dengan tanggal" viewport="700x140"
 */
export interface EventItemProps {
  day: string | number; month: string; title: string;
  speaker?: string; time?: string; place?: string; category?: string;
  onClick?: () => void; style?: React.CSSProperties;
}
export declare function EventItem(props: EventItemProps): JSX.Element;
