// filepath: /home/cosmah/Desktop/projecta/android/ludo-game/app/navigation/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Home' }} />
            <Stack.Screen name="Game" options={{ title: 'Ludo Game' }} />
        </Stack>
    );
};

export default Layout;