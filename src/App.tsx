import './App.css'
import { PlayerProvider } from './contexts/PlayerContext';
import { useGame } from './hooks/useGame';

function GameComponent() {
  const { handlePlayerClick, handleUndo, canUndo, fieldPlayers, benchPlayers } = useGame();

  return (
    <div>
      <h1>Pallokalenteri</h1>
      <button 
        data-testid="undo-button"
        onClick={handleUndo} 
        disabled={!canUndo}
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
  );
}

function App() {
  return (
    <PlayerProvider>
      <GameComponent />
    </PlayerProvider>
  );
}

export default App;
