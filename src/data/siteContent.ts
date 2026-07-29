/**
 * PUSAT PENGATURAN KONTEN WEBSITE
 * Ubah konten di file ini untuk mempersonalisasi website ulang tahun.
 */

export const siteContent = {
  // 1. INFORMASI UTAMA
  // Ganti detail di bawah ini sesuai kebutuhan
  recipient: {
    fullName: "Nazwa Muthmainah",
    nickname: "Nazwa",
    alternateNickname: "Sayang",
    birthYear: 2006 as number | null, // Masukkan tahun lahir jika ingin menampilkan umur (contoh: 2001), atau biarkan null untuk menyembunyikannya
  },
  sender: {
    name: "Fari",
  },

  // Tanggal target ulang tahun dengan format ISO dan timezone eksplisit WIB (+07:00)
  birthdayTarget: "2026-07-30T00:08:00+07:00",

  // 2. KONTEN OPENING GATE
  openingGate: {
    eyebrow: "30 Juli 2026",
    heading: "Ada sesuatu untukmu Sayang.",
    description:
      "Sebuah kejutan kecil dari seseorang yang selalu ingin melihatmu bahagia.",
    buttonText: "Buka Kejutannya",
    footerText: "Dari Fari, khusus untuk kamu, Sayangku Cintaku",
  },

  // 3. HERO SECTION
  hero: {
    label: "Untuk hari yang spesial",
    titlePrefix: "Selamat Ulang Tahun",
    recipientName: "Nazwa",
    subheading:
      "Untuk Nazwa Muthmainah, seseorang yang membuat banyak hal sederhana terasa lebih berarti.",
    signature: "— Fari",
  },

  // 4. COUNTDOWN SECTION
  countdown: {
    heading: "Menuju Hari Spesial Nazwa",
    subheading: "Setiap detik membawa kita semakin dekat ke 30 Juli 2026.",
    targetReachedText: "Hari ini adalah harimu Sayang!",
    scrollHintText: "Scroll ke bawah ya, Sayang!",
  },

  // 5. SURAT UTAMA UNTUK Nazwa
  mainLetter: {
    heading: "Surat untuk Nazwa",
    subheading:
      "Beberapa kata yang ingin aku sampaikan pada hari spesialmu Sayangku.",
    paragraphs: [
      "Selamat ulang tahun, Sayangku Cintaku yang cantik.",
      "Hari ini bukan sekadar tentang bertambahnya usia, tetapi juga tentang semua perjalanan yang sudah berhasil kamu lewati. Aku ingin kamu tahu bahwa kehadiranmu membawa banyak warna dalam hidup aku. Ada ciri khas dalam caramu berbicara, ada kehangatan dalam perhatianmu, dan ada banyak hal kecil darimu yang selalu berhasil membuatku tersenyum.",
      "Terima kasih karena sudah menjadi Nazwa yang aku kenal: seseorang yang tulus, kuat, dan tetap berusaha bahkan ketika keadaan tidak selalu mudah. Aku mungkin tidak selalu bisa menyampaikan semuanya dengan sempurna, tetapi aku benar-benar menghargai setiap cerita, tawa, perhatian, dan waktu yang kita bagikan.",
      "Di usia barumu, aku berharap kamu semakin dekat dengan semua hal yang kamu impikan. Semoga langkahmu selalu dimudahkan, kesehatanmu dijaga, hatimu dikuatkan, dan hari-harimu dipenuhi orang-orang yang menyayangimu dengan tulus.",
      "Tetaplah menjadi Nazwa yang aku kenal. Kamu tidak harus menjadi sempurna untuk menjadi seseorang yang sangat berarti.",
      "Selamat ulang tahun, Sayang. Semoga hari ini menjadi awal dari satu tahun yang lebih indah untukmu.",
      "Dengan penuh doa dan sayang,",
    ],
    signature: "Fari",
  },

  // 6. HAL-HAL YANG MEMBUAT Nazwa ISTIMEWA (CAROUSEL)
  reasons: {
    heading: "Hal-Hal yang Membuatmu Istimewa",
    subheading: "Hal-hal sederhana yang mungkin tidak selalu kamu sadari.",
    items: [
      {
        id: 1,
        title: "Caramu Peduli",
        text: "Perhatian kecil darimu sering kali terasa lebih besar daripada yang kamu bayangkan.",
      },
      {
        id: 2,
        title: "Senyummu",
        text: "Senyummu punya cara tersendiri untuk membuat suasana menjadi lebih hangat.",
      },
      {
        id: 3,
        title: "Kekuatanmu",
        text: "Kamu tetap berusaha berjalan, bahkan ketika semuanya tidak terasa mudah.",
      },
      {
        id: 4,
        title: "Ketulusanmu",
        text: "Kamu membuat orang merasa dihargai melalui hal-hal sederhana yang kamu lakukan.",
      },
      {
        id: 5,
        title: "Caramu Menjadi Diri Sendiri",
        text: "Ada sesuatu yang indah dari seseorang yang tidak takut menjadi dirinya sendiri.",
      },
      {
        id: 6,
        title: "Kehadiranmu",
        text: "Banyak momen biasa terasa lebih berarti karena ada kamu di dalamnya.",
      },
    ],
  },

  // 7. LAGU DARI FARI (AUDIO LOKAL)
  localSong: "/audio/lagu-dari-fari.mp3",
  localSongDetails: {
    heading: "Lagu dari Fari",
    subheading:
      "Tekan play ya Sayang, kalo kamu mau dengerin. Kalo sudah cukup, tekan lagi buat dimatiin.",
    title: "Lagu dari Fari",
    artist: "Untuk Nazwa",
    coverImage: "/images/song-cover.webp",
  },

  // 8. LAGU PILIHAN DARI YOUTUBE
  youtubeVideoId: "CVEPAN2eLYg", // Ganti dengan ID video YouTube (misalnya: "dQw4w9WgXcQ")
  youtubeSong: {
    heading: "Lagu yang Mengingatkanku Padamu",
    subheading:
      "Satu lagu yang terasa cocok untuk menemani perjalananan kita sejauh ini.",
    placeholderText:
      "Silakan masukkan ID Video YouTube Anda di `src/data/siteContent.ts` untuk menampilkan pemutar lagu YouTube interaktif di sini.",
  },

  // 9. GALERI KENANGAN (EDITORIAL GRID)
  // Sediakan minimal 9 item foto kenangan
  memories: {
    heading: "Potongan Kenangan Kita",
    subheading: "Lucu kan Sayang kenangan kita.",
    items: [
      {
        id: 1,
        image: "/images/memory-01.webp",
        date: "28 September 2024",
        title: "Rene Cafe",
        note: "Kenangan manis sehabis apa ya yang wkwkwk.",
        alt: "Kenangan Fari dan Nazwa 1",
      },
      {
        id: 2,
        image: "/images/memory-02.webp",
        date: "10 Oktober 2024",
        title: "Warunk WOW KWB Jakarta Selatan",
        note: "Kamu masih inget yang?",
        alt: "Kenangan Fari dan Nazwa 2",
      },
      {
        id: 3,
        image: "/images/memory-03.webp",
        date: "21 Desember 2024",
        title: "Nonton Bioskop",
        note: "Tebak ini dimana yang.",
        alt: "Kenangan Fari dan Nazwa 3",
      },
      {
        id: 4,
        image: "/images/memory-04.webp",
        date: "26 Desember 2025",
        title: "Ikut Aku Kerja",
        note: "Makasi ya Sayang udah nemenin aku terus.",
        alt: "Kenangan Fari dan Nazwa 4",
      },
      {
        id: 5,
        image: "/images/memory-05.webp",
        date: "14 Februari 2025",
        title: "Red Soldadu Riverside",
        note: "Ini aku nemenin kamu ngurus berkas apa hayo yang.",
        alt: "Kenangan Fari dan Nazwa 5",
      },
      {
        id: 6,
        image: "/images/memory-06.webp",
        date: "4 Juni 2025",
        title: "Cake Anniv Tahun Pertama",
        note: "Walau saat kita mau ambil kuenya banyak drama yang terjadi, pada akhirnya kamu tetep happy kan Sayang.",
        alt: "Kenangan Fari dan Nazwa 6",
      },
      {
        id: 7,
        image: "/images/memory-07.webp",
        date: "4 Juni 2025",
        title: "Cake Anniv Tahun Pertama",
        note: "Foto lanjutan dari yang sebelumnya.",
        alt: "Kenangan Fari dan Nazwa 7",
      },
      {
        id: 8,
        image: "/images/memory-08.webp",
        date: "6 Agustus 2025",
        title: "Hayo Dimana Ini",
        note: "Tebak ini dimana yang.",
        alt: "Kenangan Fari dan Nazwa 8",
      },
      {
        id: 9,
        image: "/images/memory-09.webp",
        date: "19 Agustus 2025",
        title: "Last Date Kita",
        note: "Kamu pasti kangen banget sama aku kan Sayang, semoga kita bisa ketemu lagi ya Sayang.",
        alt: "Kenangan Fari dan Nazwa 9",
      },
    ],
  },

  // 10. KARTU "BUKA SAAT..."
  openWhen: {
    heading: "Buka Saat Kamu Membutuhkan Kata-Kata Ini",
    cards: [
      {
        id: "lelah",
        title: "Lelah",
        trigger: "Buka saat kamu merasa lelah",
        message:
          "Beristirahat bukan berarti menyerah. Kamu sudah berjalan sejauh ini, dan kamu berhak memberi dirimu waktu untuk bernapas.",
      },
      {
        id: "sedih",
        title: "Sedih",
        trigger: "Buka saat kamu merasa sedih",
        message:
          "Tidak apa-apa kalau hari ini terasa berat. Kamu tidak harus selalu terlihat kuat. Jalani perlahan, satu langkah kecil pada satu waktu.",
      },
      {
        id: "ragu",
        title: "Ragu",
        trigger: "Buka saat kamu meragukan dirimu",
        message:
          "Jangan biarkan satu hari yang sulit membuatmu lupa pada semua hal yang sudah berhasil kamu lewati.",
      },
      {
        id: "rindu",
        title: "Rindu",
        trigger: "Buka saat kamu merindukanku",
        message:
          "Kalau kamu sedang merindukanku, ingat bahwa ada seseorang bernama Fari yang juga sedang memikirkan Nazwa.",
      },
      {
        id: "semangat",
        title: "Semangat",
        trigger: "Buka saat kamu membutuhkan semangat",
        message:
          "Aku percaya kamu mampu melewati apa pun yang sedang kamu hadapi. Lakukan yang terbaik tanpa harus memaksa dirimu menjadi sempurna.",
      },
      {
        id: "tersenyum",
        title: "Tersenyum",
        trigger: "Buka saat kamu ingin tersenyum",
        message:
          "Senyum dulu, Nazwa. Kamu terlihat lebih manis ketika sedang bahagia.",
      },
    ],
  },

  // 11. HARAPAN FARI UNTUK Nazwa
  wishes: {
    heading: "Harapan Fari untuk Nazwa",
    textParagraphs: [
      "Semoga di tahun yang baru ini, Nazwa diberikan lebih banyak alasan untuk tersenyum, lebih banyak kesempatan untuk berkembang, dan lebih banyak keberanian untuk mengejar hal-hal yang benar-benar diinginkan.",
      "Semoga setiap langkahmu dipertemukan dengan jalan yang baik. Semoga hal-hal yang belum tercapai perlahan menemukan waktunya. Semoga kamu tetap dikelilingi oleh orang-orang yang menghargai dan menyayangimu dengan tulus.",
      "Dan semoga, ketika suatu hari kamu melihat kembali halaman ini, kamu masih bisa mengingat bahwa pada hari ulang tahunmu, ada Fari yang dengan tulus mendoakan kebahagiaanmu.",
    ],
  },

  // 12. KUE ULANG TAHUN INTERAKTIF
  cake: {
    heading: "Make a Wish",
    instruction:
      "Tekan lilinnya ya Sayang untuk membuat permohonan dan doa yang kamu harapkan.",
    wishesGrantedText: "Semoga semua doa baikmu perlahan menjadi nyata.",
    buttonText: "Lihat Pesan Terakhir",
  },

  // 13. PESAN TERAKHIR (FINAL BIRTHDAY MESSAGE)
  finalMessage: {
    heading: "Selamat Ulang Tahun, Nazwa.",
    paragraphs: [
      "Semoga 30 Juli ini menjadi awal dari banyak cerita baik, langkah baru, dan kebahagiaan yang selama ini kamu tunggu.",
      "Terima kasih sudah hadir dan menjadi bagian penting dalam hidupku.",
      "Hari ini adalah tentangmu. Jadi tersenyum lah, nikmati harimu, dan jangan lupa bahwa kamu sangat berarti.",
    ],
    closing: "Dengan sayang,",
    senderName: "Fari",
    replayButtonText: "Putar Ulang Kejutan",
    backToTopButtonText: "Kembali ke Atas",
  },
};
