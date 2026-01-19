'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Lo-Fi Desk Scene Elements
 * Creates cozy desk items like monitor, keyboard, coffee mug, etc.
 */

// Voxel helper for creating blocky desk items
function DeskVoxel({
  position,
  size = [1, 1, 1],
  color,
  scale = 1,
  roughness = 0.7,
}: {
  position: [number, number, number]
  size?: [number, number, number]
  color: number
  scale?: number
  roughness?: number
}) {
  const mesh = useRef<THREE.Mesh>(null)

  const geometry = useMemo(
    () => new THREE.BoxGeometry(size[0], size[1], size[2]),
    [size]
  )
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ color, roughness }),
    [color, roughness]
  )

  return (
    <mesh
      ref={mesh}
      position={position}
      geometry={geometry}
      material={material}
      scale={scale}
      castShadow
      receiveShadow
    />
  )
}

// Desk surface
export function Desk() {
  return (
    <group position={[0, 0, 0]}>
      {/* Main desk surface */}
      <DeskVoxel
        position={[0, 0, 0]}
        size={[4.5, 0.18, 2.2]}
        color={0x5A4A3E} // Dark wood color
        roughness={0.6}
      />

      {/* Desk legs - tapered style */}
      {/* Front left */}
      <group position={[2, -0.1, 0.95]}>
        <DeskVoxel position={[0, -0.4, 0]} size={[0.18, 1, 0.18]} color={0x7A6954} roughness={0.7} />
        <DeskVoxel position={[0, -1.2, 0]} size={[0.15, 0.8, 0.15]} color={0x7A6954} roughness={0.7} />
      </group>

      {/* Front right */}
      <group position={[-2, -0.1, 0.95]}>
        <DeskVoxel position={[0, -0.4, 0]} size={[0.18, 1, 0.18]} color={0x7A6954} roughness={0.7} />
        <DeskVoxel position={[0, -1.2, 0]} size={[0.15, 0.8, 0.15]} color={0x7A6954} roughness={0.7} />
      </group>

      {/* Back left */}
      <group position={[2, -0.1, -0.95]}>
        <DeskVoxel position={[0, -0.4, 0]} size={[0.18, 1, 0.18]} color={0x7A6954} roughness={0.7} />
        <DeskVoxel position={[0, -1.2, 0]} size={[0.15, 0.8, 0.15]} color={0x7A6954} roughness={0.7} />
      </group>

      {/* Back right */}
      <group position={[-2, -0.1, -0.95]}>
        <DeskVoxel position={[0, -0.4, 0]} size={[0.18, 1, 0.18]} color={0x7A6954} roughness={0.7} />
        <DeskVoxel position={[0, -1.2, 0]} size={[0.15, 0.8, 0.15]} color={0x7A6954} roughness={0.7} />
      </group>
    </group>
  )
}

