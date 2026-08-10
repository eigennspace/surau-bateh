Jadwal salat harian; tampilkan di bagian atas beranda dan di layar TV surau.

```jsx
<PrayerTimeTable times={[{name:'Subuh',adzan:'04:58',iqamah:'05:10'}]} activeName="Ashar" nextName="Maghrib" />
```

Selalu sertakan tanggal Hijriah di bawah tanggal Masehi, dan lokasi (Kota Padang) di kanan kepala kartu.

Gunakan `variant="glass"` hanya bila kartu berada di atas foto (mis. hero beranda): latar pasir 14% + blur, teks pasir, hijriah emas. Di atas latar polos tetap `solid`.
