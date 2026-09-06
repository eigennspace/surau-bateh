// Pola tabel (desktop) <-> kartu (mobile) dipakai bersama oleh halaman
// Pendaftaran dan Kehadiran Ditinjau (lihat spec.md, Implementation
// Decisions: "Tabel -> kartu di mobile"). Data dan handler yang dirender
// di kedua slot (`rows`/`cards`) sama persis -- hanya presentasi yang
// berbeda per breakpoint, dikontrol lewat CSS (styles/dashboard.css),
// bukan deteksi lebar viewport lewat JS.
export function ResponsiveTable({ columns, rows, cards }) {
  return (
    <div className="responsive-table">
      <table className="responsive-table__table">
        <thead>
          <tr>
            {columns.map(kolom => <th key={kolom}>{kolom}</th>)}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <div className="responsive-table__cards">{cards}</div>
    </div>
  );
}
