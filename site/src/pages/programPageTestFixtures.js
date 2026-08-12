// Fixture bersama untuk test keenam Halaman Program. Bentuknya meniru Sumber
// Data seadanya (bukan menyalin isinya) supaya test tidak ikut gagal saat
// pengurus mengubah narasi atau nomor kontak yang sebenarnya.

export const NOW = new Date(2026, 7, 10, 10, 0);

const PROGRAM_KEYS = ['khitanan', 'dauroh', 'tawajjuh', 'konseling', 'baktiSosial', 'silaturahmi'];

/**
 * @param {Array} events Daftar event mentah yang ikut masuk Sumber Data.
 * @param {object} overrides Menimpa blok program atau kontak tertentu, mis.
 *   `{ khitanan: { title: 'Khitanan', narrative: '...', gallery: [...] } }`.
 */
export function baseRawData(events = [], overrides = {}) {
  const programs = Object.fromEntries(
    PROGRAM_KEYS.map(key => [key, { title: `Judul ${key}`, narrative: `Narasi ${key}.`, gallery: [] }]),
  );
  const contactPersons = Object.fromEntries(
    PROGRAM_KEYS.map((key, i) => [key, { name: `Kontak ${key}`, role: `Peran ${key}`, phone: `08100000000${i}` }]),
  );
  return {
    events,
    programs: [],
    news: [],
    contact: { maps: '', pengurus: [], ...contactPersons },
    ...programs,
    stats: [],
    gallery: [],
    donation: { qris: 'qris.jpg', bank: { name: 'BSI', account: '1', holder: 'X' }, campaign: { active: false, title: '', description: '' } },
    ...overrides,
  };
}
