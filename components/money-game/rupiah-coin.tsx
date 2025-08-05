"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface RupiahCoinProps {
  value: number
  imageSrc: string
  onClick: (value: number) => void
  isSelected: boolean
  isBill?: boolean
}

export function RupiahCoin({ value, imageSrc, onClick, isSelected, isBill = false }: RupiahCoinProps) {
  const width = isBill ? 180 : 64
  const height = isBill ? 100 : 64

  return (
    <button
      onClick={() => onClick(value)}
      className={cn(
        "relative rounded-full overflow-hidden transition-all duration-200 ease-in-out",
        "hover:scale-105 active:scale-95",
        isSelected ? "ring-4 ring-gameOrange-500 scale-105" : "ring-0",
        isBill ? "rounded-lg" : "rounded-full",
      )}
      aria-label={`Rupiah ${value}`}
    >
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={`Rupiah ${value}`}
        width={width}
        height={height}
        className={cn("object-contain", isBill ? "w-[180px] h-[100px]" : "w-[64px] h-[64px]")}
      />
      {isSelected && (
        <div className="absolute inset-0 flex items-center justify-center bg-gameOrange-500/30 rounded-full">
          <span className="text-white text-2xl font-bold">✓</span>
        </div>
      )}
    </button>
  )
}
