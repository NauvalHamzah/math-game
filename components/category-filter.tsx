"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import TagDisplay from "@/components/tag-display"


const categories = ["Semua", "Bilangan", "Geometri", "Logika", "Aljabar"]

export default function CategoryFilter({
  selected,
  onChange,
}: {
  selected: string[]
  onChange: (newValues: string[]) => void
}) {
  const toggleValue = (value: string) => {
    if (value === "Semua") {
      onChange(["Semua"])
    } else {
      const newValues = selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected.filter((v) => v !== "Semua"), value]

      onChange(newValues.length > 0 ? newValues : ["Semua"])
    }
  }

  const display = selected.includes("Semua") ? ["Semua"] : selected

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start flex-wrap items-center gap-2 py-2 px-3 text-left border-purple-300 text-purple-700 hover:bg-purple-50"
        >
            📚 Topik:
          <div className="flex-1 ml-2">
            <TagDisplay filter="category" tags={display} />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-72 max-h-72 overflow-y-auto space-y-2"
        align="start"
        sideOffset={8}
      >
        {categories.map((category) => {
          const isSelected = selected.includes(category)
          return (
            <Button
              key={category}
              onClick={() => toggleValue(category)}
              variant={isSelected ? "default" : "outline"}
              className={`w-full justify-start ${
                isSelected
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "border-purple-300 text-purple-700 hover:bg-purple-50"
              }`}
            >
              {isSelected && <Check className="mr-2 h-4 w-4" />}
              {category}
            </Button>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
