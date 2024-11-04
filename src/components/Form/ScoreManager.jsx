import React, { useState, useEffect } from 'react'

const LOCAL_STORAGE_KEY = 'jeopardyScoreKeeper'

export default function JeopardyScoreKeeper() {
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
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(players))
  }, [players])

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

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        ውጤት መያዣ
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-blue-900 p-4 rounded-lg w-[90vw] max-w-[600px] max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-white hover:text-gray-300 focus:outline-none"
              aria-label="Close"
            >
              &#x2715;
            </button>
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">ውጤት መያዣ</h2>
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={addPlayer}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Add Team
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {players.map(player => (
                <div key={player.id} className="bg-blue-800 p-4 rounded-lg">
                  <div className="flex flex-col items-center">
                    <div className="text-4xl font-extrabold text-yellow-400 mb-2">
                      {player.score}
                    </div>
                    <input
                      type="text"
                      value={player.name}
                      onChange={(e) => updatePlayerName(player.id, e.target.value)}
                      className="text-center font-bold text-white bg-blue-700 border-none rounded px-2 py-1 mb-4 w-full"
                    />
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => updatePlayerScore(player.id, -100)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        aria-label="Decrease score"
                      >
                        -
                      </button>
                      <button
                        onClick={() => updatePlayerScore(player.id, 100)}
                        className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                        aria-label="Increase score"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removePlayer(player.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        aria-label="Remove player"
                      >
                        &#x2715;
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}