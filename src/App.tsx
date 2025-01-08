import './App.css'
import { useState, useEffect } from 'react';

const FIELD_PLAYERS_COUNT = 4;
const TEAM_SIZE = 10; // Updated to 10 players

function App() {
  const initialPlayers = Array.from({ length: TEAM_SIZE }, (_, i) => `Player ${i + 1}`);
  const [fieldPlayers, setFieldPlayers] = useState(initialPlayers.slice(0, FIELD_PLAYERS_COUNT));
  const [benchPlayers, setBenchPlayers] = useState(initialPlayers.slice(FIELD_PLAYERS_COUNT));

  useEffect(() => {
    if (fieldPlayers.length !== FIELD_PLAYERS_COUNT) {
      const newFieldPlayers = fieldPlayers.slice(0, FIELD_PLAYERS_COUNT);
      const newBenchPlayers = [...benchPlayers, ...fieldPlayers.slice(FIELD_PLAYERS_COUNT)];
      setFieldPlayers(newFieldPlayers);
      setBenchPlayers(newBenchPlayers);
    }
  }, [fieldPlayers, benchPlayers]);

  const handlePlayerClick = (player: string) => {
    setFieldPlayers(prevFieldPlayers => {
      const newFieldPlayers = prevFieldPlayers.filter(p => p !== player);
      const [firstBenchPlayer, ...restBenchPlayers] = benchPlayers;
      setBenchPlayers([...restBenchPlayers, player]);
      return [...newFieldPlayers, firstBenchPlayer];
    });
  };

  return (
    <div>
      <h1>Pallokalenteri</h1>
      <div>
        <h2>Field</h2>
        {fieldPlayers.map(player => (
          <p key={player} onClick={() => handlePlayerClick(player)}>{player}</p>
        ))}
      </div>
      <div>
        <h2>Bench</h2>
        {benchPlayers.map(player => (
          <p key={player}>{player}</p>
        ))}
      </div>
    </div>
  )
}

export default App
