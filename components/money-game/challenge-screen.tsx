// components/PracticeModeScreen.tsx
import { ArrowLeft, Coins, ShoppingCart, RefreshCw, Replace, Shuffle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Screen, GameType, challengeGames } from "@/components/type/MoneyGame"


interface ChallangeModeScreenProps {
    currentScreen: "practice" | "challenge"
    setCurrentScreen: (screen: Screen) => void
    startGame: (gameType: GameType, screen: "practice" | "challenge") => void
}

function getIcon(name: string) {
  const iconProps = { className: "h-10 w-10" }

  switch (name) {
    case "coins":
      return <Coins {...iconProps} className="text-yellow-500" />
    case "shoppingCart":
      return <ShoppingCart {...iconProps} className="text-blue-500" />
    case "replace":
      return <Replace {...iconProps} className="text-orange-500" />
    case "refresh":
      return <RefreshCw {...iconProps} className="text-rose-500" />
    case "shuffle":
      return <Shuffle {...iconProps} className="text-rose-500" />
    default:
      return null
  }
}

export default function ChallangeModeScreen({ currentScreen, setCurrentScreen, startGame }: ChallangeModeScreenProps) {

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#fff7ed] to-[#ffedd5] p-4 relative">
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
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
                        Mode Tantangan
                    </span>
                </h1>
                <p className="text-lg text-gray-600 font-medium">
                    Uji kecepatanmu melawan waktu!
                </p>
            </div>

            {/* Game Cards - Bold styling */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4 pb-8">
                {challengeGames.map((game) => (
                    <Card key={game.title} className={`${game.bgColor} hover:shadow-xl transition-all duration-200 border-2 border-gray-200 rounded-xl overflow-hidden group flex flex-col h-full`}>
                        <CardHeader className="flex flex-col items-center p-6 pb-2 space-y-3">
                            <div className="p-3 rounded-full bg-white shadow-md group-hover:scale-110 transition-transform">
                                {getIcon(game.iconName)}
                            </div>
                            <CardTitle className="text-xl font-bold text-gray-800 text-center">
                                {game.title}
                            </CardTitle>
                            <p className="text-sm text-gray-700 text-center font-medium">
                                {game.description}
                            </p>

                            {/* Time pressure indicator */}
                            <div className="flex items-center gap-1 mt-2 px-3 py-1 bg-white rounded-full text-xs font-bold text-gray-800 border border-gray-300">
                                <Clock className="h-3 w-3 text-red-500 animate-pulse" />
                                <span>{game.timeLimit} detik</span>
                            </div>
                        </CardHeader>
                        <CardFooter className="p-6 pt-0 mt-auto">
                            <Button
                                onClick={() => startGame(game.type, currentScreen)}
                                disabled={!game.active}
                                className={`w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 rounded-lg shadow-md transition-all transform hover:scale-[1.02] ${!game.active ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                MULAI TANTANGAN
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