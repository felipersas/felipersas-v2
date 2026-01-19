'use client'

import { useMusicPlayer } from '@/hooks/use-music-player'
import { cn } from '@/lib/utils'

export function MusicPlayerProgress({ className }: { className?: string }) {
  const { currentTime, duration, seekTo } = useMusicPlayer()

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration
    seekTo(newTime)
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="text-xs text-muted-foreground min-w-[40px] tabular-nums">
        {formatTime(currentTime)}
      </span>

      <input
        type="range"
        min="0"
        max="100"
        step="0.1"
        value={progress}
        onChange={handleSeek}
        aria-label="Seek"
        className="flex-1 h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:shadow-lg"
      />

      <span className="text-xs text-muted-foreground min-w-[40px] tabular-nums">
        {formatTime(duration)}
      </span>
    </div>
  )
}
