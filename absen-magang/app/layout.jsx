import '../styles/globals.css';
import '../styles/gerbang.css';
import '../styles/dashboard.css';

export const metadata = {
  title: 'Absen PL — Surau Bateh Lori',
  description: 'Pencatatan kehadiran mahasiswi/intern PL di Surau Bateh Lori',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
