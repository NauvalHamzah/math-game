// components/PracticeModeScreen.tsx
import { ArrowLeft, Coins, ShoppingCart, RefreshCw, Replace, Shuffle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Screen, GameType } from "@/components/type/MoneyGame"


interface ChallangeModeScreenProps {
    currentScreen: "practice" | "challenge"
    setCurrentScreen: (screen: Screen) => void
    startGame: (gameType: GameType, screen: "practice" | "challenge") => void
}

export default function ChallangeModeScreen({ currentScreen, setCurrentScreen, startGame }: ChallangeModeScreenProps) {
    const challenges = [
        {
            title: "Kenali Uang",
            description: "Uji kecepatan mengenali uang",
            icon: <Coins className="h-10 w-10 text-lime-600" />,
            difficulty: 1,
            type: "kenali-uang" as GameType,
            bgColor: "bg-lime-100",
            active: true,
            timeLimit: 120
        },
        {
            title: "Beli Barang",
            description: "Transaksi cepat dengan uang pas",
            icon: <ShoppingCart className="h-10 w-10 text-blue-600" />,
            difficulty: 2,
            type: "beli-barang" as GameType,
            bgColor: "bg-blue-100",
            active: true,
            timeLimit: 180
        },
        {
            title: "Tukar Uang",
            description: "Tukar uang besar menjadi pecahan lebih kecil dengan cepat dan tepat",
            icon: <Replace className="h-10 w-10 text-emerald-600" />,
            difficulty: 3,
            type: "tukar-uang" as GameType,
            bgColor: "bg-emerald-100",
            active: true,
            timeLimit: 180
        },
        {
            title: "Kembalian Tepat",
            description: "Hitung kembalian dengan cepat dan tepat",
            icon: <RefreshCw className="h-10 w-10 text-rose-600" />,
            difficulty: 3,
            type: "kembalian" as GameType,
            bgColor: "bg-rose-100",
            active: true,
            timeLimit: 240
        },
        {
            title: "Kombinasi",
            description: "Gabungan semua jenis permainan uang",
            icon: <Shuffle className="h-10 w-10 text-fuchsia-600" />,
            difficulty: 4,  // Increased difficulty since it combines all games
            type: "kombinasi" as GameType,
            bgColor: "bg-fuchsia-100",
            active: false,
            timeLimit: 300
        }
    ]

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
                {challenges.map((game) => (
                    <Card key={game.title} className={`${game.bgColor} hover:shadow-xl transition-all duration-200 border-2 border-gray-200 rounded-xl overflow-hidden group flex flex-col h-full`}>
                        <CardHeader className="flex flex-col items-center p-6 pb-2 space-y-3">
                            <div className="p-3 rounded-full bg-white shadow-md group-hover:scale-110 transition-transform">
                                {game.icon}
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