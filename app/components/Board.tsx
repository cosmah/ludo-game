import React, { useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import Cell from "./Cell";
import DiceRoller from "./Dice";
import { House, TokenPosition, GameState, HOUSE_COLORS } from '../types/gameTypes';
import { moveTokenForward, isTokenInHouse } from '../utils/gameUtils';

const { width } = Dimensions.get("window");
const BOARD_SIZE = width * 0.9;
const CELL_SIZE = BOARD_SIZE / 15.31;

const Board = () => {
  const [tokens, setTokens] = useState<TokenPosition[]>([
    // Green tokens (top-left)
    { x: 1, y: 1, color: HOUSE_COLORS[House.GREEN], houseIndex: House.GREEN },
    { x: 1, y: 4, color: HOUSE_COLORS[House.GREEN], houseIndex: House.GREEN },
    { x: 4, y: 1, color: HOUSE_COLORS[House.GREEN], houseIndex: House.GREEN },
    { x: 4, y: 4, color: HOUSE_COLORS[House.GREEN], houseIndex: House.GREEN },
    // Red tokens (bottom-left)
    { x: 1, y: 10, color: HOUSE_COLORS[House.RED], houseIndex: House.RED },
    { x: 1, y: 13, color: HOUSE_COLORS[House.RED], houseIndex: House.RED },
    { x: 4, y: 10, color: HOUSE_COLORS[House.RED], houseIndex: House.RED },
    { x: 4, y: 13, color: HOUSE_COLORS[House.RED], houseIndex: House.RED },
    // Blue tokens (top-right)
    { x: 10, y: 1, color: HOUSE_COLORS[House.BLUE], houseIndex: House.BLUE },
    { x: 10, y: 4, color: HOUSE_COLORS[House.BLUE], houseIndex: House.BLUE },
    { x: 13, y: 1, color: HOUSE_COLORS[House.BLUE], houseIndex: House.BLUE },
    { x: 13, y: 4, color: HOUSE_COLORS[House.BLUE], houseIndex: House.BLUE },
    // Yellow tokens (bottom-right)
    { x: 10, y: 10, color: HOUSE_COLORS[House.YELLOW], houseIndex: House.YELLOW },
    { x: 10, y: 13, color: HOUSE_COLORS[House.YELLOW], houseIndex: House.YELLOW },
    { x: 13, y: 10, color: HOUSE_COLORS[House.YELLOW], houseIndex: House.YELLOW },
    { x: 13, y: 13, color: HOUSE_COLORS[House.YELLOW], houseIndex: House.YELLOW },
  ]);

  const [gameState, setGameState] = useState<GameState>({
    currentTurn: House.BLUE,
    canRoll: true,
    lastRoll: null,
  });

  const handleDiceRoll = (value: number) => {
    if (!gameState.canRoll) return;

    setGameState(prev => ({
      ...prev,
      lastRoll: value,
      canRoll: false,
    }));

    const possibleMoves = checkPossibleMoves(value);
    
    if (!possibleMoves) {
      setTimeout(nextTurn, 1500);
    } else {
      handleTokenMovement(value);
      setTimeout(nextTurn, 1500);
    }
  };

  const handleTokenMovement = (steps: number) => {
    setTokens(prevTokens => {
      const newTokens = [...prevTokens];
      const currentHouseTokens = newTokens.filter(
        token => token.houseIndex === gameState.currentTurn
      );

      // Try to move a token that's already on the path first
      const activeToken = currentHouseTokens.find(token => !isTokenInHouse(token));
      
      if (activeToken) {
        moveTokenForward(activeToken, steps);
      } else if (steps === 6) {
        // If rolled a 6 and all tokens are in house, move one out
        const houseToken = currentHouseTokens.find(token => isTokenInHouse(token));
        if (houseToken) {
          moveTokenForward(houseToken, steps);
        }
      }

      return newTokens;
    });
  };

  const checkPossibleMoves = (diceValue: number): boolean => {
    const currentHouseTokens = tokens.filter(
      token => token.houseIndex === gameState.currentTurn
    );

    // Check if any token is already on the path
    const hasTokenOnPath = currentHouseTokens.some(token => !isTokenInHouse(token));
    
    // If rolled 6, can always move if there's a token in house
    if (diceValue === 6 && currentHouseTokens.some(token => isTokenInHouse(token))) {
      return true;
    }

    // If has token on path, can always move
    if (hasTokenOnPath) {
      return true;
    }

    return false;
  };

  const nextTurn = () => {
    setGameState(prev => ({
      currentTurn: (prev.currentTurn + 1) % 4,
      canRoll: true,
      lastRoll: null,
    }));
  };

  const renderCells = () => {
    const cells = [];
    for (let row = 0; row < 15; row++) {
      for (let col = 0; col < 15; col++) {
        const tokensInCell = tokens.filter(
          token => token.x === row && token.y === col
        );
        cells.push(
          <Cell
            key={`${row}-${col}`}
            size={CELL_SIZE}
            position={{ x: row, y: col }}
            tokens={tokensInCell.map(token => ({
              color: token.color,
              size: CELL_SIZE * 0.6,
            }))}
          />
        );
      }
    }
    return cells;
  };

  return (
    <View style={styles.container}>
      <View style={styles.gameInfo}>
        <Text style={[styles.turnIndicator, { color: HOUSE_COLORS[gameState.currentTurn] }]}>
          {House[gameState.currentTurn]}'s Turn
        </Text>
        {gameState.lastRoll && (
          <Text style={styles.rollValue}>Rolled: {gameState.lastRoll}</Text>
        )}
      </View>

      <View style={styles.board}>{renderCells()}</View>

      <View style={styles.diceArea}>
        <DiceRoller
          onRoll={handleDiceRoll}
          disabled={!gameState.canRoll}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 10,
  },
  gameInfo: {
    alignItems: "center",
    marginBottom: 16,
  },
  turnIndicator: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  rollValue: {
    fontSize: 18,
    fontWeight: "500",
  },
  diceArea: {
    marginTop: 16,
    alignItems: "center",
  },
});

export default Board;