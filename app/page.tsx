"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Star, Clock, Users, Trophy, BookOpen } from "lucide-react"
import MathGame from "../games/target-number"

type GameDifficulty = "Easy" | "Medium" | "Hard"
type GameCategory = "Numbers" | "Geometry" | "Logic" | "Algebra"

type Game = {
  id: string
  title: string
  description: string
  category: GameCategory
  difficulty: GameDifficulty
  duration: string
  players: string
  rating: number
  isAvailable: boolean
  icon: string
  color: string
}

export default function HomePage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  const games: Game[] = [
    {
      id: "target-match",
      title: "Target Match Challenge",
      description:
        "Select cards with decimals, fractions, and percentages to reach the target number using different operations.",
      category: "Numbers",
      difficulty: "Medium",
      duration: "5-10 min",
      players: "1 player",
      rating: 4.8,
      isAvailable: true,
      icon: "🎯",
      color: "from-blue-400 to-purple-500",
    },
    {
      id: "fraction-builder",
      title: "Fraction Builder",
      description: "Build and compare fractions using visual pie charts and number lines.",
      category: "Numbers",
      difficulty: "Easy",
      duration: "3-7 min",
      players: "1 player",
      rating: 4.6,
      isAvailable: false,
      icon: "🥧",
      color: "from-green-400 to-blue-500",
    },
    {
      id: "shape-explorer",
      title: "Shape Explorer",
      description: "Identify and classify 2D and 3D shapes while learning their properties.",
      category: "Geometry",
      difficulty: "Easy",
      duration: "4-8 min",
      players: "1 player",
      rating: 4.7,
      isAvailable: false,
      icon: "🔺",
      color: "from-orange-400 to-red-500",
    },
    {
      id: "pattern-detective",
      title: "Pattern Detective",
      description: "Solve number and shape patterns to unlock the next sequence.",
      category: "Logic",
      difficulty: "Hard",
      duration: "8-15 min",
      players: "1 player",
      rating: 4.9,
      isAvailable: false,
      icon: "🔍",
      color: "from-purple-400 to-pink-500",
    },
    {
      id: "equation-balance",
      title: "Equation Balance",
      description: "Balance equations by moving numbers and operations to both sides.",
      category: "Algebra",
      difficulty: "Hard",
      duration: "6-12 min",
      players: "1 player",
      rating: 4.5,
      isAvailable: false,
      icon: "⚖️",
      color: "from-teal-400 to-green-500",
    },
    {
      id: "time-master",
      title: "Time Master",
      description: "Practice telling time with analog and digital clocks in fun scenarios.",
      category: "Numbers",
      difficulty: "Easy",
      duration: "3-6 min",
      players: "1 player",
      rating: 4.4,
      isAvailable: false,
      icon: "⏰",
      color: "from-yellow-400 to-orange-500",
    },
  ]

  const categories = ["All", "Numbers", "Geometry", "Logic", "Algebra"]
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredGames = games.filter((game) => selectedCategory === "All" || game.category === selectedCategory)

  const getDifficultyColor = (difficulty: GameDifficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
    }
  }

  const handlePlayGame = (gameId: string) => {
    if (gameId === "target-match") {
      setSelectedGame(gameId)
    } else {
      // For other games, show coming soon message
      alert("🚧 Coming Soon! This game is under development.")
    }
  }

  const handleBackToHome = () => {
    setSelectedGame(null)
  }

  // If a game is selected, show that game
  if (selectedGame === "target-match") {
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
            <h1 className="text-xl font-bold text-gray-800">Target Match Challenge</h1>
            <div></div>
          </div>
        </div>
        <MathGame />
      </div>
    )
  }

  // Main landing page
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-purple-300">
        <div className="max-w-6xl mx-auto p-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-2">🎓 MathPlay Academy</h1>
            <p className="text-xl text-gray-600 mb-4">Fun and Interactive Math Games for Elementary Students</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>Ages 6-12</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>Curriculum Aligned</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                <span>Progress Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Choose Your Adventure</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`rounded-full px-6 py-2 ${
                  selectedCategory === category
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "border-2 border-purple-300 text-purple-600 hover:bg-purple-50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredGames.map((game) => (
            <Card
              key={game.id}
              className={`overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                !game.isAvailable ? "opacity-75" : ""
              }`}
            >
              <div className={`h-32 bg-gradient-to-r ${game.color} flex items-center justify-center`}>
                <span className="text-6xl">{game.icon}</span>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-bold text-gray-800 leading-tight">{game.title}</CardTitle>
                  {!game.isAvailable && (
                    <Badge variant="secondary" className="text-xs">
                      Soon
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <Badge className={getDifficultyColor(game.difficulty)}>{game.difficulty}</Badge>
                  <Badge variant="outline" className="text-xs">
                    {game.category}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{game.description}</p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{game.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{game.players}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{game.rating}</span>
                  </div>
                </div>

                <Button
                  onClick={() => handlePlayGame(game.id)}
                  disabled={!game.isAvailable}
                  className={`w-full ${
                    game.isAvailable
                      ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {game.isAvailable ? "Play Now" : "Coming Soon"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">🌟 Learning Made Fun</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">6</div>
              <div className="text-gray-600">Interactive Games</div>
              <div className="text-sm text-gray-500 mt-1">More coming soon!</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">4</div>
              <div className="text-gray-600">Math Categories</div>
              <div className="text-sm text-gray-500 mt-1">Numbers, Geometry, Logic, Algebra</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">3</div>
              <div className="text-gray-600">Difficulty Levels</div>
              <div className="text-sm text-gray-500 mt-1">Easy, Medium, Hard</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">✨ Why Choose MathPlay Academy?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🎮</div>
              <h4 className="font-bold text-gray-800 mb-2">Gamified Learning</h4>
              <p className="text-sm text-gray-600">Turn math practice into exciting adventures</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📊</div>
              <h4 className="font-bold text-gray-800 mb-2">Progress Tracking</h4>
              <p className="text-sm text-gray-600">Monitor improvement with detailed analytics</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-bold text-gray-800 mb-2">Adaptive Difficulty</h4>
              <p className="text-sm text-gray-600">Games adjust to your skill level</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🏆</div>
              <h4 className="font-bold text-gray-800 mb-2">Achievements</h4>
              <p className="text-sm text-gray-600">Earn badges and celebrate success</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-8 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <h4 className="text-xl font-bold mb-2">🎓 MathPlay Academy</h4>
          <p className="text-gray-300 mb-4">Making math fun, one game at a time!</p>
          <div className="text-sm text-gray-400">
            <p>© 2024 MathPlay Academy. Designed for elementary education.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
