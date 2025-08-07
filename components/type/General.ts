
export type GameDifficulty = "Mudah" | "Sedang" | "Sulit"
export type GameCategory = "Bilangan" | "Geometri" | "Logika" | "Aljabar"
export type GameGrade = "Kelas 1" | "Kelas 2" | "Kelas 3" | "Kelas 4" | "Kelas 5" | "Kelas 6"

export type Game = {
  id: string
  title: string
  description: string
  category: GameCategory
  difficulty: GameDifficulty
  grade: GameGrade
  duration: string
  players: string
  rating: number
  isAvailable: boolean
  icon: string
  color: string
}

export const games: Game[] = [
    {
      id: "number-match",
      title: "Number Match",
      description:
        "Pilih kartu berisi desimal, pecahan, dan persen untuk mencapai angka target dengan berbagai operasi.",
      category: "Bilangan",
      difficulty: "Sedang",
      grade: "Kelas 5",
      duration: "5–10 menit",
      players: "1 pemain",
      rating: 4.8,
      isAvailable: true,
      icon: "🎯",
      color: "from-blue-400 to-purple-500",
    },
    {
      id: "fraction-builder",
      title: "Pembangun Pecahan",
      description:
        "Bangun dan bandingkan pecahan menggunakan diagram lingkaran dan garis bilangan.",
      category: "Bilangan",
      difficulty: "Mudah",
      grade: "Kelas 4",
      duration: "3–7 menit",
      players: "1 pemain",
      rating: 4.6,
      isAvailable: false,
      icon: "🥧",
      color: "from-green-400 to-blue-500",
    },
    {
      id: "shape-explorer",
      title: "Penjelajah Bangun",
      description:
        "Identifikasi dan klasifikasikan bangun 2D dan 3D sambil mempelajari sifat-sifatnya.",
      category: "Geometri",
      difficulty: "Mudah",
      grade: "Kelas 3",
      duration: "4–8 menit",
      players: "1 pemain",
      rating: 4.7,
      isAvailable: false,
      icon: "🔺",
      color: "from-blue-400 to-green-500",
    },
    {
      id: "pattern-detective",
      title: "Detektif Pola",
      description:
        "Selesaikan pola angka dan bentuk untuk membuka urutan selanjutnya.",
      category: "Logika",
      difficulty: "Sulit",
      grade: "Kelas 6",
      duration: "8–15 menit",
      players: "1 pemain",
      rating: 4.9,
      isAvailable: false,
      icon: "🔍",
      color: "from-purple-400 to-pink-500",
    },
    {
      id: "equation-balance",
      title: "Keseimbangan Persamaan",
      description:
        "Seimbangkan persamaan dengan memindahkan angka dan operasi ke kedua sisi.",
      category: "Aljabar",
      difficulty: "Sulit",
      grade: "Kelas 5",
      duration: "6–12 menit",
      players: "1 pemain",
      rating: 4.5,
      isAvailable: false,
      icon: "⚖️",
      color: "from-teal-400 to-green-500",
    },
    {
      id: "time-master",
      title: "Ahli Waktu",
      description:
        "Latih kemampuan membaca jam analog dan digital melalui skenario yang seru.",
      category: "Bilangan",
      difficulty: "Mudah",
      grade: "Kelas 2",
      duration: "3–6 menit",
      players: "1 pemain",
      rating: 4.4,
      isAvailable: false,
      icon: "⏰",
      color: "from-yellow-400 to-orange-500",
    },
    {
      id: "money-game",
      title: "Money Game",
      description:
        "Hitung koin, kembalian, dan selesaikan masalah uang dalam kehidupan nyata.",
      category: "Bilangan",
      difficulty: "Sedang",
      grade: "Kelas 3",
      duration: "4–9 menit",
      players: "1 pemain",
      rating: 4.3,
      isAvailable: true,
      icon: "💰",
      color: "from-emerald-400 to-teal-500",
    },
    {
      id: "multiplication-race",
      title: "Balapan Perkalian",
      description:
        "Melaju cepat melewati tabel perkalian dengan tantangan balapan yang seru.",
      category: "Bilangan",
      difficulty: "Sedang",
      grade: "Kelas 1",
      duration: "3–8 menit",
      players: "1 pemain",
      rating: 4.7,
      isAvailable: false,
      icon: "🏎️",
      color: "from-red-400 to-orange-500",
    },
    {
      id: "word-problems",
      title: "Pemecah Soal Cerita",
      description:
        "Pahami dan selesaikan soal cerita matematika langkah demi langkah.",
      category: "Logika",
      difficulty: "Sulit",
      grade: "Kelas 4",
      duration: "6–12 menit",
      players: "1 pemain",
      rating: 4.6,
      isAvailable: false,
      icon: "📝",
      color: "from-indigo-400 to-purple-500",
    },
  ];