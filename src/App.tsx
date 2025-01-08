import './App.css'
import { useState } from 'react';

interface Player {
  id: number;
  name: string;
}

const FIELD_PLAYERS_COUNT = 4;
const TEAM_SIZE = 10;

function App() {
  // Create initial players with IDs
  const initialPlayers: Player[] = Array.from(
    { length: TEAM_SIZE }, 
    (_, i) => ({ id: i + 1, name: `Player ${i + 1}` })
  );

  // State type definition for our game state
  interface GameState {
    fieldPlayers: Player[];
    benchPlayers: Player[];
  }

  const [gameStates, setGameStates] = useState<GameState[]>([{
    fieldPlayers: initialPlayers.slice(0, FIELD_PLAYERS_COUNT),
    benchPlayers: initialPlayers.slice(FIELD_PLAYERS_COUNT)
  }]);

  // Current state is always the last item in gameStates
  const currentState = gameStates[gameStates.length - 1];
  const { fieldPlayers, benchPlayers } = currentState;

  const handlePlayerClick = (clickedPlayer: Player) => {
    const [firstBench, ...restBench] = benchPlayers;
    
    const newState: GameState = {
      fieldPlayers: [
        ...fieldPlayers.filter(p => p.id !== clickedPlayer.id),
        firstBench
      ],
      benchPlayers: [...restBench, clickedPlayer]
    };

    setGameStates(prevStates => [...prevStates, newState]);
  };

  const handleUndo = () => {
    setGameStates(prevStates => 
      prevStates.length > 1 
        ? prevStates.slice(0, -1) 
        : prevStates
    );
  };

  return (
    <div>
      <h1>Pallokalenteri</h1>
      <button 
        onClick={handleUndo} 
        disabled={gameStates.length <= 1}
      >
        Undo
      </button>
      <div>
        <h2>Field</h2>
        {fieldPlayers.map(player => (
          <p key={player.id} onClick={() => handlePlayerClick(player)}>
            {player.name} (ID: {player.id})
          </p>
        ))}
      </div>
      <div>
        <h2>Bench</h2>
        {benchPlayers.map(player => (
          <p key={player.id}>{player.name} (ID: {player.id})</p>
        ))}
      </div>
    </div>
  )
}

export default App
