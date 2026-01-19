'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Detailed Blocky Character - Developer at Desk
 * A voxel-style character with typing animation
 * Properly scaled and connected
 */

// Character scale multiplier - making it bigger
const CHAR_SCALE = 1.8

// Voxel helper for creating blocky character parts
function CharVoxel({
  position,
  size = [1, 1, 1],
  color,
  roughness = 0.5,
  metalness = 0,
}: {
  position: [number, number, number]
  size?: [number, number, number]
  color: number
  roughness?: number
  metalness?: number
}) {
  const scaledPosition: [number, number, number] = [position[0] * CHAR_SCALE, position[1] * CHAR_SCALE, position[2] * CHAR_SCALE]
  const geometry = useMemo(() => {
    const scaledSize: [number, number, number] = [size[0] * CHAR_SCALE, size[1] * CHAR_SCALE, size[2] * CHAR_SCALE]
    return new THREE.BoxGeometry(scaledSize[0], scaledSize[1], scaledSize[2])
  }, [size])
  const material = useMemo(() => new THREE.MeshStandardMaterial({ color, roughness, metalness }), [color, roughness, metalness])

  return (
    <mesh position={scaledPosition} geometry={geometry} material={material} castShadow receiveShadow />
  )
}

// Detailed character head
function CharacterHead() {
  return (
    <group position={[0, 1.55 * CHAR_SCALE, 0]}>
      {/* Main head block */}
      <CharVoxel position={[0, 0, 0]} size={[0.4, 0.35, 0.42]} color={0xE8B896} roughness={0.6} />

      {/* Hair - blocky style */}
      <group>
        {/* Main hair block */}
        <CharVoxel position={[0, 0.2, -0.02]} size={[0.42, 0.11, 0.4]} color={0x2A1810} roughness={0.8} />
        {/* Hair sides */}
        <CharVoxel position={[-0.2, 0.15, 0]} size={[0.05, 0.15, 0.38]} color={0x2A1810} roughness={0.8} />
        <CharVoxel position={[0.2, 0.15, 0]} size={[0.05, 0.15, 0.38]} color={0x2A1810} roughness={0.8} />
        {/* Hair front/bangs */}
        <CharVoxel position={[0, 0.2, 0.21]} size={[0.35, 0.14, 0.1]} color={0x2A1810} roughness={0.8} />
        <CharVoxel position={[0, 0.02, -0.21]} size={[0.45, 0.42, 0.05]} color={0x2A1810} roughness={0.8} />
      </group>

      {/* Eyes */}
      <group position={[0, 0, 0.38]}>
        {/* Left eye */}
        <group position={[-0.19, 0, 0]}>
          <CharVoxel position={[0, 0, 0]} size={[0.1, 0.06, 0.035]} color={0xFFFFFF} roughness={0.3} />
          <CharVoxel position={[0, 0, 0.012]} size={[0.045, 0.045, 0.018]} color={0x4A3728} roughness={0.4} />
          <CharVoxel position={[0, 0, 0.02]} size={[0.022, 0.022, 0.012]} color={0x1A1210} roughness={0.3} />
        </group>
        {/* Right eye */}
        <group position={[0.19, 0, 0]}>
          <CharVoxel position={[0, 0, 0]} size={[0.1, 0.07, 0.035]} color={0xFFFFFF} roughness={0.3} />
          <CharVoxel position={[0, 0, 0.012]} size={[0.045, 0.045, 0.018]} color={0x4A3728} roughness={0.4} />
          <CharVoxel position={[0, 0, 0.02]} size={[0.022, 0.022, 0.012]} color={0x1A1210} roughness={0.3} />
        </group>
      </group>

      {/* Eyebrows */}
      <CharVoxel position={[-0.11, 0.06, 0.21]} size={[0.08, 0.03, 0.025]} color={0x2A1810} roughness={0.8} />
      <group rotation={[0, 0, 0.1]}>
      <CharVoxel position={[0.11, 0.09, 0.21]} size={[0.08, 0.03, 0.025]} color={0x2A1810} roughness={0.8} />
      </group>

      {/* Nose */}
      {/* <CharVoxel position={[0, -0.045, 0.21]} size={[0.07, 0.09, 0.045]} color={0xDEAA86} roughness={0.6} /> */}

      {/* Mouth - subtle smile */}
      <CharVoxel position={[0, -0.13, 0.21]} size={[0.11, 0.03, 0.025]} color={0xC98676} roughness={0.7} />

      {/* Ears */}
      <CharVoxel position={[-0.21, 0, 0]} size={[0.045, 0.14, 0.09]} color={0xE8B896} roughness={0.6} />
      <CharVoxel position={[0.21, 0, 0]} size={[0.045, 0.14, 0.09]} color={0xE8B896} roughness={0.6} />

    </group>
  )
}

