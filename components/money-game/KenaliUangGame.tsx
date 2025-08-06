import { GameLayout } from './GameLayout'
import { RupiahDenomination, Screen } from "@/components/type/MoneyGame"

interface KenaliUangGameProps {
    questionCoin: RupiahDenomination
    coinOptions: number[]
    currentQuestion: number
    totalQuestions: number
    onBack: () => void
    onAnswer: (value: number) => void
    feedback?: 'correct' | 'wrong' | null
    showCompletion: boolean
    currentScreen: Screen
}

const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(amount)
}

export function KenaliUangGame({
    questionCoin,
    coinOptions,
    currentQuestion,
    totalQuestions,
    onBack,
    onAnswer,
    feedback,
    showCompletion,
    currentScreen
}: KenaliUangGameProps) {
    return (
        <GameLayout
            title="Kenali Uang"
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
            onBack={onBack}
            feedback={feedback}
            showCompletion={showCompletion}
        >
            <div className="flex flex-col items-center">
                <div className="bg-white p-8 rounded-2xl shadow-xl mb-8 text-center border-2 border-amber-200 w-full">
                    <p className="text-2xl text-gray-700 font-semibold mb-6">Berapa nilai uang ini?</p>
                    <div className="w-56 h-30 mx-auto relative">
                        {/* Actual Rupiah image */}
                        <img
                            src={`/${questionCoin.image}`}
                            alt={`Uang Rp${questionCoin.value}`}
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                    {coinOptions.map((value) => (
                        <button
                            key={value}
                            onClick={() => onAnswer(value)}
                            disabled={feedback !== null}
                            className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 rounded-xl shadow-md transition-all transform hover:scale-105 active:scale-95 disabled:opacity-70"
                        >
                            <span className="text-xl drop-shadow-md">{formatRupiah(value)}</span>
                        </button>
                    ))}
                </div>
            </div>
        </GameLayout>
    )
}