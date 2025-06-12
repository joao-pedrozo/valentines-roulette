"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Play } from "lucide-react"

const activities = [
  { id: 1, text: "Ver Filme", color: "#f472b6", icon: "🎬" },
  { id: 2, text: "Ver Série", color: "#f87171", icon: "📺" },
  { id: 3, text: "Cozinhar Juntos", color: "#fb7185", icon: "👩‍🍳" },
  { id: 4, text: "Passear no Parque", color: "#ec4899", icon: "🌳" },
  { id: 5, text: "Jogar um Jogo", color: "#ef4444", icon: "🎮" },
  { id: 6, text: "Jantar Romântico", color: "#f43f5e", icon: "🕯️" },
]

export default function Component() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [centerPulse, setCenterPulse] = useState(false)

  const spinRoulette = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setSelectedActivity(null)
    setShowCelebration(false)
    setCenterPulse(true)

    // Aplicando a mesma lógica do concorrente
    const voltas = 4 + Math.random() * 4 // 4-8 voltas
    const anguloFinal = Math.random() * 360
    const rotacaoTotal = rotation + voltas * 360 + anguloFinal

    setRotation(rotacaoTotal)

    setTimeout(() => {
      setCenterPulse(false)

      // Calcular opção vencedora baseada no ângulo final
      // Ajustar para começar do topo (0 graus = meio da primeira seção)
      const anguloAjustado = (360 - (anguloFinal % 360) + 30) % 360
      const indiceVencedor = Math.floor(anguloAjustado / 60)
      const opcaoVencedora = activities[indiceVencedor]

      setSelectedActivity(opcaoVencedora.text)
      setShowCelebration(true)
      setIsSpinning(false)

      // Remover animação de celebração após 600ms
      setTimeout(() => {
        setShowCelebration(false)
      }, 600)
    }, 4500) // 4.5 segundos como no código do concorrente
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-rose-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm shadow-2xl border-pink-200">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold text-red-600 flex items-center justify-center gap-2">
            <Heart className="h-8 w-8 text-red-500" />
            Roleta do Amor
            <Heart className="h-8 w-8 text-red-500" />
          </CardTitle>
          <p className="text-gray-600 mt-2">Gire a roleta e descubram o que vão fazer juntos! 💕</p>
        </CardHeader>

        <CardContent className="flex flex-col items-center space-y-8">
          {/* Roleta */}
          <div className="relative">
            {/* Ponteiro */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
              <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-600"></div>
            </div>

            {/* Círculo da roleta */}
            <div className="relative">
              <svg
                width="320"
                height="320"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning ? "transform 4.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
                }}
              >
                {activities.map((activity, index) => {
                  const angle = (360 / activities.length) * index
                  const nextAngle = (360 / activities.length) * (index + 1)
                  const startAngle = (angle - 90) * (Math.PI / 180)
                  const endAngle = (nextAngle - 90) * (Math.PI / 180)

                  const x1 = 160 + 150 * Math.cos(startAngle)
                  const y1 = 160 + 150 * Math.sin(startAngle)
                  const x2 = 160 + 150 * Math.cos(endAngle)
                  const y2 = 160 + 150 * Math.sin(endAngle)

                  const largeArcFlag = nextAngle - angle > 180 ? 1 : 0

                  const pathData = [
                    `M 160 160`,
                    `L ${x1} ${y1}`,
                    `A 150 150 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                    `Z`,
                  ].join(" ")

                  const textAngle = angle + 360 / activities.length / 2
                  const textRadius = 100
                  const textX = 160 + textRadius * Math.cos((textAngle - 90) * (Math.PI / 180))
                  const textY = 160 + textRadius * Math.sin((textAngle - 90) * (Math.PI / 180))

                  return (
                    <g key={activity.id}>
                      <path d={pathData} fill={activity.color} stroke="#fff" strokeWidth="2" />
                      <text
                        x={textX}
                        y={textY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="white"
                        fontSize="12"
                        fontWeight="bold"
                        transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                      >
                        <tspan x={textX} dy="-8">
                          {activity.icon}
                        </tspan>
                        <tspan x={textX} dy="16" fontSize="10">
                          {activity.text}
                        </tspan>
                      </text>
                    </g>
                  )
                })}

                {/* Centro da roleta com animação de pulse */}
                <circle
                  cx="160"
                  cy="160"
                  r="25"
                  fill="white"
                  stroke="#f87171"
                  strokeWidth="4"
                  className={centerPulse ? "animate-pulse" : ""}
                />
                <text x="160" y="160" textAnchor="middle" dominantBaseline="middle" fontSize="20">
                  ❤️
                </text>
              </svg>
            </div>
          </div>

          {/* Botão de girar */}
          <Button
            onClick={spinRoulette}
            disabled={isSpinning}
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            <Play className={`h-5 w-5 mr-2 transition-transform duration-200 ${isSpinning ? "animate-spin" : ""}`} />
            {isSpinning ? "Girando..." : "Girar a Roleta!"}
          </Button>

          {/* Resultado com animação de celebração */}
          {selectedActivity && !isSpinning && (
            <div
              className={`text-center p-6 bg-gradient-to-r from-pink-50 to-red-50 rounded-xl border-2 border-pink-200 shadow-lg ${
                showCelebration ? "animate-bounce" : ""
              }`}
            >
              <h3 className="text-2xl font-bold text-red-600 mb-2">🎉 Resultado 🎉</h3>
              <p className="text-xl text-gray-700">
                Vocês vão: <span className="font-bold text-red-600">{selectedActivity}</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">Divirtam-se juntos! 💖</p>
            </div>
          )}

          {/* Lista de atividades */}
          <div className="w-full max-w-md">
            <h4 className="text-lg font-semibold text-gray-700 mb-3 text-center">Atividades Disponíveis:</h4>
            <div className="grid grid-cols-2 gap-2">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-2 p-2 bg-white/60 rounded-lg">
                  <span className="text-lg">{activity.icon}</span>
                  <span className="text-sm text-gray-700">{activity.text}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
