'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import { Desk, Monitor, Keyboard, CoffeeMug, Plant } from './desk-elements'
import { BlockyCharacter } from './character'
import { useTheme } from '@/hooks/use-theme'

/**
 * Main 3D Scene with Blocky Avatar at Desk
 * Creates a cozy, lo-fi development workspace
 */

function SceneContent() {
  const { actualTheme } = useTheme()
  const sceneRef = useRef<any>(null)

  // Rotate the main scene group slowly for a gentle orbiting effect
  useFrame((state, delta) => {
    if (sceneRef.current) {
      // adjust the multiplier for faster/slower rotation
      sceneRef.current.rotation.y += delta * 0.2
    }
  })

  // Adjust colors based on theme
  const ambientIntensity = actualTheme === 'dark' ? 0.3 : 0.6
  const spotlightColor = actualTheme === 'dark' ? '#FFE8C8' : '#FFF8F0'

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[-3, 4, -6]} fov={40} />

      {/* Soft, warm lighting for lo-fi feel */}
      <directionalLight
        position={[6, 10, 6]}
        intensity={2}
        color={spotlightColor}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-bias={-0.0001}
      />
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
        {/* Rotating group containing main scene objects */}
        <group ref={sceneRef}>
          <Desk />
          <Monitor />
          <Keyboard />
          <CoffeeMug />
          <Plant />

          {/* Blocky character typing at desk */}
          <BlockyCharacter />
        </group>

        {/* Soft shadows on floor */}
        <ContactShadows
          position={[0, -1.0, 0]}
          opacity={0.4}
          scale={12}
          blur={2.5}
          far={4}
        />

        {/* Pleasant environment reflections */}
        <Environment preset="city" />
      </Suspense>

      {/* Subtle user interaction */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        minAzimuthAngle={-Math.PI}
        maxAzimuthAngle={Math.PI}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.5}
      />
    </>
  )
}



export function AvatarScene() {
  return (
    <div className="w-full h-[280px] sm:h-[320px] md:h-[400px] lg:h-[500px] xl:h-[550px]">
      <Canvas
        shadows
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
