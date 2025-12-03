"use client"

import type { Habit } from "./habit-game"

type Props = {
  history: { date: string; habitId: string; points: number }[]
  habits: Habit[]
  onClose: () => void
}

export function HistoryView({ history, habits, onClose }: Props) {
  const getHabit = (id: string) => habits.find((h) => h.id === id)

  // Get last 14 days for the calendar view
  const getLast14Days = () => {
    const days = []
    for (let i = 13; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      days.push(date.toDateString())
    }
    return days
  }

  const last14Days = getLast14Days()
  const completedDays = new Set(history.map((h) => h.date))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-card p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-card-foreground">Your Progress</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary"
          >
            ✕
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">Last 14 Days</h3>
          <div className="grid grid-cols-7 gap-2">
            {last14Days.map((day) => {
              const isCompleted = completedDays.has(day)
              const isToday = day === new Date().toDateString()
              const dayNum = new Date(day).getDate()

              return (
                <div
                  key={day}
                  className={`
                    flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all
                    ${
                      isCompleted
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : isToday
                          ? "border-2 border-primary bg-secondary text-secondary-foreground"
                          : "bg-muted text-muted-foreground"
                    }
                  `}
                  title={day}
                >
                  {isCompleted ? "✓" : dayNum}
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">Recent Activity</h3>
          {history.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-4">No check-ins yet. Start your streak today!</p>
          ) : (
            <div className="max-h-48 space-y-2 overflow-y-auto">
              {[...history]
                .reverse()
                .slice(0, 10)
                .map((entry, i) => {
                  const habit = getHabit(entry.habitId)
                  return (
                    <div key={i} className="flex items-center gap-3 rounded-xl bg-secondary p-3">
                      <span className="text-xl">{habit?.emoji}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-secondary-foreground">{habit?.name}</p>
                        <p className="text-xs text-muted-foreground">{new Date(entry.date).toLocaleDateString()}</p>
                      </div>
                      <span className="text-sm font-medium text-points">+{entry.points}</span>
                    </div>
                  )
                })}
            </div>
          )}
        </div>

        {/* Stats Summary */}
        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{history.length}</div>
            <div className="text-xs text-muted-foreground">Total Check-ins</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{history.reduce((sum, h) => sum + h.points, 0)}</div>
            <div className="text-xs text-muted-foreground">Total Points</div>
          </div>
        </div>
      </div>
    </div>
  )
}
