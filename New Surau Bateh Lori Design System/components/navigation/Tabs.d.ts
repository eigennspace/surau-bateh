/**
 * Pemindah tampilan sebaris (mis. Hari ini / Pekan ini pada jadwal salat).
 * @startingPoint section="Navigation" subtitle="Tab pil di atas dasar pasir" viewport="700x120"
 */
export interface TabItem { label: string; value: string }
export interface TabsProps { items?: (TabItem | string)[]; value?: string; onChange?: (value: string) => void; style?: React.CSSProperties }
export declare function Tabs(props: TabsProps): JSX.Element;
