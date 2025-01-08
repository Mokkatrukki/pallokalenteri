
export interface Player {
  id: number;
  name: string;
  fieldTime: number;
  benchTime: number;
  lastStateChange: number;
}

export interface GameState {
  fieldPlayers: Player[];
  benchPlayers: Player[];
}

export const FIELD_PLAYERS_COUNT = 4;
export const TEAM_SIZE = 10;
export const UPDATE_INTERVAL = 1000; // 1 second