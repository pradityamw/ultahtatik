import type { BirthdayConfig } from '../types';

/**
 * Centralized Configuration for "The Little Birthday Adventure"
 * All details can be personalized below.
 */
export const birthdayConfig: BirthdayConfig = {
  // Recipient details
  girlfriendName: 'Tatik', // Placeholder: Ganti dengan nama panggilan tersayang
  myName: 'Sayang', // Placeholder: Ganti dengan panggilanmu
  birthdayDate: '12 November 2026', // Tanggal ulang tahun spesial

  // Security barrier (convenience lock screen).
  // If set to "0000" or empty "", it can be auto-bypassed or unlocked easily.
  pin: '0000',

  // Personal welcome greeting message
  greetingText:
    'Selamat ulang tahun untuk perempuan paling istimewa dalam hidupku. Terima kasih sudah lahir dan membawa begitu banyak kehangatan serta kebahagiaan. Hari ini, mari kita mulai petualangan kecil penuh cinta ini bersama-sama!',

  // Love letter content (multi-paragraph)
  letterParagraphs: [
    'Untuk Tatik, perempuan yang selalu berhasil membuat hariku jauh lebih bermakna...',
    'Selamat bertambah usia, sayangku. Di hari yang begitu indah ini, aku hanya ingin berhenti sejenak dan mengungkapkan betapa bersyukurnya aku memiliki kamu di sisiku. Melihat senyummu adalah obat lelah terbaik, dan mendengar tawamu adalah melodi paling menenangkan yang pernah kudengar.',
    'Terima kasih telah menjadi teman berbagi cerita, teman tertawa, dan pelabuhan paling nyaman saat dunia terasa bising. Bersamamu, hal-hal sederhana berubah menjadi kenangan yang tak ternilai harganya. Setiap detik perjalanan yang kita lewati berdua adalah bab terbaik dalam hidupku.',
    'Di usiamu yang baru ini, doaku selalu menyertaimu. Semoga kamu selalu dilimpahi kesehatan, kebahagiaan yang meluap, ketenangan hati, dan tercapainya setiap mimpi serta cita-cita yang kamu simpan dalam doa-doamu.',
    'Aku berjanji akan terus menggenggam tanganmu, merayakan setiap keberhasilanmu, dan menemanimu di setiap langkah kehidupan. Selamat ulang tahun, bidadariku tercinta. Aku menyayangimu hari ini, esok, dan selamanya.',
  ],

  // Scrapbook photos (Paths are in /public/photos/)
  photos: [
    {
      id: 1,
      src: '/photos/photo1.jpg',
      caption: 'Awal kisah manis kita 💕',
      date: '',
      rotation: -4,
    },
    {
      id: 2,
      src: '/photos/photo2.jpg',
      caption: 'Senyum tercantik di dunia ✨',
      date: '',
      rotation: 3,
    },
    {
      id: 3,
      src: '/photos/photo3.jpg',
      caption: 'Jalan-jalan sore berdua 🌿',
      date: '',
      rotation: -5,
    },
    {
      id: 4,
      src: '/photos/photo4.jpg',
      caption: 'Menikmati langit senja 🌅',
      date: '',
      rotation: 5,
    },
    {
      id: 5,
      src: '/photos/photo5.jpg',
      caption: 'Ketawa lepas bareng kamu 😂',
      date: '',
      rotation: -3,
    },
    {
      id: 6,
      src: '/photos/photo6.jpg',
      caption: 'Menatap masa depan berdua 💍',
      date: '',
      rotation: 2,
    },
  ],

  // Relationship timeline milestones
  timeline: [
    {
      year: '2021',
      title: 'Pertama Kali Bertemu ✨',
      description:
        'Hari di mana pandangan kita pertama kali bertemu. Siapa sangka sosok ramah dan ceria itu akan menjadi pemilik seluruh hatiku.',
      emoji: '🌸',
    },
    {
      year: '2022',
      title: 'Hari Resmi Bersama 💖',
      description:
        'Dua hati yang saling menyayangi memutuskan untuk melangkah bersama, memulai komitmen terindah dalam hidup.',
      emoji: '💌',
    },
    {
      year: '2023',
      title: 'Petualangan & Liburan Pertama ✈️',
      description:
        'Mengeksplorasi tempat-tempat baru berdua, mencicipi kuliner favorit, dan menciptakan tawa tak berujung di setiap sudut perjalanan.',
      emoji: '🎒',
    },
    {
      year: '2024',
      title: 'Melewati Ujian Bersama 🌈',
      description:
        'Cinta kita bukan hanya saat senang, tapi juga saat saling menguatkan di tengah badai. Hubungan kita menjadi jauh lebih erat dan dewasa.',
      emoji: '🛡️',
    },
    {
      year: '2025',
      title: 'Mimpi & Rencana Masa Depan 🏡',
      description:
        'Mulai merajut cita-cita besar bersama, membicarakan rumah impian, dan terus saling mendukung karier dan impian masing-masing.',
      emoji: '⭐',
    },
    {
      year: '2026',
      title: 'Ulang Tahun Terindah Hari Ini 🎂',
      description:
        'Merayakan hari kelahiran bidadariku yang ke sekian kalinya. Semoga cinta kita semakin berbunga dan abadi selamanya.',
      emoji: '🎉',
    },
  ],

  // Love Quiz Questions (5 questions with 4 choices)
  quizQuestions: [
    {
      id: 1,
      question: 'Di mana tempat kencan pertama kita yang paling berkesan?',
      options: [
        'Bak mi akiu',
        'Bioskop sambil nonton film seru',
        'Taman kota sore hari',
        'Restoran seafood pinggir pantai',
      ],
      correctIndex: 0,
      explanation: 'Tempat kafe kecil di mana kita ngobrol berjam-jam tanpa terasa!',
    },
    {
      id: 2,
      question: 'Apa camilan atau minuman yang paling ampuh balikin mood Tatik?',
      options: [
        'Boba brown sugar extra manis',
        'Es matcha',
        'Jajan rechesee',
        'Kopi susu gula aren favorit',
      ],
      correctIndex: 1,
      explanation: 'Matcha dan pastry hangat selalu berhasil bikin senyummu balik lagi!',
    },
    {
      id: 3,
      question: 'Hal apa yang paling bikin aku selalu jatuh cinta padamu setiap hari?',
      options: [
        'Tatap matamu yang tulus & lembut',
        'Tawamu yang manis dan menular',
        'Perhatian kecilmu yang menghangatkan hati',
        'Semua hal di atas tanpa terkecuali ❤️',
      ],
      correctIndex: 3,
      explanation: 'Semuanya! Tidak ada yang bisa mengalahkan pesonamu di mataku!',
    },
    {
      id: 4,
      question: 'Aktivitas santai favorit apa yang paling sering kita lakukan bareng?',
      options: [
        'Nonton drakor',
        'Rebahan',
        'Gym',
        'Main ML',
      ],
      correctIndex: 1,
      explanation: 'Rebahan bareng sambil nonton drakor, momen paling nyaman!',
    },
    {
      id: 5,
      question: 'Seberapa besar rasa sayang dan cintaku kepadamu?',
      options: [
        'Seluas samudra di bumi',
        'Setinggi langit dan bintang di angkasa',
        'Tak terhingga sepanjang masa',
        'Lebih dari seluruh kata-kata di dunia ❤️',
      ],
      correctIndex: 3,
      explanation: 'Bahkan seluruh kata di dunia tak cukup untuk menggambarkan cintaku padamu!',
    },
  ],

  // Memory Game Cards (8 unique pairs)
  memoryCards: [
    { id: 1, emoji: '🌹', label: 'Mawar Indah' },
    { id: 2, emoji: '💌', label: 'Surat Cinta' },
    { id: 3, emoji: '🍰', label: 'Kue Ulang Tahun' },
    { id: 4, emoji: '🎁', label: 'Kado Spesial' },
    { id: 5, emoji: '🧸', label: 'Boneka Peluk' },
    { id: 6, emoji: '☕', label: 'Kopi Berdua' },
    { id: 7, emoji: '💍', label: 'Cincin Janji' },
    { id: 8, emoji: '✨', label: 'Bintang Harapan' },
  ],

  // Secret Puzzle / Riddle
  puzzle: {
    clue:
      'Aku punya ratusan lembar tapi bukan pohon, punya banyak cerita tapi tak punya suara, dan selalu menjadi teman terbaikmu saat minum teh hangat di sore hari. Apakah aku?',
    hint: 'Benda berlembar-lembar yang selalu kamu cari di Gramedia...',
    answer: 'buku',
    secretMessage:
      'Jawabanmu tepat sekali, sayangku! Kamu adalah buku terindah yang halamannya ingin kubaca dan kujaga setiap hari selamanya. ❤️',
  },

  // Romantic Vouchers for Grand Finale
  vouchers: [
    {
      id: 'voucher-novel',
      serial: 'BDAY-NVL-2026-001',
      title: 'ONE NOVEL, JUST FOR YOU',
      subtitle: 'Satu novel pilihanmu dari Gramedia',
      reward: '1 Buku Novel Bebas Pilihan Tatik',
      instructions:
        'Pilih novel apa pun yang sedang kamu incar di Gramedia. Bawa kartu ini dan biar aku yang checkout untukmu!',
      theme: 'pink',
      recipient: 'Tatik Tersayang',
      validUntil: 'Berlaku Selamanya',
    },
    {
      id: 'voucher-dinner',
      serial: 'BDAY-DNR-2026-002',
      title: 'ONE DINNER DATE WITH ME',
      subtitle: 'Makan malam romantis berdua',
      reward: 'Romantic Candlelight Dinner Date',
      instructions:
        'Kenakan gaun tercantikmu, dandan manis, dan biarkan aku yang menjemput serta mengatur seluruh malam romantis ini.',
      theme: 'rose',
      recipient: 'Tatik Tersayang',
      validUntil: 'Kapan pun Tatik Mau',
    },
  ],

  // Romantic Dinner Details
  dinnerDetails: {
    date: 'Sabtu, 14 November 2026',
    restaurant: 'The Glasshouse Sky Lounge & Bistro',
    location: 'Rooftop Garden Terrace, Lantai 21',
    time: '19:00 WIB',
  },

  // Theme Color Accents
  theme: {
    primary: '#ff4f80',
    secondary: '#ffd6df',
    accent: '#d4af37',
    background: '#fff5f7',
  },
};
