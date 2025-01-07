import React from "react";
import { View, StyleSheet } from "react-native";

interface CellProps {
  size: number;
  position: { x: number; y: number };
  tokens?: { color: string; size: number }[]; // Array of tokens in the cell
  children?: React.ReactNode;
}

const Cell: React.FC<CellProps> = ({size, position, tokens, children}) => {
  const getCellColor = () => {
    const yellow = "#FFFF05"; // Yellow home
    const blue = "#0A07D9"; // Blue home
    const red = "#E30E0E"; // Red home
    const green = "#4AD61C"; // Green home
    const yellowPath = "#FFFF05"; // Lighter yellow for the path
    const bluePath = "#0A07D9"; // Lighter blue for the path
    const redPath = "#E30E0E"; // Lighter red for the path
    const greenPath = "#4AD61C"; // Lighter green for the path
    const center = "#1CD679"; // Center of the board
    const safePoint = "#FFD700"; // Gold for safe points
    const exitPoint = "#FF4500"; // Orange-red for exit points
    const yellowsafe = "#e5eb91"; // Lighter yellow for the path
    const bluesafe = "#6f82a8"; // Lighter blue for the path
    const redsafe = "#e08580"; // Lighter red for the path
    const greensafe = "#4b6927"; // Lighter green for the path

    // Home areas
    if (position.x > 8 && position.y > 8) return yellow; // Yellow home
    if (position.x < 6 && position.y < 6) return green; // Green home
    if (position.x < 6 && position.y > 8) return red; // Red home
    if (position.x > 8 && position.y < 6) return blue; // Blue home

    // Path areas
    if (position.x === 7 && position.y > 0 && position.y < 7) return greenPath; // Green path
    if (position.y === 7 && position.x > 0 && position.x < 7) return redPath; // Red path
    if (position.x === 7 && position.y > 7 && position.y < 14) return yellowPath; // Yellow path
    if (position.y === 7 && position.x > 7 && position.x < 14) return bluePath; // Blue path

    // Exit pointsc (first tile outside each home)
    if ((position.x === 6 && position.y === 1)) return green; // Green exit
    if ((position.x === 13 && position.y === 6)) return blue;// blue exit
    if ( (position.x === 1 && position.y === 8)) return red; // Red exit
    if ( (position.x === 8 && position.y === 13)) return yellow;// yellow exit


    // Safe points (specific positions on paths)
    if ((position.x === 12 && position.y === 8)) return bluesafe; // Blue exit
    if ((position.x === 8 && position.y === 2)) return greensafe; // Green exit
    if ( (position.x === 2 && position.y === 6)) return redsafe; // Red exit
    if ( (position.x === 6 && position.y === 12)) return yellowsafe;


    // Center area (3x3 grid)
    if (position.x >= 6 && position.x <= 8 && position.y >= 6 && position.y <= 8) return center;

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
              borderRadius: size * 0.3,
            },
          ]}
        />
      );
    }

    return null;
  };

  const renderTokens = () => {
    if (!tokens || tokens.length === 0) return null;

    return tokens.map((token, index) => (
      <View
        key={index}
        style={[
          styles.token,
          {
            backgroundColor: token.color,
            width: token.size,
            height: token.size,
            position: "absolute",
            top: size / 4,
            left: size / 4,
          },
        ]}
      />
    ));
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
      {children} {/* This will render the tokens */}
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
