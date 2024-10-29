'use client'

import React, { useState, useRef, useEffect } from 'react'

interface Player {
  id: number
  name: string
  score: number
}

export default function Component() {
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: 'Team 1', score: 0 },
    { id: 2, name: 'Team 2', score: 0 },
  ])
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const dragRef = useRef<HTMLDivElement>(null)
  const [footerHeight, setFooterHeight] = useState(100)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && dragRef.current) {
        const newY = e.clientY - window.innerHeight + footerHeight
        setPosition({
          x: e.clientX - dragRef.current.offsetWidth / 2,
          y: Math.min(Math.max(newY, 0), footerHeight - 100),
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, footerHeight])

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const updatePlayerName = (id: number, name: string) => {
    setPlayers(players.map(player => player.id === id ? { ...player, name } : player))
  }

  const updatePlayerScore = (id: number, change: number) => {
    setPlayers(players.map(player => player.id === id ? { ...player, score: Math.max(0, player.score + change) } : player))
  }

  const addPlayer = () => {
    const newId = players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1
    setPlayers([...players, { id: newId, name: `Team ${newId}`, score: 0 }])
  }

  const removePlayer = (id: number) => {
    setPlayers(players.filter(player => player.id !== id))
  }

  return (
    <div>
      <div className="fixed bottom-0 left-0 right-0 bg-blue-900 shadow-lg overflow-hidden" style={{ height: `${footerHeight}px` }}>
        <div
          ref={dragRef}
          className="absolute z-50 p-1 cursor-move overflow-auto"
          style={{ left: `${position.x}px`, top: `${position.y}px`, width: 'calc(100% - 8px)', height: 'calc(100%)'}}
        >
          <div className="flex justify-end mb-1">
            <span className="text-yellow-400 cursor-grab h-3 w-3" onMouseDown={handleMouseDown}>|||</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-1">
            {players.map(player => (
              <div key={player.id} className="flex flex-col items-center bg-blue-800 p-1 rounded aspect-square">
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => updatePlayerName(player.id, e.target.value)}
                  className="w-full text-center font-extrabold text-white bg-blue-700 border-none mb-1 text-xs sm:text-sm"
                  style={{ fontWeight: 1000 }}
                />
                <div className="text-lg sm:text-xl font-extrabold text-yellow-400 mb-1" style={{ fontWeight: 800 }}>
                  {player.score}
                </div>
                <div className="flex justify-center space-x-1 mb-1">
                  <button
                    onClick={() => updatePlayerScore(player.id, 1)}
                    className="bg-green-500 hover:bg-green-600 text-white p-0 h-4 w-4"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => updatePlayerScore(player.id, -1)}
                    className="bg-red-500 hover:bg-red-600 text-white p-0 h-4 w-4"
                  >
                    ▼
                  </button>
                </div>
                <button
                  onClick={() => removePlayer(player.id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-0 h-4 w-4"
                >
                  ✕
                </button>
              </div>
            ))}
            <div className="flex items-center justify-center bg-blue-800 p-1 rounded aspect-square">
              <button
                onClick={addPlayer}
                className="bg-green-500 hover:bg-green-600 text-white p-0 h-8 w-8 flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
