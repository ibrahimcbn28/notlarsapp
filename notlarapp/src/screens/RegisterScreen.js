import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { registerUser } from '../services/api';

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { colors } = useTheme();

    const handleRegister = async () => {
        if (!name.trim() || !email.trim() || !password.trim()) {
            Alert.alert('Uyarı', 'Tüm alanlar zorunludur.');
            return;
        }

        try {
            setLoading(true);
            const user = await registerUser({
                name: name.trim(),
                email: email.trim(),
                password: password.trim(),
            });

            await AsyncStorage.setItem('user', JSON.stringify(user));
            navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
            });
        } catch (error) {
            console.error('Kayıt hatası:', error);
            Alert.alert('Hata', error.message || 'Kayıt olurken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.form}>
                <Text style={[styles.title, { color: colors.text }]}>
                    Kayıt Ol
                </Text>

                <TextInput
                    style={[styles.input, {
                        backgroundColor: colors.surface,
                        color: colors.text,
                        borderColor: colors.border
                    }]}
                    value={name}
                    onChangeText={setName}
                    placeholder="Ad Soyad"
                    placeholderTextColor={colors.textSecondary}
                    autoCapitalize="words"
                    editable={!loading}
                />

                <TextInput
                    style={[styles.input, {
                        backgroundColor: colors.surface,
                        color: colors.text,
                        borderColor: colors.border
                    }]}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="E-posta"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!loading}
                />

                <TextInput
                    style={[styles.input, {
                        backgroundColor: colors.surface,
                        color: colors.text,
                        borderColor: colors.border
                    }]}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Şifre"
                    placeholderTextColor={colors.textSecondary}
                    secureTextEntry
                    editable={!loading}
                />

                <TouchableOpacity
                    style={[
                        styles.registerButton,
                        { backgroundColor: colors.primary },
                        loading && { opacity: 0.7 }
                    ]}
                    onPress={handleRegister}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={colors.background} />
                    ) : (
                        <Text style={[styles.registerButtonText, { color: colors.background }]}>
                            Kayıt Ol
                        </Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.goBack()}
                    disabled={loading}
                >
                    <Text style={[styles.loginButtonText, { color: colors.primary }]}>
                        Zaten hesabınız var mı? Giriş yapın
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 32,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 16,
    },
    registerButton: {
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    registerButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    loginButton: {
        marginTop: 16,
        padding: 8,
    },
    loginButtonText: {
        fontSize: 14,
        textAlign: 'center',
    },
}); 