// Retro jjjjj
export function Monitor() {
  return (
    <group position={[0, 0.5, -0.5]}>
      {/* Monitor base */}
      <DeskVoxel position={[0, -0.35, 0]} size={[0.9, 0.08, 0.7]} color={0x2A241E} roughness={0.5} />

      {/* Monitor stand neck */}
      <DeskVoxel position={[0, -0.2, 0]} size={[0.25, 0.35, 0.3]} color={0x2A241E} roughness={0.5} />

      {/* Monitor frame/bezel */}
      <DeskVoxel position={[0, 0.6, 0]} size={[2.2, 1.6, 0.25]} color={0x1A1612} roughness={0.4} />

      {/* Screen (emissive for glow) */}
      <mesh position={[0, 0.6, 0.13]} receiveShadow>
        <boxGeometry args={[2.0, 1.4, 0.06]} />
        <meshStandardMaterial
          color={0x1A1A2E}
          emissive={0x0D1B2A}
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Code lines on screen - more varied and realistic */}
      {[
        { x: -0.85, y: 1.05, z: 0.16, w: 0.5 },
        { x: -0.85, y: 0.95, z: 0.16, w: 0.7 },
        { x: -0.85, y: 0.85, z: 0.16, w: 0.9 },
        { x: -0.2, y: 0.85, z: 0.16, w: 0.6 },
        { x: -0.85, y: 0.75, z: 0.16, w: 0.4 },
        { x: -0.85, y: 0.65, z: 0.16, w: 0.8 },
        { x: -0.85, y: 0.55, z: 0.16, w: 0.65 },
        { x: -0.85, y: 0.45, z: 0.16, w: 0.5 },
        { x: -0.3, y: 0.45, z: 0.16, w: 0.4 },
        { x: -0.85, y: 0.35, z: 0.16, w: 0.75 },
        { x: -0.85, y: 0.25, z: 0.16, w: 0.55 },
        { x: -0.85, y: 0.15, z: 0.16, w: 0.85 },
        { x: -0.85, y: 0.05, z: 0.16, w: 0.45 },
      ].map(({ x, y, z, w }, i) => (
        <mesh key={i} position={[x + w / 2, y, z]}>
          <boxGeometry args={[w, 0.06, 0.02]} />
          <meshStandardMaterial
            color={0x00FF88} // Bright terminal green
            emissive={0x00FF88}
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}

      {/* Monitor power LED */}
      <mesh position={[0.95, 0.2, 0.13]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial
          color={0x00FF00}
          emissive={0x00FF00}
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  )
}

// Keyboard
export function Keyboard() {
  return (
    <group position={[0, 0.2, 0.5]}>
      {/* Keyboard base */}
      <DeskVoxel position={[0, 0, 0]} size={[1.6, 0.12, 0.65]} color={0x2A241E} roughness={0.5} />

      {/* Keyboard frame (raised edge) */}
      <DeskVoxel position={[0, 0.04, 0]} size={[1.55, 0.04, 0.6]} color={0x3D342B} roughness={0.6} />

      {/* Key rows - more realistic layout */}
      {[
        // Row 1 (number keys)
        { row: 0, cols: 12, startX: -0.7, z: -0.18, width: 0.1 },
        // Row 2 (QWERTY)
        { row: 1, cols: 11, startX: -0.65, z: -0.06, width: 0.11 },
        // Row 3 (ASDF)
        { row: 2, cols: 10, startX: -0.6, z: 0.06, width: 0.12 },
        // Row 4 (ZXCV)
        { row: 3, cols: 9, startX: -0.55, z: 0.18, width: 0.11 },
      ].map(({ row, cols, startX, z, width }) =>
        Array.from({ length: cols }).map((_, col) => (
          <mesh
            key={`key-${row}-${col}`}
            position={[startX + col * (width + 0.015), 0.09, z]}
          >
            <boxGeometry args={[width, 0.06, 0.1]} />
            <meshStandardMaterial
              color={col % 2 === 0 ? 0x4A4036 : 0x3D342B}
              roughness={0.5}
            />
          </mesh>
        ))
      )}

      {/* Space bar */}
      <mesh position={[0, 0.09, 0.28]}>
        <boxGeometry args={[0.5, 0.06, 0.1]} />
        <meshStandardMaterial color={0x4A4036} roughness={0.5} />
      </mesh>
    </group>
  )
}

// Coffee mug with steam particles
export function CoffeeMug() {
  const steamParticles = useRef<THREE.Points>(null)

  // Animate steam
  useFrame((state) => {
    if (steamParticles.current) {
      const positions = steamParticles.current.geometry.attributes.position
      const array = positions.array as Float32Array

      for (let i = 0; i < array.length; i += 3) {
        // Move particles upward
        array[i + 1] += 0.008

        // Add subtle wobble
        array[i] += Math.sin(state.clock.elapsedTime * 2 + i) * 0.002

        // Reset to bottom if too high
        if (array[i + 1] > 1.2) {
          array[i + 1] = 0.35
          array[i] = (Math.random() - 0.5) * 0.2
          array[i + 2] = (Math.random() - 0.5) * 0.2
        }
      }

      positions.needsUpdate = true
    }
  })

  return (
    <group position={[1.2, 0, 0]}>
      {/* Mug body - slightly tapered */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.12, 0.1, 0.35, 12]} />
        <meshStandardMaterial color={0xF5F5F5} roughness={0.3} />
      </mesh>

      {/* Coffee inside */}
      <mesh position={[0, 0.34, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.02, 12]} />
        <meshStandardMaterial
          color={0x2A1810}
          roughness={0.9}
          emissive={0x1A0D08}
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Handle */}
      <mesh position={[0.13, 0.2, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <torusGeometry args={[0.06, 0.015, 8, 12, 8]} />
        <meshStandardMaterial color={0xF5F5F5} roughness={0.3} />
      </mesh>

      {/* Steam particles - more subtle */}
      <points ref={steamParticles}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={30}
            array={new Float32Array(
              Array.from({ length: 30 }, () => [
                (Math.random() - 0.5) * 0.2,
                0.4 + Math.random() * 0.4,
                (Math.random() - 0.5) * 0.2,
              ]).flat()
            )}
            itemSize={3}
            args={[new Float32Array(
              Array.from({ length: 30 }, () => [
                (Math.random() - 0.5) * 0.2,
                0.4 + Math.random() * 0.4,
                (Math.random() - 0.5) * 0.2,
              ]).flat()
            ), 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color={0xFFFFFF}
          transparent
          opacity={0.3}
          sizeAttenuation
        />
      </points>
    </group>
  )
}

// Small succulent plant
export function Plant() {
  return (
    <group position={[-1.3, 0, 0]}>
      {/* Pot - tapered terracotta style */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.13, 0.1, 0.3, 12]} />
        <meshStandardMaterial color={0xC4876B} roughness={0.8} />
      </mesh>

      {/* Pot rim */}
      <mesh position={[0, 0.31, 0]} castShadow>
        <torusGeometry args={[0.13, 0.02, 8, 16]} />
        <meshStandardMaterial color={0xD4977B} roughness={0.8} />
      </mesh>

      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.04, 12]} />
        <meshStandardMaterial color={0x2A1810} roughness={0.95} />
      </mesh>

      {/* Succulent leaves - rosette pattern */}
      <group position={[0, 0.32, 0]}>
        {/* Center leaf */}
        <mesh position={[0, 0.05, 0]} castShadow>
          <coneGeometry args={[0.04, 0.12, 6]} />
          <meshStandardMaterial color={0x7AB87A} roughness={0.6} />
        </mesh>

        {/* Middle ring of leaves */}
        {[
          { x: 0.06, y: 0.02, z: 0, ry: 0 },
          { x: -0.06, y: 0.02, z: 0, ry: 0 },
          { x: 0, y: 0.02, z: 0.06, ry: Math.PI / 2 },
          { x: 0, y: 0.02, z: -0.06, ry: Math.PI / 2 },
        ].map((leaf, i) => (
          <mesh key={i} position={[leaf.x, leaf.y, leaf.z]} rotation={[0, leaf.ry, Math.PI / 6]} castShadow>
            <coneGeometry args={[0.035, 0.1, 5]} />
            <meshStandardMaterial color={0x8FC88F} roughness={0.6} />
          </mesh>
        ))}

        {/* Outer ring of leaves */}
        {[
          { x: 0.08, y: -0.02, z: 0.05, ry: -0.5 },
          { x: -0.08, y: -0.02, z: 0.05, ry: 0.5 },
          { x: 0.08, y: -0.02, z: -0.05, ry: 0.5 },
          { x: -0.08, y: -0.02, z: -0.05, ry: -0.5 },
          { x: 0.05, y: -0.02, z: 0.08, ry: 0 },
          { x: -0.05, y: -0.02, z: 0.08, ry: 0 },
          { x: 0.05, y: -0.02, z: -0.08, ry: 0 },
          { x: -0.05, y: -0.02, z: -0.08, ry: 0 },
        ].map((leaf, i) => (
          <mesh key={`outer-${i}`} position={[leaf.x, leaf.y, leaf.z]} rotation={[0, leaf.ry, Math.PI / 4.5]} castShadow>
            <coneGeometry args={[0.03, 0.08, 5]} />
            <meshStandardMaterial color={0x6AA86A} roughness={0.6} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

import { useMemo } from 'react'
