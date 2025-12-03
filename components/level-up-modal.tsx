"use client"

import { useEffect, useState } from "react"

type Props = {
  level: number
  onClose: () => void
}

export function LevelUpModal({ level, onClose }: Props) {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Slight delay for animation
    setTimeout(() => setShowContent(true), 100)

    // Play level up sound
    playLevelUpSound()
  }, [])

  const playLevelUpSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const notes = [523.25, 659.25, 783.99, 1046.5]

      notes.forEach((freq, i) => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.15)
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + i * 0.15)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.15 + 0.3)

        oscillator.start(audioContext.currentTime + i * 0.15)
        oscillator.stop(audioContext.currentTime + i * 0.15 + 0.3)
      })
    } catch {}
  }

  const getLevelTitle = () => {
    if (level >= 10) return "🏆 Champion"
    if (level >= 7) return "⭐ Expert"
    if (level >= 5) return "💪 Dedicated"
    if (level >= 3) return "🌟 Rising Star"
    return "🎯 Beginner"
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4 backdrop-blur-sm">
      <div
        className={`
          w-full max-w-sm rounded-3xl bg-card p-8 text-center shadow-2xl transition-all duration-500
          ${showContent ? "scale-100 opacity-100" : "scale-75 opacity-0"}
        `}
      >
        {/* Celebration emoji burst */}
        <div className="relative mb-4">
          <div className="text-7xl">🎉</div>
          <div className="absolute left-4 top-0 animate-bounce text-3xl">🌟</div>
          <div className="absolute right-4 top-0 animate-bounce text-3xl" style={{ animationDelay: "0.1s" }}>
            ✨
          </div>
        </div>

        <h2 className="mb-2 text-3xl font-bold text-card-foreground">Level Up!</h2>
        <p className="mb-4 text-muted-foreground">You've reached</p>

        <div className="mb-6 inline-block rounded-2xl bg-primary/10 px-6 py-4">
          <div className="text-5xl font-bold text-primary">{level}</div>
          <div className="mt-1 text-sm font-medium text-primary">{getLevelTitle()}</div>
        </div>

        <p className="mb-6 text-sm text-muted-foreground">
          Keep going! Every check-in brings you closer to the next level.
        </p>

        <button
          onClick={onClose}
          className="w-full rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Awesome! 🚀
        </button>
      </div>
    </div>
  )
}
