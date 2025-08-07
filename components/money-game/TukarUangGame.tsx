import { useState } from 'react';
import { GameLayout } from './GameLayout'
import { rupiahDenominations, Screen, GameType } from "@/components/type/MoneyGame"
import { X } from 'lucide-react'

interface TukarUangGameProps {
  targetAmount: number
  selectedCoins: number[]
  currentQuestion: number
  totalQuestions: number
  onBack: () => void
  onResetCoins: () => void
  onCoinClick: (gameType: GameType, value: number) => void
  onRemoveCoin: (index: number) => void
  onCheck: (gameType: GameType) => void
  getCoinCounts: (value: number[]) => Record<number, number>
  feedback?: 'correct' | 'wrong' | null
  showCompletion: boolean
  targetImage: string // Image of the money to exchange
  currentScreen: Screen
  gameType: GameType
}

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount)
}

export function TukarUangGameContent({
  targetAmount,
  selectedCoins,
  currentQuestion,
  totalQuestions,
  onBack,
  onResetCoins,
  onCoinClick,
  onRemoveCoin,
  onCheck,
  getCoinCounts,
  feedback,
  showCompletion,
  targetImage,
  currentScreen,
  gameType
}: TukarUangGameProps) {
  const [temporarilyDisabled, setTemporarilyDisabled] = useState(false);

  const handleClick = () => {
    if (currentScreen === 'challenge-game') {
      setTemporarilyDisabled(true);
      setTimeout(() => {
        setTemporarilyDisabled(false);
      }, 1500);
    }

    onCheck(gameType);
  };

  const isDisabled = feedback !== null || (currentScreen === 'challenge-game' && temporarilyDisabled) || selectedCoins.length === 0;

  const currentTotal = selectedCoins.reduce((sum, val) => sum + val, 0)
  const targetDenomination = rupiahDenominations.find(d => d.value === targetAmount)

  // Only show denominations smaller than the target amount
  const availableDenominations = rupiahDenominations.filter(d => d.value < targetAmount)

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Target Money to Exchange */}
      <div className="bg-white p-4 rounded-xl shadow-md border-2 border-purple-300 text-center">
        <p className="text-lg font-bold text-purple-700 mb-2">Tukarkan uang ini:</p>
        <div className="flex justify-center items-center gap-4">
          <img
            src={`/${targetImage}`}
            alt={`Rp${targetAmount}`}
            className={`${targetDenomination?.isBill ? "h-20" : "h-16"} w-auto object-contain`}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
        <p className="text-sm text-purple-800 text-center font-medium">
          Pilih uang-uang di bawah ini untuk menukar uang menjadi pecahan yang lebih kecil
        </p>
      </div>

      {/* Selected Money */}
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 rounded-xl border border-purple-200">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-purple-700">Uang Dipilih:</p>
            {selectedCoins.length > 0 && (
              <button
                onClick={onResetCoins}
                className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200"
              >
                Reset
              </button>
            )}
          </div>
          {currentScreen === "practice-game" && (
            <p className={`text-lg font-bold ${currentTotal > targetAmount ? "text-red-600" :
              currentTotal < targetAmount ? "text-yellow-600" : "text-purple-700"
              }`}>
              {formatRupiah(currentTotal)}
            </p>
          )}
        </div>

        {selectedCoins.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {Object.entries(getCoinCounts(selectedCoins)).map(([value, count]) => (
              <div key={value} className="relative">
                <button
                  onClick={() => onRemoveCoin(selectedCoins.indexOf(Number(value)))}
                  className="relative group transform hover:scale-105 transition-transform focus:outline-none"
                >
                  <img
                    src={`/${rupiahDenominations.find(d => d.value === Number(value))?.image}`}
                    alt={`Rp${value}`}
                    className="h-12 w-auto object-contain"
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20">
                    <span className="bg-green-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow pointer-events-none">
                      {count}
                    </span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic py-1">Belum ada uang dipilih</p>
        )}
      </div>

      {/* Money Options - Only show smaller denominations */}
      <div className="flex flex-wrap gap-3 justify-center px-1 py-2">
        {availableDenominations.map((denom) => (
          <button
            key={denom.value}
            onClick={() => onCoinClick(gameType, denom.value)}
            disabled={feedback !== null}
            className="flex flex-col items-center p-2 rounded-lg border-2 border-purple-300 bg-white hover:bg-purple-50 hover:border-purple-400 active:bg-purple-100 transition-colors shadow-sm min-w-[70px]"
          >
            <img
              src={`/${denom.image}`}
              alt={`Rp${denom.value}`}
              className={`${denom.isBill ? "h-14" : "h-12"} w-auto object-contain`}
            />
          </button>
        ))}
      </div>

      {/* Check Button */}
      <button
        onClick={handleClick}
        disabled={isDisabled}
        className={`w-full py-3 text-xl font-bold rounded-xl shadow-lg ${!isDisabled
          ? "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
          : "bg-gray-300"
          } text-white transition-all transform hover:scale-[1.01]`}
      >
        Periksa
      </button>
    </div>
  )
}


export function TukarUangGame({
  targetAmount,
  selectedCoins,
  currentQuestion,
  totalQuestions,
  onBack,
  onResetCoins,
  onCoinClick,
  onRemoveCoin,
  onCheck,
  getCoinCounts,
  feedback,
  showCompletion,
  targetImage,
  currentScreen,
  gameType
}: TukarUangGameProps) {
  return (
    <GameLayout
      title="Tukar Uang"
      currentQuestion={currentQuestion}
      totalQuestions={totalQuestions}
      onBack={onBack}
      feedback={feedback}
      showCompletion={showCompletion}
      currentScreen={currentScreen}
      gameType={gameType}
    >
      <TukarUangGameContent
        targetAmount={targetAmount}
        targetImage={targetImage}
        selectedCoins={selectedCoins}
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
        onBack={onBack}
        onResetCoins={onResetCoins}
        onCoinClick={onCoinClick}
        onRemoveCoin={onRemoveCoin}
        onCheck={onCheck}
        getCoinCounts={getCoinCounts}
        feedback={feedback}
        showCompletion={showCompletion}
        currentScreen={currentScreen}
        gameType={gameType}
      />

    </GameLayout>
  )
}