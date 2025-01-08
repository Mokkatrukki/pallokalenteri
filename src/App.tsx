import './App.css'
import { useState, useEffect } from 'react';

interface Player {
  id: number;
  name: string;
  fieldTime: number;  // Time in seconds
  benchTime: number;  // Time in seconds
  lastStateChange: number;  // Timestamp of last state change
}

const FIELD_PLAYERS_COUNT = 4;
const TEAM_SIZE = 10;
const UPDATE_INTERVAL = 1000; // 1 second

function App() {
  const initialPlayers: Player[] = Array.from(
    { length: TEAM_SIZE }, 
    (_, i) => ({
      id: i + 1,
      name: `Player ${i + 1}`,
      fieldTime: 0,
      benchTime: 0,
      lastStateChange: Date.now()
    })
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
    const currentTime = Date.now();
    const [firstBench, ...restBench] = benchPlayers;
    
    // Update times for players changing positions
    const updatedFieldPlayers = fieldPlayers.map(p => ({
      ...p,
      fieldTime: p.id === clickedPlayer.id ? 
        p.fieldTime + (currentTime - p.lastStateChange) / 1000 : p.fieldTime,
      lastStateChange: currentTime
    }));

    const newState: GameState = {
      fieldPlayers: [
        ...updatedFieldPlayers.filter(p => p.id !== clickedPlayer.id),
        { ...firstBench, lastStateChange: currentTime }
      ],
      benchPlayers: [...restBench, { ...clickedPlayer, lastStateChange: currentTime }]
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

  // Add useEffect to update times periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setGameStates(prevStates => {
        const currentState = prevStates[prevStates.length - 1];
        
        const updatedState: GameState = {
          fieldPlayers: currentState.fieldPlayers.map(p => ({
            ...p,
            fieldTime: p.fieldTime + UPDATE_INTERVAL / 1000
          })),
          benchPlayers: currentState.benchPlayers.map(p => ({
            ...p,
            benchTime: p.benchTime + UPDATE_INTERVAL / 1000
          }))
        };

        return [...prevStates.slice(0, -1), updatedState];
      });
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Pallokalenteri</h1>
      <button 
        data-testid="undo-button"
        onClick={handleUndo} 
        disabled={gameStates.length <= 1}
      >
        Undo
      </button>
      <div data-testid="field-container">
        <h2>Field</h2>
        {fieldPlayers.map(player => (
          <p 
            key={player.id} 
            data-testid={`field-player-${player.id}`}
            onClick={() => handlePlayerClick(player)}
          >
            {player.name} (ID: {player.id}) - 
            Field: {Math.round(player.fieldTime)}s, 
            Bench: {Math.round(player.benchTime)}s
          </p>
        ))}
      </div>
      <div data-testid="bench-container">
        <h2>Bench</h2>
        {benchPlayers.map(player => (
          <p 
            key={player.id}
            data-testid={`bench-player-${player.id}`}
          >
            {player.name} (ID: {player.id}) - 
            Field: {Math.round(player.fieldTime)}s, 
            Bench: {Math.round(player.benchTime)}s
          </p>
        ))}
      </div>
    </div>
  )
}

export default App
