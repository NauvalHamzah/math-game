"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ShoppingCart, BookOpen, GraduationCap, 
        Coins, Calculator, RefreshCw, Award } from "lucide-react"
import { Screen } from "@/components/type/MoneyGame"

interface HomeScreenProps {
  setCurrentScreen: (screen: Screen) => void
}

export default function HomeScreen({ setCurrentScreen }: HomeScreenProps) {
    const [showTutorial, setShowTutorial] = useState(false)
    
    
return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#f8f4e8] to-[#f9d5bb] p-4 relative overflow-hidden">
      {/* Decorative coins in background */}
      <div className="absolute top-10 left-10 text-4xl opacity-10">🪙</div>
      <div className="absolute bottom-20 right-20 text-6xl opacity-10">💵</div>
      <div className="absolute top-1/3 right-1/4 text-5xl opacity-10">💰</div>
      
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl">
        {/* Title with shadow effect */}
        <h1 className="text-6xl md:text-7xl font-extrabold text-[#e67e22] mb-4 text-center">
          <span className="text-stroke">Money</span>
          <span className="text-[#27ae60]">Game</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-[#2c3e50] mb-12 text-center max-w-md font-medium">
          Ayo belajar menghitung Rupiah dengan cara yang seru!
        </p>

        {/* Main buttons with improved hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <button
            onClick={() => setCurrentScreen("practice")}
            className="relative w-full h-40 md:h-48 bg-gradient-to-br from-[#e67e22] to-[#d35400] hover:from-[#d35400] hover:to-[#e67e22] text-white text-2xl md:text-3xl font-bold rounded-2xl shadow-lg flex flex-col items-center justify-center transition-all transform hover:scale-[1.03] active:scale-95 group overflow-hidden"
          >
            <div className="text-6xl mb-2 group-hover:scale-110 transition-transform">🪙</div>
            Mulai Belajar
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
          </button>
          
          <button
            onClick={() => setCurrentScreen("challenge")}
            className="relative w-full h-40 md:h-48 bg-gradient-to-br from-[#27ae60] to-[#219653] hover:from-[#219653] hover:to-[#27ae60] text-white text-2xl md:text-3xl font-bold rounded-2xl shadow-lg flex flex-col items-center justify-center transition-all transform hover:scale-[1.03] active:scale-95 group overflow-hidden"
          >
            <div className="text-6xl mb-2 group-hover:scale-110 transition-transform">⏱️</div>
            Mulai Tantangan
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
          </button>
        </div>

        {/* Help button moved up */}
        <button
          onClick={() => setShowTutorial(true)}
          className="mt-8 bg-white/90 hover:bg-white text-[#e67e22] font-semibold py-3 px-6 rounded-full shadow-md border-2 border-[#e67e22] hover:border-[#d35400] transition-all flex items-center gap-2"
        >
          <span className="text-xl">?</span>
          Panduan
        </button>
      </div>

      {/* Enhanced tutorial dialog */}
      <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
        <DialogContent className="sm:max-w-md bg-gradient-to-b from-[#f8f9fa] to-[#f1f3f5] p-6 rounded-2xl border-0 shadow-xl">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="bg-[#e67e22] p-2 rounded-full">
                <BookOpen className="text-white w-6 h-6" />
              </div>
              <DialogTitle className="text-2xl font-bold text-[#2c3e50]">Cara Bermain Money-Match</DialogTitle>
            </div>
            <DialogDescription className="text-[#7f8c8d] mt-2">
              Pelajari cara bermain setiap mode game untuk menguasai Rupiah!
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="bg-white/80 p-4 rounded-xl shadow-sm border border-[#ecf0f1]">
              <h3 className="font-semibold text-lg text-[#27ae60] flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Mode Belajar
              </h3>
              <ul className="mt-3 space-y-3">
                <li className="flex items-start gap-2">
                  <div className="bg-[#e67e22]/10 p-1 rounded-full mt-0.5">
                    <Coins className="w-4 h-4 text-[#e67e22]" />
                  </div>
                  <span><span className="font-medium">Kenali Uang:</span> Pilih nilai yang tepat untuk uang yang ditampilkan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-[#e67e22]/10 p-1 rounded-full mt-0.5">
                    <Calculator className="w-4 h-4 text-[#e67e22]" />
                  </div>
                  <span><span className="font-medium">Hitung Uang:</span> Jumlahkan uang hingga mencapai target.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-[#e67e22]/10 p-1 rounded-full mt-0.5">
                    <ShoppingCart className="w-4 h-4 text-[#e67e22]" />
                  </div>
                  <span><span className="font-medium">Beli Barang:</span> Pilih uang yang tepat untuk membayar barang.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-[#e67e22]/10 p-1 rounded-full mt-0.5">
                    <RefreshCw className="w-4 h-4 text-[#e67e22]" />
                  </div>
                  <span><span className="font-medium">Kembalian:</span> Hitung kembalian yang harus diberikan.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/80 p-4 rounded-xl shadow-sm border border-[#ecf0f1]">
              <h3 className="font-semibold text-lg text-[#e74c3c] flex items-center gap-2">
                <Award className="w-5 h-5" />
                Mode Tantangan
              </h3>
              <p className="mt-3">Uji kecepatanmu dengan waktu terbatas dan raih skor tertinggi!</p>
            </div>
          </div>
          
          <Button
            onClick={() => setShowTutorial(false)}
            className="w-full bg-gradient-to-r from-[#e67e22] to-[#d35400] hover:from-[#d35400] hover:to-[#e67e22] text-white font-bold py-3 px-4 rounded-xl transition-all transform hover:scale-[1.01]"
          >
            Mengerti, Ayo Mulai!
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}