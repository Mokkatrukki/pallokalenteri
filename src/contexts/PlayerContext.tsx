
import React, { createContext, useContext, useState } from 'react';
import { Player, GameState, FIELD_PLAYERS_COUNT, TEAM_SIZE } from '../types';

interface PlayerContextType {
  gameStates: GameState[];
  setGameStates: React.Dispatch<React.SetStateAction<GameState[]>>;
  currentState: GameState;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  const [gameStates, setGameStates] = useState<GameState[]>([{
    fieldPlayers: initialPlayers.slice(0, FIELD_PLAYERS_COUNT),
    benchPlayers: initialPlayers.slice(FIELD_PLAYERS_COUNT)
  }]);

  const currentState = gameStates[gameStates.length - 1];

  return (
    <PlayerContext.Provider value={{ gameStates, setGameStates, currentState }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayerContext must be used within a PlayerProvider');
  }
  return context;
};