// Character torso with detailed clothing
function CharacterTorso() {
  return (
    <group position={[0, 1.1 * CHAR_SCALE, 0]}>
      {/* Main torso */}
      <CharVoxel position={[0, -0.08, 0]} size={[0.55, 0.7, 0.35]} color={0x1A1A1A} roughness={0.7} />

      {/* Shirt collar */}
      <CharVoxel position={[0, 0.28, 0.16]} size={[0.28, 0.09, 0.07]} color={0x1A1A1A} roughness={0.7} />

      {/* Chest detail - pocket */}
      <CharVoxel position={[0.13, 0.05, 0.18]} size={[0.13, 0.17, 0.025]} color={0x1A1A1A} roughness={0.7} />

      {/* Shirt bottom hem */}
      <CharVoxel position={[0, -0.28, 0.16]} size={[0.57, 0.045, 0.07]} color={0x1A1A1A} roughness={0.7} />

      {/* Shoulder detail */}
      <CharVoxel position={[-0.29, 0.24, 0]} size={[0.09, 0.14, 0.31]} color={0x1A1A1A} roughness={0.7} />
      <CharVoxel position={[0.29, 0.24, 0]} size={[0.09, 0.14, 0.31]} color={0x1A1A1A} roughness={0.7} />
    </group>
  )
}

// Arms with hands attached
function CharacterArms() {
  const leftArmRef = useRef<THREE.Group>(null)
  const rightArmRef = useRef<THREE.Group>(null)
  const leftForearmRef = useRef<THREE.Group>(null)
  const rightForearmRef = useRef<THREE.Group>(null)

  // Subtle arm animation
  useFrame((state) => {
    const time = state.clock.elapsedTime
    const subtleMotion = 0.015

    if (leftArmRef.current) {
      leftArmRef.current.rotation.x = -0.5 + Math.sin(time * 2) * subtleMotion
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.x = -0.5 + Math.sin(time * 2 + Math.PI) * subtleMotion
    }
    if (leftForearmRef.current) {
      leftForearmRef.current.rotation.x = 0.4 + Math.sin(time * 4) * 0.015
    }
    if (rightForearmRef.current) {
      rightForearmRef.current.rotation.x = 0.4 + Math.sin(time * 4 + Math.PI) * 0.015
    }
  })

  return (
    <>
      {/* Left Arm - complete with attached hand */}
      <group position={[-0.35 * CHAR_SCALE, 1.25 * CHAR_SCALE, 0]}>
        <group ref={leftArmRef} rotation={[-0.5, Math.PI, 0]}>
          {/* Upper arm */}
          <CharVoxel position={[0, -0.22, 0]} size={[0.16, 0.4, 0.16]} color={0x1A1A1A} roughness={0} />

          {/* Elbow */}
          <CharVoxel position={[0, -0.42, 0]} size={[0.11, 0.09, 0.11]} color={0x3A4A5A} roughness={0} />

          {/* Forearm with attached hand */}
          <group ref={leftForearmRef} rotation={[2, 0, 0]}>
            <CharVoxel position={[0, -0.4, 0.12]} size={[0.14, 0.2, 0.14]} color={0xE8B896} roughness={0.6} />

          </group>
        </group>
      </group>

      {/* Right Arm - complete with attached hand */}
      <group position={[0.35 * CHAR_SCALE, 1.25 * CHAR_SCALE, 0]}>
        <group ref={rightArmRef} rotation={[-0.5, Math.PI, 0]}>
          {/* Upper arm */}
          <CharVoxel position={[0, -0.22, 0]} size={[0.16, 0.4, 0.16]} color={0x1A1A1A} roughness={0.7} />

          {/* Elbow */}
          <CharVoxel position={[0, -0.42, 0]} size={[0.11, 0.09, 0.11]} color={0x3A4A5A} roughness={0.7} />

          {/* Forearm with attached hand */}
          <group ref={rightForearmRef} rotation={[2, 0, 0]}>
            <CharVoxel position={[0, -0.4, 0.12]} size={[0.14, 0.2, 0.14]} color={0xE8B896} roughness={0.6} />

          </group>
        </group>
      </group>
    </>
  )
}

// Standing legs
function CharacterLegs() {
  return (
    <group position={[0, 0.75 * CHAR_SCALE, 0]}>
      {/* Left Leg */}
      <group position={[-0.13 * CHAR_SCALE, 0, 0]}>
        {/* Upper */}
        <CharVoxel position={[0, -0.25, 0]} size={[0.23, 0.5, 0.23]} color={0x2A3A4A} roughness={0.7} />
        {/* Lower (extended for standing height) */}
        <CharVoxel position={[0, -0.75, 0]} size={[0.23, 0.6, 0.23]} color={0x2A3A4A} roughness={0.7} />
        {/* Foot */}
        <CharVoxel position={[0, -1.1, 0.05]} size={[0.17, 0.11, 0.28]} color={0x1A1612} roughness={0.6} />
      </group>

      {/* Right Leg */}
      <group position={[0.13 * CHAR_SCALE, 0, 0]}>
        {/* Upper */}
        <CharVoxel position={[0, -0.25, 0]} size={[0.23, 0.5, 0.23]} color={0x2A3A4A} roughness={0.7} />
        {/* Lower (extended for standing height) */}
        <CharVoxel position={[0, -0.75, 0]} size={[0.23, 0.6, 0.23]} color={0x2A3A4A} roughness={0.7} />
        {/* Foot */}
        <CharVoxel position={[0, -1.1, 0.05]} size={[0.17, 0.11, 0.28]} color={0x1A1612} roughness={0.6} />
      </group>
    </group>
  )
}



// Main character component - everything properly connected
export function BlockyCharacter() {
  return (
    <group position={[0, -1.2, 1.3]} rotation={[0, Math.PI, 0]}>
      {/* Character body parts - standing */}
      <CharacterLegs />
      <CharacterTorso />
      <CharacterArms />
      <CharacterHead />
    </group>
  )
}
