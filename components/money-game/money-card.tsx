import type React from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface MoneyCardProps {
  title: string
  icon: React.ReactNode
  difficulty: number // 1 to 3 stars
  href: string
}

export function MoneyCard({ title, icon, difficulty, href }: MoneyCardProps) {
  return (
    <Card className="w-[280px] flex-shrink-0 bg-white shadow-md rounded-lg overflow-hidden border-2 border-gameOrange-300">
      <CardHeader className="flex flex-col items-center p-4 pb-2">
        <div className="text-5xl text-gameGreen-600 mb-2">{icon}</div>
        <CardTitle className="text-xl font-bold text-gameOrange-700 text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center py-2">
        <div className="flex">
          {Array.from({ length: 3 }).map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${i < difficulty ? "text-gameOrange-400 fill-gameOrange-400" : "text-gray-300"}`}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-2">
        <Link href={href} passHref className="w-full">
          <Button className="w-full bg-gameGreen-500 hover:bg-gameGreen-600 text-white font-bold py-2 rounded-md transition-colors">
            Mulai
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
