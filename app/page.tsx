"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const [revealed, setRevealed] = useState(false)

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="relative w-full max-w-3xl flex items-center justify-center">
          <Card className={`w-full bg-white/80 dark:bg-[#0f0f0f]/90 backdrop-blur-sm shadow-2xl border-pink-200 dark:border-[#1a1a1a] transition-all duration-500 ${revealed ? '' : 'blur-md'}`}>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl font-bold text-red-600 dark:text-red-500 flex items-center justify-center gap-2">
                  meu amorzinho
              </CardTitle>
            </CardHeader>
            <br />

            <CardContent className="text-center space-y-6 px-4 md:px-8">
              <div className="space-y-4">
                {/* <p className="text-xl text-gray-700 dark:text-[#e0e0e0]">
                  "Cada momento ao seu lado é uma página de um livro que nunca quero parar de ler."
                </p> */}

                <p className="text-lg text-gray-600 dark:text-[#c0c0c0]">
                  nesse dia especial, quero celebrar não apenas o nosso amor, mas todas as pequenas coisas que tornam
                  nossa jornada juntos tão incrível.
                </p>

                <p className="text-lg text-gray-600 dark:text-[#c0c0c0]">
                  dos sorrisos compartilhados aos desafios superados, cada momento com você é um tesouro que guardo no
                  coração.
                </p>

                <p className="text-lg text-gray-600 dark:text-[#c0c0c0]">
                  convido você a explorar esse pequeno mundinho que criei para a gente.
                  <br />
                </p>
              </div>

              {/* <div className="pt-4">
                <p className="text-lg font-medium text-red-600 dark:text-red-500">Vamos criar mais memórias juntos?</p>
                <p className="text-gray-500 dark:text-[#a0a0a0]">
                  Clique em "Roleta" no menu acima para descobrirmos nossa próxima aventura!
                </p>
              </div> */}
            </CardContent>
          </Card>
          {!revealed && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <Button
                onClick={() => setRevealed(true)}
                className="text-lg px-8 py-3 bg-red-700 text-white shadow-lg animate-breathing"
              >
                revelar
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
