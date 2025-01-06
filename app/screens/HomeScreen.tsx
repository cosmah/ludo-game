// screens/HomeScreen.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { NavigationProp } from '@react-navigation/native';

interface HomeScreenProps {
    navigation: NavigationProp<any>;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Ludo Game!</Text>
            <Button title="Start Game" onPress={() => navigation.navigate('Game')} />
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
