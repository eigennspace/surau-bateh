import React from 'react';

/**
 * Mengunci scroll `<body>` selama komponen pemanggil mounted -- dipakai
 * modal full-screen (`PhotoLightbox`, `VideoLightbox`) supaya halaman di
 * baliknya tidak ikut bisa di-scroll selagi modal terbuka.
 *
 * Di iOS Safari khususnya, overlay `position: fixed` (backdrop modal) bisa
 * salah posisi relatif terhadap area yang benar-benar terlihat kalau
 * halaman di baliknya masih scrollable saat overlay-nya baru disisipkan ke
 * DOM (viewport layout vs viewport visual belum sinkron) -- mengunci
 * scroll menghilangkan sumber ketidaksesuaian itu. Dipulihkan otomatis
 * saat modal ditutup/unmount.
 */
export function useLockBodyScroll() {
  React.useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);
}
