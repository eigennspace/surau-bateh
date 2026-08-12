# 01 — Setup akun & project Sanity

**What to build:** Bukan kode — ini prasyarat manual yang harus dijalankan langsung oleh maintainer situs (bukan sesuatu yang bisa dikerjakan agent, karena butuh akun pribadi/pembayaran/undangan email sungguhan). Ditulis sebagai langkah-langkah yang bisa diikuti satu per satu.

**Blocked by:** None — bisa mulai kapan saja.

**Status:** done

## Langkah-langkah

- [x] **Daftar akun Sanity** — buka sanity.io, daftar (bisa pakai login Google/GitHub), tidak perlu kartu kredit untuk free tier.
- [x] **Buat Organization** — dari dashboard manage.sanity.io, buat satu organization untuk Surau Bateh Lori (jadi wadah project + nanti tempat mengundang anggota).
- [x] **Jalankan `sanity init`** — project "Surau Bateh" (`w5hrk5sv`), dataset `production`, Studio (TypeScript) di-scaffold di `studio/` root repo, `sanity.config.ts` terverifikasi menunjuk ke project/dataset yang benar.
- [x] **Undang pengurus** — dari manage.sanity.io → project → Members, diundang dengan role **Editor**.
- [x] **Buat API token untuk build** — role **Viewer**, dipakai di tiket 03.
- [x] **Buat Personal Access Token GitHub** — scope `repo`, dipakai untuk webhook Sanity memicu rebuild (tiket 03).
- [x] **Tambahkan 3 GitHub Actions secrets** — `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_TOKEN` ditambahkan di Settings repo.
- [x] **Informasikan ke agent** — Project ID `w5hrk5sv` dan konfirmasi secrets sudah diterima.

## Comments

- `sanity init` awalnya membuat folder nested `studio/studio/` (karena dijalankan dari dalam folder `studio/` dengan flag `--output-path studio`) — sudah di-flatten jadi `studio/` langsung berisi project-nya.
