import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart } from "lucide-react"

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <Card className="w-full max-w-3xl bg-white/80 dark:bg-[#0f0f0f]/90 backdrop-blur-sm shadow-2xl border-pink-200 dark:border-[#1a1a1a]">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-3xl font-bold text-red-600 dark:text-red-400 flex items-center justify-center gap-2">
              <Heart className="h-8 w-8 text-red-500" />
              Feliz Dia dos Namorados
              <Heart className="h-8 w-8 text-red-500" />
            </CardTitle>
          </CardHeader>

          <CardContent className="text-center space-y-6 px-4 md:px-8">
            <div className="space-y-4">
              <p className="text-xl text-gray-700 dark:text-[#e0e0e0]">
                "Cada momento ao seu lado é uma página de um livro que nunca quero parar de ler."
              </p>

              <p className="text-lg text-gray-600 dark:text-[#c0c0c0]">
                Neste dia especial, quero celebrar não apenas o nosso amor, mas todas as pequenas coisas que tornam
                nossa jornada juntos tão incrível.
              </p>

              <p className="text-lg text-gray-600 dark:text-[#c0c0c0]">
                Dos sorrisos compartilhados aos desafios superados, cada momento contigo é um tesouro que guardo no
                coração.
              </p>
            </div>

            <div className="pt-4">
              <p className="text-lg font-medium text-red-600 dark:text-red-400">Vamos criar mais memórias juntos?</p>
              <p className="text-gray-500 dark:text-[#a0a0a0]">
                Clique em "Roleta" no menu acima para descobrirmos nossa próxima aventura!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
