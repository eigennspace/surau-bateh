Kronologi tegak untuk silsilah guru surau atau tahapan pembangunan.

```jsx
<Timeline variant="roadmap" items={[
  { title: 'Tiang dan lantai bawah', period: 'Tahap 1', status: 'selesai', description: 'Tiang beton dan lantai surambi bawah.' },
  { title: 'Ruang wudhu', period: 'Tahap 3', status: 'berjalan' },
  { title: 'Renovasi atap', period: 'Tahap 4', status: 'rencana' },
]} />

<Timeline variant="silsilah" items={[
  { title: 'Tuanku Syekh …', role: 'Guru pertama', period: '…', description: '…' },
]} />
```

`roadmap`: hijau-teal = selesai, emas = berjalan, garis putus = rencana. `silsilah`: titik maroon bernomor, urut dari mata rantai tertua di atas. Jangan mengarang nama, tahun, atau urutan silsilah — kosongkan sampai pengurus memastikannya.

**Bercabang.** Setiap item boleh punya `branches` (boleh bersarang) untuk satu guru dengan beberapa murid, atau satu tahap dengan beberapa sub-pekerjaan. Cabang dirender lebih kecil dengan siku penyambung; batasi dua tingkat agar tetap terbaca.

```jsx
<Timeline variant="silsilah" items={[
  { title: 'Guru pertama', role: 'Mata rantai 1', branches: [
    { title: 'Murid A', role: 'Cabang Kuranji' },
    { title: 'Murid B', role: 'Cabang nagari sebelah' },
  ] },
]} />
```
