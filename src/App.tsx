import './App.css'
import { useState } from 'react';

function App() {
  const [fieldPlayers, setFieldPlayers] = useState(['Player 1', 'Player 2', 'Player 3', 'Player 4']);
  const [benchPlayers, setBenchPlayers] = useState(['Player 5', 'Player 6']);

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
