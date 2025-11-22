import { useMemo } from 'react'

interface Props {
  height: number
}

export default function Domes({ height }: Props) {
  const domes = useMemo(() => {
    return [
      { position: [-8, 0, -8], radius: 4 },
      { position: [8, 0, -8], radius: 3.5 },
      { position: [8, 0, 8], radius: 4.5 },
      { position: [-8, 0, 8], radius: 3.8 },
    ]
  }, [])

  return (
    <group>
      {domes.map((dome, idx) => (
        <Dome
          key={idx}
          position={[dome.position[0], 12 + height / 2, dome.position[2]]}
          radius={dome.radius}
          height={height}
        />
      ))}
    </group>
  )
}

function Dome({
  position,
  radius,
  height
}: {
  position: [number, number, number]
  radius: number
  height: number
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <sphereGeometry args={[radius, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial
        color="#ffe66d"
        roughness={0.2}
        metalness={0.6}
        side={2}
      />
    </mesh>
  )
}
