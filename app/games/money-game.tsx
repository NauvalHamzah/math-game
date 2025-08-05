"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Clock, CheckCircle, XCircle } from "lucide-react"
import HomeScreen from "@/components/money-game/home-screen"
import PracticeModeScreen from '@/components/money-game/practice-screen'
import { Screen, GameType, items, rupiahDenominations, RupiahDenomination } from "@/components/type/MoneyGame"
import { KenaliUangGame } from "@/components/money-game/KenaliUangGame"
import { BeliBarangGame } from "@/components/money-game/BeliBarangGame"
import { KembalianGame } from "@/components/money-game/KembalianGame"

export default function MoneyMatchGame() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [currentGame, setCurrentGame] = useState<GameType>("kenali-uang")

  // Common game state
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [showCompletion, setShowCompletion] = useState(false);
  const totalQuestions = 3


  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)

  // Kenali Uang state
  const [questionCoin, setQuestionCoin] = useState<RupiahDenomination>(rupiahDenominations[0])
  const [coinOptions, setCoinOptions] = useState<number[]>([])
  const [previousQuestion, setPreviousQuestion] = useState<RupiahDenomination>(rupiahDenominations[0]);


  // Beli Barang state
  const [currentItem, setCurrentItem] = useState(items[0])
  const [selectedCoins, setSelectedCoins] = useState<number[]>([])

  // Kembalian state
  const [customerPayment, setCustomerPayment] = useState(0)
  const [itemPrice, setItemPrice] = useState(0)
  const [changeNeeded, setChangeNeeded] = useState(0)
  const [selectedChange, setSelectedChange] = useState<number[]>([])

  const getRandomQuestion = () => {
  const availableCoins = rupiahDenominations.filter(
    coin => !previousQuestion || coin.value !== previousQuestion.value
  );
  
  const randomCoin = availableCoins[
    Math.floor(Math.random() * availableCoins.length)
  ];
  
  setPreviousQuestion(randomCoin);
  return randomCoin;
};

  const generateCoinOptions = (correctCoin: RupiahDenomination) => {
  // Filter out the correct answer and same value different type
  const otherOptions = rupiahDenominations.filter(coin => 
    coin.value !== correctCoin.value && 
    !(coin.value === correctCoin.value && coin.isBill !== correctCoin.isBill)
  );

  // Shuffle and take 3
  const shuffled = [...otherOptions].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);

  // Combine with correct answer and shuffle
  return [correctCoin, ...selected]
    .sort(() => 0.5 - Math.random())
    .map(coin => coin.value);
};

  const resetGame = () => {
    setFeedback(null);

    try {
      if (currentGame === "kenali-uang") {
    const randomCoin = getRandomQuestion();
    setQuestionCoin(randomCoin);
    setCoinOptions(generateCoinOptions(randomCoin));
  } else if (currentGame === "beli-barang") {
        if (items.length === 0) throw new Error('No items available');
        const randomItem = items[
          Math.floor(Math.random() * items.length)
        ];
        setCurrentItem(randomItem);
        setSelectedCoins([]);

      } else if (currentGame === "kembalian") {
        if (items.length === 0) throw new Error('No items available');
        const item = items[
          Math.floor(Math.random() * items.length)
        ];
        // Ensure payment is always more than price
        const payment = item.price + Math.max(
          1000,
          Math.floor(Math.random() * 20000) + 1000
        );
        setItemPrice(item.price);
        setCustomerPayment(payment);
        setChangeNeeded(payment - item.price);
        setSelectedChange([]);
      }
    } catch (error) {
      console.error('Error resetting game:', error);
      // Fallback to default values
      setCurrentScreen("practice");
    }
  };

