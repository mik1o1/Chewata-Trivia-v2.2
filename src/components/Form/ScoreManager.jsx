import React, { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY = ' ScoreKeeper';

export default function JeopardyScoreKeeper() {
  const [players, setPlayers] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedPlayers = localStorage.getItem(LOCAL_STORAGE_KEY);
      return savedPlayers
        ? JSON.parse(savedPlayers)
        : [
            { id: 1, name: 'ተጫዋች 1', score: 0 },
            { id: 2, name: 'ተጫዋች 2', score: 0 },
          ];
    }
    return [
      { id: 1, name: 'ተጫዋች 1', score: 0 },
      { id: 2, name: 'ተጫዋች 2', score: 0 },
    ];
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(players));
  }, [players]);

  const updatePlayerName = (id, name) => {
    setPlayers(players.map(player => player.id === id ? { ...player, name } : player));
  };

  const updatePlayerScore = (id, change) => {
    setPlayers(players.map(player => player.id === id ? { ...player, score: Math.max(0, player.score + change) } : player));
  };

  const addPlayer = () => {
    const newId = players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1;
    setPlayers([...players, { id: newId, name: `ተጫዋች ${newId}`, score: 0 }]);
  };

  const removePlayer = (id) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  const deleteCatchData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setPlayers([
      { id: 1, name: 'ተጫዋች 1', score: 0 },
      { id: 2, name: 'ተጫዋች 2', score: 0 },
    ]);
  };

  return (
    <div>
      <button className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none relative z-20 hover:scale-105 p-1.5 rounded-md`} onClick={() => setIsOpen(true)}>
      ውጤት መያዣ
				</button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90vw] max-w-[600px] max-h-[90vh] overflow-y-auto relative shadow-lg">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ✖
            </button>
            <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">ውጤት</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {players.map(player => (
                <div key={player.id} className="bg-blue-500 p-4 rounded-lg shadow-md flex-col">
                  
                  <div className="text-6xl font-extrabold text-white mb-2 text-center">
                    {player.score}
                  </div>
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => updatePlayerName(player.id, e.target.value)}
                    className="text-center font-semibold text-lg text-white w-full mb-2 bg-transparent border-b border-gray-300 focus:outline-none"
                  />
                  <div className="flex justify-center space-x-2 mt-2">
                    <button
                      onClick={() => updatePlayerScore(player.id, 1)}
                      className="px-3 py-1 bg-gray-400 text-white rounded-full hover:bg-gray-500 focus:outline-none"
                    >
                      +
                    </button>
                    <button
                      onClick={() => updatePlayerScore(player.id, -1)}
                      className="px-3 py-1 bg-gray-400 text-white rounded-full hover:bg-gray-500 focus:outline-none"
                    >
                      -
                    </button>
                    <button
                      onClick={() => removePlayer(player.id)}
                      className="px-3 py-1 bg-gray-400 text-white rounded-full hover:bg-gray-500 focus:outline-none"
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-around items-center mt-6">
              <button
                onClick={addPlayer}
                className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                + ተጫዋች
              </button>
              <button
                onClick={deleteCatchData}
                className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
              >
                ሙሉ አጥፋ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
