import React from "react";
import { View, StyleSheet } from "react-native";

interface CellProps {
  size: number;
  position: { x: number; y: number };
}

const Cell: React.FC<CellProps> = ({ size, position }) => {
  const getCellColor = () => {
    const yellow = "#FFFF05"; // Yellow home
    const blue = "#0A07D9"; // Blue home
    const red = "#E30E0E"; // Red home
    const green = "#4AD61C"; // Green home

    // Home areas
    if (position.x > 8 && position.y > 8) return yellow; // Yellow
    if (position.x < 6 && position.y < 6) return green; // Green
    if (position.x < 6 && position.y > 8) return red; // Red
    if (position.x > 8 && position.y < 6) return blue; // Blue

    return "#FFFFFF"; // Default white
  };

  const renderTokenHolders = () => {
    // Token holder placement logic
    const isTokenHolder = (x: number, y: number) =>
      (x === 1 && y === 1) ||
      (x === 1 && y === 4) ||
      (x === 4 && y === 1) ||
      (x === 4 && y === 4);

    const isYellowHome = position.x > 8 && position.y > 8;
    const isBlueHome = position.x > 8 && position.y < 6;
    const isRedHome = position.x < 6 && position.y > 8;
    const isGreenHome = position.x < 6 && position.y < 6;

    // Adjust the positions for token holders within each home
    if (
      (isYellowHome && isTokenHolder(position.x - 9, position.y - 9)) ||
      (isBlueHome && isTokenHolder(position.x - 9, position.y)) ||
      (isRedHome && isTokenHolder(position.x, position.y - 9)) ||
      (isGreenHome && isTokenHolder(position.x, position.y))
    ) {
      return (
        <View
          style={[
            styles.tokenHolder,
            {
              width: size * 1.0,
              height: size * 1.0,
              borderRadius: size * 0.4,
            },
          ]}
        />
      );
    }

    return null;
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
    >
      {renderTokenHolders()}
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    borderWidth: 0.5,
    borderColor: "#000",
  },
  tokenHolder: {
    backgroundColor: "#FFFFFF", // White token holders
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});

export default Cell;
