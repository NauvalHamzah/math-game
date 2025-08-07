"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Star, Clock, Users, Trophy, BookOpen, GraduationCap, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import CategoryFilter from "@/components/category-filter"
import GradeFilter from "@/components/grade-filter"
import { GameDifficulty, GameGrade, games } from "@/components/type/General"

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(["Semua"])
  const [selectedGrade, setSelectedGrade] = useState(["Semua"])

  const router = useRouter()

  const filteredGames = games
    .filter((game) => {
      const categoryMatch =
        selectedCategory.includes("Semua") ||
        selectedCategory.includes(game.category);

      const gradeMatch =
        selectedGrade.includes("Semua") ||
        selectedGrade.includes(game.grade);

      return categoryMatch && gradeMatch;
    })
    .sort((a, b) => {
      // Sort available games first
      return (b.isAvailable ? 1 : 0) - (a.isAvailable ? 1 : 0);
    });



  const getDifficultyColor = (difficulty: GameDifficulty) => {
    switch (difficulty) {
      case "Mudah":
        return "bg-green-100 text-green-800"
      case "Sedang":
        return "bg-yellow-100 text-yellow-800"
      case "Sulit":
        return "bg-red-100 text-red-800"
    }
  }

  const getGradeColor = (grade: GameGrade) => {
    if (grade === "Kelas 1" || grade === "Kelas 2") {
      return "bg-blue-100 text-blue-800"
    } else if (grade === "Kelas 3" || grade === "Kelas 4") {
      return "bg-purple-100 text-purple-800"
    } else {
      return "bg-orange-100 text-orange-800"
    }
  }

  const handlePlayGame = (gameId: string) => {
    switch (gameId) {
      case "number-match":
        router.push(`/games/${gameId}`);
        break;

      case "money-game":
        router.push(`/games/${gameId}`);
        break;

      default:
        alert("🚧 Coming Soon! This game is under development.");
        break;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-purple-300">
        <div className="max-w-6xl mx-auto p-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-2">🎓 MathPlay Academy</h1>
            <p className="text-xl text-gray-600 mb-4">Permainan Matematika Interaktif dan Seru untuk Siswa SD</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>Sesuai Kurikulum</span>
              </div>
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                <span>Pemantauan Progress</span>
              </div>
              <div className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4" />
                <span>Kelas 1–6</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Filters */}
        <div className="mb-8 sm:px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
            Pilih Petualanganmu
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full items-center">
            {/* Filters container - takes available space */}
            <div className="flex-1 flex flex-col sm:flex-row gap-3 w-full min-w-0 sm:mr-4">
              {/* Category - expanded width */}
              <div className="flex-1 min-w-[200px] sm:min-w-[280px]">
                <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
              </div>

              {/* Grade - expanded width */}
              <div className="flex-1 min-w-[200px] sm:min-w-[280px]">
                <GradeFilter selected={selectedGrade} onChange={setSelectedGrade} />
              </div>
            </div>

            {/* Reset Button - pushed to far right */}
            <div className="w-full sm:w-auto mt-2 sm:mt-0 sm:ml-10">
              <Button
                variant="outline"
                className="w-full sm:w-auto border border-gray-300 text-sm text-gray-600 hover:bg-gray-100 flex items-center justify-center gap-2 py-2 px-4"
                onClick={() => {
                  setSelectedCategory(["Semua"])
                  setSelectedGrade(["Semua"])
                }}
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset Filter</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredGames.map((game) => (
            <Card
              key={game.id}
              className={`overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col h-full ${!game.isAvailable ? "opacity-75" : ""
                }`}
            >
              <div className={`h-32 bg-gradient-to-r ${game.color} flex items-center justify-center`}>
                <span className="text-6xl">{game.icon}</span>
              </div>

              <CardHeader className="pb-3 flex-shrink-0">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-bold text-gray-800 leading-tight">{game.title}</CardTitle>
                  {!game.isAvailable && (
                    <Badge variant="secondary" className="text-xs">
                      Segera
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <Badge className={getDifficultyColor(game.difficulty)}>{game.difficulty}</Badge>
                  <Badge variant="outline" className="text-xs">
                    {game.category}
                  </Badge>
                  <Badge className={getGradeColor(game.grade as GameGrade)}>
                    {game.grade}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0 flex flex-col flex-grow">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{game.description}</p>

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
                  className={`w-full mt-auto ${game.isAvailable
                    ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {game.isAvailable ? "Main" : "Segera Hadir"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results Message */}
        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">Tidak ada permainan ditemukan</h3>
            <p className="text-gray-500">Coba ubah filter untuk melihat lebih banyak permainan.</p>
          </div>
        )}


        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">🌟 Belajar Jadi Menyenangkan</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">{games.length}</div>
              <div className="text-gray-600">Permainan Interaktif</div>
              <div className="text-sm text-gray-500 mt-1">Segera hadir lebih banyaj!!</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">4</div>
              <div className="text-gray-600">Kategori </div>
              <div className="text-sm text-gray-500 mt-1">Bilangan, Geometri, Logika, Aljabar</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">6</div>
              <div className="text-gray-600">Tingkat Kelas</div>
              <div className="text-sm text-gray-500 mt-1">Kelas 1 sampai 6</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">3</div>
              <div className="text-gray-600">Tingkat Kesulitan</div>
              <div className="text-sm text-gray-500 mt-1">Mudah, Sedang, Sulit</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">✨ Mengapa Memilih MathPlay Academy?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🎮</div>
              <h4 className="font-bold text-gray-800 mb-2">Pembelajaran Berbasis Permainan</h4>
              <p className="text-sm text-gray-600">Ubah latihan matematika menjadi petualangan seru</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📊</div>
              <h4 className="font-bold text-gray-800 mb-2">Pemantauan Kemajuan</h4>
              <p className="text-sm text-gray-600">Pantau perkembangan melalui analitik yang mendetail</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-bold text-gray-800 mb-2">Kesulitan Adaptif</h4>
              <p className="text-sm text-gray-600">Permainan menyesuaikan dengan tingkat kemampuanmu</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🏆</div>
              <h4 className="font-bold text-gray-800 mb-2">Sesuai Kurikulum</h4>
              <p className="text-sm text-gray-600">Konten selaras dengan standar pendidikan nasional</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-8 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <h4 className="text-xl font-bold mb-2">🎓 MathPlay Academy</h4>
          <p className="text-gray-300 mb-4">Membuat matematika jadi menyenangkan, satu permainan dalam satu waktu!</p>
          <div className="text-sm text-gray-400">
            <p>© 2025 MathPlay Academy. Dirancang untuk pendidikan sekolah dasar.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
