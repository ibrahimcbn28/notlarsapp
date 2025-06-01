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
import { loginUser } from '../services/api';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { colors } = useTheme();

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Uyarı', 'E-posta ve şifre alanları zorunludur.');
            return;
        }

        try {
            setLoading(true);
            const user = await loginUser({
                email: email.trim(),
                password: password.trim(),
            });

            await AsyncStorage.setItem('user', JSON.stringify(user));
            navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
            });
        } catch (error) {
            console.error('Giriş hatası:', error);
            Alert.alert('Hata', 'Giriş yapılırken bir hata oluştu. Lütfen bilgilerinizi kontrol edin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.form}>
                <Text style={[styles.title, { color: colors.text }]}>
                    Notlar Uygulaması
                </Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                    Giriş Yap
                </Text>

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
                        styles.loginButton,
                        { backgroundColor: colors.primary },
                        loading && { opacity: 0.7 }
                    ]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={colors.background} />
                    ) : (
                        <Text style={[styles.loginButtonText, { color: colors.background }]}>
                            Giriş Yap
                        </Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => navigation.navigate('Register')}
                    disabled={loading}
                >
                    <Text style={[styles.registerButtonText, { color: colors.primary }]}>
                        Hesabınız yok mu? Kayıt olun
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
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
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
    loginButton: {
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    loginButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
    registerButton: {
        marginTop: 16,
        padding: 8,
    },
    registerButtonText: {
        fontSize: 14,
        textAlign: 'center',
    },
}); 