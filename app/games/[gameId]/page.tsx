"use client"

import { Button } from "@/components/ui/button"
import { useRouter, useParams } from "next/navigation"
import NumberMatch from "../number-match"
import MoneyGame from "../money-game"


interface GamePageProps {
  params: {
    gameId: string
  }
}

export default function GamePage() {
  const router = useRouter()
  const params = useParams()
  const gameId = params.gameId as string

  const handleBackToHome = () => {
    router.push("/")
  }

  // Game title mapping
  const getGameTitle = (id: string) => {
    switch (id) {
      case "number-match":
        return "Number Match Challenge"
      case "fraction-builder":
        return "Fraction Builder"
      case "shape-explorer":
        return "Shape Explorer"
      case "pattern-detective":
        return "Pattern Detective"
      case "equation-balance":
        return "Equation Balance"
      case "time-master":
        return "Time Master"
      case "money-game":
        return "Money Game"
      case "multiplication-race":
        return "Multiplication Race"
      case "word-problems":
        return "Word Problem Solver"
      default:
        return "Math Game"
    }
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
            className="border-2 border-purple-400 text-purple-600 hover:bg-purple-50 bg-transparent"
          >
            ← Back to Games
          </Button>
          <h1 className="text-xl font-bold text-gray-800">{getGameTitle(gameId)}</h1>
          <div></div>
        </div>
      </div>
      {renderGame()}
    </div>
  )
}
