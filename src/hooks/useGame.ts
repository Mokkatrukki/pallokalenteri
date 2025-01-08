
import { useEffect } from 'react';
import { Player, GameState, UPDATE_INTERVAL } from '../types';
import { usePlayerContext } from '../contexts/PlayerContext';

export const useGame = () => {
  const { gameStates, setGameStates, currentState } = usePlayerContext();

  const handlePlayerClick = (clickedPlayer: Player) => {
    const currentTime = Date.now();
    const [firstBench, ...restBench] = currentState.benchPlayers;
    
    const updatedFieldPlayers = currentState.fieldPlayers.map(p => ({
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

  return {
    handlePlayerClick,
    handleUndo,
    canUndo: gameStates.length > 1,
    fieldPlayers: currentState.fieldPlayers,
    benchPlayers: currentState.benchPlayers
  };
};