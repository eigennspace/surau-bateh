// requireSanityWriteEnv — validasi env var Sanity yang dipakai kedua skrip
// migrasi satu-kali (`migrate-articles-to-sanity.mjs`,
// `migrate-gallery-to-sanity.mjs`), yang keduanya butuh token dengan hak
// tulis (bukan role Viewer, beda dari `fetch-sanity-content.mjs` yang boleh
// jalan tanpa token untuk dataset publik). Dipisah ke sini supaya pesan
// error dan syarat validasinya tidak perlu disalin dua kali.
export function requireSanityWriteEnv(scriptName) {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET;
  const token = process.env.SANITY_API_TOKEN;
  if (!projectId || !dataset || !token) {
    console.error(
      `${scriptName}: SANITY_PROJECT_ID/SANITY_DATASET/SANITY_API_TOKEN belum diset (lihat site/.env.example). ` +
      'Token butuh hak tulis (bukan role Viewer).',
    );
    process.exit(1);
  }
  return { projectId, dataset, token };
}
