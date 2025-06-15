"use client"

import { useEffect, useState } from "react"

interface ConfettiPiece {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  color: string
  size: number
  shape: "square" | "circle" | "triangle"
}

interface ConfettiProps {
  active: boolean
  duration?: number
  intensity?: "low" | "medium" | "high"
}

const colors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#85C1E9",
]

export function Confetti({ active, duration = 3000, intensity = "medium" }: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])
  const [isActive, setIsActive] = useState(false)

  const pieceCount = {
    low: 50,
    medium: 100,
    high: 150,
  }[intensity]

  const createConfettiPiece = (id: number): ConfettiPiece => ({
    id,
    x: Math.random() * window.innerWidth,
    y: -10,
    vx: (Math.random() - 0.5) * 4,
    vy: Math.random() * 3 + 2,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 10,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 8 + 4,
    shape: ["square", "circle", "triangle"][Math.floor(Math.random() * 3)] as "square" | "circle" | "triangle",
  })

  useEffect(() => {
    if (active && !isActive) {
      setIsActive(true)
      const newPieces = Array.from({ length: pieceCount }, (_, i) => createConfettiPiece(i))
      setPieces(newPieces)

      const timer = setTimeout(() => {
        setIsActive(false)
        setPieces([])
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [active, isActive, pieceCount, duration])

  useEffect(() => {
    if (!isActive || pieces.length === 0) return

    const animationFrame = requestAnimationFrame(function animate() {
      setPieces(
        (prevPieces) =>
          prevPieces
            .map((piece) => ({
              ...piece,
              x: piece.x + piece.vx,
              y: piece.y + piece.vy,
              vy: piece.vy + 0.1, // gravity
              rotation: piece.rotation + piece.rotationSpeed,
            }))
            .filter((piece) => piece.y < window.innerHeight + 50), // remove pieces that fall off screen
      )

      if (isActive) {
        requestAnimationFrame(animate)
      }
    })

    return () => cancelAnimationFrame(animationFrame)
  }, [isActive, pieces.length])

  if (!isActive || pieces.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: piece.x,
            top: piece.y,
            transform: `rotate(${piece.rotation}deg)`,
            width: piece.size,
            height: piece.size,
          }}
        >
          {piece.shape === "square" && <div className="w-full h-full" style={{ backgroundColor: piece.color }} />}
          {piece.shape === "circle" && (
            <div className="w-full h-full rounded-full" style={{ backgroundColor: piece.color }} />
          )}
          {piece.shape === "triangle" && (
            <div
              className="w-0 h-0"
              style={{
                borderLeft: `${piece.size / 2}px solid transparent`,
                borderRight: `${piece.size / 2}px solid transparent`,
                borderBottom: `${piece.size}px solid ${piece.color}`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
