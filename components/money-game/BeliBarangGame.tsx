import { GameLayout } from './GameLayout'
import { rupiahDenominations } from "@/components/type/MoneyGame"
import { X } from 'lucide-react' // For the remove button

interface BeliBarangGameProps {
  currentItem: {
    name: string
    price: number
    emoji: string
  }
  selectedCoins: number[]
  currentQuestion: number
  totalQuestions: number
  onBack: () => void
  onResetCoins: () => void
  onCoinClick: (value: number) => void
  onRemoveCoin: (index: number) => void // New prop for removing coins
  onCheck: () => void
  getCoinCounts: (value: number[]) => Record<number, number>
  feedback?: 'correct' | 'wrong' | null
  showCompletion: boolean
}

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount)
}

export function BeliBarangGame({
  currentItem,
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
  showCompletion
}: BeliBarangGameProps) {
  const currentTotal = selectedCoins.reduce((sum, val) => sum + val, 0)
  const coinCounts = getCoinCounts(selectedCoins);


  return (
    <GameLayout
      title="Beli Barang"
      currentQuestion={currentQuestion}
      totalQuestions={totalQuestions}
      onBack={onBack}
      feedback={feedback}
      showCompletion={showCompletion}
    >
      <div className="flex flex-col h-full gap-3">
        {/* Item Display */}
        <div className="bg-white p-4 rounded-xl shadow-md border-2 border-blue-300 text-center">
          <div className="text-5xl mb-1">{currentItem.emoji}</div>
          <p className="text-xl font-bold text-gray-800 mb-1">{currentItem.name}</p>
          <p className="text-3xl font-extrabold text-blue-600 bg-blue-50 rounded-lg py-1">
            {formatRupiah(currentItem.price)}
          </p>
        </div>

        {/* Selected Money */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-xl border border-blue-200">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-blue-700">Uang Dipilih:</p>
              {selectedCoins.length > 0 && (
                <button
                  onClick={onResetCoins}
                  className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200"
                >
                  Reset
                </button>
              )}
            </div>
            <p className={`text-lg font-bold ${currentTotal > currentItem.price ? "text-red-600" : "text-blue-700"
              }`}>
              {formatRupiah(currentTotal)}
            </p>
          </div>

          {selectedCoins.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {Object.entries(getCoinCounts(selectedCoins)).map(([value, count]) => (
                <div key={value} className="relative">
                  {/* Make the button the group */}
                  <button
                    onClick={() => onRemoveCoin(selectedCoins.indexOf(Number(value)))}
                    className="relative group transform hover:scale-105 transition-transform focus:outline-none"
                  >
                    {/* Coin image */}
                    <img
                      src={`/${rupiahDenominations.find(d => d.value === Number(value))?.image}`}
                      alt={`Rp${value}`}
                      className="h-12 w-auto object-contain"
                    />

                    {/* Centered container for count and X */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20">
                      {/* Count badge — always visible */}
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

        {/* Money Options - Removed count badges */}
        <div className="flex flex-wrap gap-3 justify-center px-1 py-2">
          {rupiahDenominations.map((denom) => (
            <button
              key={denom.value}
              onClick={() => onCoinClick(denom.value)}
              disabled={feedback !== null}
              className="flex flex-col items-center p-2 rounded-lg border-2 border-blue-300 bg-white hover:bg-blue-50 hover:border-blue-400 active:bg-blue-100 transition-colors shadow-sm min-w-[70px]"
            >
              <img
                src={`/${denom.image}`}
                alt={`Rp${denom.value}`}
                className={`${denom.isBill ? "h-14" : "h-12"} w-auto object-contain`}
              />
            </button>
          ))}
        </div>

        {/* Pay Button - More attractive */}
        <button
          onClick={onCheck}
          disabled={feedback !== null || selectedCoins.length === 0}
          className={`w-full py-3 text-xl font-bold rounded-xl shadow-lg ${selectedCoins.length > 0
            ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            : "bg-gray-300"
            } text-white transition-all transform hover:scale-[1.01]`}
        >
          Bayar
        </button>
      </div>
    </GameLayout>
  )
}