import { GameLayout } from './GameLayout'
import { rupiahDenominations } from "@/components/type/MoneyGame"

interface KembalianGameProps {
  itemPrice: number
  customerPayment: number
  changeNeeded: number
  selectedChange: number[]
  currentQuestion: number
  totalQuestions: number
  onBack: () => void
  onCoinClick: (value: number) => void
  onCheck: () => void
  feedback?: 'correct' | 'wrong' | null
}

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount)
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
  onCheck,
  feedback
}: KembalianGameProps) {
  const currentTotal = selectedChange.reduce((sum, val) => sum + val, 0)
  
  return (
    <GameLayout
      title="Kembalian"
      currentQuestion={currentQuestion}
      totalQuestions={totalQuestions}
      onBack={onBack}
      feedback={feedback}
    >
      <div className="flex flex-col items-center">
        {/* Transaction Info */}
        <div className="bg-white p-6 rounded-2xl shadow-xl mb-8 text-center border-2 border-purple-200 w-full">
          <div className="grid grid-cols-2 gap-4 text-left mb-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-600 font-medium">Harga Barang:</p>
              <p className="text-2xl font-bold text-purple-600">
                {formatRupiah(itemPrice)}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-gray-600 font-medium">Uang Pelanggan:</p>
              <p className="text-2xl font-bold text-green-600">
                {formatRupiah(customerPayment)}
              </p>
            </div>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300">
            <p className="text-lg text-gray-700 font-semibold">Kembalian yang harus diberikan:</p>
            <p className="text-4xl font-extrabold text-red-600 animate-pulse">
              {formatRupiah(changeNeeded)}
            </p>
          </div>
        </div>

        {/* Coin Selection */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-8 w-full">
          {rupiahDenominations.map((denom) => (
            <button
              key={denom.value}
              onClick={() => onCoinClick(denom.value)}
              disabled={feedback !== null}
              className={`relative rounded-xl overflow-hidden transition-all duration-200 hover:scale-105 active:scale-95 ${
                selectedChange.includes(denom.value)
                  ? "ring-4 ring-purple-500 scale-105"
                  : "ring-2 ring-gray-200"
              }`}
            >
              <div
                className={`${denom.isBill ? "w-[120px] h-[70px]" : "w-[80px] h-[80px]"} ${
                  denom.color
                } flex items-center justify-center text-white font-bold text-sm rounded-lg shadow-md`}
              >
                {formatRupiah(denom.value).replace("Rp", "")}
              </div>
              {selectedChange.includes(denom.value) && (
                <div className="absolute inset-0 flex items-center justify-center bg-purple-500/30 rounded-lg">
                  <span className="text-white text-xl font-bold">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Current Change */}
        <div className="bg-purple-100 p-4 rounded-xl shadow-inner mb-6 w-full text-center border border-purple-300">
          <p className="text-lg text-purple-800 font-semibold">Kembalian Pilihanmu:</p>
          <p className={`text-4xl font-bold ${
            currentTotal > changeNeeded ? "text-red-600" : "text-purple-700"
          }`}>
            {formatRupiah(currentTotal)}
          </p>
        </div>

        {/* Give Change Button */}
        <button
          onClick={onCheck}
          disabled={feedback !== null || selectedChange.length === 0}
          className="w-full max-w-xs h-14 text-2xl font-bold rounded-xl shadow-lg bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
        >
          Berikan Kembalian
        </button>
      </div>
    </GameLayout>
  )
}