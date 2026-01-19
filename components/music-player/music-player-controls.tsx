'use client'

import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'
import { useMusicPlayer } from '@/hooks/use-music-player'
import { cn } from '@/lib/utils'

export function MusicPlayerControls({ className }: { className?: string }) {
  const { isPlaying, togglePlay, prevTrack, nextTrack, volume, isMuted, setVolume, toggleMute } = useMusicPlayer()

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Previous Track */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={prevTrack}
        aria-label="Previous track"
        className="p-2 rounded-lg hover:bg-accent transition-colors lofi-glow"
      >
        <SkipBack className="h-5 w-5" />
      </motion.button>

      {/* Play/Pause */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors lofi-glow"
      >
        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
      </motion.button>

      {/* Next Track */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={nextTrack}
        aria-label="Next track"
        className="p-2 rounded-lg hover:bg-accent transition-colors lofi-glow"
      >
        <SkipForward className="h-5 w-5" />
      </motion.button>

      {/* Volume Control */}
      <div className="flex items-center gap-2 ml-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          className="p-2 rounded-lg hover:bg-accent transition-colors lofi-glow"
        >
          {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </motion.button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          aria-label="Volume"
          className="w-20 h-1 bg-muted rounded-full appearance-none cursor-pointer accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:transition-transform"
        />
      </div>
    </div>
  )
}
