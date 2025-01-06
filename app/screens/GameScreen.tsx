// screens/GameScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Board from '../components/Board'; // Import your Board component

const GameScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ludo Game</Text>
            <Board /> {/* Render the game board here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0e68c',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default GameScreen;
