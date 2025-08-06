"use client"

import { useState, useEffect } from "react"
import HomeScreen from "@/components/money-game/home-screen"
import PracticeModeScreen from '@/components/money-game/practice-screen'
import ChallangeModeScreen from '@/components/money-game/challenge-screen'
import { Screen, GameType, items, Item, rupiahDenominations, RupiahDenomination } from "@/components/type/MoneyGame"
import { KenaliUangGame } from "@/components/money-game/KenaliUangGame"
import { BeliBarangGame } from "@/components/money-game/BeliBarangGame"
import { KembalianGame } from "@/components/money-game/KembalianGame"
import { TukarUangGame } from "@/components/money-game/TukarUangGame"

export default function MoneyMatchGame() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [currentGame, setCurrentGame] = useState<GameType>("kenali-uang")

  // Common game state
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [showCompletion, setShowCompletion] = useState(false);
  const totalQuestions = 10


  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null)

  // Kenali Uang state
  const [questionCoin, setQuestionCoin] = useState<RupiahDenomination>(rupiahDenominations[0])
  const [coinOptions, setCoinOptions] = useState<number[]>([])
  const [previousQuestion, setPreviousQuestion] = useState<RupiahDenomination>(rupiahDenominations[0]);


  // Beli Barang state
  const [currentItem, setCurrentItem] = useState<Item>(items[0])
  const [selectedCoins, setSelectedCoins] = useState<number[]>([])

  // Tukar Uang state
  const [targetAmount, setTargetAmount] = useState<number>(rupiahDenominations[0].value)
  const [targetImage, setTargetImage] = useState<string>(rupiahDenominations[0].image)

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

  function getRandomPrice(min: number, max: number): number {
  // Generate random number between min and max, then round to nearest 100
  const randomPrice = Math.floor(Math.random() * (max - min + 1)) + min;
  return Math.round(randomPrice / 100) * 100;
}

  const resetGame = () => {
    setFeedback(null);

    try {
      if (currentGame === "kenali-uang") {
        const randomCoin = getRandomQuestion();
        setQuestionCoin(randomCoin);
        setCoinOptions(generateCoinOptions(randomCoin));
      } 
      else if (currentGame === "beli-barang") {
        if (items.length === 0) throw new Error('No items available');
        const randomItem = items[Math.floor(Math.random() * items.length)];

        // Create the item object with random price
        const itemWithRandomPrice = {
          ...randomItem,
          price: getRandomPrice(randomItem.minPrice, randomItem.maxPrice)
        };

        setCurrentItem(itemWithRandomPrice);
        setSelectedCoins([]);
      }
      else if (currentGame === "tukar-uang") {
        // Get random denomination to exchange (minimum Rp1000)
        const availableDenominations = rupiahDenominations.filter(
          coin => coin.value >= 1000 && 
                (!previousQuestion || coin.value !== previousQuestion.value)
        );
        
        const randomCoin = availableDenominations[
          Math.floor(Math.random() * availableDenominations.length)
        ];
        
        setPreviousQuestion(randomCoin);
        setTargetAmount(randomCoin.value);
        setTargetImage(randomCoin.image);
        setSelectedCoins([]);
      }
      else if (currentGame === "kembalian") {
        if (items.length === 0) throw new Error('No items available');
        const randomItem = items[Math.floor(Math.random() * items.length)];

        // Create the item object with random price
        const itemWithRandomPrice = {
          ...randomItem,
          price: getRandomPrice(randomItem.minPrice, randomItem.maxPrice)
        };

        const { price } = itemWithRandomPrice;


        // Ensure payment is always more than price
        const payment = price + Math.max(
          1000,
          Math.round(Math.random() * 20000/100)*100
        );

        setItemPrice(price);
        setCustomerPayment(payment);
        setChangeNeeded(payment - price);
        setSelectedChange([]);
      }
    }
    catch (error) {
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
      if (currentGame === "tukar-uang") setSelectedCoins([])
      if (currentGame === "kembalian") setSelectedChange([])
    }, 1500)
  }

  const handleCoinClick = (value: number) => {
    if (currentGame === "beli-barang") {
      setSelectedCoins(prev => [...prev, value]); // Always add, no toggle
    } else if (currentGame === "tukar-uang") {
      setSelectedCoins(prev => [...prev, value]); // Always add, no toggle
    } else if (currentGame === "kembalian") {
      setSelectedChange(prev => [...prev, value]); // Always add, no toggle
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
    if (currentGame === "kembalian") {
      setSelectedChange(prev => {
        const newSelection = [...prev];
        newSelection.splice(index, 1); // Remove the coin at this index
        return newSelection;
      });
    } else {
      setSelectedCoins(prev => {
        const newSelection = [...prev];
        newSelection.splice(index, 1); // Remove the coin at this index
        return newSelection;
      });
    }

  };

  const handleCheck = () => {
    if (currentGame === "beli-barang") {
      const currentTotal = selectedCoins.reduce((sum, val) => sum + val, 0)
      if (currentTotal === currentItem.price) {
        handleCorrectAnswer()
      } else {
        handleWrongAnswer()
      }
    } else if (currentGame === "tukar-uang") {
    const currentTotal = selectedCoins.reduce((sum, val) => sum + val, 0);
    if (currentTotal === targetAmount) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer();
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

  const startGame = (gameType: GameType, screen: "practice"|"challenge") => {
    setCurrentGame(gameType)
    setCurrentScreen(`${screen}-game`)
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
        currentScreen={currentScreen}  
        setCurrentScreen={setCurrentScreen}
        startGame={startGame}
      />
    )
  }

  // Challenge Mode Screen
  if (currentScreen === "challenge") {
    return (
      <ChallangeModeScreen
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        startGame={startGame}
      />
    )
  }

  // Practice Game Screen
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
            currentScreen={currentScreen}
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
            currentScreen={currentScreen}
          />
        )
       case "tukar-uang":
        return (
          <TukarUangGame
            targetAmount={targetAmount} // You'll need to set this in your resetGame()
            targetImage={targetImage}    // The image of the money to exchange
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
            currentScreen={currentScreen}
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
            onRemoveCoin={handleRemoveCoin}
            onCheck={handleCheck}
            getCoinCounts={getCoinCounts}            
            feedback={feedback}
            showCompletion={showCompletion}
            currentScreen={currentScreen}
          />
        )
      default:
        return null
    }
  }

  // Challange Game Screen
  if (currentScreen === "challenge-game") {
    switch (currentGame) {
      case "kenali-uang":
        return (
          <KenaliUangGame
            questionCoin={questionCoin}
            coinOptions={coinOptions}
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
            onBack={() => setCurrentScreen("challenge")}
            onAnswer={handleCoinIdentification}
            feedback={feedback}
            showCompletion={showCompletion}
            currentScreen={currentScreen}
          />
        )
      case "beli-barang":
        return (
          <BeliBarangGame
            currentItem={currentItem}
            selectedCoins={selectedCoins}
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
            onBack={() => setCurrentScreen("challenge")}
            onResetCoins={handleResetCoins}
            onCoinClick={handleCoinClick}
            onRemoveCoin={handleRemoveCoin}
            onCheck={handleCheck}
            getCoinCounts={getCoinCounts}
            feedback={feedback}
            showCompletion={showCompletion}
            currentScreen={currentScreen}
          />
        )
      case "tukar-uang":
        return (
          <TukarUangGame
            targetAmount={targetAmount} // You'll need to set this in your resetGame()
            targetImage={targetImage}    // The image of the money to exchange
            selectedCoins={selectedCoins}
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
            onBack={() => setCurrentScreen("challenge")}
            onResetCoins={handleResetCoins}
            onCoinClick={handleCoinClick}
            onRemoveCoin={handleRemoveCoin}
            onCheck={handleCheck}
            getCoinCounts={getCoinCounts}
            feedback={feedback}
            showCompletion={showCompletion}
            currentScreen={currentScreen}
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
            onBack={() => setCurrentScreen("challenge")}
            onCoinClick={handleCoinClick}
            onRemoveCoin={handleRemoveCoin}
            onCheck={handleCheck}
            getCoinCounts={getCoinCounts}
            feedback={feedback}
            showCompletion={showCompletion}
            currentScreen={currentScreen}
          />
        )
      default:
        return null
    }
  }

  return null
}
