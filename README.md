# Website Ulang Tahun Romantis Nazwa Muthmainah (Jua) 🌸

Website ini adalah hadiah ulang tahun satu halaman (single-page) yang romantis, elegan, modern, dan sepenuhnya responsif untuk Nazwa Muthmainah (Jua) dari Fari. Project ini dibangun dengan React, Vite, TypeScript, dan Motion untuk animasi yang mulus.

---

## 🚀 Fitur Utama

1. **Opening Gate**: Overlay pembuka interaktif dengan efek confetti ganda dan pemutar audio otomatis.
2. **Hero Section**: Foto potret dalam bingkai oval asimetris dengan mask reveal nama Jua dan sparkle visual.
3. **Countdown Timer**: Waktu mundur presisi WIB (+07:00) dengan kembang api/confetti saat mencapai tengah malam.
4. **Surat Cinta**: Desain kertas surat cream klasik dengan tekstur linen yang realistis dan reveal animasi lipat 3D.
5. **Alasan Jua Istimewa**: Carousel kartu interaktif yang mendukung navigasi swipe/drag di mobile dan tombol navigasi.
6. **Lagu dari Fari**: Custom music player dengan CD berputar, timeline scrubbing, volume slider, dan CSS waveform.
7. **Lagu YouTube Pilihan**: Player embed YouTube privasi tinggi yang otomatis menjeda lagu lokal ketika diputar.
8. **Galeri Kenangan**: Grid foto polaroid asimetris editorial dengan hover tilt effect dan Lightbox keyboard-accessible.
9. **Kartu "Buka Saat..."**: 6 amplop surat interaktif yang menampilkan popup penyemangat berdasarkan suasana hati.
10. **Interactive Birthday Cake**: Kue ulang tahun CSS interaktif di mana lilin-lilin dapat ditiup (diklik) satu per satu.
11. **Final Section**: Ucapan akhir dengan tombol reset kejutan instan (putar ulang) tanpa reload halaman.
12. **Custom Heart Cursor**: Cursor berbentuk outline hati dengan trail partikel yang mengikuti gerakan mouse (hanya aktif di desktop).

---

## 🛠️ Cara Memulai & Instalasi

### Prasyarat
Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) di komputer Anda.

### 1. Instalasi Dependensi
Buka terminal/command prompt pada direktori project ini, lalu jalankan:
```bash
npm install
```

### 2. Menjalankan Server Development
Untuk melihat website berjalan di browser lokal Anda:
```bash
npm run dev
```
Buka URL `http://localhost:5173` di browser Anda.

### 3. Build untuk Produksi
Untuk mengompilasi dan mengoptimalkan website menjadi file statis siap deploy:
```bash
npm run build
```
Hasil build akan berada di folder `dist`.

---

## ✍️ Cara Personalisasi & Kustomisasi Konten

Semua teks personal disimpan terpusat di satu file: **`src/data/siteContent.ts`**. Anda tidak perlu menyunting komponen kode satu per satu.

### 1. Mengubah Nama & Tanggal
Buka `src/data/siteContent.ts` dan ubah bagian teratas:
```typescript
recipient: {
  fullName: "Nazwa Muthmainah",
  nickname: "Jua",
  alternateNickname: "Sayang",
  birthYear: null as number | null, // Ganti null menjadi angka (misal: 2001) untuk menghitung umur otomatis
},
sender: {
  name: "Fari",
},
// Tanggal target (Format ISO 8601 dengan offset WIB +07:00)
birthdayTarget: "2026-07-30T00:00:00+07:00",
```

### 2. Mengubah Pesan Surat, Alasan, & Kartu Doa
Seluruh isi teks paragraf surat utama, carousel 6 kartu alasan, dan kartu "Buka Saat..." dapat disunting langsung di file `siteContent.ts` pada objek yang bersangkutan (`mainLetter`, `reasons`, `openWhen`, dll.).

### 3. Mengganti Musik Lokal (Lagu dari Fari)
1. Siapkan file musik Anda dalam format `.mp3`.
2. Ganti nama file tersebut menjadi `lagu-dari-fari.mp3`.
3. Masukkan file tersebut ke folder **`public/audio/`** (timpa file placeholder yang sudah ada).
4. Jika ingin mengubah judul dan artis lagu yang tampil di player, edit bagian `localSongDetails` di `siteContent.ts`.

