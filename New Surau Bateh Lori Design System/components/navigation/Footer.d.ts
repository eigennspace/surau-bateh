/** Kaki situs gelap: emblem, alamat, kolom tautan, ikon sosial emas. */
export interface FooterColumn { title: string; links: string[] }
export interface FooterProps {
  logoSrc?: string; address?: string; addressHref?: string; mapEmbedSrc?: string; columns?: FooterColumn[];
  /** nama ikon Lucide untuk kanal sosial */
  socials?: string[]; style?: React.CSSProperties;
}
export declare function Footer(props: FooterProps): JSX.Element;
