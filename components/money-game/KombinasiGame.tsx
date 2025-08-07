import { useEffect } from 'react';
import { GameLayout } from './GameLayout'
import { RupiahDenomination, Screen, GameType, Item } from "@/components/type/MoneyGame"
import { KenaliUangGameContent } from './KenaliUangGame';
import { BeliBarangGameContent } from './BeliBarangGame';
import { TukarUangGameContent } from './TukarUangGame';
import { KembalianGameContent } from './KembalianGame';

interface KombinasiGameProps {
    questionCoin: RupiahDenomination
    coinOptions: number[]
    currentQuestion: number
    totalQuestions: number
    onBack: () => void
    onCheck: (game: GameType, value?: number) => void
    feedback?: 'correct' | 'wrong' | null
    showCompletion: boolean
    currentScreen: Screen
    gameType: GameType
    currentItem: Item
    selectedCoins: number[]
    onResetCoins: () => void
    onCoinClick: (gameType: GameType, value: number) => void
    onRemoveCoin: (index: number) => void // New prop for removing coins
    getCoinCounts: (value: number[]) => Record<number, number>
    targetAmount: number
    targetImage: string
    itemPrice: number
    customerPayment: number
    changeNeeded: number
    selectedChange: number[]
}

export function KombinasiGame({
    currentQuestion,
    totalQuestions,
    questionCoin,
    coinOptions,
    onBack,
    onCheck,
    feedback,
    showCompletion,
    currentScreen,
    gameType,
    currentItem,
    selectedCoins,
    onResetCoins,
    onCoinClick,
    onRemoveCoin,
    getCoinCounts,
    targetAmount,
    targetImage,
    itemPrice,
    customerPayment,
    changeNeeded,
    selectedChange
}: KombinasiGameProps) {
    // Define the sequence of games
    const gameSequence: GameType[] = ["kenali-uang", "beli-barang", "tukar-uang", "kembalian"];

    // Determine current sub-game based on question number
    const getCurrentSubGame = () => {
        const gameCount = gameSequence.length;
        const baseQuestions = Math.floor(totalQuestions / gameCount);
        const remainder = totalQuestions % gameCount;

        // Build an array of how many questions per game
        const distribution: number[] = Array(gameCount).fill(baseQuestions);
        for (let i = 0; i < remainder; i++) {
            distribution[i] += 1;
        }

        // Figure out which game this question belongs to
        let questionNumber = currentQuestion;
        for (let i = 0; i < distribution.length; i++) {
            if (questionNumber <= distribution[i]) {
                return gameSequence[i];
            }
            questionNumber -= distribution[i];
        }

        // Fallback
        return gameSequence[0];
    };


    const currentGameType = getCurrentSubGame();

    // Render the appropriate sub-game
    const renderSubGame = () => {
        switch (currentGameType) {
            case "kenali-uang":
                return <KenaliUangGameContent
                    questionCoin={questionCoin}
                    coinOptions={coinOptions}
                    currentQuestion={currentQuestion}
                    totalQuestions={totalQuestions}
                    onBack={onBack}
                    onCheck={onCheck}
                    feedback={feedback}
                    showCompletion={showCompletion}
                    currentScreen={currentScreen}
                    gameType="kenali-uang"
                />;
            case "beli-barang":
                return <BeliBarangGameContent
                    currentItem={currentItem}
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
                    gameType="beli-barang"
                />;
            case "tukar-uang":
                return <TukarUangGameContent
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
                    gameType="tukar-uang"
                />;
            case "kembalian":
                return <KembalianGameContent
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
                    gameType="kembalian"
                />;
            default:
                return null;
        }
    };

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
            {/* Render the current sub-game */}
            {renderSubGame()}
        </GameLayout>
    );
};

// Helper function to get display names
const getGameName = (gameType: GameType) => {
    switch (gameType) {
        case "kenali-uang": return "Kenali Uang";
        case "beli-barang": return "Beli Barang";
        case "tukar-uang": return "Tukar Uang";
        case "kembalian": return "Kembalian";
        default: return "";
    }
};
