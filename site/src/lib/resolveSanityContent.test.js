import { describe, it, expect } from 'vitest';
import { objectPositionFromHotspot, resolveImage, resolveBody, resolveArticles, resolveGallery } from './resolveSanityContent.js';

// `urlFor` palsu -- meniru bentuk builder `@sanity/image-url` (method
// chaining `.auto()`/`.width()`/`.url()`) tanpa memanggil Sanity sungguhan.
function fakeUrlFor(source) {
  const params = {};
  const builder = {
    auto: () => builder,
    width: w => { params.width = w; return builder; },
    url: () => `https://cdn.example.test/${source.asset._ref}${params.width ? `?w=${params.width}` : ''}`,
  };
  return builder;
}

describe('objectPositionFromHotspot', () => {
  it('mengubah hotspot 0..1 jadi persentase CSS', () => {
    expect(objectPositionFromHotspot({ x: 0.5, y: 0.4 })).toBe('50% 40%');
  });

  it('undefined bila tidak ada hotspot', () => {
    expect(objectPositionFromHotspot(undefined)).toBeUndefined();
  });
});

describe('resolveImage', () => {
  it('null bila image tidak punya asset', () => {
    expect(resolveImage(fakeUrlFor, undefined)).toBeNull();
    expect(resolveImage(fakeUrlFor, {})).toBeNull();
  });

  it('menghasilkan url + position dari hotspot', () => {
    const result = resolveImage(fakeUrlFor, { asset: { _ref: 'img-1' }, hotspot: { x: 0.5, y: 0.35 } }, { width: 1200 });
    expect(result.url).toBe('https://cdn.example.test/img-1?w=1200');
    expect(result.position).toBe('50% 35%');
  });
});

describe('resolveBody', () => {
  it('menambahkan imageUrl ke blok image, blok lain diteruskan apa adanya', () => {
    const body = [
      { _type: 'block', _key: 'b1', children: [{ text: 'Halo' }] },
      { _type: 'image', _key: 'img1', asset: { _ref: 'img-2' } },
    ];
    const result = resolveBody(fakeUrlFor, body);
    expect(result[0]).toEqual(body[0]);
    expect(result[1].imageUrl).toBe('https://cdn.example.test/img-2?w=1200');
  });

  it('array kosong untuk body kosong/undefined', () => {
    expect(resolveBody(fakeUrlFor, undefined)).toEqual([]);
  });
});

describe('resolveArticles', () => {
  it('melewati dokumen tanpa slug, meresolve cover + body', () => {
    const docs = [
      { title: 'Tanpa slug', slug: undefined },
      {
        title: 'Judul', slug: 'judul', author: 'A', date: '2026-08-01', excerpt: 'x',
        cover: { asset: { _ref: 'cover-1' } },
        body: [{ _type: 'image', _key: 'i1', asset: { _ref: 'body-1' } }],
      },
    ];
    const result = resolveArticles(fakeUrlFor, docs);
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe('judul');
    expect(result[0].cover).toBe('https://cdn.example.test/cover-1?w=1200');
    expect(result[0].body[0].imageUrl).toBe('https://cdn.example.test/body-1?w=1200');
  });
});

describe('resolveGallery', () => {
  it('melewati dokumen tanpa asset image, memetakan wide -> span', () => {
    const docs = [
      { alt: 'Tanpa gambar', image: undefined },
      { alt: 'Foto', caption: 'Caption', meta: 'Meta', ratio: '16 / 9', wide: true, image: { asset: { _ref: 'g-1' } } },
    ];
    const result = resolveGallery(fakeUrlFor, docs);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ alt: 'Foto', caption: 'Caption', meta: 'Meta', ratio: '16 / 9', span: 2 });
    expect(result[0].src).toBe('https://cdn.example.test/g-1?w=1200');
  });

  it('span undefined bila wide falsy', () => {
    const [item] = resolveGallery(fakeUrlFor, [{ image: { asset: { _ref: 'g-2' } } }]);
    expect(item.span).toBeUndefined();
  });
});
