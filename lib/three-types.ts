import * as THREE from 'three'

/**
 * Three.js type definitions for the project
 */

export interface VoxelAvatarProps {
  position?: [number, number, number]
  scale?: number
  rotation?: [number, number, number]
  isAnimating?: boolean
}

export interface DeskSceneProps {
  avatarPosition?: [number, number, number]
  showFloatingElements?: boolean
}

export interface FloatingElementProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  floatSpeed?: number
  floatAmplitude?: number
}

export interface SceneColors {
  background: string
  ambient: string
  spotlight: string
}
