// filepath: /home/cosmah/Desktop/projecta/android/ludo-game/app/screens/Game.tsx
import React from 'react';
import { View, SafeAreaView } from 'react-native';
import Board from '../components/Board';

const GameScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Board />
          </View>
        </SafeAreaView>
      );
};


export default GameScreen;