### 4. Mengganti Foto & Gambar Kenangan
Seluruh aset gambar disimpan di folder **`public/images/`**.
- **Foto Potret Hero**: Siapkan foto portrait Jua, ganti nama menjadi `portrait.webp`, simpan di `public/images/`.
- **Foto Background Hero**: Siapkan foto estetik, ganti nama menjadi `hero.webp`, simpan di `public/images/`.
- **Cover Lagu**: Siapkan gambar cover album, ganti nama menjadi `song-cover.webp`, simpan di `public/images/`.
- **Foto Galeri (9 Momen)**: Siapkan 9 foto kenangan, ganti nama menjadi `memory-01.webp` hingga `memory-09.webp`, simpan di `public/images/`.
- **Format Gambar**: Sangat direkomendasikan menggunakan format `.webp` untuk performa loading yang sangat cepat. Anda bisa mengubah nama file `.jpg`/`.png` menjadi `.webp` atau mengonversinya secara online.

### 5. Mengganti Video YouTube Pilihan
1. Buka video pilihan Anda di YouTube.
2. Ambil **Video ID** dari URL video (11 karakter setelah `v=`, contoh: jika URL-nya `https://www.youtube.com/watch?v=dQw4w9WgXcQ`, maka ID-nya adalah `dQw4w9WgXcQ`).
3. Buka `src/data/siteContent.ts` dan ubah nilai `youtubeVideoId`:
   ```typescript
   youtubeVideoId: "dQw4w9WgXcQ", // Ganti dengan ID video Anda
   ```

### 6. Mengganti Warna Tema (Tokens)
Anda bisa memodifikasi warna gradien, background, dan aksen pink dengan mengedit variabel CSS di file **`src/styles/tokens.css`**:
```css
:root {
  --color-background: #100810;     /* Dark Plum */
  --color-primary: #ff7eb6;        /* Pink Romantis */
  --color-rose-gold: #d9a0ae;      /* Rose Gold */
  --color-cream: #fff7fa;          /* Cream hangat untuk kertas surat */
  /* ... variabel lainnya */
}
```

### 7. Mengganti Favicon (Icon Tab Browser)
Favicon default berbentuk hati pink. Jika ingin menggantinya, edit file **`public/favicon.svg`** dengan file SVG kustom Anda.

---

## 🌐 Cara Deploy ke Vercel (Gratis)

Website ini dirancang sebagai static frontend dan dapat dideploy ke Vercel secara gratis dalam beberapa langkah mudah:

### Langkah 1: Push Project ke GitHub Anda
1. Buat repository baru di akun GitHub Anda (misal beri nama `ultah-jua`).
2. Jalankan perintah berikut di folder project lokal Anda untuk melakukan inisialisasi Git dan melakukan commit:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Hubungkan ke repository GitHub Anda dan push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/USERNAME-ANDA/NAMA-REPO-ANDA.git
   git push -u origin main
   ```

### Langkah 2: Deploy di Vercel
1. Masuk ke dashboard [Vercel](https://vercel.com/) (buat akun jika belum punya, gunakan login GitHub).
2. Klik tombol **"Add New"** > **"Project"**.
3. Hubungkan akun GitHub Anda dan pilih repository yang baru saja di-push (`ultah-jua`).
4. Pada konfigurasi project, biarkan pengaturan default:
   - **Framework Preset**: `Vite` (Vercel akan mendeteksinya secara otomatis)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Klik **"Deploy"**. Website akan siap diakses dalam waktu kurang dari 1 menit!

> [!WARNING]
> **PEMBERITAHUAN PRIVASI**:
> Kami telah menyertakan meta tag `noindex, nofollow` di dalam `index.html` untuk memberi tahu mesin pencari (seperti Google) agar tidak mengindeks website ini di hasil pencarian publik. Namun, **harap dicatat bahwa URL Vercel Anda tetap dapat diakses oleh siapa saja yang mengetahui tautan tersebut**. Jaga kerahasiaan URL ini dan bagikan hanya kepada Jua.

---

## 🔊 Catatan Autoplay Audio Browser

Browser modern (Chrome, Safari, Edge) memiliki kebijakan keamanan ketat yang **memblokir pemutaran musik otomatis (autoplay)** sebelum pengguna berinteraksi dengan halaman.

**Bagaimana website ini menyelesaikannya secara elegan?**
1. Musik tidak diputar saat halaman pertama dibuka, melainkan setelah pengguna mengklik tombol **"Buka Kejutannya"** di Opening Gate. Klik ini dianggap sebagai interaksi sah oleh browser sehingga musik lokal diizinkan berputar.
2. Jika ada pembatasan khusus pada perangkat penerima yang memblokir audio, kode website menggunakan penanganan `try/catch` sehingga website **tidak akan crash/error**, melainkan tetap terbuka lancar dan menampilkan kontrol musik mengambang (floating player) di pojok kanan bawah agar penerima dapat menyalakan musik secara manual dengan nyaman.
