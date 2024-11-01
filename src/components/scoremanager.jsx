import React, { useState, useRef, useEffect } from 'react'

const LOCAL_STORAGE_KEY = 'jeopardyScoreKeeper'

export default function Component() {
  const [players, setPlayers] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedPlayers = localStorage.getItem(LOCAL_STORAGE_KEY)
      return savedPlayers ? JSON.parse(savedPlayers) : [
        { id: 1, name: 'Team 1', score: 0 },
        { id: 2, name: 'Team 2', score: 0 },
      ]
    }
    return [
      { id: 1, name: 'Team 1', score: 0 },
      { id: 2, name: 'Team 2', score: 0 },
    ]
  })
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPanelVisible, setIsPanelVisible] = useState(false)
  const dragRef = useRef(null)

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(players))
  }, [players])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && dragRef.current) {
        const rect = dragRef.current.getBoundingClientRect()
        setPosition({
          x: e.clientX - rect.width / 2,
          y: e.clientY - 20,
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
  }, [isDragging])

  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const updatePlayerName = (id, name) => {
    setPlayers(players.map(player => player.id === id ? { ...player, name } : player))
  }

  const updatePlayerScore = (id, change) => {
    setPlayers(players.map(player => player.id === id ? { ...player, score: Math.max(0, player.score + change) } : player))
  }

  const addPlayer = () => {
    const newId = players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1
    setPlayers([...players, { id: newId, name: `Team ${newId}`, score: 0 }])
  }

  const removePlayer = (id) => {
    setPlayers(players.filter(player => player.id !== id))
  }

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible)
  }

  const eraseData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    setPlayers([
      { id: 1, name: 'Team 1', score: 0 },
      { id: 2, name: 'Team 2', score: 0 },
    ])
  }

  return (
    <>
      <button
        onClick={togglePanel}
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white z-50 px-4 py-2 rounded"
      >
        Score Keeper
      </button>
      {isPanelVisible && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={togglePanel} />
          <div
            ref={dragRef}
            className="fixed z-50 bg-blue-900 p-4 rounded-lg shadow-lg cursor-move overflow-hidden"
            style={{
              left: `${position.x || 'calc(50% - 150px)'}px`,
              top: `${position.y || 'calc(50% - 200px)'}px`,
              width: 'calc(100% - 40px)',
              maxWidth: '600px',
              maxHeight: 'calc(100% - 40px)',
            }}
          >
            <div className="flex justify-between mb-4">
              <div className="flex space-x-2">
                <button
                  onClick={eraseData}
                  className="bg-red-500 hover:bg-red-600 text-white p-1 h-8 w-8 flex items-center justify-center rounded"
                >
                  🗑️
                </button>
                <button
                  onClick={addPlayer}
                  className="bg-green-500 hover:bg-green-600 text-white p-1 h-8 w-8 flex items-center justify-center rounded"
                >
                  ➕
                </button>
              </div>
              <div
                className="text-yellow-400 cursor-grab h-6 w-6 flex items-center justify-center"
                onMouseDown={handleMouseDown}
              >
                ⋮⋮
              </div>
              <button
                onClick={togglePanel}
                className="bg-blue-500 hover:bg-blue-600 text-white p-1 h-8 w-8 flex items-center justify-center rounded"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center">
              {players.map(player => (
                <div key={player.id} className="flex flex-col bg-blue-800 p-4 rounded w-full">
                  <div className="text-5xl font-extrabold text-yellow-400 mb-2 text-center">
                    {player.score}
                  </div>
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => updatePlayerName(player.id, e.target.value)}
                    className="w-full text-center font-bold text-white bg-blue-700 border-none text-base p-2 rounded mb-2"
                  />
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => updatePlayerScore(player.id, 1)}
                      className="bg-green-500 hover:bg-green-600 text-white p-0 h-6 w-6 text-sm font-bold rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => updatePlayerScore(player.id, -1)}
                      className="bg-red-500 hover:bg-red-600 text-white p-0 h-6 w-6 text-sm font-bold rounded"
                    >
                      -
                    </button>
                    <button
                      onClick={() => removePlayer(player.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-0 h-6 w-6 text-sm font-bold rounded"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}