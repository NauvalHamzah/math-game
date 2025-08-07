import { useState } from 'react';
import { GameLayout } from './GameLayout'
import { rupiahDenominations, Screen, GameType } from "@/components/type/MoneyGame"
import { Check, X } from 'lucide-react' // For the checkmark icon

interface KembalianGameProps {
  itemPrice: number
  customerPayment: number
  changeNeeded: number
  selectedChange: number[]
  currentQuestion: number
  totalQuestions: number
  onBack: () => void
  onCoinClick: (gameType: GameType, value: number) => void
  onRemoveCoin: (index: number) => void
  onCheck: (gameType: GameType) => void
  getCoinCounts: (value: number[]) => Record<number, number>
  feedback?: 'correct' | 'wrong' | null
  showCompletion: boolean
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

export function KembalianGameContent({
  itemPrice,
  customerPayment,
  changeNeeded,
  selectedChange,
  currentQuestion,
  totalQuestions,
  onBack,
  onCoinClick,
  onRemoveCoin,
  onCheck,
  getCoinCounts,
  feedback,
  showCompletion,
  currentScreen,
  gameType
}: KembalianGameProps) {
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

  const isDisabled = feedback !== null || (currentScreen === 'challenge-game' && temporarilyDisabled) || selectedChange.length === 0;

  const currentTotal = selectedChange.reduce((sum, val) => sum + val, 0)

  return (
    <div className="flex flex-col h-full gap-6">
      {/* Transaction Summary */}
      <div className="bg-white p-4 rounded-xl shadow-md border-2 border-purple-300">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-blue-700">Harga Barang</p>
            <p className="text-xl font-bold text-blue-800">
              {formatRupiah(itemPrice)}
            </p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <p className="text-sm font-medium text-green-700">Dibayar</p>
            <p className="text-xl font-bold text-green-800">
              {formatRupiah(customerPayment)}
            </p>
          </div>
        </div>
        {currentScreen === "practice-game" && (
          <div className="bg-yellow-50 p-3 rounded-lg border-2 border-yellow-300 text-center">
            <p className="text-sm font-semibold text-yellow-800">Kembalian yang harus diberikan</p>
            <p className="text-2xl font-extrabold text-yellow-600">
              {formatRupiah(changeNeeded)}
            </p>
          </div>
        )}
      </div>

      {/* Selected Change Display */}
      <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm font-semibold text-purple-700">Kembalian Dipilih:</p>
          {currentScreen === "practice-game" && (
            <p className={`text-lg font-bold ${currentTotal > changeNeeded ? "text-red-600" :
              currentTotal < changeNeeded ? "text-yellow-600" : "text-purple-700"
              }`}>
              {formatRupiah(currentTotal)}
            </p>
          )}
        </div>

        {selectedChange.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {Object.entries(getCoinCounts(selectedChange)).map(([value, count]) => (
              <div key={value} className="relative">
                <button
                  onClick={() => onRemoveCoin(selectedChange.indexOf(Number(value)))}
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
          <p className="text-gray-500 text-sm italic py-1">Belum ada uang kembalian dipilih</p>
        )}
      </div>

      {/* Money Options */}
      <div className="flex flex-wrap gap-3 justify-center px-1 py-2">
        {rupiahDenominations.map((denom) => (
          <button
            key={denom.value}
            onClick={() => onCoinClick(gameType, denom.value)}
            disabled={feedback !== null}
            className={`flex flex-col items-center p-2 rounded-lg border-2 ${selectedChange.includes(denom.value)
              ? "border-purple-500 bg-purple-100"
              : "border-gray-200 bg-white hover:border-purple-300"
              } hover:bg-purple-50 transition-colors shadow-sm min-w-[70px]`}
          >
            <img
              src={`/${denom.image}`}
              alt={`Rp${denom.value}`}
              className={`${denom.isBill ? "h-14" : "h-12"} w-auto object-contain`}
            />
            {selectedChange.includes(denom.value) && (
              <div className="absolute -top-1 -right-1 bg-purple-500 rounded-full p-1">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}
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
        Berikan Kembalian
      </button>
    </div>
  )
}

export function KembalianGame({
  itemPrice,
  customerPayment,
  changeNeeded,
  selectedChange,
  currentQuestion,
  totalQuestions,
  onBack,
  onCoinClick,
  onRemoveCoin,
  onCheck,
  getCoinCounts,
  feedback,
  showCompletion,
  currentScreen,
  gameType
}: KembalianGameProps) {
  return (
    <GameLayout
      title="Kembalian"
      currentQuestion={currentQuestion}
      totalQuestions={totalQuestions}
      onBack={onBack}
      feedback={feedback}
      showCompletion={showCompletion}
      currentScreen={currentScreen}
      gameType={gameType}
    >
      <KembalianGameContent
        itemPrice={itemPrice}
        customerPayment={customerPayment}
        changeNeeded={changeNeeded}
        selectedChange={selectedChange}
        currentQuestion={currentQuestion}
        totalQuestions={totalQuestions}
        onBack={onBack}
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