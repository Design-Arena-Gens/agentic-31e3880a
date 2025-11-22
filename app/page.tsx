'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Scene = dynamic(() => import('./components/Scene'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px'
    }}>
      Chargement du modèle 3D...
    </div>
  )
})

export default function Home() {
  return (
    <main className="container">
      <div className="header">
        <h1>🏗️ Modèle Analytique BIM</h1>
        <p>Poteaux à section variable • Voiles courbes • Coupoles • Planchers</p>
      </div>

      <Suspense fallback={<div>Chargement...</div>}>
        <Scene />
      </Suspense>

      <div className="legend">
        <h3>Légende</h3>
        <div className="legend-item">
          <div className="legend-color" style={{ background: '#ff6b6b' }}></div>
          <span>Poteaux variables</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: '#4ecdc4' }}></div>
          <span>Voiles courbes</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: '#ffe66d' }}></div>
          <span>Coupoles</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: '#95e1d3' }}></div>
          <span>Planchers</span>
        </div>
      </div>
    </main>
  )
}
