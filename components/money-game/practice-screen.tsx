// components/PracticeModeScreen.tsx
import { ArrowLeft, Coins, Plus, ShoppingCart, RefreshCw, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Screen, GameType } from "@/components/type/MoneyGame"


interface PracticeModeScreenProps {
  setCurrentScreen: (screen: Screen) => void
  startGame: (gameType: GameType) => void
}

export default function PracticeModeScreen({ setCurrentScreen, startGame }: PracticeModeScreenProps) {
  const miniGames = [
    { 
      title: "Kenali Uang", 
      description: "Pelajari nilai mata uang Rupiah",
      icon: <Coins className="h-10 w-10 text-yellow-500" />, 
      difficulty: 1, 
      type: "kenali-uang" as GameType,
      bgColor: "bg-yellow-50"
    },
    {
      title: "Beli Barang",
      description: "Bayar barang dengan uang pas",
      icon: <ShoppingCart className="h-10 w-10 text-blue-500" />,
      difficulty: 2,
      type: "beli-barang" as GameType,
      bgColor: "bg-blue-50"
    },
    { 
      title: "Kembalian", 
      description: "Hitung uang kembalian yang tepat",
      icon: <RefreshCw className="h-10 w-10 text-purple-500" />, 
      difficulty: 3, 
      type: "kembalian" as GameType,
      bgColor: "bg-purple-50"
    },
  ]

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#f0fdf4] to-[#ffedd5] p-4 relative">
      {/* Back Button */}
      <Button
        onClick={() => setCurrentScreen("home")}
        className="absolute top-4 left-4 z-10 bg-white hover:bg-gray-50 shadow-md border border-gray-300 rounded-lg px-4 py-2 flex items-center gap-2 transition-all"
        variant="ghost"
      >
        <ArrowLeft className="h-5 w-5 text-gray-700" />
        <span className="font-medium text-gray-700">Kembali</span>
      </Button>

      {/* Header */}
      <div className="text-center mb-8 mt-12 max-w-lg">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-3">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">
            Mode Belajar
          </span>
        </h1>
        <p className="text-lg text-gray-600">
          Pilih mini-game untuk mengasah kemampuan menghitung uang Rupiah!
        </p>
      </div>

      {/* Game Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4 pb-8 justify-center">
        {miniGames.map((game) => (
          <Card 
            key={game.title}
            className={`${game.bgColor} hover:shadow-lg transition-all duration-300 border-2 border-gray-100 rounded-xl overflow-hidden group flex flex-col h-full`}
          >
            <CardHeader className="flex flex-col items-center p-6 pb-4 space-y-3">
              <div className="p-3 rounded-full bg-white shadow-md group-hover:scale-110 transition-transform">
                {game.icon}
              </div>
              <CardTitle className="text-xl font-bold text-gray-800 text-center">
                {game.title}
              </CardTitle>
              <p className="text-sm text-gray-500 text-center">
                {game.description}
              </p>
            </CardHeader>
            <CardFooter className="p-6 pt-0 mt-auto"> {/* Added mt-auto here */}
              <Button
                onClick={() => startGame(game.type)}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 rounded-lg shadow-md transition-all transform hover:scale-[1.02]"
              >
                Mulai Game
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white/70 to-transparent pointer-events-none" />
    </div>
  )
}