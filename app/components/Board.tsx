import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Cell from './Cell';
import DiceRoller from './Dice';

const { width } = Dimensions.get('window');
const BOARD_SIZE = width * 0.9; // The board occupies 90% of the screen width
const CELL_SIZE = BOARD_SIZE / 15.31; // Each cell's size based on the board size

const Board = () => {
  const renderCells = () => {
    const cells = [];
    for (let row = 0; row < 15; row++) { // Ensure exactly 15 rows
      for (let col = 0; col < 15; col++) { // Ensure exactly 15 columns
        cells.push(
          <Cell
            key={`${row}-${col}`}
            size={CELL_SIZE}
            position={{x: row, y: col}}//cell position
          />
        );
      }
    }
    return cells;
  };

  return (
    <View style={styles.board}>
      {renderCells()}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    backgroundColor: '#FFFFFF', // White background for the board
    flexDirection: 'row',
    flexWrap: 'wrap', // Ensures cells wrap correctly into rows
    borderWidth: 3, // Thick border for the board
    borderColor: '#000', // Black border for the board
    borderRadius: 10, // Rounded corners for the board
  },
});

export default Board;
