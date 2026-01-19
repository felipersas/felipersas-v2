import type { Track } from '@/types/music-player.types'

export const defaultPlaylist: Track[] = [
  {
    id: 'track-1',
    title: 'Good Night',
    artist: 'Lo-Fi Cozy',
    src: '/audio/good-night-lofi-cozy-chill-music-160166.mp3',
    duration: 0
  },
  {
    id: 'track-2',
    title: 'Lofi Study',
    artist: 'Calm Chill',
    src: '/audio/lofi-study-calm-peaceful-chill-hop-112191.mp3',
    duration: 0
  }
]
