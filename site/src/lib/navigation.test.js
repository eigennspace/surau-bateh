import { describe, it, expect } from 'vitest';
import { GROUPS, PROFIL, ALL_GROUPS, NAV, BB_ITEMS, PAGE_SLUGS, LEGACY_SLUGS, pathForPage, routeFromPath } from './navigation.js';

// Aturan "tiap anak punya slug, grup sendiri tidak" berlaku untuk SEMUA grup,
// termasuk Profil yang sengaja di luar `GROUPS` (ADR 0008) -- karena itu di
// sini yang dibaca `ALL_GROUPS`, bukan `GROUPS`.
const groupLabels = Object.keys(ALL_GROUPS);
const allChildren = Object.values(ALL_GROUPS).flat();
const labelOf = it => (typeof it === 'string' ? it : it.label);
const parentsOf = items => items.filter(it => typeof it === 'object');

describe('struktur grup', () => {
  it('setiap anak grup punya slug sendiri, jadi bisa dijangkau lewat URL', () => {
    for (const child of allChildren) {
      expect(PAGE_SLUGS, `"${child}" tidak punya slug`).toHaveProperty(child);
    }
  });

  it('grup itu sendiri tidak punya halaman/URL — hanya pemicu dropdown/popover', () => {
    for (const label of groupLabels) {
      expect(PAGE_SLUGS).not.toHaveProperty(label);
    }
  });

  it('tidak ada halaman yang muncul di lebih dari satu grup', () => {
    expect(new Set(allChildren).size).toBe(allChildren.length);
  });
});

describe('konsistensi antar permukaan navigasi', () => {
  // Grup Halaman Program wajib identik di kedua permukaan. Grup Profil TIDAK
  // ikut aturan ini: ia sengaja hadir di navbar saja, bottom bar tetap lima
  // tab (ADR 0008) -- itulah sebabnya ia tidak jadi anggota `GROUPS`, supaya
  // assertion `toEqual` di bawah tetap ketat dan bukan sekadar "subset".
  it('navbar desktop dan bottom bar memakai grup Halaman Program yang sama persis', () => {
    const navGroups = Object.fromEntries(parentsOf(NAV).map(it => [it.label, it.children]));
    const bbGroups = Object.fromEntries(parentsOf(BB_ITEMS).map(it => [it.label, it.children]));
    expect(navGroups).toEqual(ALL_GROUPS);
    expect(bbGroups).toEqual(GROUPS);
  });

  it('grup Profil ada di navbar tapi tidak di bottom bar', () => {
    expect(NAV.filter(it => typeof it === 'object').map(it => it.label)).toContain('Profil');
    expect(BB_ITEMS.map(labelOf)).not.toContain('Profil');
    expect(PROFIL.Profil).toEqual(['Profil Surau', 'Profil Salik']);
  });

  it('bottom bar berisi lima tab dan setiap tab punya ikon', () => {
    expect(BB_ITEMS).toHaveLength(5);
    for (const item of BB_ITEMS) expect(item.icon).toBeTruthy();
  });

  // Bottom bar tidak punya tab Infak dan navbar tidak lagi punya tombol CTA
  // "Salurkan Infak" (dicabut di desktop maupun mobile), sehingga entri teks
  // ini adalah satu-satunya jalur menuju halaman Infak. Test ini yang menahan
  // agar tidak ikut terhapus.
  it('Infak punya entri teks di navbar — satu-satunya jalur ke halaman itu', () => {
    expect(NAV.map(labelOf)).toContain('Infak');
    expect(BB_ITEMS.map(labelOf)).not.toContain('Infak');
  });

  it('setiap halaman ber-slug bisa dijangkau dari navbar atau dari sebuah grup', () => {
    const reachable = new Set([...NAV.map(labelOf), ...allChildren]);
    for (const page of Object.keys(PAGE_SLUGS)) {
      if (page === 'Beranda') continue;
      expect(reachable, `"${page}" tidak punya jalur navigasi`).toContain(page);
    }
  });

  // Setiap halaman cukup punya satu jalur. "Jadwal Kegiatan" sempat juga jadi
  // entri navbar tersendiri; dicabut karena berdampingan dengan grup Kegiatan
  // yang sudah memuatnya sebagai anak pertama.
  it('tidak ada halaman yang punya entri navbar sendiri sekaligus jadi anak grup', () => {
    for (const label of NAV.map(labelOf)) {
      expect(allChildren, `"${label}" muncul dua kali di navbar`).not.toContain(label);
    }
  });
});

describe('pathForPage / routeFromPath', () => {
  it('setiap halaman ber-slug pulang-pergi ke halaman yang sama', () => {
    for (const page of Object.keys(PAGE_SLUGS)) {
      expect(routeFromPath(pathForPage(page)).page, `gagal pulang-pergi untuk "${page}"`).toBe(page);
    }
  });

  it('menghormati base path saat situs disajikan di subpath', () => {
    expect(pathForPage('Khitanan', undefined, '/situs')).toBe('/situs/khitanan');
    expect(routeFromPath('/situs/khitanan', '/situs').page).toBe('Khitanan');
  });

  it('Beranda dipetakan ke root, bukan ke slug kosong yang menggantung', () => {
    expect(pathForPage('Beranda')).toBe('/');
    expect(routeFromPath('/').page).toBe('Beranda');
  });

  it('path tak dikenal jatuh ke Beranda', () => {
    expect(routeFromPath('/entah-apa').page).toBe('Beranda');
  });

  it('artikel detail memakai path dinamis, bukan peta slug tetap', () => {
    expect(pathForPage('ArtikelDetail', 'judul-artikel')).toBe('/artikel/judul-artikel');
    expect(routeFromPath('/artikel/judul-artikel')).toMatchObject({ page: 'ArtikelDetail', articleSlug: 'judul-artikel' });
    expect(routeFromPath('/artikel').page).toBe('Artikel');
  });
});

describe('slug lama', () => {
  it('/kajian sampai di Jadwal Kegiatan dan minta URL-nya dikanonikkan', () => {
    expect(routeFromPath('/kajian')).toMatchObject({ page: 'Jadwal Kegiatan', canonicalize: true });
  });

  it('/profil sampai di Profil Surau — halaman Profil lama kini punya dua saudara', () => {
    expect(routeFromPath('/profil')).toMatchObject({ page: 'Profil Surau', canonicalize: true });
    expect(routeFromPath('/profil-surau').canonicalize).toBeUndefined();
  });

  it('slug kanonik tidak minta dikanonikkan lagi, supaya tidak ada replaceState berulang', () => {
    expect(routeFromPath('/jadwal-kegiatan').canonicalize).toBeUndefined();
  });

  it('setiap slug lama menunjuk ke halaman yang benar-benar ada', () => {
    for (const page of Object.values(LEGACY_SLUGS)) {
      expect(PAGE_SLUGS).toHaveProperty(page);
    }
  });
});
