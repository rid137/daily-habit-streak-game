"use client"

import { useEffect, useState } from "react"

type Sparkle = {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

export function SparkleEffect() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    const newSparkles: Sparkle[] = []
    for (let i = 0; i < 12; i++) {
      newSparkles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        delay: Math.random() * 0.3,
      })
    }
    setSparkles(newSparkles)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute animate-sparkle text-accent"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            fontSize: sparkle.size,
            animationDelay: `${sparkle.delay}s`,
          }}
        >
          ✨
        </div>
      ))}

      {/* Confetti */}
      {["🎉", "⭐", "🌟", "💫", "🎊"].map((emoji, i) => (
        <div
          key={`confetti-${i}`}
          className="absolute animate-confetti"
          style={{
            left: `${20 + i * 15}%`,
            top: "50%",
            fontSize: 24,
            animationDelay: `${i * 0.1}s`,
          }}
        >
          {emoji}
        </div>
      ))}
    </div>
  )
}
