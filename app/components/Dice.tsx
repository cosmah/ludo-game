import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const DiceRoller = () => {
  const [currentValue, setCurrentValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);

  const diceImages: { [key: number]: any } = {
    1: require('../../assets/images/dice1.png'),
    2: require('../../assets/images/dice2.png'),
    3: require('../../assets/images/dice3.png'),
    4: require('../../assets/images/dice4.png'),
    5: require('../../assets/images/dice5.png'),
    6: require('../../assets/images/dice6.png'),
  };

  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    const duration = 750;
    const intervals = 10;
    let count = 0;
    
    const roll = setInterval(() => {
      setCurrentValue(Math.floor(Math.random() * 6) + 1);
      count++;
      
      if (count >= intervals) {
        clearInterval(roll);
        setIsRolling(false);
      }
    }, duration / intervals);
  };

  return (
    <TouchableOpacity onPress={rollDice} disabled={isRolling}>
      <View style={styles.diceContainer}>
        <Image
          source={diceImages[currentValue]}
          style={styles.dice}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  diceContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dice: {
    width: 100,
    height: 100,
  },
});

export default DiceRoller;