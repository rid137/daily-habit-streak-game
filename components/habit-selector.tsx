"use client"

import type { Habit } from "./habit-game"

type Props = {
  habits: Habit[]
  onSelect: (habit: Habit) => void
}

export function HabitSelector({ habits, onSelect }: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 text-6xl">🎯</div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Choose Your Habit</h1>
          <p className="mt-2 text-muted-foreground">Pick one habit to track daily and build your streak!</p>
        </div>

        <div className="grid gap-3">
          {habits.map((habit) => (
            <button
              key={habit.id}
              onClick={() => onSelect(habit)}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left shadow-sm transition-all hover:scale-[1.02] hover:border-primary hover:shadow-md active:scale-[0.98]"
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${habit.color} text-3xl shadow-sm transition-transform group-hover:scale-110`}
              >
                {habit.emoji}
              </span>
              <div>
                <h3 className="font-semibold text-card-foreground">{habit.name}</h3>
                <p className="text-sm text-muted-foreground">+10 points per day</p>
              </div>
              <span className="ml-auto text-2xl text-muted-foreground transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
