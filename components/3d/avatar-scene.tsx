'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import { Desk, Monitor, Keyboard, CoffeeMug, Plant } from './desk-elements'
import { useTheme } from '@/hooks/use-theme'

/**
 * Main 3D Scene with Blocky Avatar at Desk
 * Creates a cozy, lo-fi development workspace
 */

function SceneContent() {
  const { actualTheme } = useTheme()

  // Adjust colors based on theme
  const ambientIntensity = actualTheme === 'dark' ? 0.3 : 0.6
  const spotlightColor = actualTheme === 'dark' ? '#FFE8C8' : '#FFF8F0'

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[4, 2, 6]} fov={50} />

      {/* Soft, warm lighting for lo-fi feel */}
      <ambientLight intensity={ambientIntensity} color={spotlightColor} />
      <spotLight
        position={[5, 8, 5]}
        angle={0.5}
        penumbra={1}
        intensity={0.8}
        color={spotlightColor}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Fill light for soft shadows */}
      <pointLight position={[-5, 3, -5]} intensity={0.3} color="#E8DDD0" />

      {/* The Scene */}
      <Suspense fallback={null}>
        {/* Desk setup */}
        <Desk />
        <Monitor />
        <Keyboard />
        <CoffeeMug />
        <Plant />


        {/* Soft shadows on floor */}
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.4}
          scale={15}
          blur={2.5}
          far={6}
        />

        {/* Pleasant environment reflections */}
        <Environment preset="city" />
      </Suspense>

      {/* Subtle user interaction */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.2}
        minAzimuthAngle={-Math.PI / 6}
        maxAzimuthAngle={Math.PI / 6}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.5}
      />
    </>
  )
}

export function AvatarScene() {
  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px]">
      <Canvas
        gl={{
          preserveDrawingBuffer: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <SceneContent />
      </Canvas>
    </div>
  )
}
