"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle, RotateCcw, Send } from "lucide-react"

type NumberCard = {
  id: number
  value: number
  display: string
  type: "decimal" | "fraction" | "percentage"
  numerator?: number
  denominator?: number
}

type Operation = "addition" | "subtraction" | "multiplication" | "mixed"
type Difficulty = "easy" | "medium" | "hard"

export default function MathGame() {
  const [target, setTarget] = useState(2.5)
  const [targetDisplay, setTargetDisplay] = useState("2.5")
  const [targetType, setTargetType] = useState<"decimal" | "fraction" | "percentage">("decimal")
  const [targetNumerator, setTargetNumerator] = useState<number>()
  const [targetDenominator, setTargetDenominator] = useState<number>()
  const [operation, setOperation] = useState<Operation>("addition")
  const [difficulty, setDifficulty] = useState<Difficulty>("easy")
  const [selectedCards, setSelectedCards] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [cards, setCards] = useState<NumberCard[]>([])
  const [requiredCards, setRequiredCards] = useState(2)

  // Set required cards based on difficulty and operation
  useEffect(() => {
    let cardCount: number

    switch (difficulty) {
      case "easy":
        cardCount = 2
        break
      case "medium":
        cardCount = Math.floor(Math.random() * 2) + 2 // 2-3 cards
        break
      case "hard":
        cardCount = Math.floor(Math.random() * 3) + 3 // 3-5 cards
        break
    }

    // Adjust for operation type
    if (operation === "subtraction") {
      cardCount = 2 // Always 2 for subtraction
    } else if (operation === "multiplication" && cardCount > 3) {
      cardCount = 3 // Max 3 for multiplication
    }

    setRequiredCards(cardCount)
  }, [difficulty, operation])

  // Generate unique random cards with guaranteed solution
  const generateCards = () => {
    const newCards: NumberCard[] = []
    const usedValues = new Set<number>()
    let id = 1

    // Generate target based on operation and difficulty
    let targetValue: number
    let targetDisplayValue: string
    let targetTypeValue: "decimal" | "fraction" | "percentage" = "decimal"
    let targetNum: number | undefined
    let targetDenom: number | undefined

    if (operation === "addition") {
      targetValue = Math.round((Math.random() * 4 + 1) * 4) / 4 // 1-5, quarter increments
    } else if (operation === "subtraction") {
      targetValue = Math.round((Math.random() * 3 + 0.5) * 4) / 4 // 0.5-3.5
    } else if (operation === "multiplication") {
      targetValue = Math.round((Math.random() * 6 + 1) * 4) / 4 // 1-7
    } else {
      targetValue = Math.round((Math.random() * 4 + 1) * 4) / 4 // 1-5
    }

    // Format target display based on difficulty
    const formatChoice = Math.random()

    if (difficulty === "medium" && formatChoice < 0.4) {
      // Show as percentage
      targetDisplayValue = `${Math.round(targetValue * 100)}%`
      targetTypeValue = "percentage"
    } else if (difficulty === "hard" && formatChoice < 0.4) {
      // Try to show as fraction
      const denominators = [2, 3, 4, 5, 8]
      let fractionFound = false

      for (const denom of denominators) {
        const num = Math.round(targetValue * denom)
        if (Math.abs(num / denom - targetValue) < 0.01 && num > 0) {
          targetDisplayValue = "fraction"
          targetTypeValue = "fraction"
          targetNum = num
          targetDenom = denom
          fractionFound = true
          break
        }
      }

      if (!fractionFound) {
        targetDisplayValue = targetValue.toString()
        targetTypeValue = "decimal"
      }
    } else if ((difficulty === "medium" || difficulty === "hard") && formatChoice < 0.7) {
      // Show as percentage
      targetDisplayValue = `${Math.round(targetValue * 100)}%`
      targetTypeValue = "percentage"
    } else {
      // Show as decimal
      targetDisplayValue = targetValue.toString()
      targetTypeValue = "decimal"
    }

    setTarget(targetValue)
    setTargetDisplay(targetDisplayValue)
    setTargetType(targetTypeValue)
    setTargetNumerator(targetNum)
    setTargetDenominator(targetDenom)

    // Create solution cards
    const createSolutionCards = () => {
      const solutionCards: NumberCard[] = []

      if (operation === "addition") {
        let remaining = targetValue
        let attempts = 0
        while (remaining > 0.1 && solutionCards.length < requiredCards && attempts < 20) {
          const maxValue = Math.min(remaining, targetValue * 0.8)
          let cardValue = Math.round(Math.random() * maxValue * 4) / 4
          if (cardValue < 0.25) cardValue = 0.25

          if (!usedValues.has(cardValue) && cardValue <= remaining) {
            const card = createCard(id++, cardValue)
            if (card) {
              solutionCards.push(card)
              usedValues.add(cardValue)
              remaining -= cardValue
            }
          }
          attempts++
        }
      } else if (operation === "subtraction") {
        // Create two cards where first - second = target
        const firstValue = Math.round((targetValue + Math.random() * 3 + 1) * 4) / 4
        const secondValue = Math.round((firstValue - targetValue) * 4) / 4

        const card1 = createCard(id++, firstValue)
        const card2 = createCard(id++, secondValue)
        if (card1 && card2) {
          solutionCards.push(card1, card2)
          usedValues.add(firstValue)
          usedValues.add(secondValue)
        }
      } else if (operation === "multiplication") {
        // Create cards that multiply to target
        const factors = getFactors(targetValue, requiredCards)
        for (let i = 0; i < Math.min(requiredCards, factors.length); i++) {
          if (!usedValues.has(factors[i])) {
            const card = createCard(id++, factors[i])
            if (card) {
              solutionCards.push(card)
              usedValues.add(factors[i])
            }
          }
        }
      } else if (operation === "mixed") {
        // Create a mix that works with alternating operations
        if (requiredCards === 2) {
          const card1Value = Math.round((targetValue / 2) * 4) / 4
          const card2Value = Math.round((targetValue - card1Value) * 4) / 4

          const card1 = createCard(id++, card1Value)
          const card2 = createCard(id++, card2Value)
          if (card1 && card2) {
            solutionCards.push(card1, card2)
            usedValues.add(card1Value)
            usedValues.add(card2Value)
          }
        }
      }

      return solutionCards
    }

    const createCard = (cardId: number, value: number): NumberCard | null => {
      if (usedValues.has(value)) return null

      let card: NumberCard

      if (difficulty === "easy") {
        card = {
          id: cardId,
          value,
          display: value.toString(),
          type: "decimal",
        }
      } else if (difficulty === "medium") {
        const usePercentage = Math.random() < 0.3
        if (usePercentage && value <= 2) {
          card = {
            id: cardId,
            value,
            display: `${Math.round(value * 100)}%`,
            type: "percentage",
          }
        } else {
          card = {
            id: cardId,
            value,
            display: value.toString(),
            type: "decimal",
          }
        }
      } else {
        const cardType = Math.random()
        if (cardType < 0.35) {
          // Try to create fraction
          const denominators = [2, 3, 4, 5, 8]
          let fractionCreated = false
          for (const denom of denominators) {
            const num = Math.round(value * denom)
            if (Math.abs(num / denom - value) < 0.01 && num > 0) {
              card = {
                id: cardId,
                value,
                display: "fraction",
                type: "fraction",
                numerator: num,
                denominator: denom,
              }
              fractionCreated = true
              break
            }
          }
          if (!fractionCreated) {
            card = {
              id: cardId,
              value,
              display: value.toString(),
              type: "decimal",
            }
          }
        } else if (cardType < 0.65 && value <= 2) {
          card = {
            id: cardId,
            value,
            display: `${Math.round(value * 100)}%`,
            type: "percentage",
          }
        } else {
          card = {
            id: cardId,
            value,
            display: value.toString(),
            type: "decimal",
          }
        }
      }

      return card
    }

    const getFactors = (num: number, maxFactors: number): number[] => {
      const factors: number[] = []
      const rounded = Math.round(num * 4) / 4

      // Generate factors that multiply to the target
      if (maxFactors === 2) {
        if (rounded <= 1) {
          factors.push(rounded, 1)
        } else if (rounded === 2) {
          factors.push(2, 1)
        } else if (rounded === 4) {
          factors.push(2, 2)
        } else if (rounded === 6) {
          factors.push(3, 2)
        } else {
          factors.push(rounded, 1)
        }
      } else if (maxFactors === 3) {
        if (rounded === 6) {
          factors.push(3, 2, 1)
        } else if (rounded === 8) {
          factors.push(2, 2, 2)
        } else {
          factors.push(rounded, 1, 1)
        }
      }

      return factors
    }

    // Generate solution cards
    const solutionCards = createSolutionCards()
    newCards.push(...solutionCards)

    // Fill remaining slots with unique random cards
    while (newCards.length < 15) {
      let value: number
      let attempts = 0
      do {
        value = Math.round(Math.random() * 5 * 4) / 4
        attempts++
      } while (usedValues.has(value) && attempts < 20)

      if (!usedValues.has(value)) {
        const card = createCard(id++, value)
        if (card) {
          newCards.push(card)
          usedValues.add(value)
        }
      }
    }

    // Shuffle the cards
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newCards[i], newCards[j]] = [newCards[j], newCards[i]]
    }

    setCards(newCards)
  }

  useEffect(() => {
    generateCards()
  }, [difficulty, operation, requiredCards])

  const handleCardClick = (cardId: number) => {
    if (selectedCards.includes(cardId)) {
      setSelectedCards((prev) => prev.filter((id) => id !== cardId))
    } else if (selectedCards.length < requiredCards) {
      setSelectedCards((prev) => [...prev, cardId])
    }
    setShowResult(false)
  }

  const calculateResult = () => {
    if (selectedCards.length === 0) return 0

    const selectedValues = selectedCards.map((id) => cards.find((card) => card.id === id)?.value || 0)

    switch (operation) {
      case "addition":
        return selectedValues.reduce((sum, value) => sum + value, 0)
      case "subtraction":
        return selectedValues.length >= 2
          ? selectedValues[0] - selectedValues.slice(1).reduce((sum, val) => sum + val, 0)
          : selectedValues[0] || 0
      case "multiplication":
        return selectedValues.reduce((product, value) => product * value, 1)
      case "mixed":
        // For mixed, alternate between operations
        if (selectedValues.length === 1) return selectedValues[0]
        let result = selectedValues[0]
        for (let i = 1; i < selectedValues.length; i++) {
          if (i % 2 === 1) {
            result += selectedValues[i] // Add
          } else {
            result *= selectedValues[i] // Multiply
          }
        }
        return result
      default:
        return selectedValues.reduce((sum, value) => sum + value, 0)
    }
  }

  const getOperationSymbol = (index: number) => {
    switch (operation) {
      case "addition":
        return "+"
      case "subtraction":
        return index === 0 ? "" : "−"
      case "multiplication":
        return "×"
      case "mixed":
        return index % 2 === 1 ? "+" : "×"
      default:
        return "+"
    }
  }

  const handleSubmit = () => {
    if (selectedCards.length === requiredCards) {
      setShowResult(true)
    }
  }

  const handleReset = () => {
    setSelectedCards([])
    setShowResult(false)
  }

  const handleNewGame = () => {
    setSelectedCards([])
    setShowResult(false)
    generateCards()
  }

  const isCorrect = Math.abs(calculateResult() - target) < 0.01

  const FractionDisplay = ({ numerator, denominator }: { numerator: number; denominator: number }) => (
    <div className="flex flex-col items-center">
      <div className="text-lg font-bold leading-none">{numerator}</div>
      <div className="w-full h-0.5 bg-current my-0.5"></div>
      <div className="text-lg font-bold leading-none">{denominator}</div>
    </div>
  )

  const TargetDisplay = () => {
    if (targetType === "fraction" && targetNumerator && targetDenominator) {
      return <FractionDisplay numerator={targetNumerator} denominator={targetDenominator} />
    }
    return <span>{targetDisplay}</span>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      {/* Top Navigation */}
      <div className="bg-white shadow-lg border-b-4 border-purple-300 p-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-purple-800">🎯 Math Challenge</h1>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">🔢 Mode:</span>
              <Select value={operation} onValueChange={(value: Operation) => setOperation(value)}>
                <SelectTrigger className="w-40 border-2 border-blue-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="addition">➕ Addition</SelectItem>
                  <SelectItem value="subtraction">➖ Subtraction</SelectItem>
                  <SelectItem value="multiplication">✖️ Multiplication</SelectItem>
                  <SelectItem value="mixed">🔀 Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-700">📊 Level:</span>
              <Select value={difficulty} onValueChange={(value: Difficulty) => setDifficulty(value)}>
                <SelectTrigger className="w-40 border-2 border-green-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">😊 Easy</SelectItem>
                  <SelectItem value="medium">🤔 Medium</SelectItem>
                  <SelectItem value="hard">🤯 Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleNewGame}
              variant="outline"
              className="border-2 border-purple-400 text-purple-600 hover:bg-purple-50 bg-transparent"
            >
              🎲 New Game
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {/* Target */}
        <div className="text-center mb-6">
          <div className="bg-yellow-200 border-4 border-yellow-400 rounded-2xl p-4 inline-block">
            <p className="text-2xl md:text-3xl font-bold text-yellow-800 flex items-center gap-2">
              Target: <TargetDisplay />
            </p>
          </div>
        </div>

        {/* Selected Cards Area */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 min-h-[200px]">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">📝 Your Expression</h3>

          {/* Placeholder Squares and Selected Cards */}
          <div className="flex flex-wrap justify-center gap-4 mb-6 min-h-[80px] items-center">
            {Array.from({ length: requiredCards }, (_, index) => {
              const cardId = selectedCards[index]
              const card = cardId ? cards.find((c) => c.id === cardId) : null

              return (
                <div key={index} className="flex items-center">
                  {index > 0 && (
                    <span className="text-2xl font-bold text-gray-600 mx-2">{getOperationSymbol(index)}</span>
                  )}

                  {card ? (
                    <Card className="bg-blue-100 border-2 border-blue-400 shadow-md animate-in slide-in-from-bottom-4 duration-300">
                      <CardContent className="p-3 text-center min-w-[60px] min-h-[60px] flex items-center justify-center py-3 px-3">
                        <div className="text-lg font-bold text-blue-700">
                          {card.type === "fraction" ? (
                            <FractionDisplay numerator={card.numerator!} denominator={card.denominator!} />
                          ) : (
                            card.display
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="bg-gray-200 border-2 border-gray-300 border-dashed">
                      <CardContent className="p-3 text-center min-w-[60px] min-h-[60px] flex items-center justify-center">
                        <div className="text-gray-400 text-2xl">?</div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleSubmit}
              disabled={selectedCards.length !== requiredCards}
              className="bg-green-500 hover:bg-green-600 text-white text-lg py-3 px-6 rounded-xl shadow-lg disabled:opacity-50"
            >
              <Send className="w-5 h-5 mr-2" />
              Submit Answer
            </Button>

            <Button
              onClick={handleReset}
              variant="outline"
              className="border-2 border-orange-400 text-orange-600 hover:bg-orange-50 text-lg py-3 px-6 rounded-xl shadow-lg bg-transparent"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>

          {/* Result Display */}
          {showResult && (
            <div className="mt-6 text-center">
              {isCorrect ? (
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <CheckCircle className="w-8 h-8" />
                  <span className="text-2xl font-bold">Correct! Great job! 🎉</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-red-600">
                  <XCircle className="w-8 h-8" />
                  <span className="text-2xl font-bold">Try again! You got {calculateResult().toFixed(2)} 🤔</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Cards Grid */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🃏 Choose Your Numbers</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {cards.map((card) => {
              const isSelected = selectedCards.includes(card.id)
              const isDisabled = !isSelected && selectedCards.length >= requiredCards

              return (
                <Card
                  key={card.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? "bg-red-100 border-2 border-red-400 scale-95"
                      : isDisabled
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:scale-105 hover:shadow-md bg-white"
                  }`}
                  onClick={() => !isDisabled && handleCardClick(card.id)}
                >
                  <CardContent className="p-4 text-center min-h-[80px] flex items-center justify-center">
                    <div
                      className={`text-xl md:text-2xl font-bold ${
                        isSelected
                          ? "text-red-600"
                          : card.type === "decimal"
                            ? "text-blue-600"
                            : card.type === "fraction"
                              ? "text-purple-600"
                              : "text-orange-600"
                      }`}
                    >
                      {card.type === "fraction" ? (
                        <FractionDisplay numerator={card.numerator!} denominator={card.denominator!} />
                      ) : (
                        card.display
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
          <h4 className="text-lg font-bold text-blue-800 mb-2">📚 How to Play:</h4>
          <ul className="text-blue-700 space-y-1">
            <li>• Select exactly {requiredCards} cards to fill all the slots</li>
            <li>• Selected cards will appear in the expression area above</li>
            <li>• Try to make your result equal the target number</li>
            <li>• You must fill all slots before submitting</li>
            <li>• Click Reset to clear your selection or New Game for fresh cards</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
