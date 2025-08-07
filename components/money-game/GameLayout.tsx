import { ArrowLeft, Clock, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { challengeGames, GameType, Screen } from "@/components/type/MoneyGame"
import { useEffect, useState } from 'react'

interface GameLayoutProps {
  title: string
  currentQuestion: number
  totalQuestions: number
  onBack: () => void
  children: React.ReactNode
  feedback?: 'correct' | 'wrong' | null
  showCompletion: boolean
  currentScreen: Screen
  gameType: GameType
}

export function GameLayout({
  title,
  currentQuestion,
  totalQuestions,
  onBack,
  children,
  feedback,
  showCompletion,
  currentScreen,
  gameType,
}: GameLayoutProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [timerActive, setTimerActive] = useState<boolean>(true)
  const [correctCount, setCorrectCount] = useState<number>(0)
  const [showFinalResults, setShowFinalResults] = useState<boolean>(false)

  // Initialize game state
  useEffect(() => {
    if (currentScreen === 'challenge-game') {
      const challenge = challengeGames.find(g => g.type === gameType)
      if (challenge && challenge.timeLimit) {
        setTimeLeft(challenge.timeLimit)
        setTimerActive(true)
      }
    }
    setCorrectCount(0)
    setShowFinalResults(false)
  }, [currentScreen, gameType])

  // Countdown timer
  useEffect(() => {
    if (!timerActive) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          setTimerActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timerActive])

  // Handle answer submission
  useEffect(() => {
    if (feedback !== undefined && feedback !== null) {
      const isCorrect = feedback === 'correct'
      if (isCorrect) {
        setCorrectCount(prev => prev + 1)
      }
      //onAnswer(isCorrect)
    }
  }, [feedback])

  useEffect(() => {
    if (
      currentScreen === 'challenge-game' &&
      (!timerActive || currentQuestion > totalQuestions)
    ) {
      setShowFinalResults(true);
    }
  }, [timerActive, currentQuestion]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className={`flex flex-col items-center min-h-screen p-4 relative ${
      currentScreen === 'practice-game' 
        ? 'bg-gradient-to-br from-[#f0fdf4] to-[#ffedd5]' 
        : 'bg-gradient-to-br from-[#fff7ed] to-[#ffedd5]'
    }`}>
      {/* Top Bar */}
      <div className="w-full flex justify-between items-start absolute top-4 left-0 px-4">
        <Button
          onClick={onBack}
          className="z-10 bg-white hover:bg-gray-50 shadow-md border border-gray-300 rounded-lg px-4 py-2 flex items-center gap-2"
          variant="ghost"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
          <span className="font-medium text-gray-700">Kembali</span>
        </Button>

        <div className="flex items-center gap-4">
          {/* Challenge Mode Timer */}
          {currentScreen === 'challenge-game' && timerActive && (
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-md border border-red-200">
              <Clock className="h-5 w-5 text-red-500" />
              <span className={`font-bold ${
                timeLeft < 10 ? 'text-red-600' : 'text-gray-700'
              }`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          )}

          {/* Progress Indicator */}
          <div className="relative w-12 h-12">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeDasharray={`${(currentQuestion / totalQuestions) * 100}, 100`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-700">
                {Math.min(currentQuestion, totalQuestions)}/{totalQuestions}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mb-4 mt-16">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          <span className={`bg-clip-text text-transparent ${
            currentScreen === 'practice-game'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500'
              : 'bg-gradient-to-r from-red-500 to-orange-500'
          }`}>
            {title}
          </span>
        </h1>
        {currentScreen === 'challenge-game' && (
          <p className="text-sm text-gray-600 mt-1">
            Kerjakan secepat dan seakurat mungkin!
          </p>
        )}
      </div>

      {/* Game Content */}
      <div className="w-full max-w-2xl mt-4">
        {children}
      </div>

      {/* Feedback Overlays */}
      {currentScreen === 'practice-game' && feedback === "correct" && (
        <div className="absolute inset-0 flex items-center justify-center bg-green-500/20 z-20 backdrop-blur-sm">
          <div className="text-center animate-pop-in">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-5xl font-bold text-green-700 drop-shadow-lg">Benar!</p>
            <p className="text-xl text-green-800 mt-4">Lanjut ke pertanyaan berikutnya!</p>
          </div>
        </div>
      )}

      {currentScreen === 'practice-game' && feedback === "wrong" && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-500/20 z-20 backdrop-blur-sm">
          <div className="text-center animate-pop-in">
            <div className="text-6xl mb-4">😅</div>
            <p className="text-5xl font-bold text-red-700 drop-shadow-lg">Salah!</p>
            <p className="text-xl text-red-800 mt-4">Coba lagi ya!</p>
          </div>
        </div>
      )}

      {/* Challenge Mode Final Results */}
      {showFinalResults && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl text-center max-w-md">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-3xl font-bold text-green-600 mb-2">Hasil Akhir!</h2>
            <p className="text-2xl font-bold text-gray-800 mb-4">
              {correctCount} dari {totalQuestions} benar!
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Skor akurasi: {Math.round((correctCount / totalQuestions) * 100)}%
            </p>
            <Button
              onClick={onBack}
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Kembali ke Menu
            </Button>
          </div>
        </div>
      )}

      {/* Normal Completion (Practice Mode) */}
      {showCompletion && currentScreen === 'practice-game' && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl text-center max-w-md animate-bounce">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-green-600 mb-2">Selamat!</h2>
            <p className="text-xl mb-6">Kamu telah menyelesaikan semua pertanyaan!</p>
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center animate-spin">
                <ArrowLeft className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}