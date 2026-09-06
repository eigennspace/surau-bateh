import '../styles/globals.css';

export const metadata = {
  title: 'Absen Magang — Surau Bateh Lori',
  description: 'Pencatatan kehadiran mahasiswi/intern magang di Surau Bateh Lori',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
