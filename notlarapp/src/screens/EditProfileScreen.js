import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { updateUserProfile } from '../services/api';

export default function EditProfileScreen({ route, navigation }) {
    const { user } = route.params;
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [loading, setLoading] = useState(false);
    const { colors } = useTheme();

    const handleSave = async () => {
        if (!name.trim()) {
            Alert.alert('Uyarı', 'Ad Soyad alanı zorunludur.');
            return;
        }

        try {
            setLoading(true);
            const updatedUser = await updateUserProfile(user.id, {
                ...user,
                name: name.trim(),
            });

            // AsyncStorage'daki kullanıcı bilgilerini güncelle
            await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

            Alert.alert('Başarılı', 'Profil bilgileriniz güncellendi.', [
                { text: 'Tamam', onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            console.error('Profil güncellenirken hata:', error);
            Alert.alert('Hata', 'Profil güncellenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.avatarContainer}>
                <Image
                    style={styles.avatar}
                    source={{ uri: user.avatar }}
                />
                <TouchableOpacity
                    style={[styles.changeAvatarButton, { backgroundColor: colors.surface }]}
                >
                    <Text style={[styles.changeAvatarText, { color: colors.primary }]}>
                        Fotoğrafı Değiştir
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.form}>
                <Text style={[styles.label, { color: colors.text }]}>Ad Soyad</Text>
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

                <Text style={[styles.label, { color: colors.text }]}>E-posta</Text>
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

                <TouchableOpacity
                    style={[
                        styles.saveButton,
                        { backgroundColor: colors.primary },
                        loading && { opacity: 0.7 }
                    ]}
                    onPress={handleSave}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={colors.background} />
                    ) : (
                        <Text style={[styles.saveButtonText, { color: colors.background }]}>
                            Kaydet
                        </Text>
                    )}
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
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    changeAvatarButton: {
        padding: 10,
        borderRadius: 20,
    },
    changeAvatarText: {
        fontSize: 14,
        fontWeight: '500',
    },
    form: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 20,
    },
    saveButton: {
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
}); 