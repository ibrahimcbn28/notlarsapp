import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { useIsFocused } from '@react-navigation/native';

export default function ProfileScreen({ navigation }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { colors } = useTheme();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            loadUserData();
        }
    }, [isFocused]);

    const loadUserData = async () => {
        try {
            setLoading(true);
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            } else {
                navigation.replace('Auth');
            }
        } catch (error) {
            console.error('Kullanıcı bilgileri yüklenirken hata:', error);
            Alert.alert('Hata', 'Kullanıcı bilgileri yüklenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        Alert.alert(
            'Çıkış Yap',
            'Çıkış yapmak istediğinizden emin misiniz?',
            [
                { text: 'İptal', style: 'cancel' },
                {
                    text: 'Çıkış Yap',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem('user');
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Auth' }],
                            });
                        } catch (error) {
                            console.error('Çıkış yapılırken hata:', error);
                            Alert.alert('Hata', 'Çıkış yapılırken bir hata oluştu.');
                        }
                    },
                },
            ]
        );
    };

    const handleEditProfile = () => {
        navigation.navigate('EditProfile', { user });
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.centerContent, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.profileHeader}>
                <Image
                    source={{ uri: user.avatar }}
                    style={styles.avatar}
                />
                <Text style={[styles.name, { color: colors.text }]}>{user.name}</Text>
                <Text style={[styles.email, { color: colors.textSecondary }]}>{user.email}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.primary }]}
                    onPress={handleEditProfile}
                >
                    <Text style={[styles.buttonText, { color: colors.background }]}>
                        Profili Düzenle
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.error }]}
                    onPress={handleLogout}
                >
                    <Text style={[styles.buttonText, { color: colors.background }]}>
                        Çıkış Yap
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileHeader: {
        alignItems: 'center',
        marginTop: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    email: {
        fontSize: 16,
        marginBottom: 30,
    },
    buttonContainer: {
        gap: 15,
    },
    button: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
}); 