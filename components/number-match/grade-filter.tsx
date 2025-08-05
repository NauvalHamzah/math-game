"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import TagDisplay from "@/components/number-match/tag-display"

const grades = ["Semua", "Kelas 1", "Kelas 2", "Kelas 3", "Kelas 4", "Kelas 5", "Kelas 6"]

export default function GradeFilter({
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
          className="w-full justify-start flex-wrap items-center gap-2 py-2 px-3 text-left border-blue-300 text-blue-700 hover:bg-blue-50"
        >
          🎓 Kelas:
          <div className="flex-1 ml-2">
            <TagDisplay filter="grade" tags={display} />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-72 max-h-72 overflow-y-auto space-y-2"
        align="start"
        sideOffset={8}
      >
        {grades.map((grade) => {
          const isSelected = selected.includes(grade)
          return (
            <Button
              key={grade}
              onClick={() => toggleValue(grade)}
              variant={isSelected ? "default" : "outline"}
              className={`w-full justify-start ${isSelected
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "border-blue-300 text-blue-700 hover:bg-blue-50"
                }`}
            >
              {isSelected && <Check className="mr-2 h-4 w-4" />}
              {grade}
            </Button>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
