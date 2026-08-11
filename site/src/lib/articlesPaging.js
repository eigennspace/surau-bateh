// articlesPaging — logika murni "Muat lebih banyak" untuk halaman listing
// Artikel, dipisah dari `ArtikelPage.jsx` supaya bisa dites langsung tanpa
// harness interaksi DOM (lingkungan test proyek ini `environment: 'node'`,
// tanpa jsdom/fireEvent -- lihat `vite.config.js`).

export const ARTICLES_BATCH_SIZE = 6;

/**
 * Jumlah artikel yang ditampilkan setelah satu klik "Muat lebih banyak",
 * dibatasi oleh jumlah artikel yang tersedia.
 */
export function nextVisibleCount(shown, total, batchSize = ARTICLES_BATCH_SIZE) {
  return Math.min(total, shown + batchSize);
}

/**
 * Tombol "Muat lebih banyak" hanya tampil selama masih ada artikel yang
 * belum ditampilkan.
 */
export function hasMoreArticles(shown, total) {
  return shown < total;
}
