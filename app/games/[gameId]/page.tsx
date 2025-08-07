"use client"

import { Button } from "@/components/ui/button"
import { useRouter, useParams } from "next/navigation"
import NumberMatch from "../number-match"
import MoneyGame from "../money-game"
import { games } from "@/components/type/General"
import { Home } from "lucide-react"

export default function GamePage() {
  const router = useRouter()
  const params = useParams()
  const gameId = params.gameId as string

  const matchedGame = games.find(game => game.id === gameId);


  const handleBackToHome = () => {
    router.push("/")
  }

  // Render the appropriate game component
  const renderGame = () => {
    switch (gameId) {
      case "number-match":
        return <NumberMatch />
      case "money-game":
        return <MoneyGame />
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🚧</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Coming Soon!</h2>
              <p className="text-xl text-gray-600 mb-8">This game is under development.</p>
              <Button
                onClick={handleBackToHome}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
              >
                Back to Games
              </Button>
            </div>
          </div>
        )
    }
  }

  return (
    <div>
      <div className="bg-white shadow-sm border-b p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Button
            onClick={handleBackToHome}
            variant="outline"
            className="border-2 border-purple-400 text-purple-600 hover:bg-purple-50 bg-transparent p-2"
          >
            <Home className="w-5 h-5" />
          </Button>

          <h1 className="text-xl font-bold text-gray-800">
            {matchedGame?.title}
          </h1>

          <div></div>
        </div>
      </div>
      {renderGame()}
    </div>
  )
}
