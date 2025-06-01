import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/context/ThemeContext';
import EditNoteScreen from './src/screens/EditNoteScreen';

export default function App() {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <NavigationContainer>
                    <AppNavigator />
                </NavigationContainer>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
