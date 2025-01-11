// src/types/gameTypes.ts
export enum House {
    BLUE = 0,
    GREEN = 1,
    RED = 2,
    YELLOW = 3,
  }
  
  export interface TokenPosition {
    x: number;
    y: number;
    color: string;
    houseIndex: House;
  }
  
  export interface PathPosition {
    x: number;
    y: number;
  }
  
  export interface GameState {
    currentTurn: House;
    canRoll: boolean;
    lastRoll: number | null;
  }
  
  export const HOUSE_COLORS = {
    [House.BLUE]: "#0A07D9",
    [House.GREEN]: "#4AD61C",
    [House.RED]: "#E30E0E",
    [House.YELLOW]: "#FFFF05",
  };
  