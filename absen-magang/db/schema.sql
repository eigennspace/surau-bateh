-- Skema Absen Magang. Lihat absen/CONTEXT.md untuk istilah domain.
-- Semua id adalah teks (UUID digenerate di aplikasi, bukan lewat extension DB)
-- supaya sama persis di Postgres produksi maupun PGlite yang dipakai untuk test.

CREATE TABLE IF NOT EXISTS pengurus (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS peserta (
  id TEXT PRIMARY KEY,
  nama TEXT NOT NULL,
  asal_kampus TEXT NOT NULL,
  jurusan TEXT NOT NULL,
  nim TEXT NOT NULL,
  no_whatsapp TEXT NOT NULL,
  periode_mulai DATE NOT NULL,
  periode_selesai DATE NOT NULL,
  status_pendaftaran TEXT NOT NULL DEFAULT 'menunggu'
    CHECK (status_pendaftaran IN ('menunggu', 'disetujui', 'ditolak')),
  pin TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS kehadiran (
  id TEXT PRIMARY KEY,
  peserta_id TEXT NOT NULL REFERENCES peserta(id),
  tanggal DATE NOT NULL,
  jam_masuk TIMESTAMPTZ,
  jam_pulang TIMESTAMPTZ,
  catatan_aktivitas TEXT,
  status TEXT NOT NULL DEFAULT 'normal'
    CHECK (status IN ('normal', 'ditinjau', 'ditolak')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (peserta_id, tanggal)
);

-- Satu baris tunggal (id = 'default'): pengaturan global, bukan per-peserta/per-hari.
CREATE TABLE IF NOT EXISTS jendela_absen (
  id TEXT PRIMARY KEY DEFAULT 'default',
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  radius_meter DOUBLE PRECISION NOT NULL,
  jam_mulai TEXT NOT NULL,
  jam_selesai TEXT NOT NULL
);
