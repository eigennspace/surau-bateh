import { describe, it, expect } from 'vitest';
import { ARTICLES_BATCH_SIZE, nextVisibleCount, hasMoreArticles } from './articlesPaging.js';

describe('articlesPaging', () => {
  it('batch size default adalah 6', () => {
    expect(ARTICLES_BATCH_SIZE).toBe(6);
  });

  it('nextVisibleCount menambah hingga batch berikutnya, dibatasi total', () => {
    expect(nextVisibleCount(6, 14)).toBe(12);
    expect(nextVisibleCount(12, 14)).toBe(14);
    expect(nextVisibleCount(14, 14)).toBe(14);
  });

  it('hasMoreArticles: true selama masih ada artikel belum ditampilkan', () => {
    expect(hasMoreArticles(6, 14)).toBe(true);
    expect(hasMoreArticles(14, 14)).toBe(false);
    expect(hasMoreArticles(3, 3)).toBe(false);
  });

  it('artikel yang tersedia <= batch size sejak awal: tidak ada "lebih banyak"', () => {
    expect(hasMoreArticles(Math.min(6, 4), 4)).toBe(false);
  });
});
