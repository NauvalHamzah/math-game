"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function TutorialDialog() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="absolute bottom-4 right-4 bg-gameOrange-300 text-gameOrange-900 hover:bg-gameOrange-400"
        >
          Panduan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gameOrange-700">Cara Bermain Money-Match</DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Pelajari cara bermain setiap mode game untuk menguasai Rupiah!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-gray-700">
          <h3 className="font-semibold text-lg text-gameGreen-700">Mode Belajar:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <span className="font-medium">Kenali Uang:</span> Cocokkan gambar uang dengan nilainya.
            </li>
            <li>
              <span className="font-medium">Hitung Uang:</span> Jumlahkan uang yang kamu pilih hingga mencapai target.
            </li>
            <li>
              <span className="font-medium">Beli Barang:</span> Pilih uang yang tepat untuk membayar harga barang.
            </li>
            <li>
              <span className="font-medium">Kembalian:</span> Hitung berapa kembalian yang harus diberikan.
            </li>
          </ul>
          <h3 className="font-semibold text-lg text-gameGreen-700">Mode Tantangan:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Uji kecepatanmu dalam menghitung dan bertransaksi dengan waktu terbatas!</li>
            <li>Raih skor tertinggi dan jadilah juara Rupiah!</li>
          </ul>
        </div>
        <Button
          onClick={() => setIsOpen(false)}
          className="w-full bg-gameOrange-500 hover:bg-gameOrange-600 text-white font-bold py-2 px-4 rounded"
        >
          Mengerti!
        </Button>
      </DialogContent>
    </Dialog>
  )
}
