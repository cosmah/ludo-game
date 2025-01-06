import React from "react";
import { View, StyleSheet } from "react-native";

interface CellProps {
  size: number;
  position: { x: number; y: number };
}

const Cell: React.FC<CellProps> = ({ size, position }) => {
  const getCellColor = () => {
    const yellow = "#F4D03F";
    const blue = '#5DADE2';
    const red = '#e30e0e';
    const green = '#05ed52';

    if (position.x > 8 && position.y > 8) {
      return blue;
    }

    if (position.x < 6 && position.y < 6) {
      return green;
    }

    if (position.x < 6 && position.y > 8 ){
        return red;
    }
    if (position.x > 8 && position.y < 6 ){
        return yellow;
    }

    return '#FFFFFF';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
  };

  return (
    <View
      style={[
        styles.cell,
        {
          width: size,
          height: size,
          backgroundColor: getCellColor(),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  cell: {
    borderWidth: 0.5,
    borderColor: "#000", // Black border for the grid
  },
});

export default Cell;
