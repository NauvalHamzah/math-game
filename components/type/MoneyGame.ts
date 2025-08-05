export type Screen = "home" | "practice" | "challenge" | "practice-game"
export type GameType = "kenali-uang" | "beli-barang" | "kembalian"
export type RupiahDenomination = {
  value: number
  image: string
  isBill: boolean
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
  { name: "Pensil", price: 2500, emoji: "✏️" },
  { name: "Buku", price: 15000, emoji: "📚" },
  { name: "Penggaris", price: 3500, emoji: "📏" },
  { name: "Permen", price: 1000, emoji: "🍬" },
  { name: "Minuman", price: 5000, emoji: "🥤" },
]
