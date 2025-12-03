"use client"

type Props = {
  onCheckIn: () => void
  disabled: boolean
  streak: number
}

export function CheckInButton({ onCheckIn, disabled, streak }: Props) {
  return (
    <button
      onClick={onCheckIn}
      disabled={disabled}
      className={`
        relative w-full rounded-2xl px-8 py-5 text-lg font-bold shadow-lg transition-all
        ${
          disabled
            ? "bg-secondary text-muted-foreground cursor-not-allowed"
            : "bg-primary text-primary-foreground animate-pulse-glow hover:scale-[1.02] active:scale-[0.98]"
        }
      `}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {disabled ? (
          <>
            <span className="text-2xl">✅</span>
            Done for Today!
          </>
        ) : (
          <>
            <span className="text-2xl">👆</span>
            Check In (+10 pts)
          </>
        )}
      </span>

      {/* Streak bonus indicator */}
      {!disabled && streak >= 3 && (
        <span className="absolute -top-2 -right-2 rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground shadow-sm">
          🔥 {streak} day streak!
        </span>
      )}
    </button>
  )
}
