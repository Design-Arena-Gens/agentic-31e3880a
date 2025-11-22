import { useMemo } from 'react'

interface Props {
  levels: number
}

export default function Floors({ levels }: Props) {
  const floors = useMemo(() => {
    const floorArray = []
    for (let i = 0; i < levels; i++) {
      floorArray.push({
        position: [0, i * 4, 0] as [number, number, number],
        level: i
      })
    }
    return floorArray
  }, [levels])

  return (
    <group>
      {floors.map((floor, idx) => (
        <Floor
          key={idx}
          position={floor.position}
          level={floor.level}
        />
      ))}
    </group>
  )
}

function Floor({
  position,
  level
}: {
  position: [number, number, number]
  level: number
}) {
  const opacity = level === 0 ? 0.5 : 0.3

  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={[28, 0.2, 28]} />
      <meshStandardMaterial
        color="#95e1d3"
        roughness={0.7}
        metalness={0.1}
        transparent
        opacity={opacity}
      />
    </mesh>
  )
}
