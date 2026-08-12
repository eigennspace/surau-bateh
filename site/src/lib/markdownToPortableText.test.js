import { describe, it, expect } from 'vitest';
import { markdownToPortableText } from './markdownToPortableText.js';

describe('markdownToPortableText', () => {
  it('mengubah paragraf polos jadi satu blok teks', () => {
    const blocks = markdownToPortableText('Halo dunia.\n\nParagraf kedua.');
    expect(blocks).toHaveLength(2);
    expect(blocks[0]._type).toBe('block');
    expect(blocks[0].children.map(s => s.text).join('')).toBe('Halo dunia.');
    expect(blocks[1].children.map(s => s.text).join('')).toBe('Paragraf kedua.');
  });

  it('menangani **bold**, _italic_, dan [link](url) sebagai mark terpisah', () => {
    const [block] = markdownToPortableText('Teks **tebal** dan _miring_ serta [tautan](https://example.com).');
    const bold = block.children.find(s => s.text === 'tebal');
    const italic = block.children.find(s => s.text === 'miring');
    const link = block.children.find(s => s.text === 'tautan');
    expect(bold.marks).toEqual(['strong']);
    expect(italic.marks).toEqual(['em']);
    expect(block.markDefs).toHaveLength(1);
    expect(block.markDefs[0]).toMatchObject({ _type: 'link', href: 'https://example.com' });
    expect(link.marks).toEqual([block.markDefs[0]._key]);
  });

  it('mengembalikan baris gambar berdiri sendiri sebagai placeholder blok image', () => {
    const [block] = markdownToPortableText('![Jamaah bergotong royong](/articles/gotong-royong.jpg)');
    expect(block).toMatchObject({
      _type: 'image',
      src: '/articles/gotong-royong.jpg',
      alt: 'Jamaah bergotong royong',
    });
  });

  it('mengembalikan array kosong untuk badan kosong', () => {
    expect(markdownToPortableText('')).toEqual([]);
    expect(markdownToPortableText(undefined)).toEqual([]);
  });
});
