import { useMemo } from 'react'
import * as THREE from 'three'

interface Props {
  curvature: number
}

export default function CurvedWalls({ curvature }: Props) {
  const walls = useMemo(() => {
    return [
      { start: [-15, 0, -15], end: [15, 0, -15], direction: 'x' },
      { start: [15, 0, -15], end: [15, 0, 15], direction: 'z' },
      { start: [15, 0, 15], end: [-15, 0, 15], direction: '-x' },
      { start: [-15, 0, 15], end: [-15, 0, -15], direction: '-z' },
    ]
  }, [])

  return (
    <group>
      {walls.map((wall, idx) => (
        <CurvedWall
          key={idx}
          start={wall.start as [number, number, number]}
          end={wall.end as [number, number, number]}
          curvature={curvature}
          direction={wall.direction}
        />
      ))}
    </group>
  )
}

function CurvedWall({
  start,
  end,
  curvature,
  direction
}: {
  start: [number, number, number]
  end: [number, number, number]
  curvature: number
  direction: string
}) {
  const geometry = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3(
        (start[0] + end[0]) / 2 + (direction.includes('x') ? 0 : curvature * (direction.includes('-') ? -1 : 1)),
        6,
        (start[2] + end[2]) / 2 + (direction.includes('z') ? 0 : curvature * (direction.includes('-') ? -1 : 1))
      ),
      new THREE.Vector3(...end)
    )

    const points = curve.getPoints(50)
    const shape = new THREE.Shape()

    points.forEach((point, i) => {
      if (i === 0) {
        shape.moveTo(point.x, point.z)
      } else {
        shape.lineTo(point.x, point.z)
      }
    })

    const extrudeSettings = {
      steps: 1,
      depth: 12,
      bevelEnabled: false,
    }

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    geometry.rotateX(Math.PI / 2)

    return geometry
  }, [start, end, curvature, direction])

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial
        color="#4ecdc4"
        roughness={0.5}
        metalness={0.2}
        side={THREE.DoubleSide}
        transparent
        opacity={0.85}
      />
    </mesh>
  )
}
