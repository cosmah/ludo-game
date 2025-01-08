import React, { useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import Cell from "./Cell";
import DiceRoller from "./Dice";

const { width } = Dimensions.get("window");
const BOARD_SIZE = width * 0.9;
const CELL_SIZE = BOARD_SIZE / 15.31;

enum House {
  BLUE = 0,
  GREEN = 1,
  RED = 2,
  YELLOW = 3,
}

interface TokenPosition {
  x: number;
  y: number;
  color: string;
  houseIndex: House;
}

interface GameState {
  currentTurn: House;
  canRoll: boolean;
  lastRoll: number | null;
}

const HOUSE_COLORS = {
  [House.BLUE]: "#0A07D9",
  [House.GREEN]: "#4AD61C",
  [House.RED]: "#E30E0E",
  [House.YELLOW]: "#FFFF05",
};

const Board = () => {
  const [tokens, setTokens] = useState<TokenPosition[]>([
    // Green tokens (top-left)
    { x: 1, y: 1, color: "#4AD61C", houseIndex: House.GREEN },
    { x: 1, y: 4, color: "#4AD61C", houseIndex: House.GREEN },
    { x: 4, y: 1, color: "#4AD61C", houseIndex: House.GREEN },
    { x: 4, y: 4, color: "#4AD61C", houseIndex: House.GREEN },
    // Red tokens (bottom-left)
    { x: 1, y: 10, color: "#E30E0E", houseIndex: House.RED },
    { x: 1, y: 13, color: "#E30E0E", houseIndex: House.RED },
    { x: 4, y: 10, color: "#E30E0E", houseIndex: House.RED },
    { x: 4, y: 13, color: "#E30E0E", houseIndex: House.RED },
    // Blue tokens (top-right)
    { x: 10, y: 1, color: "#0A07D9", houseIndex: House.BLUE },
    { x: 10, y: 4, color: "#0A07D9", houseIndex: House.BLUE },
    { x: 13, y: 1, color: "#0A07D9", houseIndex: House.BLUE },
    { x: 13, y: 4, color: "#0A07D9", houseIndex: House.BLUE },
    // Yellow tokens (bottom-right)
    { x: 10, y: 10, color: "#FFFF05", houseIndex: House.YELLOW },
    { x: 10, y: 13, color: "#FFFF05", houseIndex: House.YELLOW },
    { x: 13, y: 10, color: "#FFFF05", houseIndex: House.YELLOW },
    { x: 13, y: 13, color: "#FFFF05", houseIndex: House.YELLOW },
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
      // If moves are possible (implement move logic here if needed)
      console.log("Possible moves available");
      // You may want to implement logic for moving tokens based on the rolled value.
      // For now we will just wait for the next turn.
      setTimeout(nextTurn,1500);
    }
   };

   const checkPossibleMoves = (diceValue:number):boolean => {
     const currentHouseTokens = tokens.filter(
       token => token.houseIndex === gameState.currentTurn
     );
     // Placeholder logic for checking possible moves
     return currentHouseTokens.length > 0; // Example condition
   };

   const nextTurn = () => {
     setGameState(prev => ({
       currentTurn: (prev.currentTurn + 1) % 4, // There are 4 houses
       canRoll: true,
       lastRoll: null,
     }));
     console.log(`Next turn for ${House[(gameState.currentTurn + 1) % 4]}`);
   };

   const renderCells = () => {
     const cells = [];
     for (let row =0; row <15; row++) {
       for (let col=0; col<15; col++) {
         const tokensInCell = tokens.filter(
           token => token.x === row && token.y === col
         );
         cells.push(
           <Cell
             key={`${row}-${col}`}
             size={CELL_SIZE}
             position={{x :row ,y :col}}
             tokens={tokensInCell.map(token => ({
               color :token.color,
               size :CELL_SIZE *0.6,
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
         <Text style={[styles.turnIndicator,{color :HOUSE_COLORS[gameState.currentTurn]}]}>
           {House[gameState.currentTurn]}'s Turn
         </Text>
         {gameState.lastRoll && (
           <Text style={styles.rollValue}>Rolled :{gameState.lastRoll}</Text>
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
 container:{
   flex :1,
   alignItems:"center",
   justifyContent:"center",
   padding :16,
 },
 board:{
   width :BOARD_SIZE,
   height :BOARD_SIZE,
   backgroundColor:"#FFFFFF",
   flexDirection:"row",
   flexWrap:"wrap",
   borderWidth :3,
   borderColor:"#000",
   borderRadius :10,
 },
 gameInfo:{
   alignItems:"center",
   marginBottom :16,
 },
 turnIndicator:{
   fontSize :24,
   fontWeight :"bold",
   marginBottom :8,
 },
 rollValue:{
   fontSize :18,
   fontWeight :"500",
 },
 diceArea:{
   marginTop :16,
   alignItems :"center",
 },
});

export default Board;
