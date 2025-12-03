"use client"

type Props = {
  mood: "happy" | "neutral" | "sad"
  streak: number
  level: number
}

export function GameAvatar({ mood, streak, level }: Props) {
  const getAvatarExpression = () => {
    switch (mood) {
      case "happy":
        return { eyes: "◠‿◠", mouth: "animate-bounce-soft" }
      case "sad":
        return { eyes: "╥﹏╥", mouth: "" }
      default:
        return { eyes: "• ◡ •", mouth: "" }
    }
  }

  const { eyes, mouth } = getAvatarExpression()

  // Avatar color based on level
  const getAvatarColor = () => {
    if (level >= 10) return "from-amber-300 to-yellow-400"
    if (level >= 5) return "from-purple-400 to-pink-400"
    if (level >= 3) return "from-blue-400 to-cyan-400"
    return "from-green-400 to-emerald-400"
  }

  // Size grows slightly with streak
  const getSize = () => {
    if (streak >= 30) return "h-36 w-36"
    if (streak >= 14) return "h-32 w-32"
    if (streak >= 7) return "h-28 w-28"
    return "h-24 w-24"
  }

  return (
    <div className="flex flex-col items-center">
      {/* Avatar Container */}
      <div
        className={`relative ${getSize()} ${mouth} rounded-3xl bg-gradient-to-br ${getAvatarColor()} flex items-center justify-center shadow-lg transition-all duration-500`}
      >
        <div className="text-2xl font-bold text-foreground/80 select-none">{eyes}</div>

        <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground shadow-md">
          {level}
        </div>

        {streak >= 7 && <div className="absolute -bottom-1 text-2xl">🔥</div>}
      </div>

      <div className="mt-4 text-center">
        <p className="text-lg font-semibold text-foreground">
          {mood === "happy" && "Feeling Amazing!"}
          {mood === "neutral" && "Ready to Go!"}
          {mood === "sad" && "Missing You..."}
        </p>
        {streak >= 7 && <p className="mt-1 text-sm text-accent">🔥 On Fire! {streak} days!</p>}
      </div>
    </div>
  )
}
