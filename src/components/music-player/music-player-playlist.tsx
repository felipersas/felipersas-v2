'use client'

import { Music2 } from 'lucide-react'
import { useMusicPlayer } from '@/hooks/use-music-player'
import { cn } from '@/lib/utils'

export function MusicPlayerPlaylist() {
  const { playlist, currentTrackIndex, playTrack, isPlaying } = useMusicPlayer()

  return (
    <div className="flex flex-col gap-1">
      {playlist.map((track, index) => (
        <button
          key={track.id}
          onClick={() => playTrack(index)}
          className={cn(
            "flex items-center gap-3 px-2 py-1.5 rounded-lg text-left transition-colors hover:bg-accent/50",
            currentTrackIndex === index && isPlaying && "bg-accent/30"
          )}
        >
          <Music2 className={cn(
            "h-3.5 w-3.5 flex-none",
            currentTrackIndex === index && isPlaying ? "text-primary" : "text-muted-foreground"
          )} />
          <div className="flex-1 min-w-0">
            <p className={cn(
              "text-sm truncate",
              currentTrackIndex === index ? "font-medium" : "text-muted-foreground"
            )}>
              {track.title}
            </p>
          </div>
          <p className="text-xs text-muted-foreground">{track.artist}</p>
        </button>
      ))}
    </div>
  )
}
