import Image from 'next/image';

// Shell split-screen bersama untuk halaman gerbang (/login, /daftar, /absen).
// Panel kiri bermerek (foto + overlay gradien + logo + nama surau + subjudul)
// selalu sama di ketiga halaman kecuali `subjudul`; panel kanan menampung
// konten spesifik tiap halaman lewat `children`. Lihat spec di
// .scratch/absen-magang-gerbang-visual/spec.md dan ADR 0016 untuk konteks
// vendoring komponen yang dipakai di panel kanan.
export function GerbangShell({ subjudul = 'Pencatatan Kehadiran Magang', children }) {
  return (
    <div className="gerbang-shell">
      <aside className="gerbang-shell__panel-kiri">
        <div className="gerbang-shell__foto" aria-hidden="true">
          <Image src="/foto-surau.jpg" alt="" fill priority sizes="(max-width: 860px) 100vw, 45vw" style={{ objectFit: 'cover', objectPosition: 'center 58%' }} />
        </div>
        <div className="gerbang-shell__scrim" aria-hidden="true" />
        <div className="gerbang-shell__brand">
          <Image
            src="/logo-mark.png"
            alt=""
            width={36}
            height={48}
            className="gerbang-shell__logo"
            style={{ objectFit: 'contain' }}
          />
          <div>
            <div className="gerbang-shell__nama">Surau Bateh Lori</div>
            <div className="gerbang-shell__subjudul">{subjudul}</div>
          </div>
        </div>
      </aside>
      <main className="gerbang-shell__panel-kanan">
        <div className="gerbang-shell__konten">{children}</div>
      </main>
    </div>
  );
}
