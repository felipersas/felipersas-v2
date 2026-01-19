export interface Track {
  id: string
  title: string
  artist: string
  src: string
  duration: number // in seconds, 0 until loaded
}

export interface PlayerState {
  isPlaying: boolean
  currentTrackIndex: number
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  playlist: Track[]
}

export interface PlayerContextType extends PlayerState {
  play: () => void
  pause: () => void
  togglePlay: () => void
  nextTrack: () => void
  prevTrack: () => void
  seekTo: (time: number) => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  setPlaylist: (tracks: Track[]) => void
  playTrack: (index: number) => void
  getCurrentTrack: () => Track | null
}
