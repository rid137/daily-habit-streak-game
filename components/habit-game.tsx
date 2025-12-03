"use client"

import { useState, useEffect, useCallback } from "react"
import { HabitSelector } from "./habit-selector"
import { GameAvatar } from "./game-avatar"
import { StatsDisplay } from "./stats-display"
import { CheckInButton } from "./check-in-button"
import { HistoryView } from "./history-view"
import { SparkleEffect } from "./sparkle-effect"
import { LevelUpModal } from "./level-up-modal"

export type Habit = {
  id: string
  name: string
  emoji: string
  color: string
}

export type GameState = {
  selectedHabit: Habit | null
  points: number
  streak: number
  lastCheckIn: string | null
  history: { date: string; habitId: string; points: number }[]
  level: number
}

const HABITS: Habit[] = [
  { id: "water", name: "Drink Water", emoji: "💧", color: "bg-blue-400" },
  { id: "read", name: "Read 10 min", emoji: "📚", color: "bg-amber-400" },
  { id: "exercise", name: "Exercise", emoji: "🏃", color: "bg-green-400" },
  { id: "meditate", name: "Meditate", emoji: "🧘", color: "bg-purple-400" },
  { id: "sleep", name: "Sleep 8h", emoji: "😴", color: "bg-indigo-400" },
]

const POINTS_PER_CHECKIN = 10
const POINTS_PER_LEVEL = 100

export default function HabitGame() {
  const [gameState, setGameState] = useState<GameState>({
    selectedHabit: null,
    points: 0,
    streak: 0,
    lastCheckIn: null,
    history: [],
    level: 1,
  })
  const [showSparkles, setShowSparkles] = useState(false)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [isCheckedInToday, setIsCheckedInToday] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  // Load state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("habitGameState")
    if (saved) {
      const parsed = JSON.parse(saved)
      setGameState(parsed)
      checkStreakStatus(parsed)
    }
  }, [])

  // Save state to localStorage
  useEffect(() => {
    if (gameState.selectedHabit) {
      localStorage.setItem("habitGameState", JSON.stringify(gameState))
    }
  }, [gameState])

  const checkStreakStatus = useCallback((state: GameState) => {
    const today = new Date().toDateString()
    const lastCheck = state.lastCheckIn

    if (lastCheck === today) {
      setIsCheckedInToday(true)
      return
    }

    if (lastCheck) {
      const lastDate = new Date(lastCheck)
      const todayDate = new Date(today)
      const diffTime = todayDate.getTime() - lastDate.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays > 1 && state.streak > 0) {
        // Streak broken!
        setGameState((prev) => ({ ...prev, streak: 0 }))
      }
    }
    setIsCheckedInToday(false)
  }, [])

  const handleSelectHabit = (habit: Habit) => {
    const newState = { ...gameState, selectedHabit: habit }
    setGameState(newState)
    checkStreakStatus(newState)
  }

  const handleCheckIn = () => {
    if (isCheckedInToday || !gameState.selectedHabit) return

    const today = new Date().toDateString()
    const newPoints = gameState.points + POINTS_PER_CHECKIN
    const newStreak = gameState.streak + 1
    const newLevel = Math.floor(newPoints / POINTS_PER_LEVEL) + 1
    const leveledUp = newLevel > gameState.level

    const newHistory = [
      ...gameState.history,
      {
        date: today,
        habitId: gameState.selectedHabit.id,
        points: POINTS_PER_CHECKIN,
      },
    ]

    setGameState({
      ...gameState,
      points: newPoints,
      streak: newStreak,
      lastCheckIn: today,
      history: newHistory,
      level: newLevel,
    })

    setShowSparkles(true)
    setIsCheckedInToday(true)
    setTimeout(() => setShowSparkles(false), 1500)

    if (leveledUp) {
      setTimeout(() => setShowLevelUp(true), 800)
    }

    // Play a little sound effect
    playCheckInSound()
  }

  const playCheckInSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime)
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1)
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2)

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.4)
  }

  const handleResetHabit = () => {
    setGameState({
      selectedHabit: null,
      points: 0,
      streak: 0,
      lastCheckIn: null,
      history: [],
      level: 1,
    })
    localStorage.removeItem("habitGameState")
    setIsCheckedInToday(false)
  }

  // If no habit selected, show selector
  if (!gameState.selectedHabit) {
    return <HabitSelector habits={HABITS} onSelect={handleSelectHabit} />
  }

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-8">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-md">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Habit Streak</h1>
          <p className="mt-1 text-muted-foreground">Keep your streak alive!</p>
        </header>

        <div className="mb-6 flex items-center justify-center gap-2">
          <span
            className={`inline-flex items-center gap-2 rounded-full ${gameState.selectedHabit.color} px-4 py-2 text-sm font-medium text-foreground shadow-md`}
          >
            <span className="text-xl">{gameState.selectedHabit.emoji}</span>
            {gameState.selectedHabit.name}
          </span>
        </div>

        <StatsDisplay points={gameState.points} streak={gameState.streak} level={gameState.level} />

        <div className="relative my-8">
          <GameAvatar
            mood={isCheckedInToday ? "happy" : gameState.streak === 0 ? "sad" : "neutral"}
            streak={gameState.streak}
            level={gameState.level}
          />
          {showSparkles && <SparkleEffect />}
        </div>

        <CheckInButton onCheckIn={handleCheckIn} disabled={isCheckedInToday} streak={gameState.streak} />

        {/* Status Message */}
        <p className="mt-4 text-center text-sm text-muted-foreground">
          {isCheckedInToday
            ? "🎉 Great job! See you tomorrow!"
            : gameState.streak === 0
              ? "Start your streak today!"
              : `Keep going! ${gameState.streak} day${gameState.streak > 1 ? "s" : ""} strong!`}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={() => setShowHistory(true)}
            className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-card-foreground shadow-sm transition-all hover:bg-secondary"
          >
            📊 History
          </button>
          <button
            onClick={handleResetHabit}
            className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-card-foreground shadow-sm transition-all hover:bg-secondary"
          >
            🔄 Change Habit
          </button>
        </div>
      </div>

      {showHistory && <HistoryView history={gameState.history} habits={HABITS} onClose={() => setShowHistory(false)} />}

      {showLevelUp && <LevelUpModal level={gameState.level} onClose={() => setShowLevelUp(false)} />}
    </div>
  )
}
