'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music2, ChevronUp, ChevronDown, Disc3 } from 'lucide-react'
import { useMusicPlayer } from '@/hooks/use-music-player'
import { MusicPlayerControls } from './music-player-controls'
import { MusicPlayerProgress } from './music-player-progress'
import { MusicPlayerPlaylist } from './music-player-playlist'
import { cn } from '@/lib/utils'

export function MusicPlayer() {
  const [isExpanded, setIsExpanded] = useState(false)
  const { getCurrentTrack, isPlaying } = useMusicPlayer()

  const currentTrack = getCurrentTrack()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      className="fixed bottom-4 right-4 z-40"
    >
      <div
        className={cn(
          "bg-background/95 backdrop-blur-sm border rounded-2xl shadow-lg overflow-hidden transition-all duration-300",
          isExpanded ? "w-[320px]" : "w-[280px]"
        )}
      >
        {/* Collapsed State - Mini Player */}
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="p-3"
            >
              <button
                onClick={() => setIsExpanded(true)}
                className="w-full flex items-center gap-3 hover:bg-accent/50 rounded-lg p-2 transition-colors lofi-glow"
              >
                {/* Animated Icon */}
                <motion.div
                  animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="relative"
                >
                  <Disc3 className={cn(
                    "h-8 w-8 text-primary",
                    isPlaying && "text-primary"
                  )} />
                  {isPlaying && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/20"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  )}
                </motion.div>

                {/* Track Info */}
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium truncate">
                    {currentTrack?.title || 'No track selected'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {currentTrack?.artist || 'Add music to /public/audio/'}
                  </p>
                </div>

                {/* Expand Button */}
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              </button>
            </motion.div>
          ) : (
            /* Expanded State - Full Player */
            <motion.div
              key="expanded"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="p-4"
            >
              {/* Header with collapse button */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Music2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-sm">Lo-Fi Player</h3>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1 hover:bg-accent rounded transition-colors"
                  aria-label="Collapse"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>

              {/* Current Track Display */}
              {currentTrack && (
                <motion.div
                  key={currentTrack.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-accent/30 rounded-lg"
                >
                  <p className="font-medium truncate">{currentTrack.title}</p>
                  <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
                </motion.div>
              )}

              {/* Progress Bar */}
              <div className="mb-4">
                <MusicPlayerProgress />
              </div>

              {/* Controls */}
              <div className="mb-4">
                <MusicPlayerControls />
              </div>

              {/* Playlist */}
              <div className="border-t pt-4">
                <p className="text-xs text-muted-foreground mb-2 px-1">Playlist</p>
                <MusicPlayerPlaylist />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
