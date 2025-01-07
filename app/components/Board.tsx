import React, { useState } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Cell from "./Cell";

const { width } = Dimensions.get("window");
const BOARD_SIZE = width * 0.9;
const CELL_SIZE = BOARD_SIZE / 15.31;

interface TokenPosition {
  x: number;
  y: number;
  color: string;
}

const Board = () => {
  const [tokens, setTokens] = useState<TokenPosition[]>([
    { x: 1, y: 1, color: "#4AD61C" },
    { x: 4, y: 4, color: "#E30E0E" },
    { x: 13, y: 1, color: "#0A07D9" },
    { x: 13, y: 13, color: "#FFFF05" },
  ]);

  const renderCells = () => {
    const cells = [];
    for (let row = 0; row < 15; row++) {
      for (let col = 0; col < 15; col++) {
        const tokensInCell = tokens.filter(
          (token) => token.x === row && token.y === col
        );

        cells.push(
          <Cell
            key={`${row}-${col}`}
            size={CELL_SIZE}
            position={{ x: row, y: col }}
            tokens={tokensInCell.map((token) => ({
              color: token.color,
              size: CELL_SIZE * 0.6,
            }))}
          />
        );
      }
    }
    return cells;
  };

  return <View style={styles.board}>{renderCells()}</View>;
};

const styles = StyleSheet.create({
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
});

export default Board;
