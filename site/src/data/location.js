// Koordinat lokasi Surau Bateh Lori, Kota Padang -- dipecah keluar dari
// `sourceData.js` (yang menarik import gambar lewat pipeline aset Vite) ke
// modul kecil ini, sehingga skrip build-time bisa mengimpornya
// langsung lewat Node biasa (build-time, di luar Vite) tanpa ikut menarik
// dependency React/aset. `sourceData.js` mengimpor dan meneruskan nilai yang
// sama sebagai `location`, jadi pengurus tetap hanya mengubah satu tempat.
export const LOCATION = { latitude: -0.8317255, longitude: 100.4060905 };
