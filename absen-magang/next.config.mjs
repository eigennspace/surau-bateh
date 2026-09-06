/** @type {import('next').NextConfig} */
const nextConfig = {
  // pdfkit (dipakai lib/absen/pdf.js) membaca file .afm (metrik font) dari
  // disk relatif ke lokasinya sendiri di node_modules saat runtime. Kalau
  // dibundel webpack, path itu tidak ikut disalin ke .next/server/ dan
  // route /api/laporan gagal dengan ENOENT saat generate PDF pertama kali.
  // Menandai external memaksa Next memuatnya lewat require() Node biasa
  // dari node_modules, bukan dari bundle webpack.
  serverExternalPackages: ['pdfkit', 'fontkit'],
};

export default nextConfig;
