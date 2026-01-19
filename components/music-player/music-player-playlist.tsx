'use client'

import { useMusicPlayer } from '@/hooks/use-music-player'
import { motion, AnimatePresence } from 'framer-motion'
import { Music2, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MusicPlayerPlaylist({ className }: { className?: string }) {
  const { playlist, currentTrackIndex, playTrack, isPlaying } = useMusicPlayer()

  if (playlist.length === 0) {
    return (
      <div className={cn("p-4 text-center text-muted-foreground", className)}>
        <Music2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No tracks available</p>
        <p className="text-xs">Add MP3 files to /public/audio/</p>
      </div>
    )
  }

  return (
    <div className={cn("max-h-[200px] overflow-y-auto", className)}>
      <AnimatePresence mode="popLayout">
        {playlist.map((track, index) => (
          <motion.button
            key={track.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            onClick={() => playTrack(index)}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors hover:bg-accent lofi-glow",
              index === currentTrackIndex && "bg-accent/50 border border-primary/20"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0",
              index === currentTrackIndex
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            )}>
              {index === currentTrackIndex && isPlaying ? (
                <motion.div
                  className="flex gap-0.5 items-center h-3"
                  initial={false}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-0.5 bg-current rounded-full"
                      animate={{
                        height: [4, 12, 4],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </motion.div>
              ) : (
                <Play className="h-4 w-4" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className={cn(
                "text-sm font-medium truncate",
                index === currentTrackIndex && "text-primary"
              )}>
                {track.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {track.artist}
              </p>
            </div>

            {index === currentTrackIndex && (
              <motion.div
                className="h-2 w-2 rounded-full bg-primary"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            )}
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  )
}
