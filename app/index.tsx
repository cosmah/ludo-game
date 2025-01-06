// filepath: /home/cosmah/Desktop/projecta/android/ludo-game/app/screens/index.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Ludo Game!</Text>
            <Button title="Start Game" onPress={() => router.push('/screens/Game')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default HomeScreen;