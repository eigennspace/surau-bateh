# Context Map

## Contexts

- [Situs Publik](./CONTEXT.md) — situs publik surau: beranda, agenda kegiatan, halaman program, profil, infak, kontak; statis, dibangun dari Sanity saat build-time
- [Absen PL](./absen/CONTEXT.md) — pencatatan kehadiran mahasiswi/intern yang PL di surau; aplikasi terpisah, data operasional bukan editorial

## Relationships

- **Situs Publik ↔ Absen PL**: tidak ada relasi data antara keduanya — dua aplikasi dan dua penyimpanan data yang sepenuhnya terpisah (lihat [ADR 0015](docs/adr/0015-absen-magang-penyimpanan-data-terpisah-dari-sanity.md)). Absen PL hanya meminjam token desain visual dari `New Surau Bateh Lori Design System/`, bukan konten atau infrastruktur Sanity dari Situs Publik.
