export type Screen = "home" | "practice" | "challenge" | "practice-game" | "challenge-game"
export type GameType = "kenali-uang" | "beli-barang" | "tukar-uang" | "kembalian" | "kombinasi"
export type RupiahDenomination = {
  value: number
  image: string
  isBill: boolean
}
export interface MiniGame {
  title: string
  description: string
  iconName: "coins" | "shoppingCart" | "replace" | "refresh" | "shuffle"
  difficulty: number
  type: GameType
  bgColor: string
  active: boolean
  timeLimit?: number
}

export type Item = {
  name: string
  minPrice: number
  maxPrice: number
  emoji: string
  price?: number
}

export const rupiahDenominations = [
  // Bills
  { value: 100000, isBill: true, image: "100k.jpeg" },
  { value: 50000, isBill: true, image: "50k.jpeg" },
  { value: 20000, isBill: true, image: "20k.jpeg" },
  { value: 10000, isBill: true, image: "10k.jpeg" },
  { value: 5000, isBill: true, image: "5k.jpeg" },
  { value: 2000, isBill: true, image: "2k.jpeg" },
  { value: 1000, isBill: true, image: "1k.jpeg" },
  
  // Coins
  { value: 500, isBill: false, image: "500.png", id: "500-coin" },
  { value: 200, isBill: false, image: "200.png", id: "200-coin" },
  { value: 100, isBill: false, image: "100.png", id: "100-coin" },
]

export const items = [
  // Tier 1: 1,000 - 5,000 (Small snacks & very basic items)
  { name: "Permen", minPrice: 1000, maxPrice: 3000, emoji: "🍬" },
  { name: "Coklat", minPrice: 2000, maxPrice: 5000, emoji: "🍫" },
  { name: "Biskuit", minPrice: 1000, maxPrice: 4000, emoji: "🍪" },
  { name: "Pensil Warna", minPrice: 3000, maxPrice: 5000, emoji: "✏️" },

  // Tier 2: 5,000 - 15,000 (Basic stationery)
  { name: "Buku Gambar", minPrice: 5000, maxPrice: 10000, emoji: "🎨" },
  { name: "Penggaris", minPrice: 5000, maxPrice: 15000, emoji: "📏" },
  { name: "Penghapus Lucu", minPrice: 5000, maxPrice: 12000, emoji: "🧼" },
  { name: "Tempat Pensil", minPrice: 8000, maxPrice: 15000, emoji: "✏️" },

  // Tier 3: 15,000 - 30,000 (School supplies)
  { name: "Buku Tulis Pack", minPrice: 15000, maxPrice: 25000, emoji: "📚" },
  { name: "Kotak Makan", minPrice: 20000, maxPrice: 30000, emoji: "🍱" },
  { name: "Tas Kecil", minPrice: 25000, maxPrice: 30000, emoji: "🎒" },
  { name: "Set Alat Tulis", minPrice: 18000, maxPrice: 30000, emoji: "🖍️" },

  // Tier 4: 30,000 - 50,000 (Premium school items)
  { name: "Sepatu Sekolah", minPrice: 35000, maxPrice: 50000, emoji: "👟" },
  { name: "Seragam Olahraga", minPrice: 40000, maxPrice: 50000, emoji: "👕" },
  { name: "Tempat Minum", minPrice: 30000, maxPrice: 45000, emoji: "🧋" },
  { name: "Topi Sekolah", minPrice: 25000, maxPrice: 40000, emoji: "🧢" },

  // Tier 5: 50,000 - 100,000 (Special items)
  { name: "Tas Sekolah", minPrice: 50000, maxPrice: 80000, emoji: "🎒" },
  { name: "Sepatu Bagus", minPrice: 60000, maxPrice: 100000, emoji: "👟" },
  { name: "Jaket Sekolah", minPrice: 70000, maxPrice: 100000, emoji: "🧥" },
  { name: "Mainan Edukasi", minPrice: 50000, maxPrice: 100000, emoji: "🧩" },

  // Tier 5: 100,000 - 250,000 (Sultan items)
  { name: "Sepatu Branded", minPrice: 100000, maxPrice: 150000, emoji: "👟✨" },
  { name: "Tas Sekolah Premium", minPrice: 150000, maxPrice: 200000, emoji: "🎒🌟" },
  { name: "Sepeda Mini", minPrice: 180000, maxPrice: 250000, emoji: "🚲" },
  { name: "Set Alat Lukis Profesional", minPrice: 120000, maxPrice: 200000, emoji: "🎨🖌️" }
];

//List of games in practices
export const practiceGames: MiniGame[] = [
  {
    title: "Kenali Uang",
    description: "Pelajari nilai mata uang Rupiah",
    iconName: "coins",
    difficulty: 1,
    type: "kenali-uang",
    bgColor: "bg-green-100",
    active: true
  },
  {
    title: "Beli Barang",
    description: "Bayar barang dengan uang pas",
    iconName: "shoppingCart",
    difficulty: 2,
    type: "beli-barang",
    bgColor: "bg-blue-100",
    active: true
  },
  {
    title: "Tukar Uang",
    description: "Tukar uang besar menjadi pecahan lebih kecil",
    iconName: "replace",
    difficulty: 3,
    type: "tukar-uang",
    bgColor: "bg-orange-100",
    active: true
  },
  {
    title: "Kembalian Tepat",
    description: "Hitung uang kembalian yang tepat",
    iconName: "refresh",
    difficulty: 3,
    type: "kembalian",
    bgColor: "bg-rose-100",
    active: true
  }
]


export const challengeGames: MiniGame[] = [
  {
    title: "Kenali Uang",
    description: "Uji kecepatan mengenali uang",
    iconName: "coins",
    difficulty: 1,
    type: "kenali-uang",
    bgColor: "bg-lime-100",
    active: true,
    timeLimit: 120
  },
  {
    title: "Beli Barang",
    description: "Transaksi cepat dengan uang pas",
    iconName: "shoppingCart",
    difficulty: 2,
    type: "beli-barang",
    bgColor: "bg-blue-100",
    active: true,
    timeLimit: 180
  },
  {
    title: "Tukar Uang",
    description: "Tukar uang besar menjadi pecahan lebih kecil dengan cepat dan tepat",
    iconName: "replace",
    difficulty: 3,
    type: "tukar-uang",
    bgColor: "bg-emerald-100",
    active: true,
    timeLimit: 180
  },
  {
    title: "Kembalian Tepat",
    description: "Hitung kembalian dengan cepat dan tepat",
    iconName: "refresh",
    difficulty: 3,
    type: "kembalian",
    bgColor: "bg-rose-100",
    active: true,
    timeLimit: 240
  },
  {
    title: "Kombinasi",
    description: "Gabungan semua jenis permainan uang",
    iconName: "shuffle",
    difficulty: 4,
    type: "kombinasi",
    bgColor: "bg-fuchsia-100",
    active: true,
    timeLimit: 180
  }
]