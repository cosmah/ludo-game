// src/utils/gameUtils.ts
import { House, TokenPosition, PathPosition } from '../types/gameTypes';

export const PATHS = {
  [House.GREEN]: {
    start: { x: 6, y: 1 }, // Green exit point
    path: [
      // Down the green column
      ...[2, 3, 4, 5, 6].map(y => ({ x: 6, y })),
      // Left across bottom
      ...[5, 4, 3, 2, 1, 0].map(x => ({ x, y: 7 })),
      // Up red column
      ...[8, 9, 10, 11, 12, 13].map(y => ({ x: 1, y })),
      // Right across bottom
      ...[2, 3, 4, 5, 6, 7].map(x => ({ x, y: 13 })),
      // Up yellow column
      ...[12, 11, 10, 9, 8, 7].map(y => ({ x: 8, y })),
      // Right across top
      ...[9, 10, 11, 12, 13].map(x => ({ x, y: 6 })),
      // Down blue column
      ...[5, 4, 3, 2, 1].map(y => ({ x: 13, y })),
      // Left across top
      ...[12, 11, 10, 9, 8, 7].map(x => ({ x, y: 1 })),
      // Home stretch
      ...[2, 3, 4, 5, 6].map(y => ({ x: 7, y })),
    ],
    homeStretch: { x: 7, y: 7 }
  },
  [House.RED]: {
    start: { x: 1, y: 8 }, // Red exit point
    path: [
      // Right across bottom
      ...[2, 3, 4, 5, 6, 7].map(x => ({ x, y: 8 })),
      // Up yellow column
      ...[9, 10, 11, 12, 13].map(y => ({ x: 8, y })),
      // Right across bottom
      ...[9, 10, 11, 12, 13].map(x => ({ x, y: 13 })),
      // Down blue column
      ...[12, 11, 10, 9, 8, 7].map(y => ({ x: 13, y })),
      // Left across top
      ...[12, 11, 10, 9, 8].map(x => ({ x, y: 6 })),
      // Down green column
      ...[5, 4, 3, 2, 1].map(y => ({ x: 6, y })),
      // Left across top
      ...[5, 4, 3, 2, 1, 0].map(x => ({ x, y: 1 })),
      // Up red column
      ...[2, 3, 4, 5, 6, 7].map(y => ({ x: 1, y })),
      // Home stretch
      ...[2, 3, 4, 5, 6].map(x => ({ x, y: 7 })),
    ],
    homeStretch: { x: 7, y: 7 }
  },
  [House.BLUE]: {
    start: { x: 13, y: 6 }, // Blue exit point
    path: [
      // Down blue column
      ...[5, 4, 3, 2, 1].map(y => ({ x: 13, y })),
      // Left across top
      ...[12, 11, 10, 9, 8, 7].map(x => ({ x, y: 1 })),
      // Down green column
      ...[2, 3, 4, 5, 6, 7].map(y => ({ x: 6, y })),
      // Left across bottom
      ...[5, 4, 3, 2, 1, 0].map(x => ({ x, y: 8 })),
      // Up red column
      ...[9, 10, 11, 12, 13].map(y => ({ x: 1, y })),
      // Right across bottom
      ...[2, 3, 4, 5, 6, 7, 8].map(x => ({ x, y: 13 })),
      // Up yellow column
      ...[12, 11, 10, 9, 8, 7].map(y => ({ x: 8, y })),
      // Right across top
      ...[9, 10, 11, 12].map(x => ({ x, y: 6 })),
      // Home stretch
      ...[7, 8, 9, 10, 11].map(y => ({ x: 7, y })),
    ],
    homeStretch: { x: 7, y: 7 }
  },
  [House.YELLOW]: {
    start: { x: 8, y: 13 }, // Yellow exit point
    path: [
      // Up yellow column
      ...[12, 11, 10, 9, 8, 7].map(y => ({ x: 8, y })),
      // Right across top
      ...[9, 10, 11, 12, 13].map(x => ({ x, y: 6 })),
      // Down blue column
      ...[5, 4, 3, 2, 1].map(y => ({ x: 13, y })),
      // Left across top
      ...[12, 11, 10, 9, 8, 7, 6].map(x => ({ x, y: 1 })),
      // Down green column
      ...[2, 3, 4, 5, 6, 7].map(y => ({ x: 6, y })),
      // Left across bottom
      ...[5, 4, 3, 2, 1].map(x => ({ x, y: 8 })),
      // Up red column
      ...[9, 10, 11, 12, 13].map(y => ({ x: 1, y })),
      // Right across bottom
      ...[2, 3, 4, 5, 6, 7].map(x => ({ x, y: 13 })),
      // Home stretch
      ...[12, 11, 10, 9, 8].map(y => ({ x: 7, y })),
    ],
    homeStretch: { x: 7, y: 7 }
  }
};

export const isTokenInHouse = (token: TokenPosition): boolean => {
  switch (token.houseIndex) {
    case House.GREEN:
      return token.x < 6 && token.y < 6;
    case House.RED:
      return token.x < 6 && token.y > 8;
    case House.BLUE:
      return token.x > 8 && token.y < 6;
    case House.YELLOW:
      return token.x > 8 && token.y > 8;
    default:
      return false;
  }
};

export const findTokenPathIndex = (token: TokenPosition): number => {
  const path = PATHS[token.houseIndex].path;
  return path.findIndex(pos => pos.x === token.x && pos.y === token.y);
};

export const moveTokenForward = (token: TokenPosition, steps: number): boolean => {
  // If token is in house and steps isn't 6, can't move
  if (isTokenInHouse(token) && steps !== 6) {
    return false;
  }

  // If token is in house and steps is 6, move to start position
  if (isTokenInHouse(token) && steps === 6) {
    const startPos = PATHS[token.houseIndex].start;
    token.x = startPos.x;
    token.y = startPos.y;
    return true;
  }

  // Find current position in path
  const currentIndex = findTokenPathIndex(token);
  const path = PATHS[token.houseIndex].path;

  // If token isn't on path (shouldn't happen), return false
  if (currentIndex === -1) return false;

  // Calculate new position
  const newIndex = currentIndex + steps;

  // Check if token can move to new position
  if (newIndex >= path.length) {
    // Handle moving into home stretch
    if (newIndex === path.length) {
      token.x = PATHS[token.houseIndex].homeStretch.x;
      token.y = PATHS[token.houseIndex].homeStretch.y;
      return true;
    }
    return false; // Can't move past home
  }

  // Move token to new position
  token.x = path[newIndex].x;
  token.y = path[newIndex].y;
  return true;
};