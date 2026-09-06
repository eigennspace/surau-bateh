import PDFDocument from 'pdfkit';

function formatTanggal(tanggal) {
  const d = tanggal instanceof Date ? tanggal : new Date(tanggal);
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
}

function formatJam(waktu) {
  if (!waktu) return '-';
  const d = waktu instanceof Date ? waktu : new Date(waktu);
  return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

// Merender data laporan (lihat ambilDataLaporan di ./index.js) sebagai PDF
// siap cetak: tabel tanggal/jam masuk/jam pulang/catatan aktivitas, ditutup
// kolom kosong tanda tangan basah -- lihat spec.md, tidak ada e-signature.
export function renderLaporanPdf({ peserta, kehadiran, tanggalMulai, tanggalSelesai }) {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  const chunks = [];
  doc.on('data', chunk => chunks.push(chunk));
  const done = new Promise(resolve => doc.on('end', () => resolve(Buffer.concat(chunks))));

  doc.fontSize(16).text('Laporan Kehadiran Magang', { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(11);
  doc.text(`Peserta: ${peserta.nama}`);
  doc.text(`Asal: ${peserta.asalKampus} — ${peserta.jurusan}`);
  doc.text(`NIM: ${peserta.nim}`);
  doc.text(`Rentang: ${formatTanggal(tanggalMulai)} s/d ${formatTanggal(tanggalSelesai)}`);
  doc.moveDown();

  const kolom = [
    { judul: 'Tanggal', lebar: 130 },
    { judul: 'Jam Masuk', lebar: 90 },
    { judul: 'Jam Pulang', lebar: 90 },
    { judul: 'Catatan Aktivitas', lebar: 190 },
  ];
  const startX = doc.page.margins.left;
  let y = doc.y;

  function gambarBarisHeader() {
    let x = startX;
    doc.fontSize(10).font('Helvetica-Bold');
    for (const k of kolom) {
      doc.text(k.judul, x, y, { width: k.lebar });
      x += k.lebar;
    }
    doc.font('Helvetica');
    y += 18;
  }

  gambarBarisHeader();

  if (kehadiran.length === 0) {
    doc.fontSize(10).text('Tidak ada Kehadiran pada rentang tanggal ini.', startX, y);
    y += 18;
  } else {
    for (const k of kehadiran) {
      if (y > doc.page.height - doc.page.margins.bottom - 60) {
        doc.addPage();
        y = doc.page.margins.top;
        gambarBarisHeader();
      }
      let x = startX;
      const nilai = [formatTanggal(k.tanggal), formatJam(k.jamMasuk), formatJam(k.jamPulang), k.catatanAktivitas || '-'];
      doc.fontSize(10);
      nilai.forEach((teks, i) => {
        doc.text(teks, x, y, { width: kolom[i].lebar });
        x += kolom[i].lebar;
      });
      y += 18;
    }
  }

  y += 40;
  if (y > doc.page.height - doc.page.margins.bottom - 80) {
    doc.addPage();
    y = doc.page.margins.top;
  }
  doc.fontSize(10).text('Mengetahui,', startX, y);
  y += 60;
  doc.text('___________________________', startX, y);
  y += 14;
  doc.text('Nama & jabatan penandatangan', startX, y);

  doc.end();
  return done;
}