const handleCorrectAnswer = () => {
  setFeedback("correct");
  setTimeout(() => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      resetGame();
    } else {
      setShowCompletion(true);
      setTimeout(() => {
        setCurrentQuestion(1);
        setCurrentScreen("practice");
        setShowCompletion(false);
      }, 3000);
    }
  }, 1500);
};

  const handleWrongAnswer = () => {
    setFeedback("wrong")
    setTimeout(() => {
      setFeedback(null)
      // Reset selections based on game type
      if (currentGame === "beli-barang") setSelectedCoins([])
      if (currentGame === "kembalian") setSelectedChange([])
    }, 1500)
  }

  const handleCoinClick = (value: number) => {
    if (currentGame === "beli-barang") {
      setSelectedCoins(prev => [...prev, value]); // Always add, no toggle
    } else if (currentGame === "kembalian") {
      setSelectedChange((prev) => {
        const index = prev.indexOf(value)
        if (index > -1) {
          const newArr = [...prev]
          newArr.splice(index, 1)
          return newArr
        } else {
          return [...prev, value]
        }
      })
    }
  }

  const handleResetCoins = () => {
    setSelectedCoins([]);
  };

  const getCoinCounts = (coins: number[]) => {
  return coins.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);
};

  const handleRemoveCoin = (index: number) => {
  setSelectedCoins(prev => {
    const newSelection = [...prev];
    newSelection.splice(index, 1); // Remove the coin at this index
    return newSelection;
  });
};

  const handleCheck = () => {
    if (currentGame === "beli-barang") {
      const currentTotal = selectedCoins.reduce((sum, val) => sum + val, 0)
      if (currentTotal === currentItem.price) {
        handleCorrectAnswer()
      } else {
        handleWrongAnswer()
      }
    } else if (currentGame === "kembalian") {
      const currentTotal = selectedChange.reduce((sum, val) => sum + val, 0)
      if (currentTotal === changeNeeded) {
        handleCorrectAnswer()
      } else {
        handleWrongAnswer()
      }
    }
  }

  const handleCoinIdentification = (selectedValue: number) => {
    if (selectedValue === questionCoin.value) {
      handleCorrectAnswer()
    } else {
      handleWrongAnswer()
    }
  }

  const startGame = (gameType: GameType) => {
    setCurrentGame(gameType)
    setCurrentScreen("practice-game")
    setCurrentQuestion(1)
    resetGame()
  }

  useEffect(() => {
    if (currentScreen === "practice-game") {
      resetGame()
    }
  }, [currentGame])

  // Home Screen
  if (currentScreen === "home") {
    return <HomeScreen setCurrentScreen={setCurrentScreen} />
  }

  // Practice Mode Screen
  if (currentScreen === "practice") {
    return (
      <PracticeModeScreen
        setCurrentScreen={setCurrentScreen}
        startGame={(gameType) => {
          // Handle game start logic here
          setCurrentScreen("practice-game")
          startGame(gameType)
        }}
      />
    )
  }

  // Challenge Mode Screen
  if (currentScreen === "challenge") {
    const challenges = [
      { title: "Cepat Hitung!", timeLimit: "60 detik", highScore: "Rp150.000" },
      { title: "Toko Cepat", timeLimit: "90 detik", highScore: "Rp250.000" },
      { title: "Kembalian Tepat", timeLimit: "45 detik", highScore: "Rp100.000" },
    ]

    return (
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gameOrange-50 to-gameGreen-50 p-4 relative">
        <Button
          onClick={() => setCurrentScreen("home")}
          className="absolute top-4 left-4 z-10"
          variant="ghost"
          size="icon"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>

        <h1 className="text-4xl font-extrabold text-gameGreen-700 mb-8 mt-12 drop-shadow-md">Mode Tantangan</h1>
        <p className="text-lg text-gameOrange-800 mb-8 text-center max-w-md">
          Uji kecepatanmu dalam menghitung Rupiah!
        </p>

        <div className="flex overflow-x-auto pb-4 space-x-6 px-4 md:justify-center w-full max-w-4xl">
          {challenges.map((challenge) => (
            <Card
              key={challenge.title}
              className="w-[300px] flex-shrink-0 bg-white shadow-md rounded-lg border-2 border-gameGreen-300"
            >
              <CardHeader className="flex flex-col items-center p-4 pb-2">
                <Clock className="h-12 w-12 text-gameOrange-600 mb-2" />
                <CardTitle className="text-xl font-bold text-gameGreen-700 text-center">{challenge.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center py-2">
                <p className="text-gray-600 text-sm mb-1">Waktu: {challenge.timeLimit}</p>
                <p className="text-gameOrange-500 font-semibold text-lg">Skor Tertinggi: {challenge.highScore}</p>
              </CardContent>
              <CardFooter className="p-4 pt-2">
                <Button className="w-full bg-gameOrange-500 hover:bg-gameOrange-600 text-white font-bold py-2 rounded-md">
                  Mulai Tantangan
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Game Screen
  if (currentScreen === "practice-game") {
    switch (currentGame) {
      case "kenali-uang":
        return (
          <KenaliUangGame
            questionCoin={questionCoin}
            coinOptions={coinOptions}
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
            onBack={() => setCurrentScreen("practice")}
            onAnswer={handleCoinIdentification}
            feedback={feedback}
            showCompletion={showCompletion}
          />
        )
      case "beli-barang":
        return (
          <BeliBarangGame
            currentItem={currentItem}
            selectedCoins={selectedCoins}
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
            onBack={() => setCurrentScreen("practice")}
            onResetCoins={handleResetCoins}
            onCoinClick={handleCoinClick}
            onRemoveCoin={handleRemoveCoin}
            onCheck={handleCheck}
            getCoinCounts={getCoinCounts}
            feedback={feedback}
            showCompletion={showCompletion}
          />
        )
      case "kembalian":
        return (
          <KembalianGame
            itemPrice={itemPrice}
            customerPayment={customerPayment}
            changeNeeded={changeNeeded}
            selectedChange={selectedChange}
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
            onBack={() => setCurrentScreen("practice")}
            onCoinClick={handleCoinClick}
            onCheck={handleCheck}
            feedback={feedback}
          />
        )
      default:
        return null
    }
  }

  return null
}
