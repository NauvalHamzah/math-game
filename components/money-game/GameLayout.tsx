import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from "react"


interface GameLayoutProps {
  title: string
  currentQuestion: number
  totalQuestions: number
  onBack: () => void
  children: React.ReactNode
  feedback?: 'correct' | 'wrong' | null
  showCompletion: boolean
}

export function GameLayout({
  title,
  currentQuestion,
  totalQuestions,
  onBack,
  children,
  feedback,
  showCompletion
}: GameLayoutProps) {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-[#f0fdf4] to-[#ffedd5] p-4 relative">
      {/* Back Button and Circular Progress */}
      <div className="w-full flex justify-between items-start absolute top-4 left-0 px-4">
        <Button
          onClick={onBack}
          className="z-10 bg-white hover:bg-gray-50 shadow-md border border-gray-300 rounded-lg px-4 py-2 flex items-center gap-2"
          variant="ghost"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
          <span className="font-medium text-gray-700">Kembali</span>
        </Button>

        {/* Circular Progress Indicator */}
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
              {currentQuestion}/{totalQuestions}
            </span>
          </div>
        </div>
      </div>

      {/* Compact Header */}
      <div className="text-center mb-4 mt-16">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">
            {title}
          </span>
        </h1>
      </div>

      {/* Game Content - now has more space */}
      <div className="w-full max-w-2xl mt-4">
        {children}
      </div>

      {/* Feedback Overlays (unchanged) */}
      {feedback === "correct" && (
        <div className="absolute inset-0 flex items-center justify-center bg-green-500/20 z-20 backdrop-blur-sm">
          <div className="text-center animate-pop-in">
            <div className="text-6xl mb-4">🎉</div>
            <p className="text-5xl font-bold text-green-700 drop-shadow-lg">Benar!</p>
            <p className="text-xl text-green-800 mt-4">Lanjut ke pertanyaan berikutnya!</p>
          </div>
        </div>
      )}

      {feedback === "wrong" && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-500/20 z-20 backdrop-blur-sm">
          <div className="text-center animate-pop-in">
            <div className="text-6xl mb-4">😅</div>
            <p className="text-5xl font-bold text-red-700 drop-shadow-lg">Salah!</p>
            <p className="text-xl text-red-800 mt-4">Coba lagi ya!</p>
          </div>
        </div>
      )}

      {showCompletion && (
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