import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CreateNoteScreen from '../screens/CreateNoteScreen';
import NoteDetailScreen from '../screens/NoteDetailScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import EditNoteScreen from '../screens/EditNoteScreen';
import { useTheme } from '../context/ThemeContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
    const { colors } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: colors.background,
                    borderTopColor: colors.border,
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Ana Sayfa' }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: 'Profil' }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ title: 'Ayarlar' }}
            />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    const { colors } = useTheme();

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.background,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                cardStyle: { backgroundColor: colors.background },
            }}
        >
            <Stack.Screen
                name="Auth"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ title: 'Kayıt Ol' }}
            />
            <Stack.Screen
                name="Main"
                component={TabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CreateNote"
                component={CreateNoteScreen}
                options={{ title: 'Yeni Not' }}
            />
            <Stack.Screen
                name="NoteDetail"
                component={NoteDetailScreen}
                options={{ title: 'Not Detayı' }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{ title: 'Profili Düzenle' }}
            />
            <Stack.Screen
                name="EditNote"
                component={EditNoteScreen}
                options={{ title: 'Notu Düzenle' }}
            />
        </Stack.Navigator>
    );
} 