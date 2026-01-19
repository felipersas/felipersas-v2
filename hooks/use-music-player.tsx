'use client'

import React, { createContext, useContext, useEffect, useRef, useState, useCallback, useMemo } from 'react'
import type { Track, PlayerContextType, PlayerState } from '@/types/music-player.types'

const MusicPlayerContext = createContext<PlayerContextType | null>(null)

const STORAGE_KEYS = {
  VOLUME: 'music-player-volume',
  TRACK_INDEX: 'music-player-track-index'
}

export function MusicPlayerProvider({ children, defaultPlaylist }: { children: React.ReactNode, defaultPlaylist: Track[] }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.TRACK_INDEX)
      return saved ? parseInt(saved, 10) : 0
    }
    return 0
  })
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEYS.VOLUME)
      return saved ? parseFloat(saved) : 0.7
    }
    return 0.7
  })
  const [isMuted, setIsMuted] = useState(false)
  const [playlist, setPlaylistState] = useState<Track[]>(defaultPlaylist)

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.volume = volume

    const audio = audioRef.current

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      // Auto-play next track
      nextTrack()
    }

    const handleError = () => {
      console.error('Audio error:', audio.error)
      // Try next track on error
      nextTrack()
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.pause()
      audio.src = ''
    }
  }, [])

  // Load current track when index changes
  useEffect(() => {
    if (audioRef.current && playlist.length > 0) {
      const track = playlist[currentTrackIndex]
      if (track) {
        const wasPlaying = isPlaying
        audioRef.current.src = track.src
        audioRef.current.load()
        if (wasPlaying) {
          audioRef.current.play().catch(console.error)
        }
        localStorage.setItem(STORAGE_KEYS.TRACK_INDEX, currentTrackIndex.toString())
      }
    }
  }, [currentTrackIndex, playlist])

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
      localStorage.setItem(STORAGE_KEYS.VOLUME, volume.toString())
    }
  }, [volume, isMuted])

  const play = useCallback(() => {
    if (audioRef.current && playlist.length > 0) {
      audioRef.current.play().catch(console.error)
      setIsPlaying(true)
    }
  }, [playlist])

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [])

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }, [isPlaying, play, pause])

  const nextTrack = useCallback(() => {
    if (playlist.length === 0) return
    const nextIndex = (currentTrackIndex + 1) % playlist.length
    setCurrentTrackIndex(nextIndex)
  }, [currentTrackIndex, playlist.length])

  const prevTrack = useCallback(() => {
    if (playlist.length === 0) return
    const prevIndex = currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1
    setCurrentTrackIndex(prevIndex)
  }, [currentTrackIndex, playlist.length])

  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }, [])

  const setVolume = useCallback((newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume))
    setVolumeState(clampedVolume)
    if (clampedVolume > 0 && isMuted) {
      setIsMuted(false)
    }
  }, [isMuted])

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev)
  }, [])

  const setPlaylist = useCallback((tracks: Track[]) => {
    setPlaylistState(tracks)
  }, [])

  const playTrack = useCallback((index: number) => {
    if (index >= 0 && index < playlist.length) {
      setCurrentTrackIndex(index)
      setIsPlaying(true)
    }
  }, [playlist.length])

  const getCurrentTrack = useCallback(() => {
    return playlist[currentTrackIndex] || null
  }, [playlist, currentTrackIndex])

  const value: PlayerContextType = useMemo(() => ({
    isPlaying,
    currentTrackIndex,
    currentTime,
    duration,
    volume,
    isMuted,
    playlist,
    play,
    pause,
    togglePlay,
    nextTrack,
    prevTrack,
    seekTo,
    setVolume,
    toggleMute,
    setPlaylist,
    playTrack,
    getCurrentTrack
  }), [
    isPlaying,
    currentTrackIndex,
    currentTime,
    duration,
    volume,
    isMuted,
    playlist,
    play,
    pause,
    togglePlay,
    nextTrack,
    prevTrack,
    seekTo,
    setVolume,
    toggleMute,
    setPlaylist,
    playTrack,
    getCurrentTrack
  ])

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
    </MusicPlayerContext.Provider>
  )
}

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext)
  if (!context) {
    throw new Error('useMusicPlayer must be used within MusicPlayerProvider')
  }
  return context
}
