import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Modèle Analytique BIM',
  description: 'Visualisation 3D de modèle analytique avec poteaux, voiles courbes, coupoles et planchers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
