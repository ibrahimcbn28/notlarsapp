import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        loadThemePreference();
    }, []);

    const loadThemePreference = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem('theme');
            if (savedTheme !== null) {
                setIsDarkMode(savedTheme === 'dark');
            }
        } catch (error) {
            console.error('Tema tercihi yüklenirken hata:', error);
        }
    };

    const toggleTheme = async () => {
        try {
            const newTheme = !isDarkMode;
            setIsDarkMode(newTheme);
            await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
        } catch (error) {
            console.error('Tema değiştirilirken hata:', error);
        }
    };

    const theme = {
        isDarkMode,
        toggleTheme,
        colors: isDarkMode ? {
            background: '#121212',
            surface: '#1E1E1E',
            text: '#FFFFFF',
            textSecondary: '#B0B0B0',
            primary: '#BB86FC',
            border: '#2C2C2C'
        } : {
            background: '#FFFFFF',
            surface: '#F5F5F5',
            text: '#000000',
            textSecondary: '#666666',
            primary: '#007AFF',
            border: '#E0E0E0'
        }
    };

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}; 