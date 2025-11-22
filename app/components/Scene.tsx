'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Grid } from '@react-three/drei'
import { useState } from 'react'
import VariableColumns from './VariableColumns'
import CurvedWalls from './CurvedWalls'
import Domes from './Domes'
import Floors from './Floors'

export default function Scene() {
  const [columnCount, setColumnCount] = useState(6)
  const [wallCurvature, setWallCurvature] = useState(3)
  const [domeHeight, setDomeHeight] = useState(4)
  const [floorLevels, setFloorLevels] = useState(3)

  return (
    <>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[30, 25, 30]} fov={60} />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={10}
          maxDistance={100}
        />

        <ambientLight intensity={0.4} />
        <directionalLight
          position={[20, 30, 20]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={100}
          shadow-camera-left={-30}
          shadow-camera-right={30}
          shadow-camera-top={30}
          shadow-camera-bottom={-30}
        />
        <pointLight position={[-20, 20, -20]} intensity={0.5} />

        <Grid
          args={[50, 50]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#6b7280"
          sectionSize={5}
          sectionThickness={1.5}
          sectionColor="#9ca3af"
          fadeDistance={80}
          fadeStrength={1}
          position={[0, 0, 0]}
        />

        <VariableColumns count={columnCount} />
        <CurvedWalls curvature={wallCurvature} />
        <Domes height={domeHeight} />
        <Floors levels={floorLevels} />
      </Canvas>

      <div className="controls">
        <h3>Paramètres du modèle</h3>

        <div className="control-group">
          <label>
            Poteaux: <span className="value">{columnCount}</span>
          </label>
          <input
            type="range"
            min="3"
            max="12"
            value={columnCount}
            onChange={(e) => setColumnCount(Number(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>
            Courbure voiles: <span className="value">{wallCurvature.toFixed(1)}</span>
          </label>
          <input
            type="range"
            min="1"
            max="6"
            step="0.5"
            value={wallCurvature}
            onChange={(e) => setWallCurvature(Number(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>
            Hauteur coupoles: <span className="value">{domeHeight.toFixed(1)}m</span>
          </label>
          <input
            type="range"
            min="2"
            max="8"
            step="0.5"
            value={domeHeight}
            onChange={(e) => setDomeHeight(Number(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>
            Niveaux planchers: <span className="value">{floorLevels}</span>
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={floorLevels}
            onChange={(e) => setFloorLevels(Number(e.target.value))}
          />
        </div>
      </div>
    </>
  )
}
