"use client"

type Props = {
  points: number
  streak: number
  level: number
}

export function StatsDisplay({ points, streak, level }: Props) {
  const pointsToNextLevel = level * 100 - points
  const progressPercent = ((points % 100) / 100) * 100

  return (
    <div className="grid grid-cols-3 gap-3">
      {/* Points */}
      <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm">
        <div className="text-2xl">⭐</div>
        <div className="mt-1 text-2xl font-bold text-points">{points}</div>
        <div className="text-xs text-muted-foreground">Points</div>
      </div>

      {/* Streak */}
      <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm">
        <div className="text-2xl">{streak >= 7 ? "🔥" : "📅"}</div>
        <div className="mt-1 text-2xl font-bold text-streak">{streak}</div>
        <div className="text-xs text-muted-foreground">Day Streak</div>
      </div>

      {/* Level */}
      <div className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm">
        <div className="text-2xl">🏆</div>
        <div className="mt-1 text-2xl font-bold text-primary">{level}</div>
        <div className="text-xs text-muted-foreground">Level</div>
      </div>

      {/* Progress bar to next level */}
      <div className="col-span-3 mt-2">
        <div className="mb-1 flex justify-between text-xs text-muted-foreground">
          <span>Level {level}</span>
          <span>{pointsToNextLevel > 0 ? `${pointsToNextLevel} pts to Level ${level + 1}` : "Max!"}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  )
}
