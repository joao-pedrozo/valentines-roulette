"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play } from "lucide-react"

const activities = [
  { id: 1, text: "filme", color: "#f472b6", icon: "🎬" },
  { id: 2, text: "série", color: "#f87171", icon: "📺" },
  { id: 3, text: "reels", color: "#fb7185", icon: "👩‍🍳" },
  { id: 4, text: "vídeo no yt", color: "#ec4899", icon: "🌳" },
  { id: 5, text: "girar dnv", color: "#ef4444", icon: "🎮" },
  { id: 6, text: "girar dnv", color: "#f43f5e", icon: "🎮" },
]

export function ValentineRoulette() {
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

    const voltas = 4 + Math.random() * 4
    const anguloFinal = Math.random() * 360
    const rotacaoTotal = rotation + voltas * 360 + anguloFinal

    setRotation(rotacaoTotal)

    setTimeout(() => {
      setCenterPulse(false)

      const anguloFinalReal = (rotacaoTotal % 360 + 360) % 360
      const anguloDoPonteiro = (360 - anguloFinalReal) % 360
      const indiceVencedor = Math.floor(anguloDoPonteiro / (360 / activities.length))
      const opcaoVencedora = activities[indiceVencedor]

      setSelectedActivity(opcaoVencedora.text)
      setShowCelebration(true)
      setIsSpinning(false)

      setTimeout(() => {
        setShowCelebration(false)
      }, 600)
    }, 4500)
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-2xl bg-white/80 dark:bg-[#0f0f0f]/90 backdrop-blur-sm shadow-2xl border-pink-200 dark:border-[#1a1a1a]">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold text-red-600 dark:text-red-500 flex items-center justify-center gap-2">
            💖 roleta do amor 💖
          </CardTitle>
          <p className="text-gray-600 dark:text-[#c0c0c0] mt-2">vamos girar a roleta e parar descobrir o que vamos fazer juntos 😈</p>
        </CardHeader>

        <CardContent className="flex flex-col items-center space-y-8">
          <div className="relative">
            <div className="absolute rotate-180 top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
              <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-600"></div>
            </div>

            <div className="relative">
              <svg
                width="390"
                height="390"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning ? "transform 4.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
                }}
              >
                {activities.map((activity, index) => {
                  const center = 195
                  const radius = 180
                  const angle = (360 / activities.length) * index
                  const nextAngle = (360 / activities.length) * (index + 1)
                  const startAngle = (angle - 90) * (Math.PI / 180)
                  const endAngle = (nextAngle - 90) * (Math.PI / 180)

                  const x1 = center + radius * Math.cos(startAngle)
                  const y1 = center + radius * Math.sin(startAngle)
                  const x2 = center + radius * Math.cos(endAngle)
                  const y2 = center + radius * Math.sin(endAngle)

                  const largeArcFlag = nextAngle - angle > 180 ? 1 : 0

                  const pathData = [
                    `M ${center} ${center}`,
                    `L ${x1} ${y1}`,
                    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                    `Z`,
                  ].join(" ")

                  const textAngle = angle + 360 / activities.length / 2
                  const textRadius = 120
                  const textX = center + textRadius * Math.cos((textAngle - 90) * (Math.PI / 180))
                  const textY = center + textRadius * Math.sin((textAngle - 90) * (Math.PI / 180))

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
                        <tspan x={textX} dy="-8" fontSize="20">{activity.icon}</tspan>
                        <tspan x={textX} dy="24" fontSize="14">{activity.text}</tspan>
                      </text>
                    </g>
                  )
                })}

                <circle
                  cx="195"
                  cy="195"
                  r="30"
                  fill="white"
                  stroke="#f87171"
                  strokeWidth="4"
                  className={centerPulse ? "animate-pulse" : ""}
                />
                <text x="195" y="195" textAnchor="middle" dominantBaseline="middle" fontSize="20">❤️</text>
              </svg>
            </div>
          </div>

          <Button
            onClick={spinRoulette}
            disabled={isSpinning}
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            <Play className={`h-5 w-5 mr-2 transition-transform duration-200 ${isSpinning ? "animate-spin" : ""}`} />
            {isSpinning ? "Girando..." : "Girar a Roleta!"}
          </Button>

          {selectedActivity && !isSpinning && (
            <div
              className={`text-center p-6 bg-gradient-to-r from-pink-50 to-red-50 dark:from-[#1a1a1a] dark:to-[#1c1c1c] rounded-xl border-2 border-pink-200 dark:border-[#2a2a2a] shadow-lg ${showCelebration ? "animate-bounce" : ""}`}
            >
              <h3 className="text-2xl font-bold text-red-600 dark:text-red-500 mb-2">🎉 Resultado 🎉</h3>
              <p className="text-xl text-gray-700 dark:text-[#e0e0e0]">
                Vamos ver: <span className="font-bold text-red-600 dark:text-red-500">{selectedActivity}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-[#a0a0a0] mt-2">ebaaa</p>
            </div>
          )}

          <div className="w-full max-w-md">
            <h4 className="text-lg font-semibold text-gray-700 dark:text-[#e0e0e0] mb-3 text-center">Atividades Disponíveis:</h4>
            <div className="grid grid-cols-2 gap-2">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-2 p-2 bg-white/60 dark:bg-[#1a1a1a]/60 rounded-lg">
                  <span className="text-lg">{activity.icon}</span>
                  <span className="text-sm text-gray-700 dark:text-[#e0e0e0]">{activity.text}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
