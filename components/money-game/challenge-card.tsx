import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

interface ChallengeCardProps {
  title: string
  timeLimit: string
  highScore: string
  href: string
}

export function ChallengeCard({ title, timeLimit, highScore, href }: ChallengeCardProps) {
  return (
    <Card className="w-[300px] flex-shrink-0 bg-white shadow-md rounded-lg overflow-hidden border-2 border-gameGreen-300">
      <CardHeader className="flex flex-col items-center p-4 pb-2">
        <Clock className="h-12 w-12 text-gameOrange-600 mb-2" />
        <CardTitle className="text-xl font-bold text-gameGreen-700 text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center py-2">
        <p className="text-gray-600 text-sm mb-1">Waktu: {timeLimit}</p>
        <p className="text-gameOrange-500 font-semibold text-lg">Skor Tertinggi: {highScore}</p>
      </CardContent>
      <CardFooter className="p-4 pt-2">
        <Link href={href} passHref className="w-full">
          <Button className="w-full bg-gameOrange-500 hover:bg-gameOrange-600 text-white font-bold py-2 rounded-md transition-colors">
            Mulai Tantangan
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
