# 01 — Vendor komponen design system + Shell + Login

**What to build:** Salin lima komponen React (`Button`, `Card`, `Input`, `Badge`, `Icon`) dari `New Surau Bateh Lori Design System/components/core/` dan `components/forms/` ke `absen-magang/components/ds/` (lihat [ADR 0016](../../../docs/adr/0016-absen-magang-vendor-komponen-design-system.md) — vendor manual, bukan skrip sync, bukan impor lintas folder). Bangun satu komponen shell split-screen bersama (dipakai juga oleh ticket 02 dan 03): panel kiri bermerek dengan `assets/foto-surau.jpg` + overlay gradien gelap sesuai `guidelines/brand-imagery.html`, logo, nama "Surau Bateh Lori", satu baris subjudul kecil, dan gerak pan/zoom lambat (Ken Burns) yang dimatikan total di bawah `prefers-reduced-motion: reduce`; di layar sempit panel kiri runtuh jadi header ringkas dan panel kanan jadi satu kolom penuh. Pasang shell ini secara nyata di `/login`, membangun ulang form login (username, password, tombol Masuk) memakai `Input`/`Button`/`Card` yang baru divendor, tetap memakai `state`/`useActionState`/`actions.js` yang sudah ada tanpa perubahan logika. Ganti `app/page.jsx` menjadi redirect server-side ke `/login` (halaman pilih-peran lama dihapus). Lihat spec lengkap di [spec.md](../spec.md).

**Blocked by:** None — bisa mulai langsung

**Status:** done

- [x] `absen-magang/components/ds/` berisi `Button.jsx`, `Card.jsx`, `Input.jsx`, `Badge.jsx`, `Icon.jsx` hasil vendor, tanpa berkas authoring (`*.prompt.md`, `*.d.ts`, `*.card.html`)
- [x] Membuka `/` (root) redirect ke `/login`, bukan menampilkan halaman pilih-peran lama
- [x] `/login` menampilkan shell split-screen: panel kiri (foto+overlay+logo+nama surau+subjudul) di layar lebar, panel kanan berisi form login memakai komponen `Input`/`Button`/`Card`
- [x] Login dengan kredensial benar tetap masuk ke dashboard; kredensial salah tetap menampilkan pesan error — perilaku identik dengan sebelum redesign
- [x] Di viewport sempit (≈375px), `/login` runtuh jadi satu kolom penuh, panel kiri jadi header ringkas, tanpa elemen terpotong atau scroll horizontal
- [x] Foto latar panel kiri bergerak pan/zoom pelan; dengan `prefers-reduced-motion: reduce` aktif, gerak tsb (dan fade-in halaman) mati total
- [x] `/dashboard/*` tidak berubah tampilannya sama sekali dibanding sebelum ticket ini (kelas CSS lama di `globals.css` tidak dihapus/diubah)
- [x] `next build` produksi sukses tanpa error
