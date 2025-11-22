import { useMemo } from 'react'
import * as THREE from 'three'

interface Props {
  count: number
}

export default function VariableColumns({ count }: Props) {
  const columns = useMemo(() => {
    const cols = []
    const radius = 12
    const angleStep = (Math.PI * 2) / count

    for (let i = 0; i < count; i++) {
      const angle = i * angleStep
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius

      const baseWidth = 0.6 + Math.random() * 0.4
      const topWidth = baseWidth * (0.4 + Math.random() * 0.3)
      const height = 12 + Math.random() * 4

      cols.push({
        position: [x, height / 2, z] as [number, number, number],
        baseWidth,
        topWidth,
        height,
        rotation: Math.random() * Math.PI * 2
      })
    }
    return cols
  }, [count])

  return (
    <group>
      {columns.map((col, idx) => (
        <VariableColumn
          key={idx}
          position={col.position}
          baseWidth={col.baseWidth}
          topWidth={col.topWidth}
          height={col.height}
          rotation={col.rotation}
        />
      ))}
    </group>
  )
}

function VariableColumn({
  position,
  baseWidth,
  topWidth,
  height,
  rotation
}: {
  position: [number, number, number]
  baseWidth: number
  topWidth: number
  height: number
  rotation: number
}) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-baseWidth / 2, -baseWidth / 2)
    shape.lineTo(baseWidth / 2, -baseWidth / 2)
    shape.lineTo(baseWidth / 2, baseWidth / 2)
    shape.lineTo(-baseWidth / 2, baseWidth / 2)
    shape.lineTo(-baseWidth / 2, -baseWidth / 2)

    const extrudeSettings = {
      steps: 20,
      depth: height,
      bevelEnabled: false,
    }

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

    const positions = geometry.attributes.position.array
    for (let i = 0; i < positions.length; i += 3) {
      const y = positions[i + 2]
      const progress = y / height
      const scale = baseWidth + (topWidth - baseWidth) * progress
      const ratio = scale / baseWidth
      positions[i] *= ratio
      positions[i + 1] *= ratio
    }

    geometry.attributes.position.needsUpdate = true
    geometry.computeVertexNormals()
    geometry.rotateX(Math.PI / 2)
    geometry.translate(0, 0, 0)

    return geometry
  }, [baseWidth, topWidth, height])

  return (
    <mesh
      geometry={geometry}
      position={position}
      rotation={[0, rotation, 0]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color="#ff6b6b"
        roughness={0.3}
        metalness={0.4}
      />
    </mesh>
  )
}
