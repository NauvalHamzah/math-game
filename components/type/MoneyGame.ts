export type Screen = "home" | "practice" | "challenge" | "practice-game" | "challenge-game"
export type GameType = "kenali-uang" | "beli-barang" | "tukar-uang" | "kembalian" | "kombinasi"
export type RupiahDenomination = {
  value: number
  image: string
  isBill: boolean
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
